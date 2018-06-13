using System;
using System.Globalization;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class ManualDashboardMapper : Mapper<ManualDashboard, ManualDashboardCustomModel>
    {
        /// <summary>
        /// Maps the model to view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public override ManualDashboardCustomModel MapModelToViewModel(ManualDashboard model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                vm.BudgetTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.BudgetType),
                    Convert.ToString((int)GlobalCodeCategoryValue.DashBoardBudgetType));
                vm.DashboardTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.DashboardType),
                    Convert.ToString((int)GlobalCodeCategoryValue.ExternalDashboardType));
                vm.KPICategoryTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.KPICategory),
                   Convert.ToString((int)GlobalCodeCategoryValue.KPICategoryType));
                vm.FrequencyTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.Frequency),
                   Convert.ToString((int)GlobalCodeCategoryValue.DashboardFrequencyType));
                vm.IndicatorTypeStr = bal.GetIndicatorNameByIndicatornumber(model.Indicators.ToString(), Convert.ToInt32(model.CorporateId));
                vm.FacilityStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
            }
            return vm;
        }
    }

    //ExternalDashboardModelMapper
    public class ManualDashboardCustomMapper : Mapper<ManualDashboardModel, ManualDashboardCustomModel>
    {
        /// <summary>
        /// Maps the model to view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public override ManualDashboardCustomModel MapModelToViewModel(ManualDashboardModel model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                vm.BudgetTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.BudgetType),
                    Convert.ToString((int)GlobalCodeCategoryValue.DashBoardBudgetType));
                vm.DashboardTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.DashboardType),
                    Convert.ToString((int)GlobalCodeCategoryValue.ExternalDashboardType));
                vm.KPICategoryTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.KPICategory),
                   Convert.ToString((int)GlobalCodeCategoryValue.KPICategoryType));
                vm.FrequencyTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.Frequency),
                   Convert.ToString((int)GlobalCodeCategoryValue.DashboardFrequencyType));
                vm.IndicatorTypeStr = bal.GetIndicatorNameByIndicatornumber(model.Indicators.ToString(),
                    Convert.ToInt32(model.CorporateId));
                vm.FacilityStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
                vm.CorporateStr = bal.GetNameByCorporateId(Convert.ToInt32(model.CorporateId));
                //vm.SubCategoryValue1Str = bal.GetSubcategoryValue(model.SubCategory1,"0");
                //vm.SubCategoryValue2Str = bal.GetSubcategoryValue(model.SubCategory1, model.SubCategory2);
                if (!string.IsNullOrEmpty(model.SubCategory1) && !model.SubCategory1.Equals("0"))
                {
                    int subCategory1;
                    if (int.TryParse(model.SubCategory1, out subCategory1) && !string.IsNullOrEmpty(model.SubCategory2))
                    {
                        var gc =
                            bal.GetGlobalCodeByCategoryAndCodeValue(
                                Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories1), model.SubCategory1);

                        vm.SubCategoryValue1Str = gc.GlobalCodeName;
                        vm.SubCategoryValue2Str = string.IsNullOrEmpty(gc.ExternalValue1)
                            ? string.Empty
                            : bal.GetNameByGlobalCodeValue(model.SubCategory2, gc.ExternalValue1);
                    }
                    else
                    {
                        var gc =
                            bal.GetGlobalCodeByCategoryAndCodeValue(
                                Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories1), model.SubCategory1);
                        vm.SubCategoryValue1Str = gc.GlobalCodeName;
                        vm.SubCategoryValue2Str = string.Empty;
                    }
                }
                else
                {
                    vm.SubCategoryValue1Str = string.Empty;
                    if (!string.IsNullOrEmpty(model.SubCategory2))
                        vm.SubCategoryValue2Str = bal.GetNameByGlobalCodeValue(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2));
                }
            }
            return vm;
        }
    }

    public class ManualDashboardCustomMapper1 : Mapper<ManualDashboardModel, ManualDashboardCustomModel>
    {
        /// <summary>
        /// Maps the model to view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public override ManualDashboardCustomModel MapModelToViewModel(ManualDashboardModel model)
        {
            var vm = base.MapModelToViewModel(model);
            //using (var bal = new BaseBal())
            //{
            //vm.BudgetTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.BudgetType),
            //    Convert.ToString((int)GlobalCodeCategoryValue.DashBoardBudgetType));
            //vm.DashboardTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.DashboardType),
            //    Convert.ToString((int)GlobalCodeCategoryValue.DashboardType));
            //vm.KPICategoryTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.KPICategory),
            //   Convert.ToString((int)GlobalCodeCategoryValue.KPICategoryType));
            //vm.FrequencyTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.Frequency),
            //   Convert.ToString((int)GlobalCodeCategoryValue.DashboardFrequencyType));
            //vm.IndicatorTypeStr = bal.GetIndicatorNameByIndicatornumber(model.Indicators.ToString());
            //vm.FacilityStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
            //vm.CorporateStr = bal.GetNameByCorporateId(Convert.ToInt32(model.CorporateId));
            ////vm.SubCategoryValue1Str = bal.GetSubcategoryValue(model.SubCategory1,"0");
            ////vm.SubCategoryValue2Str = bal.GetSubcategoryValue(model.SubCategory1, model.SubCategory2);
            //if (!string.IsNullOrEmpty(model.SubCategory1) && !model.SubCategory1.Equals("0"))
            //{
            //    int subCategory1;
            //    if (int.TryParse(model.SubCategory1, out subCategory1) && !string.IsNullOrEmpty(model.SubCategory2))
            //    {
            //        var gc =
            //            bal.GetGlobalCodeByCategoryAndCodeValue(
            //                Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories1), model.SubCategory1);

            //        vm.SubCategoryValue1Str = gc.GlobalCodeName;
            //        vm.SubCategoryValue2Str = string.IsNullOrEmpty(gc.ExternalValue1)
            //            ? string.Empty
            //            : bal.GetNameByGlobalCodeValue(model.SubCategory2, gc.ExternalValue1);
            //    }
            //}
            //else
            //{
            //    vm.SubCategoryValue1Str = string.Empty;
            //    if (!string.IsNullOrEmpty(model.SubCategory2))
            //        vm.SubCategoryValue2Str = bal.GetNameByGlobalCodeValue(model.SubCategory2, Convert.ToString((int)GlobalCodeCategoryValue.KpiSubCategories2));
            //}
            //}
            return vm;
        }
    }

    //ExternalDashboardModelMapper
    public class PatientFallCustomMapper : Mapper<PatientFallStats, PatientFallStats>
    {
        /// <summary>
        /// Maps the model to view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public override PatientFallStats MapModelToViewModel(PatientFallStats model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                vm.MonthSTR = model.Month == "0"
                    ? "TOTAL"
                    : CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Convert.ToInt32(model.Month));
            }
            return vm;
        }
    }
}
