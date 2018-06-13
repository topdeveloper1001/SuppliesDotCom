using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Repository.Common;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class TabsRepository : GenericRepository<Tabs>
    {
        private readonly DbContext _context;

        public TabsRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }


        public List<Tabs> GetTabsList(long loggedUserId, int roleId = 0, long facilityId = 0, long corporateId = 0, bool isDeleted = false, bool isActive = true)
        {
            var list = new List<Tabs>();
            try
            {
                var sqlParameters = new SqlParameter[6];
                sqlParameters[0] = new SqlParameter("RId", roleId);
                sqlParameters[1] = new SqlParameter("UId", loggedUserId);
                sqlParameters[2] = new SqlParameter("FId", facilityId);
                sqlParameters[3] = new SqlParameter("CId", corporateId);
                sqlParameters[4] = new SqlParameter("IsDeleted", isDeleted);
                sqlParameters[5] = new SqlParameter("IsActive", isActive);

                using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocGetTabsList.ToString(), parameters: sqlParameters, isCompiled: false))
                    list = r.ResultSetFor<Tabs>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }


        public List<TabsCustomModel> GetAllTabs(long loggedinUserId, bool status = true)
        {
            try
            {
                var sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter("pUserId", loggedinUserId);
                sqlParameters[1] = new SqlParameter("pStatus", status);

                using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocGetAllTabs.ToString(), parameters: sqlParameters, isCompiled: false))
                {
                    var list = r.GetResultWithJson<TabsCustomModel>(JsonResultsArray.Tabs.ToString());
                    return list;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<Tabs> GetTabsByRole(string userName, long roleId)
        {
            try
            {
                var sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter("pUsername", userName);
                sqlParameters[1] = new SqlParameter("pRole", roleId);

                using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocGetTabsByRole.ToString(), parameters: sqlParameters, isCompiled: false))
                {
                    var list = r.GetResultWithJson<Tabs>(JsonResultsArray.Tabs.ToString());
                    return list;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public TabsData SaveTabs(Tabs m, long roleId, long userId, DateTime currentDate)
        {
            var result = new TabsData();
            try
            {
                var sqlParameters = new SqlParameter[12];
                sqlParameters[0] = new SqlParameter("pId", m.TabId);
                sqlParameters[1] = new SqlParameter("pTabName", m.TabName);
                sqlParameters[2] = new SqlParameter("pController", !string.IsNullOrEmpty(m.Controller) ? m.Controller : string.Empty);
                sqlParameters[3] = new SqlParameter("pAction", !string.IsNullOrEmpty(m.Action) ? m.Action : string.Empty);
                sqlParameters[4] = new SqlParameter("pRouteValues", !string.IsNullOrEmpty(m.RouteValues) ? m.RouteValues : string.Empty);
                sqlParameters[5] = new SqlParameter("pTabOrder", m.TabOrder.GetValueOrDefault());
                sqlParameters[6] = new SqlParameter("pTabImageUrl", !string.IsNullOrEmpty(m.TabImageUrl) ? m.TabImageUrl : string.Empty);
                sqlParameters[7] = new SqlParameter("pParentTabId", m.ParentTabId);
                sqlParameters[8] = new SqlParameter("pIsActive", m.IsActive);
                sqlParameters[9] = new SqlParameter("pUserId", userId);
                sqlParameters[10] = new SqlParameter("pCurrentDate", currentDate);
                sqlParameters[11] = new SqlParameter("pRoleId", roleId);

                using (var r = _context.MultiResultSetSqlQuery(StoredProcedures.SprocSaveTab.ToString(), parameters: sqlParameters, isCompiled: false))
                {
                    result.ExecutionStatus = r.SingleResultSetFor<int>();
                    if (result.ExecutionStatus > 0)
                    {
                        result.AllTabs = r.GetResultWithJson<TabsCustomModel>(JsonResultsArray.Tabs.ToString());
                        result.TabsByRole = r.GetResultWithJson<Tabs>(JsonResultsArray.Tabs.ToString());
                    }
                }
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
