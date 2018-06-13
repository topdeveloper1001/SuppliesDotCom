using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using CaptchaMvc.HtmlHelpers;
using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using System.Globalization;
using System.Threading;
using System.Web;
using Kendo.Mvc.Extensions;
using Microsoft.Ajax.Utilities;
using Kendo.Mvc.UI;
using System.Data;
using System.Threading.Tasks;

namespace SuppliesDotCom.Controllers
{
    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
    public class HomeController : Controller
    {
        /// <summary>
        /// Users the login.
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult UserLogin()
        {
            //Not in Use
            //var pwd = EncryptDecrypt.GetDecryptedData("O1yC58YWrr/HGFQyfok2Gw==", "");
            Session.RemoveAll();
            return View();
        }

        /// <summary>
        /// Patients the login.
        /// </summary>
        /// <returns></returns>
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [AllowAnonymous]
        public ActionResult PatientLogin()
        {
            Session.RemoveAll();
            return View();
        }

        /// <summary>
        /// Users the login.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> UserLogin(Users model)
        {
            //Changes by Amit Jain on 07102014
            //Changes start here
            //var objSystemConfigurationWebCommunicator = new SystemConfigurationWebCommunicator();
            //var _configdata = objSystemConfigurationWebCommunicator.getOfflineTime();
            var login = new Users();

            var systemConfigurationBal = new SystemConfigurationBal();
            var configdata = systemConfigurationBal.getOfflineTime();
            //Changes end here

            var startTime = (TimeSpan)configdata.LoginStartTime;
            var endTime = (TimeSpan)configdata.LoginEndTime;
            var starttimetext = Convert.ToDateTime(string.Format("{0:hh\\:mm\\:ss}", startTime)).ToLongTimeString();
            var endtimetext = Convert.ToDateTime(string.Format("{0:hh\\:mm\\:ss}", endTime)).ToLongTimeString();

            var flag = true;

            //Check the Captcha Code below
            if (!this.IsCaptchaValid(string.Empty)) // means codes does not matched
            {
                ViewBag.check = LoginResponseTypes.CaptchaFailed.ToString();
                return View(login);
            }

            //Authenticate the user details here
            var usersBal = new UsersBal();
            var currentUser = usersBal.GetUser(model.UserName, model.Password);//added jagjeet 07102014

            if (!IsInRange(starttimetext, endtimetext))//only check for users who do not have assigned system offline overwrite' user role)
            {
                ViewBag.check = "Offline (" + string.Format("{0:HH:mm:ss tt}", endtimetext)
                   + " to " + string.Format("{0:HH:mm:ss tt}", starttimetext) + ")";
            }
            else
            {
                //Changes by Amit Jain and added a check if object is not null
                var encryptPassword = !string.IsNullOrEmpty(model.Password) ? EncryptDecrypt.GetEncryptedData(model.Password, string.Empty) : string.Empty;
                if (currentUser != null && currentUser.UserName != null && currentUser.Password.Equals(encryptPassword) && currentUser.IsActive && (currentUser.IsDeleted != null && !Convert.ToBoolean(currentUser.IsDeleted)))
                {
                    if (currentUser.FailedLoginAttempts == 3)
                    {
                        var failedlogin = Convert.ToDateTime(currentUser.LastInvalidLogin);
                        var timespan = Helpers.GetInvariantCultureDateTime().Subtract(failedlogin);
                        if (timespan.TotalMinutes < 30)
                        {
                            flag = false;
                            ViewBag.check = LoginResponseTypes.FailedAttemptsOver.ToString();
                        }
                    }

                    var bal = new LoginTrackingBal();
                    if (flag)
                    {
                        ViewBag.check = LoginResponseTypes.Success.ToString();
                        //Commented by Amit Jain
                        //Menu Manipulations 
                        //var tabsList = usersBal.GetTabsByUserName(model.UserName);
                        //System.Web.HttpContext.Current.Session["MenuSession"] = tabsList;
                        var objSession = Session[SessionNames.SessionClass.ToString()] != null
                            ? Session[SessionNames.SessionClass.ToString()] as SessionClass
                            : new SessionClass();

                        if (objSession != null)
                        {
                            objSession.CountryId = currentUser.CountryID;
                            objSession.UserEmail = currentUser.Email;
                            objSession.MenuSessionList = null;
                            objSession.FirstTimeLogin = bal.IsFirstTimeLoggedIn(currentUser.UserID,
                                (int)LoginTrackingTypes.UserLogin);

                            var loginTrackingVm = new LoginTracking
                            {
                                ID = currentUser.UserID,
                                LoginTime = Helpers.GetInvariantCultureDateTime(),
                                LoginUserType = (int)LoginTrackingTypes.UserLogin,
                                FacilityId = currentUser.FacilityId,
                                CorporateId = currentUser.CorporateId,
                                IsDeleted = false,
                                IPAddress = Helpers.GetUser_IP(),
                                CreatedBy = currentUser.UserID,
                                CreatedDate = Helpers.GetInvariantCultureDateTime()
                            };

                            bal.AddUpdateLoginTrackingData(loginTrackingVm);

                            UpdateFailedLog(currentUser.UserID, 0);
                            /*
                             * Owner: Amit Jain
                             * On: 05102014
                             * Purpose: Change the home page after login success
                             * Earlier: It was PatientLogin, now its PatientSearch
                             */
                            //Changes start here
                            //return RedirectToAction("PatientLogin");
                            objSession.FacilityNumber = "1002";
                            objSession.UserName = currentUser.UserName;
                            objSession.UserId = currentUser.UserID;
                            objSession.SelectedCulture = CultureInfo.CurrentCulture.Name;
                            objSession.LoginUserType = (int)LoginTrackingTypes.UserLogin;

                            var assignedRoles = GetUserRoles(currentUser.UserID);
                            if (assignedRoles.Count == 1)
                            {
                                var currentRole = assignedRoles[0];
                                objSession.FacilityId = currentRole.FacilityId;
                                objSession.RoleId = currentRole.RoleId;
                                objSession.CorporateId = currentRole.CorporateId;
                                // Changed by Shashank ON : 5th May 2015 : To add the Module access level Security when user log in via Facility and Corporate 
                                using (var userbal = new UsersBal())
                                    objSession.MenuSessionList = userbal.GetTabsByUserIdRoleId(objSession.UserId, objSession.RoleId, currentRole.FacilityId, currentRole.CorporateId, isDeleted: false, isActive: true);

                                //var moduleAccessBal = new ModuleAccessBal();
                                //Session[SessionNames.SessoionModuleAccess.ToString()] =
                                //    moduleAccessBal.GetModulesAccessList(currentRole.CorporateId, currentRole.FacilityId);

                                using (var userBal = new UsersBal())
                                {
                                    var cm = userBal.GetUserDetails(currentRole.RoleId, currentRole.FacilityId, objSession.UserId);
                                    objSession.RoleName = cm.RoleName;
                                    objSession.FacilityName = cm.DefaultFacility;
                                    objSession.UserName = cm.UserName;
                                    objSession.FacilityNumber = cm.FacilityNumber;
                                    objSession.UserIsAdmin = cm.UserIsAdmin;
                                    objSession.LoginUserType = (int)LoginTrackingTypes.UserLogin;
                                    objSession.RoleKey = cm.RoleKey;
                                }

                                using (var facilitybal = new FacilityBal())
                                {
                                    var facilityObj = facilitybal.GetFacilityByFacilityId(currentRole.FacilityId);
                                    var timezoneValue = facilityObj.FacilityTimeZone;
                                    if (!string.IsNullOrEmpty(timezoneValue))
                                    {
                                        var timezoneobj = TimeZoneInfo.FindSystemTimeZoneById(timezoneValue);
                                        objSession.TimeZone = timezoneobj.BaseUtcOffset.TotalHours.ToString();
                                    }
                                    else
                                        objSession.TimeZone = "0.0";
                                }

                                using (var rtBal = new RoleTabsBal())
                                {
                                    objSession.IsPatientSearchAccessible = rtBal.CheckIfTabNameAccessibleToGivenRole("Patient Lookup",
                                        ControllerAccess.PatientSearch.ToString(), ActionNameAccess.PatientSearch.ToString(),
                                        Convert.ToInt32(currentRole.RoleId));
                                    objSession.IsAuthorizationAccessible =
                                        rtBal.CheckIfTabNameAccessibleToGivenRole("Obtain Insurance Authorization",
                                            ControllerAccess.Authorization.ToString(),
                                            ActionNameAccess.AuthorizationMain.ToString(), Convert.ToInt32(currentRole.RoleId));
                                    objSession.IsActiveEncountersAccessible =
                                        rtBal.CheckIfTabNameAccessibleToGivenRole("Active Encounters",
                                            ControllerAccess.ActiveEncounter.ToString(),
                                            ActionNameAccess.ActiveEncounter.ToString(),
                                            Convert.ToInt32(currentRole.RoleId));
                                    objSession.IsBillHeaderViewAccessible =
                                        rtBal.CheckIfTabNameAccessibleToGivenRole("Generate Preliminary Bill",
                                            ControllerAccess.BillHeader.ToString(),
                                            ActionNameAccess.Index.ToString(), Convert.ToInt32(currentRole.RoleId));
                                    objSession.IsEhrAccessible =
                                        rtBal.CheckIfTabNameAccessibleToGivenRole("EHR",
                                            ControllerAccess.Summary.ToString(),
                                            ActionNameAccess.PatientSummary.ToString(), Convert.ToInt32(currentRole.RoleId));

                                    objSession.SchedularAccessible =
                                        rtBal.CheckIfTabNameAccessibleToGivenRole("Scheduling", string.Empty, string.Empty, Convert.ToInt32(currentRole.RoleId));
                                }

                                /*
                                 * By: Amit Jain
                                 * On: 24082015
                                 * Purpose: Setting up the table numbers for the Billing Codes
                                 */
                                //----Billing Codes' Table Number additions start here---------------
                                if (objSession.CorporateId > 0 && !string.IsNullOrEmpty(objSession.FacilityNumber))
                                {
                                    using (var bBal = new SuppliesDotComParametersBal())
                                    {
                                        var currentParameter = bBal.GetDetailsByCorporateAndFacility(
                                            objSession.CorporateId, objSession.FacilityNumber);

                                        var cDetails = new Corporate();
                                        using (var cBal = new CorporateBal())
                                            cDetails = cBal.GetCorporateById(objSession.CorporateId);


                                        if (objSession.UserId != 1)
                                        {
                                            objSession.CptTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.CPTTableNumber)
                                                    ? currentParameter.CPTTableNumber
                                                    : cDetails.DefaultCPTTableNumber;

                                            objSession.ServiceCodeTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.ServiceCodeTableNumber)
                                                    ? currentParameter.ServiceCodeTableNumber
                                                    : cDetails.DefaultServiceCodeTableNumber;

                                            objSession.DrugTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.DrugTableNumber)
                                                    ? currentParameter.DrugTableNumber
                                                    : cDetails.DefaultDRUGTableNumber;

                                            objSession.DrgTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.DRGTableNumber)
                                                    ? currentParameter.DRGTableNumber
                                                    : cDetails.DefaultDRGTableNumber;

                                            objSession.HcPcsTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.HCPCSTableNumber)
                                                    ? currentParameter.HCPCSTableNumber
                                                    : cDetails.DefaultHCPCSTableNumber;

                                            objSession.DiagnosisCodeTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.DiagnosisTableNumber)
                                                    ? currentParameter.DiagnosisTableNumber
                                                    : cDetails.DefaultDiagnosisTableNumber;


                                            objSession.BillEditRuleTableNumber =
                                                currentParameter != null && !string.IsNullOrEmpty(currentParameter.BillEditRuleTableNumber)
                                                    ? currentParameter.BillEditRuleTableNumber
                                                    : cDetails.BillEditRuleTableNumber;

                                            objSession.DefaultCountryId = currentParameter.DefaultCountry > 0
                                                ? currentParameter.DefaultCountry : 45;
                                        }
                                        else
                                        {
                                            objSession.CptTableNumber = "0";
                                            objSession.ServiceCodeTableNumber = "0";
                                            objSession.DrugTableNumber = "0";
                                            objSession.DrgTableNumber = "0";
                                            objSession.HcPcsTableNumber = "0";
                                            objSession.DiagnosisCodeTableNumber = "0";
                                            objSession.BillEditRuleTableNumber = "0";
                                        }
                                    }
                                }
                                //----Billing Codes' Table Number additions end here---------------

                            }
                            Session[SessionNames.SessionClass.ToString()] = objSession;
                        }

                        //Send Email Async
                        var resul = await MailHelper.SendEmailAsync(objRequest: new EmailInfo
                        {
                            DisplayName = "Services Dot - Admin",
                            Email = "aj@gttechsolutions.com",
                            Subject = $"Logged-In successfully at {Request.Url.AbsoluteUri}",
                            MessageBody = $"Hello, <br/> You have successfully login at {DateTime.UtcNow}. <br/>",
                        });


                        //return RedirectToAction("PatientSearch", "PatientSearch");  
                        return RedirectToAction("Welcome", "Home");
                        //Changes end here
                    }
                }
                else
                {
                    if (currentUser != null)
                    {
                        if (currentUser.Password == null || !currentUser.Password.Equals(encryptPassword))
                            ViewBag.check = LoginResponseTypes.Failed.ToString();
                        else if (!currentUser.IsActive)
                            ViewBag.check = LoginResponseTypes.InActive.ToString();
                        else if (currentUser.IsDeleted != null && Convert.ToBoolean(currentUser.IsDeleted))
                            ViewBag.check = LoginResponseTypes.IsDeleted.ToString();
                        else
                            ViewBag.check = LoginResponseTypes.Failed.ToString();
                    }
                    else
                        ViewBag.check = LoginResponseTypes.Failed.ToString();

                    if (currentUser != null && !string.IsNullOrEmpty(currentUser.UserName) && ViewBag.check == LoginResponseTypes.Failed.ToString())
                    {
                        if (currentUser.FailedLoginAttempts < 3 || currentUser.FailedLoginAttempts == null)
                        {
                            var failedlogin = Convert.ToDateTime(currentUser.LastInvalidLogin);
                            var timespan = Helpers.GetInvariantCultureDateTime().Subtract(failedlogin);
                            var failedattempts = timespan.TotalMinutes < 30 ? Convert.ToInt32(currentUser.FailedLoginAttempts) + 1 : 1;
                            UpdateFailedLog(currentUser.UserID, failedattempts);
                        }
                        else if (currentUser.FailedLoginAttempts == 3)
                        {
                            var failedlogin = Convert.ToDateTime(currentUser.LastInvalidLogin);
                            var timespan = Helpers.GetInvariantCultureDateTime().Subtract(failedlogin);
                            if (timespan.TotalMinutes < 30)
                                flag = false;
                            var passwordDisablelog = new AuditLog()
                            {
                                CorporateId = currentUser.CorporateId,
                                UserId = currentUser.UserID,
                                CreatedDate = Helpers.GetInvariantCultureDateTime(),
                                TableName = "Users",
                                FieldName = "Password_Disabled",
                                PrimaryKey = 0,
                                FacilityId = currentUser.FacilityId,
                                EventType = "Added"
                            };
                            var auditlogbal = new AuditLogBal().AddUptdateAuditLog(passwordDisablelog);
                        }
                    }
                    else if (currentUser == null && ViewBag.check == LoginResponseTypes.Failed.ToString())
                    {
                        var userbyUsername = usersBal.GetUserbyUserName(model.UserName);
                        if (userbyUsername != null)
                        {
                            if (userbyUsername.FailedLoginAttempts < 3 || userbyUsername.FailedLoginAttempts == null)
                            {
                                var failedlogin = Convert.ToDateTime(userbyUsername.LastInvalidLogin);
                                var timespan = Helpers.GetInvariantCultureDateTime().Subtract(failedlogin);
                                var failedattempts = timespan.TotalMinutes < 30
                                                         ? Convert.ToInt32(userbyUsername.FailedLoginAttempts) + 1
                                                         : 1;
                                UpdateFailedLog(userbyUsername.UserID, failedattempts);
                            }
                            else if (userbyUsername.FailedLoginAttempts == 3)
                            {
                                var failedlogin = Convert.ToDateTime(userbyUsername.LastInvalidLogin);
                                var timespan = Helpers.GetInvariantCultureDateTime().Subtract(failedlogin);
                                if (timespan.TotalMinutes < 30)
                                {
                                    flag = false;
                                }
                                var passwordDisablelog = new AuditLog()
                                {
                                    CorporateId = userbyUsername.CorporateId,
                                    UserId = userbyUsername.UserID,
                                    CreatedDate =
                                                                     Helpers.GetInvariantCultureDateTime(),
                                    TableName = "Users",
                                    FieldName = "Password_Disabled",
                                    PrimaryKey = 0,
                                    FacilityId = userbyUsername.FacilityId,
                                    EventType = "Added"
                                };
                                var auditlogbal = new AuditLogBal().AddUptdateAuditLog(passwordDisablelog);
                            }
                        }
                    }
                    if (flag == false)
                        ViewBag.check = LoginResponseTypes.Blocked.ToString();//"User is Blocked for 3 failed attempts.";Blocked
                }
            }
            return View(login);
        }

        /// <summary>
        /// Changes the new password.
        /// Also update the Audit log for change password
        /// </summary>
        /// <param name="newPassword">The new password.</param>
        /// <returns></returns>
        public ActionResult ChangeNewPassword(String newPassword)
        {
            var userid = Helpers.GetLoggedInUserId();

            var usersbal = new UsersBal();
            var isExists = usersbal.CheckExistsPassword(newPassword, userid);
            if (isExists)
            {
                return Json("-1");
            }
            var currentUser = usersbal.GetUserById(userid);
            currentUser.Password = newPassword;
            var isupdated = usersbal.AddUpdateUser(currentUser, 0);
            var auditlogbal = new AuditLogBal();
            var auditlogObj = new AuditLog
            {
                AuditLogID = 0,
                UserId = userid,
                CreatedDate = Helpers.GetInvariantCultureDateTime(),
                TableName = "Users",
                FieldName = "Password",
                PrimaryKey = 0,
                OldValue = string.Empty,
                NewValue = string.Empty,
                CorporateId = Helpers.GetSysAdminCorporateID(),
                FacilityId = Helpers.GetDefaultFacilityId()
            };
            auditlogbal.AddUptdateAuditLog(auditlogObj);
            //Session.RemoveAll();
            return Json(isupdated > 0);
        }

        /// <summary>
        /// Logs the off.
        /// </summary>
        /// <returns></returns>
        public ActionResult LogOff()
        {
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            var objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            var userType = 1;
            if (objSession != null)
            {
                using (var bal = new LoginTrackingBal())
                    bal.UpdateLoginOutTime(objSession.UserId, Helpers.GetInvariantCultureDateTime());
                userType = objSession.LoginUserType;
            }
            Session.RemoveAll();

            // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            var cookie2 = new HttpCookie("ASP.NET_SessionId", "") { Expires = currentDateTime.AddYears(-1) };
            Response.Cookies.Add(cookie2);

            // Invalidate the Cache on the Client Side
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetNoStore();


            return RedirectToAction(userType == (int)LoginTrackingTypes.PatientLogin ? "PatientLogin" : "UserLogin");
        }

        #region Country, States and Cities Dropdown Data Binding
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetStatesByCountryId(string countryId)
        {
            var bal = new StateBal();
            var stateList = bal.GetStatesByCountryId(Convert.ToInt32(countryId));
            return Json(stateList);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetCitiesByStateId(string stateId)
        {
            var cityBal = new CityBal();
            var list = cityBal.GetCityListByStateId(Convert.ToInt32(stateId));
            return Json(list);

        }


        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetCountryInfoByCountryID(string countryId)
        {
            var CountryBal = new CountryBal();
            var objCountry = CountryBal.GetCountryInfoByCountryID(Convert.ToInt32(countryId));
            return Json(objCountry);

        }


        #endregion

        /// <summary>
        /// Gets all global code categories.
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetAllGlobalCodeCategories()
        {
            using (var bal = new GlobalCodeCategoryBal())
            {
                var list = bal.GetGlobalCodeCategories();
                return Json(list);
            }
        }

        /// <summary>
        /// Welcomes this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Welcome()
        {
            var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            ViewBag.Role = session == null ? string.Empty : session.RoleId.ToString(); //for view bag role session value
            ViewBag.FirstTimeLogin = session == null || session.FirstTimeLogin;
            return View();
        }

        /// <summary>
        /// Gets the global code categories.
        /// </summary>
        /// <param name="startRange">The start range.</param>
        /// <param name="endRange">The end range.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetGlobalCodeCategories(string startRange, string endRange)
        {
            using (var bal = new GlobalCodeCategoryBal())
            {
                var list = bal.GetGlobalCodeCategoriesRange(Convert.ToInt32(startRange), Convert.ToInt32(endRange));
                return Json(list);
            }
        }


        /// <summary>
        /// Gets the global codes.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <returns></returns>
        //[AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public JsonResult GetGlobalCodes(string categoryId)
        {
            var bal = new GlobalCodeBal();
            var list = bal.GetGlobalCodesByCategoryValue(categoryId).OrderBy(x => x.GlobalCodeName);
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetGlobalCodesOrderByGlobalCodeId(string categoryId)
        {
            var bal = new GlobalCodeBal();
            var list = bal.GetGlobalCodesByCategoryValue(categoryId).OrderBy(x => x.GlobalCodeID);
            return Json(list);
        }


        /// <summary>
        /// Gets the name of the global codes orderby.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetGlobalCodesOrderbyName(string categoryId)
        {
            var bal = new GlobalCodeBal();
            var list = bal.GetGlobalCodesByCategoryValue(categoryId).OrderBy(x => (x.GlobalCodeName)).ToList();
            return Json(list);
        }

        /// <summary>
        /// Gets the countries with code.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetCountriesWithCode()
        {
            using (var bal = new CountryBal())
            {
                var list = bal.GetCountryWithCode().OrderBy(x => x.CountryName);
                return Json(list);
            }
        }

        /// <summary>
        /// Gets the facility name by identifier.
        /// </summary>
        /// <param name="facilityNumber">The facility number.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetFacilityNameById(string facilityNumber)
        {
            using (var facilityBal = new FacilityBal())
            {
                if (string.IsNullOrEmpty(facilityNumber))
                {
                    if (Session[SessionNames.SessionClass.ToString()] != null)
                    {
                        var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                        facilityNumber = session.FacilityNumber;
                    }
                }
                var name = facilityBal.GetFacilityNameByNumber(facilityNumber);
                return Json(name);
            }
        }

        /// <summary>
        /// Binds the generic enitity DDL.
        /// </summary>
        /// <param name="column1">The column1.</param>
        /// <param name="column2">The column2.</param>
        /// <param name="enitityName">Name of the enitity.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult BindGenericEnitityDDL(string column1, string column2, string enitityName)
        {
            return Json(null);
        }

        /// <summary>
        /// Binds the corporate DDL.
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult BindCorporateDDL()
        {
            using (var corporateBal = new CorporateBal())
            {
                var corporatId = Helpers.GetDefaultCorporateId();
                var list = corporateBal.GetCorporateDDL(corporatId);
                return Json(list);
            }
        }

        //[LogonAuthorize]
        //public ActionResult GetCorporatesDropdownData()
        //{
        //    //Need Changes here --Amit Jain as on 29102014
        //    using (var cBal = new CorporateBal())
        //    {
        //        var cId = Helpers.GetDefaultCorporateId();
        //        var corpList = cBal.GetCorporateDDL(cId);
        //        if (corpList.Count > 0)
        //        {
        //            var list = new List<SelectListItem>();
        //            list.AddRange(corpList.Select(item => new SelectListItem
        //            {
        //                Text = item.CorporateName,
        //                Value = item.CorporateID.ToString()
        //            }));
        //            return Json(list);
        //        }
        //    }
        //    return Json(null);
        //}

        /// <summary>
        /// Gets the corporates dropdown data.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetCorporatesDropdownData()
        {
            //Need Changes here --Amit Jain as on 29102014
            using (var cBal = new CorporateBal())
            {
                var cId = Helpers.GetDefaultCorporateId();
                var corpList = cBal.GetCorporateDDL(cId);
                if (corpList != null)
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(corpList.Select(item => new SelectListItem
                    {
                        Text = item.CorporateName,
                        Value = item.CorporateID.ToString()
                    }));
                    return Json(list.OrderBy(x => x.Text));
                }
            }
            return Json(null);
        }

        /// <summary>
        /// Gets the roles dropdown data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetRolesDropdownData(string corporateId)
        {
            using (var roleBal = new RoleBal())
            {
                var roles = roleBal.GetRolesByCorporateId(Convert.ToInt32(corporateId));
                if (roles.Count > 0)
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(roles.Select(item => new SelectListItem
                    {
                        Text = item.RoleName,
                        Value = item.RoleID.ToString()
                    }));
                    return Json(list);
                }
            }
            return Json(null);
        }

        /// <summary>
        /// Gets the distinct roles dropdown data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetDistinctRolesDropdownData(string corporateId)
        {
            using (var roleBal = new RoleBal())
            {
                var roles = roleBal.GetRolesByCorporateId(Convert.ToInt32(corporateId));
                if (roles.Count > 0)
                {
                    roles = roles.DistinctBy(x => x.RoleName).ToList();
                    var list = new List<SelectListItem>();
                    list.AddRange(roles.Select(item => new SelectListItem
                    {
                        Text = item.RoleName,
                        Value = item.RoleID.ToString()
                    }));
                    return Json(list);
                }
            }
            return Json(null);
        }

        /// <summary>
        /// Gets the roles by facility dropdown data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetRolesByFacilityDropdownData(string corporateId, string facilityId)
        {
            using (var roleBal = new RoleBal())
            {
                var roles = roleBal.GetRolesByCorporateIdFacilityId(Convert.ToInt32(corporateId), Convert.ToInt32(facilityId));
                if (roles.Count > 0)
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(roles.Select(item => new SelectListItem
                    {
                        Text = item.RoleName,
                        Value = item.RoleID.ToString()
                    }));
                    list = list.OrderBy(x => x.Text).ToList();
                    return Json(list);
                }
            }
            return Json(0);
        }

        /// <summary>
        /// Gets the facility roles by corporate facility dropdown data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetFacilityRolesByCorporateFacilityDropdownData(string corporateId, string facilityId)
        {
            using (var roleBal = new RoleBal())
            {
                var roles = roleBal.GetFacilityRolesByCorporateIdFacilityId(Convert.ToInt32(corporateId), Convert.ToInt32(facilityId));
                if (roles.Count > 0)
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(roles.Select(item => new SelectListItem
                    {
                        Text = item.RoleName,
                        Value = item.RoleID.ToString()
                    }));
                    list = list.OrderBy(x => x.Text).ToList();
                    return Json(list);
                }
            }
            return Json(0);
        }


        /// <summary>
        /// Gets the name of the columns by table.
        /// </summary>
        /// <param name="tableName">Name of the table.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetColumnsByTableName(string tableName)
        {
            var list = new List<DropdownListData>();
            var keyColumn = string.Empty;
            using (var bal = new BaseBal(Helpers.DefaultCptTableNumber, Helpers.DefaultServiceCodeTableNumber, Helpers.DefaultDrgTableNumber, Helpers.DefaultDrugTableNumber, Helpers.DefaultHcPcsTableNumber, Helpers.DefaultDiagnosisTableNumber))
            {
                var result = bal.GetColumnsByTableName(tableName);
                keyColumn = bal.GetKeyColmnNameByTableName(tableName);
                if (result.Count > 0)
                {
                    list.AddRange(result.Select(item => new DropdownListData
                    {
                        Text = item,
                        Value = item,
                    }));
                    list = list.OrderBy(a => a.Text).ToList();
                }
                var jsonResult = new { List = list, KeyColumn = keyColumn };
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the columns for table.
        /// </summary>
        /// <param name="tableid">The tableid.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetColumnsForTable(string tableid)
        {
            var list = new List<DropdownListData>();
            var kColumnlist = new List<DropdownListData>();
            var keyColumn = string.Empty;
            using (var bal = new BaseBal(Helpers.DefaultCptTableNumber, Helpers.DefaultServiceCodeTableNumber, Helpers.DefaultDrgTableNumber, Helpers.DefaultDrugTableNumber, Helpers.DefaultHcPcsTableNumber, Helpers.DefaultDiagnosisTableNumber))
            {
                var result = bal.GetTableStruturebyTableId(tableid).OrderBy(x => Convert.ToInt32(x.SortOrder)).ToList();
                var firstOrDefault = result.FirstOrDefault(x => x.ExternalValue2 == "1");
                if (firstOrDefault != null)
                    keyColumn = result.Any() ? firstOrDefault.GlobalCodeName : "";
                if (result.Count > 0)
                {
                    list.AddRange(result.Select(item => new DropdownListData
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeValue,
                    }));
                    list = list.OrderBy(a => a.Text).ToList();
                }
                var keyColumnList = result.Where(x => x.ExternalValue3 == "1").ToList();
                if (keyColumnList.Count > 0)
                {
                    kColumnlist.AddRange(keyColumnList.Select(item => new DropdownListData
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeName,
                    }));
                    kColumnlist = kColumnlist.OrderBy(a => a.Text).ToList();
                }
                var jsonResult = new { List = list, KeyColumnList = kColumnlist, KeyColumn = keyColumn };
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the users by default corporate identifier.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetUsersByDefaultCorporateId()
        {
            var list = new List<DropdownListData>();
            var corporateId = Helpers.GetDefaultCorporateId();
            var facilityId = Helpers.GetLoggedInUserIsAdmin() ? 0 : Helpers.GetDefaultFacilityId();
            using (var bal = new UsersBal())
            {
                //var usersList = bal.GetUsersByCorporateId(corporateId);
                var usersList = bal.GetUsersByCorporateIdFacilityId(corporateId, facilityId);
                list.AddRange(usersList.Select(item => new DropdownListData
                {
                    Text = item.Name,
                    Value = item.CurrentUser.UserID.ToString(),
                }));
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetUsersByCorporateId()
        {
            var list = new List<DropdownListData>();
            var corporateId = Helpers.GetDefaultCorporateId();
            var facilityId = Helpers.GetLoggedInUserIsAdmin() ? 0 : Helpers.GetDefaultFacilityId();
            using (var bal = new UsersBal())
            {
                //var usersList = bal.GetUsersByCorporateId(corporateId);
                var usersList = bal.GetUsersByCorporateandFacilityId(corporateId, facilityId).OrderBy(x => x.FirstName).ToList();
                list.AddRange(usersList.Select(item => new DropdownListData
                {
                    Text =
                                                                   item.FirstName + " " + item.LastName,
                    Value = item.UserID.ToString(),
                }));
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the users detail by user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <added by="Shashank">ON 12/16/2014</added>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetUsersDetailByUserID(Int32 userId)
        {
            var usersBal = new UsersBal();
            var userObj = usersBal.GetUserById(userId);
            return Json(userObj, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the global codes childs.
        /// </summary>
        /// <param name="globalcodeId">The globalcode identifier.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetGlobalCodesChilds(string globalcodeId)
        {
            var bal = new GlobalCodeBal();
            var list = bal.GetGlobalCodesByCategoryValue(globalcodeId).OrderBy(x => x.GlobalCodeID);
            return Json(list);
        }

        /// <summary>
        /// Gets the facilitiesby corporate.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetFacilitiesbyCorporate(int corporateid)
        {
            var finalList = new List<DropdownListData>();
            var bal = new FacilityBal();
            var list = bal.GetFacilitiesByCorporateId(corporateid).ToList().OrderBy(x => x.FacilityName).ToList();
            if (list.Count > 0)
            {
                var facilityId = Helpers.GetLoggedInUserIsAdmin() ? 0 : Helpers.GetDefaultFacilityId();
                if (facilityId > 0 && corporateid > 0)
                    list = list.Where(f => f.FacilityId == facilityId).ToList();

                finalList.AddRange(list.Select(item => new DropdownListData
                {
                    Text = item.FacilityName,
                    Value = Convert.ToString(item.FacilityId)
                }));
            }
            return Json(finalList);
        }

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetUsers()
        {
            var users = new List<DropdownListData>();
            using (var bal = new UsersBal())
            {
                var result = bal.GetUsersByCorporateIdFacilityId(Helpers.GetDefaultCorporateId(), Helpers.GetDefaultFacilityId());
                if (result.Count > 0)
                {
                    users.AddRange(result.Select(item => new DropdownListData
                    {
                        Text = item.Name,
                        Value = Convert.ToString(item.CurrentUser.UserID),
                        //ExternalValue1 = Convert.ToString(item.CurrentUser.UserType)
                    }));
                }
            }
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the users by facility identifier.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="userType">Type of the user.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetUsersByFacilityId(int facilityId)
        {
            var finalList = new List<DropdownListData>();
            using (var bal = new UsersBal())
            {
                var list = bal.GetAllUsersByFacilityId(facilityId);
                if (list.Count > 0)
                {
                    finalList.AddRange(list.Select(item => new DropdownListData
                    {

                        Text = item.Name,
                        Value = Convert.ToString(item.CurrentUser.UserID)
                    }));
                }
            }
            return Json(finalList, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the time zones.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetTimeZones()
        {
            var timeZones = TimeZoneInfo.GetSystemTimeZones();
            //foreach (TimeZoneInfo timeZoneInfo in timeZones)
            //    Console.WriteLine("{0}", timeZoneInfo.DisplayName);
            var list = new List<SelectListItem>();
            if (timeZones.Count > 0)
            {
                list.AddRange(timeZones.Select(item => new SelectListItem
                {
                    Text = item.DisplayName,
                    Value = item.Id.ToString()
                }));
            }
            return Json(list);
        }

        /// <summary>
        /// Gets the security parameters.
        /// </summary>
        /// <param name="globalCodeCategoryValue">The global code category value.</param>
        /// <returns></returns>
        //[LogonAuthorize]
        public JsonResult GetSecurityParameters(string globalCodeCategoryValue)
        {
            decimal value = 0;

            var objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            if (objSession != null)
                value = objSession.AutoLogOffMinutes;

            if (value <= 0)
            {
                using (var bal = new GlobalCodeBal())
                {
                    var result = bal.GetGlobalCodeByFacilityAndCategory(globalCodeCategoryValue, Helpers.GetDefaultFacilityNumber());
                    value = result == null ? Convert.ToDecimal(0) : Convert.ToDecimal(result.GlobalCodeName);
                    if (objSession != null)
                        objSession.AutoLogOffMinutes = value;
                }
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the type of the column data.
        /// </summary>
        /// <param name="tableName">Name of the table.</param>
        /// <param name="columnName">Name of the column.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetColumnDataType(string tableName, string columnName)
        {
            var baseBalobj = new BaseBal(Helpers.DefaultCptTableNumber, Helpers.DefaultServiceCodeTableNumber, Helpers.DefaultDrgTableNumber, Helpers.DefaultDrugTableNumber, Helpers.DefaultHcPcsTableNumber, Helpers.DefaultDiagnosisTableNumber);
            var datatype = baseBalobj.GetColumnDataTypeByTableNameColumnName(tableName, columnName);
            return Json(datatype, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// Gets the column for managed care table.
        /// </summary>
        /// <param name="tableId">The table identifier.</param>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetColumnForManagedCareTable(string tableId)
        {
            var globalcodeBal = new GlobalCodeBal();
            var globalcodelist = globalcodeBal.GetGlobalCodesByCategoryValue("1017").Where(x => x.ExternalValue1 == tableId).OrderBy(x => x.GlobalCodeID).ToList();
            var globalcodeKeyColumnList = globalcodeBal.GetGlobalCodesByCategoryValue("1016").FirstOrDefault(x => x.GlobalCodeValue == tableId);
            var list = new List<DropdownListData>();
            if (globalcodelist.Count > 0)
            {
                list.AddRange(globalcodelist.Select(item => new DropdownListData
                {
                    Text = item.GlobalCodeName,
                    Value = item.GlobalCodeName,
                }));
                list = list.OrderBy(a => a.Text).ToList();
            }
            var jsonResult = new { List = list, KeyColumn = globalcodeKeyColumnList != null ? globalcodeKeyColumnList.ExternalValue1 : "" };
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        //Language Selection
        /// <summary>
        /// Sets the language fron front page.
        /// </summary>
        /// <param name="language">The language.</param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ActionResult SetLanguageFronFrontPage(string language)
        {
            if (Session[SessionNames.SessionClass.ToString()] != null)
            {
                var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                session.SelectedCulture = !string.IsNullOrEmpty(language) ? language : "en-US";
                if (session.SelectedCulture.ToLower().Equals("en-us"))
                {
                    Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("en-US");
                    Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture("en-US");
                }
                else
                {
                    Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("ar-SA");
                    Thread.CurrentThread.CurrentUICulture = CultureInfo.CreateSpecificCulture("ar-SA");
                }
            }
            return Json(true);
        }

        /// <summary>
        /// Sets the tab session.
        /// </summary>
        /// <param name="oTabsCustomModel">The o tabs custom model.</param>
        /// <returns></returns>
        public JsonResult SetTabSession(TabsCustomModel oTabsCustomModel)
        {
            var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            if (session != null) session.NavTabId = oTabsCustomModel.TabId;
            if (session != null) session.NavParentTabId = oTabsCustomModel.ParentTabId;
            return Json("1", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the selected language.
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSelectedLanguage()
        {
            if (Session[SessionNames.SessionClass.ToString()] != null)
            {
                var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                var selectedCulture = session.SelectedCulture;
                if (!string.IsNullOrEmpty(selectedCulture) && selectedCulture.ToLower().Contains("ar"))
                    return Json("2", JsonRequestBehavior.AllowGet);

                return Json("1", JsonRequestBehavior.AllowGet);
            }
            return Json("1", JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the numbers.
        /// </summary>
        /// <param name="limit">The limit.</param>
        /// <returns></returns>
        public JsonResult GetNumbers(int limit)
        {
            var list = new List<DropdownListData>();
            for (var i = 1; i <= limit; i++)
            {
                list.Add(new DropdownListData
                {
                    Text = Convert.ToString(i),
                    Value = Convert.ToString(i),
                });
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the facilities dropdown data with facility number.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetFacilitiesDropdownDataWithFacilityNumber(int? corporateId)
        {
            using (var facBal = new FacilityBal())
            {
                var facilities = facBal.GetFacilities(Convert.ToInt32(corporateId));
                if (facilities.Count > 0)
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(facilities.Select(item => new SelectListItem
                    {
                        Text = item.FacilityName,
                        Value = item.FacilityNumber,
                    }));
                    return Json(list);
                }
            }
            return Json(null);
        }


        /// <summary>
        /// Get Facilities list
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetFacilitiesWithoutCorporateDropdownData()
        {
            var cId = Helpers.GetDefaultCorporateId();
            var userisAdmin = Helpers.GetLoggedInUserIsAdmin();
            using (var facBal = new FacilityBal())
            {
                var facilities = userisAdmin ? facBal.GetFacilitiesWithoutCorporateFacility(cId) : facBal.GetFacilitiesWithoutCorporateFacility(cId, Helpers.GetDefaultFacilityId());
                if (facilities.Any())
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(facilities.Select(item => new SelectListItem
                    {
                        Text = item.FacilityName,
                        Value = Convert.ToString(item.FacilityId),
                    }));
                    return Json(list);
                }
            }
            return Json(null);
        }

        /// <summary>
        /// Gets the months data.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetMonthsData(string categoryId, int facilityId)
        {
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            var cId = Helpers.GetDefaultCorporateId();
            facilityId = facilityId > 0 ? facilityId : Helpers.GetDefaultFacilityId();
            var defaultYear = currentDateTime.Year;
            var defaultMonth = currentDateTime.Month - 1;

            var list = new List<SelectListItem>();
            using (var bal = new GlobalCodeBal())
            {
                var glist = bal.GetGlobalCodesByCategoryValue(categoryId).OrderBy(x => int.Parse(x.GlobalCodeValue)).ToList();
                if (glist.Any())
                {
                    list.AddRange(glist.Select(item => new SelectListItem
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeValue
                    }));
                }

                var defaults = bal.GetDefaultMonthAndYearByFacilityId(facilityId, cId);
                if (defaults.Count > 0)
                {
                    defaultYear = defaults[0] > 0 ? defaults[0] : defaultYear;
                    defaultMonth = defaults[1] > 0 ? defaults[1] : defaultMonth;
                }

                var jsonData = new
                {
                    list,
                    defaultYear,
                    defaultMonth
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the facility users.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetFacilityUsers(int facilityId)
        {
            var list = new List<SelectListItem>();
            using (var bal = new UsersBal())
            {
                var users = bal.GetFacilityUsers(facilityId);
                if (users.Any())
                {
                    list.AddRange(users.Select(item => new SelectListItem
                    {

                        Text = string.Format("{0} {1}", item.FirstName, item.LastName),
                        Value = Convert.ToString(item.UserID)
                    }));
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the non admin users by corporate.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetNonAdminUsersByCorporate()
        {
            var cId = Helpers.GetSysAdminCorporateID();
            var list = new List<SelectListItem>();
            using (var bal = new UsersBal())
            {
                var users = bal.GetNonAdminUsersByCorporate(cId);
                if (users.Any())
                {
                    list.AddRange(users.Select(item => new SelectListItem
                    {
                        Text = string.Format("{0} {1}", item.FirstName, item.LastName),
                        Value = Convert.ToString(item.UserID)
                    }));
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Saves the snapshot.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SaveSnapshot()
        {
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            var saved = false;
            var fileName = "snapshot" + currentDateTime.Ticks + ".png";
            var serverMapPath = Server.MapPath("~/Documents/Upload");
            if (Request.Form["base64data"] != null)
            {
                var image = Request.Form["base64data"].ToString();
                var data = Convert.FromBase64String(image);
                var path = Path.Combine(serverMapPath, fileName);
                System.IO.File.WriteAllBytes(path, data);
                saved = true;
                Session["AttachedSnapShot"] = path;
            }
            return Json(saved);
        }

        /// <summary>
        /// Sends the reset password link.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        public async Task<ActionResult> SendResetPasswordLink(string email)
        {
            var msgBody = ResourceKeyValues.GetFileText("ResetPasswordTemplate");
            var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            var oUsers = new Users
            {
                ResetToken = CommonConfig.GenerateLoginCode(8, false)
            };
            if (session != null)
            {
                oUsers.UserID = session.UserId;
                oUsers.FacilityId = session.FacilityId;
                oUsers.UserName = session.UserName;
            }
            if (!string.IsNullOrEmpty(msgBody))
            {
                if (session != null)
                {
                    var oFacilityBal = new FacilityBal();
                    var facilityName = oFacilityBal.GetFacilityNameByNumber(session.FacilityNumber);
                    msgBody = msgBody.Replace("{Patient}", oUsers.UserName)
                        .Replace("{Facility-Name}", Convert.ToString(facilityName)).Replace("{CodeValue}", oUsers.ResetToken);
                }
            }
            var emailInfo = new EmailInfo
            {
                VerificationTokenId = oUsers.ResetToken,
                PatientId = oUsers.UserID,
                Email = email,
                Subject = ResourceKeyValues.GetKeyValue("resetpasswordsubject"),
                VerificationLink = "/Home/UserResetPassword",
                MessageBody = msgBody
            };
            var status = await MailHelper.SendEmailAsync(emailInfo);
            var message = status
                        ? ResourceKeyValues.GetKeyValue("resetpasswordemailsuccess")
                        : ResourceKeyValues.GetKeyValue("resetpasswordemailfailure");
            var oUsersBal = new UsersBal();
            var userObj = oUsersBal.GetUserById(oUsers.UserID);
            userObj.ResetToken = oUsers.ResetToken;
            userObj.Password = EncryptDecrypt.GetEncryptedData(userObj.Password, "");
            var updatedId = oUsersBal.UpdateUser(userObj);
            var jsonStatus = new { message };
            return Json(jsonStatus, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Users the reset password.
        /// </summary>
        /// <param name="e">The e.</param>
        /// <param name="vtoken">The vtoken.</param>
        /// <returns></returns>
        public ActionResult UserResetPassword(string e, string vtoken)
        {
            var oUsersBal = new UsersBal();
            var usersObj = oUsersBal.GetUserByEmailAndToken(e, vtoken);
            usersObj.CodeValue = vtoken;
            usersObj.OldPassword = usersObj.Password;
            return View(usersObj);
        }

        /// <summary>
        /// Forgots the password.
        /// </summary>
        /// <param name="e">The e.</param>
        /// <param name="vtoken">The vtoken.</param>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult ForgotPassword(string e, string vtoken)
        {
            using (var oUsersBal = new UsersBal())
            {
                var usersObj = oUsersBal.GetUserByEmail(e);
                e = !string.IsNullOrEmpty(e) ? e.ToLower().Trim() : string.Empty;
                if (usersObj.ResetToken == vtoken && usersObj.Email.ToLower().Equals(e))
                {
                    return View(usersObj);
                }
                return Content("This page is invalid. Please try again later!");
            }
        }

        /// <summary>
        /// Resets the new password.
        /// </summary>
        /// <param name="oUsersViewModel">The o users view model.</param>
        /// <returns></returns>
        [AllowAnonymous]
        public string ResetNewPassword(UsersViewModel oUsersViewModel)
        {
            var oUsersBal = new UsersBal();
            var userObj = oUsersBal.GetUserById(oUsersViewModel.UserID);
            userObj.ResetToken = string.Empty;
            userObj.Password = EncryptDecrypt.GetEncryptedData(oUsersViewModel.NewPassword, "");
            oUsersBal.UpdateUser(userObj);
            return "Password reset successfully";
        }

        /// <summary>
        /// Sends the forgot password link.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <returns></returns>
        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<ActionResult> SendForgotPasswordLink(string email)
        {
            string result;
            var msgBody = ResourceKeyValues.GetFileText("forgotpwdtemplate");
            var uBal = new UsersBal();

            var userDetail = uBal.GetUserByEmailWithoutDecryption(email);
            if (userDetail != null && !string.IsNullOrEmpty(userDetail.Email) && userDetail.Email.ToLower().Trim().Equals(email.ToLower().Trim()))
            {
                result = "1";
                userDetail.ResetToken = CommonConfig.GenerateLoginCode(8, false);
                if (!string.IsNullOrEmpty(msgBody))
                    msgBody = msgBody.Replace("{Patient}",
                        string.Format("{0} {1}", userDetail.FirstName, userDetail.LastName))
                        .Replace("{CodeValue}", userDetail.ResetToken);

                var emailInfo = new EmailInfo
                {
                    VerificationTokenId = userDetail.ResetToken,
                    PatientId = userDetail.UserID,
                    Email = email,
                    Subject = ResourceKeyValues.GetKeyValue("resetpasswordsubject"),
                    VerificationLink = "/Home/ForgotPassword",
                    MessageBody = msgBody
                };

                if (result == "1")
                {
                    var status = await MailHelper.SendEmailAsync(emailInfo);
                    result = status ? "1" : "-2";
                }

                if (result == "1")
                {
                    var updatedId = uBal.UpdateUser(userDetail);
                    result = updatedId == userDetail.UserID ? "1" : "-3";
                }
            }
            else
                result = "-1";

            var jsonStatus = new { result };
            return Json(jsonStatus, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Sessions the timeout.
        /// </summary>
        /// <returns></returns>
        public ActionResult SessionTimeout()
        {
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            var objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            var userType = 1;
            var jsonObjreturn = false;
            if (objSession != null)
            {
                using (var bal = new LoginTrackingBal())
                    bal.UpdateLoginOutTime(objSession.UserId, Helpers.GetInvariantCultureDateTime());
                userType = objSession.LoginUserType;
                jsonObjreturn = true;
            }
            Session.RemoveAll();

            // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            var cookie2 = new HttpCookie("ASP.NET_SessionId", "") { Expires = currentDateTime.AddYears(-1) };
            Response.Cookies.Add(cookie2);

            // Invalidate the Cache on the Client Side
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetNoStore();


            return Json(jsonObjreturn);
        }

        /// <summary>
        /// Checks the tabs access.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public JsonResult CheckTabsAccess()
        {
            var ehrAccess = true;
            var acEncounterAccess = true;
            var authAccess = true;
            var pSearchAccess = true;
            if (Session[SessionNames.SessionClass.ToString()] != null && Session[SessionNames.SessionClass.ToString()] is SessionClass objSession)
            {
                ehrAccess = objSession.IsEhrAccessible;
                acEncounterAccess = objSession.IsActiveEncountersAccessible;
                authAccess = objSession.IsAuthorizationAccessible;
                pSearchAccess = objSession.IsPatientSearchAccessible;
            }
            var jsonResult = new
            {
                ehrAccess,
                acEncounterAccess,
                authAccess,
                pSearchAccess
            };

            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the rule editor users.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetRuleEditorUsers()
        {
            var list = new List<DropdownListData>();
            var corporateId = Helpers.GetSysAdminCorporateID();
            var facilityId = Helpers.GetDefaultFacilityId();
            using (var bal = new UsersBal())
            {
                //var usersList = bal.GetBillEditorUsers(corporateId, facilityId);
                //list.AddRange(usersList.Select(item => new DropdownListData
                //{
                //    Text = item.Name + " (" + item.RoleName + ")",
                //    Value = item.UserId.ToString(),
                //}));
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the facility deapartments.
        /// </summary>
        /// <returns>Json List</returns>
        [AcceptVerbs(HttpVerbs.Post)]
        [LoginAuthorize]
        public ActionResult GetFacilityDeapartments()
        {
            var loggedinFacility = Helpers.GetDefaultFacilityId();
            var list = new List<SelectListItem>();
            using (var bal = new FacilityStructureBal())
            {
                var facilityDepartments = bal.GetFacilityDepartments(Helpers.GetSysAdminCorporateID(), loggedinFacility.ToString());
                if (facilityDepartments.Any())
                {
                    list.AddRange(facilityDepartments.Select(item => new SelectListItem
                    {
                        Text = string.Format(" {0} ", item.FacilityStructureName),
                        Value = Convert.ToString(item.FacilityStructureId)
                    }));
                }
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Determines whether [is in range] [the specified start time].
        /// </summary>
        /// <param name="startTime">The start time.</param>
        /// <param name="endTime">The end time.</param>
        /// <returns></returns>
        protected bool IsInRange(String startTime, String endTime)
        {
            var stringStartTime = Convert.ToString(Convert.ToDateTime(startTime).TimeOfDay);
            var stringEndTime = Convert.ToString(Convert.ToDateTime(endTime).TimeOfDay);
            var timeRange = TimeRange.Parse(stringStartTime + "-" + stringEndTime);

            var isNowInTheRange = timeRange.IsIn(Helpers.GetInvariantCultureDateTime().TimeOfDay);
            return isNowInTheRange;
        }

        /// <summary>
        /// Gets the user roles.
        /// </summary>
        /// <param name="userid">The userid.</param>
        /// <returns></returns>
        private List<RoleSelectionCustomModel> GetUserRoles(int userid)
        {
            var userroleList = new List<RoleSelectionCustomModel>();
            var userroleBal = new UserRoleBal();
            var roleBal = new RoleBal();
            var facilityRole = new FacilityRoleBal();
            var facility = new FacilityBal();
            var roles = userroleBal.GetUserRolesByUserId(userid);
            foreach (var role in roles)
            {
                var roleFacilityIds = facilityRole.GetFacilityRolesByRoleId(role.RoleID);
                userroleList.AddRange(roleFacilityIds.Select(rolefacility => new RoleSelectionCustomModel
                {
                    RoleId = role.RoleID,
                    RoleName = roleBal.GetRoleNameById(role.RoleID),
                    FacilityName = facility.GetFacilityNameById(rolefacility.FacilityId),
                    FacilityId = rolefacility.FacilityId,
                    CorporateId = rolefacility.CorporateId
                }));
            }
            userroleList = userroleList.DistinctBy(r => r.RoleId).ToList();
            return userroleList;
        }

        /// <summary>
        /// Updates the failed log.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="failedLoginAttempt">The failed login attempt.</param>
        private void UpdateFailedLog(int userId, int failedLoginAttempt)
        {
            using (var bal = new UsersBal())
            {
                var objUsersViewModel = bal.GetUserById(userId);
                objUsersViewModel.FailedLoginAttempts = failedLoginAttempt;
                objUsersViewModel.LastInvalidLogin = Helpers.GetInvariantCultureDateTime();
                bal.AddUpdateUser(objUsersViewModel, 0);
            }
        }

        /// <summary>
        /// Method is used to bind the user type drop down
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public JsonResult BindUsersType(string corporateId, string facilityId)
        {
            using (var fRole = new FacilityRoleBal())
            {
                var list = new List<DropdownListData>();
                var roleList = fRole.GetUserTypeRoleDropDown(Convert.ToInt32(corporateId), Convert.ToInt32(facilityId), true);
                if (roleList.Count > 0)
                {
                    list.AddRange(roleList.Select(item => new DropdownListData
                    {
                        Text = string.Format("{0}", item.RoleName),
                        Value = Convert.ToString(item.RoleId)
                    }));
                }
                return Json(list, JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        /// Gets the corporate physicians.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetCorporatePhysicians(string corporateId, string facilityId)
        {
            return null;
        }

        /// <summary>
        /// Gets the global codes check ListView.
        /// </summary>
        /// <param name="ggcValue">The GGC value.</param>
        /// <returns></returns>
        public ActionResult GetGlobalCodesCheckListView(string ggcValue)
        {
            using (var globalCodeBal = new GlobalCodeBal())
            {
                var globalCodelist = globalCodeBal.GetGCodesListByCategoryValue(ggcValue).Where(x => x.ExternalValue1 != "3").ToList().OrderBy(x => Convert.ToInt32(x.GlobalCodeValue));
                var viewpath = string.Format("../FacultyTimeslots/{0}", PartialViews.StatusCheckBoxList);
                return PartialView(viewpath, globalCodelist);
            }
        }

        /// <summary>
        /// Gets the global codes availability.
        /// </summary>
        /// <param name="ggcValue">The GGC value.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetGlobalCodesAvailability(string ggcValue, string facilityId)
        {
            using (var globalCodeBal = new GlobalCodeBal())
            {
                var globalCodelist = globalCodeBal.GetGCodesListByCategoryValue(ggcValue).Where(x => x.ExternalValue1 == "1").ToList();
                var holidayStatus = globalCodeBal.GetGCodesListByCategoryValue(ggcValue).Where(x => x.ExternalValue1 == "4").ToList();
                var holidayTypes = globalCodeBal.GetGCodesListByCategoryValue(ggcValue).Where(x => x.ExternalValue1 == "3").ToList();
                var cId = Helpers.GetSysAdminCorporateID().ToString();
                cId = string.IsNullOrEmpty(facilityId)
                          ? cId
                          : Helpers.GetCorporateIdByFacilityId(Convert.ToInt32(facilityId)).ToString();
                var isAdmin = Helpers.GetLoggedInUserIsAdmin();
                var userid = Helpers.GetLoggedInUserId();
                var list = new
                {
                    gClist = globalCodelist,
                    hStatus = holidayStatus,
                    hTypes = holidayTypes
                };
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// Method is used to get department by passing facility id
        /// </summary>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public ActionResult GetDepartmentsByFacility(int facilityId)
        {
            var list = new List<SelectListItem>();
            using (var bal = new FacilityStructureBal())
            {
                var facilityDepartments = bal.GetFacilityDepartments(Helpers.GetSysAdminCorporateID(), facilityId.ToString());
                if (facilityDepartments.Any())
                {
                    list.AddRange(facilityDepartments.Select(item => new SelectListItem
                    {
                        Text = string.Format(" {0} ", item.FacilityStructureName),
                        Value = Convert.ToString(item.FacilityStructureId)
                    }));
                }
                var cId = Helpers.GetSysAdminCorporateID().ToString();
                cId = facilityId == 0
                    ? cId
                    : Helpers.GetCorporateIdByFacilityId(Convert.ToInt32(facilityId)).ToString();
                var isAdmin = Helpers.GetLoggedInUserIsAdmin();
                var userid = Helpers.GetLoggedInUserId();
            }
            var updatedList = new
            {
                deptList = list
            };
            return Json(updatedList, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Get Facilities list
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetFacilitiesDropdownData()
        {
            var cId = Helpers.GetDefaultCorporateId();
            var userisAdmin = Helpers.GetLoggedInUserIsAdmin();
            using (var facBal = new FacilityBal())
            {
                var facilities = userisAdmin ? facBal.GetFacilities(cId) : facBal.GetFacilities(cId, Helpers.GetDefaultFacilityId());
                if (facilities.Any())
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(facilities.Select(item => new SelectListItem
                    {
                        Text = item.FacilityName,
                        Value = Convert.ToString(item.FacilityId),
                    }));

                    list = list.OrderBy(f => f.Text).ToList();
                    return Json(list);
                }
            }
            return Json(null);
        }


        /// <summary>
        /// Method to get facilities on scheduler
        /// </summary>
        /// <returns></returns>
        public ActionResult GetFacilitiesDropdownDataOnScheduler()
        {
            var cId = Helpers.GetSysAdminCorporateID();
            var userisAdmin = Helpers.GetLoggedInUserIsAdmin();
            using (var facBal = new FacilityBal())
            {
                var facilities = userisAdmin ? facBal.GetFacilities(cId) : facBal.GetFacilities(cId, Helpers.GetDefaultFacilityId());
                if (facilities.Any())
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(facilities.Select(item => new SelectListItem
                    {
                        Text = item.FacilityName,
                        Value = Convert.ToString(item.FacilityId),
                    }));

                    list = list.OrderBy(f => f.Text).ToList();
                    return Json(list);
                }
            }
            return Json(null);
        }
        /// <summary>
        /// Gets the facilty list.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetFaciltyListTreeView()
        {
            // Initialize the Facility Communicator object
            using (var facilityBal = new FacilityBal())
            {
                // Get the facilities list
                var cId = Helpers.GetSysAdminCorporateID();
                var facilityList = facilityBal.GetFacilityList(cId);
                var viewpath = string.Format("../FacultyTimeslots/{0}", PartialViews.LocationListView);
                return PartialView(viewpath, facilityList);
            }
        }

        /// <summary>
        /// Loads the facility department data.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public ActionResult LoadFacilityDepartmentData(string facilityid)
        {
            using (var facilityBal = new FacilityStructureBal())
            {
                // Get the facilities list
                var cId = Helpers.GetSysAdminCorporateID();
                var facilityDepartmentList = facilityBal.GetFacilityDepartments(cId, facilityid);
                var viewpath = string.Format("../FacultyTimeslots/{0}", PartialViews.FacilityDepartmentListView);
                return PartialView(viewpath, facilityDepartmentList);
            }
        }

        /// <summary>
        /// Loads the facility rooms data.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public ActionResult LoadFacilityRoomsData(string facilityid)
        {
            using (var facilityBal = new FacilityStructureBal())
            {
                // Get the facilities list
                var cId = Helpers.GetSysAdminCorporateID();
                var facilityDepartmentList = facilityBal.GetFacilityRooms(cId, facilityid);
                var viewpath = string.Format("../FacultyTimeslots/{0}", PartialViews.FacilityRoomsListView);
                return PartialView(viewpath, facilityDepartmentList);
            }
        }

        /// <summary>
        /// Loads the facility rooms data custom.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public ActionResult LoadFacilityRoomsDataCustom(string facilityid)
        {
            using (var facilityBal = new FacilityStructureBal())
            {
                // Get the facilities list
                var cId = Helpers.GetSysAdminCorporateID();
                var facilityDepartmentList = facilityBal.GetFacilityRoomsCustomModel(cId, facilityid);
                var viewpath = string.Format("../FacultyTimeslots/{0}", PartialViews.FacilityRoomsListView);
                return PartialView(viewpath, facilityDepartmentList);
            }
        }

        //[AllowAnonymous]
        //public ActionResult ConfirmationView()
        //{
        //    return View();
        //}
        [AllowAnonymous]
        public ActionResult ConfirmationView(string st, string vtoken, int patientId, string physicianId, bool bit)
        {
            //Check If Verification Token is there
            var validRequest = !string.IsNullOrEmpty(vtoken);
            //var list = new List<SchedulingCustomModel>();
            //if (validRequest)
            //{
            //    using (var bal = new SchedulingBal())
            //    {

            //        //Get the list of Scheduling Events of current Patient attending current Physician.
            //        list = bal.GetSchedulingListByPatient(patientId, physicianId, vtoken);

            //        //Check if list contains items.
            //        validRequest = list.Count > 0;

            //        if (validRequest)
            //        {
            //            list.ForEach(a =>
            //            {
            //                a.Status = st;
            //                a.ExtValue4 = CommonConfig.GenerateLoginCode(8, false);
            //                a.ModifiedBy = patientId;
            //                a.ModifiedDate = Helpers.GetInvariantCultureDateTime();
            //            });
            //            using (var sBal = new SchedulingBal())
            //                validRequest = sBal.UpdateSchedulingEvents(list);

            //            if (st == "2" && bit)//After Patient Approval Mail Will Be sent to Physician
            //            {
            //                using (var uBal = new UsersBal())
            //                {
            //                    var appointmentType = string.Empty;
            //                    foreach (var item in list)
            //                    {
            //                        var app =
            //       new AppointmentTypesBal().GetAppointmentTypesById(Convert.ToInt32(item.TypeOfProcedure));
            //                        appointmentType = app != null ? app.Name : string.Empty;
            //                        item.AppointmentType = appointmentType;
            //                    }



            //                    var objPhysician = uBal.GetPhysicianById(Convert.ToInt32(physicianId));
            //                    var validRequest1 = objPhysician != null && objPhysician.UserId > 0;
            //                    if (validRequest1)
            //                    {

            //                        var email = uBal.GetUserEmailByUserId(Convert.ToInt32(objPhysician.UserId));
            //                        Helpers.SendAppointmentNotification(list, email,
            //                            Convert.ToString((int)SchedularNotificationTypes.appointmentapprovaltophysician),
            //                            patientId, Convert.ToInt32(physicianId), 2);
            //                    }
            //                }

            //            }
            //            if (st == "4" && bit)//After Physician Cancel mail will be sent to Patient
            //            {
            //                var email = new PatientLoginDetailBal().GetPatientEmail(patientId);
            //                Helpers.SendAppointmentNotification(list, email,
            //                            Convert.ToString((int)SchedularNotificationTypes.physiciancancelappointment),
            //                            patientId, Convert.ToInt32(physicianId), 5);
            //            }
            //            if (st == "2" && bit != true)//After Physician Approvel Mail sent to Patient
            //            {
            //                var appointmentType = string.Empty;
            //                foreach (var item in list)
            //                {
            //                    var app =
            //                        new AppointmentTypesBal().GetAppointmentTypesById(
            //                            Convert.ToInt32(item.TypeOfProcedure));
            //                    appointmentType = app != null ? app.Name : string.Empty;
            //                    item.AppointmentType = appointmentType;
            //                }
            //                var email = new PatientLoginDetailBal().GetPatientEmail(patientId);
            //                Helpers.SendAppointmentNotification(list, email,
            //                            Convert.ToString((int)SchedularNotificationTypes.physicianapporovelemail),
            //                            patientId, Convert.ToInt32(physicianId), 4);
            //            }
            //        }
            //    }
            //}

            //if (validRequest)
            //    return View(list);

            return Content("This page has been expired!");

        }

        //public async Task<ActionResult> PatientAction(List<SchedulingCustomModel> list, int actionId, string status, int patientId, int physicianId)
        //{
        //    var success = false;
        //    //get the Physician Details by Current Physician ID.
        //    using (var bal = new UsersBal())
        //    {
        //        var objPhysician = bal.GetPhysicianById(Convert.ToInt32(physicianId));
        //        var validRequest = objPhysician != null && objPhysician.UserId > 0;
        //        if (validRequest)
        //        {
        //            //get the Sender's mail address of current User.
        //            var email = bal.GetUserEmailByUserId(Convert.ToInt32(objPhysician.UserId));

        //            success = await Helpers.SendAppointmentNotification(list, email,
        //                Convert.ToString((int)SchedularNotificationTypes.appointmentapprovaltophysician), patientId, Convert.ToInt32(physicianId), 2);

        //            //If Success, Update the Scheduling list with the status 'Confirmed' and delete the verification token.
        //            if (success)
        //            {
        //                list.ForEach(a =>
        //                {
        //                    a.Status = status;
        //                    a.ExtValue4 = string.Empty;
        //                    a.ModifiedBy = patientId;
        //                    a.ModifiedDate = Helpers.GetInvariantCultureDateTime();
        //                });

        //                using (var sBal = new SchedulingBal())
        //                    success = sBal.UpdateSchedulingEvents(list);
        //            }
        //        }
        //    }
        //    return Json(success ? 1 : 0, JsonRequestBehavior.AllowGet);
        //}

        #region Telerik Schedular Methods ---Just for testing Purposes
        [AllowAnonymous]
        public ViewResult Temp()
        {
            return View();
        }

        private List<TaskViewModel> GetTasksList()
        {
            var curentDateTime = Helpers.GetInvariantCultureDateTime();
            var list = new List<TaskViewModel>();
            for (int i = 1; i <= 100; i++)
            {
                list.Add(new TaskViewModel
                {
                    TaskID = i,
                    Description = string.Format("Test Description of Task {0}", i),
                    End = curentDateTime.AddDays(20 + i),
                    EndTimezone = "Etc/UTC",
                    IsAllDay = i % 2 == 0,
                    OwnerID = i + 1,
                    RecurrenceException = string.Empty,
                    RecurrenceID = i,
                    RecurrenceRule = "Test Rule of Task" + i,
                    Start = curentDateTime.AddDays(-10).AddDays(i),
                    StartTimezone = "Etc/UTC",
                    Title = "Scheduling Task " + i
                });
            }
            return list;
        }


        [AllowAnonymous]
        public virtual JsonResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetTasksList().ToDataSourceResult(request));
        }

        [AllowAnonymous]
        public virtual JsonResult Destroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                //taskService.Delete(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState), JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public virtual JsonResult Create([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                //taskService.Insert(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState), JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public virtual JsonResult Update([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                //taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        [AllowAnonymous]
        public virtual JsonResult Save(string value)
        {
            return Json(value, JsonRequestBehavior.AllowGet);
        }
        #endregion


        /// <summary>
        /// Gets the department name by room identifier.
        /// </summary>
        /// <param name="roomId">The room identifier.</param>
        /// <returns></returns>
        public JsonResult GetDepartmentNameByRoomId(int roomId)
        {
            using (var bal = new FacilityStructureBal())
            {
                var departmentName = bal.GetParentNameByFacilityStructureId(roomId);
                return Json(departmentName, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the facility rooms.
        /// </summary>
        /// <param name="coporateId">The coporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public JsonResult GetFacilityRooms(int coporateId, int facilityId)
        {
            using (var facilityBal = new FacilityStructureBal())
            {
                var facilityDepartmentList = facilityBal.GetFacilityRooms(coporateId, facilityId.ToString());
                return Json(facilityDepartmentList, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the facility phycisian.
        /// </summary>
        /// <param name="coporateId">The coporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public JsonResult GetFacilityPhycisian(int coporateId, int facilityId)
        {
            return Json(string.Empty);
        }

        /// <summary>
        /// Gets the department timing.
        /// </summary>
        /// <param name="deptId">The dept identifier.</param>
        /// <returns></returns>
        public JsonResult GetDepartmentTiming(int deptId)
        {
            using (var deptTimming = new DeptTimmingBal())
            {
                var deptTimingList = deptTimming.GetDeptTimmingByDepartmentId(deptId);
                var listToReturn = new
                {
                    deptOpeningDays = string.Join(",", deptTimingList.Select(x => x.OpeningDayId)),
                    deptTimingList,
                };
                return Json(listToReturn, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Validates the department rooms.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <param name="deptid">The deptid.</param>
        /// <returns></returns>
        public ActionResult ValidateDepartmentRooms(string facilityid, int deptid)
        {
            using (var facilityBal = new FacilityStructureBal())
            {
                var facilityDepartmentList = facilityBal.GetDepartmentRooms(deptid, facilityid);
                return Json(facilityDepartmentList.Count > 0, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the physicians appt types.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <param name="deptid">The deptid.</param>
        /// <returns></returns>
        public ActionResult GetPhysiciansApptTypes(string facilityid, int deptid)
        {
            using (var facilityBal = new FacilityStructureBal())
            {
                //var departmentAppointmentList = facilityBal.GetDepartmentAppointmentTypes(deptid, facilityid);
                return Json(0, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the physician by facility.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetPhysicianByFacility(int facilityId)
        {
            var list = new List<SelectListItem>();
            using (var bal = new FacilityStructureBal())
            {
                var cId = Helpers.GetSysAdminCorporateID().ToString();
                cId = facilityId == 0
                    ? cId
                    : Helpers.GetCorporateIdByFacilityId(Convert.ToInt32(facilityId)).ToString();
            }

            var updatedList = new
            {
                phyList = string.Empty
            };
            return Json(updatedList, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the global codes check ListView pre scheduling.
        /// </summary>
        /// <param name="ggcValue">The GGC value.</param>
        /// <returns></returns>
        public ActionResult GetGlobalCodesCheckListViewPreScheduling(string ggcValue)
        {
            using (var globalCodeBal = new GlobalCodeBal())
            {
                var globalCodelist = globalCodeBal.GetGCodesListByCategoryValue(ggcValue).Where(x => x.ExternalValue1 != "2" && x.ExternalValue1 != "3" && x.ExternalValue1 != "4").ToList().OrderBy(x => Convert.ToInt32(x.GlobalCodeValue));
                var viewpath = string.Format("../FacultyTimeslots/{0}", PartialViews.StatusCheckBoxList);
                return PartialView(viewpath, globalCodelist);
            }
        }

        /// <summary>
        /// Gets the roles by facility dropdown data.
        /// </summary>
        /// <returns></returns>
        [LoginAuthorize]
        public ActionResult GetRolesByFacilityDropdownDataCustom()
        {
            using (var roleBal = new RoleBal())
            {
                var roles = roleBal.GetRolesByCorporateIdFacilityId(Convert.ToInt32(Helpers.GetSysAdminCorporateID()), Convert.ToInt32(Helpers.GetDefaultFacilityId()));
                if (roles.Count > 0)
                {
                    var list = new List<SelectListItem>();
                    list.AddRange(roles.Select(item => new SelectListItem
                    {
                        Text = item.RoleName,
                        Value = item.RoleID.ToString()
                    }));
                    list = list.OrderBy(x => x.Text).ToList();
                    return Json(list);
                }
            }
            return Json(0);
        }


        /// <summary>
        /// Gets the clinical identifier number.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetClinicalIDNumber()
        {
            return Json(0);
        }

        [AllowAnonymous]
        public ViewResult UnauthorizedView()
        {
            return View();
        }

        [LoginAuthorize]
        public JsonResult SaveFilesTemporarily()
        {
            var result = false;
            if (Request.Files.Count > 0)
            {
                Session[SessionNames.Files.ToString()] = Request.Files;
                result = true;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Download(int fileId)
        {
            return Content("File No Found");
        }



        [LoginAuthorize]
        public ActionResult GetCountriesWithDefault()
        {
            using (var bal = new CountryBal())
            {
                var list = bal.GetCountryWithCode().OrderBy(x => x.CountryName);
                var defaultCountry = Helpers.GetDefaultCountryCode;

                //var countryId = defaultCountry > 0 ? list.Where(a => a.CodeValue == Convert.ToString(defaultCountry))
                //    .Select(s => s.CountryID).FirstOrDefault() : 0;
                var jsonData = new { list, defaultCountry };
                return Json(jsonData);
            }
        }


        public JsonResult CalculateAgeInYears(DateTime dValue)
        {
            var ageInYears = GetAgeInYears(dValue);
            return Json(ageInYears, JsonRequestBehavior.AllowGet);
        }

        /// <summary>  
        /// For calculating age  
        /// </summary>  
        /// <param name="Dob">Enter Date of Birth to Calculate the age</param>  
        /// <returns> years, months,days, hours...</returns>  
        static int GetAgeInYears(DateTime Dob)
        {
            var Now = DateTime.Now;
            var ticks = Now.Subtract(Dob).Ticks;
            int Years = ticks > 0 ? new DateTime(ticks).Year - 1 : 0;
            return Years;

            //var PastYearDate = Dob.AddYears(Years);
            //int Months = 0;
            //for (int i = 1; i <= 12; i++)
            //{
            //    if (PastYearDate.AddMonths(i) == Now)
            //    {
            //        Months = i;
            //        break;
            //    }
            //    else if (PastYearDate.AddMonths(i) >= Now)
            //    {
            //        Months = i - 1;
            //        break;
            //    }
            //}
            //int Days = Now.Subtract(PastYearDate.AddMonths(Months)).Days;
            //int Hours = Now.Subtract(PastYearDate).Hours;
            //int Minutes = Now.Subtract(PastYearDate).Minutes;
            //int Seconds = Now.Subtract(PastYearDate).Seconds;
            //return String.Format("Age: {0} Year(s) {1} Month(s) {2} Day(s) {3} Hour(s) {4} Second(s)",
            //Years, Months, Days, Hours, Seconds);
        }
    }

    public class TaskViewModel : ISchedulerEvent
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string StartTimezone { get; set; }
        public string EndTimezone { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public int RecurrenceID { get; set; }
        public int OwnerID { get; set; }
    }

}