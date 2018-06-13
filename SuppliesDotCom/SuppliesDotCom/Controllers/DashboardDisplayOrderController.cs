using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Controllers
{
    public class DashboardDisplayOrderController : BaseController
    {
        /// <summary>
        /// Get the details of the DashboardDisplayOrder View in the Model DashboardDisplayOrder such as DashboardDisplayOrderList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model DashboardDisplayOrder to be passed to View DashboardDisplayOrder
        /// </returns>
        public ActionResult Index()
        {
            //Initialize the DashboardDisplayOrder BAL object
            using (var bal = new DashboardDisplayOrderBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardDisplayOrderList(Helpers.GetSysAdminCorporateID());

                //Intialize the View Model i.e. DashboardDisplayOrderView which is binded to Main View Index.cshtml under DashboardDisplayOrder
                var viewModel = new DashboardDisplayOrderView
                {
                    DashboardDisplayOrderList = list,
                    CurrentDashboardDisplayOrder = new DashboardDisplayOrder()
                };

                //Pass the View Model in ActionResult to View DashboardDisplayOrder
                return View(viewModel);
            }
        }

        /// <summary>
        /// Add New or Update the DashboardDisplayOrder based on if we pass the DashboardDisplayOrder ID in the DashboardDisplayOrderViewModel object.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>
        /// returns the newly added or updated ID of DashboardDisplayOrder row
        /// </returns>
        public ActionResult SaveDashboardDisplayOrder(DashboardDisplayOrder model)
        {
            //Initialize the newId variable 
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardDisplayOrderCustomModel>();

            //Check if Model is not null 
            if (model != null)
            {
                var corporateid = Helpers.GetSysAdminCorporateID();
                model.CorporateId = corporateid;
                using (var bal = new DashboardDisplayOrderBal())
                {
                    if (model.Id > 0)
                    {
                    }
                    else
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }

                    //Call the AddDashboardDisplayOrder Method to Add / Update current DashboardDisplayOrder
                    list = bal.SaveDashboardDisplayOrder(model);
                }
            }

            //Pass the ActionResult with List of DashboardDisplayOrderViewModel object to Partial View DashboardDisplayOrderList
            return PartialView(PartialViews.DashboardDisplayOrderList, list);
        }

        /// <summary>
        /// Get the details of the current DashboardDisplayOrder in the view model by ID
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public JsonResult GetDashboardDisplayOrderDetails(int id)
        {
            using (var bal = new DashboardDisplayOrderBal())
            {
                //Call the AddDashboardDisplayOrder Method to Add / Update current DashboardDisplayOrder
                var current = bal.GetDashboardDisplayOrderByID(id);

                //Pass the ActionResult with the current DashboardDisplayOrderViewModel object as model to PartialView DashboardDisplayOrderAddEdit
                return Json(current);
            }
        }

        /// <summary>
        /// Delete the current DashboardDisplayOrder based on the DashboardDisplayOrder ID passed in the DashboardDisplayOrderModel
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteDashboardDisplayOrder(int id)
        {
            using (var bal = new DashboardDisplayOrderBal())
            {
                //Get DashboardDisplayOrder model object by current DashboardDisplayOrder ID
                var model = bal.GetDashboardDisplayOrderByID(id);
                var userId = Helpers.GetLoggedInUserId();
                var list = new List<DashboardDisplayOrderCustomModel>();
                var currentDate = Helpers.GetInvariantCultureDateTime();

                //Check If DashboardDisplayOrder model is not null
                if (model != null)
                {
                    model.IsDeleted = true;
                    //Update Operation of current DashboardDisplayOrder
                    list = bal.SaveDashboardDisplayOrder(model);
                    //return deleted ID of current DashboardDisplayOrder as Json Result to the Ajax Call.
                }
                //Pass the ActionResult with List of DashboardDisplayOrderViewModel object to Partial View DashboardDisplayOrderList
                return PartialView(PartialViews.DashboardDisplayOrderList, list);
            }
        }
    }
}
