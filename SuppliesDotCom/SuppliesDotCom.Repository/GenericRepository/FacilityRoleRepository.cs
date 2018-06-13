using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using System;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class FacilityRoleRepository : GenericRepository<FacilityRole>
    {
        private readonly DbContext _context;

        public FacilityRoleRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        public int SaveFacilityRole(FacilityRole m, bool isAppliedToAll, string roleName, long userId, DateTime currentDate)
        {
            try
            {
                var sqlParameters = new SqlParameter[11];
                sqlParameters[0] = new SqlParameter("@FRoleId", m.FacilityRoleId);
                sqlParameters[1] = new SqlParameter("@FId", m.FacilityId);
                sqlParameters[2] = new SqlParameter("@RId", m.RoleId);
                sqlParameters[3] = new SqlParameter("@CId", m.CorporateId);
                sqlParameters[4] = new SqlParameter("@UId", userId);
                sqlParameters[5] = new SqlParameter("@AddToAll", isAppliedToAll);
                sqlParameters[6] = new SqlParameter("@IsDeleted", m.IsDeleted);
                sqlParameters[7] = new SqlParameter("@SchedulingApplied", m.SchedulingApplied);
                sqlParameters[8] = new SqlParameter("@CarePlanApplied", m.CarePlanAccessible);
                sqlParameters[9] = new SqlParameter("@RName", roleName);
                sqlParameters[10] = new SqlParameter("@CurrentDate", currentDate);

                ExecuteCommand(StoredProcedures.SprocSaveFacilityRole.ToString(), sqlParameters, isCompiled: false);
                return 2;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
