using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class TabsCustomModel
    {
        public Tabs CurrentTab { get; set; }
        public string ParentTabName { get; set; }

        public List<TabsCustomModel> ChildItems { get; set; }

        public string TabId { get; set; }
        public string ParentTabId { get; set; }
        public bool HasChilds { get; set; }
    }

    [NotMapped]
    public class TabsAccessible
    {
        public bool IsAccessible { get; set; }
        public int TabId { get; set; }
    }

    [NotMapped]
    public class TabsData
    {
        public int ExecutionStatus { get; set; }
        public IEnumerable<Tabs> TabsByRole { get; set; }
        public IEnumerable<TabsCustomModel> AllTabs { get; set; }
    }
}
