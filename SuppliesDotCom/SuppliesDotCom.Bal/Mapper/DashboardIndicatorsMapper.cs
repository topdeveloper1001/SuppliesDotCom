using System;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class DashboardIndicatorsMapper : Mapper<DashboardIndicators, DashboardIndicatorsCustomModel>
    {
        public override DashboardIndicatorsCustomModel MapModelToViewModel(DashboardIndicators model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                vm.FacilityNameStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
                vm.FerquencyTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.FerquencyType),
                    Convert.ToString((int)GlobalCodeCategoryValue.DashboardFrequencyType));
                vm.FormatTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.FormatType),
                    Convert.ToString((int)GlobalCodeCategoryValue.DashboardFormatType));
                vm.UsernameStr = bal.GetNameByUserId(model.CreatedBy);
                vm.TypeOfData = !string.IsNullOrEmpty(model.ExternalValue3) ? bal.GetNameByGlobalCodeValue(model.ExternalValue3,
                    Convert.ToString((int) GlobalCodeCategoryValue.TypeofData)) : string.Empty;

                vm.DashboardTypeStr = "";

                if (!string.IsNullOrEmpty(model.SubCategory1) && !model.SubCategory1.Equals("0"))
                {
                    int subCategory1;
                    if (int.TryParse(model.SubCategory1, out subCategory1) && !string.IsNullOrEmpty(model.SubCategory2))
                    {
                        var gc =
                            bal.GetGlobalCodeByCategoryAndCodeValue(
                                Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories1), model.SubCategory1);

                        vm.SubCategoryFirst = gc.GlobalCodeName;
                        //vm.SubCategorySecond = string.IsNullOrEmpty(gc.ExternalValue1)
                        //    ? string.Empty
                        //    //: bal.GetNameByGlobalCodeValue(model.SubCategory2, gc.ExternalValue1);
                        //    : bal.GetNameByGlobalCodeValue(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2));

                        vm.SubCategorySecond = bal.GetNameByGlobalCodeValue(model.SubCategory2,
                            Convert.ToString((int) GlobalCodeCategoryValue.KpiSubCategories2));
                    }
                }
                else
                {
                    vm.SubCategoryFirst = string.Empty;
                    if (!string.IsNullOrEmpty(model.SubCategory2))
                        vm.SubCategorySecond = bal.GetNameByGlobalCodeValue(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2));
                }
            }
            return vm;
        }
    }
}
