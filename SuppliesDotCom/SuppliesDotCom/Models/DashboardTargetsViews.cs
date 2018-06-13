using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardTargetsView
    {
        public DashboardTargets CurrentDashboardTargets { get; set; }
        public List<DashboardTargetsCustomModel> DashboardTargetsList { get; set; }
    }
}
