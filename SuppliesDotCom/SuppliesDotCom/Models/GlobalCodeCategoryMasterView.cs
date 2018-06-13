using SuppliesDotCom.Model;
using System.Collections.Generic;


namespace SuppliesDotCom.Models
{
    public class GlobalCodeCategoryMasterView
    {
        public List<GlobalCodeCategory> Categories { get; set; }
        public GlobalCodeCategory GCC { get; set; }
        //public List<Facility> LstFacility { get; set; }
    }
}