using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardTargetsBal : BaseBal
    {
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<DashboardTargetsCustomModel> GetDashboardTargetsList(int cId, int fId)
        {
            var list = new List<DashboardTargetsCustomModel>();
            using (var rep = UnitOfWork.DashboardTargetsRepository)
            {
                var lstDashboardTargets = rep.Where(a => a.IsActive == true && (a.CorporateId == cId || cId == 0) && (a.FacilityId == fId || fId == 0)).ToList();
                if (lstDashboardTargets.Count > 0)
                {
                    list.AddRange(lstDashboardTargets.Select(item => new DashboardTargetsCustomModel
                    {
                        CorporateId = item.CorporateId,
                        FacilityId = item.FacilityId,
                        CreatedBy = item.CreatedBy,
                        CreatedDate = item.CreatedDate,
                        IsActive = item.IsActive,
                        ModifiedBy = item.ModifiedBy,
                        ModifiedDate = item.ModifiedDate,
                        RoleId = item.RoleId,
                        Target = item.Target,
                        TargetDescription = item.TargetDescription,
                        TargetId = item.TargetId,
                        TimingIncrement = item.TimingIncrement,
                        UnitOfMeasure = item.UnitOfMeasure,
                        RoleName = GetRoleNameByRoleId(Convert.ToInt32(item.RoleId)),
                        UOMstr =
                            GetNameByGlobalCodeValue(item.UnitOfMeasure.ToString(),
                                Convert.ToString((int)GlobalCodeCategoryValue.DashboardTargetsUOM)),
                        TimmingIncrementStr =
                            GetNameByGlobalCodeValue(item.TimingIncrement.ToString(),
                                Convert.ToString((int)GlobalCodeCategoryValue.DashboardTargetsTimingIncrement)),
                    }));
                }
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public List<DashboardTargetsCustomModel> SaveDashboardTargets(DashboardTargets model)
        {
            List<DashboardTargetsCustomModel> list;
            using (var rep = UnitOfWork.DashboardTargetsRepository)
            {
                if (model.TargetId > 0)
                {
                    var current = rep.GetSingle(model.TargetId);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    rep.UpdateEntity(model, model.TargetId);
                }
                else
                    rep.Create(model);

                list = GetDashboardTargetsList(model.CorporateId, model.FacilityId);
            }
            return list;
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="dashboardTargetsId"></param>
        /// <returns></returns>
        public DashboardTargets GetDashboardTargetsById(int? dashboardTargetsId)
        {
            using (var rep = UnitOfWork.DashboardTargetsRepository)
            {
                var model = rep.Where(x => x.TargetId == dashboardTargetsId).FirstOrDefault();
                return model;
            }
        }
    }
}
