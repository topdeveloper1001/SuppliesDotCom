using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardIndicatorsView
    {
        public DashboardIndicators CurrentDashboardIndicators { get; set; }
        public List<DashboardIndicatorsCustomModel> DashboardIndicatorsList { get; set; }
    }
}
