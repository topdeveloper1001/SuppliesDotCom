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

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class ModuleAccessRepository : GenericRepository<ModuleAccess>
    {
        private readonly DbContext _context;
        public ModuleAccessRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }


        /// <summary>
        /// Method is used to add and update the module access
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="corporateId"></param>
        /// <param name="facilityId"></param>
        /// <returns></returns>
        public int SaveEntry(DataTable dt, int corporateId, int facilityId, DateTime? currentDate, int loggedinUserId = 0)
        {
            try
            {
                if (_context != null)
                {
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter
                    {
                        ParameterName = "pModuleAccessList",
                        SqlDbType = SqlDbType.Structured,
                        Value = dt,
                        TypeName = "ModuleAccessTT"
                    };
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[3] = new SqlParameter("pLoggedInUserId", loggedinUserId);
                    sqlParameters[4] = new SqlParameter("pCurrentDate", currentDate);
                    ExecuteCommand(StoredProcedures.SPROC_AddUpdateModuleAccess.ToString(), sqlParameters, isCompiled: false);
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return 1;
        }

        public List<TabsCustomModel> GetTabsOnModuleAccessLoad(long loggedUserId, int roleId = 0, long facilityId = 0, long corporateId = 0, bool isDeleted = false, bool isActive = true)
        {
            var list = new List<TabsCustomModel>();
            try
            {
                var query = string.Empty;
                var sqlParameters = new SqlParameter[6];
                sqlParameters[0] = new SqlParameter("RId", roleId);
                sqlParameters[1] = new SqlParameter("UId", loggedUserId);
                sqlParameters[2] = new SqlParameter("FId", facilityId);
                sqlParameters[3] = new SqlParameter("CId", corporateId);
                sqlParameters[4] = new SqlParameter("IsDeleted", isDeleted);
                sqlParameters[5] = new SqlParameter("IsActive", isActive);

                using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocGetTabsListOnModuleAccessLoad.ToString(), isCompiled: false, parameters: sqlParameters))
                {
                    var tabs = r.ResultSetFor<Tabs>().ToList();
                    list = r.ResultSetFor<TabsCustomModel>().ToList();

                    if (list.Any() && tabs.Any())
                    {
                        list.ForEach(t =>
                        {
                            t.CurrentTab = tabs.Where(a => a.TabId == Convert.ToInt32(t.TabId)).FirstOrDefault();
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }

        public List<TabsCustomModel> GetTabsListInRoleTabsView(long loggedUserId, int roleId = 0, long facilityId = 0, long corporateId = 0, bool isDeleted = false, bool isActive = true)
        {
            var list = new List<TabsCustomModel>();
            try
            {
                var query = string.Empty;
                var sqlParameters = new SqlParameter[6];
                sqlParameters[0] = new SqlParameter("RId", roleId);
                sqlParameters[1] = new SqlParameter("UId", loggedUserId);
                sqlParameters[2] = new SqlParameter("FId", facilityId);
                sqlParameters[3] = new SqlParameter("CId", corporateId);
                sqlParameters[4] = new SqlParameter("IsDeleted", isDeleted);
                sqlParameters[5] = new SqlParameter("IsActive", isActive);

                using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocGetTabsInRoleTabsView.ToString(), isCompiled: false, parameters: sqlParameters))
                {
                    var tabs = r.ResultSetFor<Tabs>().ToList();
                    list = r.ResultSetFor<TabsCustomModel>().ToList();

                    if (list.Any() && tabs.Any())
                    {
                        list.ForEach(t =>
                        {
                            t.CurrentTab = tabs.Where(a => a.TabId == Convert.ToInt32(t.TabId)).FirstOrDefault();
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
    }
}
