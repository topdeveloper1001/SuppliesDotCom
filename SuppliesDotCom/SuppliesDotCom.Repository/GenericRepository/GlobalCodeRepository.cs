// --------------------------------------------------------------------------------------------------------------------
// <copyright file="GlobalCodeRepository.cs" company="Spadez">
//   Omnihealthcare
// </copyright>
// <summary>
//   The global code repository.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Repository.GenericRepository
{
    using System;
    using System.Data;
    using System.Data.Entity;
    using System.Data.SqlClient;
    using SuppliesDotCom.Common.Common;
    using SuppliesDotCom.Model;
    using System.Collections.Generic;
    using SuppliesDotCom.Model.CustomModel;
    using System.Linq;
    using SuppliesDotCom.Repository.Common;

    /// <summary>
    /// The global code repository.
    /// </summary>
    public class GlobalCodeRepository : GenericRepository<GlobalCodes>
    {
        #region Fields

        /// <summary>
        /// The _context.
        /// </summary>
        private readonly DbContext _context;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="GlobalCodeRepository"/> class.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        public GlobalCodeRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// The create order activity scheduler timming.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        public bool CreateOrderActivitySchedulerTimming(int id)
        {
            try
            {
                if (_context != null)
                {
                    string spName = string.Format(
                        "EXEC {0} @GlobalCodeId",
                        StoredProcedures.SPROC_CreateOpenOrderActivityTimeForFrequency);
                    var sqlParameters = new SqlParameter[1];
                    sqlParameters[0] = new SqlParameter("GlobalCodeId", id);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception)
            {
                // throw ex;
            }

            return false;
        }

        /// <summary>
        /// Gets the global codes by categories_ sp.
        /// </summary>
        /// <param name="gccValues">The GCC values.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetGlobalCodesByCategoriesSp(string gccValues)
        {
            try
            {
                if (_context != null)
                {
                    string spName = string.Format("EXEC {0} @pGCC", StoredProcedures.SPROC_GetGlobalCodesByCategories);
                    var sqlParameters = new SqlParameter[1];
                    sqlParameters[0] = new SqlParameter("pGCC", gccValues);
                    IEnumerable<GlobalCodes> result =
                        _context.Database.SqlQuery<GlobalCodes>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception)
            {
                // throw ex;
            }
            return new List<GlobalCodes>();
        }


        public List<GlobalCodeCustomModel> GetGlobalCodesByCategory(string categoryValue, long corporateId, long facilityId, long userId, long id, out long newId, bool listStatus, bool isFacilityPassed = false)
        {
            newId = 0;
            var list = new List<GlobalCodeCustomModel>();
            var sqlParameters = new SqlParameter[7];
            sqlParameters[0] = new SqlParameter("pCategoryValue", categoryValue);
            sqlParameters[1] = new SqlParameter("pFId", facilityId);
            sqlParameters[2] = new SqlParameter("pCId", corporateId);
            sqlParameters[3] = new SqlParameter("pUId", userId);
            sqlParameters[4] = new SqlParameter("pId", id);
            sqlParameters[5] = new SqlParameter("pFacilitySpecific", isFacilityPassed);
            sqlParameters[6] = new SqlParameter("pStatus", listStatus);
            using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocGetGlobalCodesByCategory.ToString(), isCompiled: false, parameters: sqlParameters))
            {
                var codes = r.ResultSetFor<GlobalCodes>().ToList();
                var globalCodeName = r.ResultSetFor<string>().FirstOrDefault();
                var unitOfMeasures = new List<GlobalCodeCustomModel>();

                //Get the New Global Code Value for the new record to be added in the table.
                var value = r.ResultSetFor<long?>().FirstOrDefault();

                newId = value.HasValue ? value.Value : 1;

                //Check if there is a list of UnitOfMeasures
                if (codes.Any(a => !string.IsNullOrEmpty(a.ExternalValue3)))
                    unitOfMeasures = r.ResultSetFor<GlobalCodeCustomModel>().ToList();

                foreach (var c in codes)
                {
                    var um = string.Empty;
                    if (unitOfMeasures.Any())
                        um = unitOfMeasures.Where(m => m.GcId == c.GlobalCodeID).FirstOrDefault().UnitOfMeasure;

                    list.Add(new GlobalCodeCustomModel
                    {
                        GlobalCodes = c,
                        GlobalCodeCustomValue = globalCodeName,
                        UnitOfMeasure = um
                    });
                }
            }
            return list;
        }

        #endregion
    }
}