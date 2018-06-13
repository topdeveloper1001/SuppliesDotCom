// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FacilityStructureBal.cs" company="">
//   
// </copyright>
// <summary>
//   The facility structure bal.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using SuppliesDotCom.Common;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Mapper;
    using Common.Common;
    using Model;
    using Model.CustomModel;
    using Repository.GenericRepository;

    /// <summary>
    /// The facility structure bal.
    /// </summary>
    public class FacilityStructureBal : BaseBal
    {
        #region Constructors and Destructors

        /// <summary>
        ///     Initializes a new instance of the <see cref="FacilityStructureBal" /> class.
        /// </summary>
        public FacilityStructureBal()
        {
            FacilityStructureMapper = new FacilityStructureMapper();
        }

        #endregion

        #region Properties

        /// <summary>
        ///     Gets or sets the facility structure mapper.
        /// </summary>
        /// <value>
        ///     The facility structure mapper.
        /// </value>
        private FacilityStructureMapper FacilityStructureMapper { get; set; }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="facilityStructure">The facility structure.</param>
        /// <returns>
        /// The <see cref="int" />.
        /// </returns>
        public int AddUptdateFacilityStructure(FacilityStructure facilityStructure)
        {
            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                if (facilityStructure.FacilityStructureId > 0)
                {
                    if (facilityStructure.GlobalCodeID == 84)
                    {
                        var appointmentId = GetFacilityStructureById(facilityStructure.FacilityStructureId);
                        facilityStructure.ExternalValue4 = appointmentId.ExternalValue4;
                    }
                    facilityStructureRep.UpdateEntity(facilityStructure, facilityStructure.FacilityStructureId);
                }
                else
                {
                    facilityStructureRep.Create(facilityStructure);
                }

                return facilityStructure.FacilityStructureId;
            }
        }

        /// <summary>
        /// Checks for childrens.
        /// </summary>
        /// <param name="facilityStructureId">The facility structure identifier.</param>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns>
        /// The <see cref="bool" />.
        /// </returns>
        public bool CheckForChildrens(int facilityStructureId)
        {
            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                var iQueryabletransactions =
                    facilityStructureRep.Where(a => a.ParentId == facilityStructureId && a.IsDeleted == false)
                        .FirstOrDefault();
                return iQueryabletransactions != null;
            }
        }

        /// <summary>
        /// Checks the structure exist.
        /// </summary>
        /// <param name="facilityStructure">
        /// The facility structure.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        public bool CheckStructureExist(FacilityStructure facilityStructure)
        {
            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                var iQueryabletransactions =
                    facilityStructureRep.Where(
                        a =>
                        a.FacilityStructureId != facilityStructure.FacilityStructureId
                        && a.FacilityId.Equals(facilityStructure.FacilityId)
                        && a.GlobalCodeID == facilityStructure.GlobalCodeID
                        && a.FacilityStructureName.ToLower().Equals(facilityStructure.FacilityStructureName.ToLower())
                        && a.IsDeleted == false).FirstOrDefault();
                return iQueryabletransactions != null;
            }
        }

        /// <summary>
        /// Deletes the facility structure by identifier.
        /// </summary>
        /// <param name="facilityStructureId">
        /// The facility structure identifier.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        public bool DeleteFacilityStructureById(int facilityStructureId)
        {
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var bedMaster =
                    facilityRep.Where(x => x.FacilityStructureId == facilityStructureId).FirstOrDefault();
                return facilityRep.Delete(bedMaster) > 0;
            }
        }


        /// <summary>
        /// Gets the facility beds.
        /// </summary>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<FacilityStructure> GetFacilityBeds(string facilityId)
        {
            const int FacilityStructureId = 85;
            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                var facilityStructure =
                    facilityStructureRep.Where(
                        x =>
                        x.GlobalCodeID == FacilityStructureId && x.FacilityId == facilityId && x.IsActive
                        && !(bool)x.IsDeleted).ToList();
                return facilityStructure;
            }
        }

        /// <summary>
        /// Gets the facility departments.
        /// </summary>
        /// <param name="corporateid">
        /// The corporateid.
        /// </param>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<FacilityStructure> GetFacilityDepartments(int corporateid, string facilityid)
        {
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var departmentTypes = Convert.ToInt32(BaseFacilityStucture.Department);
                var returnLst = facilityRep.Where(
                    x => x.FacilityId == facilityid && x.GlobalCodeID == departmentTypes && x.IsDeleted == false)
                    .OrderBy(x => x.SortOrder)
                    .ToList();
                return returnLst;
            }
        }

        /// <summary>
        /// Gets the facility rooms.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public List<FacilityStructure> GetFacilityRooms(int corporateid, string facilityid)
        {
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var roomTypes = Convert.ToInt32(BaseFacilityStucture.Rooms);
                var returnLst = facilityRep.Where(
                    x => x.FacilityId == facilityid && x.GlobalCodeID == roomTypes && x.IsDeleted == false)
                    .OrderBy(x => x.SortOrder)
                    .ToList();
                return returnLst;
            }
        }

         
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <param name="facilityId">
        /// The facility Id.
        /// </param>
        /// <returns>
        /// Return the Entity List
        /// </returns>
        public List<FacilityStructureCustomModel> GetFacilityStructure(string facilityId)
        {
            try
            {
                var lstFacilityStructureCustomModel = new List<FacilityStructureCustomModel>();
                using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
                {
                    var lstFacilityStructure =
                        facilityStructureRep.Where(
                            a =>
                                a.FacilityId == facilityId && (a.IsDeleted == null || !(bool)a.IsDeleted) && a.IsActive)
                            .OrderByDescending(_ => _.FacilityStructureId)
                            .ToList();

                    //var globalBal = new GlobalCodeBal();
                    //var facBal = new FacilityBal();
                    //lstFacilityStructureCustomModel.AddRange(
                    //    lstFacilityStructure.Select(
                    //        item =>
                    //        new FacilityStructureCustomModel
                    //            {
                    //                FacilityStructureId = item.FacilityStructureId,
                    //                GlobalCodeID = item.GlobalCodeID,
                    //                FacilityStructureValue = item.FacilityStructureValue,
                    //                FacilityStructureName = item.FacilityStructureName,
                    //                Description = item.Description,
                    //                ParentId = item.ParentId,
                    //                ParentTypeGlobalID = item.ParentTypeGlobalID,
                    //                FacilityId = item.FacilityId,
                    //                SortOrder = item.SortOrder,
                    //                IsActive = item.IsActive,
                    //                CreatedBy = item.CreatedBy,
                    //                CreatedDate = item.CreatedDate,
                    //                ModifiedBy = item.ModifiedBy,
                    //                ModifiedDate = item.ModifiedDate,
                    //                IsDeleted = item.IsDeleted,
                    //                DeletedBy = item.DeletedBy,
                    //                DeletedDate = item.DeletedDate,
                    //                ExternalValue1 = item.ExternalValue1,
                    //                ExternalValue2 = item.ExternalValue2,
                    //                ExternalValue3 = item.ExternalValue3,
                    //                //ExternalValue4 = item.ExternalValue4,
                    //                ExternalValue5 = item.ExternalValue5,
                    //                GlobalCodeIdValue =
                    //                    globalBal.GetGlobalCodeByGlobalCodeId(
                    //                        Convert.ToInt32(item.GlobalCodeID))
                    //                    .GlobalCodeName,
                    //                ParentIdValue =
                    //                    GetParentNameById(
                    //                        Convert.ToInt32(item.ParentId)),
                    //                FacilityName =
                    //                    facBal.GetFacilityNameById(
                    //                        Convert.ToInt32(item.FacilityId)),
                    //                DepartmentWorkingTimming =
                    //                    !string.IsNullOrEmpty(item.DeptOpeningTime)
                    //                        ? item.DeptOpeningTime + " "
                    //                          + item.DeptClosingTime
                    //                        : string.Empty,
                    //                CorporateId = GetCorporateIdFromFacilityId(Convert.ToInt32(item.FacilityId))
                    //            }));

                    lstFacilityStructureCustomModel.AddRange(
                        lstFacilityStructure.Select(item => FacilityStructureMapper.MapModelToViewModel(item)));
                    return lstFacilityStructureCustomModel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <param name="facilityId">
        /// The facility Id.
        /// </param>
        /// <returns>
        /// Return the Entity List
        /// </returns>
        public List<FacilityStructure> GetFacilityStructureForDDL(string facilityId)
        {
            try
            {
                using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
                {
                    var lstFacilityStructure =
                        facilityStructureRep.Where(
                            a =>
                                a.FacilityId == facilityId && (a.IsDeleted == null || !(bool)a.IsDeleted) && a.IsActive)
                            .OrderByDescending(_ => _.FacilityStructureId)
                            .ToList();
                    return lstFacilityStructure;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the facility structure bread crumbs.
        /// </summary>
        /// <param name="facilityStructureId">
        /// The facility structure identifier.
        /// </param>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <param name="ParentId">
        /// The parent identifier.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string GetFacilityStructureBreadCrumbs(int facilityStructureId, string facilityid, string ParentId)
        {
            var _facilityStructureId = string.Empty;
            using (var facilityBal = new FacilityBal())
            {
                _facilityStructureId = facilityBal.GetFacilityNameById(Convert.ToInt32(facilityid));
            }

            switch (facilityStructureId)
            {
                case 82:
                    _facilityStructureId += " : " + "Floor";
                    break;
                case 83:
                    _facilityStructureId += " : " + "Department";
                    break;
                case 84:
                    _facilityStructureId += " : " + "Room";
                    break;
                case 85:
                    _facilityStructureId += " : " + "Bed";
                    break;
            }

            return _facilityStructureId;
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="facilityStructureId">
        /// </param>
        /// <returns>
        /// The <see cref="FacilityStructure"/>.
        /// </returns>
        public FacilityStructure GetFacilityStructureById(int? facilityStructureId)
        {
            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                var facilityStructure =
                    facilityStructureRep.Where(x => x.FacilityStructureId == facilityStructureId).FirstOrDefault();
                return facilityStructure;
            }
        }

        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <param name="facilityId">
        /// The facility Id.
        /// </param>
        /// <param name="structureId">
        /// The structure Id.
        /// </param>
        /// <returns>
        /// Return the Entity List
        /// </returns>
        public List<FacilityStructureCustomModel> GetFacilityStructureCustom(string facilityId, int structureId)
        {
            try
            {
                var lstFacilityStructureCustomModel = new List<FacilityStructureCustomModel>();
                using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
                {
                    var lstFacilityStructure =
                        facilityStructureRep.Where(
                            a =>
                            (facilityId == "0" || a.FacilityId == facilityId)
                            && (structureId == 0 || a.GlobalCodeID == structureId)
                            && (a.IsDeleted == null || !(bool)a.IsDeleted) && a.IsActive)
                            .OrderByDescending(_ => _.GlobalCodeID)
                            .ThenBy(_ => _.SortOrder)
                            .ToList();

                    lstFacilityStructureCustomModel.AddRange(lstFacilityStructure.Select(
                        item => FacilityStructureMapper.MapModelToViewModel(item)));

                    lstFacilityStructureCustomModel =
                        lstFacilityStructureCustomModel.OrderBy(x => x.GlobalCodeID).ThenBy(x => x.SortOrder).ToList();


                    //var bedRateCardBal = new BedRateCardBal();
                    //var ubedmasterBal = new BedMasterBal();
                    //var bedslist = lstFacilityStructureCustomModel.Where(x => x.GlobalCodeID == 85).ToList();


                    //if (structureId == 85)
                    //{

                    //    foreach (var itemCol in bedslist)
                    //    {
                    //        var bedtypeobj = ubedmasterBal.GetBedMasterByStructureId(itemCol.FacilityStructureId);
                    //        var facilityStructureCustomModel =
                    //            lstFacilityStructureCustomModel.FirstOrDefault(
                    //                x => x.FacilityStructureId == itemCol.FacilityStructureId);
                    //        if (bedtypeobj != null)
                    //        {
                    //            var bedrate = bedRateCardBal.GetBedRateByBedTypeId(Convert.ToInt32(bedtypeobj.BedType));
                    //            if (facilityStructureCustomModel != null)
                    //            {
                    //                facilityStructureCustomModel.BedCharge = bedrate;
                    //            }
                    //        }
                    //        else
                    //        {
                    //            if (facilityStructureCustomModel != null)
                    //            {
                    //                facilityStructureCustomModel.BedCharge = "0.00";
                    //            }
                    //        }
                    //    }

                    //}

                    //if (structureId == 85)
                    //{
                    //    foreach (var item in lstFacilityStructureCustomModel)
                    //    {
                    //        using (var bmBal = new BedMasterBal())
                    //        {
                    //            var bedType = bmBal.GetBedMasterByStructureId(item.FacilityStructureId);
                    //            if (bedType != null)
                    //            {
                    //                using (var bedRateCardBal = new BedRateCardBal())
                    //                {
                    //                    var bedrate = bedRateCardBal.GetBedRateByBedTypeId(Convert.ToInt32(bedType.BedType));
                    //                    item.BedCharge = !string.IsNullOrEmpty(bedrate) ? bedrate : "0.00";
                    //                }
                    //            }
                    //            else
                    //                item.BedCharge = "0.00";
                    //        }
                    //    }
                    //}

                    return lstFacilityStructureCustomModel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get Entity Name By Id
        /// </summary>
        /// <param name="facilityStructureId">
        /// The facility Structure Id.
        /// </param>
        /// <returns>
        /// Return the Entity Respository
        /// </returns>
        public string GetFacilityStructureNameById(int? facilityStructureId)
        {
            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                var iQueryabletransactions =
                    facilityStructureRep.Where(a => a.FacilityStructureId == facilityStructureId).FirstOrDefault();
                return (iQueryabletransactions != null) ? iQueryabletransactions.FacilityStructureName : string.Empty;
            }
        }

        /// <summary>
        /// Gets the facility structure parent.
        /// </summary>
        /// <param name="facilityStructureId">
        /// The facility structure identifier.
        /// </param>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<FacilityStructureCustomModel> GetFacilityStructureParent(int facilityStructureId, string facilityid)
        {
            var _facilityStructureId = facilityStructureId;
            switch (facilityStructureId)
            {
                case 82:
                    _facilityStructureId = 0;
                    break;
                case 83:
                    _facilityStructureId = 82;
                    break;
                case 84:
                    _facilityStructureId = 83;
                    break;
                case 85:
                    _facilityStructureId = 84;
                    break;
            }

            using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
            {
                var customlist = facilityStructureRep.GetFacilityStructureData(Convert.ToInt32(facilityid),
                    _facilityStructureId, true);
                return customlist;
            }
        }

        /// <summary>
        /// Gets the in active facility structure custom list.
        /// </summary>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <param name="structureId">
        /// The structure identifier.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<FacilityStructureCustomModel> GetInActiveFacilityStructureCustomList(
            string facilityId,
            int structureId)
        {
            try
            {
                var lstFacilityStructureCustomModel = new List<FacilityStructureCustomModel>();
                using (var facilityStructureRep = UnitOfWork.FacilityStructureRepository)
                {
                    var lstFacilityStructure =
                        facilityStructureRep.Where(
                            a =>
                            (facilityId == "0" || a.FacilityId == facilityId)
                            && (structureId == 0 || a.GlobalCodeID == structureId)
                            && (a.IsDeleted == null || !(bool)a.IsDeleted) && a.IsActive == false)
                            .OrderByDescending(_ => _.GlobalCodeID)
                            .ThenBy(_ => _.SortOrder)
                            .ToList();

                    // var globalBal = new GlobalCodeBal();
                    // var facBal = new FacilityBal();
                    //lstFacilityStructureCustomModel.AddRange(
                    //    lstFacilityStructure.Select(
                    //        item =>
                    //        new FacilityStructureCustomModel
                    //            {
                    //                FacilityStructureId = item.FacilityStructureId,
                    //                GlobalCodeID = item.GlobalCodeID,
                    //                FacilityStructureValue = item.FacilityStructureValue,
                    //                FacilityStructureName = item.FacilityStructureName,

                    //                // item.GlobalCodeID == 85 ?  item.FacilityStructureName +" "+bedRateCardBal.GetBedRateByBedTypeId(),
                    //                Description = item.Description,
                    //                ParentId = item.ParentId,
                    //                ParentTypeGlobalID = item.ParentTypeGlobalID,
                    //                FacilityId = item.FacilityId,
                    //                SortOrder = item.SortOrder,
                    //                IsActive = item.IsActive,
                    //                CreatedBy = item.CreatedBy,
                    //                CreatedDate = item.CreatedDate,
                    //                ModifiedBy = item.ModifiedBy,
                    //                ModifiedDate = item.ModifiedDate,
                    //                IsDeleted = item.IsDeleted,
                    //                DeletedBy = item.DeletedBy,
                    //                DeletedDate = item.DeletedDate,
                    //                ExternalValue1 = item.ExternalValue1,
                    //                ExternalValue2 = item.ExternalValue2,
                    //                ExternalValue3 = item.ExternalValue3,
                    //                //ExternalValue4 = item.ExternalValue4,
                    //                ExternalValue5 = item.ExternalValue5,

                    //                // GlobalCodeIdValue =
                    //                // globalBal.GetGlobalCodeByGlobalCodeId(
                    //                // Convert.ToInt32(item.GlobalCodeID)).GlobalCodeName,
                    //                GlobalCodeIdValue =
                    //                    GetNameByGlobalCodeId(
                    //                        Convert.ToInt32(item.GlobalCodeID)),
                    //                ParentIdValue =
                    //                    GetParentNameById(
                    //                        Convert.ToInt32(item.ParentId)),
                    //                FacilityName =
                    //                    GetFacilityByFacilityId(
                    //                        Convert.ToInt32(item.FacilityId)).FacilityName,
                    //                CanOverRideValue =
                    //                    item.GlobalCodeID == 85
                    //                    && !string.IsNullOrEmpty(item.ExternalValue1)
                    //                        ? "Yes"
                    //                        : "NO",
                    //                CanOverRide =
                    //                    item.GlobalCodeID == 85
                    //                    && !string.IsNullOrEmpty(item.ExternalValue1),
                    //                AvailableInOverRideList =
                    //                    item.GlobalCodeID == 85
                    //                    && !string.IsNullOrEmpty(item.ExternalValue2),
                    //                OverRidePriority =
                    //                    item.GlobalCodeID == 85
                    //                    && !string.IsNullOrEmpty(item.ExternalValue3)
                    //                        ? Convert.ToInt32(item.ExternalValue3)
                    //                        : 0,
                    //                RevenueGLAccount =
                    //                    item.GlobalCodeID == 83
                    //                        ? item.ExternalValue1
                    //                        : string.Empty,
                    //                ARMasterAccount =
                    //                    item.GlobalCodeID == 83
                    //                        ? item.ExternalValue2
                    //                        : string.Empty,
                    //                GridType =
                    //                    item.GlobalCodeID != null
                    //                        ? Convert.ToInt32(item.GlobalCodeID)
                    //                        : 0,
                    //                BedTypeName =
                    //                    GetNameByGlobalCodeValue(
                    //                        Convert.ToInt32(item.GlobalCodeID).ToString(),
                    //                        "1001"),
                    //                BedId =
                    //                    bedMasterbal.GetBedMasterIdByStructureId(
                    //                        item.FacilityStructureId),
                    //            }));


                    lstFacilityStructureCustomModel.AddRange(
                        lstFacilityStructure.Select(item => FacilityStructureMapper.MapModelToViewModel(item)));

                    lstFacilityStructureCustomModel =
                        lstFacilityStructureCustomModel.OrderBy(x => x.GlobalCodeID).ThenBy(x => x.SortOrder).ToList();

                    //if (structureId == 85)
                    //{
                    //    foreach (var item in lstFacilityStructureCustomModel)
                    //    {
                    //        using (var bmBal = new BedMasterBal())
                    //        {
                    //            var bedType = bmBal.GetBedMasterByStructureId(item.FacilityStructureId);
                    //            if (bedType != null)
                    //            {
                    //                using (var bedRateCardBal = new BedRateCardBal())
                    //                {
                    //                    var bedrate = bedRateCardBal.GetBedRateByBedTypeId(Convert.ToInt32(bedType.BedType));
                    //                    item.BedCharge = !string.IsNullOrEmpty(bedrate) ? bedrate : "0.00";
                    //                }
                    //            }
                    //            else
                    //                item.BedCharge = "0.00";
                    //        }
                    //    }
                    //}

                    return lstFacilityStructureCustomModel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the maximum sort order.
        /// </summary>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <param name="structureType">
        /// Type of the structure.
        /// </param>
        /// <returns>
        /// The <see cref="int"/>.
        /// </returns>
        public int GetMaxSortOrder(string facilityId, string structureType)
        {
            using (var rep = UnitOfWork.FacilityStructureRepository)
            {
                var sType = Convert.ToInt32(structureType);
                var result =
                    rep.Where(
                        f => f.FacilityId.Equals(facilityId) && f.GlobalCodeID != null && (int)f.GlobalCodeID == sType)
                        .Max(m => m.SortOrder);
                return result != null ? Convert.ToInt32(result) + 1 : 1;
            }
        }

        /// <summary>
        /// Gets the department rooms.
        /// </summary>
        /// <param name="deptId">The dept identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<FacilityStructure> GetDepartmentRooms(int deptId, string facilityId)
        {
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var roomTypes = Convert.ToInt32(BaseFacilityStucture.Rooms);
                var returnLst = facilityRep.Where(x => x.FacilityId == facilityId && x.GlobalCodeID == roomTypes && x.ParentId == deptId && x.IsDeleted == false)
                    .OrderBy(x => x.SortOrder).ToList();
                return returnLst;
            }
        }

        /// <summary>
        /// Gets the department appointment types.
        /// </summary>
        /// <param name="deptId">The dept identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
     
        #endregion

        #region Methods

        ///// <summary>
        ///// Finds the facility struture.
        ///// </summary>
        ///// <param name="facId">
        ///// The fac identifier.
        ///// </param>
        ///// <param name="floorid">
        ///// The floorid.
        ///// </param>
        ///// <param name="deptid">
        ///// The deptid.
        ///// </param>
        ///// <param name="roomid">
        ///// The roomid.
        ///// </param>
        ///// <returns>
        ///// The <see cref="List"/>.
        ///// </returns>
        //internal List<FacilityStructureCustomModel> FindFacilityStruture(int facId, int floorid, int deptid, int roomid)
        //{
        //    try
        //    {
        //        var returnLst = new List<FacilityStructureCustomModel>();
        //        var list = GetFacilityStructure(facId.ToString());

        //        /*
        //            * Owner: Amit Jain
        //            * On: 20102014
        //            * Purpose: Search should be according to the logged-in user's default facility
        //            */

        //        // Additions start here
        //        if (list.Count > 0)
        //        {
        //            if (roomid > 0)
        //            {
        //                returnLst.AddRange(list.Where(p => p.ParentId == roomid).ToList());
        //            }
        //        }

        //        returnLst = returnLst.Distinct().ToList();
        //        return returnLst.ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        ///// <summary>
        ///// Gets the bed parents.
        ///// </summary>
        ///// <param name="bedstrctureid">
        ///// The bedstrctureid.
        ///// </param>
        ///// <returns>
        ///// The <see cref="BedMasterStructureModel"/>.
        ///// </returns>
        //internal BedMasterStructureModel GetBedParents(int? bedstrctureid)
        //{
        //    var bedstrutureModel = new BedMasterStructureModel();
        //    var bedObj = GetFacilityStructureById(bedstrctureid);
        //    if (bedObj != null)
        //    {
        //        var roomId = GetFacilityStructureById(bedObj.ParentId);
        //        var roomName = GetParentNameById(Convert.ToInt32(bedObj.ParentId));

        //        var deptId = GetFacilityStructureById(roomId.ParentId);
        //        var deptName = GetParentNameById(Convert.ToInt32(roomId.ParentId));

        //        var floorId = GetFacilityStructureById(deptId.ParentId);
        //        var floorName = GetParentNameById(Convert.ToInt32(deptId.ParentId));
        //        bedstrutureModel.DeptId = deptId.ToString();
        //        bedstrutureModel.FloorId = floorId.ToString();
        //        bedstrutureModel.RoomId = roomId.ToString();
        //        bedstrutureModel.DeptName = deptName;
        //        bedstrutureModel.FloorName = floorName;
        //        bedstrutureModel.RoomName = roomName;
        //        bedstrutureModel.SearchSortOrder = floorId.SortOrder;
        //    }

        //    return bedstrutureModel;
        //}

        /// <summary>
        /// Gets the parent name by identifier.
        /// </summary>
        /// <param name="parentId">
        /// The parent identifier.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string GetParentNameById(int parentId)
        {
            using (var rep = UnitOfWork.FacilityStructureRepository)
            {
                var model = rep.Where(a => a.FacilityStructureId == parentId).FirstOrDefault();
                return (model != null) ? model.FacilityStructureName : string.Empty;
            }
        }


        public string GetParentNameByFacilityStructureId(int facilityStructureId)
        {
            var result = string.Empty;
            using (var rep = UnitOfWork.FacilityStructureRepository)
            {
                var model = rep.Where(x => x.FacilityStructureId == facilityStructureId).FirstOrDefault();
                if (model != null)
                {
                    var parent = rep.Where(m => m.FacilityStructureId == model.ParentId).FirstOrDefault();
                    if (parent != null)
                        result = parent.FacilityStructureName;
                }
            }
            return result;
        }

        public List<FacilityStructure> GetRoomsByFacilityId(string facilityid)
        {

            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {

                var departmentTypes = Convert.ToInt32(BaseFacilityStucture.Rooms);
                var returnLst = facilityRep.Where(
                    x => x.FacilityId == facilityid && x.GlobalCodeID == departmentTypes && x.IsDeleted == false)
                    .OrderByDescending(x => x.SortOrder)
                    .ToList();
                //returnLst.OrderByDescending(x => x.FacilityStructureName, new NumericComparer()).ToList();

                return returnLst;
            }
        }

        #endregion

    

        public List<FacilityStructureCustomModel> GetfacilityStructureData(int facilityId, int structureId, bool showIsActive)
        {
            var fList = new List<FacilityStructureCustomModel>();
            using (var fRep = UnitOfWork.FacilityStructureRepository)
            {
                fList = fRep.GetFacilityStructureData(facilityId, structureId, showIsActive).ToList();
                return fList;
            }
        }



        public List<DropdownListData> GetFacilityStructureListByParentId(int parentId)
        {
            var list = new List<DropdownListData>();

            using (var rep = UnitOfWork.FacilityStructureRepository)
            {
                var fsList =
                    rep.Where(f => f.GlobalCodeID == parentId && f.IsActive && f.IsDeleted != true).ToList();

                if (fsList.Any())
                {
                    list.AddRange(fsList.Select(item => new DropdownListData
                    {
                        Text = item.FacilityStructureName,
                        Value = Convert.ToString(item.FacilityStructureId)
                    }));
                }
            }
            return list;
        }



        /// <summary>
        /// Gets the facility rooms custom model.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public List<FacilityStructureRoomsCustomModel> GetFacilityRoomsCustomModel(int corporateid, string facilityid)
        {
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var roomTypes = Convert.ToInt32(BaseFacilityStucture.Rooms);
                var listToreturn = facilityRep.GetFacilityRoomsCustomModel(Convert.ToInt32(facilityid), roomTypes);
                return listToreturn;
            }
        }


        public List<DropdownListData> GetRevenueDepartments(int corporateid, string facilityid)
        {
            var list = new List<DropdownListData>();
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var departmentTypes = (int)BaseFacilityStucture.Department;
                var returnLst = facilityRep.Where(x => x.FacilityId == facilityid && !string.IsNullOrEmpty(x.ExternalValue1) && x.GlobalCodeID == departmentTypes && x.IsDeleted == false)
                    .OrderBy(x => x.SortOrder);

                if (returnLst.Any())
                {
                    list.AddRange(returnLst.Select(item => new DropdownListData
                    {
                        Value = item.ExternalValue1,
                        Text = item.ExternalValue1
                                                    + @" (Department Name :" + item.FacilityStructureName
                                                    + @" )",
                        ExternalValue1 = item.FacilityStructureName
                    }));
                }
                return list;
            }
        }


        public List<FacilityStructureRoomsCustomModel> GetFacilityRoomsByDepartments(int corporateid, string facilityid, string depIds, string roomIds)
        {
            using (var facilityRep = UnitOfWork.FacilityStructureRepository)
            {
                var roomTypes = Convert.ToInt32(BaseFacilityStucture.Rooms);
                var listToreturn = facilityRep.GetFacilityRoomsByDepartments(Convert.ToInt32(facilityid), roomTypes, depIds, roomIds);
                return listToreturn;
            }
        }

        public List<FacilityStructureCustomModel> GetAppointRoomAssignmentsList(int facilityId, string txtSearch)
        {
            using (var rep = UnitOfWork.FacilityStructureRepository)
            {
                #region Commented Code
                //var ffId = Convert.ToInt32(facilityId);
                //var fName = GetFacilityNameByFacilityId(ffId);
                //var allAppList = new List<AppointmentTypes>();

                //var parentIds = rep.Where(f =>
                //    f.FacilityId.Trim().Equals(facilityId) && f.IsActive && f.IsDeleted != true
                //    && (string.IsNullOrEmpty(txtSearch) || !string.IsNullOrEmpty(f.ExternalValue4))
                //    && f.GlobalCodeID == 84).Select(f1 => f1.ParentId).Distinct().ToList();

                //var depList = rep.Where(f => parentIds.Contains(f.FacilityStructureId)).Select(s => new DropdownListData
                //{
                //    Text = s.Description,
                //    SortOrder = s.ParentId
                //}).ToList();

                //using (var rep1 = UnitOfWork.AppointmentTypesRepository)
                //    allAppList =
                //        rep1.Where(f1 =>
                //                f1.FacilityId == ffId && f1.IsActive &&
                //                (string.IsNullOrEmpty(txtSearch) || f1.Description.Contains(txtSearch)))
                //            .ToList();


                //if (!string.IsNullOrEmpty(txtSearch))
                //{
                //    allAppList =
                //        allAppList.Where(f1 =>
                //                f1.FacilityId == ffId && f1.IsActive && f1.Description.Contains(txtSearch))
                //            .ToList();

                //    ll = rep.Where(f =>
                //        f.FacilityId.Trim().Equals(facilityId) && f.IsActive && f.IsDeleted != true
                //        && !string.IsNullOrEmpty(f.ExternalValue4)
                //        && f.ExternalValue4.Split(',').Select(int.Parse).Any(ff => allAppList.Any(dd => dd.Id == ff))
                //        && f.GlobalCodeID == 84).ToList()
                //        .Select(f =>
                //        {
                //            var appList = new List<AppointmentTypes>();
                //            if (!string.IsNullOrEmpty(f.ExternalValue4))
                //            {
                //                var appointmentTypeIds = f.ExternalValue4.Trim();
                //                if (!string.IsNullOrEmpty(appointmentTypeIds))
                //                {
                //                    var intList = appointmentTypeIds.Split(',').Select(int.Parse).ToList();
                //                    appList = allAppList.Where(a => intList.Contains(a.Id)).ToList();
                //                }
                //            }
                //            return new FacilityStructureCustomModel
                //            {
                //                AppointmentList = appList,
                //                FacilityStructureId = f.FacilityStructureId,
                //                FacilityStructureName = f.FacilityStructureName,
                //                FacilityId = facilityId,
                //                FacilityName = fName, //GetFacilityNameByFacilityId(Convert.ToInt32(item.FacilityId)),
                //                RoomDepartment =
                //                    f.ParentId.HasValue
                //                        ? depList.Where(p => depList.Any(a => a.SortOrder == f.ParentId))
                //                            .Select(x => x.Text)
                //                            .FirstOrDefault()
                //                        : string.Empty
                //            };
                //        }).OrderBy(f1 => f1.FacilityStructureName).ToList();
                //}
                //else
                //{
                //    ll = rep.Where(f =>
                //    f.FacilityId.Trim().Equals(facilityId) && f.IsActive && f.IsDeleted != true
                //    && (string.IsNullOrEmpty(txtSearch) || !string.IsNullOrEmpty(f.ExternalValue4))
                //    && f.GlobalCodeID == 84).ToList()
                //    .Select(f =>
                //    {
                //        var appList = new List<AppointmentTypes>();
                //        if (!string.IsNullOrEmpty(f.ExternalValue4))
                //        {
                //            var appointmentTypeIds = f.ExternalValue4.Trim();
                //            if (!string.IsNullOrEmpty(appointmentTypeIds))
                //            {
                //                var intList = appointmentTypeIds.Split(',').Select(int.Parse).ToList();
                //                appList = allAppList.Where(a => intList.Contains(a.Id)).ToList();
                //            }
                //        }
                //        return new FacilityStructureCustomModel
                //        {
                //            AppointmentList = appList,
                //            FacilityStructureId = f.FacilityStructureId,
                //            FacilityStructureName = f.FacilityStructureName,
                //            FacilityId = facilityId,
                //            FacilityName = fName, //GetFacilityNameByFacilityId(Convert.ToInt32(item.FacilityId)),
                //            RoomDepartment =
                //                f.ParentId.HasValue
                //                    ? depList.Where(p => depList.Any(a => a.SortOrder == f.ParentId))
                //                        .Select(x => x.Text)
                //                        .FirstOrDefault()
                //                    : string.Empty
                //        };
                //    }).OrderBy(f1 => f1.FacilityStructureName).ToList();
                //}
                #endregion
                var result = rep.GetAppointRoomAssignmentsList(facilityId, txtSearch);
                return result;
            }
        }
    }
}