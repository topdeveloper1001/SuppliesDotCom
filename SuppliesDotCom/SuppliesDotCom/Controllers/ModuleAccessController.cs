using System.Data;
using SuppliesDotCom.Model;
using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model.CustomModel;
using System.Linq;

namespace SuppliesDotCom.Controllers
{
    public class ModuleAccessController : BaseController
    {
        /// <summary>
        /// Get the details of the ModuleAccess View in the Model ModuleAccess such as ModuleAccessList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model ModuleAccess to be passed to View ModuleAccess
        /// </returns>
        [CheckRolesAuthorize("1")]
        public ActionResult Index()
        {
            using (var mBal = new ModuleAccessBal())
            {
                //Get the Entity list
                var moduleAccessList = mBal.GetModuleAccess();

                //Intialize the View Model i.e. ModuleAccessView which is binded to Main View Index.cshtml under ModuleAccess
                var moduleAccessView = new ModuleAccessView
                {
                    ModuleAccessList = moduleAccessList,
                    CurrentModuleAccess = new ModuleAccess(),
                    TabList = new List<TabsCustomModel>() //tBal.GetAllTabList().Where(t => t.CurrentTab.IsActive && !t.CurrentTab.IsDeleted).ToList(),
                };

                //Pass the View Model in ActionResult to View ModuleAccess
                return View(moduleAccessView);
            }
        }

        /// <summary>
        /// Bind all the ModuleAccess list
        /// </summary>
        /// <returns>
        /// action result with the partial view containing the ModuleAccess list object
        /// </returns>
        public ActionResult BindModuleAccessList()
        {
            //Initialize the ModuleAccess BAL object
            using (var moduleAccessBal = new TabsBal())
            {
                var moduleAccessList = moduleAccessBal.GetTabsOnModuleAccessLoad(Helpers.GetLoggedInUserId(), isActive: true);

                //Pass the ActionResult with List of ModuleAccessViewModel object to Partial View ModuleAccessList
                return PartialView(PartialViews.ModuleAccessTabView, moduleAccessList);
            }
        }

        /// <summary>
        /// Add New or Update the ModuleAccess based on if we pass the ModuleAccess ID in the ModuleAccessViewModel object.
        /// </summary>
        /// <param name="list">The module access model list.</param>
        /// <returns>
        /// returns the newly added or updated ID of ModuleAccess row
        /// </returns>
        public ActionResult SaveModuleAccess(List<ModuleAccess> list)
        {
            var result = 0;
            try
            {
                //var objListModuleAccessPermission = new List<ModuleAccess>();
                //foreach (var item in moduleAccessModelList)
                //{
                //    var objModuleAccess = new ModuleAccess();
                //    var tabsBal = new TabsBal();
                //    objModuleAccess.CorporateID = Convert.ToInt32(item.CorporateID);
                //    objModuleAccess.FacilityID = Convert.ToInt32(item.FacilityID);
                //    objModuleAccess.TabID = Convert.ToInt32(item.TabID);
                //    objModuleAccess.TabName = string.Empty; //tabsBal.GetTabNameById(Convert.ToInt32(item.TabID));
                //    objModuleAccess.IsDeleted = false;
                //    objModuleAccess.CreatedBy = objModuleAccess.ModifiedBy = userid;
                //    objModuleAccess.CreatedDate = Helpers.GetInvariantCultureDateTime();
                //    CorporateId = Convert.ToInt32(item.CorporateID);
                //    FacilityId = Convert.ToInt32(item.FacilityID);
                //    objListModuleAccessPermission.Add(objModuleAccess);
                //}

                DataTable dt = Helpers.ToDataTable(list);
                var cId = list != null && list.Any() ? list[0].CorporateID.Value : Helpers.GetSysAdminCorporateID();
                var fId = list != null && list.Any() ? list[0].FacilityID.Value : Helpers.GetDefaultFacilityId();

                using (var bal = new ModuleAccessBal())
                    result = bal.Save(dt, cId, fId, Helpers.GetInvariantCultureDateTime(), Helpers.GetLoggedInUserId());

                return Json(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get the details of the current ModuleAccess in the view model by ID
        /// </summary>
        /// <param name="moduleAccessId">The module access identifier.</param>
        /// <returns></returns>
        public ActionResult GetModuleAccess(int moduleAccessId)
        {
            using (var moduleAccessBal = new ModuleAccessBal())
            {
                //Call the AddModuleAccess Method to Add / Update current ModuleAccess
                var currentModuleAccess = moduleAccessBal.GetModuleAccessByID(Convert.ToInt32(moduleAccessId));

                //If the view is shown in ViewMode only, then ViewBag.ViewOnly is set to true otherwise false.
                //ViewBag.ViewOnly = !string.IsNullOrEmpty(model.ViewOnly);

                //Pass the ActionResult with the current ModuleAccessViewModel object as model to PartialView ModuleAccessAddEdit
                return PartialView(PartialViews.ModuleAccessAddEdit, currentModuleAccess);
            }
        }

        /// <summary>
        /// Delete the current ModuleAccess based on the ModuleAccess ID passed in the ModuleAccessModel
        /// </summary>
        /// <param name="moduleAccessId">The module access identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteModuleAccess(int moduleAccessId)
        {
            using (var moduleAccessBal = new ModuleAccessBal())
            {
                //Get ModuleAccess model object by current ModuleAccess ID
                var currentModuleAccess = moduleAccessBal.GetModuleAccessByID(Convert.ToInt32(moduleAccessId));

                //Check If ModuleAccess model is not null
                if (currentModuleAccess != null)
                {
                    currentModuleAccess.IsDeleted = true;
                    currentModuleAccess.DeletedBy = Helpers.GetLoggedInUserId();
                    currentModuleAccess.DeletedDate = Helpers.GetInvariantCultureDateTime();

                    //Update Operation of current ModuleAccess
                    var result = moduleAccessBal.DeleteEntry(currentModuleAccess);

                    //return deleted ID of current ModuleAccess as Json Result to the Ajax Call.
                    return Json(result);
                }
            }

            //Return the Json result as Action Result back JSON Call Success
            return Json(null);
        }

        /// <summary>
        /// Reset the ModuleAccess View Model and pass it to ModuleAccessAddEdit Partial View.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetModuleAccessForm()
        {
            //Intialize the new object of ModuleAccess ViewModel
            var moduleAccessViewModel = new Model.ModuleAccess();

            //Pass the View Model as ModuleAccessViewModel to PartialView ModuleAccessAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.ModuleAccessAddEdit, moduleAccessViewModel);
        }

        /// <summary>
        /// Gets the corporate modules by corporate identifier.
        /// </summary>
        /// <param name="coporateId">The coporate identifier.</param>
        /// <returns></returns>
        public ActionResult GetCorporateModulesByCorporateID(int coporateId)
        {
            var tabsList = new List<TabsCustomModel>();
            using (var objTabsBal = new TabsBal())
            {
                tabsList = objTabsBal.GetParentCorporateFacilityTabList(coporateId, 0);
            }
            var selectedTabs = tabsList;
            return PartialView(PartialViews.ModuleAccessTabView, selectedTabs);
            //return Json(selectedTabs);
        }

        /// <summary>
        /// Gets the modules access by corporate identifier facility identifier.
        /// </summary>
        /// <param name="coporateId">The coporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetModulesAccessByCorporateIDFacilityID(int coporateId, int facilityId)
        {
            var objmoduleAccessBal = new ModuleAccessBal();
            //  var loggedinUserid = Helpers.GetLoggedInUserId();
            var selectedTabs = objmoduleAccessBal.GetModulesAccessList(coporateId, facilityId);
            return Json(selectedTabs);
        }

        /// <summary>
        /// Bind all the ModuleAccess list
        /// </summary>
        /// <returns>
        /// action result with the partial view containing the ModuleAccess list object
        /// </returns>
        public ActionResult BindParentTabsList()
        {
            //Initialize the ModuleAccess BAL object
            using (var moduleAccessBal = new TabsBal())
            {
                var moduleAccessList = moduleAccessBal.GetAllTabList(true, Helpers.GetLoggedInUserId());
                
                //Pass the ActionResult with List of ModuleAccessViewModel object to Partial View ModuleAccessList
                return PartialView(PartialViews.ModuleAccessTabView, moduleAccessList);
            }
        }
    }
}
