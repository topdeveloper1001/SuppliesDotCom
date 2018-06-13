using System.Data;
using SuppliesDotCom.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using SuppliesDotCom.Model.CustomModel;


namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class RoleTabsBal : BaseBal
    {
        //function to get all role Permissions
        /// <summary>
        /// Gets all role tabs permissions.
        /// </summary>
        /// <returns></returns>
        public List<RoleTabs> GetAllRoleTabsPermissions()
        {
            try
            {
                using (var roleTabRep = UnitOfWork.RoleTabsRepository)
                {
                    var list = roleTabRep.GetAll().ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Function to get Role Permission by RoleID
        /// <summary>
        /// Gets the role tabs by role identifier.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public List<RoleTabs> GetRoleTabsByRoleId(int? roleId)
        {
            try
            {
                using (var roleTabRep = UnitOfWork.RoleTabsRepository)
                {
                    var list = roleTabRep.Where(rp => rp.RoleID == roleId).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Checks if tab name accessible to given role.
        /// </summary>
        /// <param name="tabName">Name of the tab.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public bool CheckIfTabNameAccessibleToGivenRole(string tabName, string controllerName, string actionName,
            int roleId)
        {
            using (var tabsRep = UnitOfWork.TabsRepository)
            {
                controllerName = controllerName.ToLower().Trim();
                tabName = tabName.ToLower().Trim();
                actionName = actionName.ToLower().Trim();
                var tabId =
                    Convert.ToInt32(
                        tabsRep.Where(
                            t =>
                                (t.Controller.ToLower().Trim().Equals(controllerName) ||
                                 string.IsNullOrEmpty(controllerName)) &&
                                t.TabName.ToLower().Trim().Equals(tabName) &&
                                (t.Action.ToLower().Trim().Equals(actionName) || string.IsNullOrEmpty(controllerName)) &&
                                !t.IsDeleted)
                            .Select(i => i.TabId)
                            .FirstOrDefault());

                if (tabId > 0)
                {
                    using (var roleTabRep = UnitOfWork.RoleTabsRepository)
                    {
                        var isExists = roleTabRep.Where(rp => rp.RoleID == roleId && rp.TabID == tabId).Any();
                        return isExists;
                    }
                }
                return false;
            }
        }

        //Function to add/delete role permissions
        /// <summary>
        /// Adds the update role permission.
        /// </summary>
        /// <param name="roleTabsList">The role tabs list.</param>
        /// <returns></returns>
        public int AddUpdateRolePermission(List<RoleTabs> roleTabsList)
        {
            var result = -1;
            using (var transScope = new TransactionScope())
            {
                //Delete previously added role tabs from the database table RoleTabs
                using (var rep = UnitOfWork.RoleTabsRepository)
                {
                    var roleId = roleTabsList.Where(a => a.RoleID != null).Select(r => (int)r.RoleID).FirstOrDefault();
                    var deleted = rep.Where(r => r.RoleID != null && (int)r.RoleID == roleId).ToList();
                    rep.Delete(deleted);
                }

                //Add newly added role tabs in the Database table RoleTabs, with Parent Tabs in the same table
                foreach (var item in roleTabsList)
                {
                    using (var tRep = UnitOfWork.TabsRepository)
                    {
                        var current = tRep.Where(t => t.TabId == item.TabID).FirstOrDefault();
                        SaveNodesData(current, Convert.ToInt32(item.RoleID));
                    }
                }
                result = 1;
                transScope.Complete();
            }
            return result;
        }


        private void SaveNodesData(Tabs tab, int roleId)
        {
            using (var rep = UnitOfWork.TabsRepository)
            {
                //Save
                using (var rtRep = UnitOfWork.RoleTabsRepository)
                {
                    var isExists = rtRep.Where(r => r.RoleID == roleId && r.TabID == tab.TabId).Any();
                    if (!isExists)
                    {
                        var roleTab = new RoleTabs
                        {
                            RoleID = roleId,
                            TabID = tab.TabId,
                            ID = 0
                        };
                        rtRep.Create(roleTab);
                    }
                }

                //Check for the Current tab's Parent Tab
                if (tab.ParentTabId > 0)
                {
                    var parentTab = rep.Where(rp => rp.TabId == tab.ParentTabId).FirstOrDefault();
                    if (parentTab != null)
                        SaveNodesData(parentTab, roleId);
                }
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public int AddUpdateRolePermissionSP(DataTable dt, long userId, long corporaIdId, long facilityId)
        {
            int retVal;
            using (var oRoleTabsRepository = UnitOfWork.RoleTabsRepository)
                retVal = oRoleTabsRepository.SaveRoleTabs(dt, userId, corporaIdId, facilityId);
            return retVal;
        }


        public List<TabsAccessible> CheckIfTabsAccessibleToGivenRole(int roleId, IEnumerable<Tabs> tabs)
        {
            var result = new List<TabsAccessible>();
            using (var roleTabRep = UnitOfWork.RoleTabsRepository)
            {
                using (var tabsRep = UnitOfWork.TabsRepository)
                {
                    result.AddRange(from item in tabs
                                    let tabId =
                                        Convert.ToInt32(
                                            tabsRep.Where(
                                                t =>
                                                    (t.Controller.ToLower().Trim().Equals(item.Controller) ||
                                                     string.IsNullOrEmpty(item.Controller)) &&
                                                    t.TabName.ToLower().Trim().Equals(item.TabName) &&
                                                    (t.Action.ToLower().Trim().Equals(item.Action) ||
                                                     string.IsNullOrEmpty(item.Controller)) && !t.IsDeleted)
                                                .Select(i => i.TabId)
                                                .FirstOrDefault())
                                    where tabId > 0
                                    let isExists = roleTabRep.Where(rp => rp.RoleID == roleId && rp.TabID == tabId).Any()
                                    select new TabsAccessible
                                    {
                                        IsAccessible = isExists,
                                        TabId = item.TabId
                                    });
                }
                return result;
            }
        }
    }
}
