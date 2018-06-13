using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using System;

namespace SuppliesDotCom.Bal.Mapper
{
    public class FacilityStructureMapper : Mapper<FacilityStructure, FacilityStructureCustomModel>
    {
        public override FacilityStructureCustomModel MapModelToViewModel(FacilityStructure model)
        {
            var vm = base.MapModelToViewModel(model);
            using (var bal = new BaseBal())
            {
                var facility = bal.GetFacilityByFacilityId(Convert.ToInt32(model.FacilityId));
                vm.GlobalCodeIdValue = bal.GetNameByGlobalCodeId(Convert.ToInt32(model.GlobalCodeID));
                vm.FacilityName = facility.FacilityName;
                if (model.GlobalCodeID == 85)
                {
                    vm.CanOverRideValue = Convert.ToInt32(model.GlobalCodeID) == Convert.ToInt32(BaseFacilityStucture.Bed)
                  ? !string.IsNullOrEmpty(model.ExternalValue1) ? "Yes" : "NO"
                  : string.Empty;
                }
                vm.CanOverRide = Convert.ToInt32(model.GlobalCodeID)
                                 == Convert.ToInt32(BaseFacilityStucture.Bed)
                                 && !string.IsNullOrEmpty(model.ExternalValue1);

                vm.AvailableInOverRideList =
                    Convert.ToInt32(model.GlobalCodeID)
                    == Convert.ToInt32(BaseFacilityStucture.Bed)
                    && !string.IsNullOrEmpty(model.ExternalValue2);
                vm.OverRidePriority =
                    Convert.ToInt32(model.GlobalCodeID)
                    == Convert.ToInt32(BaseFacilityStucture.Bed)
                    && !string.IsNullOrEmpty(model.ExternalValue3)
                        ? Convert.ToInt32(model.ExternalValue3)
                        : 0;
                vm.RevenueGLAccount =
                    Convert.ToInt32(model.GlobalCodeID)
                    == Convert.ToInt32(BaseFacilityStucture.Department)
                        ? model.ExternalValue1
                        : string.Empty;
                vm.ARMasterAccount =
                    Convert.ToInt32(model.GlobalCodeID)
                    == Convert.ToInt32(BaseFacilityStucture.Department)
                        ? model.ExternalValue2
                        : string.Empty;
                vm.GridType =
                    model.GlobalCodeID != null
                        ? Convert.ToInt32(model.GlobalCodeID)
                        : 0;
                vm.FacilityStrucutureTypeName =
                    bal.GetNameByGlobalCodeId(
                        model.GlobalCodeID != null
                            ? Convert.ToInt32(model.GlobalCodeID)
                            : 0);

                vm.NonChargeableRoom =
                    Convert.ToInt32(model.GlobalCodeID)
                    == Convert.ToInt32(BaseFacilityStucture.Rooms)
                        ? !string.IsNullOrEmpty(model.ExternalValue1)
                            ? "Yes"
                            : "No"
                        : string.Empty;
                vm.DepartmentWorkingTimming =
                    !string.IsNullOrEmpty(model.DeptOpeningTime)
                        ? model.DeptOpeningTime + " "
                          + model.DeptClosingTime
                        : string.Empty;

                vm.CorporateId = bal.GetCorporateIdFromFacilityId(Convert.ToInt32(model.FacilityId));

                
                using (var fsBal = new FacilityStructureBal())
                {
                    vm.ParentIdValue = fsBal.GetParentNameById(Convert.ToInt32(model.ParentId));
                    //vm.TimingsAdded = bal.GetTimingAddedById(model.FacilityStructureId);
                }
                if (model.GlobalCodeID == 83)
                    vm.TimingAdded = bal.GetTimingAddedById(model.FacilityStructureId);
            }
            return vm;
        }
    }
}
