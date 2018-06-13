using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class FacilityDepartmentCustomModel : FacilityDepartment
    {
      public string ActivityNameStr { get; set; }
    }
}
