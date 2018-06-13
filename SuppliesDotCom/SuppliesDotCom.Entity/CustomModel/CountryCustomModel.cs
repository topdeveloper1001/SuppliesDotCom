using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class CountryCustomModel : Country
    {
        public string CountryWithCode { get; set; }
    }
}
