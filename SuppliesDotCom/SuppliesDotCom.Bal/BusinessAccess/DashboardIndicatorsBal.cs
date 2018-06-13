using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardIndicatorsBal : BaseBal
    {
        /// <summary>
        /// Gets or sets the dashboard indicators mapper.
        /// </summary>
        /// <value>
        /// The dashboard indicators mapper.
        /// </value>
        private DashboardIndicatorsMapper DashboardIndicatorsMapper { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="DashboardIndicatorsBal" /> class.
        /// </summary>
        public DashboardIndicatorsBal()
        {
            DashboardIndicatorsMapper = new DashboardIndicatorsMapper();
        }

        /// <summary>
        /// Gets the dashboard indicators list active in active.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="showinactive">The showinactive.</param>
        /// <returns></returns>
        public IEnumerable<DashboardIndicatorsCustomModel> GetDashboardIndicatorsListActiveInActive(int corporateId, int? showinactive)
        {
            var list = new List<DashboardIndicatorsCustomModel>();
            using (var dashboardIndicatorsRep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var lstDashboardIndicators = dashboardIndicatorsRep.Where(x => x.CorporateId == corporateId && x.IsActive == showinactive).ToList();
                if (lstDashboardIndicators.Any())
                {
                    list.AddRange(
                        lstDashboardIndicators.Select(item => DashboardIndicatorsMapper.MapModelToViewModel(item)));
                }
            }
            //list = list.GroupBy(p => p.IndicatorNumber).Select(g => g.First()).ToList();
            return list;
        }
        public List<DashboardIndicatorsCustomModel> GetDashboardIndicatorsListActiveInActiveNew(int corporateId, string sort, string sortdir, int? showinactive)
        {
            var list = new List<DashboardIndicatorsCustomModel>();
            using (var dashboardIndicatorsRep = UnitOfWork.DashboardIndicatorsRepository)
            {
                list = dashboardIndicatorsRep.GetDashboardIndicatorsListActiveInActiveNew(corporateId, sort, sortdir,
                   showinactive);

                //if (listDashboard.Any())
                //   {
                //       list.AddRange(
                //           listDashboard.Select(item => DashboardIndicatorsMapper.MapModelToViewModel(item)));
                //   }
            }
            return list;
        }
        /// <summary>
        /// Gets the dashboard indicators list by corporate.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public List<DashboardIndicatorsCustomModel> GetDashboardIndicatorsListByCorporate(int corporateId, int facilityId)
        {
            var list = new List<DashboardIndicatorsCustomModel>();
            using (var dashboardIndicatorsRep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var lstDashboardIndicators =
                    dashboardIndicatorsRep.Where(x => x.CorporateId == corporateId && x.IsActive == 1)
                        .OrderBy(a => a.Dashboard)
                        .ToList();
                if (lstDashboardIndicators.Any())
                {
                    list.AddRange(
                        lstDashboardIndicators.Select(item => DashboardIndicatorsMapper.MapModelToViewModel(item)));
                }
            }
            //list = list;// list.GroupBy(p => p.IndicatorNumber).Select(g => g.First()).ToList();
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardIndicatorsCustomModel> SaveDashboardIndicators(DashboardIndicators model)
        {
            var currentDateTime = GetInvariantCultureDateTime(Convert.ToInt32(model.FacilityId));
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                if (model.IndicatorID > 0)
                {
                    var current = rep.GetSingle(model.IndicatorID);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    //model.ExternalValue3 = current.ExternalValue3;
                    model.CorporateId = current.CorporateId;
                    rep.UpdateEntity(model, model.IndicatorID);
                }
                else
                {
                    rep.Create(model);

                    /*
                     * The below Method is called twice.
                     * Firstly for THE CURRENT YEAR, it is putting data for the new indicator in DashboardIndicatorData and ManualDashboard
                     * Secondly for THE PREVIOUS YEAR, doing the same.
                     */
                    rep.CreateDashboardStructure(Convert.ToInt32(model.CorporateId), model.IndicatorNumber,
                    model.SubCategory1, model.SubCategory2, currentDateTime.Year);

                    //The below for the data entries for the previous year.
                    rep.CreateDashboardStructure(Convert.ToInt32(model.CorporateId), model.IndicatorNumber,
                    model.SubCategory1, model.SubCategory2, currentDateTime.Year - 1);
                }

                //rep.CreateDashboardStructure(Convert.ToInt32(model.CorporateId), model.IndicatorNumber,
                //    model.SubCategory1, model.SubCategory2, DateTime.Now.Year, model.ExpressionValue,type);

                var list = new List<DashboardIndicatorsCustomModel>();// GetDashboardIndicatorsListByCorporate(Convert.ToInt32(model.CorporateId), Convert.ToInt32(model.FacilityId));
                return list;
            }
        }
        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardIndicatorsCustomModel> SaveDashboardIndicatorsV1(DashboardIndicators model)
        {
            var currentDateTime = GetInvariantCultureDateTime(Convert.ToInt32(model.FacilityId));
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var type = "n";
                if (model.IndicatorID > 0)
                {
                    var current = rep.GetSingle(model.IndicatorID);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    //model.ExternalValue3 = current.ExternalValue3;
                    model.CorporateId = current.CorporateId;
                    type = "u";
                    rep.UpdateEntity(model, model.IndicatorID);
                }
                else
                {
                    type = "n";
                    rep.Create(model);
                }

                rep.CreateDashboardStructureV1(Convert.ToInt32(model.CorporateId), model.IndicatorNumber,
                   model.SubCategory1, model.SubCategory2, currentDateTime.Year, model.ExpressionValue, type);

                var list = new List<DashboardIndicatorsCustomModel>();// GetDashboardIndicatorsListByCorporate(Convert.ToInt32(model.CorporateId), Convert.ToInt32(model.FacilityId));
                return list;
            }
        }
        /// <summary>
        /// Deletes the indicator.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public bool DeleteIndicator(DashboardIndicators model)
        {
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                rep.UpdateEntity(model, model.IndicatorID);
                return true;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="dashboardIndicatorsId">The dashboard indicators identifier.</param>
        /// <returns></returns>
        public DashboardIndicatorsCustomModel GetDashboardIndicatorsById(int? dashboardIndicatorsId)
        {
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var model = rep.Where(x => x.IndicatorID == dashboardIndicatorsId).FirstOrDefault();
                var dashboardIndicatorCustomModel = DashboardIndicatorsMapper.MapModelToViewModel(model);
                return dashboardIndicatorCustomModel;
            }
        }

        /// <summary>
        /// Gets the dashboard indicators by number.
        /// </summary>
        /// <param name="number">The number.</param>
        /// <returns></returns>
        public DashboardIndicatorsCustomModel GetDashboardIndicatorsByNumber(string number)
        {
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var model = rep.Where(x => x.IndicatorNumber == number).FirstOrDefault();
                var dashboardIndicatorCustomModel = DashboardIndicatorsMapper.MapModelToViewModel(model);
                return dashboardIndicatorCustomModel;
            }
        }

        /// <summary>
        /// Gets the indicator next number.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public string GetIndicatorNextNumber(int corporateId)
        {
            var maxIndicatorNumber = 1;
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var currentlist =
                    rep.Where(i => i.CorporateId == corporateId).ToList();
                var current = currentlist.Any() ? currentlist.Select(a => Convert.ToInt32(a.IndicatorNumber)).Max() : 1;

                if (current > 0)
                    maxIndicatorNumber += current;
            }
            return Convert.ToString(maxIndicatorNumber);
        }

        /// <summary>
        /// Determines whether [is indicator exist] [the specified indicator number].
        /// </summary>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="id">The identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="subCategory1">The sub category1.</param>
        /// <param name="subCategory2">The sub category2.</param>
        /// <returns></returns>
        public bool IsIndicatorExist(string indicatorNumber, int id, int corporateId, string subCategory1, string subCategory2)
        {
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                indicatorNumber = indicatorNumber.Trim();
                subCategory1 = subCategory1.Trim();
                subCategory2 = subCategory2.Trim();
                //var isExist = id > 0
                //    ? rep.Where(i => i.IndicatorNumber.Trim().Equals(indicatorNumber) && i.IndicatorID != id && i.CorporateId == corporateId && i.SubCategory1.Trim().Equals(subCategory1) && i.SubCategory2.Trim().Equals(subCategory2) && i.IsActive==true).Any()
                //    : rep.Where(i => i.IndicatorNumber.Trim().Equals(indicatorNumber) && i.CorporateId == corporateId && i.SubCategory1.Trim().Equals(subCategory1) && i.SubCategory2.Trim().Equals(subCategory2)).Any();

                var isExist =
                    rep.Where(
                        i => i.IsActive == 1 && ((id > 0 && i.IndicatorID != id) || id == 0) &&
                            i.IndicatorNumber.Trim().Equals(indicatorNumber) && i.CorporateId == corporateId &&
                            i.SubCategory1.Trim().Equals(subCategory1) && i.SubCategory2.Trim().Equals(subCategory2))
                        .Any();
                return isExist;
            }
        }


        public bool CheckDuplicateSortOrder(int sortOrder, int indicatorId)
        {
            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var isExists =
                    rep.Where(d => d.SortOrder == sortOrder && (d.IndicatorID == indicatorId || indicatorId == 0)).Any();
                return isExists;
            }
        }

        public IEnumerable<DashboardIndicatorsCustomModel> GetDashboardIndicatorsDataList(int corporateId, int? showinactive)
        {
            var list = new List<DashboardIndicatorsCustomModel>();
            using (var dashboardIndicatorsRep = UnitOfWork.DashboardIndicatorsRepository)
            {
                //list = dashboardIndicatorsRep.GetDashboardIndicatorsData(corporateId, showinactive);
                list = dashboardIndicatorsRep.GetDashboardIndicatorsListActiveInActiveNew(corporateId, "ASC", "IndicatorNumber",
                    showinactive);

                return list;
            }
            //list = list.GroupBy(p => p.IndicatorNumber).Select(g => g.First()).ToList();

        }

        public bool UpdateIndicatorsOtherDetail(DashboardIndicators model)
        {

            using (var rep = UnitOfWork.DashboardIndicatorsRepository)
            {
                var result = rep.MakeIndicatorInActive(Convert.ToInt32(model.CorporateId), Convert.ToInt32(model.IsActive), model.IndicatorNumber, Convert.ToInt32(model.FacilityId),
                             model.SubCategory1, model.SubCategory2);
                return result;
            }
        }

    }
}
