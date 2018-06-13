using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class FacilityRepository: GenericRepository<Facility>
    {
        private readonly DbContext _context;
        public FacilityRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }
        public bool DeleteFacilityData(string facilityId)
        {
            try
            {
                if (_context != null)
                {
                    //var spName = string.Format("EXEC {0} @CID, @IndicatorNumber,@CurrentYear,@SubCategory1,@SubCategory2 ", StoredProcedures.SPROC_SaveIndicatorDataAfterNewIndicator);
                    var spName = string.Format("EXEC {0} @pFacilityId ", StoredProcedures.SPROC_DeleteFacilityData);
                    var sqlParameters = new SqlParameter[1];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }


        public void CreateDefaultFacilityItems(int facilityId, string facilityName, int createdBy)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @aFacilityID, @aFacilityName, @aCreatedBy", StoredProcedures.SPROC_DefaultFacilityItems);
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("aFacilityID", facilityId);
                    sqlParameters[1] = new SqlParameter("aFacilityName", facilityName);
                    sqlParameters[2] = new SqlParameter("aCreatedBy", createdBy);
                    ExecuteCommand(spName, sqlParameters);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
