using System;
using System.Globalization;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class DashboardIndicatorDataMapper : Mapper<DashboardIndicatorData, DashboardIndicatorDataCustomModel>
    {
        public override DashboardIndicatorDataCustomModel MapModelToViewModel(DashboardIndicatorData model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                vm.FacilityNameStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
                vm.MonthStr = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Convert.ToInt32(model.Month));
                vm.IndicatorStr = bal.GetIndicatorNameByIndicatornumber((model.IndicatorNumber), Convert.ToInt32(model.CorporateId));
                if (!string.IsNullOrEmpty(model.ExternalValue1))
                    vm.BudgetType = bal.GetNameByGlobalCodeValue(model.ExternalValue1,
                        Convert.ToString((int)GlobalCodeCategoryValue.DashBoardBudgetType));
                if (!string.IsNullOrEmpty(model.SubCategory1) && !model.SubCategory1.Equals("0"))
                {
                    int subCategory1;
                    if (int.TryParse(model.SubCategory1, out subCategory1) && !string.IsNullOrEmpty(model.SubCategory2))
                    {
                        var gc =
                            bal.GetGlobalCodeByCategoryAndCodeValue(
                                Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories1), model.SubCategory1);

                        vm.SubCategory1Str = gc.GlobalCodeName;
                        vm.SubCategory2Str = string.IsNullOrEmpty(gc.ExternalValue1)
                            ? string.Empty
                            : bal.GetNameByGlobalCodeValue(model.SubCategory2, gc.ExternalValue1);
                    }
                }
                else
                {
                    vm.SubCategory1Str = string.Empty;
                    if (!string.IsNullOrEmpty(model.SubCategory2))
                        vm.SubCategory2Str = bal.GetNameByGlobalCodeValue(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2));
                }
            }
            return vm;
        }

        public override DashboardIndicatorData MapViewModelToModel(DashboardIndicatorDataCustomModel vm)
        {
            var model = base.MapViewModelToModel(vm);
            if (model != null)
            {
                using (var bal = new BaseBal())
                {
                    if (!string.IsNullOrEmpty(vm.FacilityNameStr))
                    {
                        vm.FacilityNameStr = vm.FacilityNameStr.Trim();
                        model.FacilityId = bal.GetFacilityIdFromName(vm.FacilityNameStr);
                    }
                    if (!string.IsNullOrEmpty(vm.CorporateName))
                    {
                        vm.CorporateName = vm.CorporateName.Trim();
                        model.CorporateId = bal.GetCorporateIdFromName(vm.CorporateName);
                    }
                    model.ExternalValue1 =
                        bal.GetGlobalCodeIdByName(Convert.ToString((int)GlobalCodeCategoryValue.DashBoardBudgetType),
                            vm.BudgetType);
                }
            }
            return model;
        }
    }
}
