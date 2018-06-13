using System;

namespace SuppliesDotCom.Common.Requests
{
    public class UpcomingAppointmentsRequest
    {
        public long? PatientId { get; set; }
        public long? LoggedInUserId { get; set; }
        public bool? ShowsUpcomingOnly { get; set; }
        public long? Id { get; set; }
        public bool? ForToday { get; set; }
        public string StatusId { get; set; }
        public long? FacilityId { get; set; }
        public DateTime? AppointmentDate { get; set; }
    }
}
