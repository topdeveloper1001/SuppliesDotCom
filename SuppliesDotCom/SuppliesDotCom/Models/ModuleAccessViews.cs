using System.Collections.Generic;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class ModuleAccessView
    {
     
        public ModuleAccess CurrentModuleAccess { get; set; }
        public List<ModuleAccess> ModuleAccessList { get; set; }
        public IEnumerable<TabsCustomModel> TabList { get; set; }
    }
}
