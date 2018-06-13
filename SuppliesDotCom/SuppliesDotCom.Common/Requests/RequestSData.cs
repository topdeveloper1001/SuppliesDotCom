using System;

namespace SuppliesDotCom.Common.Requests
{
    public class RequestSData
    {
        public int PatientId { get; set; } = 0;
        public DateTime CurrentDate { get; set; }
        public long ClinicianId { get; set; }
        public long FacilityId { get; set; } = 0;
    }
}
