using System;

namespace SuppliesDotCom.Model.EntityDto
{
    public class UserDto
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string HomePhone { get; set; }
        public string UserName { get; set; }
        public bool? AdminUser { get; set; }
        public string DeviceToken { get; set; }
        public string Platform { get; set; }
        public string Password { get; set; }
        public bool IsPatient { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
        public DateTime? BirthDate { get; set; }
        public string HomeCity { get; set; }
        public long FacilityId { get; set; }

        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
        public string FacilityName { get; set; }
        public string CorporateName { get; set; }
        public long CorporateId { get; set; }
    }
}
