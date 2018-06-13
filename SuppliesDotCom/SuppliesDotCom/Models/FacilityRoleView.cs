using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class FacilityRoleView
    {
        public FacilityRoleCustomModel CurrentFacilityRole { get; set; }
        public List<FacilityRoleCustomModel> FacilityRolesList { get; set; }
    }
}
