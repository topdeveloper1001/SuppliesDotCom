using System;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using System.Globalization;

namespace SuppliesDotCom.Bal.Mapper
{
    public class DashboardRemarkMapper : Mapper<DashboardRemark, DashboardRemarkCustomModel>
    {
        public override DashboardRemarkCustomModel MapModelToViewModel(DashboardRemark model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                vm.FacilityStr = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
                vm.DashboardTypeStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.DashboardType),
                    Convert.ToString((int)GlobalCodeCategoryValue.ExternalDashboardType));

                if (Convert.ToInt32(model.DashboardType) > 0)
                {
                    var gc =
                            bal.GetGlobalCodeByCategoryAndCodeValue(
                                Convert.ToString((int)GlobalCodeCategoryValue.ExternalDashboardType), Convert.ToString(model.DashboardType));

                    vm.DashboardTypeStr = gc.GlobalCodeName;
                    vm.DashboardSectionStr = !string.IsNullOrEmpty(gc.ExternalValue1) &&
                                             Convert.ToInt32(model.DashboardSection) > 0
                        ? bal.GetNameByGlobalCodeValue(model.DashboardSection, gc.ExternalValue1)
                        : string.Empty;
                }
                else
                {
                    vm.DashboardTypeStr = string.Empty;
                    vm.DashboardSectionStr = string.Empty;
                }

                vm.DashboardMonth = Convert.ToInt32(model.Month) > 0
                        ? CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(Convert.ToInt32(model.Month))
                        : string.Empty;
            }
            return vm;
        }
    }
}
