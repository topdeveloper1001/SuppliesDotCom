using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using SuppliesDotCom.Model;
using System.Transactions;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class UserRoleBal : BaseBal
    {
        //Function Get User Roles by userID
        public List<UserRole> GetUserRolesByUserId(int userId)
        {
            using (var urRep = UnitOfWork.UserRoleRepository)
            {
                var userRoles =
                    urRep.Where(r => r.UserID == userId && r.IsActive && r.IsDeleted == false)
                        .Include(x => x.Role)
                        .Include(x => x.Role.FacilityRole)
                        .ToList();
                return userRoles;
            }
        }

        /// <summary>
        /// Method to add/Update the role in the database.
        /// </summary>
        /// <returns></returns>
        public int AddUpdateUserRole(IEnumerable<UserRole> userRoles)
        {
            int result;
            var newList = new List<UserRole>();
            using (var transScope = new TransactionScope())
            {
                using (var userRoleRep = UnitOfWork.UserRoleRepository)
                {
                    var iqueryableList = userRoleRep.GetAll().ToList();
                    var listToBeDeleted = iqueryableList.Where(i => userRoles.Any(r => r.UserID == i.UserID)).ToList();
                    userRoleRep.Delete(listToBeDeleted);
                    newList.AddRange(userRoles);
                    result = Convert.ToInt32(userRoleRep.Create(newList));
                    transScope.Complete();
                }
            }
            return result;
        }

        /// <summary>
        /// Deletes the role with user.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public int DeleteRoleWithUser(int userId)
        {
            var result = -1;
            using (var transScope = new TransactionScope())
            {
                using (var userRoleRep = UnitOfWork.UserRoleRepository)
                {
                    var listToBeDeleted = userRoleRep.Where(x => x.UserID == userId).ToList();
                    if (listToBeDeleted.Count > 0)
                        userRoleRep.Delete(listToBeDeleted);
                    transScope.Complete();
                }
            }
            return result;
        }

        /// <summary>
        /// Checks the role exist.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public bool CheckRoleExist(int roleId)
        {
            using (var urRep = UnitOfWork.UserRoleRepository)
            {
                var role = urRep.Where(fr => fr.IsActive && fr.IsDeleted != true && fr.RoleID == roleId).FirstOrDefault();
                return role != null;
            }
        }

        /// <summary>
        /// Gets the user roles by corporate facility and user identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<UserRole> GetUserRolesByCorporateFacilityAndUserId(int userId, int corporateId, int facilityId)
        {
            using (var urRep = UnitOfWork.UserRoleRepository)
            {
                var userRoles = urRep.Where(r => r.UserID == userId && r.IsActive && r.IsDeleted == false && (r.Role != null && r.Role.CorporateId != null && (int)r.Role.CorporateId == corporateId && r.Role.FacilityId != null && (int)r.Role.FacilityId == facilityId)).ToList();
                return userRoles;
            }
        }

        /// <summary>
        /// Saves the user role.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public int SaveUserRole(UserRole model)
        {
            using (var rep = UnitOfWork.UserRoleRepository)
            {
                var isExists = CheckIfExists(model.UserID, model.RoleID);
                if (model.UserRoleID > 0 || isExists)
                    rep.UpdateEntity(model, model.UserRoleID);
                else
                    rep.Create(model);
                return model.UserRoleID;
            }
        }

        /// <summary>
        /// Checks if exists.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public bool CheckIfExists(int userId, int roleId)
        {
            using (var urRep = UnitOfWork.UserRoleRepository)
            {
                var role = urRep.Where(fr => fr.IsActive && fr.IsDeleted != true && fr.RoleID == roleId && fr.UserID == userId).FirstOrDefault();
                return role != null;
            }
        }

        /// <summary>
        /// Gets the user identifier by corporate and role type identifier.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="roleIds">The role ids.</param>
        /// <returns></returns>
        public List<UserRole> GetUserIdByCorporateAndRoleTypeId(int corporateId, List<Role> roleIds)
        {
            using (var urRep = UnitOfWork.UserRoleRepository)
            {
                var list = roleIds.Select(r => r.RoleID).ToList();
                //var userRoleIDs = urRep.Where(x => x.IsActive && x.Role.CorporateId != null && (int)x.Role.CorporateId == corporateId).ToList();// && x.Any(p2 => p2.ID == p.ID)).ToList();
                //var userIds = userRoleIDs.Where(ur => roleIds.Any(x => x.RoleID == ur.RoleID)).ToList();

                var userIds = urRep.Where(r => list.Contains(r.RoleID)).ToList();
                return userIds;
            }
        }
    }
}
