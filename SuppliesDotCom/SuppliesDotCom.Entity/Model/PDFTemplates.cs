using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Model.Model
{
    public class OtherPatientForm
    {
        [Key]
        public int Id { get; set; }

        public int? CorporateId { get; set; }

        public int? FacilityId { get; set; }

        public int? PatientId { get; set; }

        public int? EncounterId { get; set; }

        public string CategoryValue { get; set; }

        public string CodeValue { get; set; }

        public string ParentCodeValue { get; set; }

        public string Value { get; set; }

        public string ExternalValue1 { get; set; }

        public string ExternalValue2 { get; set; }

        public string ExternalValue3 { get; set; }

        public string ExternalValue4 { get; set; }

        public string ExternalValue5 { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool? IsDeleted { get; set; }

        public int? DeletedBy { get; set; }

        public DateTime? DeletedDate { get; set; }

    }

}
