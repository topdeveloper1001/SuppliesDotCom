using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SuppliesDotCom.Controllers
{
    public class SetupController : Controller
    {
        // GET: Setup
        public ActionResult Index()
        {
            return View();
        }

        #region Generic View
        public ActionResult View(string cv, int? txt)
        {
            var maxValue = 250;
            if (cv == "0101")
                maxValue = 5;

            if (!string.IsNullOrEmpty(cv))
            {
                using (var bal = new GlobalCodeBal())
                {
                    var list = bal.GetGlobalCodesByCategory(cv, Helpers.GetSysAdminCorporateID(),
                        Helpers.GetDefaultFacilityId(), Helpers.GetLoggedInUserId(), 0, out long mxGlobalCodeValue, true, isFacilityPassed: true);
                    var categoryName = list.Any() ?
                                    list[0].GlobalCodeCustomValue :
                                    bal.GetGlobalCategoryNameById(cv);

                    //mxGlobalCodeValue = Convert.ToInt32(bal.GetMaxGlobalCodeValueByCategory(categoryValue) + 1);
                    var globalCodeView = new GlobalCodeView
                    {
                        CurrentGlobalCode =
                            new GlobalCodes
                            {
                                IsActive = true,
                                IsDeleted = false,
                                GlobalCodeValue = Convert.ToString(mxGlobalCodeValue),
                                GlobalCodeCategoryValue = cv,
                                ExternalValue6 = Convert.ToInt32(txt) > 0 ? "1" : string.Empty,
                                ExternalValue5 = categoryName,
                                ExternalValue1 = Convert.ToString(maxValue)
                            },
                        GlobalCategoryName = categoryName,
                        CodesList = list
                    };

                    //Pass the View Model in ActionResult to View Facility
                    return View("GenericView", globalCodeView);
                }
            }

            //Pass the View Model in ActionResult to View Facility
            return View("Index");
        }

        [HttpPost]
        public ActionResult AddUpdateRecord(GlobalCodes model)
        {
            var userId = Helpers.GetLoggedInUserId();
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            model.FacilityNumber = Convert.ToString(Helpers.GetDefaultFacilityId());

            if (model.GlobalCodeID > 0)
            {
                model.ModifiedBy = userId;
                model.ModifiedDate = currentDateTime;
            }
            else
            {
                model.CreatedBy = userId;
                model.CreatedDate = currentDateTime;
            }

            var cName = string.Empty;
            var list = new List<GlobalCodeCustomModel>();

            using (var bal = new GlobalCodeBal())
            {
                //Save 
                bal.AddUpdateGlobalCodes(model);

                //Get List
                list = bal.GetGlobalCodesByCategory(model.GlobalCodeCategoryValue, Helpers.GetSysAdminCorporateID(),
                    Helpers.GetDefaultFacilityId(), userId, 0, out long mxGlobalCodeValue, true, isFacilityPassed: true);

                //Get Category Name
                cName = list.Any() ? list[0].GlobalCodeCustomValue : bal.GetGlobalCategoryNameById(model.GlobalCodeCategoryValue);
            }

            //Initialize the View Model to return to the view.
            var globalCodeView = new GlobalCodeView
            {
                GlobalCategoryName = cName,
                CodesList = list,
            };

            return PartialView(PartialViews.GenericListView, globalCodeView);
        }

        public ActionResult DeleteRecord(int globalCodeId, string category)
        {
            using (var bal = new GlobalCodeBal())
            {

                bal.DeleteGlobalCodeById(globalCodeId, category);
                var list = bal.GetGlobalCodesByCategory(category, Helpers.GetSysAdminCorporateID(),
                    Helpers.GetDefaultFacilityId(), Helpers.GetLoggedInUserId(), 0, out long mxGlobalCodeValue, true, isFacilityPassed: true);

                var categoryName = list.Any() ? list[0].GlobalCodeCustomValue : bal.GetGlobalCategoryNameById(category);

                var globalCodeView = new GlobalCodeView
                {
                    GlobalCategoryName = categoryName,
                    CodesList = list,
                };
                return PartialView(PartialViews.GenericListView, globalCodeView);
            }
        }

        public ActionResult SetMaxGlobalCodeValue(string category)
        {
            using (var bal = new GlobalCodeBal())
            {
                var maxValue = bal.GetMaxGlobalCodeValueByCategory(category);
                return Json(maxValue + 1);
            }
        }

        public ActionResult ShowDeletedRecords(string category, bool showDeleted)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetGlobalCodesByCategory(category, Helpers.GetSysAdminCorporateID(),
                    Helpers.GetDefaultFacilityId(), Helpers.GetLoggedInUserId(), 0, out long mxGlobalCodeValue, showDeleted, isFacilityPassed: true);
                return PartialView(PartialViews.GenericListView, list);
            }
        }

        public JsonResult SearchGlobalCodeCategories(string typeId, string text)
        {
            if (!string.IsNullOrEmpty(text))
            {
                text = text.ToLower().Trim();
                List<GlobalCodeCategory> list;
                using (var bal = new GlobalCodeCategoryBal())
                    list = bal.GetSearchedCategories(text, typeId);

                if (list.Count > 0)
                {
                    var filteredList = list.Select(item => new
                    {
                        CodeValue = item.GlobalCodeCategoryValue,
                        Name = string.Format("{0} - {1}", item.GlobalCodeCategoryValue, item.GlobalCodeCategoryName),
                    }).ToList();
                    return Json(filteredList, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new List<GlobalCodeCategory>(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetRecordsByCategoryValue(string categoryValue)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetGCodesListByCategoryValue(categoryValue);
                return PartialView(PartialViews.LabTestCodesListView, list);
            }
        }

        public ActionResult ShowInActiveRecords(string category, bool inActiveStatus)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetGlobalCodesByCategory(category, Helpers.GetSysAdminCorporateID(),
                    Helpers.GetDefaultFacilityId(), Helpers.GetLoggedInUserId(), 0, out long mxGlobalCodeValue, !inActiveStatus, isFacilityPassed: true);

                var categoryName = bal.GetGlobalCategoryNameById(category);
                var globalCodeView = new GlobalCodeView
                {
                    GlobalCategoryName = categoryName,
                    CodesList = list,
                };
                return PartialView(PartialViews.GenericListView, globalCodeView);
            }
        }

        public ActionResult GetGenericTypeData(string category)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetGlobalCodesByCategory(category, Helpers.GetSysAdminCorporateID(),
                    Helpers.GetDefaultFacilityId(), Helpers.GetLoggedInUserId(), 0, out long mxGlobalCodeValue, true, isFacilityPassed: true);

                var categoryName = list.Any() ? list[0].GlobalCodeCustomValue : bal.GetGlobalCategoryNameById(category);

                var globalCodeView = new GlobalCodeView
                {
                    GlobalCategoryName = categoryName,
                    CodesList = list,
                };
                return PartialView(PartialViews.GenericListView, globalCodeView);
            }
        }

        #endregion
    }
}