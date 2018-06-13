// --------------------------------------------------------------------------------------------------------------------
// <copyright file="HolidayPlannerController.cs" company="SPadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The holiday planner controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    using Bal.BusinessAccess;
    using Common;
    using Model;
    using Models;

    using iTextSharp.text;

    /// <summary>
    /// DeptTimming controller.
    /// </summary>
    public class DeptTimmingController : BaseController
    {
        #region Public Methods and Operators

        /// <summary>
        ///     Bind all the DeptTimming list
        /// </summary>
        /// <returns>action result with the partial view containing the DeptTimming list object</returns>
        [HttpPost]
        public ActionResult BindDeptTimmingList()
        {
            // Initialize the DeptTimming BAL object
            using (var deptTimmingBal = new DeptTimmingBal())
            {
                // Get the facilities list
                var deptTimmingList = deptTimmingBal.GetDeptTimming();

                // Pass the ActionResult with List of DeptTimmingViewModel object to Partial View DeptTimmingList
                return PartialView(PartialViews.DeptTimmingList, deptTimmingList);
            }
        }

        /// <summary>
        /// Delete the current DeptTimming based on the DeptTimming ID passed in the DeptTimmingModel
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult DeleteDeptTimming(int id)
        {
            using (var bal = new DeptTimmingBal())
            {
                // Get DeptTimming model object by current DeptTimming ID
                var currentDeptTimming = bal.GetDeptTimmingById(id);
                var userId = Helpers.GetLoggedInUserId();

                // Check If DeptTimming model is not null
                if (currentDeptTimming != null)
                {
                    currentDeptTimming.IsActive = false;

                    // Update Operation of current DeptTimming
                    int result = bal.SaveDeptTimming(currentDeptTimming);

                    // return deleted ID of current DeptTimming as Json Result to the Ajax Call.
                    return Json(result);
                }
            }

            // Return the Json result as Action Result back JSON Call Success
            return Json(null);
        }

        /// <summary>
        /// Get the details of the current DeptTimming in the view model by ID
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult GetDeptTimming(int id)
        {
            using (var bal = new DeptTimmingBal())
            {
                // Call the AddDeptTimming Method to Add / Update current DeptTimming
                DeptTimming currentDeptTimming = bal.GetDeptTimmingById(id);

                // Pass the ActionResult with the current DeptTimmingViewModel object as model to PartialView DeptTimmingAddEdit
                return PartialView(PartialViews.DeptTimmingAddEdit, currentDeptTimming);
            }
        }

        /// <summary>
        /// Get the details of the DeptTimming View in the Model DeptTimming such as DeptTimmingList, list of
        ///     countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model DeptTimming to be passed to View
        ///     DeptTimming
        /// </returns>
        public ActionResult DeptTimmingMain()
        {
            // Initialize the DeptTimming BAL object
            var deptTimmingBal = new DeptTimmingBal();

            // Get the Entity list
            var deptTimmingList = deptTimmingBal.GetDeptTimming();

            // Intialize the View Model i.e. DeptTimmingView which is binded to Main View Index.cshtml under DeptTimming
            //var deptTimmingView = new DeptTimmingView
            //                             {
            //                                 DeptTimmingList = deptTimmingList, 
            //                                 CurrentDeptTimming = new DeptTimming()
            //                             };

            // Pass the View Model in ActionResult to View DeptTimming
            return View();// View(deptTimmingView);
        }

        /// <summary>
        /// Reset the DeptTimming View Model and pass it to DeptTimmingAddEdit Partial View.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult" />.
        /// </returns>
        public ActionResult ResetDeptTimmingForm()
        {
            // Intialize the new object of DeptTimming ViewModel
            var deptTimmingViewModel = new DeptTimming();

            // Pass the View Model as DeptTimmingViewModel to PartialView DeptTimmingAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.DeptTimmingAddEdit, deptTimmingViewModel);
        }

        /// <summary>
        /// Add New or Update the DeptTimming based on if we pass the DeptTimming ID in the DeptTimmingViewModel
        ///     object.
        /// </summary>
        /// <param name="model">
        /// The model.
        /// </param>
        /// <returns>
        /// returns the newly added or updated ID of DeptTimming row
        /// </returns>
        public ActionResult SaveDeptTimming(DeptTimming model)
        {
            // Initialize the newId variable 
            int newId = -1;
            int userId = Helpers.GetLoggedInUserId();

            // Check if Model is not null 
            if (model != null)
            {
                using (var bal = new DeptTimmingBal())
                {
                    if (model.DeptTimmingId > 0)
                    {
                        // model.ModifiedBy = userId;
                        // model.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                    }

                    // Call the AddDeptTimming Method to Add / Update current DeptTimming
                    newId = bal.SaveDeptTimming(model);
                }
            }

            return Json(newId);
        }

        
        #endregion
    }
}
