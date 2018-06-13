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
    public class DashboardParametersRepository : GenericRepository<DashboardParameters>
    {
        private readonly DbContext _context;
        public DashboardParametersRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }


        /// <summary>
        /// Gets the parameters list by dashboard.
        /// </summary>
        /// <param name="corpoarteId">The corpoarte identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="dashboardtype">The dashboardtype.</param>
        /// <returns></returns>
        public List<DashboardParametersRangeCustomModel> GetParametersListByDashboard(int corpoarteId, int facilityId, string dashboardtype)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pCID, @pFID, @pDashboardType", StoredProcedures.GetDashboardParameters.ToString());
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("pCID", corpoarteId);
                    sqlParameters[1] = new SqlParameter("pFID", facilityId);
                    sqlParameters[2] = new SqlParameter("pDashboardType", dashboardtype);
                    IEnumerable<DashboardParametersRangeCustomModel> result = _context.Database.SqlQuery<DashboardParametersRangeCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception )
            {

            }
            return null;
        }
    }
}
