using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardBudgetView
    {
     
        public DashboardBudget CurrentDashboardBudget { get; set; }
        public List<DashboardBudgetCustomModel> DashboardBudgetList { get; set; }

    }
}
