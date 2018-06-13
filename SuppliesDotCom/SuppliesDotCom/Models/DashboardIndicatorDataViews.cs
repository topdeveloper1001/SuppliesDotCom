using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardIndicatorDataView
    {
     
        public DashboardIndicatorData CurrentDashboardIndicatorData { get; set; }
        public List<DashboardIndicatorDataCustomModel> DashboardIndicatorDataList { get; set; }

    }
}
