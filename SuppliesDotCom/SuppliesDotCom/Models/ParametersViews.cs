using System.Collections.Generic;

using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class ParametersView
    {
     
        public Parameters CurrentParameters { get; set; }
        public List<ParametersCustomModel> ParametersList { get; set; }

    }
}
