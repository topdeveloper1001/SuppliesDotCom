// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DeptTimmingBal.cs" company="Spadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The holiday planner bal.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    using System.Collections.Generic;
    using System.Linq;

    using Mapper;
    using Model;
    using Model.CustomModel;
    using Repository.GenericRepository;

    /// <summary>
    /// The holiday planner bal.
    /// </summary>
    public class DeptTimmingBal : BaseBal
    {
        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="DeptTimmingBal"/> class.
        /// </summary>
        public DeptTimmingBal()
        {
            DeptTimmingMapper = new DeptTimmingMapper();
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets or sets the holiday planner mapper.
        /// </summary>
        private DeptTimmingMapper DeptTimmingMapper { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        ///     Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<DeptTimmingCustomModel> GetDeptTimming()
        {
            var list = new List<DeptTimmingCustomModel>();
            using (var deptTimmingRep = UnitOfWork.DeptTimmingRepository)
            {
                var lstDeptTimming = deptTimmingRep.GetAll().ToList();
                if (lstDeptTimming.Count > 0)
                {
                    list.AddRange(lstDeptTimming.Select(item => DeptTimmingMapper.MapModelToViewModel(item)));
                }
            }

            return list;
        }

        /// <summary>
        /// Gets the dept timming by department identifier.
        /// </summary>
        /// <param name="departmenId">The departmen identifier.</param>
        /// <returns></returns>
        public List<DeptTimmingCustomModel> GetDeptTimmingByDepartmentId(int departmenId)
        {
            var list = new List<DeptTimmingCustomModel>();
            using (var deptTimmingRep = UnitOfWork.DeptTimmingRepository)
            {
                var lstDeptTimming = deptTimmingRep.Where(x => x.FacilityStructureID == departmenId).ToList();
                if (lstDeptTimming.Count > 0)
                {
                    list.AddRange(lstDeptTimming.Select(item => DeptTimmingMapper.MapModelToViewModel(item)));
                }
            }

            return list;
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="deptTimmingId">The Holiday Planner Id.</param>
        /// <returns>
        /// The <see cref="DeptTimming" />.
        /// </returns>
        public DeptTimming GetDeptTimmingById(int? deptTimmingId)
        {
            using (var rep = UnitOfWork.DeptTimmingRepository)
            {
                DeptTimming model = rep.Where(x => x.DeptTimmingId == deptTimmingId).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model">
        /// The model.
        /// </param>
        /// <returns>
        /// The <see cref="int"/>.
        /// </returns>
        public int SaveDeptTimming(DeptTimming model)
        {
            using (DeptTimmingRepository rep = UnitOfWork.DeptTimmingRepository)
            {
                if (model.DeptTimmingId > 0)
                {
                    rep.UpdateEntity(model, model.DeptTimmingId);
                }
                else
                {
                    rep.Create(model);
                }

                return model.DeptTimmingId;
            }
        }


        /// <summary>
        /// Saves the dept timming list.
        /// </summary>
        /// <param name="deptTimmingsmodel">The dept timmingsmodel.</param>
        /// <returns></returns>
        public int SaveDeptTimmingList(List<DeptTimming> deptTimmingsmodel)
        {
            try
            {
                using (var rep = UnitOfWork.DeptTimmingRepository)
                {
                    var firstOrDefault = deptTimmingsmodel.FirstOrDefault();
                    if (firstOrDefault != null)
                    {
                        var facilityDepartmentId = firstOrDefault.FacilityStructureID;
                        var previousRecords =
                            rep.Where(
                                x => x.FacilityStructureID == facilityDepartmentId)
                                .ToList();
                        if (previousRecords.Any())
                        {
                            rep.Delete(previousRecords);
                        }

                        rep.Create(deptTimmingsmodel);
                    }

                    return 1;
                }
            }
            catch (Exception)
            {
                return -1;
            }
        }

        public int DeleteDepartmentTiming(int facilityStructureId)
        {
            try
            {
                using (var deptRep=UnitOfWork.DeptTimmingRepository)
                {
                   var previousRecords =
                            deptRep.Where(
                                x => x.FacilityStructureID == facilityStructureId)
                                .ToList();
                        if (previousRecords.Any())
                        {
                            deptRep.Delete(previousRecords);
                        }
                    
                    return 1;
                }
            }
            catch (Exception)
            {

                return -1;
            }

            
        }



        public List<DeptTimming> GetDepTimingsById(int departmenId)
        {
            using (var deptTimmingRep = UnitOfWork.DeptTimmingRepository)
            {
                var lstDeptTimming = deptTimmingRep.Where(x => x.FacilityStructureID == departmenId).ToList();
                return lstDeptTimming;
            }
        }


        public List<DeptTimmingCustomModel> GetDeptTimmingByDepartmentId1(int departmenId)
        {
            var list = new List<DeptTimmingCustomModel>();
            using (var deptTimmingRep = UnitOfWork.DeptTimmingRepository)
            {
                var lstDeptTimming = deptTimmingRep.Where(x => x.FacilityStructureID == departmenId).ToList();
                if (lstDeptTimming.Count > 0)
                {
                    list.AddRange(lstDeptTimming.Select(item => DeptTimmingMapper.MapModelToViewModel(item)));
                }
            }

            return list;
        }
        #endregion
    }
}
