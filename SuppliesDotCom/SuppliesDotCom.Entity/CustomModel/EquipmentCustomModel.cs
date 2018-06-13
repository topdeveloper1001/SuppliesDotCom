using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class EquipmentCustomModel : EquipmentMaster
    {
        public string FacilityName { get; set; }
        public string EquipmentTypeName { get; set; }
        public string AssignedRoom { get; set; }
        public string Department { get; set; }
        public string RoomDepartment { get; set; }

        public bool ActiveDeactive { get; set; }
    }
}
