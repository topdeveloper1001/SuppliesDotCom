using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class FacilityDepartmentView
    {
     
        public FacilityDepartment CurrentFacilityDepartment { get; set; }
        public List<FacilityDepartmentCustomModel> FacilityDepartmentList { get; set; }

    }
}
