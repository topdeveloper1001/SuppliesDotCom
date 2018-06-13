using System;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class RoleTabsRepository : GenericRepository<RoleTabs>
    {
        private readonly DbContext _context;
        public RoleTabsRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }


        /// <summary>
        /// Method is used to add/delete role permissions
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public int SaveRoleTabs(DataTable dt, long userId, long corporaIdId, long facilityId)
        {
            try
            {
                if (_context != null)
                {
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter
                    {
                        ParameterName = "@pRoleTabsList",
                        SqlDbType = SqlDbType.Structured,
                        Value = dt,
                        TypeName = "RoleTabsTT"
                    };

                    sqlParameters[1] = new SqlParameter("@pUId", userId);
                    sqlParameters[2] = new SqlParameter("@pCId", corporaIdId);
                    sqlParameters[3] = new SqlParameter("@pFId", facilityId);

                    ExecuteCommand(StoredProcedures.SPROC_AddUpdateRolePermission.ToString(), sqlParameters, isCompiled: false);
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return 1;
        }
    }
}
