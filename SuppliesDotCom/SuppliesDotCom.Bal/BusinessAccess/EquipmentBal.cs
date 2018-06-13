using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Bal.Mapper;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class EquipmentBal : BaseBal
    {
        EquipmentMapper EquipmentMapper { get; set; }

        public EquipmentBal()
        {
            EquipmentMapper = new EquipmentMapper();
        }

        //Function to get Equipment by Master ID
        public EquipmentMaster GetEquipmentByMasterId(int id)
        {
            using (var rep = UnitOfWork.EquipmentRepository)
            {
                var equipmentMaster = rep.Where(x => x.EquipmentMasterId == id).FirstOrDefault();
                return equipmentMaster;
            }
        }

        public int AddUpdateEquipment(EquipmentMaster equipment)
        {
            try
            {
                using (var equipmentRep = UnitOfWork.EquipmentRepository)
                {
                    var currentDateTime = equipment.EquipmentMasterId > 0
                        ? equipment.ModifiedDate
                        : equipment.CreatedDate;

                    var userId = equipment.EquipmentMasterId > 0
                        ? equipment.ModifiedBy
                        : equipment.CreatedBy;

                    if (equipment.EquipmentMasterId > 0)
                    {
                        equipmentRep.UpdateEntity(equipment, equipment.EquipmentMasterId);
                    }
                    else
                        equipmentRep.Create(equipment);

                    var eqLog = new EquipmentLog
                    {
                        EquipmentId = equipment.EquipmentMasterId,
                        DisableDate = null,
                        EnableDate = null,
                        CreatedBy = userId,
                        CreatedDate = currentDateTime


                    };

                    if (equipment.EquipmentDisabled)
                        eqLog.DisableDate = currentDateTime;
                    else
                        eqLog.EnableDate = currentDateTime;

                    SaveEquipmentLog(eqLog);

                    return equipment.EquipmentMasterId;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int UpdateEuipmentCustomModel(EquipmentCustomModel vm)
        {
            var currentDateTime = vm.ModifiedDate;
            var userId = vm.ModifiedBy;

            using (var equipmentRep = UnitOfWork.EquipmentRepository)
            {
                var model = EquipmentMapper.MapModelToViewModel(vm);
                if (model.EquipmentMasterId > 0)
                {
                    equipmentRep.UpdateEntity(model, model.EquipmentMasterId);
                }

                var eqLog = new EquipmentLog
                {
                    EquipmentId = model.EquipmentMasterId,
                    CreatedBy = userId,
                    CreatedDate = currentDateTime,
                    DisableDate = null,
                    EnableDate = null
                };
                if (model.ActiveDeactive)
                {
                    eqLog.EnableDate = currentDateTime;
                }
                else
                {
                    eqLog.DisableDate = currentDateTime;
                }
                SaveEquipmentLog(eqLog);
                return model.EquipmentMasterId;
            }
        }

        public List<EquipmentCustomModel> GetEquipmentList(bool showIsDisabled, string facilityId)
        {
            var list = new List<EquipmentCustomModel>();
            try
            {
                using (var rep = UnitOfWork.EquipmentRepository)
                {
                    var equipments = rep.Where(x => x.EquipmentDisabled == showIsDisabled && x.IsDeleted == false && x.FacilityId.Trim().ToLower().Equals(facilityId)).ToList();
                    if (equipments.Count > 0)
                        list.AddRange(equipments.Select(item => EquipmentMapper.MapModelToViewModel(item)));
                    return list.ToList();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<EquipmentMaster> GetEquipmentListByFacilityId(string facilityId, int facilityStructureId)
        {
            using (var rep = UnitOfWork.EquipmentRepository)
            {
                var fsList = new List<int> { 0, facilityStructureId };
                fsList = fsList.Distinct().ToList();
                var list = rep.Where(x => x.IsDeleted != true && x.FacilityId.Trim().Equals(facilityId) && x.EquipmentDisabled != true && fsList.Contains(x.FacilityStructureId)).ToList();
                return list;
            }
        }


        public bool AddRoomIdToEquipments(int facilityStructureId, List<int> equipmentIds)
        {
            bool status;
            using (var rep = UnitOfWork.EquipmentRepository)
            {
                var removalList = rep.Where(e => e.FacilityStructureId == facilityStructureId).ToList();

                foreach (var item in removalList)
                    item.FacilityStructureId = 0;

                var list = rep.Where(e => equipmentIds.Contains(e.EquipmentMasterId)).ToList();
                foreach (var item in list)
                    item.FacilityStructureId = facilityStructureId;
                rep.Update(list);
                status = true;
            }
            return status;
        }


        private int SaveEquipmentLog(EquipmentLog equipmentLog)
        {
            try
            {
                using (var equipmentRep = UnitOfWork.EquipmentLogRespository)
                {
                    equipmentRep.Create(equipmentLog);
                    return equipmentLog.Id;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<EquipmentCustomModel> GetDeletedEquipmentList(bool showIsDeleted, string facilityId)
        {
            var list = new List<EquipmentCustomModel>();
            try
            {
                using (var rep = UnitOfWork.EquipmentRepository)
                {
                    var equipments = rep.Where(x => x.IsDeleted == showIsDeleted && x.FacilityId.Trim().ToLower().Equals(facilityId) && x.EquipmentDisabled != true).ToList();
                    if (equipments.Count > 0)
                        list.AddRange(equipments.Select(item => EquipmentMapper.MapModelToViewModel(item)));
                    return list.ToList();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<EquipmentMaster> GetEquipmentDataByMasterId(int id)
        {
            using (var rep = UnitOfWork.EquipmentRepository)
            {
                var equipmentMaster = rep.Where(x => x.EquipmentMasterId == id).ToList();
                return equipmentMaster;
            }
        }

        public int GetFacilityStructureIdByEquipmentMasterId(int equipmentMasterId)
        {
            using (var eqRep = UnitOfWork.EquipmentRepository)
            {
                var structureId =
                    eqRep.Where(x => x.EquipmentMasterId == equipmentMasterId).Max(x => x.FacilityStructureId);
                return structureId;
            }
        }

        public bool CheckEquipmentInScheduling(int equipmentId)
        {
            return false;

        }

    }
}
