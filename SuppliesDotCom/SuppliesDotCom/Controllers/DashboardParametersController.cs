// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DashboardParametersController.cs" company="Spadez">
//   Omnihealthcare
// </copyright>
// <summary>
//   The dashboard parameters controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    using SuppliesDotCom.Bal.BusinessAccess;
    using SuppliesDotCom.Common;
    using SuppliesDotCom.Model;
    using SuppliesDotCom.Model.CustomModel;
    using SuppliesDotCom.Models;

    /// <summary>
    /// The dashboard parameters controller.
    /// </summary>
    public class DashboardParametersController : BaseController
    {
        #region Public Methods and Operators

        /// <summary>
        /// Delete the current DashboardParameters based on the DashboardParameters ID passed in the DashboardParametersModel
        /// </summary>
        /// <param name="id">
        /// The identifier.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult DeleteDashboardParameters(int id)
        {
            using (var bal = new DashboardParametersBal())
            {
                // Get DashboardParameters model object by current DashboardParameters ID
                DashboardParameters model = bal.GetDashboardParametersById(id);
                int userId = Helpers.GetLoggedInUserId();
                var list = new List<DashboardParametersCustomModel>();
                DateTime currentDate = Helpers.GetInvariantCultureDateTime();

                // Check If DashboardParameters model is not null
                if (model != null)
                {
                    int corporateid = Helpers.GetSysAdminCorporateID();
                    int facilityid = Helpers.GetDefaultFacilityId();

                    model.ModifiedBy = userId;
                    model.ModifiedDate = currentDate;

                    model.CorporateId = corporateid;
                    model.FacilityId = facilityid;

                    // Update Operation of current DashboardParameters
                    list = bal.DeleteDashboardParameters(model);

                    // return deleted ID of current DashboardParameters as Json Result to the Ajax Call.
                }

                // Pass the ActionResult with List of DashboardParametersViewModel object to Partial View DashboardParametersList
                return this.PartialView(PartialViews.DashboardParametersList, list);
            }
        }

        /// <summary>
        /// Get the details of the current DashboardParameters in the view model by ID
        /// </summary>
        /// <param name="id">
        /// The identifier.
        /// </param>
        /// <returns>
        /// The <see cref="JsonResult"/>.
        /// </returns>
        public JsonResult GetDashboardParametersDetails(int id)
        {
            using (var bal = new DashboardParametersBal())
            {
                // Call the AddDashboardParameters Method to Add / Update current DashboardParameters
                DashboardParameters current = bal.GetDashboardParametersById(id);

                // Pass the ActionResult with the current DashboardParametersViewModel object as model to PartialView DashboardParametersAddEdit
                return this.Json(current);
            }
        }

        /// <summary>
        /// Gets the parameters list by dashboard.
        /// </summary>
        /// <param name="dashboardType">
        /// Type of the dashboard.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult GetParametersListByDashboard(string dashboardType)
        {
            using (var bal = new DashboardParametersBal())
            {
                List<DashboardParametersRangeCustomModel> listtoreturn =
                    bal.GetParametersListByDashboard(
                        Helpers.GetSysAdminCorporateID(), 
                        Helpers.GetFacilityIdNextDefaultCororateFacility(), 
                        dashboardType);
                return this.Json(listtoreturn, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        ///     Get the details of the DashboardParameters View in the Model DashboardParameters such as DashboardParametersList,
        ///     list of countries etc.
        /// </summary>
        /// <returns>
        ///     returns the actionresult in the form of current object of the Model DashboardParameters to be passed to View
        ///     DashboardParameters
        /// </returns>
        public ActionResult Index()
        {
            // Initialize the DashboardParameters BAL object
            using (var bal = new DashboardParametersBal())
            {
                // Get the Entity list
                int corporateid = Helpers.GetSysAdminCorporateID();
                int facilityid = Helpers.GetDefaultFacilityId();
                List<DashboardParametersCustomModel> list = bal.GetDashboardParametersList(corporateid, facilityid);

                // Intialize the View Model i.e. DashboardParametersView which is binded to Main View Index.cshtml under DashboardParameters
                var viewModel = new DashboardParametersView
                                    {
                                        DashboardParametersList = list, 
                                        CurrentDashboardParameters = new DashboardParameters()
                                    };

                // Pass the View Model in ActionResult to View DashboardParameters
                return View(viewModel);
            }
        }

        /// <summary>
        /// Add New or Update the DashboardParameters based on if we pass the DashboardParameters ID in the
        ///     DashboardParametersViewModel object.
        /// </summary>
        /// <param name="model">
        /// The model.
        /// </param>
        /// <returns>
        /// returns the newly added or updated ID of DashboardParameters row
        /// </returns>
        public ActionResult SaveDashboardParameters(DashboardParameters model)
        {
            // Initialize the newId variable 
            int userId = Helpers.GetLoggedInUserId();
            DateTime currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardParametersCustomModel>();

            // Check if Model is not null 
            if (model != null)
            {
                int corporateid = Helpers.GetSysAdminCorporateID();
                int facilityid = Helpers.GetDefaultFacilityId();
                model.CorporateId = corporateid;
                model.FacilityId = facilityid;

                using (var bal = new DashboardParametersBal())
                {
                    if (model.ParameterId > 0)
                    {
                        model.ModifiedBy = userId;
                        model.ModifiedDate = currentDate;
                    }
                    else
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }

                    // Call the AddDashboardParameters Method to Add / Update current DashboardParameters
                    list = bal.SaveDashboardParameters(model);
                }
            }

            // Pass the ActionResult with List of DashboardParametersViewModel object to Partial View DashboardParametersList
            return this.PartialView(PartialViews.DashboardParametersList, list);
        }

        /// <summary>
        /// The sort dashboard parameters.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult SortDashboardParameters()
        {
            int corporateid = Helpers.GetSysAdminCorporateID();
            int facilityid = Helpers.GetDefaultFacilityId();
            using (var bal = new DashboardParametersBal())
            {
                List<DashboardParametersCustomModel> list = bal.GetDashboardParametersList(corporateid, facilityid);
                return this.PartialView(PartialViews.DashboardParametersList, list);
            }
        }

        #endregion
    }
}