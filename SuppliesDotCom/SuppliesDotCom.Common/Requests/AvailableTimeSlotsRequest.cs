using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Common.Requests
{
    public class AvailableTimeSlotsRequest
    {
        public DateTime AppointmentDate { get; set; }
        public long AppointmentTypeId { get; set; }
        public bool IsFirst { get; set; }
        public long? SpecialtyId { get; set; }
        public long? ClinicianId { get; set; }
        public int? StateId { get; set; }
        public int? CityId { get; set; }
        public long? FacilityId { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTill { get; set; }
        public int? RecordsCountRequested { get; set; }
    }
}
