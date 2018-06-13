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
    public class DashboardTransactionCounterRepository : GenericRepository<DashboardTransactionCounter>
    {

        private readonly DbContext _context;
        public DashboardTransactionCounterRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        /// <summary>
        /// Gets the charges report.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="fromdate">The fromdate.</param>
        /// <param name="tillDate">The till date.</param>
        /// <param name="displayall">if set to <c>true</c> [displayall].</param>
        /// <param name="type">The type.</param>
        /// <param name="departmentName">Name of the department.</param>
        /// <returns></returns>
        public List<ChargesReportCustomModel> GetChargesReport(int corporateId, int facilityId, DateTime? fromdate, DateTime? tillDate,
            bool displayall, int type, decimal? departmentName)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pCorporateId, @pFacilityId,@pReportType,@pFromDate,@pTillDate,@pDepartmentNumber", StoredProcedures.SPROC_Get_REP_ChargeReport);
                    var sqlParameters = new SqlParameter[6];
                    sqlParameters[0] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[1] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[2] = new SqlParameter("pReportType", type);
                    sqlParameters[3] = new SqlParameter("pFromDate", fromdate);
                    sqlParameters[4] = new SqlParameter("pTillDate", tillDate);
                    sqlParameters[5] = new SqlParameter("pDepartmentNumber", departmentName);
                    var result = _context.Database.SqlQuery<ChargesReportCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }

        //SPROC_GET_REP_CHargeReportDetails
        /// <summary>
        /// Gets the charges detail report.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="fromdate">The fromdate.</param>
        /// <param name="tillDate">The till date.</param>
        /// <param name="displayall">if set to <c>true</c> [displayall].</param>
        /// <param name="type">The type.</param>
        /// <param name="departmentName">Name of the department.</param>
        /// <param name="payorId"></param>
        /// <returns></returns>
        public List<ChargesReportCustomModel> GetChargesDetailReport(int corporateId, int facilityId, DateTime? fromdate, DateTime? tillDate,
            bool displayall, int type, decimal? departmentName, int payorId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pCorporateId, @pFacilityId,@pReportType,@pFromDate,@pTillDate,@pDepartmentNumber,@pPayorId", StoredProcedures.SPROC_GET_REP_CHargeReportDetails);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[1] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[2] = new SqlParameter("pReportType", type);
                    sqlParameters[3] = new SqlParameter("pFromDate", fromdate);
                    sqlParameters[4] = new SqlParameter("pTillDate", tillDate);
                    sqlParameters[5] = new SqlParameter("pDepartmentNumber", departmentName);
                    sqlParameters[6] = new SqlParameter("pPayorId", payorId);
                    var result = _context.Database.SqlQuery<ChargesReportCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }




        public List<DashboardTransactionCounterCustomModel> GetDashboardTransactionCounter(int corporateId, int facilityId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @Corporateid,@FacilityId", StoredProcedures.SPORC_GetDashboardTransactionCounterData);
                    var sqlParameters = new SqlParameter[2];
                    sqlParameters[0] = new SqlParameter("Corporateid", corporateId);
                    sqlParameters[1] = new SqlParameter("FacilityId", facilityId);
                    var result = _context.Database.SqlQuery<DashboardTransactionCounterCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }


    }
}
