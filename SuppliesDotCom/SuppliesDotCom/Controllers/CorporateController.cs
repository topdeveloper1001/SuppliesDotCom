using System.Collections.Generic;
using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using Hangfire;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Controllers
{
    public class CorporateController : BaseController
    {
        /// <summary>
        /// Get the details of the Corporate View in the Model Corporate such as CorporateList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model Corporate to be passed to View Corporate
        /// </returns>
        [CheckRolesAuthorize("1")]
        public ActionResult Index()
        {
            //Initialize the Corporate BAL object
            var corporateBal = new CorporateBal();

            //Get the Entity list
            var corporatId = Helpers.GetDefaultCorporateId();
            var corporateList = corporateBal.GetCorporate(corporatId);
            //var corporateList = corporateBal.GetCorporate(corporatId);

            //Intialize the View Model i.e. CorporateView which is binded to Main View Index.cshtml under Corporate
            var corporateView = new CorporateView
            {
                CorporateList = corporateList,
                CurrentCorporate = new Model.Corporate()
            };

            //Pass the View Model in ActionResult to View Corporate
            return View(corporateView);
        }

        /// <summary>
        /// Bind all the Corporate list
        /// </summary>
        /// <returns>
        /// action result with the partial view containing the Corporate list object
        /// </returns>
        public ActionResult BindCorporateList()
        {
            //Initialize the Corporate BAL object
            using (var corporateBal = new CorporateBal())
            {
                //Get the corporate list
                var corporatId = Helpers.GetDefaultCorporateId();
                var corporateList = corporateBal.GetCorporate(corporatId);

                //Pass the ActionResult with List of CorporateViewModel object to Partial View CorporateList
                return PartialView(PartialViews.CorporateList, corporateList);
            }
        }

        public ActionResult GetCorporates()
        {
            //Initialize the Corporate BAL object
            using (var corporateBal = new CorporateBal())
            {
                //Get the corporate list
                var corporatId = Helpers.GetDefaultCorporateId();
                var corporateList = corporateBal.GetCorporate(corporatId);

                //Pass the ActionResult with List of CorporateViewModel object to Partial View CorporateList
                return Json(new {
                    iTotalRecords = corporateList.Count,
                    iTotalDisplayRecords = corporateList.Count,
                    aaData = corporateList }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Add New or Update the Corporate based on if we pass the Corporate ID in the CorporateViewModel object.
        /// </summary>
        /// <param name="corporateModel">pass the details of Corporate in the view model</param>
        /// <returns>
        /// returns the newly added or updated ID of Corporate row
        /// </returns>
        public ActionResult SaveCorporate(Corporate corporateModel)
        {
            //Initialize the newId variable 
            var newId = -1;
            var isNew = corporateModel.CorporateID == 0;
            //Check if CorporateViewModel 
            if (corporateModel != null)
            {
                using (var corporateBal = new CorporateBal())
                {
                    var isExist = corporateBal.CheckDuplicateCorporateNumber(corporateModel.CorporateNumber,
                        corporateModel.CorporateID);
                    if (isExist)
                        return Json("1");

                    if (corporateModel.CorporateID > 0)
                    {
                        corporateModel.ModifiedBy = Helpers.GetLoggedInUserId();
                        corporateModel.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                    }
                    else
                    {
                        corporateModel.CreatedBy = Helpers.GetLoggedInUserId();
                        corporateModel.CreatedDate = Helpers.GetInvariantCultureDateTime();
                    }
                    //Call the AddCorporate Method to Add / Update current Corporate
                    newId = corporateBal.AddUptdateCorporate(corporateModel);

                    if (isNew && newId > 0)
                        BackgroundJob.Enqueue(() => CreateDefaultCorporateItems(corporateModel.CorporateID, corporateModel.CorporateName));
                }
            }
            return Json(newId);
        }

        /// <summary>
        /// Get the details of the current Corporate in the view model by ID
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <returns></returns>
        public ActionResult GetCorporate(string Id)
        {
            using (var bal = new CorporateBal())
            {
                //Call the AddCorporate Method to Add / Update current Corporate
                var model = bal.GetCorporateById(Convert.ToInt32(Id));

                //var jsonResult = new
                //{
                //    model.CorporateID,
                //    model.CorporateMainPhone,
                //    model.CorporateName,
                //    model.CorporateNumber,
                //    model.CorporatePOBox,
                //    model.CorporateFax,
                //    model.CorporateSecondPhone,
                //};

                //Pass the ActionResult with the current CorporateViewModel object as model to PartialView CorporateAddEdit
                return PartialView(PartialViews.CorporateAddEdit, model);

                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetCorporateById(string Id)
        {
            using (var corporateBal = new CorporateBal())
            {
                //Call the AddCorporate Method to Add / Update current Corporate
                var currentCorporate = corporateBal.GetCorporateById(Convert.ToInt32(Id));
                return Json(currentCorporate);
            }
        }
        public bool CheckDefaultTableNumber(string defaultTableNumber, string corporateId)
        {
            var corporateBal = new CorporateBal();
            return corporateBal.CheckDefaultTableNumber(defaultTableNumber, Convert.ToInt32(corporateId));
        }


        /// <summary>
        /// Delete the current Corporate based on the Corporate ID passed in the CorporateModel
        /// </summary>
        /// <param name="corporateModel">The corporate model.</param>
        /// <returns></returns>
        public ActionResult DeleteCorporate(Model.Corporate corporateModel)
        {
            using (var corporateBal = new CorporateBal())
            {
                //Get Corporate model object by current Corporate ID
                var currentCorporate = corporateBal.GetCorporateById(Convert.ToInt32(corporateModel.CorporateID));

                //Check If Corporate model is not null
                if (currentCorporate != null)
                {
                    currentCorporate.IsDeleted = true;
                    currentCorporate.DeletedBy = Helpers.GetLoggedInUserId();
                    currentCorporate.DeletedDate = Helpers.GetInvariantCultureDateTime();

                    //Update Operation of current Corporate
                    var result = corporateBal.AddUptdateCorporate(currentCorporate);

                    //return deleted ID of current Corporate as Json Result to the Ajax Call.
                    return Json(result);
                }
            }
            using (var corporateBal = new CorporateBal())
            {
                var value = corporateBal.DeleteCorporateData(Convert.ToString(corporateModel.CorporateID));
                return Json(value);
            }

            //Return the Json result as Action Result back JSON Call Success
        }
        /// <summary>
        /// Deletes the corporate data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public JsonResult DeleteCorporateData(int corporateId)
        {
            if (Helpers.DefaultC != corporateId)
            {
                using (var corporateBal = new CorporateBal())
                {
                    var value = corporateBal.DeleteCorporateData(Convert.ToString(corporateId));
                    return Json(value ? "1" : "0", JsonRequestBehavior.AllowGet);
                }
            }
            return Json("-2", JsonRequestBehavior.AllowGet);

            //Return the Json result as Action Result back JSON Call Success
        }

        /// <summary>
        /// Reset the Corporate View Model and pass it to CorporateAddEdit Partial View.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetCorporateForm()
        {
            //Intialize the new object of Corporate ViewModel
            var corporateViewModel = new Model.Corporate();

            //Pass the View Model as CorporateViewModel to PartialView CorporateAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.CorporateAddEdit, corporateViewModel);
        }

        //function to check if Corporate Exist assigned with role
        /// <summary>
        /// Checks the corporate exist.
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <returns></returns>
        public ActionResult CheckCorporateExist(int Id)
        {
            using (var facilityRoleBal = new FacilityRoleBal())
            {
                var result = facilityRoleBal.CheckCorporateExist(Id);
                return Json(result);
            }

        }
        /// <summary>
        /// Method is used to check whethere user exists for passing corporate or not
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult CheckUserExistForCorporate(int id)
        {
            using (var userBal = new UsersBal())
            {
                var result = userBal.CheckUserExistForCorporate(id);
                return Json(result);
            }
        }
        // Function to chek duplicate Corporate on the basis of username or Email
        /// <summary>
        /// Checks the duplicate corporate.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public bool CheckDuplicateCorporate(string name, int id)
        {
            using (var corporateBal = new CorporateBal())
            {
                return corporateBal.CheckDuplicateCorporate(name, id);
            }
        }

        public static void CreateDefaultCorporateItems(int cId, string cName)
        {
            using (var bal = new CorporateBal())
            {
                bal.CreateDefaultCorporateItem(cId, cName);
            }
        }

        public JsonResult BindAllCorporateDataOnLoad(string typeId)
        {
            var tlist = new List<BillingCodeTableSet>();
            var plist = new List<CountryCustomModel>();
            using (var bal = new CountryBal())
            {
                tlist = bal.GetTableNumbersList(typeId);
                plist = bal.GetCountryWithCode();
            }

            var jsonData = new
            {
                tlist,
                plist
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }
    }
}
