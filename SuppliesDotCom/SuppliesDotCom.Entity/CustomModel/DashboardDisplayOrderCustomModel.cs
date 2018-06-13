using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class DashboardDisplayOrderCustomModel : DashboardDisplayOrder
    {
        public string FacilityStr { get; set; }
        public string DashboardTypeStr { get; set; }
        public string DashboardSectionStr { get; set; }
        public string IndicatorStr { get; set; }
        public string SubCategory1Str { get; set; }
        public string SubCategory2Str { get; set; }
    }
}
