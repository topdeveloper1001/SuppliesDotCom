using System;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class FacilityMapper : Mapper<Facility, FacilityCustomModel>
    {
        public override FacilityCustomModel MapModelToViewModel(Facility model)
        {
            var vm = base.MapModelToViewModel(model);
            if (vm != null)
            {
                using (var bal = new BaseBal())
                {
                    int value;
                    if (!string.IsNullOrEmpty(vm.RegionId) && int.TryParse(vm.RegionId, out value))
                        vm.Region = bal.GetNameByGlobalCodeValue(model.RegionId, Convert.ToString((int)GlobalCodeCategoryValue.FacilityRegions));

                    if (model.CorporateID != null && Convert.ToInt32(model.CorporateID) > 0)
                        vm.CorporateName = bal.GetNameByCorporateId(Convert.ToInt32(model.CorporateID));
                }
            }
            return vm;
        }
    }
}
