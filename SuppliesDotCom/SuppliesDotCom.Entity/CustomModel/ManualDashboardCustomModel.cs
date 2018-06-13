
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class ManualDashboardCustomModel : ManualDashboard
    {
        public string BudgetTypeStr { get; set; }
        public string DashboardTypeStr { get; set; }
        public string KPICategoryTypeStr { get; set; }
        public string FacilityStr { get; set; }
        public string DepartmentStr { get; set; }
        public string IndicatorTypeStr { get; set; }
        public string FrequencyTypeStr { get; set; }
        public string Name { get; set; }
        public string SubCategoryValue1Str { get; set; }
        public string SubCategoryValue2Str { get; set; }
        public string CorporateStr { get; set; }
        public string OwnershipUser { get; set; }
        public string SortOrder { get; set; }
    }
    [NotMapped]
    public class ManualDashboardModel
    {
        public int? BudgetType { get; set; }
        public int? DashboardType { get; set; }
        public int? KPICategory { get; set; }
        public int? Indicators { get; set; }
        public string SubCategory1 { get; set; }
        public string SubCategory2 { get; set; }
        public int? Frequency { get; set; }
        public string Defination { get; set; }
        public int? DataType { get; set; }
        public int? CompanyTotal { get; set; }
        public string OwnerShip { get; set; }
        public int? Year { get; set; }
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
        public int? FacilityId { get; set; }
        public int? CorporateId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ExternalValue1 { get; set; }
        public string ExternalValue2 { get; set; }
        public string ExternalValue3 { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string OwnershipUser { get; set; }
        public int? FrequencyVal { get; set; }
        public string BudgetTypeStr { get; set; }
        public string DashboardTypeStr { get; set; }
        public string KPICategoryTypeStr { get; set; }
        public string FacilityStr { get; set; }
        public string DepartmentStr { get; set; }
        public string IndicatorTypeStr { get; set; }
        public string FrequencyTypeStr { get; set; }
        public string SubCategoryValue1Str { get; set; }
        public string SubCategoryValue2Str { get; set; }
        public string CorporateStr { get; set; }
        public string SortOrder { get; set; }
    }
    [NotMapped]
    public class ExternalDashboardModel
    {
        public int? BudgetType { get; set; }
        public int? DashboardType { get; set; }
        public int? KPICategory { get; set; }
        public int? Indicators { get; set; }
        public String IndicatorNumber { get; set; }
        public String DashBoard { get; set; }
        public decimal? CMB { get; set; }
        public decimal? CMA { get; set; }
        public decimal? CMVar { get; set; }
        public decimal? CMVarPercentage { get; set; }
        public decimal? PMB { get; set; }
        public decimal? PMA { get; set; }
        public decimal? PMVar { get; set; }
        public decimal? PMVarPercentage { get; set; }
        public decimal? CYTB { get; set; }
        public decimal? CYTA { get; set; }
        public decimal? CYTBVar { get; set; }
        public decimal? CYTBVarPercentage { get; set; }
        public decimal? PYTB { get; set; }
        public decimal? PYTA { get; set; }
        public decimal? PYTBVar { get; set; }
        public decimal? PYTBVarPercentage { get; set; }
        public int? ProjectedYTDToBudget { get; set; }
        public int? FormatType { get; set; }
        public int EV2 { get; set; }
        public string SubCategoryValue1Str { get; set; }
        public string SubCategoryValue2Str { get; set; }
        public decimal? YB { get; set; }
        public decimal? YTDC { get; set; }
        public decimal? YTDCPer { get; set; }
        public decimal? YTDVarPer { get; set; }
        public string OwnerShip { get; set; }

        public string CMVarColor { get; set; }
        public string CMVarPercentColor { get; set; }

        public string PMAColor { get; set; }
        public string PMAPercentColor { get; set; }

        public string CYTAVarColor { get; set; }
        public string CYTBPercentColor { get; set; }

        public string PYTAColor { get; set; }
        public string PYTAPercentColor { get; set; }
        public string BudgetTypeStr { get; set; }

    }

    [NotMapped]
    public class PatientFallStats
    {
        public int CID { get; set; }
        public int FID { get; set; }
        public string IndicatorNumber { get; set; }
        public string DashBoard { get; set; }
        public string ResultType { get; set; }
        public string Month { get; set; }
        public string PatientFallsWithInjuryActual { get; set; }
        public string PatientDays { get; set; }
        public string RatePerPatinetdays { get; set; }
        public string DashboardTarget { get; set; }
        public string MonthSTR { get; set; }
    }

    [NotMapped]
    public class UserTokenCustomModel
    {
        public string UserName { get; set; }
        public string TokenNumber { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}
