using System;

namespace SuppliesDotCom.Model.EntityDto
{
    public class PatientDto
    {
        public int PatientID { get; set; }
        public string EmiratesID { get; set; }
        public string MRNumber { get; set; }
        public DateTime? DOB { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool PortalAccess { get; set; }
        public int PhoneType { get; set; } = 2;
        public string PhoneNo { get; set; }
        public bool? IsPrimary { get; set; } = true;
        public string City { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool SendEmail { get; set; } = true;
        public string Gender { get; set; }

        public string DeviceToken { get; set; }
        public string Platform { get; set; }
        public string PatientName { get; set; }

        public long CityId { get; set; }
        public long StateId { get; set; }
        public long CountryId { get; set; }
    }
}
