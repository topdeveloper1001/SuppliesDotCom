using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class AuditLogCustomModel : AuditLog
    {
        public string UserName { get; set; }
        public string AssignedRoles { get; set; }
        public string AssignedFacilities { get; set; }
    }
}
