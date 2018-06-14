using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Models;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Bal.BusinessAccess;

namespace SuppliesDotCom.Controllers
{
    /// <summary>
    /// Security Controller 
    /// </summary>
    public class SecurityController : BaseController
    {
        //
        // GET: /Security/

        #region Users Section

        //Function to get User Screen
        /// <summary>
        /// Users this instance.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult User(int? cId, int? fId)
        {
            var objUserBal = new UsersBal();
            var corporateId = Convert.ToInt32(cId) > 0 ? Convert.ToInt32(cId) : Helpers.GetSysAdminCorporateID();
            var facilityId = Convert.ToInt32(fId) > 0 ? Convert.ToInt32(fId) : Helpers.GetDefaultFacilityId();

            if (fId == 0 && !Helpers.GetLoggedInUserIsAdmin())
                facilityId = Helpers.GetDefaultFacilityId();

            var objUsersView = new UsersView
            {
                CurrentUser =
                    new UsersCustomModel
                    {
                        CurrentUser = new Users { IsActive = true, CorporateId = corporateId, FacilityId = facilityId }
                    },
                UsersList = objUserBal.GetUsersByCorporateIdFacilityId(corporateId, facilityId),
            };
            return View(objUsersView);
        }


        //private List<UsersCustomModel> GetUserCustom(List<Users> users)
        //{
        //    List<UsersCustomModel> lstUsers = new List<UsersCustomModel>();
        //    lstUsers = (from y in users
        //                select new UsersCustomModel
        //                {
        //                    CurrentUser = y,
        //                    UserID = y.UserID,
        //                    CountryID = y.CountryID,
        //                    StateID = y.StateID,
        //                    CityID = y.CityID,
        //                    UserGroup = y.UserGroup,
        //                    UserName = y.UserName,
        //                    FirstName = y.FirstName,
        //                    LastName = y.LastName,
        //                    Answer = y.Answer,
        //                    Password = y.Password,
        //                    Address = y.Address,
        //                    Email = y.Email,
        //                    Phone = y.Phone,
        //                    HomePhone = y.HomePhone,
        //                    AdminUser = y.AdminUser,
        //                    IsActive = y.IsActive,
        //                    FailedLoginAttempts = y.FailedLoginAttempts,
        //                    IsDeleted = y.IsDeleted,
        //                    RoleName = GetRoleName(y.UserID),
        //                }).ToList();
        //    return lstUsers;

        //}

        /// <summary>
        /// Gets the name of the role.
        /// </summary>
        /// <param name="userID">The user identifier.</param>
        /// <returns></returns>
        private string GetRoleName(int userID)
        {
            string RoleName = string.Empty;
            UserRoleBal objUserRoleBal = new UserRoleBal();
            RoleBal objRolBal = new RoleBal();
            var userRoles = objUserRoleBal.GetUserRolesByUserId(userID);
            if (userRoles.Count > 0)
            {
                var firstUserRole = userRoles.FirstOrDefault();
                RoleName = objRolBal.GetRoleById(firstUserRole.RoleID).RoleName;

            }
            return RoleName;
        }

        /// <summary>
        /// Gets the role identifier.
        /// </summary>
        /// <param name="userID">The user identifier.</param>
        /// <returns></returns>
        private int GetRoleId(int userID)
        {
            int RoleId = 0;
            UserRoleBal objUserRoleBal = new UserRoleBal();
            RoleBal objRolBal = new RoleBal();
            var userRoles = objUserRoleBal.GetUserRolesByUserId(userID);
            if (userRoles.Count > 0)
            {
                var firstUserRole = userRoles.FirstOrDefault();
                RoleId = objRolBal.GetRoleById(firstUserRole.RoleID).RoleID;

            }
            return RoleId;
        }

        /// <summary>
        /// Gets the roles users.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetRolesUsers()
        {
            var objRoleBal = new RoleBal();
            var corporateId = Helpers.GetDefaultCorporateId();
            var facilityId = Helpers.GetDefaultFacilityId();
            var rolesList = objRoleBal.GetAllRolesByCorporateFacility(corporateId, facilityId);
            return Json(rolesList);
        }

        //Function to get  User for editing
        /// <summary>
        /// Edits the user.
        /// </summary>
        /// <param name="UserID">The user identifier.</param>
        /// <returns></returns>
        public ActionResult EditUser(int UserID)
        {
            var objUserBal = new UsersBal();
            var user = objUserBal.GetUserById(UserID);
            var currentUser = new UsersCustomModel
            {
                CurrentUser = user,
                //RoleId = user.UserRole
                //UserID = user.UserID,
                //CountryID = user.CountryID,
                //StateID = user.StateID,
                //CityID = user.CityID,
                //UserGroup = user.UserGroup,
                //UserName = user.UserName,
                //FirstName = user.FirstName,
                //LastName = user.LastName,
                //Answer = user.Answer,
                //Password = user.Password,
                //Address = user.Address,
                //Email = user.Email,
                //Phone = user.Phone,
                //HomePhone = user.HomePhone,
                //AdminUser = user.AdminUser,
                //IsActive = user.IsActive,
                //FailedLoginAttempts = user.FailedLoginAttempts,
                //IsDeleted = user.IsDeleted,
                RoleName = GetRoleName(user.UserID),
                RoleId = GetRoleId(user.UserID)

            };
            return Json(currentUser, JsonRequestBehavior.AllowGet);
            //return PartialView(PartialViews.AddUpdateUser, currentUser);
        }

        /// <summary>
        /// Adds the user.
        /// </summary>
        /// <param name="objUser">The object user.</param>
        /// <param name="roleId"></param>
        /// <param name="cId"></param>
        /// <param name="fId"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddUser(Users objUser, int roleId, int cId, int fId)
        {
            using (var objUserBal = new UsersBal())
            {

                if (fId == 0 && !Helpers.GetLoggedInUserIsAdmin())
                    fId = Helpers.GetDefaultFacilityId();

                cId = cId == 0 ? Helpers.GetSysAdminCorporateID() : cId;

                var userId = Helpers.GetLoggedInUserId();
                var currentDateTime = Helpers.GetInvariantCultureDateTime();

                if (objUser.UserID > 0)
                {
                    objUser.ModifiedBy = userId;
                    objUser.ModifiedDate = currentDateTime;
                }
                else
                {
                    objUser.CreatedBy = userId;
                    objUser.CreatedDate = currentDateTime;
                }

                objUserBal.AddUpdateUser(objUser, roleId);

                //start

                var auditlogbal = new AuditLogBal();
                var auditlogObj = new AuditLog
                {
                    AuditLogID = 0,
                    UserId = userId,
                    CreatedDate = Helpers.GetInvariantCultureDateTime(),
                    TableName = "Users",
                    FieldName = "Password",
                    PrimaryKey = 0,
                    OldValue = string.Empty,
                    NewValue = string.Empty,
                    CorporateId = cId,
                    FacilityId = fId
                };
                auditlogbal.AddUptdateAuditLog(auditlogObj);

                var list = objUserBal.GetUsersByCorporateIdFacilityId(cId, fId);
                return PartialView(PartialViews.UsersList, list);
            }
        }

        //public ActionResult AddRoleWithUser(int userID, int roleID)
        //{
        //    var objUserRoleBal = new UserRoleBal();
        //    var isExist = objUserRoleBal.CheckIfExists(userID, roleID);
        //    if (!isExist)
        //    {
        //        var lstUserRoles = new List<UserRole>
        //        {
        //            new UserRole
        //            {
        //                UserID = userID,
        //                RoleID = roleID,
        //                IsActive = true,
        //                IsDeleted = false,
        //                CreatedBy = Helpers.GetLoggedInUserId(),
        //                CreatedDate = Helpers.GetInvariantCultureDateTime()
        //            }
        //        };
        //        return Json(objUserRoleBal.AddUpdateUserRole(lstUserRoles));
        //    }
        //    return Json(0);
        //}
        /// <summary>
        /// Adds the role with user.
        /// </summary>
        /// <returns></returns>
        /// <summary>
        /// Deletes the user.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="cId"></param>
        /// <param name="fId"></param>
        /// <returns></returns>
        public ActionResult DeleteUser(int userId, int cId, int fId)
        {
            var objUserBal = new UsersBal();
            var objUser = objUserBal.GetUserById(userId);
            objUser.IsDeleted = true;
            objUser.DeletedBy = Helpers.GetLoggedInUserId();
            objUser.DeletedDate = Helpers.GetInvariantCultureDateTime(); //To Do change it to server datetime
            objUser.TokenExpiryDate = null;
            objUser.UserToken = null;
            objUserBal.AddUpdateUser(objUser, 0);

            cId = cId == 0 ? Helpers.GetSysAdminCorporateID() : cId;

            if (fId == 0 && !Helpers.GetLoggedInUserIsAdmin())
                fId = Helpers.GetDefaultFacilityId();

            var list = objUserBal.GetUsersByCorporateIdFacilityId(cId, fId);
            return PartialView("UserControls/_UsersList", list);
        }

        //Function To reset the User Form
        /// <summary>
        /// Resets the user form.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetUserForm()
        {
            var CurrentUser = new UsersCustomModel { CurrentUser = new Users { IsActive = true } };
            return PartialView(PartialViews.AddUpdateUser, CurrentUser);
        }

        // Function to chek duplicate user on the basis of username or Email
        /// <summary>
        /// Checks the duplicate user.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <param name="email">The email.</param>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public JsonResult CheckDuplicateUser(string username, string email, int userId)
        {
            var objUsersBal = new UsersBal();
            var isExist = objUsersBal.CheckForDuplicateEmail(userId, email);
            if (isExist)
            {
                return Json("-1");
            }

            return Json(objUsersBal.CheckDuplicateUser(username, email, userId));
        }

        /// <summary>
        /// Gets the logged in user details.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetLoggedInUserDetails()
        {
            var objUserBal = new UsersBal();
            var userid = Helpers.GetLoggedInUserId();
            var user = objUserBal.GetUserById(userid);
            var viewpath = string.Format("../PatientSearch/{0}", PartialViews.ChangePassword);
            return PartialView(viewpath, user);
        }

        public PartialViewResult RebindUsersList(int cId, int fId)
        {
            using (var objUserBal = new UsersBal())
            {
                if (fId == 0 && !Helpers.GetLoggedInUserIsAdmin())
                    fId = Helpers.GetDefaultFacilityId();

                var list = objUserBal.GetUsersByCorporateIdFacilityId(cId, fId);
                return PartialView("UserControls/_UsersList", list);
            }
        }

        #endregion

        #region "UserRole"

        /// <summary>
        /// Roles this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Role()
        {
            RoleBal objRoleBal = new RoleBal();
            var corporateId = Helpers.GetDefaultCorporateId();
            RoleView objRoleView = new RoleView
            {
                CurrentRole = new Role(),
                RolesList = objRoleBal.GetAllRoles(corporateId)
            };

            //ScreenBal objScreenBal = new ScreenBal();
            //ScreenView screenview = new ScreenView
            //{
            //    AvailableScreens = objScreenBal.GetAllScreensList()
            //};
            //objRoleView.screenView = screenview;
            return View(objRoleView);
        }

        /// <summary>
        /// Gets the roles.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetRoles()
        {
            RoleBal objRoleBal = new RoleBal();
            var corporateId = Helpers.GetDefaultCorporateId();
            List<Role> RolesList = objRoleBal.GetAllRoles(corporateId);
            return PartialView(PartialViews.RoleList, RolesList);
        }

        /// <summary>
        /// Edits the role.
        /// </summary>
        /// <param name="RoleID">The role identifier.</param>
        /// <returns></returns>
        public ActionResult EditRole(int RoleID)
        {
            RoleBal objRoleBal = new RoleBal();
            Role CurrentRole = objRoleBal.GetRoleById(RoleID);
            return PartialView(PartialViews.AddUpdateRole, CurrentRole);
        }

        /// <summary>
        /// Gets the add update role.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAddUpdateRole()
        {
            Role CurrentRole = new Role();
            return PartialView(PartialViews.AddUpdateRole, CurrentRole);
        }

        /// <summary>
        /// Adds the role.
        /// </summary>
        /// <param name="objRole">The object role.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddRole(Role objRole)
        {
            RoleBal objRoleBal = new RoleBal();
            if (objRole.RoleID > 0)
            {
                objRole.ModifiedBy = Helpers.GetLoggedInUserId();
                objRole.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                objRole.CreatedBy = Helpers.GetLoggedInUserId();
                objRole.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            else
            {
                objRole.CreatedBy = Helpers.GetLoggedInUserId();
                objRole.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            var i = objRoleBal.AddUpdateRole(objRole);
            return Json(i);
            // List<Role> RolesList = objRoleBal.GetAllRoles();
            // return PartialView(PartialViews.RoleList, RolesList);

        }

        /// <summary>
        /// Deletes the role.
        /// </summary>
        /// <param name="RoleId">The role identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteRole(int RoleId)
        {
            RoleBal objRoleBal = new RoleBal();
            Role objRole = objRoleBal.GetRoleById(RoleId);
            objRole.IsDeleted = true;
            objRole.DeletedBy = Helpers.GetLoggedInUserId();
            objRole.DeletedDate = Helpers.GetInvariantCultureDateTime(); //To Do change it to server datetime
            var i = objRoleBal.AddUpdateRole(objRole);
            var corporateId = Helpers.GetDefaultCorporateId();
            List<Role> RolesList = objRoleBal.GetAllRoles(corporateId);
            return PartialView(PartialViews.RoleList, RolesList);

        }

        // Function to chek duplicate Role on the basis of RoleName 
        /// <summary>
        /// Checks the duplicate role.
        /// </summary>
        /// <param name="RoleId">The role identifier.</param>
        /// <param name="RoleName">Name of the role.</param>
        /// <returns></returns>
        public bool CheckDuplicateRole(int RoleId, string RoleName)
        {
            using (var objRoleBal = new RoleBal())
            {
                return objRoleBal.CheckDuplicateRole(RoleId, RoleName);
            }
        }

        // Function to chek role exist on the 
        /// <summary>
        /// Checks the role exist.
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <returns></returns>
        public ActionResult CheckRoleExist(int Id)
        {
            using (var objUserRoleBal = new UserRoleBal())
            {
                var result = objUserRoleBal.CheckRoleExist(Id);
                return Json(result);
            }


        }

        #endregion

        #region "Tabs"

        /// <summary>
        /// Tabs this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Tab()
        {
            TabsBal objTabsBal = new TabsBal();
            TabView objTabView = new TabView
            {
                CurrentTab = new Tabs(),
                TabsList = objTabsBal.GetAllTabs(),
                //ScreenList = objScreenBal.GetAllScreensList()
            };
            return View(objTabView);
        }

        //Function to get All tabs
        /// <summary>
        /// Gets the tabs.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetTabs()
        {
            TabsBal objTabsBal = new TabsBal();
            List<Tabs> tabsList = objTabsBal.GetAllTabs();
            return PartialView(PartialViews.TabsList, tabsList);
        }

        /// <summary>
        /// Edits the tab.
        /// </summary>
        /// <param name="TabID">The tab identifier.</param>
        /// <returns></returns>
        public ActionResult EditTab(int TabID)
        {
            //ScreenBal objScreenBal = new ScreenBal();
            TabsBal objTabsBal = new TabsBal();
            TabView objTabView = new TabView
            {
                CurrentTab = objTabsBal.GetTabByTabId(TabID),
                TabsList = objTabsBal.GetAllTabs(),
                //ScreenList = objScreenBal.GetAllScreensList()
            };

            return PartialView(PartialViews.AddUpdateTabs, objTabView);
        }

        /// <summary>
        /// Gets the add update tab.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAddUpdateTab()
        {

            TabsBal objTabsBal = new TabsBal();
            TabView objTabView = new TabView
            {
                CurrentTab = new Tabs(),
                TabsList = objTabsBal.GetAllTabs(),
            };
            return PartialView(PartialViews.AddUpdateTabs, objTabView);
        }

        /// <summary>
        /// Adds the tab.
        /// </summary>
        /// <param name="objTab">The object tab.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddTab(Tabs objTab)
        {
            TabsBal objTabsBal = new TabsBal();
            if (objTab.TabId > 0)
            {
                objTab.ModifiedBy = Helpers.GetLoggedInUserId();
                objTab.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                objTab.CreatedBy = Helpers.GetLoggedInUserId();
                objTab.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            else
            {
                objTab.CreatedBy = Helpers.GetLoggedInUserId();
                objTab.CreatedDate = Helpers.GetInvariantCultureDateTime();

            }
            var i = objTabsBal.AddUpdateTab(objTab);
            List<Tabs> tabsList = objTabsBal.GetAllTabs();
            return PartialView(PartialViews.TabsList, tabsList);
        }

        /// <summary>
        /// Deletes the tab.
        /// </summary>
        /// <param name="TabID">The tab identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteTab(int TabID)
        {
            TabsBal objTabsBal = new TabsBal();
            Tabs objTab = objTabsBal.GetTabByTabId(TabID);
            objTab.IsDeleted = true;
            objTab.DeletedBy = Helpers.GetLoggedInUserId();
            objTab.DeletedDate = Helpers.GetInvariantCultureDateTime(); //To Do change it to server datetime
            var i = objTabsBal.AddUpdateTab(objTab);
            List<Tabs> tabsList = objTabsBal.GetAllTabs();
            return PartialView(PartialViews.TabsList, tabsList);
        }

        #endregion

        #region User Role Section

        /// <summary>
        /// Users the role.
        /// </summary>
        /// <returns></returns>
        public ActionResult UserRole()
        {
            var objUserRoleView = new UserRoleView
            {
                RolesList = new List<Role>(), //objRoleBal.GetAllRolesByCorporateFacility(corporateId, facilityId),
                //UsersList = new List<Users>(), //objUsersBal.GetAllUsersByCorporateIdFacilityId(corporateId, facilityId),
                UserID = 0
            };
            return View(objUserRoleView);
        }

        /// <summary>
        /// Adds the user role.
        /// </summary>
        /// <param name="objUserRoleList">The object user role list.</param>
        /// <returns></returns>
        public ActionResult AddUserRole(List<UserRole> objUserRoleList)
        {
            try
            {
                var objListUserRole = objUserRoleList.Select(item => new UserRole
                {
                    RoleID = Convert.ToInt32(item.RoleID),
                    UserID = Convert.ToInt32(item.UserID),
                    CreatedBy = Helpers.GetLoggedInUserId(),
                    CreatedDate = Helpers.GetInvariantCultureDateTime(),
                    IsActive = true
                }).ToList();
                var objUserRoleBal = new UserRoleBal();
                var updatedId = objUserRoleBal.AddUpdateUserRole(objListUserRole);
                return Json(updatedId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the user roles by user identifier.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="corporateId"></param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public ActionResult GetUserRolesByUserId(int userId, int corporateId, int facilityId)
        {
            var objUserRoleBal = new UserRoleBal();
            var objlstUserRole = new List<UserRole>();
            //objlstUserRole = objUserRoleBal.GetUserRolesByUserID(UserID);
            objlstUserRole = objUserRoleBal.GetUserRolesByCorporateFacilityAndUserId(userId, corporateId, facilityId);
            return Json(objlstUserRole);
        }

        /// <summary>
        /// Gets all roles by corporate and facility.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetAllRolesByCorporateAndFacility(int corporateId, int facilityId)
        {
            using (var bal = new RoleBal())
            {
                var list = bal.GetAllRolesByCorporateFacility(corporateId, facilityId);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Facility Role

        /// <summary>
        /// Facilities the role.
        /// </summary>
        /// <returns></returns>
        //public ActionResult FacilityRole()
        //{
        //    var facilityRoleView = new FacilityRoleView { CurrentFacilityRole = new FacilityRoleCustomModel { IsActive = true }, };
        //    using (var bal = new FacilityRoleBal())
        //    {
        //        var facilityId = 0;
        //        var corporateId = 0;
        //        var roleId = 0;
        //        if (Session[SessionNames.SessionClass.ToString()] != null)
        //        {
        //            var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
        //            facilityId = Helpers.GetLoggedInUserIsAdmin() ? 0 : session.FacilityId;
        //            corporateId = session.CorporateId;
        //            roleId = session.RoleId;
        //        }

        //        var list = bal.GetFacilityRoleListCustom(corporateId, facilityId, roleId);
        //        facilityRoleView.FacilityRolesList = list;
        //    }
        //    return View(facilityRoleView);
        //}



        public ActionResult FacilityRole()
        {
            var facilityRoleView = new FacilityRoleView
            {
                CurrentFacilityRole = new FacilityRoleCustomModel { IsActive = true },
            };
            using (var bal = new FacilityRoleBal())
            {

                var facilityId = Helpers.GetDefaultFacilityId();
                var corporateId = Helpers.GetSysAdminCorporateID();
                var roleId = Convert.ToInt32(Helpers.GetDefaultRoleId());
                facilityRoleView.CurrentFacilityRole.CorporateId = corporateId;
                var admin = Helpers.GetLoggedInUserIsAdmin();
                if (admin == true)
                {
                    var list = bal.GetFacilityRoleListByAdminUser(corporateId, facilityId, roleId);
                    facilityRoleView.FacilityRolesList = list;

                }
                else
                {
                    var list = bal.GetFacilityRoleListCustom(corporateId, facilityId, roleId);
                    facilityRoleView.FacilityRolesList = list;
                }

            }
            return View(facilityRoleView);
        }

        /// <summary>
        /// Adds the update facility role.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public ActionResult AddUpdateFacilityRole(FacilityRole model)
        {
            using (var bal = new FacilityRoleBal())
            {
                var newId = 0;
                var isExist = bal.CheckIfExists(model.RoleId, model.FacilityId, model.CorporateId, model.FacilityRoleId);
                if (!isExist)
                {

                    if (model.FacilityRoleId > 0)
                    {
                        model.ModifiedBy = Helpers.GetLoggedInUserId();
                        model.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                        model.CreatedBy = Helpers.GetLoggedInUserId();
                        model.CreatedDate = Helpers.GetInvariantCultureDateTime();
                    }
                    else
                    {
                        model.CreatedBy = Helpers.GetLoggedInUserId();
                        model.CreatedDate = Helpers.GetInvariantCultureDateTime();
                    }
                    newId = bal.AddUpdateFacilityRole(model);
                }
                return Json(newId);
            }
        }

        /// <summary>
        /// Adds the update facility role custom model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public ActionResult AddUpdateFacilityRoleCustomModel(FacilityRoleCustomModel model)
        {
            using (var bal = new FacilityRoleBal())
            {
                var newId = 0;
                var isExist = bal.CheckIfExists(model.RoleId, model.FacilityId, model.CorporateId, model.FacilityRoleId);
                if (!isExist)
                    newId = bal.SaveFacilityRole(model, Helpers.GetLoggedInUserId(), Helpers.GetInvariantCultureDateTime());
                return Json(newId);
            }
        }


        /// <summary>
        /// Gets the facility role by identifier.
        /// </summary>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <returns></returns>
        public ActionResult GetFacilityRoleById(string facilityRoleId)
        {
            using (var bal = new FacilityRoleBal())
            {
                // var current = bal.GetFacilityRoleById(Convert.ToInt32(facilityRoleId));
                var current = bal.GetFacilityRoleModelById(Convert.ToInt32(facilityRoleId));
                return PartialView(PartialViews.FacilityRoleAddEdit, current);
            }
        }


        //public ActionResult GetFacilityRole(string facilityRoleId)
        //{
        //    using (var bal = new FacilityRoleBal())
        //    {
        //        // var current = bal.GetFacilityRoleById(Convert.ToInt32(facilityRoleId));
        //        var current = bal.GetFacilityRoleModelById(Convert.ToInt32(facilityRoleId));
        //        var jsonResult = new
        //        {
        //            current.CorporateId,
        //            current.FacilityRoleId,
        //            current.SchedulingApplied,
        //            current.IsActive,
        //            current.FacilityId,
        //            current.CarePlanAccessible
        //        };
        //        return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //    }
        //}

        /// <summary>
        /// Gets the facility roles list.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetFacilityRolesList()
        {
            using (var bal = new FacilityRoleBal())
            {
                var facilityId = Helpers.GetLoggedInUserIsAdmin() ? 0 : Helpers.GetDefaultFacilityId();
                var corporateId = Helpers.GetDefaultCorporateId();
                var roleId = Convert.ToInt32(Helpers.GetDefaultRoleId());

                var list = bal.GetFacilityRoleListCustom(corporateId, facilityId, roleId);
                return PartialView(PartialViews.FacilityRoleList, list);
            }
        }

        /// <summary>
        /// Deletes the facility role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteFacilityRole(string id)
        {
            using (var bal = new FacilityRoleBal())
            {
                var current = bal.GetFacilityRoleById(Convert.ToInt32(id));
                if (current != null)
                {
                    current.IsDeleted = true;
                    current.DeletedBy = Helpers.GetLoggedInUserId();
                    current.DeletedDate = Helpers.GetInvariantCultureDateTime();
                    var deletedId = bal.AddUpdateFacilityRole(current);
                    return PartialView(PartialViews.FacilityRoleList, null);
                }
                return Json(null);
            }
        }

        /// <summary>
        /// Gets the facility list by corporate identifier.
        /// </summary>
        /// <param name="corpId">The corp identifier.</param>
        /// <returns></returns>
        public ActionResult GetFacilityListByCorporateId(string corpId)
        {
            using (var bal = new FacilityBal())
            {
                var facilities = bal.GetFacilitiesByCorporateId(Convert.ToInt32(corpId));
                if (facilities.Count > 0)
                {
                    var facilityId = Helpers.GetLoggedInUserIsAdmin() ? 0 : Helpers.GetDefaultFacilityId();
                    var list = new List<SelectListItem>();

                    if (facilityId > 0 && Convert.ToInt32(corpId) > 0)
                        facilities = facilities.Where(f => f.FacilityId == facilityId).ToList();

                    list.AddRange(facilities.Select(item => new SelectListItem
                    {
                        Text = item.FacilityName,
                        Value = item.FacilityId.ToString()
                    }));
                    return Json(list);
                }
                return Json(null);
            }
        }

        /// <summary>
        /// Checks if facility role exists.
        /// </summary>
        /// <param name="corpId">The corp identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <param name="schedulingApplied">if set to <c>true</c> [scheduling applied].</param>
        /// <returns></returns>
        public ActionResult CheckIfFacilityRoleExists(string corpId, string facilityId, string roleId,
            string facilityRoleId, bool schedulingApplied)
        {
            using (var bal = new FacilityRoleBal())
            {
                if (!schedulingApplied)
                {
                    //var isRoleAssined = bal.CheckRoleIsAssignOrNot(Convert.ToInt32(roleId), Convert.ToInt32(facilityId), Convert.ToInt32(corpId));
                    //if (isRoleAssined)
                    //{
                    return Json("-1");
                    //}
                }


                var isExists = bal.CheckIfExists(Convert.ToInt32(roleId), Convert.ToInt32(facilityId),
                    Convert.ToInt32(corpId), Convert.ToInt32(facilityRoleId));
                return Json(isExists);
            }
        }

        public ActionResult GetFacilityRolesCustomList(string corpId, string facilityId, string roleId)
        {
            using (var bal = new FacilityRoleBal())
            {
                var selectedFacilitid = facilityId;
                facilityId =
                    //Helpers.GetLoggedInUserIsAdmin()? "0":
                    ((string.IsNullOrEmpty(facilityId) || facilityId.Equals("0"))
                        ? Convert.ToString(Helpers.GetDefaultFacilityId())
                        : facilityId);

                var list = bal.GetFacilityRoleListCustom(Convert.ToInt32(corpId), Convert.ToInt32(facilityId),
                    Convert.ToInt32(roleId));

                list = list.OrderBy(x => x.RoleName).ToList();
                return PartialView(PartialViews.FacilityRoleList, list);
            }
        }

        /// <summary>
        /// Reset the FacilityStructure View Model and pass it to FacilityStructureAddEdit Partial View.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetFacilityRoleForm()
        {
            //Intialize the new object of FacilityStructure ViewModel
            var facilityStructureViewModel = new FacilityRoleCustomModel();

            //Pass the View Model as FacilityStructureViewModel to PartialView FacilityStructureAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.FacilityRoleAddEdit, facilityStructureViewModel);
        }

        /// <summary>
        /// Checks if facility role assigned.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <returns></returns>
        public ActionResult CheckIfFacilityRoleAssigned(string roleId, string facilityRoleId)
        {
            using (var bal = new FacilityRoleBal())
            {
                var isExists = bal.CheckIfRoleAssigned(Convert.ToInt32(roleId), Convert.ToInt32(facilityRoleId));
                return Json(isExists);
            }
        }

        public ActionResult GetActiveInActiveFacilityRoleList(bool showInActive, string facilityId, string corporateId)
        {
            //var corpId = Helpers.GetSysAdminCorporateID();
            using (var bal = new FacilityRoleBal())
            {
                var selectedFacilitid = facilityId;
                facilityId =
                    //Helpers.GetLoggedInUserIsAdmin()? "0":
                    ((string.IsNullOrEmpty(facilityId) || facilityId.Equals("0"))
                        ? Convert.ToString(Helpers.GetDefaultFacilityId())
                        : facilityId);



                corporateId = ((string.IsNullOrEmpty(corporateId) || corporateId.Equals("0"))
                        ? Convert.ToString(Helpers.GetSysAdminCorporateID())
                        : corporateId);
                //var list = bal.GetFacilityRoleListCustom(Convert.ToInt32(corpId), Convert.ToInt32(facilityId),
                //    Convert.ToInt32(roleId));
                var list = bal.GetActiveInActiveRecords(showInActive, Convert.ToInt32(corporateId), Convert.ToInt32(facilityId));
                list = list.OrderBy(x => x.RoleName).ToList();
                return PartialView(PartialViews.FacilityRoleList, list);
            }
        }

        #endregion

        #region Tabs Permission (Role Tabs)

        [HttpPost]
        public ActionResult Checkboxes(string[] checkedFiles)
        {
            checkedFiles = checkedFiles ?? new string[0];
            return null;
        }

        /// <summary>
        /// Tabses the role.
        /// </summary>
        /// <returns></returns>
        public ActionResult TabsRole()
        {
            var objRoleTabsView = new RoleTabsView
            {
                TabList = new List<TabsCustomModel>(),
                RoleList = new List<Role>(),
                CurrentRole = new Role()
            };
            return View(objRoleTabsView);
        }

        /// <summary>
        /// Adds the tab role permissions.
        /// </summary>
        /// <param name="objRoleTabsPermissionList">The object role tabs permission list.</param>
        /// <returns></returns>
        public ActionResult AddTabRolePermissions(List<RoleTabsCustomModel> objRoleTabsPermissionList)
        {
            using (var bal = new RoleTabsBal())
            {
                var dt = Helpers.ToDataTable(objRoleTabsPermissionList);
                bal.AddUpdateRolePermissionSP(dt, Helpers.GetLoggedInUserId(), Helpers.GetSysAdminCorporateID(), Helpers.GetDefaultFacilityId());
                return Json(true);
            }
        }

        /// <summary>
        /// Gets the tabs permisssions by role identifier.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public ActionResult GetTabsPermisssionsByRoleId(int roleId)
        {
            using (var bal = new RoleTabsBal())
            {
                var list = bal.GetRoleTabsByRoleId(roleId);
                return Json(list);
            }
        }

        /// <summary>
        /// Gets the tabs assigned to facility.
        /// </summary>
        /// <param name="roleid">The roleid.</param>
        /// <returns></returns>
        public ActionResult GetTabsAssignedToFacility(int roleid)
        {
            using (var facilityRole = new FacilityRoleBal())
            {
                var facilityrole = facilityRole.GetFacilityRolesByRoleId(roleid).FirstOrDefault();
                var corporateId = Helpers.GetDefaultCorporateId();
                var facilityid = Helpers.GetDefaultFacilityId();
                var loggedinuserid = Helpers.GetLoggedInUserId();
                if (facilityrole != null)
                {
                    corporateId = facilityrole.CorporateId;
                    facilityid = facilityrole.FacilityId;
                }
                var objTabsBal = new TabsBal();
                var tabList = objTabsBal.GetCorporateFacilityTabList(corporateId, facilityid, roleid).Where(t => t.CurrentTab.IsActive && !t.CurrentTab.IsDeleted)
                        .ToList();
                //IEnumerable<TabsCustomModel> tabList;
                //using (var mBal = new TabsBal())
                //{
                //    tabList = mBal.GetTabsOnModuleAccessLoad(loggedinuserid, roleid, facilityid, corporateId, false, true);
                //}
                return PartialView(PartialViews.TabsTreeView, tabList);
            }
        }

        /// <summary>
        /// Gets the tabs default to facility.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetTabsDefaultToFacility()
        {
            var corporateId = Helpers.GetDefaultCorporateId();
            var facilityid = Helpers.GetDefaultFacilityId();
            var objTabsBal = new TabsBal();
            //var tabList =
            //    objTabsBal.GetCorporateFacilityTabList(corporateId, facilityid, null)
            //        .Where(t => t.CurrentTab.IsActive && !t.CurrentTab.IsDeleted)
            //        .ToList();

            var tabList = objTabsBal.GetTabsListInRoleTabsView(Helpers.GetLoggedInUserId(), facilityId: facilityid, corporateId: corporateId, isDeleted: false, isActive: true);
            return PartialView(PartialViews.TabsTreeView, tabList);
        }

        /// <summary>
        /// Gets the tabs assigned to facility.
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public ActionResult GetTabsByCorporateAndFacility(int corporateId, int facilityId)
        {
            using (var bal = new TabsBal())
            {
                var tabList = bal.GetTabsByCorporateAndFacilityId(facilityId, corporateId);
                return PartialView(PartialViews.TabsTreeView, tabList);
            }
        }

        /// <summary>
        /// Gets the modules assigned to facility.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetModulesAssignedToFacility(int corporateId, int facilityId)
        {
            using (var moduleRoleBal = new ModuleAccessBal())
            {
                //var moduleAccessList =
                //    moduleRoleBal.GetModulesAccessList(corporateId, facilityId)
                //        .ToList();

                //var objTabsBal = new TabsBal();
                //var tabList =
                //    objTabsBal.GetCorporateFacilityTabList(corporateId, facilityId, null)
                //        .Where(t => t.CurrentTab.IsActive && !t.CurrentTab.IsDeleted)
                //        .ToList();
                //var newlist = tabList.Where(
                //    t => (moduleAccessList.Any(z => z.TabID == t.CurrentTab.TabId))).ToList();
                IEnumerable<TabsCustomModel> newlist = new List<TabsCustomModel>();
                using (var tBal = new TabsBal())
                {
                    newlist = tBal.GetTabsListInRoleTabsView(Helpers.GetLoggedInUserId(), facilityId: facilityId, corporateId: corporateId, isDeleted: false, isActive: true);
                }
                return PartialView(PartialViews.TabsTreeView, newlist);
            }
        }

        #endregion
    }
}
