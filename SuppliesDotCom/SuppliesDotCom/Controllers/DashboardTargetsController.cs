using System;
using System.Linq;
using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System.Collections.Generic;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;
using SuppliesDotCom.Common.Common;

namespace SuppliesDotCom.Controllers
{
    public class DashboardTargetsController : BaseController
    {
        /// <summary>
        /// Get the details of the DashboardTargets View in the Model DashboardTargets such as DashboardTargetsList, list of countries etc.
        /// </summary>
        /// <returns>returns the actionresult in the form of current object of the Model DashboardTargets to be passed to View DashboardTargets</returns>
        public ActionResult Index()
        {
            //Initialize the DashboardTargets BAL object
            using (var bal = new DashboardTargetsBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardTargetsList(Helpers.GetSysAdminCorporateID(), Helpers.GetDefaultFacilityId());

                //Intialize the View Model i.e. DashboardTargetsView which is binded to Main View Index.cshtml under DashboardTargets
                var viewModel = new DashboardTargetsView
                {
                    DashboardTargetsList = list,
                    CurrentDashboardTargets = new DashboardTargets { IsActive = true }
                };

                //Pass the View Model in ActionResult to View DashboardTargets
                return View(viewModel);
            }
        }

        /// <summary>
        /// Add New or Update the DashboardTargets based on if we pass the DashboardTargets ID in the DashboardTargetsViewModel object.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>returns the newly added or updated ID of DashboardTargets row</returns>
        public ActionResult SaveDashboardTargets(DashboardTargets model)
        {
            //Initialize the newId variable 
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardTargetsCustomModel>();

            //Check if Model is not null 
            if (model != null)
            {
                using (var bal = new DashboardTargetsBal())
                {
                    if (model.TargetId > 0)
                    {
                        model.ModifiedBy = userId;
                        model.ModifiedDate = currentDate;
                    }
                    else
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }

                    //Call the AddDashboardTargets Method to Add / Update current DashboardTargets
                    list = bal.SaveDashboardTargets(model);
                }
            }

            //Pass the ActionResult with List of DashboardTargetsViewModel object to Partial View DashboardTargetsList
            return PartialView(PartialViews.DashboardTargetsList, list);
        }

        /// <summary>
        /// Get the details of the current DashboardTargets in the view model by ID 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDashboardTargetsDetails(int id)
        {
            using (var bal = new DashboardTargetsBal())
            {
                //Call the AddDashboardTargets Method to Add / Update current DashboardTargets
                var current = bal.GetDashboardTargetsById(id);

                //Pass the ActionResult with the current DashboardTargetsViewModel object as model to PartialView DashboardTargetsAddEdit
                return Json(current);
            }
        }

        /// <summary>
        /// Delete the current DashboardTargets based on the DashboardTargets ID passed in the DashboardTargetsModel
        /// </summary>
        /// <returns></returns>
        public ActionResult DeleteDashboardTargets(int id)
        {
            var list = new List<DashboardTargetsCustomModel>();
            using (var bal = new DashboardTargetsBal())
            {
                //Get DashboardTargets model object by current DashboardTargets ID
                var model = bal.GetDashboardTargetsById(id);
                var userId = Helpers.GetLoggedInUserId();
                var currentDate = Helpers.GetInvariantCultureDateTime();

                //Check If DashboardTargets model is not null
                if (model != null)
                {
                    model.IsActive = false;
                    model.ModifiedBy = userId;
                    model.ModifiedDate = currentDate;

                    //Update Operation of current DashboardTargets
                    list = bal.SaveDashboardTargets(model);
                }
            }

            //Pass the ActionResult with List of DashboardTargetsViewModel object to Partial View DashboardTargetsList
            return PartialView(PartialViews.DashboardTargetsList, list);
        }

        //public PartialViewResult GetAllTargetsData(int corporateId, int facilityId)
        //{
        //    using (var bal = new DashboardTargetsBal())
        //    {
        //        //Get the Entity list
        //        var list = bal.GetDashboardTargetsList(corporateId, facilityId);
        //        return PartialView(PartialViews.DashboardTargetsList, list);
        //    }
        //}

        public JsonResult BindAllTargetsData()
        {
            var cArray = new List<string> { "1012", "1013" };
            var gcList = GetGlobaCodesByCategories(cArray);
            var cList = GetCorporateList();
            List<DropdownListData> fList;
            List<DropdownListData> rList;

            var cId = Helpers.GetSysAdminCorporateID();

            var fId = Helpers.GetDefaultFacilityId();
            if (Helpers.GetLoggedInUserIsAdmin())
                fId = 0;
            using (var bal = new FacilityBal())
                fList = bal.GetFacilityDropdownData(cId, fId);

            using (var bal = new RoleBal())
                rList = bal.GetRolesByFacility(Helpers.GetDefaultFacilityId());

            var jsonData = new
            {
                uomList = gcList.Where(g => g.ExternalValue1.Equals("1012")).ToList(),
                tList = gcList.Where(g => g.ExternalValue1.Equals("1013")).ToList(),
                cList,
                fList,
                rList,
                fId = Convert.ToString(Helpers.GetDefaultFacilityId()),
                cId = Convert.ToString(Helpers.GetSysAdminCorporateID())
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCorporateData(int cId)
        {
            List<DropdownListData> fList;
            var fId = Helpers.GetDefaultFacilityId();
            if (Helpers.GetLoggedInUserIsAdmin())
                fId = 0;

            using (var bal = new FacilityBal())
                fList = bal.GetFacilityDropdownData(cId, fId);

            var jsonData = new
            {
                fList,
                tList = GetTargetsListInString(cId, fId)
            };

            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFacilityData(int facilityId)
        {
            List<DropdownListData> rList;
            using (var bal = new RoleBal())
                rList = bal.GetRolesByFacility(facilityId);

            var jsonData = new
            {
                rList,
                tList = GetTargetsListInString(0, facilityId)
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        private string GetTargetsListInString(int corporateId, int facilityId)
        {
            using (var bal = new DashboardTargetsBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardTargetsList(corporateId, facilityId);
                var result = RenderPartialViewToStringBase(PartialViews.DashboardTargetsList, list);
                return result;
            }
        }

        public ActionResult SortDahboardTarget(int corporateId, int facilityId)
        {
            using (var bal=new DashboardTargetsBal())
            {
                var list = bal.GetDashboardTargetsList(corporateId,facilityId);
                return PartialView(PartialViews.DashboardTargetsList, list);

            }
        }
    }
}
