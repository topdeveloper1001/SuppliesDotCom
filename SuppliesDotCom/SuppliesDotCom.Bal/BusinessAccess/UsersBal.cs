using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Common;
using System.Data.Entity;
using SuppliesDotCom.Model.CustomModel;
using System.Transactions;
using SuppliesDotCom.Model.EntityDto;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class UsersBal : BaseBal
    {
        private UsersMapper UsersMapper { get; set; }
        private UserDtoMapper UsersMapper2 { get; set; }

        public UsersBal()
        {
            UsersMapper = new UsersMapper();
            UsersMapper2 = new UserDtoMapper();
        }

        /// <summary>
        /// Get the user after login
        /// </summary>
        /// <returns>Return the user after login</returns>
        public Users GetUser(string username, string password, string loginType = "username")
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var usersModel = new Users();
                if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
                {
                    var pwd = EncryptDecrypt.GetEncryptedData(password, string.Empty);
                    pwd = pwd.Trim();
                    var uname = username.ToLower().Trim();
                    loginType = loginType.ToLower().Trim();


                    //Get the User Object from the table Users against the current Username passed as input parameter.
                    usersModel = usersRep.Where(u =>
                    (
                    loginType.Equals("username") ? u.UserName.ToLower().Equals(uname) : u.Email.ToLower().Equals(uname)
                    )
                    &&
                    u.Password.Trim().Equals(pwd))
                    .FirstOrDefault();
                }
                return usersModel;
                //Changes end here
            }
        }

        //function to get user by UserID
        /// <summary>
        /// Gets the user by identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public Users GetUserById(int? userId)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var usersModel = usersRep.Where(x => x.UserID == userId && x.IsDeleted == false).FirstOrDefault();
                if (usersModel != null)
                {
                    var encryptPassword = EncryptDecrypt.GetDecryptedData(usersModel.Password, "");
                    usersModel.Password = encryptPassword;
                }
                return usersModel;
            }
        }
        public UsersViewModel GetUserByEmail(string email)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var usersModel = usersRep.Where(x => x.Email == email && x.IsDeleted == false).FirstOrDefault();
                if (usersModel != null)
                {
                    var encryptPassword = EncryptDecrypt.GetDecryptedData(usersModel.Password, "");
                    usersModel.Password = encryptPassword;
                }
                else
                {
                    usersModel = new Users();
                }
                return UsersMapper.MapModelToViewModel(usersModel);
            }
        }
        public UsersViewModel GetUserByEmailAndToken(string email, string resetToken)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var usersModel = usersRep.Where(x => x.Email == email && x.IsDeleted == false && x.ResetToken == resetToken).FirstOrDefault();
                if (usersModel != null)
                {
                    var encryptPassword = EncryptDecrypt.GetDecryptedData(usersModel.Password, "");
                    usersModel.Password = encryptPassword;
                }
                else
                {
                    usersModel = new Users();
                }
                return UsersMapper.MapModelToViewModel(usersModel);
            }
        }
        public UsersViewModel GetUserByEmailWithoutDecryption(string email)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var usersModel = usersRep.Where(x => x.Email == email && x.IsDeleted == false).FirstOrDefault() ??
                                 new Users();
                return UsersMapper.MapModelToViewModel(usersModel);
            }
        }

        /// <summary>
        /// Checks the exists password.
        /// </summary> Update By Krishna
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public bool CheckExistsPassword(string newPassword, int userid)
        {
            using (var rep = UnitOfWork.UsersRepository)
            {
                var pass = EncryptDecrypt.GetEncryptedData(newPassword, "").Trim();

                var isExists = rep.Where(x => x.UserID == userid && x.Password.Equals(pass)).Any();
                return isExists;
            }
        }

        /// <summary>
        /// Gets the users by corporate identifier facility identifier.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<UsersCustomModel> GetUsersByCorporateIdFacilityId(int corporateId, int facilityId)
        {
            var list = new List<UsersCustomModel>();
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var lstUser = corporateId > 0
                    ? (facilityId == 0 ? usersRep.Where(x => x.IsDeleted == false)
                        .Include(u => u.UserRole.Select(ur => ur.Role).Select(r => r.FacilityRole))
                        .Where(
                            ur =>
                                ur.UserRole.Any(
                                    r =>
                                        r.Role.CorporateId != null && r.Role.CorporateId == corporateId))
                                        .ToList() : usersRep.Where(x => x.IsDeleted == false)
                        .Include(u => u.UserRole.Select(ur => ur.Role).Select(r => r.FacilityRole))
                        .Where(
                            ur =>
                                ur.UserRole.Any(
                                    r =>
                                        r.Role.CorporateId != null && r.Role.CorporateId == corporateId &&
                                        r.Role.FacilityId == facilityId))
                        .ToList())
                    : usersRep.Where(x => x.IsDeleted == false)
                        .Include(u => u.UserRole.Select(r => r.Role).Select(r => r.FacilityRole))
                        .ToList();

                if (lstUser.Count > 0)
                {
                    list.AddRange(lstUser.Select(item => new UsersCustomModel
                    {
                        CurrentUser = item,
                        PhoneNumber = string.IsNullOrEmpty(item.Phone) || item.Phone.Contains("null") ? "NA" : item.Phone,
                        HomePhoneNumber = string.IsNullOrEmpty(item.HomePhone) || item.HomePhone.Contains("null") ? "NA" : item.HomePhone,
                        RoleName = UserRoles(item.UserRole.ToList()),
                        FacilityNames = UserFacilities(item.UserRole.ToList()),
                        Name = string.Format("{0} {1}", item.FirstName, item.LastName),
                        CorporateName = GetCoprateName(item.CorporateId.ToString())
                    }));

                    list = list.OrderBy(f => f.Name).ToList();
                }
                return list;
            }
        }


        /// <summary>
        /// Method to add the User in the database.
        /// </summary>
        /// <param name="m"></param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public int AddUpdateUser(Users m, int roleId)
        {
            int result;
            var userRolebal = new UserRoleBal();
            var facilityRoleBal = new FacilityRoleBal();
            using (var transScope = new TransactionScope())
            {
                using (var usersRep = UnitOfWork.UsersRepository)
                {
                    var encryptPassword = EncryptDecrypt.GetEncryptedData(m.Password, "");
                    m.Password = encryptPassword;
                    usersRep.AutoSave = true;
                    if (m.UserID > 0)
                    {
                        var currentUser = usersRep.Where(u => u.UserID == m.UserID).FirstOrDefault();
                        if (currentUser != null)
                        {
                            m.CreatedBy = currentUser.CreatedBy;
                            m.CreatedDate = currentUser.CreatedDate;
                        }

                        usersRep.UpdateEntity(m, m.UserID);

                        var name = $"{m.FirstName} - {m.LastName}";
                       
                        //Add missing updates in roles
                        if (roleId > 0)
                        {
                            using (var uRoleRep = UnitOfWork.UserRoleRepository)
                            {
                                var currentRole = uRoleRep.Where(r => r.UserID == m.UserID).FirstOrDefault();
                                if (currentRole != null && currentRole.RoleID != roleId)
                                {
                                    currentRole.RoleID = roleId;
                                    currentRole.ModifiedBy = m.ModifiedBy;
                                    currentRole.ModifiedDate = m.ModifiedDate;
                                    uRoleRep.UpdateEntity(currentRole, currentRole.UserRoleID);

                                    //Update the roles in Physician Table too if schedulingApplied is set true to that current role in FacilityRole Table.
                                    var isSchedulingApplied = facilityRoleBal.IsSchedulingApplied(roleId);
                                    
                                }
                            }
                        }

                      
                        if (Convert.ToBoolean(m.IsDeleted))
                            userRolebal.DeleteRoleWithUser(m.UserID);
                        transScope.Complete();
                    }
                    else
                    {
                        usersRep.Create(m);

                        //Check if User Role is added
                        if (m.UserID > 0 && roleId > 0)
                        {
                            var userRoleModel = new UserRole
                            {
                                UserID = m.UserID,
                                RoleID = roleId,
                                IsActive = true,
                                IsDeleted = false,
                                CreatedBy = m.CreatedBy,
                                CreatedDate = m.CreatedDate,
                                UserRoleID = 0
                            };
                            var newUserRoleId = userRolebal.SaveUserRole(userRoleModel);
                            if (newUserRoleId > 0)
                            {
                                var facilityRoleModel = new FacilityRole
                                {
                                    RoleId = roleId,
                                    FacilityRoleId = 0,
                                    FacilityId = Convert.ToInt32(m.FacilityId),
                                    IsActive = true,
                                    IsDeleted = false,
                                    CorporateId = Convert.ToInt32(m.CorporateId),
                                    CreatedBy = m.CreatedBy,
                                    CreatedDate = m.CreatedDate
                                };
                                var isAdded = facilityRoleBal.SaveFacilityRoleIfNotExists(facilityRoleModel);
                                if (isAdded)
                                    transScope.Complete();
                            }
                        }


                    }


                    result = m.UserID;
                }
            }
            return result;
        }

        /// <summary>
        /// Method to To check Duplicate User on the basis of username or email
        /// </summary>
        /// <param name="username"></param>
        /// <param name="email"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool CheckDuplicateUser(string username, string email, int userId)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                username = username.ToLower();
                var user = userId > 0
                    ? usersRep.Where(x => x.UserID != userId && x.UserName.ToLower() == username && x.IsDeleted == false).FirstOrDefault()
                    : usersRep.Where(x => x.UserName.ToLower() == username && x.IsDeleted == false).FirstOrDefault();
                return user != null;
            }
        }

        //Menu Manipulations
        /// <summary>
        /// Gets the name of the tabs by user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <returns></returns>
        public IEnumerable<Tabs> GetTabsByUserName(string userName)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var user = usersRep.Where(u => u.UserName.Equals(userName) && u.IsDeleted != true)
                    .Include(a => a.UserRole.Select(u => u.Role).Select(r => r.RoleTabs.Select(t => t.Tabs))).FirstOrDefault();

                if (user == null) return null;
                var tabs = user.UserRole.Select(a => a.Role).ToList().FirstOrDefault();
                if (tabs == null) return null;
                var menus = tabs.RoleTabs.Select(a => a.Tabs).Where(t => !t.IsDeleted && t.IsActive).OrderBy(a => a.TabOrder);
                return menus.ToList();
            }
        }

        // Changed by Shashank ON : 5th May 2015 : To add the Module access level Security when user log in via Facility and Corporate 
        /// <summary>
        /// Gets the tabs by user identifier role identifier.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateid">The corporateid.</param>
        /// <returns></returns>
        public IEnumerable<Tabs> GetTabsByUserIdRoleId(int userId, int roleId, int facilityId, int corporateid, bool isDeleted = false, bool isActive = true)
        {
            //using (var usersRep = UnitOfWork.UsersRepository)
            //{
            //    var user = usersRep.Where(u => u.UserID == userId && u.IsDeleted != true).Include(a => a.UserRole.Select(u => u.Role).Select(r => r.RoleTabs.Select(t => t.Tabs))).FirstOrDefault();
            //    if (user == null) return null;
            //    var tab = user.UserRole.Select(a => a.Role);
            //    var tabs = tab.Where(a => a.RoleID == roleId && !a.IsDeleted).ToList().FirstOrDefault();
            //    if (tabs == null) return null;
            //    var menus = tabs.RoleTabs.Select(a => a.Tabs).Where(t => !t.IsDeleted && t.IsActive).OrderBy(a => a.TabOrder).ToList();
            //    if (facilityId != 0)
            //    {
            //        using (var moduleacesssbal = new ModuleAccessBal())
            //        {
            //            var facilityModules = moduleacesssbal.GetModulesAccessList(corporateid, facilityId);
            //            menus = menus.Where(x => (facilityModules.Any(z => z.TabID == x.TabId))).ToList();
            //        }
            //    }
            //    return menus.ToList();
            //}

            using (var rep = UnitOfWork.TabsRepository)
            {
                return rep.GetTabsList(userId, roleId, facilityId, corporateid, isDeleted, isActive);
            }
        }

        /// <summary>
        /// Gets the user details.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>
        public CommonModel GetUserDetails(int roleId, int facilityId, int userId)
        {
            var commonModel = new CommonModel();
            using (var fRep = UnitOfWork.FacilityRepository)
            {
                var facility = fRep.Where(f => f.FacilityId == facilityId).FirstOrDefault();
                if (facility != null)
                {
                    commonModel.DefaultFacility = facility.FacilityName;
                    commonModel.FacilityNumber = facility.FacilityNumber;
                    commonModel.FacilityId = facility.FacilityId;
                }

                using (var rRep = UnitOfWork.RoleRepository)
                {
                    var current = rRep.Where(r => r.RoleID == roleId).FirstOrDefault();
                    if (current != null)
                    {
                        commonModel.RoleName = current.RoleName;
                        commonModel.RoleKey = current.RoleKey;
                    }
                    using (var uRep = UnitOfWork.UsersRepository)
                    {
                        var firstOrDefault = uRep.Where(r => r.UserID == userId).FirstOrDefault();
                        if (firstOrDefault != null)
                            commonModel.UserName = firstOrDefault.UserName;
                        if (firstOrDefault != null)
                            commonModel.UserIsAdmin = Convert.ToBoolean(firstOrDefault.AdminUser);
                    }
                }
            }
            return commonModel;
        }

        /// <summary>
        /// Users the roles.
        /// </summary>
        /// <param name="roles">The roles.</param>
        /// <returns></returns>
        public string UserRoles(IEnumerable<UserRole> roles)
        {
            var roleNames = string.Empty;
            foreach (var item in roles)
            {
                if (string.IsNullOrEmpty(roleNames))
                    roleNames = item.Role.RoleName;
                else
                    roleNames += string.Format(", {0}", item.Role.RoleName);
            }
            return roleNames;
        }

        /// <summary>
        /// Gets the name of the coprate.
        /// </summary> Updated By Krishna
        /// <param name="corporate">The corporate.</param>
        /// <returns></returns>
        public string GetCoprateName(string corporateId)
        {
            var corporateName = "";
            using (var cBal = new CorporateBal())
            {
                var firstOrDefault = cBal.GetCorporate(Convert.ToInt32(corporateId)).FirstOrDefault();
                if (firstOrDefault != null)
                    corporateName = firstOrDefault.CorporateName;
            }
            return corporateName;
        }

        /// <summary>
        /// Users the facilities.
        /// </summary>
        /// <param name="userRoles">The user roles.</param>
        /// <returns></returns>
        public string UserFacilities(IEnumerable<UserRole> userRoles)
        {
            var facilityNames = string.Empty;
            var ids = new List<int>();
            foreach (var item in userRoles)
            {
                if (item.Role != null)
                {
                    foreach (var f in item.Role.FacilityRole.ToList())
                    {
                        if (ids.All(fac => fac != f.FacilityId))
                        {
                            ids.Add(f.FacilityId);
                            using (var facBal = new FacilityBal())
                            {
                                if (string.IsNullOrEmpty(facilityNames))
                                    facilityNames = facBal.GetFacilityNameById(f.FacilityId);
                                else
                                    facilityNames += string.Format(", {0}", facBal.GetFacilityNameById(f.FacilityId));
                            }
                        }
                    }
                }
            }
            return facilityNames;
        }

        /// <summary>
        /// Gets all users by facility identifier.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<UsersCustomModel> GetAllUsersByFacilityId(int facilityId)
        {
            var lstUser = new List<UsersCustomModel>();
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var list = usersRep.Where(
                    a => (int)a.FacilityId == facilityId && a.IsDeleted != true)
                    .ToList();

                if (list.Count > 0)
                {
                    lstUser.AddRange(list.Select(item => new UsersCustomModel
                    {
                        CurrentUser = item,
                        Name = string.Format("{0} {1}", item.FirstName, item.LastName),
                    }));
                }
                return lstUser;
            }
        }

        public List<Users> GetFacilityUsers(int facilityId)
        {
            using (var rep = UnitOfWork.UsersRepository)
            {
                var list = rep.Where(u => u.FacilityId == facilityId && u.IsActive && u.IsDeleted == false).ToList();
                return list;
            }
        }

        public List<Users> GetNonAdminUsersByCorporate(int corporateId)
        {
            using (var rep = UnitOfWork.UsersRepository)
            {
                var list = rep.Where(u => u.CorporateId == corporateId && u.IsActive && u.IsDeleted == false && u.AdminUser == false).ToList();
                return list;
            }
        }

        public int UpdateUser(Users user)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                usersRep.UpdateEntity(user, user.UserID);
            }
            return user.UserID;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="corporateId"></param>
        /// <returns></returns>
        public bool CheckUserExistForCorporate(int corporateId)
        {
            using (var rep = UnitOfWork.UsersRepository)
            {
                var user = rep.Where(fr => fr.IsActive && fr.IsDeleted != true && fr.CorporateId == corporateId).FirstOrDefault();
                return user != null;
            }
        }

        public bool CheckForDuplicateEmail(int userId, string email)
        {
            try
            {
                using (var rep = UnitOfWork.UsersRepository)
                {
                    email = email.ToLower().Trim();
                    var isExist = userId > 0
                        ? rep.Where(
                        x => x.UserID != userId && x.Email.ToLower().Trim().Equals(email)).Any()
                        : rep.Where(x => x.Email.ToLower().Trim().Equals(email)).Any();
                    return isExist;

                }

            }
            catch (Exception xx)
            {

                throw xx;
            }

        }


        public string GetUserEmailByUserId(int userid)
        {
            using (var rep = UnitOfWork.UsersRepository)
            {
                var userEmail = rep.Where(x => x.UserID == userid).FirstOrDefault();
                return userEmail != null ? userEmail.Email : string.Empty;
            }
        }

        public List<Users> GetUsersByCorporateandFacilityId(int corporateId, int facilityId)
        {
            using (var rep = UnitOfWork.UsersRepository)
            {
                var list = corporateId > 0 ? rep.Where(u => u.FacilityId == facilityId && u.IsActive && u.IsDeleted == false && u.CorporateId == corporateId).ToList() :
                    rep.Where(u => u.IsActive && u.IsDeleted == false).ToList();
                return list;
            }
        }

        /// <summary>
        /// Gets the name of the userby user.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <returns></returns>
        public Users GetUserbyUserName(string username)
        {
            using (var usersRep = UnitOfWork.UsersRepository)
            {
                var usersModel = new Users();
                if (!string.IsNullOrEmpty(username))
                {
                    var uname = username.ToLower().Trim();
                    usersModel = usersRep.Where(u => u.UserName.ToLower().Equals(uname)).FirstOrDefault();
                }
                return usersModel;
                //Changes end here
            }
        }

        public List<UsersViewModel> GetUsersByRole(int facilityId, int cId)
        {
            using (var rRep = UnitOfWork.UsersRepository)
            {
                var results = rRep.GetUsersRoleWise(facilityId, cId);
                return results;
            }
        }

        //public List<PhysicianViewModel> GetPhysiciansByRole(int facilityId, int cId)
        //{

        //    using (var pRep = UnitOfWork.PhysicianRepository)
        //    {
        //        var res = pRep.GetPhysicians(facilityId, cId);
        //        return res;
        //    }
        //}
    }
}
