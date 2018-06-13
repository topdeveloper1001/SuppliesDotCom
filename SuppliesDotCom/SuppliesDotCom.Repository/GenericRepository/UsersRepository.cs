using System;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class UsersRepository : GenericRepository<Users>
    {
        private readonly DbContext _context;

        public UsersRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }
         
        public List<UsersViewModel> GetUsersRoleWise(int facilityId, int cId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CId, @FId", StoredProcedures.SPROC_GetUsersRoleWise);
                    var sqlParameters = new object[2];
                    sqlParameters[0] = new SqlParameter("CId", cId);
                    sqlParameters[1] = new SqlParameter("FId", facilityId);
                    IEnumerable<UsersViewModel> result = _context.Database.SqlQuery<UsersViewModel>(spName, sqlParameters);
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
