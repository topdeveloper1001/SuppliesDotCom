using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class BillingSystemParametersCustomModel : BillingSystemParameters
    {
        public string FacilityName { get; set; }
        public string Country { get; set; }
    }
}
