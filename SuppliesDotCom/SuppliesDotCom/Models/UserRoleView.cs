using SuppliesDotCom.Model;
using System.Collections.Generic;

namespace SuppliesDotCom.Models
{
    public class UserRoleView
    {
        public int UserID { get; set; }
        public List<Role> RolesList { get; set; }
        public List<Users> UsersList { get; set; }
    }
}