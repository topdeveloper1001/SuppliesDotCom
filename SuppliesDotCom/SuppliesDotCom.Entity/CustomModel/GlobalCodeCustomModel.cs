
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class GlobalCodeCustomModel
    {
        public GlobalCodes GlobalCodes { get; set; }
        public string GlobalCodeCustomValue { get; set; }
        public string CodeType { get; set; }
        public string ValuesRange { get; set; }
        public string UnitOfMeasure { get; set; }

        public string SubCategory1 { get; set; }
        public string SubCategory2 { get; set; }
        public string GcValue { get; set; }
        public int GcId { get; set; }
    }
    [NotMapped]
    public class GlobalCodeSaveModel : GlobalCodes
    {
        public string GlobalCodeCategoryValueStr { get; set; }
        public string GlobalCodeCategoryNameStr { get; set; }
        public string GlobalCodeCategoryDesc { get; set; }
    }
    [NotMapped]
    public class GlobalCodeModel : GlobalCodes
    {
        public string GlobalCodeCategoryName { get; set; }

        public string CodeValue1 { get; set; }
        public string CodeExternal1Val1Str { get; set; }
        public string CodeExternal2Val1Str { get; set; }


        public string CodeValue2 { get; set; }
        public string CodeExternal1Val2Str { get; set; }
        public string CodeExternal2Val2Str { get; set; }

        public string CodeValue3 { get; set; }
        public string CodeDescription3 { get; set; }
        public string CodeExternal1Val3Str { get; set; }
        public string CodeExternal2Val3Str { get; set; }

        public string CodeValue4 { get; set; }
        public string CodeDescription4 { get; set; }
        public string CodeExternal1Val4Str { get; set; }
        public string CodeExternal2Val4Str { get; set; }

        public string CodeValue5 { get; set; }
        public string CodeDescription5 { get; set; }
        public string CodeExternal1Val5Str { get; set; }
        public string CodeExternal2Val5Str { get; set; }

        public string CodeValue6 { get; set; }
        public string CodeExternal1Val6Str { get; set; }
        public string CodeExternal2Val6Str { get; set; }


        public string CodeValue7 { get; set; }
        public string CodeExternal1Val7Str { get; set; }
        public string CodeExternal2Val7Str { get; set; }

        public string CodeValue8 { get; set; }
        public string CodeExternal1Val8Str { get; set; }
        public string CodeExternal2Val8Str { get; set; }

        public string CodeValue9 { get; set; }
        public string CodeExternal1Val9Str { get; set; }
        public string CodeExternal2Val9Str { get; set; }

        public string CodeValue10 { get; set; }
        public string CodeExternal1Val10Str { get; set; }
        public string CodeExternal2Val10Str { get; set; }

        public string CodeValue11 { get; set; }
        public string CodeExternal1Val11Str { get; set; }
        public string CodeExternal2Val11Str { get; set; }

        public string CodeValue12 { get; set; }
        public string CodeExternal1Val12Str { get; set; }
        public string CodeExternal2Val12Str { get; set; }

        public string CodeValue13 { get; set; }
        public string CodeExternal1Val13Str { get; set; }
        public string CodeExternal2Val13Str { get; set; }

        public string CodeValue14 { get; set; }
        public string CodeExternal1Val14Str { get; set; }
        public string CodeExternal2Val14Str { get; set; }


        public string CodeValue15 { get; set; }
        public string CodeExternal1Val15Str { get; set; }
        public string CodeExternal2Val15Str { get; set; }

    }

    [NotMapped]
    public class GlobalCodeCustomDModel : GlobalCodes
    {
        public string RoomId { get; set; }
        public string RoomSTR { get; set; }
        public int CorporateId { get; set; }
        public string FacultyId { get; set; }
        public string DeptId { get; set; }
    }
}
