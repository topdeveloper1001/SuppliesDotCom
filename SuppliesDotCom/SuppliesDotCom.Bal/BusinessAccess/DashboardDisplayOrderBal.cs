using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Repository.UOW;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardDisplayOrderBal : BaseBal
    {
         private DashboardDisplayOrderMapper DashboardDisplayOrderMapper { get; set; }

        public DashboardDisplayOrderBal()
        {
            DashboardDisplayOrderMapper = new DashboardDisplayOrderMapper();
        }
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<DashboardDisplayOrderCustomModel> GetDashboardDisplayOrderList(int? corporateid)
        {
            var list = new List<DashboardDisplayOrderCustomModel>();
            using (var dashboardDisplayOrderRep = UnitOfWork.DashboardDisplayOrderRepository)
            {
                var lstDashboardDisplayOrder =
                    dashboardDisplayOrderRep.Where(a => a.CorporateId == corporateid && a.IsDeleted == false).ToList();
                list.AddRange(lstDashboardDisplayOrder.Select(item => DashboardDisplayOrderMapper.MapModelToViewModel(item)));
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardDisplayOrderCustomModel> SaveDashboardDisplayOrder(DashboardDisplayOrder model)
        {
            using (var rep = UnitOfWork.DashboardDisplayOrderRepository)
            {
                if (model.Id > 0)
                {
                    var current = rep.GetSingle(model.Id);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    rep.UpdateEntity(model, model.Id);
                }
                else
                    rep.Create(model);

                var list = GetDashboardDisplayOrderList(model.CorporateId);
                return list;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="DashboardDisplayOrderId">The dashboard display order identifier.</param>
        /// <returns></returns>
        public DashboardDisplayOrder GetDashboardDisplayOrderByID(int? DashboardDisplayOrderId)
        {
            using (var rep = UnitOfWork.DashboardDisplayOrderRepository)
            {
                var model = rep.Where(x => x.Id == DashboardDisplayOrderId).FirstOrDefault();
                return model;
            }
        }
    }
}
