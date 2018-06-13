using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class FacilityRoleCustomModel : FacilityRole
    {
        //public FacilityRole FacilityRole { get; set; }
        public string CorporateName { get; set; }
        public string RoleName { get; set; }
        public string FacilityName { get; set; }
        public bool AddToAll { get; set; }
    }
}
