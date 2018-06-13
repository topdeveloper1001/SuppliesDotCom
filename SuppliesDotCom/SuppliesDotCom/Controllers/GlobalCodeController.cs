using System.Collections.Generic;
using System.Data;
using SuppliesDotCom.Models;
using System.Web.Mvc;
using SuppliesDotCom.Common;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using System;
using SuppliesDotCom.Model.CustomModel;
using System.Linq;
using SuppliesDotCom.Common.Common;
using Microsoft.Ajax.Utilities;

namespace SuppliesDotCom.Controllers
{
    public class GlobalCodeController : BaseController
    {
        #region Global Code
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns></returns>
        [CheckRolesAuthorize("1")]
        public ActionResult Index()
        {
            //Initialize the GlobalCode Bal
            //var globalCodeBal = new GlobalCodeBal();
            //var globalCodeCategoryBal = new GlobalCodeCategoryBal();
            //var facilityBal = new FacilityBal();

            //Get the Global Code list
            //var globalCodeList = globalCodeBal.GetAllGlobalCodes();

            //List<GlobalCodeListView> gCodesCategory = new List<GlobalCodeListView>();
            //gCodesCategory = (from y in globalCodeList
            //                  select new GlobalCodeListView
            //                  {
            //                      GlobalCodeID = y.GlobalCodeID,
            //                      FacilityNumber = y.FacilityNumber,
            //                      GlobalCodeCategoryName = GetGlobalCodeCategoryNameByID(y.GlobalCodeCategoryValue),
            //                      GlobalCodeValue = y.GlobalCodeValue,
            //                      GlobalCodeName = y.GlobalCodeName,
            //                      Description = y.Description

            //                  }).ToList();

            //var globalCodeCategoryList = globalCodeCategoryBal.GetGlobalCodeCategories();

            //var cId = Helpers.GetDefaultCorporateId();
            var globalCodeView = new GlobalCodeView
            {
                CurrentGlobalCode = new GlobalCodes { IsActive = true, IsDeleted = false },
                CodesList = new List<GlobalCodeCustomModel>(),
                //GlobalCodeCategoryList = globalCodeCategoryList,
                //LstFacility = facilityBal.GetFacilities(cId)
            };

            //Pass the View Model in ActionResult to View Facility
            return View(globalCodeView);
        }

        /// <summary>
        /// Gets the globa code by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult GetGlobaCodeById(int id)
        {
            using (var bal = new GlobalCodeBal())
            {
                var result = bal.GetGlobalCodeCustomById(id);
                var jsonResult = new
                {
                    Id = result.GlobalCodes.GlobalCodeID,
                    Name = result.GlobalCodes.GlobalCodeName,
                    Value = result.GlobalCodes.GlobalCodeValue,
                    Category = result.GlobalCodes.GlobalCodeCategoryValue,
                    result.GlobalCodes.Description,
                    result.GlobalCodes.IsActive,
                    result.GlobalCodes.SortOrder,
                    result.GlobalCodes.ExternalValue1,
                    result.GlobalCodes.ExternalValue2,
                    result.GlobalCodes.ExternalValue3,
                    result.GlobalCodes.ExternalValue4,
                    result.GlobalCodes.ExternalValue5,
                    result.GlobalCodes.ExternalValue6,
                    CategoryName = result.GlobalCodeCustomValue
                };
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Binds the global code categories.
        /// </summary>
        /// <returns></returns>
        public ActionResult BindGlobalCodeCategories()
        {
            var list = new List<DropdownListData>();
            using (var bal = new GlobalCodeCategoryBal())
            {
                var result = bal.GetGlobalCodeCategories();
                if (result.Count > 0)
                {
                    list.AddRange(result.Select(item => new DropdownListData
                    {
                        Text = item.GlobalCodeCategoryName,
                        Value = item.GlobalCodeCategoryValue,
                        ExternalValue1 = Convert.ToString(item.GlobalCodeCategoryID)
                    }));
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Gets the maximum sort order and global code value by category value.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public ActionResult GetMaxSortOrderAndGlobalCodeValueByCategoryValue(string categoryValue)
        {
            using (var bal = new GlobalCodeBal())
            {
                var gcc = bal.GetMaxGlobalCodeByCategoryValue(categoryValue);

                var sortordercount = 0;
                if (gcc != null)
                    sortordercount = Convert.ToInt32(gcc.SortOrder);

                var jsonResult = new { sortOrder = sortordercount + 1, maxCodeValue = sortordercount };
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Binds the global codes list.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public ActionResult BindGlobalCodesList(string categoryValue)
        {
            var list = GlobalCodesList(categoryValue);
            return PartialView(PartialViews.GlobalCodesList, list);
        }

        /// <summary>
        /// Globals the codes list.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        private List<GlobalCodeCustomModel> GlobalCodesList(string categoryValue)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetAllGlobalCodes(categoryValue);
                return list;
            }
        }

        /// <summary>
        /// Adds the update global code.
        /// </summary>
        /// <param name="objGlobalCode">The object global code.</param>
        /// <returns></returns>
        [HttpPost]
        public int AddUpdateGlobalCode(GlobalCodes objGlobalCode)
        {
            var globalCodeBal = new GlobalCodeBal();
            if (objGlobalCode.GlobalCodeID > 0)
            {
                objGlobalCode.ModifiedBy = Helpers.GetLoggedInUserId();
                objGlobalCode.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                objGlobalCode.CreatedBy = Helpers.GetLoggedInUserId();
                objGlobalCode.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            else
            {
                objGlobalCode.CreatedBy = Helpers.GetLoggedInUserId();
                objGlobalCode.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            return globalCodeBal.AddUpdateGlobalCodes(objGlobalCode);
        }

        /// <summary>
        /// Deletes the global code.
        /// </summary>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteGlobalCode(int globalCodeId)
        {
            var globalCodeBal = new GlobalCodeBal();
            var objGlobalCode = globalCodeBal.GetGlobalCodeByGlobalCodeId(globalCodeId);
            objGlobalCode.IsDeleted = true;
            objGlobalCode.DeletedBy = Helpers.GetLoggedInUserId();
            objGlobalCode.DeletedDate = Helpers.GetInvariantCultureDateTime();

            var id = globalCodeBal.AddUpdateGlobalCodes(objGlobalCode);
            //return PartialView(PartialViews.GlobalCodesList, globalCodeBal.GetAllGlobalCodes(string.Empty));
            return Json(id);
        }

        public ActionResult GetGlobalCodesDropdownDataByExternalValue1(string globalCodeValue, string parentCategory)
        {
            var list = new List<SelectListItem>();
            using (var bal = new GlobalCodeBal())
            {
                //var current = bal.GetGlobalCodeByCategoryAndCodeValue(parentCategory, globalCodeValue);
                //int category;
                //if (current != null && !string.IsNullOrEmpty(current.ExternalValue1) && int.TryParse(current.ExternalValue1, out category))
                //{
                //    var gcList = bal.GetListByCategoryId(current.ExternalValue1).OrderBy(x => x.GlobalCodeID).ToList();
                //    if (gcList.Any())
                //    {
                //        list.AddRange(gcList.Select(item => new SelectListItem
                //        {
                //            Text = item.GlobalCodeName,
                //            Value = item.GlobalCodeValue,
                //        }));
                //    }
                //}

                var gcList = bal.GetSubCategories2(globalCodeValue).OrderBy(x => int.Parse(x.GlobalCodeValue)).ToList();
                if (gcList.Any())
                {
                    list.AddRange(gcList.Select(item => new SelectListItem
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeValue,
                    }));
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDashboardSectionsData(string globalCodeValue, string parentCategory)
        {
            var list = new List<SelectListItem>();
            using (var bal = new GlobalCodeBal())
            {
                var current = bal.GetGlobalCodeByCategoryAndCodeValue(parentCategory, globalCodeValue);
                int category;
                if (current != null && !string.IsNullOrEmpty(current.ExternalValue1) && int.TryParse(current.ExternalValue1, out category))
                {
                    var gcList = bal.GetGlobalCodesByCategoryValue(current.ExternalValue1).OrderBy(x => x.GlobalCodeID).ToList();
                    if (gcList.Any())
                    {
                        list.AddRange(gcList.Select(item => new SelectListItem
                        {
                            Text = item.GlobalCodeName,
                            Value = item.GlobalCodeValue,
                        }));
                    }
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public int AddOrderTypeCategory(GlobalCodes m)
        {
            var globalCodeBal = new GlobalCodeBal();
            m.FacilityNumber = Convert.ToString(Helpers.GetDefaultFacilityId());
            if (m.GlobalCodeID > 0)
            {
                m.ModifiedBy = Helpers.GetLoggedInUserId();
                m.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                m.CreatedBy = Helpers.GetLoggedInUserId();
                m.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            else
            {
                m.CreatedBy = Helpers.GetLoggedInUserId();
                m.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            return globalCodeBal.AddUpdateGlobalCodes(m);
        }

        #endregion

        /// <summary>
        /// Gets the global code category name by identifier.
        /// </summary>
        /// <param name="globalCodeCategoryID">The global code category identifier.</param>
        /// <returns></returns>
        private string GetGlobalCodeCategoryNameByID(string globalCodeCategoryID)
        {

            var globalCodeCategoryBal = new GlobalCodeCategoryBal();
            var info = globalCodeCategoryBal.GetGlobalCodeCategoryByValue(globalCodeCategoryID);
            if (info != null)
                return info.GlobalCodeCategoryName;
            else
                return string.Empty;
        }

        #region Order Type Sub-Category
        //order sub Category
        /// <summary>
        /// Orders the type sub category.
        /// </summary>
        /// <returns></returns>
        public ActionResult OrderTypeSubCategory()
        {
            var facilityId = Helpers.GetDefaultFacilityId();

            //Initialize the GlobalCode Bal
            using (var globalCodeBal = new GlobalCodeBal())
            {
                var list = globalCodeBal.GetGlobalCodesByCategoriesRangeOnDemand(11000, 11999, 1, Helpers.DefaultRecordCount, false, true, facilityId: facilityId);

                //var list = globalCodeBal.Get
                var globalCodeView = new GlobalCodeView
                {
                    CurrentGlobalCode = new GlobalCodes { IsActive = true },
                    CodesList = list,
                };

                //Pass the View Model in ActionResult to View Facility
                return View(globalCodeView);
            }
        }

        public JsonResult BindOrderTypeCategoriesListOnScroll(string gcc, int blockNumber)
        {
            var recordCount = Helpers.DefaultRecordCount;
            var facilityId = Helpers.GetDefaultFacilityId();
            //Initialize the GlobalCode Bal
            using (var bal = new GlobalCodeBal())
            {
                var list = !string.IsNullOrEmpty(gcc)
                    ? bal.GetGlobalCodesByCategoriesRangeOnDemand(gcc, Convert.ToInt32(blockNumber), recordCount, false, true, facilityId: facilityId)
                    : bal.GetGlobalCodesByCategoriesRangeOnDemand(11000, 11999, Convert.ToInt32(blockNumber),
                        recordCount, false, true, facilityId: facilityId);

                var jsonResult = new
                {
                    list,
                    NoMoreData = list.Count < recordCount,
                };

                //Pass the View Model in ActionResult to View Facility
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }

        //Function to get all GlobalCodes List
        /// <summary>
        /// Gets the order type sub categories list.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetOrderTypeSubCategoriesList(string gcc, string blockNumber, bool showInActive)
        {
            var recordCount = Helpers.DefaultRecordCount;
            var facilityId = Helpers.GetDefaultFacilityId();

            using (var bal = new GlobalCodeBal())
            {
                var list = !string.IsNullOrEmpty(gcc)
                    ? bal.GetGlobalCodesByCategoriesRangeOnDemand(gcc, Convert.ToInt32(blockNumber), recordCount, true, showInActive, facilityId: facilityId)
                    : bal.GetGlobalCodesByCategoriesRangeOnDemand(11000, 11999, Convert.ToInt32(blockNumber), recordCount, true, showInActive, facilityId: facilityId);
                return PartialView(PartialViews.OrderSubCategoryList, list);
            }
        }



        //Function to get  GlobalCode for editing
        /// <summary>
        /// Gets the order sub category.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult GetOrderSubCategory(string id)
        {
            using (var bal = new GlobalCodeBal())
            {
                var globalCode = bal.GetGlobalCodeByGlobalCodeId(Convert.ToInt32(id));
                return PartialView(PartialViews.AddUpdateOrderSubCategory, globalCode);
            }
        }

        public ActionResult GetOrderSubCategoryDetail(string id)
        {
            using (var bal = new GlobalCodeBal())
            {
                var globalCode = bal.GetGlobalCodeByGlobalCodeId(Convert.ToInt32(id));
                var jsonResult = new
                {
                    globalCode.GlobalCodeID,
                    globalCode.GlobalCodeName,
                    globalCode.FacilityNumber,
                    globalCode.GlobalCodeCategoryValue,
                    globalCode.Description,
                    globalCode.ExternalValue1,
                    globalCode.ExternalValue2,
                    globalCode.ExternalValue3,
                    globalCode.ExternalValue4,
                    globalCode.ExternalValue5,
                    globalCode.ExternalValue6,
                    globalCode.IsActive,
                    globalCode.IsDeleted,
                    globalCode.ModifiedBy,
                    globalCode.ModifiedDate,
                    globalCode.SortOrder,
                    globalCode.DeletedDate,
                    globalCode.DeletedBy,
                    globalCode.GlobalCodeValue
                };
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }


        //Delete global code
        /// <summary>
        /// Deletes the order sub category.
        /// </summary>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteOrderSubCategory(string globalCodeId)
        {
            using (var bal = new GlobalCodeBal())
            {
                var m = bal.GetGlobalCodeByGlobalCodeId(Convert.ToInt32(globalCodeId));
                if (m != null)
                {
                    m.IsDeleted = true;
                    m.DeletedBy = Helpers.GetLoggedInUserId();
                    m.DeletedDate = Helpers.GetInvariantCultureDateTime();
                    AddUpdateGlobalCode(m);
                    return Json(m.GlobalCodeID, JsonRequestBehavior.AllowGet);
                }
                return Json(null);
            }
        }


        //Function To reset the User Form
        /// <summary>
        /// Resets the order type sub category.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetOrderTypeSubCategory()
        {
            var view = new GlobalCodes { IsActive = true };
            return PartialView(PartialViews.AddUpdateOrderSubCategory, view);
        }


        // Function to chek duplicate Global Code Name 
        /// <summary>
        /// Checks the duplicate sub category.
        /// </summary>
        /// <param name="GlobalCodeName">Name of the global code.</param>
        /// <param name="GlobalCodeId">The global code identifier.</param>
        /// <param name="GlobalCodeCategoryValue">The global code category value.</param>
        /// <returns></returns>
        public JsonResult CheckDuplicateSubCategory(string GlobalCodeName, int GlobalCodeId, string GlobalCodeCategoryValue)
        {
            var globalCodeBal = new GlobalCodeBal();
            var fn = Convert.ToString(Helpers.GetDefaultFacilityId());
            var isExist = globalCodeBal.CheckDuplicateGlobalCodeName(GlobalCodeName, GlobalCodeId, GlobalCodeCategoryValue, fn);
            return Json(isExist, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetOrderSubCategoriesByExternalValue(string startRange, string endRange)
        {
            var fn = Convert.ToString(Helpers.GetDefaultFacilityId());
            using (var bal = new GlobalCodeCategoryBal())
            {
                var list = bal.GetGlobalCodeCategoriesByExternalValue(fn);
                return Json(list);
            }
        }




        #endregion

        #region Allery Master
        /// <summary>
        /// Allergies the master.
        /// </summary>
        /// <returns></returns>
        public ActionResult AllergyMaster()
        {
            //Initialize the GlobalCode Bal
            using (var globalCodeBal = new GlobalCodeBal())
            {
                var list = globalCodeBal.GetGlobalCodesByCategoriesRange(8101, 8999);

                //var list = globalCodeBal.Get
                var globalCodeView = new GlobalCodeView
                {
                    CurrentGlobalCode = new GlobalCodes { IsActive = true, GlobalCodeValue = "0" },
                    CodesList = list,
                };

                //Pass the View Model in ActionResult to View Facility
                return View(globalCodeView);
            }
        }

        //Delete global code
        /// <summary>
        /// Deletes the allergy.
        /// </summary>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteAllergy(int globalCodeId)
        {
            using (var bal = new GlobalCodeBal())
            {
                var gCode = bal.GetGlobalCodeByGlobalCodeId(globalCodeId);
                if (gCode != null)
                {
                    gCode.IsDeleted = true;
                    gCode.DeletedBy = Helpers.GetLoggedInUserId();
                    gCode.DeletedDate = Helpers.GetInvariantCultureDateTime();
                    AddUpdateGlobalCode(gCode);
                    return Json(gCode.GlobalCodeID);
                }
                return Json(null);
            }
        }


        /// <summary>
        /// Binds the allergy list.
        /// </summary>
        /// <returns></returns>
        public ActionResult BindAllergyList()
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetGlobalCodesByCategoriesRange(8101, 8999);
                return PartialView(PartialViews.AllergyMasterListView, list);
            }
        }

        //Function to get  GlobalCode for editing
        /// <summary>
        /// Gets the current allergy.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult GetCurrentAllergy(int id)
        {
            using (var bal = new GlobalCodeBal())
            {
                var globalCode = bal.GetGlobalCodeByGlobalCodeId(id);
                return PartialView(PartialViews.AllergyMasterAddEdit, globalCode);
            }
        }

        //Function To reset the User Form
        /// <summary>
        /// Resets the allergy form.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetAllergyForm()
        {
            var globalCode = new GlobalCodes { IsActive = true, GlobalCodeValue = "0" };
            return PartialView(PartialViews.AllergyMasterAddEdit, globalCode);
        }


        #endregion


        #region Generic View
        public ActionResult CodeView(string categoryValue, int? txt)
        {
            var maxValue = 250;
            if (categoryValue == "0101")
                maxValue = 5;
            if (!string.IsNullOrEmpty(categoryValue))
            {
                using (var bal = new GlobalCodeBal())
                {
                    var mxGlobalCodeValue = Convert.ToInt32(bal.GetMaxGlobalCodeValueByCategory(categoryValue) + 1);
                    var categoryName = bal.GetGlobalCategoryNameById(categoryValue);
                    var globalCodeView = new GlobalCodeView
                    {
                        CurrentGlobalCode =
                            new GlobalCodes
                            {
                                IsActive = true,
                                IsDeleted = false,
                                GlobalCodeValue = Convert.ToString(mxGlobalCodeValue),
                                GlobalCodeCategoryValue = categoryValue,
                                ExternalValue6 = Convert.ToInt32(txt) > 0 ? "1" : string.Empty,
                                ExternalValue5 = categoryName,
                                ExternalValue1 = Convert.ToString(maxValue)
                            },
                        GlobalCategoryName = categoryName,
                        CodesList = bal.GetAllGlobalCodes(categoryValue)
                    };

                    //Pass the View Model in ActionResult to View Facility
                    return View("GenericView", globalCodeView);
                }
            }

            //Pass the View Model in ActionResult to View Facility
            return View("Index");
        }

        [HttpPost]
        public ActionResult AddUpdateRecord(GlobalCodes objGlobalCode)
        {
            var globalCodeBal = new GlobalCodeBal();
            var userId = Helpers.GetLoggedInUserId();
            var currentDateTime = Helpers.GetInvariantCultureDateTime();
            if (objGlobalCode.GlobalCodeID > 0)
            {
                objGlobalCode.ModifiedBy = userId;
                objGlobalCode.ModifiedDate = currentDateTime;
            }
            else
            {
                objGlobalCode.CreatedBy = userId;
                objGlobalCode.CreatedDate = currentDateTime;
            }
            globalCodeBal.AddUpdateGlobalCodes(objGlobalCode);
            var categoryName = globalCodeBal.GetGlobalCategoryNameById(objGlobalCode.GlobalCodeCategoryValue);
            var globalCodeView = new GlobalCodeView
            {
                GlobalCategoryName = categoryName,
                CodesList = globalCodeBal.GetAllGlobalCodes(objGlobalCode.GlobalCodeCategoryValue),
            };
            return PartialView(PartialViews.GenericListView, globalCodeView);
        }

        public ActionResult DeleteRecord(int globalCodeId, string category)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.DeleteGlobalCodeById(globalCodeId, category);
                var categoryName = bal.GetGlobalCategoryNameById(category);
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
                var list = bal.ShowDeletedRecordsByCategoryValue(category, showDeleted);
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

        public ActionResult ShowInActiveRecords(string category, bool showInActive)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.ShowInActiveRecordsByCategoryValue(category, showInActive);
                var categoryName = bal.GetGlobalCategoryNameById(category);
                var globalCodeView = new GlobalCodeView
                {
                    GlobalCategoryName = categoryName,
                    CodesList = list,
                };
                return PartialView(PartialViews.GenericListView, globalCodeView);
            }
        }

        #endregion

        #region Security Parameters
        /// <summary>
        /// Securities the specified category value.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public ActionResult Security(string categoryValue)
        {
            var facilityNumber = Helpers.GetDefaultFacilityNumber();
            var viewData = new GlobalCodes
            {
                IsActive = true,
                IsDeleted = false,
                GlobalCodeCategoryValue = categoryValue,
                FacilityNumber = facilityNumber,
                GlobalCodeValue = string.Empty,
                GlobalCodeID = 0
            };
            using (var bal = new GlobalCodeBal())
            {
                var current = bal.GetGlobalCodeByFacilityAndCategoryForSecurityparameter(categoryValue, facilityNumber);
                if (current != null)
                    viewData = current;
            }
            return View("SecurityParameters", viewData);
        }

        /// <summary>
        /// Saves the security parameters.
        /// </summary>
        /// <param name="objGlobalCode">The object global code.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SaveSecurityParameters(GlobalCodes objGlobalCode)
        {
            var globalCodeBal = new GlobalCodeBal();
            var userId = Helpers.GetLoggedInUserId();
            var currentDateTime = Helpers.GetInvariantCultureDateTime();

            if (string.IsNullOrEmpty(objGlobalCode.GlobalCodeValue))
            {
                var maxValue = globalCodeBal.GetMaxGlobalCodeValueByCategory(objGlobalCode.GlobalCodeCategoryValue, objGlobalCode.FacilityNumber);
                maxValue = maxValue == 0 ? 1 : maxValue + 1;
                objGlobalCode.GlobalCodeValue = Convert.ToString(maxValue);
            }

            objGlobalCode.IsDeleted = false;
            objGlobalCode.IsActive = true;
            if (objGlobalCode.GlobalCodeID > 0)
            {
                objGlobalCode.ModifiedBy = userId;
                objGlobalCode.ModifiedDate = currentDateTime;
            }
            else
            {
                objGlobalCode.CreatedBy = userId;
                objGlobalCode.CreatedDate = currentDateTime;
            }
            var id = globalCodeBal.AddUpdateGlobalCodes(objGlobalCode);
            return Json(id, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// Gets the details by facility number.
        /// </summary>
        /// <param name="category">The category.</param>
        /// <param name="facilityNumber">The facility number.</param>
        /// <returns></returns>
        public JsonResult GetDetailsByFacilityNumber(string category, string facilityNumber)
        {
            using (var bal = new GlobalCodeBal())
            {
                var categoryValue = !string.IsNullOrEmpty(category) ? category : "2121";
                var maxValue = bal.GetMaxGlobalCodeValueByCategory(categoryValue, facilityNumber);
                maxValue = maxValue == 0 ? 1 : maxValue + 1;
                var retObj = bal.GetGlobalCodeByFacilityAndCategoryForSecurityparameter(categoryValue, facilityNumber);

                var objGlobalCode = retObj ??
                                    new GlobalCodes
                                    {
                                        GlobalCodeCategoryValue = categoryValue,
                                        FacilityNumber = facilityNumber,
                                        GlobalCodeValue = Convert.ToString(maxValue),
                                        IsActive = true
                                    };
                return Json(objGlobalCode, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetFacilitiesDropdownDataWithFacilityNumber()
        {
            var cId = Helpers.GetDefaultCorporateId();
            var facilityNumber = Helpers.GetDefaultFacilityNumber();
            using (var facBal = new FacilityBal())
            {
                var facilities = facBal.GetFacilities(cId);
                if (facilities.Count > 0)
                {
                    var list = new List<SelectListItem>();
                    var roleId = Helpers.GetDefaultRoleId();
                    if (Convert.ToInt32(roleId) != 40)
                    {
                        var item = facilities.FirstOrDefault(f => f.FacilityNumber.Equals(facilityNumber));
                        if (item != null)
                        {
                            list.Add(new SelectListItem
                            {
                                Text = item.FacilityName,
                                Value = item.FacilityNumber,
                            });
                        }
                    }
                    else
                    {
                        list.AddRange(facilities.Select(item => new SelectListItem
                        {
                            Text = item.FacilityName,
                            Value = item.FacilityNumber,
                        }));
                    }
                    return Json(list, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(null);
        }
        #endregion

        #region Dashboard Sub Categories
        /// <summary>
        /// Securities the specified category value.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public ActionResult DashSubCategoryView(string categoryValue)
        {
            var facilityNumber = Helpers.GetDefaultFacilityNumber();

            using (var bal = new GlobalCodeBal())
            {
                var maxValue = bal.GetMaxGlobalCodeValueByCategory(categoryValue) + 1;
                var viewData = new GlobalCodeView
                {
                    CurrentGlobalCode = new GlobalCodes
                    {
                        IsActive = true,
                        IsDeleted = false,
                        GlobalCodeCategoryValue = categoryValue,
                        FacilityNumber = facilityNumber,
                        GlobalCodeValue = Convert.ToString(maxValue),
                        SortOrder = maxValue,
                        GlobalCodeID = 0
                    },
                    CodesList = bal.GetSubCategoriesList(categoryValue)
                };

                return View(viewData);
            }
        }

        /// <summary>
        /// Saves the security parameters.
        /// </summary>
        /// <param name="model">The object global code.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SaveSubCategory(GlobalCodes model)
        {
            var globalCodeBal = new GlobalCodeBal();
            var userId = Helpers.GetLoggedInUserId();
            var currentDateTime = Helpers.GetInvariantCultureDateTime();

            if (string.IsNullOrEmpty(model.GlobalCodeValue) || model.GlobalCodeID == 0)
            {
                var maxValue = globalCodeBal.GetMaxGlobalCodeValueByCategory(model.GlobalCodeCategoryValue, model.FacilityNumber);
                maxValue = maxValue == 0 ? 1 : maxValue + 1;
                model.GlobalCodeValue = Convert.ToString(maxValue);
            }

            model.IsDeleted = false;
            model.IsActive = true;
            model.ExternalValue1 = model.GlobalCodeCategoryValue.Trim().Equals("4351")
                ? model.ExternalValue1
                : string.Empty;
            model.SortOrder = Convert.ToInt32(model.GlobalCodeValue);
            model.Description = !string.IsNullOrEmpty(model.Description) ? model.Description : model.GlobalCodeName;

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

            globalCodeBal.AddUpdateGlobalCodes(model);
            var list = globalCodeBal.GetSubCategoriesList(model.GlobalCodeCategoryValue);
            return PartialView(PartialViews.DashboardSubCategoriesList, list);
        }

        public ActionResult RebindList(string categoryValue)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetSubCategoriesList(categoryValue);
                return PartialView(PartialViews.DashboardSubCategoriesList, list);
            }
        }
        public ActionResult RebindListBySubCategory1Value(string categoryValue, string selectedValue)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetSubCategoriesListBySubCategory1Value(categoryValue, selectedValue);
                return PartialView(PartialViews.DashboardSubCategoriesList, list);
            }
        }
        public ActionResult ChangeSubCategory(string categoryValue)
        {
            using (var bal = new GlobalCodeBal())
            {
                var maxNumber = bal.GetMaxGlobalCodeValueByCategory(categoryValue) + 1;
                return Json(maxNumber, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Gets the globa code by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult GetSubCategoryDetails(int id)
        {
            using (var bal = new GlobalCodeBal())
            {
                var result = bal.GetGlobalCodeCustomById(id);
                var jsonResult = new
                {
                    Id = result.GlobalCodes.GlobalCodeID,
                    Name = result.GlobalCodes.GlobalCodeName,
                    Value = result.GlobalCodes.GlobalCodeValue,
                    Category = result.GlobalCodes.GlobalCodeCategoryValue,
                    result.GlobalCodes.Description,
                    result.GlobalCodes.IsActive,
                    result.GlobalCodes.SortOrder,
                    result.GlobalCodes.ExternalValue1,
                    result.GlobalCodes.ExternalValue2,
                    result.GlobalCodes.ExternalValue3,
                    result.GlobalCodes.ExternalValue4,
                    result.GlobalCodes.ExternalValue5,
                    result.GlobalCodes.ExternalValue6,
                    CategoryName = result.GlobalCodeCustomValue,
                };
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        public string ValidateFormulaExpression(CommonModel oCommonModel)
        {
            return Evaluate(oCommonModel.FormulaExpression);
        }
        public static string Evaluate(string expression)
        {
            var loDataTable = new DataTable();
            try
            {
                var loDataColumn = new DataColumn("Eval", typeof(double), expression);
                loDataTable.Columns.Add(loDataColumn);
                loDataTable.Rows.Add(0);
            }
            catch (Exception ex)
            {

                return "Exception-" + ex.Message;
            }
            return Convert.ToString((double)(loDataTable.Rows[0]["Eval"]));
        }


        #region Dashboard Indicator Settings

        public ActionResult IndicatorSettings()
        {
            using (var bal = new GlobalCodeBal())
            {
                var corporateId = Helpers.GetSysAdminCorporateID();
                var model = bal.GetIndicatorSettingsByCorporateId(Convert.ToString(corporateId));
                return View(model);
            }
        }

        public ActionResult GetIndicatorSettings(string corporateId)
        {
            using (var bal = new GlobalCodeBal())
            {
                var result = bal.GetIndicatorSettingsByCorporateId(Convert.ToString(corporateId));
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        public ActionResult GetGenericTypeData(string category)
        {
            using (var bal = new GlobalCodeBal())
            {
                var list = bal.GetAllGlobalCodes(category);
                var categoryName = bal.GetGlobalCategoryNameById(category);
                var globalCodeView = new GlobalCodeView
                {
                    GlobalCategoryName = categoryName,
                    CodesList = list,
                };
                return PartialView(PartialViews.GenericListView, globalCodeView);
            }
        }

        [HttpPost]
        public ActionResult ShowSubCategoriesByStatus(bool showInActive, string gcc, string blockNumber)
        {
            var recordCount = Helpers.DefaultRecordCount;
            var fn = Helpers.GetDefaultFacilityId();
            using (var bal = new GlobalCodeBal())
            {
                var list = !string.IsNullOrEmpty(gcc)
                    ? bal.GetGlobalCodesByCategoriesRangeOnDemand(gcc, Convert.ToInt32(blockNumber), recordCount, true, showInActive, facilityId: fn)
                    : bal.GetGlobalCodesByCategoriesRangeOnDemand(11000, 11999, Convert.ToInt32(blockNumber), recordCount, true, showInActive, facilityId: fn);
                return PartialView(PartialViews.OrderSubCategoryList, list);
            }
        }

    }
}