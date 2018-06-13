using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class GlobalCodeCategoryCustomModel
    {
        public string FacilityName { get; set; }
        public string GlobalCodeCategoryName { get; set; }
        public string GlobalCodeCategoryValue { get; set; }
    }
}
