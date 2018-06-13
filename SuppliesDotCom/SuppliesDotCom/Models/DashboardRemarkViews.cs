using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardRemarkView
    {
     
        public DashboardRemark CurrentDashboardRemark { get; set; }
        public List<DashboardRemarkCustomModel> DashboardRemarkList { get; set; }

    }
}
