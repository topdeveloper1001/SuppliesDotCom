using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardDisplayOrderView
    {
     
        public DashboardDisplayOrder CurrentDashboardDisplayOrder { get; set; }
        public List<DashboardDisplayOrderCustomModel> DashboardDisplayOrderList { get; set; }

    }
}
