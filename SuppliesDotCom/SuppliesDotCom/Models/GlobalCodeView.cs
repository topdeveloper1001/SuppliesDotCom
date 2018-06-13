using SuppliesDotCom.Model;
using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Models
{
    public class GlobalCodeView
    {
        //public List<GlobalCodes> GlobalCodesList { get; set; }
        public List<GlobalCodeListView> GlobalCodesList { get; set; }
        public GlobalCodes CurrentGlobalCode { get; set; }
        public List<GlobalCodeCategory> GlobalCodeCategoryList { get; set; }
        public List<Facility> LstFacility { get; set; }
        public List<GlobalCodeCustomModel> CodesList { get; set; }
        public string GlobalCategoryName { get; set; }
        public bool WithExternalValues { get; set; }
        public bool WithCategoryDropdown { get; set; }
        public string GlobalCodeCategoryParentValue { get; set; }

        public List<string> ExternalValueLabelsList { get; set; }
        public bool ShowDescription { get; set; }
        public string MaxValue { get; set; }
        //public List<GlobalCodes> ListOfGlobalCodes { get; set; }
    }
    public class GlobalCodeListView : GlobalCodes
    {
        public string GlobalCodeCategoryName { get; set; }
        public string SubCategory1 { get; set; }
        public string SubCategory1Text { get; set; }
        public string SubCategoryOptionSelected { get; set; }
    }
}