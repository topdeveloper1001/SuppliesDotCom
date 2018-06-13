
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class DashboardRemarkCustomModel : DashboardRemark
    {
        public string FacilityStr { get; set; }
        public string DashboardTypeStr { get; set; }
        public string DashboardSectionStr { get; set; }
        public string DashboardMonth { get; set; }
    }
}
