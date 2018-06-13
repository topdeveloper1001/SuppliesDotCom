using SuppliesDotCom.Model;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Bal.Mapper;
using System;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class FacilityRoleBal : BaseBal
    {
        private FacilityRoleMapper FacilityRoleMapper { get; set; }

        public FacilityRoleBal()
        {
            FacilityRoleMapper = new FacilityRoleMapper();
        }

        /// <summary>
        /// Gets the facility role by identifier.
        /// </summary>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <returns></returns>
        public FacilityRole GetFacilityRoleById(int facilityRoleId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRole = rep.Where(fr => fr.IsActive && !fr.IsDeleted && fr.FacilityRoleId == facilityRoleId).FirstOrDefault();
                return facilityRole;
            }
        }

        /// <summary>
        /// Adds the update facility role.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public int AddUpdateFacilityRole(FacilityRole model)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                if (model.FacilityRoleId > 0)
                    rep.UpdateEntity(model, model.FacilityRoleId);
                else
                    rep.Create(model);
                return model.FacilityRoleId;
            }
        }

        /// <summary>
        /// Checks if exists.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <returns></returns>
        public bool CheckIfExists(int roleId, int facilityId, int corporateId, int facilityRoleId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                if (facilityRoleId > 0)
                {
                    var current = rep.Where(f => f.FacilityRoleId != facilityRoleId && f.RoleId == roleId && f.FacilityId == facilityId && f.CorporateId == corporateId
                        && f.IsActive).FirstOrDefault();
                    return current != null;
                }
                else
                {
                    var current = rep.Where(f => f.RoleId == roleId && f.FacilityId == facilityId && f.CorporateId == corporateId && f.IsActive).FirstOrDefault();
                    return current != null;
                }
            }
        }

         
        /// <summary>
        /// Gets the facility roles by role identifier.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public IEnumerable<FacilityRole> GetFacilityRolesByRoleId(int roleId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRole = rep.Where(fr => fr.IsActive && !fr.IsDeleted && fr.RoleId == roleId).ToList();
                return facilityRole;
            }
        }

        /// <summary>
        /// Adds the update facility role custom model.
        /// </summary>
        /// <param name="vm">The model.</param>
        /// <returns></returns>
        public int AddUpdateFacilityRoleCustomModel(FacilityRoleCustomModel vm)
        {
            var newRoleId = 0;
            var frModel = FacilityRoleMapper.MapViewModelToModel(vm);
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                if (vm.RoleId == 0 && !string.IsNullOrEmpty(vm.RoleName))
                {
                    var rModel = new Role
                    {
                        RoleID = vm.RoleId,
                        CorporateId = vm.CorporateId,
                        FacilityId = vm.FacilityId, // new column added on Nov 07 2014 by Shashank
                        IsActive = vm.IsActive,
                        RoleName = vm.RoleName,
                        CreatedBy = vm.CreatedBy,
                        CreatedDate = vm.CreatedDate,
                        ModifiedBy = vm.ModifiedBy,
                        ModifiedDate = vm.ModifiedDate,
                        IsDeleted = vm.IsDeleted,
                        DeletedBy = vm.DeletedBy,
                        DeletedDate = vm.DeletedDate,
                    };

                    using (var roleBal = new RoleBal())
                    {
                        if (!roleBal.CheckDuplicateRole(vm.RoleId, vm.RoleName))
                            newRoleId = roleBal.AddUpdateRole(rModel);
                        else
                            return 0;

                        //Add newly added role to other facilities of this corporate
                        if (vm.AddToAll)
                        {
                            var facIds = roleBal.GetFacilityIdsByCorporateId(vm.CorporateId);
                            if (facIds != null && facIds.Any())
                            {
                                facIds = facIds.Where(f => f != vm.FacilityId).ToList();
                                foreach (var facId in facIds)
                                {
                                    //Add entries in the table Role for other facilities too.
                                    var rModel1 = new Role
                                    {
                                        RoleID = 0,
                                        CorporateId = vm.CorporateId,
                                        FacilityId = facId, // new column added on Nov 07 2014 by Shashank
                                        IsActive = vm.IsActive,
                                        RoleName = vm.RoleName,
                                        CreatedBy = vm.CreatedBy,
                                        CreatedDate = vm.CreatedDate,
                                        ModifiedBy = vm.ModifiedBy,
                                        ModifiedDate = vm.ModifiedDate,
                                        IsDeleted = vm.IsDeleted,
                                        DeletedBy = vm.DeletedBy,
                                        DeletedDate = vm.DeletedDate,
                                        IsGeneric = false
                                    };

                                    var nRoleId = roleBal.AddUpdateRole(rModel1);

                                    //Add Entries in the table FacilityRole table for other facilities.
                                    frModel.FacilityId = facId;
                                    frModel.RoleId = nRoleId;
                                    rep.Create(frModel);
                                }
                            }
                        }
                    }
                }

                frModel.FacilityId = vm.FacilityId;
                frModel.RoleId = newRoleId > 0 ? newRoleId : vm.RoleId;

                if (vm.FacilityRoleId > 0)
                    rep.UpdateEntity(frModel, frModel.FacilityRoleId);
                else
                    rep.Create(frModel);

                return 1;
            }
        }

        /// <summary>
        /// Gets the facility role model by identifier.
        /// </summary>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <returns></returns>
        public FacilityRole GetFacilityRoleModelById(int facilityRoleId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var model = rep.Where(fr => !fr.IsDeleted && fr.FacilityRoleId == facilityRoleId).FirstOrDefault();
                if (model != null)
                {
                    var facilityroleModel = new FacilityRoleCustomModel
                    {
                        FacilityRoleId = model.FacilityRoleId,
                        FacilityId = model.FacilityId,
                        RoleId = model.RoleId,
                        CorporateId = model.CorporateId,
                        CreatedBy = model.CreatedBy,
                        CreatedDate = model.CreatedDate,
                        ModifiedBy = model.ModifiedBy,
                        ModifiedDate = model.ModifiedDate,
                        IsDeleted = model.IsDeleted,
                        DeletedBy = model.DeletedBy,
                        DeletedDate = model.DeletedDate,
                        IsActive = model.IsActive,
                        SchedulingApplied = model.SchedulingApplied,
                        CarePlanAccessible = model.CarePlanAccessible
                    };
                    return facilityroleModel;
                }
            }
            return new FacilityRole();
        }

        //function to check if Active Corporate Exist
        /// <summary>
        /// Checks the corporate exist.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public bool CheckCorporateExist(int corporateId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRole = rep.Where(fr => fr.IsActive && fr.IsDeleted != true && fr.CorporateId == corporateId).FirstOrDefault();
                return facilityRole != null;
            }
        }

        /// <summary>
        /// Gets the facility role list custom.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="roleId">The role identifier.</param>
        /// <returns></returns>
        public List<FacilityRoleCustomModel> GetFacilityRoleListCustom(int corporateId, int facilityId, int roleId)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = corporateId > 0 ?
                    (facilityId == 0
                    ? rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId).ToList()
                    : rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId
                                      && fr.FacilityId == facilityId).ToList())
                                      :
                                      rep.Where(fr => !fr.IsDeleted && fr.IsActive).ToList();

                if (roleId > 0)
                    facilityRoleList = facilityRoleList.Where(r => r.RoleId == roleId).ToList();


                using (var facBal = new FacilityBal())
                {
                    using (var corpBal = new CorporateBal())
                    {
                        using (var roleBal = new RoleBal())
                        {
                            list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                            {
                                FacilityRoleId = item.FacilityRoleId,
                                FacilityId = item.FacilityId,
                                RoleId = item.RoleId,
                                CorporateId = item.CorporateId,
                                CreatedBy = item.CreatedBy,
                                CreatedDate = item.CreatedDate,
                                ModifiedBy = item.ModifiedBy,
                                ModifiedDate = item.ModifiedDate,
                                IsDeleted = item.IsDeleted,
                                DeletedBy = item.DeletedBy,
                                DeletedDate = item.DeletedDate,
                                IsActive = item.IsActive,
                                FacilityName = facBal.GetFacilityNameById(item.FacilityId),
                                CorporateName = corpBal.GetCorporateNameById(item.CorporateId),
                                RoleName = roleBal.GetRoleNameById(item.RoleId)
                            }));
                        }
                    }
                }
                list = list.GroupBy(x => new { x.RoleName, x.FacilityId }).Select(x => x.FirstOrDefault()).ToList();
                return list.OrderBy(x => x.RoleName).ToList();
            }
        }


        public List<FacilityRoleCustomModel> GetFacilityRoleListByFacility(int corporateId, int facilityId, int roleId)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = corporateId > 0 ?
                    (facilityId == 0
                    ? rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId).ToList()
                    : rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId
                                      && fr.FacilityId == facilityId).ToList())
                                      :
                                      rep.Where(fr => !fr.IsDeleted && fr.IsActive).ToList();

                //if (roleId > 0)
                //    facilityRoleList = facilityRoleList.Where(r => r.RoleId == roleId).ToList();


                using (var facBal = new FacilityBal())
                {
                    using (var corpBal = new CorporateBal())
                    {
                        using (var roleBal = new RoleBal())
                        {
                            list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                            {
                                FacilityRoleId = item.FacilityRoleId,
                                FacilityId = item.FacilityId,
                                RoleId = item.RoleId,
                                CorporateId = item.CorporateId,
                                CreatedBy = item.CreatedBy,
                                CreatedDate = item.CreatedDate,
                                ModifiedBy = item.ModifiedBy,
                                ModifiedDate = item.ModifiedDate,
                                IsDeleted = item.IsDeleted,
                                DeletedBy = item.DeletedBy,
                                DeletedDate = item.DeletedDate,
                                IsActive = item.IsActive,
                                FacilityName = facBal.GetFacilityNameById(item.FacilityId),
                                CorporateName = corpBal.GetCorporateNameById(item.CorporateId),
                                RoleName = roleBal.GetRoleNameById(item.RoleId)
                            }));
                        }
                    }
                }
                list = list.GroupBy(x => new { x.RoleName, x.FacilityId }).Select(x => x.FirstOrDefault()).ToList();
                return list.OrderBy(x => x.RoleName).ToList();
            }
        }

        /// <summary>
        /// Checks if role assigned.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <param name="facilityRoleId">The facility role identifier.</param>
        /// <returns></returns>
        public bool CheckIfRoleAssigned(int roleId, int facilityRoleId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                if (facilityRoleId > 0)
                {
                    var current = rep.Where(f => f.FacilityRoleId != facilityRoleId && f.RoleId == roleId && f.IsActive).FirstOrDefault();
                    return current != null;
                }
                else
                {
                    var current = rep.Where(f => f.RoleId == roleId && f.IsActive).FirstOrDefault();
                    return current != null;
                }
            }
        }

        /// <summary>
        /// Saves the facility role if not exists.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public bool SaveFacilityRoleIfNotExists(FacilityRole model)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var currentModel = rep.Where(f => f.FacilityId == model.FacilityId && f.RoleId == model.RoleId).FirstOrDefault();
                if (currentModel != null)
                {
                    currentModel.IsActive = true;
                    currentModel.IsDeleted = false;
                }
                else
                    rep.Create(model);
                return true;
            }
        }

        #region Bind Facility Grid According to User is Admin or Not


        public List<FacilityRoleCustomModel> GetFacilityRoleListByAdminUser(int corporateId, int facilityId, int roleId)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = corporateId > 0 ?
                    (facilityId == 0
                    ? rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId).ToList()
                    : rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId
                                      && fr.FacilityId == facilityId).ToList())
                                      :
                                      rep.Where(fr => !fr.IsDeleted && fr.IsActive).ToList();

                using (var facBal = new FacilityBal())
                {
                    using (var corpBal = new CorporateBal())
                    {
                        using (var roleBal = new RoleBal())
                        {
                            list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                            {
                                FacilityRoleId = item.FacilityRoleId,
                                FacilityId = item.FacilityId,
                                RoleId = item.RoleId,
                                CorporateId = item.CorporateId,
                                CreatedBy = item.CreatedBy,
                                CreatedDate = item.CreatedDate,
                                ModifiedBy = item.ModifiedBy,
                                ModifiedDate = item.ModifiedDate,
                                IsDeleted = item.IsDeleted,
                                DeletedBy = item.DeletedBy,
                                DeletedDate = item.DeletedDate,
                                IsActive = item.IsActive,
                                FacilityName = facBal.GetFacilityNameById(item.FacilityId),
                                CorporateName = corpBal.GetCorporateNameById(item.CorporateId),
                                RoleName = roleBal.GetRoleNameById(item.RoleId)
                            }));
                        }
                    }
                }
                list = list.GroupBy(x => new { x.RoleName, x.FacilityId }).Select(x => x.FirstOrDefault()).ToList();
                return list.OrderBy(x => x.RoleName).ToList();
            }
        }


        #endregion

        public List<FacilityRoleCustomModel> GetUserTypeRoleDropDown(int corporateId, int facilityId, bool scheduledApplied)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = rep.Where(x => x.IsDeleted != true && x.CorporateId == corporateId && x.FacilityId == facilityId && x.SchedulingApplied == scheduledApplied).ToList();
                using (var roleBal = new RoleBal())
                {
                    list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                    {
                        RoleId = item.RoleId,
                        RoleName = roleBal.GetRoleNameById(item.RoleId)
                    }));
                }
                return list;
            }
        }

        public List<FacilityRoleCustomModel> GetUserTypeRoleDropDownInTaskPlan(int corporateId, int facilityId, bool carePlanAccessible)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = rep.Where(x => x.IsDeleted != true && x.CorporateId == corporateId && x.FacilityId == facilityId && x.CarePlanAccessible == carePlanAccessible).ToList();
                using (var roleBal = new RoleBal())
                {
                    list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                    {
                        RoleId = item.RoleId,
                        RoleName = roleBal.GetRoleNameById(item.RoleId)
                    }));
                }
                return list;
            }
        }



        public List<FacilityRoleCustomModel> GetActiveInActiveRecords(bool showInActive, int corporateId, int facilityId)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = corporateId > 0 ?
                    (facilityId == 0
                    ? rep.Where(fr => !fr.IsDeleted && fr.IsActive == showInActive && fr.CorporateId == corporateId).ToList()
                    : rep.Where(fr => !fr.IsDeleted && fr.IsActive == showInActive && fr.CorporateId == corporateId
                                      && fr.FacilityId == facilityId).ToList())
                                      :
                                      rep.Where(fr => !fr.IsDeleted && fr.IsActive == showInActive).ToList();

                //if (roleId > 0)
                //    facilityRoleList = facilityRoleList.Where(r => r.RoleId == roleId).ToList();


                using (var facBal = new FacilityBal())
                {
                    using (var corpBal = new CorporateBal())
                    {
                        using (var roleBal = new RoleBal())
                        {
                            list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                            {
                                FacilityRoleId = item.FacilityRoleId,
                                FacilityId = item.FacilityId,
                                RoleId = item.RoleId,
                                CorporateId = item.CorporateId,
                                CreatedBy = item.CreatedBy,
                                CreatedDate = item.CreatedDate,
                                ModifiedBy = item.ModifiedBy,
                                ModifiedDate = item.ModifiedDate,
                                IsDeleted = item.IsDeleted,
                                DeletedBy = item.DeletedBy,
                                DeletedDate = item.DeletedDate,
                                IsActive = item.IsActive,
                                FacilityName = facBal.GetFacilityNameById(item.FacilityId),
                                CorporateName = corpBal.GetCorporateNameById(item.CorporateId),
                                RoleName = roleBal.GetRoleNameById(item.RoleId)
                            }));
                        }
                    }
                }
                list = list.GroupBy(x => new { x.RoleName, x.FacilityId }).Select(x => x.FirstOrDefault()).ToList();
                return list.OrderBy(x => x.RoleName).ToList();
            }
        }

        public List<FacilityRoleCustomModel> GetFacilityRoleListData(int corporateId, int facilityId, int roleId, bool showInActive)
        {
            var list = new List<FacilityRoleCustomModel>();
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var facilityRoleList = corporateId > 0 ?
                    (facilityId == 0
                    ? rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId).ToList()
                    : rep.Where(fr => !fr.IsDeleted && fr.IsActive && fr.CorporateId == corporateId
                                      && fr.FacilityId == facilityId).ToList())
                                      :
                                      rep.Where(fr => !fr.IsDeleted && fr.IsActive).ToList();

                //if (roleId > 0)
                //    facilityRoleList = facilityRoleList.Where(r => r.RoleId == roleId).ToList();


                using (var facBal = new FacilityBal())
                {
                    using (var corpBal = new CorporateBal())
                    {
                        using (var roleBal = new RoleBal())
                        {
                            list.AddRange(facilityRoleList.Select(item => new FacilityRoleCustomModel
                            {
                                FacilityRoleId = item.FacilityRoleId,
                                FacilityId = item.FacilityId,
                                RoleId = item.RoleId,
                                CorporateId = item.CorporateId,
                                CreatedBy = item.CreatedBy,
                                CreatedDate = item.CreatedDate,
                                ModifiedBy = item.ModifiedBy,
                                ModifiedDate = item.ModifiedDate,
                                IsDeleted = item.IsDeleted,
                                DeletedBy = item.DeletedBy,
                                DeletedDate = item.DeletedDate,
                                IsActive = item.IsActive,
                                FacilityName = facBal.GetFacilityNameById(item.FacilityId),
                                CorporateName = corpBal.GetCorporateNameById(item.CorporateId),
                                RoleName = roleBal.GetRoleNameById(item.RoleId)
                            }));
                        }
                    }
                }
                list = list.GroupBy(x => new { x.RoleName, x.FacilityId }).Select(x => x.FirstOrDefault()).ToList();
                return list.OrderBy(x => x.RoleName).ToList();
            }
        }

        public bool IsSchedulingApplied(int roleId)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var fr = rep.Where(f => f.IsActive && !f.IsDeleted && f.RoleId == roleId).FirstOrDefault();
                return fr != null && fr.SchedulingApplied;
            }
        }


        public int SaveFacilityRole(FacilityRoleCustomModel vm, long userId, DateTime currentDate)
        {
            using (var rep = UnitOfWork.FacilityRoleRepository)
            {
                var model = FacilityRoleMapper.MapViewModelToModel(vm);
                vm.RoleName = string.IsNullOrEmpty(vm.RoleName) ? string.Empty : vm.RoleName;
                return rep.SaveFacilityRole(model, vm.AddToAll, vm.RoleName, userId, currentDate);
            }
        }
    }
}
