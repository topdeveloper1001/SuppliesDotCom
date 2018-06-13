using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardIndicatorDataBal : BaseBal
    {

        /// <summary>
        /// Gets or sets the dashboard indicator data mapper.
        /// </summary>
        /// <value>
        /// The dashboard indicator data mapper.
        /// </value>
        private DashboardIndicatorDataMapper DashboardIndicatorDataMapper { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="DashboardIndicatorDataBal"/> class.
        /// </summary>
        public DashboardIndicatorDataBal()
        {
            DashboardIndicatorDataMapper = new DashboardIndicatorDataMapper();
        }

        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>
        /// Return the Entity List
        /// </returns>
        public List<DashboardIndicatorDataCustomModel> GetDashboardIndicatorDataList(int corporateid, int facilityId)
        {
            var list = new List<DashboardIndicatorDataCustomModel>();
            using (var dashboardIndicatorDataRep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                var lstDashboardIndicatorData = dashboardIndicatorDataRep.Where(x => x.CorporateId == corporateid && (x.IsActive == true || x.IsActive == null) && x.FacilityId == facilityId).ToList();
                if (lstDashboardIndicatorData.Any())
                {
                    list.AddRange(
                        lstDashboardIndicatorData.Select(item => DashboardIndicatorDataMapper.MapModelToViewModel(item)));
                }
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardIndicatorDataCustomModel> SaveDashboardIndicatorData(DashboardIndicatorData model)
        {
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                if (model.ID > 0)
                {
                    var current = rep.GetSingle(model.ID);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    model.CorporateId = current.CorporateId;
                    rep.UpdateEntity(model, model.ID);
                }
                else
                    rep.Create(model);

                var list = GetDashboardIndicatorDataList(Convert.ToInt32(model.CorporateId), Convert.ToInt32(model.FacilityId));
                return list;
            }
        }

        /// <summary>
        /// Saves the dashboard indicator data custom.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public int SaveDashboardIndicatorDataCustom(DashboardIndicatorData model)
        {
            var logId = model.CreatedBy;
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                if (model.ID > 0)
                {
                    var current = rep.GetSingle(model.ID);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    model.CorporateId = current.CorporateId;

                    if (model.StatisticData == null)
                        model.StatisticData = "0.0000";
                    rep.UpdateEntity(model, model.ID);
                }
                else
                    rep.Create(model);
                /*rep.UpdateCalculativeIndicatorData(model.IndicatorNumber, Convert.ToString(model.CorporateId), Convert.ToString(model.FacilityId),
                    model.Year, model.ExternalValue1, Convert.ToString(logId), model.SubCategory1, model.SubCategory2);*/
                return model.ID;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="dashboardIndicatorDataId">The dashboard indicator data identifier.</param>
        /// <returns></returns>
        public DashboardIndicatorData GetDashboardIndicatorDataById(int? dashboardIndicatorDataId)
        {
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                var model = rep.Where(x => x.ID == dashboardIndicatorDataId).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// Bulks the save dashboard indicator data.
        /// </summary>
        /// <param name="vmList">The vm list.</param>
        /// <param name="currentFacilityId">The current facility identifier.</param>
        /// <param name="currentCorporateId">The current corporate identifier.</param>
        /// <returns></returns>
        public List<DashboardIndicatorDataCustomModel> BulkSaveDashboardIndicatorData(List<DashboardIndicatorDataCustomModel> vmList, int currentFacilityId, int currentCorporateId)
        {
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                var mlist =
                    vmList.Select(item => DashboardIndicatorDataMapper.MapViewModelToModel(item))
                        .Where(
                            model =>
                                model.FacilityId > 0 && model.FacilityId == currentFacilityId && model.CorporateId > 0 &&
                                model.CorporateId == currentCorporateId)
                        .ToList();

                if (mlist.Count > 0)
                {
                    //Save the Indicator Data in the database
                    rep.Create(mlist);
                }
                var list = GetDashboardIndicatorDataList(currentCorporateId, currentFacilityId);
                return list;
            }
        }

        /// <summary>
        /// Bulks the delete dashboard indicator data.
        /// </summary>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="corporateid">The corporateid.</param>
        /// <returns></returns>
        public bool BulkInactiveDashboardIndicatorData(string indicatorNumber, int corporateid)
        {
            return false;
            //var isDeleted = UpdateDashBoardIndicatorDataStatus(corporateid, 0, indicatorNumber, "", "", false, "1");
            //return isDeleted;
        }

        /// <summary>
        /// Bulks the active dashboard indicator data.
        /// </summary>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="corporateid">The corporateid.</param>
        /// <returns></returns>
        public bool BulkActiveDashboardIndicatorData(string indicatorNumber, int corporateid)
        {
            return false;

            //var isactive = UpdateDashBoardIndicatorDataStatus(corporateid, 0, indicatorNumber, "", "", true, "1");
            //return isactive;
        }

        /// <summary>
        /// Gets the type of the dashboard indicator data list by indicator number.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="budgetType">Type of the budget.</param>
        /// <param name="year">The year.</param>
        /// <returns></returns>
        public List<DashboardIndicatorData> GetDashboardIndicatorDataListByIndicatorNumberType(int corporateid, int facilityId, string indicatorNumber, string budgetType, string year)
        {
            var lstDashboardIndicatorData = new List<DashboardIndicatorData>();
            using (var dashboardIndicatorDataRep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                lstDashboardIndicatorData =
                    dashboardIndicatorDataRep.Where(
                        x =>
                            x.CorporateId == corporateid && x.FacilityId == facilityId &&
                            x.IndicatorNumber == indicatorNumber && x.Year == year && x.ExternalValue1 == budgetType)
                        .ToList();

            }
            return lstDashboardIndicatorData;
        }

        /// <summary>
        /// Deletes the manual dashboard details.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="budgetType">Type of the budget.</param>
        /// <param name="year">The year.</param>
        /// <returns></returns>
        public bool DeleteManualDashboardDetails(int corporateid, int facilityId, string indicatorNumber, string budgetType, string year, string subCategory1, string subCategory2)
        {
            var isDeleted = UpdateDashBoardIndicatorDataStatus(corporateid, facilityId, indicatorNumber, budgetType, year, false, "2", subCategory1, subCategory2);
            return isDeleted;
        }

        /// <summary>
        /// Updates the dash board indicator data status.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="budgetType">Type of the budget.</param>
        /// <param name="year">The year.</param>
        /// <param name="status">if set to <c>true</c> [status].</param>
        /// <returns></returns>
        public bool UpdateDashBoardIndicatorDataStatus(int corporateid, int facilityId, string indicatorNumber, string budgetType, string year, bool status, string type, string subCategory1, string subCategory2)
        {
            using (var dashboardIndicatorDataRepository = UnitOfWork.DashboardIndicatorDataRepository)
            {
                var isUpdated = dashboardIndicatorDataRepository.UpdateDashboardIndicatorsData(corporateid, facilityId, indicatorNumber,
                     budgetType, year, status, type, subCategory1, subCategory2);
                return isUpdated;
            }
        }


        /// <summary>
        /// Updates the indicators data in manual dashboard.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public bool UpdateIndicatorsDataInManualDashboard(DashboardIndicatorData model)
        {
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                rep.UpdateCalculativeIndicatorData(model.IndicatorNumber, Convert.ToString(model.CorporateId),
                    Convert.ToString(model.FacilityId),
                    model.Year, model.ExternalValue1, Convert.ToString(model.CreatedBy), model.SubCategory1,
                    model.SubCategory2);
            }
            return true;
        }

        /// <summary>
        /// Sets the static budget target.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public bool SetStaticBudgetTarget(DashboardIndicatorData model)
        {
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                rep.SetStaticBudgetTarget(model.IndicatorNumber, Convert.ToString(model.CorporateId),
                    Convert.ToString(model.FacilityId),
                    model.Year, model.ExternalValue1, Convert.ToString(model.CreatedBy), model.SubCategory1,
                    model.SubCategory2);
            }
            return true;
        }

        /// <summary>
        /// Sets the static budget target.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public bool SetStaticBudgetTargetIndciators(DashboardIndicators model)
        {
            var currentDateTime = GetInvariantCultureDateTime(Convert.ToInt32(model.FacilityId));
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                rep.SetStaticBudgetTarget(model.IndicatorNumber, Convert.ToString(model.CorporateId),
                    Convert.ToString(model.FacilityId),
                    currentDateTime.Year.ToString(), "1", Convert.ToString(model.CreatedBy), model.SubCategory1,
                    model.SubCategory2);
            }
            return true;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateCalculateIndicatorUpdate(DashboardIndicators model)
        {
            var currentDateTime = GetInvariantCultureDateTime(Convert.ToInt32(model.FacilityId));
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                for (int i = 1; i <= 2; i++)
                {
                    rep.UpdateCalculateIndicatorUpdate(Convert.ToString(model.CorporateId),
                        Convert.ToString(model.FacilityId), model.IndicatorNumber, i.ToString(), currentDateTime.Year.ToString(),
                        model.SubCategory1, model.SubCategory2);
                }
            }
            return true;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool GenerateIndicatorEffects(DashboardIndicators model)
        {
            using (var rep = UnitOfWork.DashboardIndicatorDataRepository)
            {
                rep.GenerateIndicatorEffects(Convert.ToString(model.CorporateId),
                    Convert.ToString(model.IndicatorNumber));
            }
            return true;
        }
    }
}
