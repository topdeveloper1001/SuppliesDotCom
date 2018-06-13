using System;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class DashboardDisplayOrderMapper : Mapper<DashboardDisplayOrder, DashboardDisplayOrderCustomModel>
    {
        public override DashboardDisplayOrderCustomModel MapModelToViewModel(DashboardDisplayOrder model)
        {
            var vm = base.MapModelToViewModel(model);
            if (vm != null)
            {
                using (var bal = new BaseBal())
                {
                    vm.FacilityStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
                    vm.DashboardTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.DashboardId),
                        Convert.ToString((int) GlobalCodeCategoryValue.ExternalDashboardType));
                    if (Convert.ToInt32(model.DashboardId) > 0)
                    {
                        var gc =
                                bal.GetGlobalCodeByCategoryAndCodeValue(
                                    Convert.ToString((int)GlobalCodeCategoryValue.ExternalDashboardType), Convert.ToString(model.DashboardId));

                        vm.DashboardTypeStr = gc.GlobalCodeName;
                        vm.DashboardSectionStr = !string.IsNullOrEmpty(gc.ExternalValue1) &&
                                                 Convert.ToInt32(model.SectionId) > 0
                            ? bal.GetNameByGlobalCodeValue(model.SectionId, gc.ExternalValue1)
                            : string.Empty;
                    }
                    else
                    {
                        vm.DashboardTypeStr = string.Empty;
                        vm.DashboardSectionStr = string.Empty;
                    }
                    vm.IndicatorStr = bal.GetIndicatorNameByIndicatornumber((model.IndicatorNumber),
                        Convert.ToInt32(model.CorporateId));
                    if (!string.IsNullOrEmpty(model.SubCategory1) && !model.SubCategory1.Equals("0"))
                    {
                        int subCategory1;
                        if (int.TryParse(model.SubCategory1, out subCategory1) && !string.IsNullOrEmpty(model.SubCategory2))
                        {
                            var gc =
                                bal.GetGlobalCodeByCategoryAndCodeValue(
                                    Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories1), model.SubCategory1);

                            vm.SubCategory1Str = gc.GlobalCodeName;
                            vm.SubCategory2Str = bal.GetNameByGlobalCodeValueAndSubCategory1(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2), model.SubCategory1);
                        }
                    }
                    else
                    {
                        vm.SubCategory1Str = string.Empty;
                        if (!string.IsNullOrEmpty(model.SubCategory2))
                            vm.SubCategory2Str = bal.GetNameByGlobalCodeValue(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2));
                    }
                }
            }
            return vm;
        }
    }
}
