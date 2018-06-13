using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Repository.UOW;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardTransactionCounterBal : BaseBal
    {

        /// <summary>
        /// Gets the dashboard transaction counter.
        /// </summary>
        /// <returns></returns>
        public List<DashboardTransactionCounterCustomModel> GetDashboardTransactionCounter(int corporateid,int facilityid)
        {
            var list = new List<DashboardTransactionCounterCustomModel>();
            using (var dashboardTransactionCounterRep = UnitOfWork.DashboardTransactionCounterRepository)
            {
                var lstDashboardTransactionCounter = dashboardTransactionCounterRep.Where(a => a.CorporateId == corporateid && a.FacilityId == facilityid &&(a.IsActive == null || (bool)a.IsActive)).ToList();
                if (lstDashboardTransactionCounter.Count > 0)
                {
                    list.AddRange(
                        lstDashboardTransactionCounter.Select(item => new DashboardTransactionCounterCustomModel
                        {
                            CounterId = item.CounterId,
                            StatisticDescription = item.StatisticDescription,
                            ActivityDay = item.ActivityDay,
                            ActivityTotal = item.ActivityTotal,
                            DepartmentNumber = item.DepartmentNumber,
                            CorporateId = item.CorporateId,
                            FacilityId = item.FacilityId,
                            CreatedBy = item.CreatedBy,
                            CreatedDate = item.CreatedDate,
                            ModifiedBy = item.ModifiedBy,
                            ModifiedDate = item.ModifiedDate,
                            IsActive = item.IsActive,
                            DashboardStatDescstring = GetNameByGlobalCodeValue(item.StatisticDescription.ToString(), Convert.ToInt32(GlobalCodeCategoryValue.DashboardStatDesc).ToString()),
                        }));
                }
            }
            return list.OrderByDescending(x => x.ActivityDay).ThenBy(x => x.StatisticDescription).ToList();
        }


        /// <summary>
        /// Saves the dashboard transaction counter.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public int SaveDashboardTransactionCounter(DashboardTransactionCounter model)
        {
            using (var rep = UnitOfWork.DashboardTransactionCounterRepository)
            {
                if (model.CounterId > 0)
                    rep.UpdateEntity(model, model.CounterId);
                else
                    rep.Create(model);
                return model.CounterId;
            }
        }


        /// <summary>
        /// Gets the dashboard transaction counter by identifier.
        /// </summary>
        /// <param name="DashboardTransactionCounterId">The dashboard transaction counter identifier.</param>
        /// <returns></returns>
        public DashboardTransactionCounter GetDashboardTransactionCounterById(int? DashboardTransactionCounterId)
        {
            using (var rep = UnitOfWork.DashboardTransactionCounterRepository)
            {
                var model = rep.Where(x => x.CounterId == DashboardTransactionCounterId).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// Deletes the dashboard transaction counter.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public int DeleteDashboardTransactionCounter(DashboardTransactionCounter model)
        {
            using (var rep = UnitOfWork.DashboardTransactionCounterRepository)
            {
                return Convert.ToInt32(rep.Delete(model));
            }
        }

        public List<DashboardTransactionCounterCustomModel> GetDashboardTrancationData(int corporateId, int facilityId)
        {
            using (var rep=UnitOfWork.DashboardTransactionCounterRepository)
            {
                var list = rep.GetDashboardTransactionCounter(corporateId, facilityId).ToList();
                return list;
            }
        }
    }
}
