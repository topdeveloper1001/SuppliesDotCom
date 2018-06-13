//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;

namespace SuppliesDotCom.Model
{
    using System;

    public partial class BillingSystemParameters
    {
        [Key]
        public int Id { get; set; }
        public string FacilityNumber { get; set; }
        public Nullable<int> CorporateId { get; set; }
        public Nullable<decimal> BillHoldDays { get; set; }
        public Nullable<decimal> ARGLacct { get; set; }
        public Nullable<decimal> MgdCareGLacct { get; set; }
        public Nullable<decimal> BadDebtGLacct { get; set; }
        public Nullable<decimal> SmallBalanceGLacct { get; set; }
        public Nullable<decimal> SmallBalanceAmount { get; set; }
        public Nullable<decimal> SmallBalanceWriteoffDays { get; set; }
        public Nullable<System.DateTime> OupatientCloseBillsTime { get; set; }
        public Nullable<decimal> ERCloseBillsHours { get; set; }
        public Nullable<System.DateTime> EffectiveDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string ExternalValue1 { get; set; }
        public string ExternalValue2 { get; set; }
        public string ExternalValue3 { get; set; }
        public string ExternalValue4 { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CPTTableNumber { get; set; }
        public string ServiceCodeTableNumber { get; set; }
        public string DRGTableNumber { get; set; }
        public string HCPCSTableNumber { get; set; }
        public string DiagnosisTableNumber { get; set; }
        public string DrugTableNumber { get; set; }
        public string BillEditRuleTableNumber { get; set; }
        public long DefaultCountry { get; set; }
    }
}