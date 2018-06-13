using System.Linq;
using SuppliesDotCom.Model;
using System.Collections.Generic;
using System;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Common.Common;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class TabsBal : BaseBal
    {
        //Function to get all tabs
        /// <summary>
        /// Gets all tabs.
        /// </summary>
        /// <returns></returns>
        public List<Tabs> GetAllTabs()
        {
            using (var tabsRepository = UnitOfWork.TabsRepository)
            {
                var list = tabsRepository.Where(s => !s.IsDeleted && s.IsActive).OrderBy(a => a.TabName).ToList();
                return list;
            }
        }

        //Function to get tab by tab id
        /// <summary>
        /// Gets the tab by tab identifier.
        /// </summary>
        /// <param name="tabId">The tab identifier.</param>
        /// <returns></returns>
        public Tabs GetTabByTabId(int tabId)
        {
            using (var tabsRepository = UnitOfWork.TabsRepository)
            {
                var tabModel = tabsRepository.Where(s => s.TabId == tabId).FirstOrDefault();
                return tabModel;
            }
        }

        //Function to add update tab
        /// <summary>
        /// Adds the update tab.
        /// </summary>
        /// <param name="tab">The tab.</param>
        /// <returns></returns>
        public int AddUpdateTab(Tabs tab)
        {
            using (var tabsRepository = UnitOfWork.TabsRepository)
            {
                tabsRepository.AutoSave = true;
                if (tab.TabId > 0)
                    tabsRepository.UpdateEntity(tab, tab.TabId);
                else
                    tabsRepository.Create(tab);
                return tab.TabId;
            }

        }

        /// <summary>
        /// Gets the tab name by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public string GetTabNameById(int id)
        {
            var tab = GetTabByTabId(id);
            return tab != null ? tab.TabName : string.Empty;
        }

        /// <summary>
        /// Gets all tab list.
        /// </summary>
        /// <returns></returns>
        public List<TabsCustomModel> GetAllTabList(bool activeStatus, long userId = 0)
        {
            var list = new List<TabsCustomModel>();
            using (var rep = UnitOfWork.TabsRepository)
            {
                list = rep.GetAllTabs(userId, activeStatus);
                return list;

                //var tabs = rep.Where(s => !s.IsDeleted && s.IsActive == activeStatus).OrderBy(t => t.TabName).ToList();
                //list.AddRange(tabs.Select(item => new TabsCustomModel
                //{
                //    CurrentTab = item,
                //    ParentTabName = rep.Where(s => s.TabId == item.TabId).FirstOrDefault().TabName,         //GetTabNameById(item.ParentTabId),
                //    HasChilds = rep.Where(s => s.ParentTabId == item.TabId).Any()                           //HasChildren(item.TabId)
                //}));
                //return list;
            }
        }

        /// <summary>
        /// Adds to role tab.
        /// </summary>
        /// <param name="tabId">The tab identifier.</param>
        /// <returns></returns>
        public int? AddToRoleTab(int tabId)
        {
            using (var rep = UnitOfWork.RoleTabsRepository)
            {
                var newRoleTab = new RoleTabs
                {
                    RoleID = Convert.ToInt32(DefaultRoleIDs.SysAdminRole),
                    TabID = tabId
                };
                var newId = rep.Create(newRoleTab);
                return newId;
            }
        }

        /// <summary>
        /// Determines whether [is exist in role tabs] [the specified tab identifier].
        /// </summary>
        /// <param name="tabId">The tab identifier.</param>
        /// <returns></returns>
        public bool IsExistInRoleTabs(int tabId)
        {
            using (var rep = UnitOfWork.RoleTabsRepository)
            {
                var rt = rep.Where(r => r.TabID == tabId).FirstOrDefault();
                return rt != null;
            }
        }

        /// <summary>
        /// Checks if duplicate record exists.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="tabId">The tab identifier.</param>
        /// <param name="parentTabId">The parent tab identifier.</param>
        /// <returns></returns>
        public bool CheckIfDuplicateRecordExists(string name, int tabId, int parentTabId)
        {
            using (var rep = UnitOfWork.TabsRepository)
            {

                var tb = tabId > 0 ? rep.Where(t => t.TabId != tabId && t.ParentTabId == parentTabId && t.TabName.Trim().Equals(name) && t.IsActive).FirstOrDefault() : rep.Where(t => t.ParentTabId == parentTabId && t.TabName.Trim().Equals(name)).FirstOrDefault();
                return tb != null;
            }
        }

        //Method added by Shashank on Nov-3 2014
        /// <summary>
        /// Gets the corporate facility tab list.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public IEnumerable<TabsCustomModel> GetCorporateFacilityTabList(int corporateid, int facilityid, int? roleId)
        {
            var list = new List<TabsCustomModel>();
            using (var tabsRepository = UnitOfWork.TabsRepository)
            {
                using (var mBal = new ModuleAccessBal())
                {
                    using (var rBal = new RoleTabsBal())
                    {
                        var tabs =
                            tabsRepository.Where(t => !t.TabName.ToLower().Equals("setup"))
                                .OrderBy(x => x.TabOrder)
                                .ToList();

                        var moduleAccess = mBal.GetModulesAccessList(corporateid, facilityid).ToList();

                        if (roleId != null)
                        {
                            var roleTabs = rBal.GetRoleTabsByRoleId(roleId).ToList();
                            roleTabs = roleTabs.Where(
                                t => (moduleAccess.Any(z => z.TabID == t.TabID))).ToList();

                            var customlist = tabs.Where(
                                t => (roleTabs.Any(z => z.TabID == t.TabId))).ToList();


                            if (!customlist.Any())
                            {
                                customlist = tabs.Where(
                                t => (moduleAccess.Any(z => z.TabID == t.TabId))).ToList();
                            }

                            list.AddRange(customlist.Select(item => new TabsCustomModel
                            {
                                CurrentTab = item,
                                ParentTabName = GetTabNameById(item.ParentTabId),
                                HasChilds = HasChildren(item.TabId)
                            }));
                        }
                        else
                        {
                            var newlist = tabs.Where(
                                t => (moduleAccess.Any(z => z.TabID == t.TabId))).ToList();
                            list.AddRange(newlist.Select(item => new TabsCustomModel
                            {
                                CurrentTab = item,
                                ParentTabName = GetTabNameById(item.ParentTabId),
                                HasChilds = HasChildren(item.TabId)
                            }));
                        }
                    }
                }
            }
            return list;
        }

        //Method added by Shashank on Nov-3 2014
        /// <summary>
        /// Gets the parent corporate facility tab list.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public List<TabsCustomModel> GetParentCorporateFacilityTabList(int corporateid, int facilityid)
        {
            var list = new List<TabsCustomModel>();
            using (var tabsRepository = UnitOfWork.TabsRepository)
            {
                using (var moduleaccessBal = new ModuleAccessBal())
                {
                    var tabs = tabsRepository.GetAll().OrderBy(t => t.TabName).ToList();
                    var moduleAccess =
                        moduleaccessBal.GetModulesAccessList(corporateid, facilityid).ToList();
                    var newlist = corporateid == 0 ? tabs : tabs.Where(t => moduleAccess.Any(z => z.TabID == t.TabId) && !t.TabName.Equals("Setup")).ToList();
                    list.AddRange(newlist.Select(item => new TabsCustomModel
                    {
                        CurrentTab = item,
                        ParentTabName = GetTabNameById(item.ParentTabId),
                        HasChilds = HasChildren(item.TabId)
                    }));
                }
            }
            return list;
        }

        /// <summary>
        /// Gets the maximum tab order by parent tab identifier.
        /// </summary>
        /// <param name="tabId">The tab identifier.</param>
        /// <returns></returns>
        public int GetMaxTabOrderByParentTabId(int tabId)
        {
            using (var rep = UnitOfWork.TabsRepository)
            {
                var tab = rep.Where(a => a.ParentTabId == tabId && a.IsActive && a.IsVisible).Max(b => b.TabOrder);
                return tab != null ? Convert.ToInt32(tab) + 1 : 1;
            }
        }

        /// <summary>
        /// Gets the tabs by corporate and facility identifier.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public List<TabsCustomModel> GetTabsByCorporateAndFacilityId(int facilityId, int corporateId)
        {
            var list = new List<TabsCustomModel>();
            using (var rep = UnitOfWork.TabsRepository)
            {
                //Get All Tabs except SetUp 
                var tabs = rep.Where(t => !t.TabName.ToLower().Equals("setup")).OrderBy(m => m.TabName).ToList();
                using (var moduleRep = UnitOfWork.ModuleAccessRepository)
                {
                    //Get All tab IDs that have rights given to current Corporate and Facility
                    var intTabs =
                        moduleRep.Where(
                            m =>
                                m.CorporateID != null && m.FacilityID != null && (int)m.CorporateID == corporateId &&
                                (int)m.FacilityID == facilityId && m.TabID != null).Select(m1 => m1.TabID.Value).ToList();

                    //Filter out tabs from all list that are accessible to current Corporate and facility
                    tabs = tabs.Where(t => intTabs.Contains(t.TabId)).ToList();

                    if (tabs.Count > 0)
                    {
                        list.AddRange(tabs.Select(item => new TabsCustomModel
                        {
                            CurrentTab = item,
                            ParentTabName = GetTabNameById(item.ParentTabId),
                            HasChilds = HasChildren(item.TabId)
                        }));
                    }
                }
            }
            return list;
        }

        /// <summary>
        /// Gets the patient tabs list.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Tabs> GetPatientTabsList()
        {
            using (var rep = UnitOfWork.TabsRepository)
            {
                var tabs = rep.Where(m => m.Controller.ToLower().Trim().Equals("patientportal") && m.ParentTabId == 0).ToList();
                return tabs;
            }
        }


        public IEnumerable<Tabs> GetPatientTabsListData(int patientId)
        {
            using (var rep = UnitOfWork.TabsRepository)
            {
                var tabs =
                    rep.Where(m => m.Controller.ToLower().Trim().Equals("patientportal") && m.ParentTabId == 0).ToList();

                if (tabs.Count <= 0) return tabs;

                var patientPortal = tabs.FirstOrDefault(p => p.Controller.Equals("PatientPortal") && p.Action.Equals("Index"));
                if (patientPortal != null)
                    patientPortal.RouteValues = "pId=" + patientId;
                return tabs;
            }
        }


        private bool HasChildren(int tabId)
        {
            using (var rep = UnitOfWork.TabsRepository)
            {
                var tabModel = rep.Where(s => s.ParentTabId == tabId).Any();
                return tabModel;
            }
        }

        public IEnumerable<TabsCustomModel> GetTabsOnModuleAccessLoad(long loggedUserId, int roleId = 0, long facilityId = 0, long corporateId = 0, bool isDeleted = false, bool isActive = true)
        {
            using (var rep = UnitOfWork.ModuleAccessRepository)
            {
                var result = rep.GetTabsOnModuleAccessLoad(loggedUserId, roleId, facilityId, corporateId, isDeleted, isActive);
                return result;
            }
        }


        public IEnumerable<TabsCustomModel> GetTabsListInRoleTabsView(long loggedUserId, int roleId = 0, long facilityId = 0, long corporateId = 0, bool isDeleted = false, bool isActive = true)
        {
            using (var rep = UnitOfWork.ModuleAccessRepository)
            {
                var result = rep.GetTabsListInRoleTabsView(loggedUserId, roleId, facilityId, corporateId, isDeleted, isActive);
                return result;
            }
        }


        /// <summary>
        /// Gets all tab list.
        /// </summary>
        /// <returns></returns>
        public List<Tabs> GetTabsByRole(string userName, long roleId)
        {
            using (var rep = UnitOfWork.TabsRepository)
                return rep.GetTabsByRole(userName, roleId);
        }


        public TabsData SaveTab(Tabs m, long roleId, long userId, DateTime currentDate)
        {
            using (var rep = UnitOfWork.TabsRepository)
                return rep.SaveTabs(m, roleId, userId, currentDate);
        }

    }
}
