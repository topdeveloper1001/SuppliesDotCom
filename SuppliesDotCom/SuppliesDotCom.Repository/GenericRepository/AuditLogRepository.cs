// --------------------------------------------------------------------------------------------------------------------
// <copyright company="Spadez" file="AuditLogRepository.cs">
//   Omnihealthcare
// </copyright>
// <summary>
//   The audit log repository.
// </summary>
// 
// --------------------------------------------------------------------------------------------------------------------
namespace SuppliesDotCom.Repository.GenericRepository
{
    #region

    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.SqlClient;
    using System.Linq;

    using SuppliesDotCom.Common.Common;
    using SuppliesDotCom.Model;
    using SuppliesDotCom.Model.CustomModel;

    #endregion

    /// <summary>
    ///     The audit log repository.
    /// </summary>
    public class AuditLogRepository : GenericRepository<AuditLog>
    {
        #region Fields

        /// <summary>
        ///     The _context.
        /// </summary>
        private readonly DbContext _context;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="AuditLogRepository"/> class.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        public AuditLogRepository(BillingEntities context)
            : base(context)
        {
            this.AutoSave = true;
            this._context = context;
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// Gets the password changes log.
        /// </summary>
        /// <param name="fromDate">
        /// From date.
        /// </param>
        /// <param name="tillDate">
        /// The till date.
        /// </param>
        /// <param name="isAll">
        /// if set to <c> true </c> [is all].
        /// </param>
        /// <param name="corporateId">
        /// The corporate identifier.
        /// </param>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<AuditLogCustomModel> GetPasswordChangesLog(
            DateTime fromDate, 
            DateTime tillDate, 
            bool isAll, 
            int corporateId, 
            int facilityId)
        {
            try
            {
                if (this._context != null)
                {
                    string spName = string.Format(
                        "EXEC {0} @lDateFrom, @lDateTill,@lCID,@lFID", 
                        StoredProcedures.SPROC_REP_PasswordChangelog);
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("lDateFrom", fromDate);
                    sqlParameters[1] = new SqlParameter("lDateTill", tillDate);
                    sqlParameters[2] = new SqlParameter("lCID", corporateId);
                    sqlParameters[3] = new SqlParameter("lFID", facilityId);
                    IEnumerable<AuditLogCustomModel> result =
                        this._context.Database.SqlQuery<AuditLogCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return null;
        }

        /// <summary>
        /// Gets the password disable log.
        /// </summary>
        /// <param name="fromDate">
        /// From date.
        /// </param>
        /// <param name="tillDate">
        /// The till date.
        /// </param>
        /// <param name="isAll">
        /// if set to <c> true </c> [is all].
        /// </param>
        /// <param name="corporateId">
        /// The corporate identifier.
        /// </param>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<AuditLogCustomModel> GetPasswordDisableLog(
            DateTime fromDate, 
            DateTime tillDate, 
            bool isAll, 
            int corporateId, 
            int facilityId)
        {
            try
            {
                if (this._context != null)
                {
                    string spName = string.Format(
                        "EXEC {0} @lDateFrom, @lDateTill,@lCID,@lFID", 
                        StoredProcedures.SPROC_REP_PasswordDisablelog);
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("lDateFrom", fromDate);
                    sqlParameters[1] = new SqlParameter("lDateTill", tillDate);
                    sqlParameters[2] = new SqlParameter("lCID", corporateId);
                    sqlParameters[3] = new SqlParameter("lFID", facilityId);
                    IEnumerable<AuditLogCustomModel> result =
                        this._context.Database.SqlQuery<AuditLogCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return null;
        }

        #endregion
    }
}