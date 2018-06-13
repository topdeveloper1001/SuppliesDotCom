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
    public class DashboardTransactionCounterController : BaseController
    {
        const string cacheKey = "GetCounterData";


        /// <summary>
        /// Dashboards the transaction counter main.
        /// </summary>
        /// <returns></returns>
        public ActionResult DashboardTransactionCounterMain()
        {
            //Initialize the DashboardTransactionCounter BAL object
            var dashboardTransactionCounterBal = new DashboardTransactionCounterBal();
            var corporateid = Helpers.GetSysAdminCorporateID();
            var facilityid = Helpers.GetDefaultFacilityId();
            var currentDateTime = Helpers.GetInvariantCultureDateTime(facilityid);
            //Get the Entity list
            var dashboardTransactionCounterList = dashboardTransactionCounterBal.GetDashboardTrancationData(corporateid, facilityid);
            var result = HttpRuntime.Cache[cacheKey] as List<DashboardTransactionCounterCustomModel>;
            if (result == null)
            {
                result = dashboardTransactionCounterList;
                HttpRuntime.Cache.Insert(cacheKey, result,
                               null, currentDateTime.AddHours(1), TimeSpan.Zero);
            }

            
            //Intialize the View Model i.e. DashboardTransactionCounterView which is binded to Main View Index.cshtml under DashboardTransactionCounter
            var dashboardTransactionCounterView = new DashboardTransactionCounterView
            {
               DashboardTransactionCounterList = dashboardTransactionCounterList,
               CurrentDashboardTransactionCounter = new Model.DashboardTransactionCounter()
            };

            //Pass the View Model in ActionResult to View DashboardTransactionCounter
            return View(dashboardTransactionCounterView);
        }


        /// <summary>
        /// Binds the dashboard transaction counter list.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult BindDashboardTransactionCounterList()
        {
           
            //Initialize the DashboardTransactionCounter BAL object
            using (var dashboardTransactionCounterBal = new DashboardTransactionCounterBal())
            {
                var corporateid = Helpers.GetSysAdminCorporateID();
                var facilityid = Helpers.GetDefaultFacilityId();
                //Get the Entity list
                var dashboardTransactionCounterList = dashboardTransactionCounterBal.GetDashboardTrancationData(corporateid, facilityid);

                var result = HttpRuntime.Cache[cacheKey] as List<DashboardTransactionCounterCustomModel>;
                result = dashboardTransactionCounterList;
                var currentDateTime = Helpers.GetInvariantCultureDateTime(facilityid);

                HttpRuntime.Cache.Insert(cacheKey, result,
                               null, currentDateTime.AddHours(1), TimeSpan.Zero);
                //Pass the ActionResult with List of DashboardTransactionCounterViewModel object to Partial View DashboardTransactionCounterList
                return PartialView(PartialViews.DashboardTransactionCounterList, dashboardTransactionCounterList);
            }
        }


        /// <summary>
        /// Saves the dashboard transaction counter.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public ActionResult SaveDashboardTransactionCounter(DashboardTransactionCounter model)
        {
            //Initialize the newId variable 
            var newId = -1;
            var userId = Helpers.GetLoggedInUserId();
            var corporateid = Helpers.GetSysAdminCorporateID();
            var facilityid = Helpers.GetDefaultFacilityId();
            var currentDatetime = Helpers.GetInvariantCultureDateTime();
            //Check if Model is not null 
            if (model != null)
            {
                using (var bal = new DashboardTransactionCounterBal())
                {
                    if (model.CounterId > 0)
                    {
                        model.ModifiedBy = userId;
                        model.ModifiedDate = currentDatetime;
                    }
                    else
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDatetime;
                    }
                    model.CorporateId = corporateid;
                    model.FacilityId = facilityid;
                    //Call the AddDashboardTransactionCounter Method to Add / Update current DashboardTransactionCounter
                    newId = bal.SaveDashboardTransactionCounter(model);
                }
            }
            return Json(newId);
        }

        /// <summary>
        /// Get the details of the current DashboardTransactionCounter in the view model by ID
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult GetDashboardTransactionCounter(int id)
        {
            using (var bal = new DashboardTransactionCounterBal())
            {
                //Call the AddDashboardTransactionCounter Method to Add / Update current DashboardTransactionCounter
                var currentDashboardTransactionCounter = bal.GetDashboardTransactionCounterById(id);

                //Pass the ActionResult with the current DashboardTransactionCounterViewModel object as model to PartialView DashboardTransactionCounterAddEdit
                return PartialView(PartialViews.DashboardTransactionCounterAddEdit, currentDashboardTransactionCounter);
            }
        }

        /// <summary>
        /// Delete the current DashboardTransactionCounter based on the DashboardTransactionCounter ID passed in the DashboardTransactionCounterModel
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteDashboardTransactionCounter(int id)
        {
            using (var bal = new DashboardTransactionCounterBal())
            {
                //Get DashboardTransactionCounter model object by current DashboardTransactionCounter ID
                var currentDashboardTransactionCounter = bal.GetDashboardTransactionCounterById(id);
                var result = bal.DeleteDashboardTransactionCounter(currentDashboardTransactionCounter);
                var currentDateTime = Helpers.GetInvariantCultureDateTime();
                HttpRuntime.Cache.Insert(cacheKey, result,
                               null, currentDateTime.AddHours(1), TimeSpan.Zero);
                //return deleted ID of current DashboardTransactionCounter as Json Result to the Ajax Call.
                return Json(result);
                //Check If DashboardTransactionCounter model is not null
            }
            //Return the Json result as Action Result back JSON Call Success
        }

        /// <summary>
        /// Reset the DashboardTransactionCounter View Model and pass it to DashboardTransactionCounterAddEdit Partial View.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetDashboardTransactionCounterForm()
        {
            //Intialize the new object of DashboardTransactionCounter ViewModel
            var dashboardTransactionCounterViewModel = new Model.DashboardTransactionCounter();

            //Pass the View Model as DashboardTransactionCounterViewModel to PartialView DashboardTransactionCounterAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.DashboardTransactionCounterAddEdit, dashboardTransactionCounterViewModel);
        }


        public ActionResult SortDashboardTrasData()
        {
            var result = HttpRuntime.Cache[cacheKey] as List<DashboardTransactionCounterCustomModel>;
            return PartialView(PartialViews.DashboardTransactionCounterList, result);
        }


        public ActionResult BindDashboardData(int id)
        {
            using (var bal=new DashboardTransactionCounterBal())
            {
                var current = bal.GetDashboardTransactionCounterById(id);
                var jsonData = new
                {
                    ActivityDay  = current.ActivityDay.GetShortDateString3(),
                    current.ActivityTotal,
                    current.CounterId,
                    current.DepartmentNumber,
                    current.StatisticDescription,
                    current.IsActive
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
