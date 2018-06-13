using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardParametersView
    {
     
        public DashboardParameters CurrentDashboardParameters { get; set; }
        public List<DashboardParametersCustomModel> DashboardParametersList { get; set; }

    }
}
