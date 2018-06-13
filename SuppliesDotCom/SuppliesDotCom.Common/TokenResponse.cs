using System;

namespace SuppliesDotCom.Common
{
    public class TokenResponse
    {
        public string Email { get; set; }
        public string AccessToken { get; set; }
        public DateTime? ExpiredOn { get; set; }
        public long UserId { get; set; }
        public long FacilityId { get; set; }
        public string Name { get; set; }
        public string FacilityName { get; set; }
        public string CorporateName { get; set; }
        public long CorporateId { get; set; }
        //public string Data { get; set; }
    }
}
