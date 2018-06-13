using System;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class EquipmentMapper : Mapper<EquipmentMaster, EquipmentCustomModel>
    {
        public override EquipmentCustomModel MapModelToViewModel(EquipmentMaster model)
        {
            var vm = base.MapModelToViewModel(model);
            if (vm != null)
            {
                using (var bal = new EquipmentBal())
                {
                    vm.EquipmentTypeName = "";
                    vm.FacilityName = bal.GetFacilityNameByFacilityId(Convert.ToInt32(model.FacilityId));
                }

                using (var fBal = new FacilityStructureBal())
                {
                    var departmentName = fBal.GetParentNameByFacilityStructureId(model.FacilityStructureId);
                    var obj = fBal.GetFacilityStructureById(model.FacilityStructureId);
                    vm.AssignedRoom = obj != null &&
                                      !string.IsNullOrEmpty(obj.FacilityStructureName)
                        ? obj.FacilityStructureName
                        : string.Empty;
                    vm.RoomDepartment = departmentName;

                    if (!string.IsNullOrEmpty(model.BaseLocation))
                    {
                        var dep = fBal.GetFacilityStructureById(Convert.ToInt32(model.BaseLocation));
                        vm.Department = dep != null ? dep.FacilityStructureName : string.Empty;
                    }
                }
            }
            return vm;
        }
    }
}
