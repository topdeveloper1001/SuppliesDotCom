using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class GlobalCodeCategoryBal : BaseBal
    {

        /// <summary>
        /// Add Update Global Code Category
        /// </summary>
        /// <param name="model">The global cc.</param>
        /// <returns></returns>
        public int AddUpdateGlobalCodeCategory(GlobalCodeCategory model)
        {
            using (var globalRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                if (model.GlobalCodeCategoryID > 0)
                    globalRep.UpdateEntity(model, model.GlobalCodeCategoryID);
                else
                    globalRep.Create(model);
            }
            return model.GlobalCodeCategoryID;
        }

        //Function to get GlobalCodeCategories
        /// <summary>
        /// Gets the global code categories.
        /// </summary>
        /// <returns></returns>
        public List<GlobalCodeCategory> GetGlobalCodeCategories()
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var lstGlobalCodeCategory = gRep.GetAll().OrderBy(_ => _.GlobalCodeCategoryName).ToList();
                return lstGlobalCodeCategory;
            }
        }

        //Function to get GlobalCodeCategories
        /// <summary>
        /// Gets the global code categories by null facility.
        /// </summary>
        /// <returns></returns>
        public List<GlobalCodeCategory> GetGlobalCodeCategoriesByNullFacility()
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var lstGlobalCodeCategory = gRep.GetAll().Where(f => f.FacilityNumber == "0").OrderBy(_ => _.GlobalCodeCategoryName).ToList();
                return lstGlobalCodeCategory;
            }
        }

        //Function to get GlobalCodeCategoriesby facility number
        /// <summary>
        /// Gets the facility global code categories.
        /// </summary>
        /// <param name="facilityNumber">The facility number.</param>
        /// <returns></returns>
        public List<GlobalCodeCategory> GetFacilityGlobalCodeCategories(string facilityNumber)
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var lstGlobalCodeCategory = gRep.Where(_ => _.FacilityNumber.Equals(facilityNumber)).OrderBy(_ => _.GlobalCodeCategoryName).ToList();
                return lstGlobalCodeCategory;
            }
        }

        //Function to Get GlobalCode Category Range
        /// <summary>
        /// Gets the global code categories range.
        /// </summary>
        /// <param name="startRange">The start range.</param>
        /// <param name="finishRange">The finish range.</param>
        /// <returns></returns>
        public List<GlobalCodeCategory> GetGlobalCodeCategoriesRange(int startRange, int finishRange)
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var lstGlobalCodeCategory =
                    gRep.GetAll().ToList().Where(
                            x =>
                                x.IsActive && (x.IsDeleted != null || x.IsDeleted == false) &&
                                Convert.ToInt32(x.GlobalCodeCategoryValue) >= startRange &&
                                Convert.ToInt32(x.GlobalCodeCategoryValue) <= finishRange)
                        .OrderBy(_ => _.GlobalCodeCategoryName)
                        .ToList();
                return lstGlobalCodeCategory;
            }
        }

        //Function to get GlobalCodeCategoryCustomModel
        /// <summary>
        /// Gets the name of the global code categories with facility.
        /// </summary>
        /// <returns></returns>
        public List<GlobalCodeCategoryCustomModel> GetGlobalCodeCategoriesWithFacilityName()
        {
            var lst = new List<GlobalCodeCategoryCustomModel>();
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var iQueryableGlobalCodeCRep = gRep.GetAll().ToList();
                var fRep = UnitOfWork.FacilityRepository;
                var iQueryableFacility = fRep.GetAll().ToList();
                lst = (from global in iQueryableGlobalCodeCRep
                       join fac in iQueryableFacility on global.FacilityNumber equals fac.FacilityNumber
                       select new GlobalCodeCategoryCustomModel
                       {
                           // GlobalCodeCategoryID = global.GlobalCodeCategoryID,
                           GlobalCodeCategoryName = global.GlobalCodeCategoryName,
                           GlobalCodeCategoryValue = global.GlobalCodeCategoryValue,
                           //CreatedDate = global.CreatedDate == null ?  DateTime.Now : global.CreatedDate,
                           //ModifiedDate = global.ModifiedDate == null ?  DateTime.Now : global.ModifiedDate,
                           //DeletedDate = global.DeletedDate == null ?  DateTime.Now : global.DeletedDate,
                           //CreatedBy = global.CreatedBy == null ? 0 : global.CreatedBy,
                           //ModifiedBy = global.ModifiedBy == null ? 0 : global.ModifiedBy,
                           //DeletedBy = global.DeletedBy == null ? 0 : global.DeletedBy,
                           //IsActive = global.IsActive,
                           //FacilityNumber = fac.FacilityNumber,
                           //IsDeleted = global.IsDeleted,
                           FacilityName = fac.FacilityName
                       }).ToList();
                return lst;
            }
        }

        //Function to get GlobalCodeCategories by Id
        /// <summary>
        /// Gets the global code category by value.
        /// </summary>
        /// <param name="globalCodeCategoryvalue">The global code categoryvalue.</param>
        /// <returns></returns>
        public GlobalCodeCategory GetGlobalCodeCategoryByValue(string globalCodeCategoryvalue)
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var globalCodeCategory = gRep.Where(f => f.GlobalCodeCategoryValue == globalCodeCategoryvalue).FirstOrDefault();
                return globalCodeCategory ?? new GlobalCodeCategory();
            }
        }

        //Function to get GlobalCodeCategories by Category Id
        /// <summary>
        /// Gets the global code categories by category identifier.
        /// </summary>
        /// <param name="GlobalCodeCategoryId">The global code category identifier.</param>
        /// <returns></returns>
        public GlobalCodeCategory GetCurrentCategoryById(int GlobalCodeCategoryId)
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var current = gRep.Where(f => f.GlobalCodeCategoryID == GlobalCodeCategoryId).FirstOrDefault();
                return current;
            }
        }

        public List<GlobalCodeCategory> GetSearchedCategories(string text, string externalValue)
        {
            using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var searchedResult =
                    rep.Where(
                        r =>
                            r.ExternalValue1.Equals(externalValue) &&
                            (r.GlobalCodeCategoryName.Contains(text) || r.GlobalCodeCategoryValue.Contains(text)))
                        .ToList();
                return searchedResult;
            }
        }

        /// <summary>
        /// Gets the global code category by value.
        /// </summary>
        /// <param name="categoryValue"></param>
        /// <returns></returns>
        public List<GlobalCodeCategory> GetListByCategoryValue(string categoryValue)
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var list = gRep.Where(f => f.ExternalValue1.Equals(categoryValue) && (f.IsDeleted != null && !(bool)f.IsDeleted)).ToList();
                return list;
            }
        }

        public bool CheckDuplicateCode(GlobalCodeCategory model)
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var result = model.GlobalCodeCategoryID > 0 ?
                gRep.Where(
                    g =>
                        g.GlobalCodeCategoryID != model.GlobalCodeCategoryID &&
                        g.GlobalCodeCategoryValue.Equals(model.GlobalCodeCategoryValue)).Any() :
                gRep.Where(
                    g => g.GlobalCodeCategoryValue.Equals(model.GlobalCodeCategoryValue)).Any();
                return result;
            }
        }

        public List<GlobalCodeCategory> GetGlobalCodeCategoriesByExternalValue(string facilityNumber = "")
        {
            using (var gRep = UnitOfWork.GlobalCodeCategoryRepository)
            {

                var listCategory = gRep.Where(x =>
                    x.IsActive && x.IsDeleted != true &&
                    x.ExternalValue3.Trim().ToLower().Equals("ordercategory")
                    &&
                    (string.IsNullOrEmpty(facilityNumber) || x.FacilityNumber.Equals(facilityNumber)))
                    .OrderBy(x => x.GlobalCodeCategoryName)
                    .ToList();
                return listCategory;
            }
        }
    }
}
