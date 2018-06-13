using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class DashboardTargetsCustomModel : DashboardTargets
    {
        public string RoleName { get; set; }
        public string UOMstr { get; set; }
        public string TimmingIncrementStr { get; set; }
    }
}
