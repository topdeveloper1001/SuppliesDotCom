using SuppliesDotCom.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;


namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class RolePermissionBal : BaseBal
    {
        //function to get all role Permissions
        public List<RolePermission> GetAllRolePermissions()
        {
            try
            {              
                using (var rolePermissionRep = UnitOfWork.RolePermissionRepository)
                {
                   var list = rolePermissionRep.GetAll().ToList();
                   return list;
                }                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Function to get Role Permission by RoleID
        public List<RolePermission> GetRolePermissionByRoleId(int? roleId)
        {
            try
            {              
                using (var rolePermissionRep = UnitOfWork.RolePermissionRepository)
                {
                   var list = rolePermissionRep.Where(rp => rp.RoleID == roleId).ToList();
                   return list;
                }               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Function to add/delete role permissions
        public int AddUpdateRolePermission(List<RolePermission> rolePermissionList)
        {
            var result = -1;
            var newList = new List<RolePermission>();
            using (var transScope = new TransactionScope())
            {
                using (var rolePermissionRep = UnitOfWork.RolePermissionRepository)
                {
                    var listToBeDeleted = new List<RolePermission>();
                    var iqueryableList = rolePermissionRep.GetAll();
                    foreach (var i in iqueryableList)
                    {
                        if (rolePermissionList.Any(r => r.RoleID == i.RoleID))
                            listToBeDeleted.Add(i);
                    }
                    rolePermissionRep.Delete(listToBeDeleted);

                    foreach (var item in rolePermissionList)
                    {
                        newList.Add(item);
                    }
                    result = Convert.ToInt32(rolePermissionRep.Create(newList));
                    transScope.Complete();
                }
            }
            return result;
        }
    }
}
