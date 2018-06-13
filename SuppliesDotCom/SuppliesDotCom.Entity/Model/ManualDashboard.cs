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
    using System.Collections.Generic;
    
    public partial class ManualDashboard
    {
        [Key]
        public int ID { get; set; }
        public Nullable<int> BudgetType { get; set; }
        public Nullable<int> DashboardType { get; set; }
        public Nullable<int> KPICategory { get; set; }
        public Nullable<int> Indicators { get; set; }
        public string SubCategory1 { get; set; }
        public string SubCategory2 { get; set; }
        public Nullable<int> Frequency { get; set; }
        public string Defination { get; set; }
        public Nullable<int> DataType { get; set; }
        public Nullable<int> CompanyTotal { get; set; }
        public string OwnerShip { get; set; }
        public Nullable<int> Year { get; set; }
        public string M1 { get; set; }
        public string M2 { get; set; }
        public string M3 { get; set; }
        public string M4 { get; set; }
        public string M5 { get; set; }
        public string M6 { get; set; }
        public string M7 { get; set; }
        public string M8 { get; set; }
        public string M9 { get; set; }
        public string M10 { get; set; }
        public string M11 { get; set; }
        public string M12 { get; set; }
        public string OtherDescription { get; set; }
        public Nullable<int> FacilityId { get; set; }
        public Nullable<int> CorporateId { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ExternalValue1 { get; set; }
        public string ExternalValue2 { get; set; }
        public string ExternalValue3 { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }
}
