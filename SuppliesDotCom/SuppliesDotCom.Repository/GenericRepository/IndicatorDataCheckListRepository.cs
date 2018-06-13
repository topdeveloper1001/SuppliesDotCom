using System;
using System.Data.Entity;
using System.Data.SqlClient;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class IndicatorDataCheckListRepository : GenericRepository<IndicatorDataCheckList>
    {
        private readonly DbContext _context;
        public IndicatorDataCheckListRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }
        public bool DeleteIndicatorDataCheckList(string corporateId, string facilityId, int budgetType, int year, int month)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CorporateId, @FacilityId,@Year,@BudgetType ", StoredProcedures.SPROC_DeleteIndicatorDataCheckList);
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("CorporateId", corporateId);
                    sqlParameters[1] = new SqlParameter("FacilityId", facilityId);
                    sqlParameters[2] = new SqlParameter("Year", year);
                    sqlParameters[3] = new SqlParameter("BudgetType", budgetType);
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
    }
}
