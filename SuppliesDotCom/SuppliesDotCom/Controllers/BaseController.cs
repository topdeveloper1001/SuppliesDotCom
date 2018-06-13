// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BaseController.cs" company="Spadez Solutions PVT. LTD.">
//    ServicesDotCom
// </copyright>
// <summary>
//   Defines the BaseController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Linq;
using System.Web.Mvc.Filters;
using System.Web.Security;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Controllers
{
    using System;
    using System.Globalization;
    using System.Net;
    using System.Threading;
    using System.Web.Mvc;
    using System.Web.Routing;

    using SuppliesDotCom.Common;
    using SuppliesDotCom.Common.Common;
    using SuppliesDotCom.Interface;
    using System.IO;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Collections.Specialized;
    using System.Web;
    using SuppliesDotCom.Model;
    using System.Threading.Tasks;

    /// <summary>
    /// The base controller.
    /// </summary>
    [SessionExpire]
    [LoginAuthorize]
    /*[OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]*/
    public class BaseController : Controller
    {
        /// <summary>
        /// Gets or sets the session wrapper.
        /// </summary>
        public ISessionWrapper SessionWrapper { get; set; }

        /// <summary>
        /// Gets or sets the start time.
        /// </summary>
        /// <value>
        /// The start time.
        /// </value>
        private DateTime StartTime { get; set; }


        /// <summary>
        /// Gets or sets the _ current date time.
        /// </summary>
        /// <value>
        /// The _ current date time.
        /// </value>
        public DateTime CurrentDateTime { get; set; }


        /// <summary>
        /// Gets or sets the page performance class.
        /// </summary>
        /// <value>
        /// The page performance class.
        /// </value>
        private PagePerformanceClass pagePerformanceClass { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseController"/> class.
        /// </summary>
        public BaseController()
        {
            SessionWrapper = new HttpContextSessionWrapper();
            StartTime = Helpers.GetInvariantCultureDateTime();
            pagePerformanceClass = new PagePerformanceClass();
            CurrentDateTime = Helpers.GetInvariantCultureDateTime();
        }

        /// <summary>
        /// The on action executing.
        /// </summary>
        /// <param name="filterContext">
        /// The filter context.
        /// </param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            pagePerformanceClass.ActionName = filterContext.ActionDescriptor.ActionName;
            pagePerformanceClass.ControllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            var selectedCulture = Helpers.DefaultLanguage;
            if (string.IsNullOrEmpty(selectedCulture))
            {
                var languages = HttpContext.Request.UserLanguages;
                if (languages != null && languages.Length > 0)
                {
                    var browserLanguage = languages[0];

                    #region look for the direct Match with macrolanguage if direct match not found look for the macrolanguage

                    if (browserLanguage == "ar-sa" || browserLanguage == "ar" || browserLanguage == "sa")
                    {
                        browserLanguage = "ar-sa";
                    }

                    if (browserLanguage == "en-us" || browserLanguage == "en")
                    {
                        browserLanguage = CommonConfig.DefaultLanguage;
                    }

                    #endregion

                    if (!string.IsNullOrWhiteSpace(browserLanguage) &&
                        (browserLanguage.ToLower() == "ar-sa" || browserLanguage.ToLower() == "en-us"))
                    {
                        Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(browserLanguage);
                        Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(browserLanguage);
                        Helpers.DefaultLanguage = browserLanguage;
                    }
                    else
                    {
                        // Defualt language for the website.
                        Thread.CurrentThread.CurrentCulture =
                            CultureInfo.CreateSpecificCulture(CommonConfig.DefaultLanguage);
                        Thread.CurrentThread.CurrentUICulture =
                            CultureInfo.CreateSpecificCulture(CommonConfig.DefaultLanguage);
                        Helpers.DefaultLanguage = CommonConfig.DefaultLanguage;
                    }
                }
            }
            else
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(selectedCulture);
                Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(selectedCulture);
            }

            base.OnActionExecuting(filterContext);
        }


        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected override void Dispose(bool disposing)
        {
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            var totalTime = currentDateTime - StartTime;
            pagePerformanceClass.LoadingTime = totalTime.ToString();
            pagePerformanceClass.CreatedDate = currentDateTime;
            pagePerformanceClass.Createdby = Helpers.GetLoggedInUserId();

            // Just need to add the logic to save the performance time of the system in the DB.
        }




        protected List<DropdownListData> GetGlobaCodesByCategories(IEnumerable<string> categories)
        {
            using (var bal = new GlobalCodeBal())
                return bal.GetListByCategoriesRange(categories);
        }


        protected List<DropdownListData> GetCorporateList()
        {
            var list = new List<DropdownListData>();
            var cId = Helpers.GetDefaultCorporateId();
            using (var bal = new CorporateBal())
            {
                var cList = bal.GetCorporateDDL(cId);
                list.AddRange(cList.Select(item => new DropdownListData
                {
                    Text = item.CorporateName,
                    Value = Convert.ToString(item.CorporateID)
                }));
            }
            return list;
        }

        protected List<DropdownListData> GetDefaultFacilityList(int corporateId)
        {
            using (var bal = new FacilityBal())
                return bal.GetFacilityDropdownData(corporateId, 0);
        }

        /// <summary>
        /// Renders the partial view to string base.
        /// </summary>
        /// <param name="viewName">Name of the view.</param>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public string RenderPartialViewToStringBase(string viewName, object model)
        {
            if (string.IsNullOrEmpty(viewName))
                viewName = ControllerContext.RouteData.GetRequiredString("action");
            //ViewRenderer
            ViewData.Model = model;

            try
            {
                using (var sw = new StringWriter())
                {
                    var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                    var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                    viewResult.View.Render(viewContext, sw);

                    return sw.GetStringBuilder().ToString();
                }
            }
            catch (Exception ex)
            {
                return string.Empty;
                //throw;
            }
        }


        #region Upload-Documents
        //public async Task<List<DocumentsTemplates>> Upload(long? userId, string gcValue)
        //{
        //    var listOfDocs = new List<DocumentsTemplates>();
        //    var cId = Helpers.GetSysAdminCorporateID();
        //    var fId = Helpers.GetDefaultFacilityId();
        //    var loggedInUser = Helpers.GetLoggedInUserId();
        //    var filePath = string.Empty;

        //    using (var bal = new BaseBal()) filePath = await bal.GetGlobalCodeNameAsync(gcValue, "80443");
        //    filePath = string.Format(filePath, cId, fId, userId);
        //    var list = new List<DocumentsTemplates>();

        //    if (Session[SessionNames.Files.ToString()] != null)
        //    {
        //        var dirPath = Server.MapPath("~/" + filePath);

        //        var files = Session[SessionNames.Files.ToString()] as HttpFileCollectionBase;
        //        if (!Directory.Exists(dirPath)) Directory.CreateDirectory(dirPath);

        //        for (int i = 0; i < files.Count; i++)
        //        {
        //            var file = files[i];
        //            var fileName = Path.GetFileName(file.FileName);
        //            var path = Path.Combine(dirPath, fileName);
        //            var dbFilePath = filePath + fileName;
        //            file.SaveAs(path);
        //            list.Add(new DocumentsTemplates { FileName = fileName, FilePath = dbFilePath });
        //        }
        //        Session.Remove(SessionNames.Files.ToString());
        //    }
        //    return list;
        //}


        //public List<DocumentsTemplates> Upload1(long? userId, string gcValue)
        //{
        //    var listOfDocs = new List<DocumentsTemplates>();
        //    var cId = Helpers.GetSysAdminCorporateID();
        //    var fId = Helpers.GetDefaultFacilityId();
        //    var loggedInUser = Helpers.GetLoggedInUserId();
        //    var filePath = string.Empty;

        //    using (var bal = new BaseBal()) filePath = bal.GetNameByGlobalCodeValue(gcValue, "80443");
        //    filePath = string.Format(filePath, cId, fId, userId);
        //    var list = new List<DocumentsTemplates>();

        //    if (Session[SessionNames.Files.ToString()] != null)
        //    {
        //        var dirPath = Server.MapPath("~/" + filePath);

        //        var files = Session[SessionNames.Files.ToString()] as HttpFileCollectionBase;
        //        if (!Directory.Exists(dirPath)) Directory.CreateDirectory(dirPath);

        //        for (int i = 0; i < files.Count; i++)
        //        {
        //            var file = files[i];
        //            var fileName = Path.GetFileName(file.FileName);
        //            var path = Path.Combine(dirPath, fileName);
        //            var dbFilePath = filePath + fileName;
        //            file.SaveAs(path);
        //            list.Add(new DocumentsTemplates { FileName = fileName, FilePath = dbFilePath });
        //        }
        //        Session.Remove(SessionNames.Files.ToString());
        //    }
        //    return list;
        //}


        //public int Delete(List<DocumentsTemplates> docs)
        //{
        //    var list = new List<DocumentsTemplates>();
        //    try
        //    {
        //        foreach (var item in docs)
        //        {
        //            if (System.IO.File.Exists(item.FilePath))
        //                System.IO.File.Delete(item.FilePath);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //    return 1;
        //}
        #endregion
    }

    public class SessionExpire : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var e = filterContext.HttpContext;
            if (Helpers.GetLoggedInUserId() == 0)
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    // For AJAX requests, we're overriding the returned JSON result with a simple string,
                    // indicating to the calling JavaScript code that a redirect should be performed.
                    filterContext.HttpContext.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                    //var context = new HttpContextWrapper(new HttpContext(null,response:new HttpResponse(badRequest));
                    filterContext.Result = new JsonResult
                    {
                        Data = "_Logon_",
                        JsonRequestBehavior = JsonRequestBehavior.DenyGet
                    };
                }
                else
                {
                    filterContext.Result =
                        new RedirectToRouteResult(
                            new RouteValueDictionary
                                {
                                        { "action", "Index" },
                                        { "controller", "Login" },
                                        { "returnUrl", filterContext.HttpContext.Request.RawUrl }
                                });
                }
                return;
            }
        }
    }

    /// <summary>
    /// The logon authorize.
    /// </summary>
    public class LoginAuthorize : AuthorizeAttribute
    {
        /// <summary>
        /// Function     : Handle Unauthorized Request
        /// Objective    : This function to Overide default HandleUnauthorizedRequest function
        /// </summary>
        /// <param name="context">
        /// The filter Context.
        /// </param>
        protected override void HandleUnauthorizedRequest(AuthorizationContext context)
        {
            if (context.HttpContext.Request.Url != null)
            {
                var values = new RouteValueDictionary(new
                {
                    action = ActionResults.login,
                    controller = ControllerNames.home,
                    ReturnUrl = context.HttpContext.Request.Url.PathAndQuery //to be used later
                });

                context.Result = new RedirectToRouteResult(values);
            }
            else
            {
                context.Result = new RedirectResult(CommonConfig.LoginUrl, false);
            }
        }

        /// <summary>
        /// Function     : OnAuthorization
        /// Objective    : This function to Overide default OnAuthorization function
        /// </summary>
        /// <param name="filterContext">
        /// The filter Context.
        /// </param>
        /// <returns>
        /// </returns>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var userId = Helpers.GetLoggedInUserId();
            if (userId == 0)
            {
                base.OnAuthorization(filterContext);
                filterContext.Result = new RedirectResult(CommonConfig.LoginUrl, false);
            }
        }
    }


    public class CheckRolesAuthorize : AuthorizeAttribute
    {
        /// <summary>
        /// Function     : Handle Unauthorized Request
        /// Objective    : This function to Overide default HandleUnauthorizedRequest function
        /// </summary>
        /// <param name="context">
        /// The filter Context.
        /// </param>
        protected override void HandleUnauthorizedRequest(AuthorizationContext context)
        {
            if (context.HttpContext.Request.Url != null)
            {
                var values = new RouteValueDictionary(new
                {
                    action = ActionResults.login,
                    controller = ControllerNames.home,
                    ReturnUrl = context.HttpContext.Request.Url.PathAndQuery //to be used later
                });

                context.Result = new RedirectToRouteResult(values);
            }
            else
            {
                context.Result = new RedirectResult(CommonConfig.LoginUrl, false);
            }
        }

        public CheckRolesAuthorize(params string[] roleKeys)
        {
            var roles = new List<string>();
            var allRoles = (NameValueCollection)ConfigurationManager.GetSection("CustomRoles");
            foreach (var roleKey in roleKeys)
                roles.AddRange(allRoles[roleKey].Split(new[] { ',' }));

            Roles = string.Join(",", roles);
        }

        /// <summary>
        /// Function     : OnAuthorization
        /// Objective    : This function to Overide default OnAuthorization function
        /// </summary>
        /// <param name="filterContext">
        /// The filter Context.
        /// </param>
        /// <returns>
        /// </returns>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var userId = Helpers.GetLoggedInUserId();
            var roles = Roles.Trim().ToLower();
            var currentRole = Helpers.CurrentRoleKey.Trim().ToLower();
            var currentAccess = string.IsNullOrEmpty(Roles) || roles.Contains(currentRole) || roles.Equals("all");
            if (userId == 0 || !currentAccess)
            {
                base.OnAuthorization(filterContext);
                filterContext.Result = !currentAccess
                    ? new RedirectResult(CommonConfig.UnauthorizedAccess, false)
                    : new RedirectResult(CommonConfig.LoginUrl, false);

            }
        }
    }
}