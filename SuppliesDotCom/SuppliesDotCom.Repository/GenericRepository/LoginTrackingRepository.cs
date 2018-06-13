using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;


namespace SuppliesDotCom.Repository.GenericRepository
{
    public class LoginTrackingRepository : GenericRepository<LoginTracking>
    {
        private readonly DbContext _context;

        public LoginTrackingRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }


        /// <summary>
        /// Gets the login time day night wise report.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="fromDate">From date.</param>
        /// <param name="tillDate">The till date.</param>
        /// <returns></returns>
        public List<LoginActivityReportCustomModel> GetLoginTimeDayNightWiseReport(int corporateId, int facilityId, DateTime? fromDate, DateTime? tillDate, int userId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pCorporateID,@pFacilityID, @pFromDate ,@pTillDate, @pUserId", StoredProcedures.SPROC_Get_REP_LoginTimeDayNightWise);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("pCorporateID", corporateId);
                    sqlParameters[1] = new SqlParameter("pFacilityID", facilityId);
                    sqlParameters[2] = new SqlParameter("pFromDate", SqlDbType.VarChar);
                    sqlParameters[2].Value = (fromDate != null) ? fromDate.Value.ToString("yyyy-MM-dd HH:mm:ss") : sqlParameters[2].Value = null;
                    sqlParameters[3] = new SqlParameter("pTillDate", SqlDbType.VarChar);
                    sqlParameters[3].Value = (tillDate != null) ? tillDate.Value.ToString("yyyy-MM-dd HH:mm:ss") : sqlParameters[3].Value = null;
                    sqlParameters[4] = new SqlParameter("pUserId", userId);
                    IEnumerable<LoginActivityReportCustomModel> result = _context.Database.SqlQuery<LoginActivityReportCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Users the login activity.
        /// </summary>
        /// <param name="fromDate">From date.</param>
        /// <param name="tillDate">The till date.</param>
        /// <param name="userId">The user identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<LoginTrackingCustomModel> UserLoginActivity_SP(DateTime? fromDate, DateTime? tillDate, int userId, int corporateId, int facilityId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @lDateFrom,@lDateTill,@lUserId,@lCId,@lFId", StoredProcedures.SPROC_REP_UserActivityLog);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("lDateFrom", SqlDbType.VarChar);
                    sqlParameters[0].Value = (fromDate != null) ? fromDate.Value.ToString("yyyy-MM-dd HH:mm:ss") : sqlParameters[0].Value = null;
                    sqlParameters[1] = new SqlParameter("lDateTill", SqlDbType.VarChar);
                    sqlParameters[1].Value = (tillDate != null) ? tillDate.Value.ToString("yyyy-MM-dd HH:mm:ss") : sqlParameters[1].Value = null;
                    sqlParameters[2] = new SqlParameter("lUserId", userId);
                    sqlParameters[3] = new SqlParameter("lCId", corporateId);
                    sqlParameters[4] = new SqlParameter("lFId", facilityId);
                    IEnumerable<LoginTrackingCustomModel> result = _context.Database.SqlQuery<LoginTrackingCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
