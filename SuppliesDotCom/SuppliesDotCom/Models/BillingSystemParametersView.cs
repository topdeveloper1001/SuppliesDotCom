using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Models
{
    public class BillingSystemParametersView
    {
        public BillingSystemParameters CurrentBillingSystemParameters { get; set; }
        public List<BillingSystemParametersCustomModel> BillingSystemParametersList { get; set; }
    }
}
