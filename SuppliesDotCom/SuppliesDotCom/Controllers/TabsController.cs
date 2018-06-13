using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using SuppliesDotCom.Common.Common;
using System.Linq;
using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Controllers
{
    public class TabsController : BaseController
    {
        const string partialViewPath = "../Tabs/";

        /// <summary>
        /// Get the details of the Tabs View in the Model Tabs such as TabsList, list of countries etc.
        /// </summary>
        /// <returns>returns the actionresult in the form of current object of the Model Tabs to be passed to View Tabs</returns>
        [CheckRolesAuthorize("1")]
        public ActionResult Index()
        {
            //Initialize the Tabs BAL object
            var tabsBal = new TabsBal();

            //Get the Entity list
            var list = tabsBal.GetAllTabList(true, Helpers.GetLoggedInUserId());

            //Intialize the View Model i.e. TabsView which is binded to Main View Index.cshtml under Tabs
            var tabsView = new TabsView
            {
                TabsList = list,
                CurrentTabs = new Tabs { IsActive = true, IsVisible = true }
            };

            //Pass the View Model in ActionResult to View Tabs
            return View(tabsView);
        }

        /// <summary>
        /// Bind all the Tabs list 
        /// </summary>
        /// <returns>action result with the partial view containing the Tabs list object</returns>
        public ActionResult BindTabsList(bool showIsActive)
        {
            //Initialize the Tabs BAL object
            using (var tabsBal = new TabsBal())
            {
                //Get the facilities list
                var tabsList = new List<TabsCustomModel>(); //tabsBal.GetAllTabList(showIsActive, Helpers.GetLoggedInUserId());

                //Pass the ActionResult with List of TabsViewModel object to Partial View TabsList
                return PartialView(PartialViews.TabsList, tabsList);
            }
        }

        public JsonResult GetTListJson()
        {
            //Initialize the Tabs BAL object
            var tabsBal = new TabsBal();

            //Get the Entity list
            var list = tabsBal.GetAllTabList(true,Helpers.GetLoggedInUserId());
            var jsonResult = new
            {
                aaData = list.Select(t => new[] {
                t.CurrentTab.TabName, t.CurrentTab.TabHierarchy, t.CurrentTab.Controller,t.CurrentTab.Action, t.CurrentTab.RouteValues,
                    t.ParentTabName,t.CurrentTab.TabId.ToString()})
            };
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Add New or Update the Tabs based on if we pass the Tabs ID in the TabsViewModel object.
        /// </summary>
        /// <param name="model">pass the details of Tabs in the view model</param>
        /// <returns>returns the newly added or updated ID of Tabs row</returns>
        public ActionResult SaveTabs(Tabs model)
        {
            var pView = string.Empty;
            var rId = Helpers.GetDefaultRoleId();
            using (var b = new TabsBal())
            {
                var result = b.SaveTab(model, Convert.ToInt64(rId), Helpers.GetLoggedInUserId(), Helpers.GetInvariantCultureDateTime());

                if (result.ExecutionStatus > 0)
                {
                    var vn = $"{partialViewPath}{PartialViews.TabsList}";
                    pView = RenderPartialViewToStringBase(vn, result.AllTabs);

                    if (Session[SessionNames.SessionClass.ToString()] != null && result.TabsByRole.Any())
                    {
                        var s = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                        using (var bal = new TabsBal())
                            s.MenuSessionList = result.TabsByRole;
                    }
                }

                return Json(new { pView, status = result.ExecutionStatus }, JsonRequestBehavior.AllowGet);

            }

            ////Initialize the newId variable 
            //var newId = -1;

            ////Check if Tabs Model is not null
            //if (model != null)
            //{
            //    using (var bal = new TabsBal())
            //    {
            //        var isExists = bal.CheckIfDuplicateRecordExists(model.TabName, model.TabId, model.ParentTabId);
            //        if (isExists)
            //            return Json("-1");

            //        if (model.TabId > 0)
            //        {
            //            model.CreatedBy = Helpers.GetLoggedInUserId();
            //            model.CreatedDate = Helpers.GetInvariantCultureDateTime();
            //            model.ModifiedBy = Helpers.GetLoggedInUserId();
            //            model.ModifiedDate = Helpers.GetInvariantCultureDateTime();
            //        }
            //        else
            //        {
            //            model.CreatedBy = Helpers.GetLoggedInUserId();
            //            model.CreatedDate = Helpers.GetInvariantCultureDateTime();
            //        }

            //        //Call the AddTabs Method to Add / Update current Tabs
            //        newId = bal.AddUpdateTab(model);

            //        if (!bal.IsExistInRoleTabs(newId))
            //            bal.AddToRoleTab(newId);

            //        //Rebind the Session of Menu Tabs List
            //        ReBindTabsMenu();
            //    }
            //}
            //return Json(newId);
        }

        /// <summary>
        /// Get the details of the current Tabs in the view model by ID 
        /// </summary>
        /// <param name="tabId"></param>
        /// <returns></returns>
        public ActionResult GetTabById(string tabId)
        {
            using (var tabsBal = new TabsBal())
            {
                //Call the AddTabs Method to Add / Update current Tabs
                var currentTabs = tabsBal.GetTabByTabId(Convert.ToInt32(tabId));

                //Pass the ActionResult with the current TabsViewModel object as model to PartialView TabsAddEdit
                return PartialView(PartialViews.TabsAddEdit, currentTabs);
            }
        }

        /// <summary>
        /// Delete the current Tabs based on the Tabs ID passed in the TabsModel
        /// </summary>
        /// <param name="tabId"></param>
        /// <returns></returns>
        public ActionResult DeleteTabs(string tabId)
        {
            using (var tabsBal = new TabsBal())
            {
                //Get Tabs model object by current Tabs ID
                var model = tabsBal.GetTabByTabId(Convert.ToInt32(tabId));

                //Check If Tabs model is not null
                if (model != null)
                {
                    model.IsDeleted = true;
                    model.DeletedBy = Helpers.GetLoggedInUserId();
                    model.DeletedDate = Helpers.GetInvariantCultureDateTime();

                    //Update Operation of current Tabs
                    var result = tabsBal.AddUpdateTab(model);

                    //Rebind the Session of Menu Tabs List
                    ReBindTabsMenu();

                    //return deleted ID of current Tabs as Json Result to the Ajax Call.
                    return Json(result);
                }
            }

            //Return the Json result as Action Result back JSON Call Success
            return Json(null);
        }

        /// <summary>
        /// Reset the Tabs View Model and pass it to TabsAddEdit Partial View. 
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetTabsForm()
        {
            //Intialize the new object of Tabs ViewModel
            var model = new Tabs { IsVisible = true, IsActive = true };

            //Pass the View Model as TabsViewModel to PartialView TabsAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.TabsAddEdit, model);
        }

        /// <summary>
        /// Gets the parent tabs.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetParentTabs()
        {
            //Initialize the Tabs BAL object
            using (var tabsBal = new TabsBal())
            {
                //Get the facilities list
                var list = tabsBal.GetAllTabs();

                //Pass the ActionResult with List of TabsViewModel object to Partial View TabsList
                return Json(list);
            }
        }

        /// <summary>
        /// Checks if duplicate record exists.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="tabId">The tab identifier.</param>
        /// <param name="parentTabId">The parent tab identifier.</param>
        /// <returns></returns>
        public ActionResult CheckIfDuplicateRecordExists(string name, string tabId, string parentTabId)
        {
            using (var bal = new TabsBal())
            {
                var result = bal.CheckIfDuplicateRecordExists(name, string.IsNullOrEmpty(tabId) ? 0 : Convert.ToInt32(tabId), string.IsNullOrEmpty(parentTabId) ? 0 : Convert.ToInt32(parentTabId));
                return Json(result);
            }
        }

        /// <summary>
        /// Gets the tab order by parent tab identifier.
        /// </summary>
        /// <param name="tabId">The tab identifier.</param>
        /// <returns></returns>
        public ActionResult GetTabOrderByParentTabId(int tabId)
        {
            if (tabId > 0)
            {
                using (var bal = new TabsBal())
                {
                    var maxTabOrder = bal.GetMaxTabOrderByParentTabId(tabId);
                    return Json(maxTabOrder);
                }
            }
            return Json(1);
        }

        /// <summary>
        /// Rebind tabs menu.
        /// </summary>
        private void ReBindTabsMenu()
        {
            //using (var usersBal = new UsersBal())
            //{
            //    if (Session[SessionNames.SessionClass.ToString()] != null)
            //    {
            //        var objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
            //        if (objSession != null)
            //        {
            //            var tabsList = usersBal.GetTabsByUserName(objSession.UserName);
            //            objSession.MenuSessionList = tabsList;
            //        }
            //    }
            //}

            if (Session[SessionNames.SessionClass.ToString()] != null)
            {
                var s = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                using (var bal = new TabsBal())
                    s.MenuSessionList = bal.GetTabsByRole(s.UserName, s.RoleId);

            }
        }
    }
}
