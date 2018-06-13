using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class DashboardTransactionCounterView
    {
     
        public DashboardTransactionCounter CurrentDashboardTransactionCounter { get; set; }
        public List<DashboardTransactionCounterCustomModel> DashboardTransactionCounterList { get; set; }

    }
}
