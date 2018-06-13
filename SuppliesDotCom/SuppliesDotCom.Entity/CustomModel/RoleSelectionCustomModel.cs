
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class RoleSelectionCustomModel
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int FacilityId { get; set; }
        public string FacilityName { get; set; }
        public int CorporateId { get; set; }
    }
}
