

using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class DashboardIndicatorsCustomModel : DashboardIndicators
    {
        public string FacilityNameStr { get; set; }
        public string UsernameStr { get; set; }
        public string DashboardTypeStr { get; set; }
        public string FormatTypeStr { get; set; }
        public string FerquencyTypeStr { get; set; }
        public string SubCategoryFirst { get; set; }
        public string SubCategorySecond { get; set; }
        public string TypeOfData { get; set; }
    }
}
