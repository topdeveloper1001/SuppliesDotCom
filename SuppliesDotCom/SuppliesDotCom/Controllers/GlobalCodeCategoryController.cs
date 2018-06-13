using System.Collections.Generic;
using System.Web.Mvc;
using SuppliesDotCom.Models;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using SuppliesDotCom.Common;

namespace SuppliesDotCom.Controllers
{
    public class GlobalCodeCategoryController : BaseController
    {
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            // var globalCodeCommunicator = new GlobalCodeCommunicator();
            var objGlobalCodeCategoryBal = new GlobalCodeCategoryBal();
            var globalCodeCategories = objGlobalCodeCategoryBal.GetGlobalCodeCategoriesWithFacilityName();
            List<Facility> facilities;
            using (var facilityBal = new FacilityBal())
            {
                var cId = Helpers.GetDefaultCorporateId();
                facilities = facilityBal.GetFacilities(cId);
            }
            var gModel = new GlobalCodeCategoryView
            {
                GlobalCodeCategoryList = globalCodeCategories,
                FacilityList = facilities,
                SelectedGlobalCodeCategoryOptions = new List<GlobalCodeCategory>(),
                FacilityNumber = "0",
                SelectedSourceGlobalCodeCategoryOptions = new List<GlobalCodeCategory>()
            };
            return View(gModel);
        }

        /// <summary>
        /// Add / Edit the Current Global Code Category into the database
        /// </summary>
        /// <param name="list">The list.</param>
        /// <returns>
        /// ID of newly added / updated GlobalCodeCategory
        /// </returns>
        public ActionResult SaveCategory(List<GlobalCodeCategory> list)
        {
            if (list != null)
            {
                using (var gccBal = new GlobalCodeCategoryBal())
                {
                    foreach (var item in list)
                    {
                        item.FacilityNumber = item.FacilityNumber;
                        var newId = gccBal.AddUpdateGlobalCodeCategory(item);
                        return Json(newId);
                    }
                }
            }
            return Json(null);
        }

        /// <summary>
        /// Gets the global code categories.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetGlobalCodeCategories()
        {
            var gccBal = new GlobalCodeCategoryBal();
            var globalCodeCategories = gccBal.GetGlobalCodeCategories();
            return Json(globalCodeCategories);
        }

        /// <summary>
        /// Gets the global code categories by null facility.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetGlobalCodeCategoriesByNullFacility()
        {
            var gccBal = new GlobalCodeCategoryBal();
            var globalCodeCategories = gccBal.GetGlobalCodeCategoriesByNullFacility();
            return Json(globalCodeCategories);
        }

        /// <summary>
        /// Gets the facility global code categories.
        /// </summary>
        /// <param name="FacilityNumber">The facility number.</param>
        /// <returns></returns>
        public ActionResult GetFacilityGlobalCodeCategories(string FacilityNumber)
        {
            var gccBal = new GlobalCodeCategoryBal();
            var globalCodeCategories = gccBal.GetFacilityGlobalCodeCategories(FacilityNumber);
            return Json(globalCodeCategories);
        }

        
        #region Lab Test Order Set
        /// <summary>
        /// Labs the test order set view.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public ActionResult LabTestOrderSetView(string categoryValue)
        {
            if (!string.IsNullOrEmpty(categoryValue))
            {
                var bal = new GlobalCodeCategoryBal();
                var list = bal.GetListByCategoryValue(categoryValue);
                //var view = new LabTestOrderSetView
                //{
                //    //CurrentGlobalCodeCategory = new GlobalCodeCategory { IsActive = true, IsDeleted = false },
                //    //GCCategoryList = list,
                //    //CategoryValue = categoryValue,
                //    //CurrentLabOrderCode = new GlobalCodeModel { IsActive = true, IsDeleted = false },
                //    //LabOrderCodesList = new List<GlobalCodeModel>()
                //    CurrentGlobalCodeCategory = new GlobalCodeModel { IsActive = true, IsDeleted = false },
                //    GCCategoryList = new List<GlobalCodeModel>(),
                //    CategoryValue = categoryValue,

                //};
                return View("LabTestOrderSetView");
            }

            return RedirectToAction("PatientSearch", "PatientSearch");
        }

        /// <summary>
        /// Gets the global code categories.
        /// </summary>
        /// <returns></returns>
        public JsonResult GetRecordById(int id)
        {
            using (var bal = new GlobalCodeCategoryBal())
            {
                var current = bal.GetCurrentCategoryById(id);
                var jsonResult = new
                {
                    current.GlobalCodeCategoryID,
                    current.GlobalCodeCategoryName,
                    current.GlobalCodeCategoryValue,
                    current.ExternalValue1
                };
                return Json(jsonResult);
            }
        }

        public JsonResult CheckDuplicateRecord(GlobalCodeCategory model)
        {
            using (var bal = new GlobalCodeCategoryBal())
            {
                var isExists = bal.CheckDuplicateCode(model);
                return Json(isExists);
            }
        }

        /// <summary>
        /// Add / Edit the Current Global Code Category into the database
        /// </summary>
        /// <param name="model"></param>
        /// <returns>
        /// ID of newly added / updated GlobalCodeCategory
        /// </returns>
        public ActionResult SaveRecord(GlobalCodeCategory model)
        {
            using (var gccBal = new GlobalCodeCategoryBal())
            {
                var userId = Helpers.GetLoggedInUserId();
                var currentDateTime = Helpers.GetInvariantCultureDateTime();

                if (model.GlobalCodeCategoryID > 0)
                {
                    model.CreatedBy = userId;
                    model.CreatedDate = currentDateTime;
                    model.ModifiedBy = userId;
                    model.ModifiedDate = currentDateTime;
                }
                else
                {
                    model.CreatedBy = userId;
                    model.CreatedDate = currentDateTime;
                }
                gccBal.AddUpdateGlobalCodeCategory(model);
                var list = gccBal.GetListByCategoryValue(model.ExternalValue1);
                return PartialView(PartialViews.LabTestOrderSetList, list);
            }
        }

        /// <summary>
        /// Add / Edit the Current Global Code Category into the database
        /// </summary>
        /// <param name="gccId"></param>
        /// <returns>
        /// ID of newly added / updated GlobalCodeCategory
        /// </returns>
        public ActionResult DeleteRecord(int gccId)
        {
            using (var gccBal = new GlobalCodeCategoryBal())
            {
                var userId = Helpers.GetLoggedInUserId();
                var currentDateTime = Helpers.GetInvariantCultureDateTime();
                var model = gccBal.GetCurrentCategoryById(gccId);
                if (model.GlobalCodeCategoryID > 0)
                {
                    model.DeletedBy = userId;
                    model.DeletedDate = currentDateTime;
                    model.IsDeleted = true;
                    gccBal.AddUpdateGlobalCodeCategory(model);
                }

                var list = gccBal.GetListByCategoryValue(model.ExternalValue1);
                return PartialView(PartialViews.LabTestOrderSetList, list);
            }
        }

        /// <summary>
        /// Add / Edit the Current Lab Order Set into the database
        /// </summary>
        /// <param name="gccModel"></param>
        /// <param name="gcList"></param>
        /// <returns>
        /// ID of newly added / updated GlobalCodeCategory
        /// </returns>
        public ActionResult SaveLabOrderSet(GlobalCodeCategory gccModel, List<GlobalCodes> gcList)
        {
            using (var gccBal = new GlobalCodeCategoryBal())
            {
                var userId = Helpers.GetLoggedInUserId();
                var currentDateTime = Helpers.GetInvariantCultureDateTime();

                if (gccModel.GlobalCodeCategoryID > 0)
                {
                    gccModel.CreatedBy = userId;
                    gccModel.CreatedDate = currentDateTime;
                    gccModel.ModifiedBy = userId;
                    gccModel.ModifiedDate = currentDateTime;
                }
                else
                {
                    gccModel.CreatedBy = userId;
                    gccModel.CreatedDate = currentDateTime;
                }
                gccBal.AddUpdateGlobalCodeCategory(gccModel);
                var list = gccBal.GetListByCategoryValue(gccModel.ExternalValue1);
                return PartialView(PartialViews.LabTestOrderSetList, list);
            }
        }
        #endregion
        
    }
}
