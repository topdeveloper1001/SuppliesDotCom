using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class FacilityCustomModel : Facility
    {
        public string CorporateName { get; set; }
        public string Region { get; set; }
    }
}
