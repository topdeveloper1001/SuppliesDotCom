using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class FacilityStructureView
    {
        public FacilityStructureCustomModel CurrentFacilityStructure { get; set; }
        public List<FacilityStructureCustomModel> FacilityStructureList { get; set; }

    }
}
