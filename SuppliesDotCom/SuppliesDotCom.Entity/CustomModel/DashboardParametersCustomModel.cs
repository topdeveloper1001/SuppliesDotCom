
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class DashboardParametersCustomModel : DashboardParameters
    {
        public string DashboardTypeStr { get; set; }
        public string IndicatorCategoryStr { get; set; }
        public string DataFieldStr { get; set; }
        public string ValueTypeStr { get; set; }
        public string ArgumentStr { get; set; }
        public string ColorCodeStr { get; set; }
        public string ExternalDashboardTypeStr { get; set; }
    }

    [NotMapped]
    public class DashboardParametersRangeCustomModel
    {
        public string IndicatorCategory { get; set; }
        public string Argument { get; set; }
        public string GoodRangeFrom { get; set; }
        public string GoodRangeTo { get; set; }
        public string ModerateFrom { get; set; }
        public string ModerateTo { get; set; }
        public string BadRangeFrom { get; set; }
        public string BadRangeTo { get; set; }
        public string ValueType { get; set; }
    }
}
