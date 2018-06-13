// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RoleBal.cs" company="Spadez">
//   OmniHealthCare
// </copyright>
// <summary>
//   The role bal.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using SuppliesDotCom.Model.CustomModel;
using Microsoft.Ajax.Utilities;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Model;
    using System.Data.Entity.SqlServer;
    using SuppliesDotCom.Common.Common;

    /// <summary>
    /// The role bal.
    /// </summary>
    public class RoleBal : BaseBal
    {
        #region Public Methods and Operators

        /// <summary>
        /// Method to add/Update the role in the database.
        /// </summary>
        /// <param name="role">
        /// The role.
        /// </param>
        /// <returns>
        /// The <see cref="int"/>.
        /// </returns>
        public int AddUpdateRole(Role role)
        {
            using (var roleRep = UnitOfWork.RoleRepository)
            {
                roleRep.AutoSave = true;
                role.IsGeneric = false;
                if (role.RoleID > 0)
                {
                    var currentRoleKey = roleRep.Where(r => r.RoleID == role.RoleID).Max(a => a.RoleKey);
                    role.RoleKey = currentRoleKey;
                    roleRep.UpdateEntity(role, role.RoleID);
                }
                else
                {
                    if (string.IsNullOrEmpty(role.RoleKey))
                    {
                        var newRoleKey = roleRep.Where(a => a.FacilityId == role.FacilityId && a.IsActive == true && a.IsDeleted == false).Max(a => a.RoleID);
                        role.RoleKey = Convert.ToString(newRoleKey + 1); 
                    }
                    roleRep.Create(role);
                }

                return role.RoleID;
            }
        }

        /// <summary>
        /// Method to To check Duplicate role on the basis of rolename
        /// </summary>
        /// <param name="roleId">
        /// The Role Id.
        /// </param>
        /// <param name="roleName">
        /// The Role Name.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        public bool CheckDuplicateRole(int roleId, string roleName)
        {
            using (var roleRep = UnitOfWork.RoleRepository)
            {
                var role =
                    roleRep.Where(x => x.RoleID != roleId && x.RoleName == roleName && x.IsDeleted == false)
                        .FirstOrDefault();
                return role != null;
            }
        }

        /// <summary>
        /// Get the user after login
        /// </summary>
        /// <param name="corporateId">
        /// The corporate Id.
        /// </param>
        /// <returns>
        /// Return the user after login
        /// </returns>
        public List<Role> GetAllRoles(int corporateId)
        {
            try
            {
                using (var usersRep = UnitOfWork.RoleRepository)
                {
                    var list = corporateId > 0
                                          ? usersRep.Where(
                                              x =>
                                              x.IsDeleted == false && x.CorporateId != null
                                              && x.CorporateId == corporateId).ToList()
                                          : usersRep.Where(x => x.IsDeleted == false).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get the user after login
        /// </summary>
        /// <param name="corporateId">
        /// The corporate Id.
        /// </param>
        /// <param name="facilityId">
        /// The facility Id.
        /// </param>
        /// <returns>
        /// Return the user after login
        /// </returns>
        public List<Role> GetAllRolesByCorporateFacility(int corporateId, int facilityId)
        {
            using (var usersRep = UnitOfWork.RoleRepository)
            {
                var list = corporateId > 0
                    ? usersRep.Where(
                        x =>
                            x.IsDeleted == false && x.FacilityId == facilityId && (corporateId == 0 || x.CorporateId == corporateId))
                        .OrderBy(r => r.RoleName)
                        .ToList()
                    : usersRep.Where(x => x.IsDeleted == false).OrderBy(r => r.RoleName).ToList();

                return list.GroupBy(test => test.RoleName).Select(x => x.FirstOrDefault()).OrderBy(r => r.RoleName).ToList();
            }
        }

        /// <summary>
        /// The get facility roles by corporate id facility id.
        /// </summary>
        /// <param name="corporateId">
        /// The corporate id.
        /// </param>
        /// <param name="facilityId">
        /// The facility id.
        /// </param>
        /// <returns>
        /// </returns>
        public List<Role> GetFacilityRolesByCorporateIdFacilityId(int corporateId, int facilityId)
        {
            var list = new List<Role>();
            using (var rRep = UnitOfWork.FacilityRoleRepository)
            {
                var roles =
                    rRep.Where(r => r.CorporateId == corporateId && r.FacilityId == facilityId && !r.IsDeleted).ToList();
                list.AddRange(
                    roles.Select(
                        item => new Role { RoleID = item.RoleId, RoleName = GetRoleNameById(item.RoleId) }));
                return list;
            }
        }

        /// <summary>
        /// Gets the physician roles by corporate identifier.
        /// </summary>
        /// <param name="corporateId">
        /// The corporate identifier.
        /// </param>
        /// <returns>
        /// The <see cref="List"/>.
        /// </returns>
        public List<Role> GetPhysicianRolesByCorporateId(int corporateId)
        {
            using (var rRep = UnitOfWork.RoleRepository)
            {
                var roles =
                    rRep.Where(r => r.CorporateId == corporateId && r.RoleName.Contains("Phy") && !r.IsDeleted)
                        .ToList().OrderBy(r => r.RoleName)
                        .ToList();
                return roles;
            }
        }

        /// <summary>
        /// Gets the role by identifier.
        /// </summary>
        /// <param name="roleID">
        /// The role identifier.
        /// </param>
        /// <returns>
        /// The <see cref="Role"/>.
        /// </returns>
        public Role GetRoleById(int roleID)
        {
            using (var rRep = UnitOfWork.RoleRepository)
            {
                var role = rRep.Where(r => r.RoleID == roleID).FirstOrDefault();
                return role;
            }
        }

        // method to get role by role name
        /// <summary>
        /// Gets the name of the role by role.
        /// </summary>
        /// <param name="roleName">
        /// Name of the role.
        /// </param>
        /// <returns>
        /// The <see cref="Role"/>.
        /// </returns>
        public Role GetRoleByRoleName(string roleName)
        {
            using (var roleRep = UnitOfWork.RoleRepository)
            {
                var role = roleRep.Where(x => x.RoleName == roleName && x.IsDeleted == false).FirstOrDefault();
                return role;
            }
        }

        /// <summary>
        /// Gets the name of the role identifier by facility and.
        /// </summary>
        /// <param name="roleName">
        /// Name of the role.
        /// </param>
        /// <param name="cId">
        /// The c identifier.
        /// </param>
        /// <param name="fId">
        /// The f identifier.
        /// </param>
        /// <returns>
        /// The <see cref="int"/>.
        /// </returns>
        public int GetRoleIdByFacilityAndName(string roleName, int cId, int fId)
        {
            using (var rep = UnitOfWork.RoleRepository)
            {
                var role =
                    rep.Where(
                        p => p.CorporateId == cId && p.FacilityId == fId && p.RoleName.Trim().ToLower().Equals(roleName))
                        .FirstOrDefault();
                return role != null ? role.RoleID : 0;
            }
        }

        /// <summary>
        /// Gets the role name by identifier.
        /// </summary>
        /// <param name="roleID">
        /// The role identifier.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string GetRoleNameById(int roleID)
        {
            using (var rRep = UnitOfWork.RoleRepository)
            {
                var role = rRep.Where(r => r.RoleID == roleID).FirstOrDefault();
                return role != null ? role.RoleName : string.Empty;
            }
        }

        /// <summary>
        /// Gets the roles by corporate identifier.
        /// </summary>
        /// <param name="corporateId">
        /// The corporate identifier.
        /// </param>
        /// <returns>
        /// </returns>
        public List<Role> GetRolesByCorporateId(int corporateId)
        {
            using (var rRep = UnitOfWork.RoleRepository)
            {
                var roles =
                    rRep.Where(r => r.CorporateId == corporateId && !r.IsDeleted)
                        .ToList()
                        .OrderBy(r => r.RoleName)
                        .ToList();
                return roles;
            }
        }

        /// <summary>
        /// Gets the roles by corporate identifier facility identifier.
        /// </summary>
        /// <param name="corporateId">
        /// The corporate identifier.
        /// </param>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <returns>
        /// </returns>
        public List<Role> GetRolesByCorporateIdFacilityId(int corporateId, int facilityId)
        {
            using (var rRep = UnitOfWork.RoleRepository)
            {
                var roles =
                    rRep.Where(r => r.CorporateId == corporateId && r.FacilityId == facilityId && !r.IsDeleted).OrderBy(r => r.RoleName)
                        .ToList();
                return roles;
            }
        }

        public List<DropdownListData> GetRolesByFacility(int facilityId)
        {
            using (var usersRep = UnitOfWork.RoleRepository)
            {
                var list = usersRep.Where(
                    x => x.IsDeleted == false && x.FacilityId == facilityId).Select(i => new DropdownListData
                    {
                        Text = i.RoleName,
                        Value = SqlFunctions.StringConvert((double)i.RoleID).Trim()
                    }).Distinct().OrderBy(i => i.Text).ToList();
                return list;
            }
        }

        #endregion
    }
}