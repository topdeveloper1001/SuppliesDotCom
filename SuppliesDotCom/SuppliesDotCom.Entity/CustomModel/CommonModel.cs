using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class CommonModel
    {
        public string Id { get; set; }
        public string ViewOnly { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }


        public int PatientID { get; set; }
        public string PersonLastName { get; set; }
        public string PersonEmiratesIDNumber { get; set; }
        public string PersonPassportNumber { get; set; }
        public DateTime? PersonBirthDate { get; set; }
        public string ContactMobilePhone { get; set; }
        public string PersonFirstName { get; set; }
        public int FacilityId { get; set; }
        public string FacilityNumber { get; set; }
        public int CorporateId { get; set; }
        public int EncounterPatientType { get; set; }
        public string PatientCompanyName { get; set; }
        public string PatientCompanyClaimPhoneNumber { get; set; }

        public string RoleName { get; set; }
        public string DefaultFacility { get; set; }
        public bool UserIsAdmin { get; set; }
        public string FormulaExpression { get; set; }
        public bool ShowDisabled { get; set; }
        public bool ShowAccessedTabs { get; set; }
        public string RoleKey { get; set; }
    }
}
