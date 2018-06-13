using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Repository.UOW;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardParametersBal : BaseBal
    {
        private DashboardParametersMapper DashboardParametersMapper { get; set; }

        public DashboardParametersBal()
        {
            DashboardParametersMapper = new DashboardParametersMapper();
        }

        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<DashboardParametersCustomModel> GetDashboardParametersList(int corpoarteId, int facilityId)
        {
            var list = new List<DashboardParametersCustomModel>();
            using (var dashboardParametersRep = UnitOfWork.DashboardParametersRepository)
            {
                var lstDashboardParameters = dashboardParametersRep.Where(a => a.CorporateId == corpoarteId && a.FacilityId == facilityId).ToList();
                if (lstDashboardParameters.Count > 0)
                {
                    list.AddRange(lstDashboardParameters.Select(item => DashboardParametersMapper.MapModelToViewModel(item)));
                    list = list.OrderBy(f => f.IndicatorCategory).ThenBy(f => f.ValueType).ToList();
                }
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardParametersCustomModel> SaveDashboardParameters(DashboardParameters model)
        {
            using (var rep = UnitOfWork.DashboardParametersRepository)
            {
                if (model.ParameterId > 0)
                {
                    var current = rep.GetSingle(model.ParameterId);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    rep.UpdateEntity(model, model.ParameterId);
                }
                else
                    rep.Create(model);

                var list = GetDashboardParametersList(model.CorporateId,model.FacilityId);
                return list;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <returns></returns>
        public DashboardParameters GetDashboardParametersById(int? Id)
        {
            using (var rep = UnitOfWork.DashboardParametersRepository)
            {
                var model = rep.Where(x => x.ParameterId == Id).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// Method to Delete the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardParametersCustomModel> DeleteDashboardParameters(DashboardParameters model)
        {
            using (var rep = UnitOfWork.DashboardParametersRepository)
            {
                if (model.ParameterId > 0)
                {
                    var current = rep.GetSingle(model.ParameterId);
                   
                    rep.Delete(model.ParameterId);
                }

                var list = GetDashboardParametersList(model.CorporateId, model.FacilityId);
                return list;
            }
        }

        /// <summary>
        /// Gets the parameters list by dashboard.
        /// </summary>
        /// <param name="corpoarteId">The corpoarte identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="dashboardtype">The dashboardtype.</param>
        /// <returns></returns>
        public List<DashboardParametersRangeCustomModel> GetParametersListByDashboard(int corpoarteId, int facilityId, string dashboardtype)
        {
            var list = new List<DashboardParametersRangeCustomModel>();
            using (var dashboardParametersRep = UnitOfWork.DashboardParametersRepository)
            {
                list = dashboardParametersRep.GetParametersListByDashboard(corpoarteId, facilityId, dashboardtype);
            }
            return list;
        }

        
    }
}
