using System.Collections.Generic;

using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class CorporateView
    {
     
        public Corporate CurrentCorporate { get; set; }
        public List<Corporate> CorporateList { get; set; }
        //public List<CorporateCustomModel> CorporateList { get; set; }
    }
}
