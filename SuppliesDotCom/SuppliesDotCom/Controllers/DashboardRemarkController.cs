using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System.Collections.Generic;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Controllers
{
    public class DashboardRemarkController : BaseController
    {
        /// <summary>
        /// Get the details of the DashboardRemark View in the Model DashboardRemark such as DashboardRemarkList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model DashboardRemark to be passed to View DashboardRemark
        /// </returns>
        public ActionResult Index()
        {
            //Initialize the DashboardRemark BAL object
            using (var bal = new DashboardRemarkBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardRemarkList(Helpers.GetSysAdminCorporateID());

                //Intialize the View Model i.e. DashboardRemarkView which is binded to Main View Index.cshtml under DashboardRemark
                var viewModel = new DashboardRemarkView
                {
                    DashboardRemarkList = list,
                    CurrentDashboardRemark = new DashboardRemark()
                };

                //Pass the View Model in ActionResult to View DashboardRemark
                return View(viewModel);
            }
        }

        /// <summary>
        /// Add New or Update the DashboardRemark based on if we pass the DashboardRemark ID in the DashboardRemarkViewModel object.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>
        /// returns the newly added or updated ID of DashboardRemark row
        /// </returns>
        public ActionResult SaveDashboardRemark(DashboardRemark model)
        {
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardRemarkCustomModel>();

            //Check if Model is not null 
            if (model != null)
            {
                using (var bal = new DashboardRemarkBal())
                {
                    model.CorporateId = Helpers.GetSysAdminCorporateID();
                    model.IsActive = true;
                    if (model.Id == 0)
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }

                    //Call the AddDashboardRemark Method to Add / Update current DashboardRemark
                    list = bal.SaveDashboardRemark(model);
                }
            }
            //Pass the ActionResult with List of DashboardRemarkViewModel object to Partial View DashboardRemarkList
            return PartialView(PartialViews.DashboardRemarkList, list);
        }

        /// <summary>
        /// Get the details of the current DashboardRemark in the view model by ID
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public JsonResult GetDashboardRemarkDetails(int id)
        {
            using (var bal = new DashboardRemarkBal())
            {
                //Call the AddDashboardRemark Method to Add / Update current DashboardRemark
                var current = bal.GetDashboardRemarkByID(id);

                //Pass the ActionResult with the current DashboardRemarkViewModel object as model to PartialView DashboardRemarkAddEdit
                return Json(current);
            }
        }

        /// <summary>
        /// Delete the current DashboardRemark based on the DashboardRemark ID passed in the DashboardRemarkModel
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteDashboardRemark(int id)
        {
            using (var bal = new DashboardRemarkBal())
            {
                //Get DashboardRemark model object by current DashboardRemark ID
                var model = bal.GetDashboardRemarkByID(id);
                var list = new List<DashboardRemarkCustomModel>();
                //Check If DashboardRemark model is not null
                if (model != null)
                {
                    model.IsActive = false;

                    //Update Operation of current DashboardRemark
                    list = bal.SaveDashboardRemark(model);
                    //return deleted ID of current DashboardRemark as Json Result to the Ajax Call.
                }
                return PartialView(PartialViews.DashboardRemarkList, list);
            }

            //Pass the ActionResult with List of DashboardRemarkViewModel object to Partial View DashboardRemarkList
        }
    }
}
