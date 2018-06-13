using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class UsersCustomModel
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string FacilityNames { get; set; }
        public Users CurrentUser { get; set; }
        public string PhoneNumber { get; set; }
        public string HomePhoneNumber { get; set; }
        public string Name { get; set; }
        public string CodeValue { get; set; }
        public string CorporateName { get; set; }
    }

    [NotMapped]
    public class UsersViewModel : Users
    {
        public string CodeValue { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
        public string EnterCode { get; set; }
        public string Name { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string ClinicianName { get; set; }
    }
}
