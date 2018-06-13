using System.Configuration;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Common;
using System;
using System.Globalization;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using SuppliesDotCom.Filters;
using SuppliesDotCom.Model;

namespace SuppliesDotCom
{
    using SuppliesDotCom.Model;

    public class Global : HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new RazorViewEngine());
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            GlobalFilters.Filters.Add(new GlobalExceptionHandler());
            //Helpers.EncryptConnString();
            //Helpers.EncryptMailSettings();
        }

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            #region this section is to pick the user language from browser and set as a current culture before each request
            var languages = HttpContext.Current.Request.UserLanguages;
            if (languages != null && languages.Length > 0)
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(languages[0]);
                Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture(languages[0]);
            }
            else
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("en-US");
                Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture("en-US");
            }
            //Response.Cache.SetCacheability(HttpCacheability.NoCache);
            //Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
            //Response.Cache.SetNoStore();
            #endregion
        }

        void Session_End(object send, EventArgs e)
        {
            var objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            if (objSession != null)
            {
                using (var bal = new LoginTrackingBal())
                    bal.UpdateLoginOutTime(objSession.UserId, Helpers.GetInvariantCultureDateTime());
            }
            Session.RemoveAll();
        }

        void Session_Start(object sender, EventArgs e)
        {
            var sessionId = Session.SessionID;
        }


        protected void Application_EndRequest(Object sender, EventArgs e)
        {
            var context = new HttpContextWrapper(Context);
            if (context.Request.IsAjaxRequest() && HttpContext.Current == null && HttpContext.Current.Session[SessionNames.SessionClass.ToString()] == null)
            {
                context.Response.Clear();
                Context.Response.StatusCode = 401;
            }
        }
    }
}