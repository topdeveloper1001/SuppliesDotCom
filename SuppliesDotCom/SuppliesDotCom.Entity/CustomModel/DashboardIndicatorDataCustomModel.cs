
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class DashboardIndicatorDataCustomModel : DashboardIndicatorData
    {
        public string FacilityNameStr { get; set; }
        public string CorporateName { get; set; }
        public string CreatedByName { get; set; }
        public string MonthStr { get; set; }
        public string IndicatorStr { get; set; }
        public string BudgetType { get; set; }
        public string SubCategory1Str { get; set; }
        public string SubCategory2Str { get; set; }
        public string StaticBudgetValue { get; set; }
    }
}
