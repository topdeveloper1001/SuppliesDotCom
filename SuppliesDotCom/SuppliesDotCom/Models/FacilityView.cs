using System.Collections.Generic;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    //public class Facility
    //{
    //    public List<FacilityViewModel> FacilityList { get; set; }

    //    public FacilityViewModel CurrentFacility { get; set; }

    //    public string FacilityNumber { get; set; }
    //}

    public class FacilityView
    {
        public List<FacilityCustomModel> FacilityList { get; set; }
        public Facility CurrentFacility { get; set; }
        public string FacilityNumber { get; set; }
    }


    //public class FacilityVM : Facility
    //{
 
    //}
}