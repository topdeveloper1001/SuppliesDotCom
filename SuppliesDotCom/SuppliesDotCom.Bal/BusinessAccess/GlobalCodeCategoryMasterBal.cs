using System.Linq;
using SuppliesDotCom.Model;
using System.Collections.Generic;
using System;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class GlobalCodeCategoryMasterBal : BaseBal
    {
        //Function to get all GlobalCodeCategories
        public List<GlobalCodeCategory> GetAllGlobalCodeCategories()
        {
            using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var list = new List<GlobalCodeCategory>();
                list = rep.Where(s => s.IsDeleted == false && s.IsActive).ToList();
                return list;
            }
        }

        //Function to get GlobalCodes by GlobalCodeID
        public GlobalCodeCategory GetGlobalCategoriesByGlobalCodeCategoryId(int globalCodeCategoriesID)
        {
            using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var globalCodeCategory = rep.Where(s => s.IsDeleted == false && s.GlobalCodeCategoryID == globalCodeCategoriesID).FirstOrDefault();
                return globalCodeCategory;
            }
        }

        //Function to add update tab
        public int AddUpdateGlobalCategory(GlobalCodeCategory m)
        {
            try
            {
                using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
                {
                    var name = m.GlobalCodeCategoryName.ToLower().Trim();
                    var isExists = rep.Where(g => g.FacilityNumber.Equals(m.FacilityNumber)
                    && g.GlobalCodeCategoryID != m.GlobalCodeCategoryID
                    && (g.GlobalCodeCategoryName.ToLower().Trim().Equals(name)
                    || g.GlobalCodeCategoryValue.ToLower().Trim().Equals(m.GlobalCodeCategoryValue))
                    && g.IsActive && g.IsDeleted != true
                    ).Any();

                    if (!isExists)
                    {
                        if (m.GlobalCodeCategoryID > 0)
                        {
                            var current = rep.GetSingle(m.GlobalCodeCategoryID);
                            m.CreatedBy = current.CreatedBy;
                            m.CreatedDate = current.CreatedDate;
                            rep.UpdateEntity(m, m.GlobalCodeCategoryID);
                        }
                        else
                            rep.Create(m);
                    }
                    else
                        return -1;

                    return m.GlobalCodeCategoryID;
                }
            }
            catch (Exception x)
            {
                throw x;
            }

        }

        //Function to get all GlobalCodeCategories
        public List<GlobalCodeCategory> GetAllGlobalCodeCategoriesByOrderType(string orderType, string fn = "")
        {
            using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var list = new List<GlobalCodeCategory>();
                list = rep.Where(s => s.IsDeleted == false && s.GroupCode == orderType && (string.IsNullOrEmpty(fn) || s.FacilityNumber.Equals(fn))).ToList();
                return list;
            }
        }


        public List<GlobalCodeCategory> GetOrderTypeCategoriesByFacility(long facilityId, long userId, bool status = true)
        {
            using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
            {
                var list = rep.GetOrderTypeCategories(facilityId, userId, status);
                return list;
            }
        }
    }
}
