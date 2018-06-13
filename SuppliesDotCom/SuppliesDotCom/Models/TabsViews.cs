using System.Collections.Generic;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class TabsView
    {
        public Tabs CurrentTabs { get; set; }
        public List<TabsCustomModel> TabsList { get; set; }
    }
}
