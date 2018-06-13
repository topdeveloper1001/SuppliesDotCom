using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Controllers
{
    public class BillingSystemParametersController : BaseController
    {
        /// <summary>
        /// Get the details of the SuppliesDotComParameters View in the Model SuppliesDotComParameters such as SuppliesDotComParametersList, list of countries etc.
        /// </summary>
        /// <returns>returns the actionresult in the form of current object of the Model SuppliesDotComParameters to be passed to View SuppliesDotComParameters</returns>
        public ActionResult Index()
        {
            //Intialize the View Model i.e. SuppliesDotComParametersView which is binded to Main View Index.cshtml under SuppliesDotComParameters
            var viewModel = new BillingSystemParametersView
            {
                //SuppliesDotComParametersList = list,
                CurrentBillingSystemParameters =
                    new BillingSystemParameters
                    {
                        IsActive = true,
                        CorporateId = Helpers.GetSysAdminCorporateID(),
                        Id = 0
                    }
            };

            //Pass the View Model in ActionResult to View SuppliesDotComParameters
            return View(viewModel);
        }

        /// <summary>
        /// Add New or Update the SuppliesDotComParameters based on if we pass the SuppliesDotComParameters ID in the SuppliesDotComParametersViewModel object.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>returns the newly added or updated ID of SuppliesDotComParameters row</returns>
        public JsonResult SaveSuppliesDotComParameters(BillingSystemParameters model)
        {
            var id = -1;
            //Initialize the newId variable 
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();

            //Check if Model is not null
            if (model != null)
            {
                using (var bal = new SuppliesDotComParametersBal())
                {
                    ///*
                    // * in case table number of logged-in user's Facility and Corporate is updated, it updates the same in the session. 
                    // */
                    //if (model.FacilityNumber.Trim().Equals(Helpers.GetDefaultFacilityNumber()) && model.CorporateId == Helpers.GetSysAdminCorporateID())
                    //{
                    //    var objSession = Session[SessionNames.SessionClass.ToString()] as SessionClass;
                    //    if (objSession != null)
                    //        objSession.TableNumber = !string.IsNullOrEmpty(model.TableNumber)
                    //            ? model.TableNumber
                    //            : "1001";
                    //}

                    if (model.Id > 0)
                    {
                        model.ModifiedBy = userId;
                        model.ModifiedDate = currentDate;
                    }
                    else
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                        //model.CorporateId = model.CorporateId;
                        model.IsActive = true;
                    }

                    //Call the AddSuppliesDotComParameters Method to Add / Update current SuppliesDotComParameters
                    id = bal.SaveSuppliesDotComParameters(model);
                }
            }
            return Json(id);
        }

        /// <summary>
        /// Get the details of the current SuppliesDotComParameters in the view model by ID 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSuppliesDotComParametersDetails(string facilityNumber, int corporateId)
        {
            using (var bal = new SuppliesDotComParametersBal())
            {
                //Call the AddSuppliesDotComParameters Method to Add / Update current SuppliesDotComParameters
                var data = bal.GetDetailsByCorporateAndFacility(corporateId, facilityNumber);

                var jsonResult = new
                {
                    data.Id,
                    EffectiveDate = data.EffectiveDate.GetShortDateString1(),
                    EndDate = data.EndDate.GetShortDateString1(),
                    OupatientCloseBillsTime = data.OupatientCloseBillsTime.GetTimeStringFromDateTime(),
                    data.FacilityNumber,
                    data.BillHoldDays,
                    data.ARGLacct,
                    data.MgdCareGLacct,
                    data.BadDebtGLacct,
                    data.SmallBalanceGLacct,
                    data.SmallBalanceAmount,
                    data.SmallBalanceWriteoffDays,
                    data.ERCloseBillsHours,
                    data.IsActive,
                    data.ExternalValue1,
                    data.ExternalValue2,
                    data.ExternalValue3,
                    data.ExternalValue4,
                    data.CorporateId,
                    data.CPTTableNumber,
                    data.ServiceCodeTableNumber,
                    data.DrugTableNumber,
                    data.DRGTableNumber,
                    data.DiagnosisTableNumber,
                    data.HCPCSTableNumber,
                    data.BillEditRuleTableNumber,
                    data.DefaultCountry
                };

                //Pass the ActionResult with the current SuppliesDotComParametersViewModel object as model to PartialView SuppliesDotComParametersAddEdit
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
