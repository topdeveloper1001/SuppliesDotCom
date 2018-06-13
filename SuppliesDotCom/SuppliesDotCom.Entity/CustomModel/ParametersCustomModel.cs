using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class ParametersCustomModel : Parameters
    {
        public string ParamLevelName { get; set; }
        public string ParamTypeName { get; set; }
        public string ParamDataTypeName { get; set; }
        public string Value1 { get; set; }
        public string Value2 { get; set; }
    }
}
