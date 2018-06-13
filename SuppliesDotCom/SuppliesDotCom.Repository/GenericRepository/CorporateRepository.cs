using System;
using System.Data.Entity;
using System.Data.SqlClient;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class CorporateRepository : GenericRepository<Corporate>
    {
        private readonly DbContext _context;
        public CorporateRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        /// <summary>
        /// Deletes the corporate data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public bool DeleteCorporateData(string corporateId)
        {
            try
            {
                if (_context != null)
                {
                    //var spName = string.Format("EXEC {0} @CID, @IndicatorNumber,@CurrentYear,@SubCategory1,@SubCategory2 ", StoredProcedures.SPROC_SaveIndicatorDataAfterNewIndicator);
                    //var spName = string.Format("EXEC {0} @pCorporateId ", StoredProcedures.SPROC_DeleteCorporateData);
                    var spName = string.Format("EXEC {0} @CId", StoredProcedures.CleanupAllDataByCorporate);
                    var sqlParameters = new SqlParameter[1];
                    sqlParameters[0] = new SqlParameter("CId", corporateId);
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

        public void CreateDefaultCorporateItem(int corporateId, string facilityName)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @aCorporateID, @aCorporateName ", StoredProcedures.SPROC_DefaultCorporateItems);
                    var sqlParameters = new SqlParameter[2];
                    sqlParameters[0] = new SqlParameter("aCorporateID", corporateId);
                    sqlParameters[1] = new SqlParameter("aCorporateName", facilityName);
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
