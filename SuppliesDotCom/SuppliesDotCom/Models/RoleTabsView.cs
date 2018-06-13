using SuppliesDotCom.Model;
using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class RoleTabsView
    {
        public Role CurrentRole { get; set; }
        public IEnumerable<TabsCustomModel> TabList { get; set; }
        public List<Role> RoleList { get; set; }
    }
}