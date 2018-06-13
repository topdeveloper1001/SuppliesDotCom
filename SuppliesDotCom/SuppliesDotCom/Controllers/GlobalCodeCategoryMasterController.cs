using SuppliesDotCom.Models;
using System.Web.Mvc;
using SuppliesDotCom.Common;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using SuppliesDotCom.Common.Common;
using System;
using System.Linq;

namespace SuppliesDotCom.Controllers
{
    public class GlobalCodeCategoryMasterController : BaseController
    {
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            //Initialize the GlobalCode Bal
            using (var bal = new GlobalCodeCategoryMasterBal())
            {
                var viewData = new GlobalCodeCategoryMasterView
                {
                    GCC = new GlobalCodeCategory
                    {
                        IsActive = true,
                        FacilityNumber = Convert.ToString(Helpers.GetDefaultFacilityId())
                    },
                    //Categories = bal.GetAllGlobalCodeCategories(),
                };

                return View(viewData);
            }
        }


        //Function to get all GlobalCodes List
        /// <summary>
        /// Gets the global code category list.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetGlobalCodeCategoryList()
        {
            var bal = new GlobalCodeCategoryMasterBal();
            return PartialView(PartialViews.GlobalCodeCategoryMasterList, bal.GetAllGlobalCodeCategories());
        }

        //Function to get  GlobalCode for editing
        /// <summary>
        /// Edits the global category code.
        /// </summary>
        /// <param name="GlobalCodeCategoryId">The global code category identifier.</param>
        /// <returns></returns>
        public ActionResult EditGlobalCategoryCode(int GlobalCodeCategoryId)
        {
            //Initialize the GlobalCode Bal
            var globalCodeCategoryMasterBal = new GlobalCodeCategoryMasterBal();
            // var currentGCCMaster = globalCodeCategoryMasterBal.GetGlobalCategoriesByGlobalCodeCategoryId(GlobalCodeCategoryId);
            var facilityBal = new FacilityBal();
            var cId = Helpers.GetDefaultCorporateId();
            var viewData = new GlobalCodeCategoryMasterView
            {
                GCC = globalCodeCategoryMasterBal.GetGlobalCategoriesByGlobalCodeCategoryId(GlobalCodeCategoryId),
                //LstFacility = facilityBal.GetFacilities(cId)
            };
            return PartialView(PartialViews.AddUpdateGlobalCodeCategoryMaster, viewData);
        }

        //Add Update Global Code
        /// <summary>
        /// Adds the update global code category.
        /// </summary>
        /// <param name="m">The model.</param>
        /// <returns></returns>
        [HttpPost]
        public int AddUpdateGlobalCodeCategory(GlobalCodeCategory m)
        {
            var bal = new GlobalCodeCategoryMasterBal();
            m.FacilityNumber = Convert.ToString(Helpers.GetDefaultFacilityId());
            if (m.GlobalCodeCategoryID > 0)
            {
                m.ModifiedBy = Helpers.GetLoggedInUserId();
                m.ModifiedDate = Helpers.GetInvariantCultureDateTime();
            }
            else
            {
                m.CreatedBy = Helpers.GetLoggedInUserId();
                m.CreatedDate = Helpers.GetInvariantCultureDateTime();
            }
            return bal.AddUpdateGlobalCategory(m);
        }

        //Delete global code
        /// <summary>
        /// Deletes the global code category.
        /// </summary>
        /// <param name="globalCodeCategoryId">The global code category identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteGlobalCodeCategory(int globalCodeCategoryId)
        {
            var bal = new GlobalCodeCategoryMasterBal();
            var m = bal.GetGlobalCategoriesByGlobalCodeCategoryId(globalCodeCategoryId);
            m.IsDeleted = true;
            m.DeletedBy = Helpers.GetLoggedInUserId();
            m.DeletedDate = Helpers.GetInvariantCultureDateTime();
            var i = bal.AddUpdateGlobalCategory(m);

            return PartialView(PartialViews.GlobalCodeCategoryMasterList, bal.GetAllGlobalCodeCategories());
        }

        //Function To reset the User Form
        /// <summary>
        /// Resets the global code category form.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetGlobalCodeCategoryForm()
        {
            //Initialize the GlobalCode Bal
            //var facilityBal = new FacilityBal();
            //var cId = Helpers.GetSysAdminCorporateID();
            var viewData = new GlobalCodeCategoryMasterView
            {
                GCC = new GlobalCodeCategory { IsActive = true, IsDeleted = false },
                //LstFacility = facilityBal.GetFacilities(cId)
            };
            return PartialView(PartialViews.AddUpdateGlobalCodeCategoryMaster, viewData);
        }

        #region Order Type Category


        //Function to get globalcode list for OrderCategory
        public ActionResult GetGlobalCodeCatByExternalValue()
        {
            using (var bal = new GlobalCodeCategoryBal())
            {
                var list = bal.GetGlobalCodeCategoriesByExternalValue("0");
                return Json(list);
            }
        }



        //Function to get  GlobalCode for editing
        /// <summary>
        /// Edits the type of the global category code order.
        /// </summary>
        /// <param name="GlobalCodeCategoryId">The global code category identifier.</param>
        /// <returns></returns>
        public JsonResult EditGlobalCategoryCodeOrderType(int GlobalCodeCategoryId)
        {
            //Initialize the GlobalCode Bal
            var bal = new GlobalCodeCategoryMasterBal();
            var m = bal.GetGlobalCategoriesByGlobalCodeCategoryId(GlobalCodeCategoryId);
            var jsonData = new { m, SaveText = ResourceKeyValues.GetKeyValue("update") };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        //Function To reset the User Form
        /// <summary>
        /// Resets the type of the global code category form order.
        /// </summary>
        /// <returns></returns>
        public ActionResult ResetGlobalCodeCategoryFormOrderType()
        {
            //Initialize the GlobalCode Bal
            var facilityBal = new FacilityBal();
            var cId = Helpers.GetDefaultCorporateId();
            var objGlobalCodeCategoryMasterView = new GlobalCodeCategoryMasterView
            {
                GCC = new GlobalCodeCategory(),
                //LstFacility = facilityBal.GetFacilities(cId)
            };
            return PartialView(PartialViews.AddUpdateOrderCategoryType, objGlobalCodeCategoryMasterView);
        }
        //CPT 
        #endregion

        public JsonResult BindOrderTypeCategories()
        {
            using (var bal = new GlobalCodeCategoryMasterBal())
            {
                var list = bal.GetOrderTypeCategoriesByFacility(Helpers.GetDefaultFacilityId(), Helpers.GetLoggedInUserId(), true);

                var jsonData = list.Select(a => new[] { Convert.ToString(a.GlobalCodeCategoryID),a.GlobalCodeCategoryName
                    , a.GlobalCodeCategoryValue, a.ExternalValue1, a.ExternalValue2, a.ExternalValue4,a.ExternalValue3  });

                var s = Json(jsonData, JsonRequestBehavior.AllowGet);
                s.MaxJsonLength = int.MaxValue;
                s.RecursionLimit = int.MaxValue;
                return s;
            }
        }

    }
}