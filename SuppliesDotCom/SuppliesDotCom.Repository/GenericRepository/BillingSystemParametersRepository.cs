using System;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using System.Data.Entity;
using System.Data.SqlClient;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class BillingSystemParametersRepository : GenericRepository<BillingSystemParameters>
    {
        private readonly DbContext _context;

        public BillingSystemParametersRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        /// <summary>
        /// us the pdate dashboard indicators data.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityNumber"></param>
        /// <param name="SuppliesDotComParameters"></param>
        /// <returns></returns>
        public bool UpdateTableNumberInAllBillingCodes(int corporateid, string facilityNumber, string SuppliesDotComParametersId, string oldCPT, string oldServiceCode, string oldDrugCode, string oldDrgCode, string oldHCPCSCode, string oldDiagnosisCode)
        {
            if (_context != null)
            {
                var spName = string.Format("EXEC {0} @CorporateId,@FacilityNumber,@SuppliesDotComParametersId,@OldCPTCode,@OldServiceCode,@OldDrugCode,@OldDrgCode,@OldHCPCSCode,@OldDiagnosisCode ", StoredProcedures.SPROC_UpdateTableNumberInBillingCodes.ToString());
                var sqlParameters = new SqlParameter[9];
                sqlParameters[0] = new SqlParameter("CorporateId", corporateid);
                sqlParameters[1] = new SqlParameter("FacilityNumber", facilityNumber);
                sqlParameters[2] = new SqlParameter("SuppliesDotComParametersId", SuppliesDotComParametersId);
                sqlParameters[3] = new SqlParameter("OldCPTCode", oldCPT ?? "");
                sqlParameters[4] = new SqlParameter("OldServiceCode", oldServiceCode ?? "");
                sqlParameters[5] = new SqlParameter("OldDrugCode", oldDrugCode ?? "");
                sqlParameters[6] = new SqlParameter("OldDrgCode", oldDrgCode ?? "");
                sqlParameters[7] = new SqlParameter("OldHCPCSCode", oldHCPCSCode ?? "");
                sqlParameters[8] = new SqlParameter("OldDiagnosisCode", oldDiagnosisCode ?? "");
                ExecuteCommand(spName, sqlParameters);
                return true;
            }
            return false;
        }

        public BillingSystemParameters GetDetailsBySuppliesDotComParametersId(int SuppliesDotComParametersId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pSuppliesDotComParametersId", StoredProcedures.SPROC_GetDetailsByBillingSystemParametersId.ToString());
                    var sqlParameters = new SqlParameter[1];
                    sqlParameters[0] = new SqlParameter("pSuppliesDotComParametersId", SuppliesDotComParametersId);
                    BillingSystemParameters result = _context.Database.SqlQuery<BillingSystemParameters>(spName, sqlParameters).FirstOrDefault();
                    return result;
                }
            }
            catch (Exception )
            {
                
            }
            return null;
        }
    }
}
