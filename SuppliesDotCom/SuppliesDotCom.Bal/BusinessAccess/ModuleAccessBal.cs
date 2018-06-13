using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class ModuleAccessBal : BaseBal
    {
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<ModuleAccess> GetModuleAccess()
        {
            try
            {
                using (var moduleAccessRep = UnitOfWork.ModuleAccessRepository)
                {
                    var lstModuleAccess = moduleAccessRep.Where(a => a.IsDeleted != false).ToList();
                    return lstModuleAccess;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="moduleAccess"></param>
        /// <returns></returns>
        public int DeleteEntry(ModuleAccess moduleAccess)
        {
            using (var moduleAccessRep = UnitOfWork.ModuleAccessRepository)
            {
                if (moduleAccess.ModuleAccessID > 0)
                    moduleAccessRep.UpdateEntity(moduleAccess, moduleAccess.ModuleAccessID);
                else
                    moduleAccessRep.Create(moduleAccess);
                return moduleAccess.ModuleAccessID;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="shared"></param>
        /// <param name="moduleAccessId"></param>
        /// <returns></returns>
        public ModuleAccess GetModuleAccessByID(int? moduleAccessId)
        {
            using (var moduleAccessRep = UnitOfWork.ModuleAccessRepository)
            {
                var moduleAccess = moduleAccessRep.Where(x => x.ModuleAccessID == moduleAccessId).FirstOrDefault();
                return moduleAccess;
            }
        }

        /// <summary>
        /// Gets the modules access list.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public List<ModuleAccess> GetModulesAccessList(int corporateId, int? facilityid)
        {
            try
            {
                using (var moduleAccessRep = UnitOfWork.ModuleAccessRepository)
                {
                    var list = moduleAccessRep.Where(rp => rp.CorporateID == corporateId).ToList();
                    if (facilityid != 0)
                    {
                        if (list.Any(fc => fc.FacilityID == facilityid))
                            list = list.Where(fc => fc.FacilityID == facilityid).ToList();
                    }
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Method is used to add update the module access
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="corporateid"></param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public int Save(DataTable dt, int corporateid, int facilityId, DateTime? currentDate, int loggedinUserId = 0)
        {
            int retVal;
            using (var rep = UnitOfWork.ModuleAccessRepository)
                retVal = rep.SaveEntry(dt, corporateid, facilityId, currentDate, loggedinUserId);

            return retVal;
        }
    }
}

