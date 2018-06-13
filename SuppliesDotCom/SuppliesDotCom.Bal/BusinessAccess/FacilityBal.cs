using System;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Common.Common;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class FacilityBal : BaseBal
    {
        private FacilityMapper FacilityMapper { get; set; }

        public FacilityBal()
        {
            FacilityMapper = new FacilityMapper();
        }

        /// <summary>
        /// Get the facilities
        /// </summary>
        /// <returns>Return the Facility View Model</returns>
        public List<Facility> GetFacilities(int corporateId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var list =
                     facilityRep.Where(
                         f => !f.IsDeleted && f.IsActive && (f.CorporateID == corporateId || corporateId == 0) && f.CorporateID != null)
                         .Include(f => f.Country)
                         .OrderBy(x => x.FacilityName)
                         .ToList();
                return list;
            }
        }

        /// <summary>
        /// Gets the facilities.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<Facility> GetFacilities(int corporateId, int facilityId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                if (facilityId > 0)
                {
                    var list = facilityRep.Where(f => !f.IsDeleted && f.IsActive && f.FacilityId == facilityId
                                                      && f.CorporateID != null &&
                                                      (corporateId == 0 || f.CorporateID == corporateId)
                        ).Include(f => f.Country).ToList();
                    return list;
                }
                return GetFacilities(corporateId);
            }
        }

        /// <summary>
        /// Gets the facility name by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public string GetFacilityNameById(int id)
        {
            var facility = GetFacilityByFacilityId(id);
            return (facility != null) ? facility.FacilityName : string.Empty;
        }

        /// <summary>
        /// Method to add/Update the facility in the database.
        /// </summary>
        /// <param name="facility"></param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public List<FacilityCustomModel> AddUpdateFacility(Facility facility, out int facilityId)
        {
            facilityId = 0;
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                if (facility.FacilityId > 0)
                {
                    var current = facilityRep.GetSingle(facility.FacilityId);
                    facility.CreatedBy = current.CreatedBy;
                    facility.CreatedDate = current.CreatedDate;
                    facility.LoggedInID = current.LoggedInID;
                    facilityRep.UpdateEntity(facility, facility.FacilityId);
                }
                else
                    facilityRep.Create(facility);
                facilityId = facility.FacilityId;

                var list = GetFacilityList(Convert.ToInt32(facility.CorporateID));
                return list;
            }
        }



        /// <summary>
        /// Method to add the facility in the database.
        /// </summary>
        /// <returns></returns>
        public Facility GetFacilityById(int id)
        {
            return GetFacilityByFacilityId(id);
        }

        //function to validate facility number and Licence number
        /// <summary>
        /// Validates the facility number license number.
        /// </summary>
        /// <param name="facilityNumber">The facility number.</param>
        /// <param name="lic">The facility license number.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public int CheckDuplicateFacilityNoAndLicenseNo(string facilityNumber, string lic, int id, int corporateId)
        {
            int result = 0;
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {

                //var facilityModelIfFacilityNumberLicenseNumberMatch =
                //    facilityRep.Where(
                //        x =>
                //            x.FacilityId != id && x.FacilityNumber.Equals(facilityNumber) &&
                //            x.FacilityLicenseNumber.Equals(facilityLicenseNumber) && x.IsDeleted != true)
                //        .FirstOrDefault() != null;
                //if (facilityModelIfFacilityNumberLicenseNumberMatch)
                //    result = 1;//1 means facility number and License number matched

                //var facilityModelIfFacilityNumberMatch =
                //    facilityRep.Where(
                //        x => x.FacilityId != id && x.FacilityNumber.Equals(facilityNumber) && x.IsDeleted != true)
                //        .FirstOrDefault() != null;

                //if (facilityModelIfFacilityNumberMatch)
                //    result = 2;//2 means facility number matched

                //var facilityModelIfLicenseNumberMatch =
                //    facilityRep.Where(
                //        x =>
                //            x.FacilityId != id && x.FacilityLicenseNumber.Equals(facilityLicenseNumber) &&
                //            x.IsDeleted != true).FirstOrDefault() != null;
                //if (facilityModelIfLicenseNumberMatch)
                //    result = 3;//3 means License number matched

                var isFNumberAndLicSame =
                    facilityRep.Where(
                        f =>
                            f.FacilityNumber.Equals(facilityNumber) && f.CorporateID == corporateId &&
                            f.FacilityLicenseNumber.Equals(lic) && (id == 0 || f.FacilityId != id) && f.IsActive && !f.IsDeleted)
                        .Any();
                if (isFNumberAndLicSame)
                    result = 1;                 //1 means facility number and License number matched



                var isfacNumberSame = facilityRep.Where(
                    f => f.FacilityNumber.Equals(facilityNumber) && f.CorporateID == corporateId && (id == 0 || f.FacilityId != id) && f.IsActive &&
                         !f.IsDeleted).Any();
                if (isfacNumberSame)
                    result = 2;                 //2 means facility number matched


                var isLicSame =
                    facilityRep.Where(
                        x =>
                            (id == 0 || x.FacilityId != id) && x.FacilityLicenseNumber.Equals(lic) &&
                            x.CorporateID == corporateId &&
                            x.IsDeleted != true).Any();

                if (isLicSame)
                    result = 3;//3 means License number matched
            }
            return result;
        }

        /// <summary>
        /// Gets the facilities by corporate identifier.
        /// </summary>
        /// <param name="corpId">The corp identifier.</param>
        /// <returns></returns>
        public List<Facility> GetFacilitiesByCorporateId(int corpId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var list = facilityRep.Where(f => !f.IsDeleted && f.IsActive && f.CorporateID != null && f.CorporateID == corpId).ToList();
                return list;
            }
        }

        /// <summary>
        /// Get the facilities
        /// </summary>
        /// <returns>Return the Facility View Model</returns>
        public List<Facility> GetFacilitiesByRoles(int facilityId, int corporateId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var list = facilityRep.GetAll().Where(f => !f.IsDeleted && f.IsActive
                                                           // && f.FacilityId == facilityId 
                                                           && f.CorporateID == corporateId).ToList();
                return list;
            }
        }

        /// <summary>
        /// Gets the facilities by corporate identifier without countries.
        /// </summary>
        /// <param name="corpId">The corp identifier.</param>
        /// <returns></returns>
        public List<Facility> GetFacilitiesByCorporateIdWithoutCountries(int corpId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var list = facilityRep.Where(f => !f.IsDeleted && f.IsActive && f.CorporateID == corpId).ToList();
                return list;
            }
        }

        /// <summary>
        /// Gets the facility number by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public string GetFacilityNumberById(int id)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var facility = facilityRep.Where(a => a.FacilityId == id).FirstOrDefault();
                return (facility != null) ? facility.FacilityNumber : string.Empty;
            }
        }

        /// <summary>
        /// Gets the facility time zone by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public string GetFacilityTimeZoneById(int id)
        {
            var facilitytimeZone = TimeZoneInfo.Utc.ToString();
            if (id <= 0) return facilitytimeZone;
            var facilityobj = GetFacilityByFacilityId(id);
            if (facilityobj != null)
                facilitytimeZone = string.IsNullOrEmpty(facilityobj.FacilityTimeZone)
                    ? TimeZoneInfo.Utc.ToString()
                    : facilityobj.FacilityTimeZone;
            return facilitytimeZone;
        }

        /// <summary>
        /// Gets the facilities by corpoarte identifier.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public IEnumerable<Facility> GetFacilitiesByCorpoarteId(int corporateId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var list = facilityRep.GetAll()
                    .Include(f => f.Country)
                    .Where(
                        f => !f.IsDeleted && f.IsActive && f.CorporateID == corporateId && f.CorporateID != null)
                    .ToList();
                return list;
            }
        }

        public List<FacilityCustomModel> GetFacilityList(int corporateId)
        {
            var list = new List<FacilityCustomModel>();
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var facilities = corporateId > 0
                    ? facilityRep.Where(
                        f => !f.IsDeleted && f.IsActive && f.CorporateID == corporateId && f.CorporateID != null)
                        .Include(c => c.Country)
                        .ToList()
                    : facilityRep.Where(f => !f.IsDeleted && f.IsActive).Include(f => f.Country).ToList();
                if (facilities.Count > 0)
                    list.AddRange(facilities.Select(item => FacilityMapper.MapModelToViewModel(item)));
            }
            return list;
        }

        /// <summary>
        /// Get the facilities
        /// </summary>
        /// <returns>Return the Facility View Model</returns>
        public List<Facility> GetFacilitiesWithoutCorporateFacility(int corporateId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var list = corporateId > 0
                    ? facilityRep.GetAll()
                        .Include(f => f.Country)
                        .Where(
                            f => !f.IsDeleted && f.IsActive && f.CorporateID == corporateId && f.CorporateID != null && f.LoggedInID != 1)
                        .ToList().OrderBy(x => x.FacilityName).ToList()
                    : facilityRep.GetAll().Include(f => f.Country).Where(f => !f.IsDeleted && f.IsActive).ToList().OrderBy(x => x.FacilityName).ToList();
                return list;
            }
        }

        /// <summary>
        /// Gets the facilities.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public IEnumerable<Facility> GetFacilitiesWithoutCorporateFacility(int corporateId, int facilityId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                if (facilityId > 0)
                {
                    var list = corporateId == 0
                        ? facilityRep.Where(
                            f =>
                                !f.IsDeleted && f.IsActive &&
                                f.FacilityId == facilityId &&
                                f.CorporateID != null && f.LoggedInID != 1)
                            .Include(f => f.Country)
                            .OrderBy(x => x.FacilityName)
                            .ToList()
                        : facilityRep.Where(
                            f =>
                                !f.IsDeleted && f.IsActive && f.CorporateID == corporateId &&
                                f.FacilityId == facilityId &&
                                f.CorporateID != null && f.LoggedInID == 1)
                            .Include(f => f.Country)
                            .OrderBy(x => x.FacilityName)
                            .ToList();
                    return list;
                }
                return GetFacilities(corporateId);
            }
        }



        public bool DeleteFacilityData(string facilityId)
        {
            return UnitOfWork.FacilityRepository.DeleteFacilityData(facilityId);
        }

        public List<DropdownListData> GetFacilitiesForDashboards(int facilityId, int corporateId, bool userIsAdmin)
        {
            var list = new List<DropdownListData>();
            using (var rep = UnitOfWork.FacilityRepository)
            {
                var facilities =
                    rep.Where(
                        f =>
                            f.IsActive && f.IsDeleted == false && ((corporateId > 0 && f.CorporateID == corporateId) || corporateId == 0) &&
                            ((!userIsAdmin && corporateId != 0 && f.FacilityId == facilityId) || (userIsAdmin && f.LoggedInID != 1))).ToList();

                list.AddRange(facilities.Select(item => new DropdownListData
                {
                    Text = item.FacilityName,
                    Value = Convert.ToString(item.FacilityId)
                }));
            }
            return list;
        }


        private IEnumerable<Facility> GetFacilityListByCorporateId(int corporateId, int facilityId)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                if (corporateId == 0)
                    facilityId = 0;

                if (facilityId > 0)
                {
                    var list =
                        facilityRep.Where(
                            f =>
                                f.IsActive && !f.IsDeleted &&
                                (corporateId == 0 || f.CorporateID == corporateId) &&
                                (facilityId == 0 || f.FacilityId == facilityId)).ToList();
                    return list;
                }
                return GetFacilities(corporateId);
            }
        }


        public List<DropdownListData> GetFacilityDropdownData(int corporateId, int facilityId)
        {
            var list = new List<DropdownListData>();
            var facilities = GetFacilityListByCorporateId(corporateId, facilityId);
            list.AddRange(facilities.Select(item => new DropdownListData
            {
                Text = item.FacilityName,
                Value = Convert.ToString(item.FacilityId)
            }));
            return list;
        }


        public void CreateDefaultFacilityItems(int fId, string fName, int userId)
        {
            using (var rep = UnitOfWork.FacilityRepository)
            {
                rep.CreateDefaultFacilityItems(fId, fName, userId);
            }
        }

    }
}
