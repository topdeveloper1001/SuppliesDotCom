using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Models;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Controllers
{
    public class RoleSelectionController : Controller
    {
        //
        // GET: /RoleSelection/
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            var session = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            var userId = session != null ? session.UserId : 0;
            var roleSelectionView = new RoleSelectionView { RoleSelectionCustomModel = GetUserRoles(userId) };
            return PartialView(PartialViews.RoleSelectionMaster, roleSelectionView);
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
            return userroleList;
        }

        /// <summary>
        /// Sets the user role.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public ActionResult SetUserRole(int roleId, int facilityId, int corporateId)
        {
            SessionClass objSession = null;

            if (Session[SessionNames.SessionClass.ToString()] != null)
            {
                objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                objSession.FacilityId = facilityId;
                objSession.RoleId = roleId;
                objSession.CorporateId = corporateId;
                //using (var mBal = new ModuleAccessBal())
                //{
                //    var mList = mBal.GetModulesAccessList(corporateId, facilityId);
                //    Session[SessionNames.SessoionModuleAccess.ToString()] = mList;
                //}

                // Changed by Shashank ON : 5th May 2015 : To add the Module access level Security when user log in via Facility and Corporate 
                using (var userbal = new UsersBal())
                    objSession.MenuSessionList = userbal.GetTabsByUserIdRoleId(objSession.UserId, objSession.RoleId, objSession.FacilityId, objSession.CorporateId, isDeleted: false, isActive: true);

                using (var rtBal = new RoleTabsBal())
                {
                    objSession.IsPatientSearchAccessible = rtBal.CheckIfTabNameAccessibleToGivenRole("Patient Lookup",
                        ControllerAccess.PatientSearch.ToString(), ActionNameAccess.PatientSearch.ToString(),
                        Convert.ToInt32(roleId));
                    objSession.IsAuthorizationAccessible =
                        rtBal.CheckIfTabNameAccessibleToGivenRole("Obtain Insurance Authorization",
                            ControllerAccess.Authorization.ToString(),
                            ActionNameAccess.AuthorizationMain.ToString(), Convert.ToInt32(roleId));
                    objSession.IsActiveEncountersAccessible =
                        rtBal.CheckIfTabNameAccessibleToGivenRole("Active Encounters",
                            ControllerAccess.ActiveEncounter.ToString(),
                            ActionNameAccess.ActiveEncounter.ToString(),
                            Convert.ToInt32(roleId));
                    objSession.IsBillHeaderViewAccessible =
                        rtBal.CheckIfTabNameAccessibleToGivenRole("Generate Preliminary Bill",
                            ControllerAccess.BillHeader.ToString(),
                            ActionNameAccess.Index.ToString(), Convert.ToInt32(roleId));
                    objSession.IsEhrAccessible =
                        rtBal.CheckIfTabNameAccessibleToGivenRole("EHR",
                            ControllerAccess.Summary.ToString(),
                            ActionNameAccess.PatientSummary.ToString(), Convert.ToInt32(roleId));

                    objSession.SchedularAccessible =
                        rtBal.CheckIfTabNameAccessibleToGivenRole("Scheduling", string.Empty, string.Empty,
                            Convert.ToInt32(roleId));
                }
            }
            else
            {
                objSession = new SessionClass
                {
                    FacilityId = facilityId,
                    RoleId = roleId,
                    CorporateId = corporateId
                };
            }

            var userBal = new UsersBal();
            var userDetails = userBal.GetUserDetails(roleId, facilityId, objSession.UserId);
            objSession.RoleName = userDetails.RoleName;
            objSession.FacilityName = userDetails.DefaultFacility;
            objSession.UserName = userDetails.UserName;
            objSession.FacilityNumber = userDetails.FacilityNumber;
            objSession.UserIsAdmin = userDetails.UserIsAdmin;
            objSession.SelectedCulture = CultureInfo.CurrentCulture.Name;
            objSession.RoleKey = userDetails.RoleKey;

            if (objSession.MenuSessionList != null || !objSession.MenuSessionList.Any())
            {
                // Changed by Shashank ON : 5th May 2015 : To add the Module access level Security when user log in via Facility and Corporate 
                using (var userbal = new UsersBal())
                    objSession.MenuSessionList = userbal.GetTabsByUserIdRoleId(objSession.UserId, objSession.RoleId, objSession.FacilityId, objSession.CorporateId, isDeleted: false, isActive: true);
            }
            using (var facilitybal = new FacilityBal())
            {
                var facilityObj = facilitybal.GetFacilityByFacilityId(facilityId);
                var timezoneValue = facilityObj.FacilityTimeZone;
                if (!string.IsNullOrEmpty(timezoneValue))
                {
                    var timezoneobj = TimeZoneInfo.FindSystemTimeZoneById(timezoneValue);
                    objSession.TimeZone = timezoneobj.BaseUtcOffset.TotalHours.ToString();
                }
                else
                {
                    objSession.TimeZone = "0.0";
                }
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

            Session[SessionNames.SessionClass.ToString()] = objSession;
            return Json(0);
            //return RedirectToAction("PatientSearch", "PatientSearch");
        }
    }
}