using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Repository.UOW;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class DashboardRemarkBal : BaseBal
    {
        /// <summary>
        /// Gets or sets the dashboard remark mapper.
        /// </summary>
        /// <value>
        /// The dashboard remark mapper.
        /// </value>
        private DashboardRemarkMapper DashboardRemarkMapper { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="DashboardRemarkBal"/> class.
        /// </summary>
        public DashboardRemarkBal()
        {
            DashboardRemarkMapper = new DashboardRemarkMapper();
        }

        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<DashboardRemarkCustomModel> GetDashboardRemarkList(int corporateid)
        {
            var list = new List<DashboardRemarkCustomModel>();
            using (var dashboardRemarkRep = UnitOfWork.DashboardRemarkRepository)
            {
                var lstDashboardRemark = dashboardRemarkRep.Where(x => x.CorporateId == corporateid && x.IsActive == true).ToList();
                if (lstDashboardRemark.Any())
                {
                    list.AddRange(
                        lstDashboardRemark.Select(item => DashboardRemarkMapper.MapModelToViewModel(item)));
                }
            }
            return list;
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public List<DashboardRemarkCustomModel> SaveDashboardRemark(DashboardRemark model)
        {
            using (var rep = UnitOfWork.DashboardRemarkRepository)
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

                var currentId = model.Id;
                var list = GetDashboardRemarkList(Convert.ToInt32(model.CorporateId));
                return list;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="dashboardRemarkId">The dashboard remark identifier.</param>
        /// <returns></returns>
        public DashboardRemark GetDashboardRemarkByID(int? dashboardRemarkId)
        {
            using (var rep = UnitOfWork.DashboardRemarkRepository)
            {
                var model = rep.Where(x => x.Id == dashboardRemarkId).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// Gets the dashboard remark list.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public List<DashboardRemarkCustomModel> GetDashboardRemarkList(int corporateid, int facilityid)
        {
            var list = new List<DashboardRemarkCustomModel>();
            using (var dashboardRemarkRep = UnitOfWork.DashboardRemarkRepository)
            {
                var lstDashboardRemark = facilityid != 0 ?
                    dashboardRemarkRep.Where(x => x.CorporateId == corporateid && x.FacilityId == facilityid && x.IsActive == true).ToList() :
                    dashboardRemarkRep.Where(x => x.CorporateId == corporateid && x.IsActive == true).ToList();
                if (lstDashboardRemark.Any())
                {
                    list.AddRange(
                        lstDashboardRemark.Select(item => DashboardRemarkMapper.MapModelToViewModel(item)));
                }
            }
            return list;
        }


        /// <summary>
        /// Gets the dashboard remark list.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <param name="dashboardTypeId"></param>
        /// <returns></returns>
        public List<DashboardRemarkCustomModel> GetDashboardRemarkListByDashboardType(int corporateid, int facilityid, int dashboardTypeId)
        {
            var list = new List<DashboardRemarkCustomModel>();
            using (var dashboardRemarkRep = UnitOfWork.DashboardRemarkRepository)
            {
                var lstDashboardRemark = facilityid != 0
                    ? dashboardRemarkRep.Where(
                        x =>
                            x.CorporateId == corporateid && x.FacilityId == facilityid && x.IsActive == true &&
                            x.DashboardType == dashboardTypeId).ToList()
                    : dashboardRemarkRep.Where(
                        x => x.CorporateId == corporateid && x.IsActive == true && x.DashboardType == dashboardTypeId)
                        .ToList();
                if (lstDashboardRemark.Any())
                {
                    list.AddRange(
                        lstDashboardRemark.Select(item => DashboardRemarkMapper.MapModelToViewModel(item)));
                }
            }
            return list;
        }

        /// <summary>
        /// Gets the dashboard remark list.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <param name="dashboardTypeId"></param>
        /// <returns></returns>
        public List<DashboardRemarkCustomModel> GetDashboardRemarkListByDashboardTypeAndMonth(int corporateid, int facilityid, int dashboardTypeId, int month)
        {
            var list = new List<DashboardRemarkCustomModel>();
            using (var dashboardRemarkRep = UnitOfWork.DashboardRemarkRepository)
            {
                var lstDashboardRemark = facilityid != 0
                    ? dashboardRemarkRep.Where(
                        x =>
                            x.CorporateId == corporateid && x.FacilityId == facilityid && x.IsActive == true &&
                            x.DashboardType == dashboardTypeId && x.Month == month).ToList()
                    : dashboardRemarkRep.Where(
                        x =>
                            x.CorporateId == corporateid && x.IsActive == true && x.DashboardType == dashboardTypeId &&
                            x.Month == month)
                        .ToList();
                if (lstDashboardRemark.Any())
                {
                    list.AddRange(
                        lstDashboardRemark.Select(item => DashboardRemarkMapper.MapModelToViewModel(item)));
                }
            }
            return list;
        }
    }
}
