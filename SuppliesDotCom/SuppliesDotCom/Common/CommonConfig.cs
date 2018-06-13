// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CommonConfig.cs" company="Spadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The common config.
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace SuppliesDotCom.Common
{
    using System;
    using System.Configuration;
    using System.Globalization;
    using System.IO;
    using System.Web;


    using SuppliesDotCom.Common.Common;
    using SuppliesDotCom.Model;

    /// <summary>
    ///     The app settings keys.
    /// </summary>
    public static class AppSettingsKeys
    {
        #region Constants

        /// <summary>
        ///     The smtp server host.
        /// </summary>
        public const string SmtpServerHost = "SmtpServerHost";

        /// <summary>
        ///     The smtp server port.
        /// </summary>
        public const string SmtpServerPort = "SmtpServerPort";

        /// <summary>
        ///     The smtp server user name.
        /// </summary>
        public const string SmtpServerUserName = "SmtpServerUserName";

        /// <summary>
        ///     The smtp server user password.
        /// </summary>
        public const string SmtpServerUserPassword = "SmtpServerUserPassword";
        public const string EnableSsl = "UseSsl";


        public const string SchedulingNotificationEmailFrom = "SchedulingNotificationEmailFrom";

        public const string IsStaging = "IsStaging";

        #endregion
    }

    /// <summary>
    ///     The partial views.
    /// </summary>
    public static class PartialViews
    {
        #region Static Fields
        public static readonly string FacilityListViewInPhysicianView = string.Format(
           "{0}/_FacilityListView", CommonConfig.UserControlPath);

        public static readonly string CAppointmentTypesPartial = string.Format(
           "{0}/_AssignedAppointmentsList", CommonConfig.UserControlPath);

        public static readonly string RemittanceXMLParsedDataNonSystemView = string.Format(
           "{0}/_RemittanceXMLParsedDataNonSystemView", CommonConfig.UserControlPath);

        public static readonly string MedicalNecessityList = string.Format(
            "{0}/_MedicalNecessityList", CommonConfig.UserControlPath);

        public static readonly string MedicalNecessityAddEdit = string.Format(
            "{0}/_MedicalNecessityAddEdit", CommonConfig.UserControlPath);

        public static readonly string XMLRemittanceFile = string.Format(
            "{0}/_XMLRemittanceFile", CommonConfig.UserControlPath);

        public static readonly string RemittanceXMLParsedDataView = string.Format(
            "{0}/_RemittanceXMLParsedDataView", CommonConfig.UserControlPath);

        public static readonly string FindClaimList = string.Format(
            "{0}/_FindClaimList", CommonConfig.UserControlPath);

        public static readonly string BedOverrideServiceCodesList = string.Format(
            "{0}/_BedOverrideServiceCodesList", CommonConfig.UserControlPath);

        public static readonly string XMLBillingInitialClaimErrorReport = string.Format(
            "{0}/_XMLBillingInitialClaimErrorReport",
            CommonConfig.UserControlPath);

        public static readonly string XMLBillingBatchReport = string.Format(
            "{0}/_XMLBillingBatchReport",
            CommonConfig.UserControlPath);

        public static readonly string XMLBillFileView = string.Format(
            "{0}/_XMLBillFileView",
            CommonConfig.UserControlPath);

        public static readonly string XMLBillFile = string.Format(
            "{0}/_XMLBillFile",
            CommonConfig.UserControlPath);

        public static readonly string PreSchedulingLinkList = string.Format(
            "{0}/_PreSchedulingLinkList",
            CommonConfig.UserControlPath);

        public static readonly string PreSchedulingLinkAddEdit = string.Format(
            "{0}/_PreSchedulingLinkAddEdit",
            CommonConfig.UserControlPath);


        public static readonly string FutureOpenOrders = string.Format(
            "{0}/_FutureOpenOrders",
            CommonConfig.UserControlPath);


        public static readonly string FinalBillHeadersListView = string.Format(
            "{0}/_FinalBillHeadersListView",
            CommonConfig.UserControlPath);

        public static readonly string PaymentTypeDetailAddEdit = string.Format(
            "{0}/_PaymentTypeDetailAddEdit",
            CommonConfig.UserControlPath);
        public static readonly string PaymentTypeDetailList = string.Format(
       "{0}/_PaymentTypeDetailList",
       CommonConfig.UserControlPath);

        public static readonly string PatientSchedularView = string.Format(
            "{0}/_PatientSchedularView",
            CommonConfig.UserControlPath);

        public static readonly string PatientPreSchedulingList = string.Format(
            "{0}/_PatientPreSchedulingList",
            CommonConfig.UserControlPath);

        public static readonly string PatientPreSchedulingAddEdit = string.Format(
            "{0}/_PatientPreSchedulingAddEdit",
            CommonConfig.UserControlPath);

        public static readonly string PatientCarePlanView = string.Format(
        "{0}/_PatientCarePlanView",
        CommonConfig.UserControlPath);

        public static readonly string AppointmentsListViewInFacilityStructure = string.Format(
       "{0}/_AppointmentTypesOverrideList",
       CommonConfig.UserControlPath);

        public static readonly string PatientCarePlanList = string.Format(
       "{0}/_PatientCarePlanList",
       CommonConfig.UserControlPath);

        public static readonly string PatientCarePlanAddEdit = string.Format(
       "{0}/_PatientCarePlanAddEdit",
       CommonConfig.UserControlPath);

        public static readonly string FacultyRoosterAddEdit = string.Format(
           "{0}/_FacultyRoosterAddEdit",
           CommonConfig.UserControlPath);

        public static readonly string FacultyRoosterList = string.Format(
           "{0}/_FacultyRoosterList",
           CommonConfig.UserControlPath);

        public static readonly string ClinicianRosterList = string.Format(
          "{0}/_ClinicianRosterList",
          CommonConfig.UserControlPath);


        public static readonly string EquipmentListViewInFacilityStructure = string.Format(
            "{0}/_EquipmentOverrideList",
            CommonConfig.UserControlPath);

        public static readonly string PatientSearchResultPView = string.Format(
            "{0}/_PatientSearchResultPView",
            CommonConfig.UserControlPath);

        public static readonly string CarePlanAddEdit = string.Format(
            "{0}/_CarePlanAddEdit",
            CommonConfig.UserControlPath);
        public static readonly string CarePlanList = string.Format(
            "{0}/_CarePlanList",
            CommonConfig.UserControlPath);

        public static readonly string CarePlanTaskAddEdit = string.Format(
            "{0}/_CarePlanTaskAddEdit",
            CommonConfig.UserControlPath);
        public static readonly string CarePlanTaskList = string.Format(
            "{0}/_CarePlanTaskList",
            CommonConfig.UserControlPath);

        public static readonly string AppointmentTypesList = string.Format(
            "{0}/_AppointmentTypesList",
            CommonConfig.UserControlPath);

        public static readonly string AssignedAppointmentsList = string.Format(
            "{0}/_AssignedAppointmentsList",
            CommonConfig.UserControlPath);

        public static readonly string AppointmentTypesAddEdit = string.Format(
            "{0}/_AppointmentTypesAddEdit",
            CommonConfig.UserControlPath);

        public static readonly string FacilityDepartmentListView = string.Format(
           "{0}/_FacilityDepartmentListView",
           CommonConfig.UserControlPath);

        public static readonly string FacilityRoomsListView = string.Format(
           "{0}/_FacilityRoomsList",
           CommonConfig.UserControlPath);

        public static readonly string FacilityEquipmentListView = string.Format(
           "{0}/_FacilityEquipmentListView",
           CommonConfig.UserControlPath);

        public static readonly string RoomEquipmentList = string.Format(
           "{0}/_RoomEquipmentList",
           CommonConfig.UserControlPath);

        /// <summary>
        ///     The atc codes add edit.
        /// </summary>
        public static readonly string ATCCodesAddEdit = string.Format(
            "{0}/_ATCCodesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        /// The er patient final bill list
        /// </summary>
        public static readonly string ErPatientFinalBillList = string.Format(
          "{0}/_ErPatientFinalBillHeadersListView",
          CommonConfig.UserControlPath);

        /// <summary>
        /// The in patient final bill list
        /// </summary>
        public static readonly string InPatientFinalBillList = string.Format(
          "{0}/_InPatientFinalBillHeadersListView",
          CommonConfig.UserControlPath);

        /// <summary>
        /// The out patient final bill list
        /// </summary>
        public static readonly string OutPatientFinalBillList = string.Format(
          "{0}/_OutPatientFinalBillHeadersListView",
          CommonConfig.UserControlPath);

        /// <summary>
        /// The physician CheckBox list
        /// </summary>
        public static readonly string PhysicianCheckBoxList = string.Format(
            "{0}/_PhysicianCheckBoxList",
            CommonConfig.UserControlPath);

        /// <summary>
        /// The status CheckBox list
        /// </summary>
        public static readonly string StatusCheckBoxList = string.Format(
            "{0}/_StatusCheckBoxList",
            CommonConfig.UserControlPath);

        /// <summary>
        /// The location ListView
        /// </summary>
        public static readonly string LocationListView = string.Format(
            "{0}/_LocationListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The atc codes list.
        /// </summary>
        public static readonly string ATCCodesList = string.Format("{0}/_ATCCodesList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The active medicare problem.
        /// </summary>
        public static readonly string ActiveMedicareProblem = string.Format(
            "{0}/_ActiveMedical",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update global code category master.
        /// </summary>
        public static readonly string AddUpdateGlobalCodeCategoryMaster =
            string.Format("{0}/_AddUpdateGlobalCodeCategoryMaster", CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update order category type.
        /// </summary>
        public static readonly string AddUpdateOrderCategoryType = string.Format(
            "{0}/_AddUpdateOrderCategoryType",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update order sub category.
        /// </summary>
        public static readonly string AddUpdateOrderSubCategory = string.Format(
            "{0}/_AddUpdateOrderSubCategory",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update role.
        /// </summary>
        public static readonly string AddUpdateRole = string.Format("{0}/_AddUpdateRole", CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update screen.
        /// </summary>
        public static readonly string AddUpdateScreen = string.Format(
            "{0}/_AddUpdateScreen",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update tabs.
        /// </summary>
        public static readonly string AddUpdateTabs = string.Format("{0}/_AddUpdateTabs", CommonConfig.UserControlPath);

        /// <summary>
        ///     The add update user.
        /// </summary>
        public static readonly string AddUpdateUser = string.Format("{0}/_AddUpdateUser", CommonConfig.UserControlPath);

        /// <summary>
        ///     The address add edit.
        /// </summary>
        public static readonly string AddressAddEdit = string.Format(
            "{0}/_addressAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The address partial view.
        /// </summary>
        public static readonly string AddressPartialView = string.Format("{0}/_Addresses", CommonConfig.UserControlPath);

        /// <summary>
        ///     The address relation grid.
        /// </summary>
        public static readonly string AddressRelationGrid = string.Format(
            "{0}/_addressRelationGrid",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The administer orders by nurse.
        /// </summary>
        public static readonly string AdministerOrdersByNurse = string.Format(
            "{0}/_AdministerOrdersByNurse",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The alergies add adit.
        /// </summary>
        public static readonly string AlergiesAddAdit = string.Format(
            "{0}/_AlergiesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The alergies list.
        /// </summary>
        public static readonly string AlergiesList = string.Format("{0}/_AlergiesList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The allergies history view.
        /// </summary>
        public static readonly string AllergiesHistoryView = string.Format(
            "{0}/_AllergiesHistoryView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The allergy master add edit.
        /// </summary>
        public static readonly string AllergyMasterAddEdit = string.Format(
            "{0}/_AllergyMasterAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The allergy master list view.
        /// </summary>
        public static readonly string AllergyMasterListView = string.Format(
            "{0}/_AllergyMasterListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The attachments grid.
        /// </summary>
        public static readonly string AttachmentsGrid = string.Format(
            "{0}/_attachmentsGrid",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The authorization add edit.
        /// </summary>
        public static readonly string AuthorizationAddEdit = string.Format(
            "{0}/_AuthorizationAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The authorization list.
        /// </summary>
        public static readonly string AuthorizationList = string.Format(
            "{0}/_AuthorizationList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The bed mapping patient bed assignment.
        /// </summary>
        public static readonly string BedMappingPatientBedAssignment = string.Format(
            "{0}/_PatientBedAssignment",
            CommonConfig.UserControlPath); // Shashank 09102014

        /// <summary>
        ///     The bed master add edit.
        /// </summary>
        public static readonly string BedMasterAddEdit = string.Format(
            "{0}/_bedMasterAddEdit",
            CommonConfig.UserControlPath); // Shashank 09102014

        /// <summary>
        ///     The bed masterlist.
        /// </summary>
        public static readonly string BedMasterlist = string.Format("{0}/_bedMasterList", CommonConfig.UserControlPath);

        // Shashank 09102014

        /// <summary>
        ///     The bed rate card list.
        /// </summary>
        public static readonly string BedRateCardList = string.Format(
            "{0}/_BedRateCardList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The bed search filter grid.
        /// </summary>
        public static readonly string BedSearchFilterGrid = string.Format(
            "{0}/_BedSearchFilterGrid",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The bill activity list.
        /// </summary>
        public static readonly string BillActivityList = string.Format(
            "{0}/_BillActivityList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The bill correction view.
        /// </summary>
        public static readonly string BillCorrectionView = string.Format(
            "{0}/_BillCorrectionView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The bill format.
        /// </summary>
        public static readonly string BillFormat = string.Format("{0}/_BillFormat", CommonConfig.UserControlPath);

        /// <summary>
        ///     The bill header add edit.
        /// </summary>
        public static readonly string BillHeaderAddEdit = string.Format(
            "{0}/_BillHeaderAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The bill header list.
        /// </summary>
        public static readonly string BillHeaderList = string.Format(
            "{0}/_BillHeaderList",
            CommonConfig.UserControlPath);


        public static readonly string PayerClaimsList = string.Format(
            "{0}/_PayerWiseClaims",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The billing system parameters list.
        /// </summary>
        public static readonly string SuppliesDotComParametersList = string.Format(
            "{0}/_SuppliesDotComParametersList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The cpt codes add edit.
        /// </summary>
        public static readonly string CPTCodesAddEdit = string.Format(
            "{0}/_CPTCodesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The cpt codes list.
        /// </summary>
        public static readonly string CPTCodesList = string.Format("{0}/_CPTCodesList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The change password.
        /// </summary>
        public static readonly string ChangePassword = string.Format(
            "{0}/_ChangePassword",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The charge detail report.
        /// </summary>
        public static readonly string ChargeDetailReport = string.Format(
            "{0}/_ChargesDetailReport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The charges by payor report view.
        /// </summary>
        public static readonly string ChargesByPayorReportView = string.Format(
            "{0}/_UserLoginActivityView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The charges detail report.
        /// </summary>
        public static readonly string ChargesDetailReport = string.Format(
            "{0}/_ChargesDetailReport",
            CommonConfig.UserControlPath);


        public static readonly string PhysicianActivityReport = string.Format(
           "{0}/_PhysicianActivityReport",
           CommonConfig.UserControlPath);

        public static readonly string ScrubberSummary = string.Format(
           "{0}/_ScrubberSummary",
           CommonConfig.UserControlPath);
        public static readonly string ErrorDetail = string.Format(
           "{0}/_ErrorDetail",
           CommonConfig.UserControlPath);
        public static readonly string ErrorSummary = string.Format(
           "{0}/_ErrorSummary",
           CommonConfig.UserControlPath);
        public static readonly string DetailUserTransction = string.Format(
           "{0}/_DetailUserTransaction",
           CommonConfig.UserControlPath);

        public static readonly string DepartmentUtilization = string.Format(
      "{0}/_DepartmentUtilizationReport",
      CommonConfig.UserControlPath);

        public static readonly string PhysicianUtilization = string.Format(
      "{0}/_PhysicianUtilizationReport",
      CommonConfig.UserControlPath);

        public static readonly string IPChargesReport = string.Format("{0}/_IPChargesReport", CommonConfig.UserControlPath);
        public static readonly string OPChargesReport = string.Format("{0}/_OPChargesReport", CommonConfig.UserControlPath);
        public static readonly string ERChargesReport = string.Format("{0}/_ERChargesReport", CommonConfig.UserControlPath);
        public static readonly string IPChargesDetailReport = string.Format("{0}/_IPChargesDetailReport", CommonConfig.UserControlPath);
        public static readonly string OPChargesDetailReport = string.Format("{0}/_OPChargesDetailReport", CommonConfig.UserControlPath);
        public static readonly string ERChargesDetailReport = string.Format("{0}/_ERChargesDetailReport", CommonConfig.UserControlPath);
        /// <summary>
        ///     The charges report.
        /// </summary>
        public static readonly string ChargesReport = string.Format("{0}/_ChargesReport", CommonConfig.UserControlPath);

        /// <summary>
        ///     The charges stats.
        /// </summary>
        public static readonly string ChargesStats = string.Format("{0}/_ChargesStats", CommonConfig.UserControlPath);

        /// <summary>
        ///     The claim trans detail report.
        /// </summary>
        public static readonly string ClaimTransDetailReport = string.Format(
            "{0}/_ClaimTransDetailReport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The closed orders list.
        /// </summary>
        public static readonly string ClosedOrdersList = string.Format(
            "{0}/_ClosedOrderList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The corporate add edit.
        /// </summary>
        public static readonly string CorporateAddEdit = string.Format(
            "{0}/_CorporateAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The corporate list.
        /// </summary>
        public static readonly string CorporateList = string.Format("{0}/_CorporateList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The correction codes list view.
        /// </summary>
        public static readonly string CorrectionCodesListView = string.Format(
            "{0}/_CorrectionCodesListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The drg codes add edit.
        /// </summary>
        public static readonly string DRGCodesAddEdit = string.Format(
            "{0}/_DRGCodesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The drg codes list.
        /// </summary>
        public static readonly string DRGCodesList = string.Format("{0}/_DRGCodesList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The daily charge report view.
        /// </summary>
        public static readonly string DailyChargeReportView = string.Format(
            "{0}/_UserLoginActivityView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard budget add edit.
        /// </summary>
        public static readonly string DashboardBudgetAddEdit = string.Format(
            "{0}/_DashboardBudgetAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard budget list.
        /// </summary>
        public static readonly string DashboardBudgetList = string.Format(
            "{0}/_DashboardBudgetList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard display order list.
        /// </summary>
        public static readonly string DashboardDisplayOrderList = string.Format(
            "{0}/_DashboardDisplayOrderList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard indicator add edit.
        /// </summary>
        public static readonly string DashboardIndicatorAddEdit = string.Format(
            "{0}/_DashboardIndicatorDataAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard indicator data list.
        /// </summary>
        public static readonly string DashboardIndicatorDataList = string.Format(
            "{0}/_DashboardIndicatorDataList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard indicator import.
        /// </summary>
        public static readonly string DashboardIndicatorImport = string.Format(
            "{0}/_ImportIndicatorData",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard indicators list.
        /// </summary>
        public static readonly string DashboardIndicatorsList = string.Format(
            "{0}/_DashboardIndicatorsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard parameters list.
        /// </summary>
        public static readonly string DashboardParametersList = string.Format(
            "{0}/_DashboardParametersList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard remark list.
        /// </summary>
        public static readonly string DashboardRemarkList = string.Format(
            "{0}/_DashboardRemarkList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard sub categories list.
        /// </summary>
        public static readonly string DashboardSubCategoriesList = string.Format(
            "{0}/_DashboardSubCategoriesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard targets add edit.
        /// </summary>
        public static readonly string DashboardTargetsAddEdit = string.Format(
            "{0}/_DashboardTargetsAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard targets list.
        /// </summary>
        public static readonly string DashboardTargetsList = string.Format(
            "{0}/_DashboardTargetsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard transaction counter add edit.
        /// </summary>
        public static readonly string DashboardTransactionCounterAddEdit =
            string.Format("{0}/_DashboardTransactionCounterAddEdit", CommonConfig.UserControlPath);

        /// <summary>
        ///     The dashboard transaction counter list.
        /// </summary>
        public static readonly string DashboardTransactionCounterList =
            string.Format("{0}/_DashboardTransactionCounterList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The denial add edit.
        /// </summary>
        public static readonly string DenialAddEdit = string.Format("{0}/_DenialAddEdit", CommonConfig.UserControlPath);

        /// <summary>
        ///     The denial list.
        /// </summary>
        public static readonly string DenialList = string.Format("{0}/_DenialList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The denial report.
        /// </summary>
        public static readonly string DenialReport = string.Format("{0}/_DenialReport", CommonConfig.UserControlPath);

        /// <summary>
        ///     The department wise ageing report.
        /// </summary>
        public static readonly string DepartmentWiseAgeingReport = string.Format(
            "{0}/_DepartmentAgeingReport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dept timming add edit.
        /// </summary>
        public static readonly string DeptTimmingAddEdit = string.Format(
            "{0}/_DeptTimmingAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The dept timming list.
        /// </summary>
        public static readonly string DeptTimmingList = string.Format(
            "{0}/_DeptTimmingList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The diagnosis add edit.
        /// </summary>
        public static readonly string DiagnosisAddEdit = string.Format(
            "{0}/_DiagnosisAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The diagnosis code add edit.
        /// </summary>
        public static readonly string DiagnosisCodeAddEdit = string.Format(
            "{0}/_DiagnosisCodeAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The diagnosis code list.
        /// </summary>
        public static readonly string DiagnosisCodeList = string.Format(
            "{0}/_DiagnosisCodeList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The diagnosis list.
        /// </summary>
        public static readonly string DiagnosisList = string.Format("{0}/_DiagnosisList", CommonConfig.UserControlPath);

        public static readonly string DiagnosisListEHR = string.Format("{0}/_DiagnosisListEHR", CommonConfig.UserControlPath);

        public static readonly string EHRDiagnosisList = string.Format("{0}/_EHRDiagnosisList", CommonConfig.UserControlPath);
        /// <summary>
        ///     The diagnosis view uc.
        /// </summary>
        public static readonly string DiagnosisViewUC = string.Format(
            "{0}/_DiagnosisView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The discharge details list view.
        /// </summary>
        public static readonly string DischargeDetailsListView = string.Format(
            "{0}/_ActiveMedical",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The discharge summary tab.
        /// </summary>
        public static readonly string DischargeSummaryTab = string.Format(
            "{0}/_DischargeSummaryTab",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The drug add edit.
        /// </summary>
        public static readonly string DrugAddEdit = string.Format("{0}/_DrugAddEdit", CommonConfig.UserControlPath);

        /// <summary>
        ///     The drug allergy log list.
        /// </summary>
        public static readonly string DrugAllergyLogList = string.Format(
            "{0}/_DrugAllergyLogList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The drug instruction and dosing list.
        /// </summary>
        public static readonly string DrugInstructionAndDosingList = string.Format(
            "{0}/_DrugInstructionAndDosingList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The drug interactions list.
        /// </summary>
        public static readonly string DrugInteractionsList = string.Format(
            "{0}/_DrugInteractionsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The drug list.
        /// </summary>
        public static readonly string DrugList = string.Format("{0}/_DrugList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The encounter list.
        /// </summary>
        public static readonly string EncounterList = string.Format(
            "{0}/_PatientEncountersList",
            CommonConfig.UserControlPath);

        /// <summary>
        /// The patient diagnosis list
        /// </summary>
        public static readonly string PatientDiagnosisList = string.Format(
           "{0}/_PaitentDiagnosisList",
           CommonConfig.UserControlPath);

        /// <summary>
        /// The patient open order list
        /// </summary>
        public static readonly string PatientOpenOrderList = string.Format(
          "{0}/_PatientOpenOrderList",
          CommonConfig.UserControlPath);

        /// <summary>
        ///     The equipment add edit.
        /// </summary>
        public static readonly string EquipmentAddEdit = string.Format(
            "{0}/_EquipmentAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The equipment list.
        /// </summary>
        public static readonly string EquipmentList = string.Format("{0}/EquipmentList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The error master add edit.
        /// </summary>
        public static readonly string ErrorMasterAddEdit = string.Format(
            "{0}/_ErrorMasterAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The error master list.
        /// </summary>
        public static readonly string ErrorMasterList = string.Format(
            "{0}/_ErrorMasterList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The evaluation list.
        /// </summary>
        public static readonly string EvaluationList = string.Format(
            "{0}/_EvaluationMList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The evaluation p view.
        /// </summary>
        /// 
        public static readonly string EvaluationPView = string.Format(
            "{0}/_EvaluationPView",
            CommonConfig.UserControlPath);


        public static readonly string OPNurseAssessmentForm = string.Format(
            "{0}/_OPNurseAssessmentForm",
            CommonConfig.UserControlPath);
        /// <summary>
        ///     The executive dashboard p view.
        /// </summary>
        public static readonly string ExecutiveDashboardPView = string.Format(
            "{0}/_ExecutiveDashboardPview",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The executive key perfom dashboard pview.
        /// </summary>
        public static readonly string ExecutiveKeyPerfomDashboardPview =
            string.Format("{0}/_ExecutiveKeyPerfomDashboardPview", CommonConfig.UserControlPath);

        /// <summary>
        ///     The expected payment ins not paid list view.
        /// </summary>
        public static readonly string ExpectedPaymentInsNotPaidListView =
            string.Format("{0}/_ExpectedPaymentInsNotPaidListView", CommonConfig.UserControlPath);

        /// <summary>
        ///     The expected payment patient var list view.
        /// </summary>
        public static readonly string ExpectedPaymentPatientVarListView =
            string.Format("{0}/_ExpectedPaymentPatientVarListView", CommonConfig.UserControlPath);

        /// <summary>
        ///     The external dashboard list.
        /// </summary>
        public static readonly string ExternalDashboardList = string.Format(
            "{0}/_ExternalDashboardList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility department add edit.
        /// </summary>
        public static readonly string FacilityDepartmentAddEdit = string.Format(
            "{0}/_FacilityDepartmentAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility department list.
        /// </summary>
        public static readonly string FacilityDepartmentList = string.Format(
            "{0}/_FacilityDepartmentList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility list.
        /// </summary>
        public static readonly string FacilityList = string.Format("{0}/FacilityList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility role add edit.
        /// </summary>
        public static readonly string FacilityRoleAddEdit = string.Format(
            "{0}/_FacilityRoleAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility role list.
        /// </summary>
        public static readonly string FacilityRoleList = string.Format(
            "{0}/_FacilityRoleList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure add edit.
        /// </summary>
        public static readonly string FacilityStructureAddEdit = string.Format(
            "{0}/_FacilityStructureAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure beds list.
        /// </summary>
        public static readonly string FacilityStructureBedsList = string.Format(
            "{0}/_FacilityStructureBedsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure dept list.
        /// </summary>
        public static readonly string FacilityStructureDeptList = string.Format(
            "{0}/_FacilityStructureDeptList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure floor list.
        /// </summary>
        public static readonly string FacilityStructureFloorList = string.Format(
            "{0}/_FacilityStructureFloorList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure list.
        /// </summary>
        public static readonly string FacilityStructureList = string.Format(
            "{0}/_FacilityStructureList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure rooms list.
        /// </summary>
        public static readonly string FacilityStructureRoomsList = string.Format(
            "{0}/_FacilityStructureRoomsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The facility structure tree view.
        /// </summary>
        public static readonly string FacilityStructureTreeView = string.Format(
            "{0}/_FacilityStructureTreeView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The faculty calender view.
        /// </summary>
        public static readonly string FacultyCalenderView = string.Format(
            "{0}/_FacultyCalenderView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The favorite orders.
        /// </summary>
        public static readonly string FavoriteOrders = string.Format(
            "{0}/_FavoriteOrders",
            CommonConfig.UserControlPath);

        public static readonly string FavoriteOrdersSearch = string.Format(
            "{0}/_FavoriteOrdersSearch",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The file uploader.
        /// </summary>
        public static readonly string FileUploader = string.Format("{0}/FileUploader", CommonConfig.UserControlPath);

        // Shashank 17112014

        /// <summary>
        ///     The files add edit.
        /// </summary>
        public static readonly string FilesAddEdit = string.Format("{0}/_FilesAddEdit", CommonConfig.UserControlPath);

        // Shashank 09102014

        /// <summary>
        ///     The files listing.
        /// </summary>
        public static readonly string FilesListing = string.Format("{0}/_FilesListing", CommonConfig.UserControlPath);

        // Shashank 17112014

        /// <summary>
        ///     The files view.
        /// </summary>
        public static readonly string FilesView = string.Format("{0}/_FilesView", CommonConfig.UserControlPath);

        // Shashank 09102014

        /// <summary>
        ///     The follows type.
        /// </summary>
        public static readonly string FollowsType = string.Format("{0}/_FollowsType", CommonConfig.UserControlPath);

        /// <summary>
        ///     The frequency list view.
        /// </summary>
        public static readonly string FrequencyListView = string.Format(
            "{0}/_FrequencyListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The generic external list view.
        /// </summary>
        public static readonly string GenericExternalListView = string.Format(
            "{0}/_GenericExternalListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The generic list view.
        /// </summary>
        public static readonly string GenericListView = string.Format(
            "{0}/_GenericListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The get authorization partial view.
        /// </summary>
        public static readonly string GetAuthorizationPartialView = string.Format(
            "{0}/_getAuthorization",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The global code category master list.
        /// </summary>
        public static readonly string GlobalCodeCategoryMasterList = string.Format(
            "{0}/_GlobalCodeCategoryMasterList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The global codes list.
        /// </summary>
        public static readonly string GlobalCodesList = string.Format(
            "{0}/_GlobalCodesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The hcpcs codes add edit.
        /// </summary>
        public static readonly string HCPCSCodesAddEdit = string.Format(
            "{0}/_HCPCSCodesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The hcpcs codes list.
        /// </summary>
        public static readonly string HCPCSCodesList = string.Format(
            "{0}/_HCPCSCodesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The holiday planner add edit.
        /// </summary>
        public static readonly string HolidayPlannerAddEdit = string.Format(
            "{0}/_HolidayPlannerAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The holiday planner details add edit.
        /// </summary>
        public static readonly string HolidayPlannerDetailsAddEdit = string.Format(
            "{0}/_HolidayPlannerDetailsAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The holiday planner details list.
        /// </summary>
        public static readonly string HolidayPlannerDetailsList = string.Format(
            "{0}/_HolidayPlannerDetailsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The holiday planner list.
        /// </summary>
        public static readonly string HolidayPlannerList = string.Format(
            "{0}/_HolidayPlannerList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The indicator data check list list.
        /// </summary>
        public static readonly string IndicatorDataCheckListList = string.Format(
            "{0}/_IndicatorDataCheckListAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The insurance list.
        /// </summary>
        public static readonly string InsuranceList = string.Format("{0}/_InsuranceList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The insurance list export view.
        /// </summary>
        public static readonly string InsuranceListExportView = string.Format(
            "{0}/_InsuranceListExportView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The journal enter bad debt writeoffs.
        /// </summary>
        public static readonly string JournalEnterBadDebtWriteoffs = string.Format(
            "{0}/_JournalEnterBadDebtWriteoffs",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The journal entry manage care discount.
        /// </summary>
        public static readonly string JournalEntryManageCareDiscount =
            string.Format("{0}/_JournalEntryManageCareDiscount", CommonConfig.UserControlPath);

        /// <summary>
        ///     The journal entry support report.
        /// </summary>
        public static readonly string JournalEntrySupportReport = string.Format(
            "{0}/_JournalEntrySupport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The kpi dashboard p view.
        /// </summary>
        public static readonly string KPIDashboardPView = string.Format(
            "{0}/_KPIDashboardPview",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab administer order.
        /// </summary>
        public static readonly string LabAdministerOrder = string.Format(
            "{0}/_LabAdministerOrder",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab closed activties list.
        /// </summary>
        public static readonly string LabClosedActivtiesList = string.Format(
            "{0}/_LabClosedActivtiesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab closed order list.
        /// </summary>
        public static readonly string LabClosedOrderList = string.Format(
            "{0}/_LabClosedOrderList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab open activties list.
        /// </summary>
        public static readonly string LabOpenActivtiesList = string.Format(
            "{0}/_LabOpenActivtiesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab open order list.
        /// </summary>
        public static readonly string LabOpenOrderList = string.Format(
            "{0}/_LabOpenOrderList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab speciman listing.
        /// </summary>
        public static readonly string LabSpecimanListing = string.Format(
            "{0}/_LabSpecimanListing",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab speciman mgt.
        /// </summary>
        public static readonly string LabSpecimanMGT = string.Format(
            "{0}/_LabSpecimanMGT",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test add edit.
        /// </summary>
        public static readonly string LabTestAddEdit = string.Format(
            "{0}/_LabTestMasterAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test codes list view.
        /// </summary>
        public static readonly string LabTestCodesListView = string.Format(
            "{0}/_LabTestCodesListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test list.
        /// </summary>
        public static readonly string LabTestList = string.Format("{0}/_LabTestList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test list view.
        /// </summary>
        public static readonly string LabTestListView = string.Format(
            "{0}/_LabTestMasterListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test order set list.
        /// </summary>
        public static readonly string LabTestOrderSetList = string.Format(
            "{0}/_LabTestOrderSetList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test order set list view.
        /// </summary>
        public static readonly string LabTestOrderSetListView = string.Format(
            "{0}/_LabTestOrderSetList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test result add edit.
        /// </summary>
        public static readonly string LabTestResultAddEdit = string.Format(
            "{0}/_LabTestResultAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test result list.
        /// </summary>
        public static readonly string LabTestResultList = string.Format(
            "{0}/_LabTestResultList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The lab test view.
        /// </summary>
        public static readonly string LabTestView = string.Format("{0}/_LabTestView", CommonConfig.UserControlPath);

        /// <summary>
        ///     The login tracking day night shift report.
        /// </summary>
        public static readonly string LoginTrackingDayNightShiftReport =
            string.Format("{0}/_LoginTrackingDayNightShiftReport", CommonConfig.UserControlPath);

        /// <summary>
        ///     The mc order code rates add edit.
        /// </summary>
        public static readonly string MCOrderCodeRatesAddEdit = string.Format(
            "{0}/_MCOrderCodeRatesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The mc order code rates list.
        /// </summary>
        public static readonly string MCOrderCodeRatesList = string.Format(
            "{0}/_MCOrderCodeRatesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The mc rules table add edit.
        /// </summary>
        public static readonly string MCRulesTableAddEdit = string.Format(
            "{0}/_MCRulesTableAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The mc rules table list.
        /// </summary>
        public static readonly string MCRulesTableList = string.Format(
            "{0}/_MCRulesTableList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The managed care add edit.
        /// </summary>
        public static readonly string ManagedCareAddEdit = string.Format(
            "{0}/_ManagedCareAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The managed care list.
        /// </summary>
        public static readonly string ManagedCareList = string.Format(
            "{0}/_ManagedCareList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The manual charges tracking list.
        /// </summary>
        public static readonly string ManualChargesTrackingList = string.Format(
            "{0}/_ManualChargesTrackingList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The manual dashboard list.
        /// </summary>
        public static readonly string ManualDashboardList = string.Format(
            "{0}/_ManualDashboardList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The mc contract list view.
        /// </summary>
        public static readonly string McContractListView = string.Format(
            "{0}/_McContractListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical history add edit.
        /// </summary>
        public static readonly string MedicalHistoryAddEdit = string.Format(
            "{0}/_MedicalHistoryAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical history list.
        /// </summary>
        public static readonly string MedicalHistoryList = string.Format(
            "{0}/_MedicalHistoryList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical notes add edit.
        /// </summary>
        public static readonly string MedicalNotesAddEdit = string.Format(
            "{0}/_MedicalNotesAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical notes list.
        /// </summary>
        public static readonly string MedicalNotesList = string.Format(
            "{0}/_MedicalNotesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical notes list patient summary.
        /// </summary>
        public static readonly string MedicalNotesListPatientSummary =
            string.Format("{0}/_MedicalNotesListPatientSummary", CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical vital add edit.
        /// </summary>
        public static readonly string MedicalVitalAddEdit = string.Format(
            "{0}/_MedicalVitalAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The medical vital list.
        /// </summary>
        public static readonly string MedicalVitalList = string.Format(
            "{0}/_MedicalVitalList",
            CommonConfig.UserControlPath);

        /// <summary>
        /// The patient medical vital list
        /// </summary>
        public static readonly string PatientMedicalVitalList = string.Format(
           "{0}/_PatientMedicalVitalList",
           CommonConfig.UserControlPath);

        /// <summary>
        ///     The module access add edit.
        /// </summary>
        public static readonly string ModuleAccessAddEdit = string.Format(
            "{0}/_ModuleAccessAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The module access list.
        /// </summary>
        public static readonly string ModuleAccessList = string.Format(
            "{0}/_ModuleAccessList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The module access tab view.
        /// </summary>
        public static readonly string ModuleAccessTabView = string.Format(
            "{0}/_ModuleAccessTabView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The most recent orders.
        /// </summary>
        public static readonly string MostRecentOrders = string.Format(
            "{0}/_MostRecentOrders",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The notes tab view.
        /// </summary>
        public static readonly string NotesTabView = string.Format("{0}/_NotesTabView", CommonConfig.UserControlPath);


        /// <summary>
        ///     The online help docs list view.
        /// </summary>
        public static readonly string PreEvaluationList = string.Format(
            "{0}/_PreEvaluationList",
            CommonConfig.UserControlPath);
        /// <summary>
        ///     The online help docs list view.
        /// </summary>
        public static readonly string OnlineHelpDocsListView = string.Format(
            "{0}/_OnlineHelpFilesListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The open order activity schedule add edit.
        /// </summary>
        public static readonly string OpenOrderActivityScheduleAddEdit =
            string.Format("{0}/_OpenOrderActivityScheduleAddEdit", CommonConfig.UserControlPath); // Shashank 08102014

        /// <summary>
        ///     The open order list patient summary.
        /// </summary>
        public static readonly string OpenOrderListPatientSummary = string.Format(
            "{0}/_OpenOrderListPatientSummary",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The open orders in search.
        /// </summary>
        public static readonly string OpenOrdersInSearch = string.Format(
            "{0}/_OpenOrdersInSearch",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The operating rooms list.
        /// </summary>
        public static readonly string OperatingRoomsList = string.Format(
            "{0}/_OperatingRoomsList",
            CommonConfig.UserControlPath);


        public static readonly string AnasthesiaList = string.Format(
            "{0}/_AnasthesiaList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The order activity add edit.
        /// </summary>
        public static readonly string OrderActivityAddEdit = string.Format(
            "{0}/_OrderActivityAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The order activity list.
        /// </summary>
        public static readonly string OrderActivityList = string.Format(
            "{0}/_OrderActivityList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The order activity schedule list.
        /// </summary>
        public static readonly string OrderActivityScheduleList = string.Format(
            "{0}/_OrderActivitiesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The order category type list.
        /// </summary>
        public static readonly string OrderCategoryTypeList = string.Format(
            "{0}/_OrderCategoryTypeList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The order closed activity schedule list.
        /// </summary>
        public static readonly string OrderClosedActivityScheduleList = string.Format(
            "{0}/_OrderClosedActivitiesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The order sub category list.
        /// </summary>
        public static readonly string OrderSubCategoryList = string.Format(
            "{0}/_OrderSubCategoryList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The orders custom view.
        /// </summary>
        public static readonly string OrdersCustomView = string.Format(
            "{0}/_OrdersCustomView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The orders full view.
        /// </summary>
        public static readonly string OrdersFullView = string.Format(
            "{0}/_OrdersFullView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The other drug alergies list.
        /// </summary>
        public static readonly string OtherDrugAlergiesList = string.Format(
            "{0}/_OtherDrugAlergiesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The parameters add edit.
        /// </summary>
        public static readonly string ParametersAddEdit = string.Format(
            "{0}/_ParametersAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The parameters list.
        /// </summary>
        public static readonly string ParametersList = string.Format(
            "{0}/_ParametersList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The partial screens permission.
        /// </summary>
        public static readonly string PartialScreensPermission = string.Format(
            "{0}/_PartialScreensPermission",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The password change log view.
        /// </summary>
        public static readonly string PasswordChangeLogView = string.Format(
            "{0}/_PasswordChangeLogReport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The password disables log view.
        /// </summary>
        public static readonly string PasswordDisablesLogView = string.Format(
            "{0}/_AuditLogView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient attachments partial view.
        /// </summary>
        public static readonly string PatientAttachmentsPartialView = string.Format(
            "{0}/_attachments",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient billing info.
        /// </summary>
        public static readonly string PatientBillingInfo = string.Format(
            "{0}/_PatientBillingInfo",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient custom serach list.
        /// </summary>
        public static readonly string PatientCustomSerachList = string.Format(
            "{0}/_PatientCustomSerachList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient documents add edit.
        /// </summary>
        public static readonly string PatientDocumentsAddEdit = string.Format(
            "{0}/_attachmentAddEdit",
            CommonConfig.UserControlPath); // Shashank 09102014

        /// <summary>
        ///     The patient documents list.
        /// </summary>
        public static readonly string PatientDocumentsList = string.Format(
            "{0}/_attachmentsGrid",
            CommonConfig.UserControlPath); // Shashank 09102014

        /// <summary>
        ///     The patient encounters partial view.
        /// </summary>
        public static readonly string PatientEncountersPartialView = string.Format(
            "{0}/_encounters",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient info changes queue list.
        /// </summary>
        public static readonly string PatientInfoChangesQueueList = string.Format(
            "{0}/_PatientInfoChangesQueueList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient info view.
        /// </summary>
        public static readonly string PatientInfoView = string.Format(
            "{0}/_PatientInfoView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient instructions.
        /// </summary>
        public static readonly string PatientInstructions = string.Format(
            "{0}/_PatientInstructions",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient login detail.
        /// </summary>
        public static readonly string PatientLoginDetail = string.Format(
            "{0}/_SecurityTab",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient phone partial view.
        /// </summary>
        public static readonly string PatientPhonePartialView = string.Format(
            "{0}/_phonelist",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient search list.
        /// </summary>
        public static readonly string PatientSearchList = string.Format(
            "{0}/_SearchResult",
            CommonConfig.UserControlPath);

        public static readonly string PatientSearchListCustom = string.Format(
           "{0}/_SearchResultCustom",
           CommonConfig.UserControlPath);

        /// <summary>
        ///     The Patient Search Result List.
        /// </summary>
        public static readonly string PatientSearchResultList = string.Format(
            "{0}/_SearchResultList",
            CommonConfig.UserControlPath);
        /// <summary>
        ///     The Patient Search Result List.
        /// </summary>
        public static readonly string SearchResultListInDetail = string.Format(
            "{0}/_SearchResultListInDetail",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient search result.
        /// </summary>
        public static readonly string PatientSearchResult = string.Format(
            "{0}/_PatientSearchResult",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient summary tab view.
        /// </summary>
        public static readonly string PatientSummaryTabView = string.Format(
            "{0}/_PatientSummaryTabView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient volume stats.
        /// </summary>
        public static readonly string PatientVolumeStats = string.Format(
            "{0}/_PatientVolumeStats",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The patient wise ageing report.
        /// </summary>
        public static readonly string PatientWiseAgeingReport = string.Format(
            "{0}/_PatientAgeingReport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The payment list view.
        /// </summary>
        public static readonly string PaymentListView = string.Format(
            "{0}/_PaymentsListView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The payor wise ageing report.
        /// </summary>
        public static readonly string PayorWiseAgeingReport = string.Format(
            "{0}/_PayorAgeingReport",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The pharmacy activites view.
        /// </summary>
        public static readonly string PharmacyActivitesView = string.Format(
            "{0}/_PharmacyActivitesView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The phone grid.
        /// </summary>
        public static readonly string PhoneGrid = string.Format("{0}/_phoneGrid", CommonConfig.UserControlPath);

        /// <summary>
        ///     The phy all orders.
        /// </summary>
        public static readonly string PhyAllOrders = string.Format("{0}/_phyAllOrders", CommonConfig.UserControlPath);
        public static readonly string PhyAllOrdersSummary = string.Format("{0}/_phyAllOrdersSummary", CommonConfig.UserControlPath);

        /// <summary>
        ///     The phy fav diagnosis list.
        /// </summary>
        public static readonly string PhyFavDiagnosisList = string.Format(
            "{0}/_PhyFavDiagnosisList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The phy favorite orders.
        /// </summary>
        public static readonly string PhyFavoriteOrders = string.Format(
            "{0}/_phyFavoriteOrders",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The physician add edit.
        /// </summary>
        public static readonly string PhysicianAddEdit = string.Format(
            "{0}/_physicianAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The physician favorite custom.
        /// </summary>
        public static readonly string PhysicianFavoriteCustom = string.Format(
            "{0}/_PhysicianFavoritesCustom",
            CommonConfig.UserControlPath); // Shashank 17112014

        /// <summary>
        ///     The physician lab test view.
        /// </summary>
        public static readonly string PhysicianLabTestView = string.Format(
            "{0}/_PhysicianLabTestView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The physician list.
        /// </summary>
        public static readonly string PhysicianList = string.Format("{0}/_physicianList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The physician open order add edit.
        /// </summary>
        public static readonly string PhysicianOpenOrderAddEdit = string.Format(
            "{0}/_OpenOrderAddEdit",
            CommonConfig.UserControlPath); // Shashank 09102014

        /// <summary>
        ///     The physician open order list.
        /// </summary>
        public static readonly string PhysicianOpenOrderList = string.Format(
            "{0}/_OpenOrderList",
            CommonConfig.UserControlPath); // Shashank 09102014

        public static readonly string DischargeOpenOrderList = string.Format(
           "{0}/_OpenOrderDischargeList",
           CommonConfig.UserControlPath); // Shashank 09102014

        public static readonly string DischargeOpenOrderList1 = string.Format(
           "{0}/_DischargeOpenOrderList",
           CommonConfig.UserControlPath); // Shashank 09102014

        public static readonly string DischargeMedicationList = string.Format(
           "{0}/_DischargeMedicationList",
           CommonConfig.UserControlPath); // Shashank 09102014

        /// <summary>
        ///     The plans list.
        /// </summary>
        public static readonly string PlansList = string.Format("{0}/_PlansList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The plans list export view.
        /// </summary>
        public static readonly string PlansListExportView = string.Format(
            "{0}/_PlansListExportView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The polices list.
        /// </summary>
        public static readonly string PolicesList = string.Format("{0}/_PolicesList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The pre xml file list.
        /// </summary>
        public static readonly string PreXMLFileList = string.Format(
            "{0}/_PreXMLFileList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The previous diagnosis list.
        /// </summary>
        public static readonly string PreviousDiagnosisList = string.Format(
            "{0}/_PreviousDiagnosisList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The project dashboard list.
        /// </summary>
        public static readonly string ProjectDashboardList = string.Format(
            "{0}/_ProjectDashboardList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The project targets list.
        /// </summary>
        public static readonly string ProjectTargetsList = string.Format(
            "{0}/_ProjectTargetsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The project task targets list.
        /// </summary>
        public static readonly string ProjectTaskTargetsList = string.Format(
            "{0}/_ProjectTaskTargetsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The project tasks list.
        /// </summary>
        public static readonly string ProjectTasksList = string.Format(
            "{0}/_ProjectTasksList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The projects dash view.
        /// </summary>
        public static readonly string ProjectsDashView = string.Format(
            "{0}/_ProjectsDashView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The projects dashboard p view.
        /// </summary>
        public static readonly string ProjectsDashboardPView = string.Format(
            "{0}/_ProjectsDashboardPView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The projects list.
        /// </summary>
        public static readonly string ProjectsList = string.Format("{0}/_ProjectsList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The reconcilation ar month wise.
        /// </summary>
        public static readonly string ReconcilationARMonthWise = string.Format(
            "{0}/_ReconcilationARMonthWise",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The reconcilation ar week wise.
        /// </summary>
        public static readonly string ReconcilationARWeekWise = string.Format(
            "{0}/_ReconcilationARWeekWise",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The reconcilation ar year wise.
        /// </summary>
        public static readonly string ReconcilationARYearWise = string.Format(
            "{0}/_ReconcilationARYearWise",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The remarks list.
        /// </summary>
        public static readonly string RemarksList = string.Format("{0}/_RemarksList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The revenue forecast facility view.
        /// </summary>
        public static readonly string RevenueForecastFacilityView = string.Format(
            "{0}/_RevenueForecastFacilityView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The revenue forecast facility view by patient.
        /// </summary>
        public static readonly string RevenueForecastFacilityViewByPatient =
            string.Format("{0}/_RevenueForecastFacilityViewByPatient", CommonConfig.UserControlPath);

        /// <summary>
        ///     The role list.
        /// </summary>
        public static readonly string RoleList = string.Format("{0}/_RoleList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The role selection master.
        /// </summary>
        public static readonly string RoleSelectionMaster = string.Format("{0}/Index", CommonConfig.UserControlPath);

        /// <summary>
        ///     The room charges list.
        /// </summary>
        public static readonly string RoomChargesList = string.Format(
            "{0}/_RoomChargesList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The rule master add edit.
        /// </summary>
        public static readonly string RuleMasterAddEdit = string.Format(
            "{0}/_RuleMasterAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The rule master list.
        /// </summary>
        public static readonly string RuleMasterList = string.Format(
            "{0}/_RuleMasterList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The rule step add edit.
        /// </summary>
        public static readonly string RuleStepAddEdit = string.Format(
            "{0}/_RuleStepAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The rule step list.
        /// </summary>
        public static readonly string RuleStepList = string.Format("{0}/_RuleStepList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The screen list.
        /// </summary>
        public static readonly string ScreenList = string.Format("{0}/_ScreenList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The scrub edit track add edit.
        /// </summary>
        public static readonly string ScrubEditTrackAddEdit = string.Format(
            "{0}/_ScrubEditTrackAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The scrub edit track list.
        /// </summary>
        public static readonly string ScrubEditTrackList = string.Format(
            "{0}/_ScrubEditTrackList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The scrub edit track list report.
        /// </summary>
        public static readonly string ScrubEditTrackListReport = string.Format(
            "{0}/_ScrubEditTrackListReport",
            CommonConfig.UserControlPath);

        public static readonly string SchedulingLog = string.Format(
            "{0}/_SchedulingLog",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The scrub header list.
        /// </summary>
        public static readonly string ScrubHeaderList = string.Format(
            "{0}/_ScrubHeaderList",
            CommonConfig.UserControlPath);

        public static readonly string ScrubHeaderListF1 = string.Format(
        "{0}/_ScrubHeaderListF1",
        CommonConfig.UserControlPath);

        public static readonly string ScrubHeaderListWithBillEditsWithError = string.Format(
       "{0}/_ScrubHeaderListWithBillEditsWithError",
       CommonConfig.UserControlPath);

        public static readonly string ScrubHeaderListWithDenials = string.Format(
      "{0}/_ScrubHeaderListWithDenials",
      CommonConfig.UserControlPath);
        /// <summary>
        ///     The scrub report list.
        /// </summary>
        public static readonly string ScrubReportList = string.Format(
            "{0}/_ScrubReportList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The service code list.
        /// </summary>
        public static readonly string ServiceCodeList = string.Format(
            "{0}/_ServiceCodeList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The tabs add edit.
        /// </summary>
        public static readonly string TabsAddEdit = string.Format("{0}/_TabsAddEdit", CommonConfig.UserControlPath);

        /// <summary>
        ///     The tabs list.
        /// </summary>
        public static readonly string TabsList = string.Format("{0}/_TabsList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The tabs tree view.
        /// </summary>
        public static readonly string TabsTreeView = string.Format("{0}/_TabsTreeView", CommonConfig.UserControlPath);

        /// <summary>
        ///     The total beds list partial view.
        /// </summary>
        public static readonly string TotalBedsListPartialView = string.Format(
            "{0}/_TotalBedsList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The update diagnosis.
        /// </summary>
        public static readonly string UpdateDiagnosis = string.Format(
            "{0}/_UpdateDiagnosis",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The upload charges bill activities list.
        /// </summary>
        public static readonly string UploadChargesBillActivitiesList =
            string.Format("{0}/_UploadChargesBillActivitiesList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The user login activity view.
        /// </summary>
        public static readonly string UserLoginActivityView = string.Format(
            "{0}/_UserLoginActivityView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The users list.
        /// </summary>
        public static readonly string UsersList = string.Format("{0}/_UsersList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The vitals list view.
        /// </summary>
        public static readonly string VitalsListView = string.Format(
            "{0}/_VitalsListView",
            CommonConfig.UserControlPath);


        public static readonly string LicenceTypeListView = string.Format(
           "{0}/_LicenceTypeListView",
           CommonConfig.UserControlPath);

        public static readonly string LicenceTypeAddEdit = string.Format(
           "{0}/_LicenceTypeAddEdit",
           CommonConfig.UserControlPath);



        /// <summary>
        ///     The vitals tab view.
        /// </summary>
        public static readonly string VitalsTabView = string.Format("{0}/_VitalsTabView", CommonConfig.UserControlPath);

        /// <summary>
        ///     The volume executive stats.
        /// </summary>
        public static readonly string VolumeExecutiveStats = string.Format(
            "{0}/_VolumeExecutiveStats",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x file header add edit.
        /// </summary>
        public static readonly string XFileHeaderAddEdit = string.Format(
            "{0}/_XFileHeaderAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x file header list.
        /// </summary>
        public static readonly string XFileHeaderList = string.Format(
            "{0}/_XFileHeaderList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The xml bill header list.
        /// </summary>
        public static readonly string XMLBillHeaderList = string.Format(
            "{0}/_XMLBillHeaderList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The xml billing add edit.
        /// </summary>
        public static readonly string XMLBillingAddEdit = string.Format(
            "{0}/_XMLBillingAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The xml billing list.
        /// </summary>
        public static readonly string XMLBillingList = string.Format(
            "{0}/_XMLBillingList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The xml parsed data view.
        /// </summary>
        public static readonly string XMLParsedDataView = string.Format(
            "{0}/_XMLParsedDataView",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x payment detail edit.
        /// </summary>
        public static readonly string XPaymentDetailEdit = string.Format(
            "{0}/_XPaymentDetailEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x payment file xml add edit.
        /// </summary>
        public static readonly string XPaymentFileXMLAddEdit = string.Format(
            "{0}/_XPaymentFileXMLAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x payment header.
        /// </summary>
        public static readonly string XPaymentHeader = string.Format(
            "{0}/_XPaymentHeader",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x payment return add edit.
        /// </summary>
        public static readonly string XPaymentReturnAddEdit = string.Format(
            "{0}/_XPaymentReturnAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The x payment return list.
        /// </summary>
        public static readonly string XPaymentReturnList = string.Format(
            "{0}/_XPaymentReturnList",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The xclaim add edit.
        /// </summary>
        public static readonly string XclaimAddEdit = string.Format("{0}/_XclaimAddEdit", CommonConfig.UserControlPath);

        /// <summary>
        ///     The xclaim list.
        /// </summary>
        public static readonly string XclaimList = string.Format("{0}/_XclaimList", CommonConfig.UserControlPath);

        /// <summary>
        ///     The insurance company add edit.
        /// </summary>
        public static readonly string insuranceCompanyAddEdit = string.Format(
            "{0}/_insuranceCompanyAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The insurance plans add edit.
        /// </summary>
        public static readonly string insurancePlansAddEdit = string.Format(
            "{0}/_insurancePlansAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The service code add edit.
        /// </summary>
        public static readonly string serviceCodeAddEdit = string.Format(
            "{0}/_serviceCodeAddEdit",
            CommonConfig.UserControlPath);

        /// <summary>
        ///     The favorite orders.
        /// </summary>
        public static readonly string BarCodeView = string.Format(
            "{0}/_BarCodeView",
            CommonConfig.UserControlPath);

        public static readonly string NurseEnteredList = string.Format(
            "{0}/_NurseEnteredList",
            CommonConfig.UserControlPath);

        public static readonly string MarFormList = string.Format(
            "{0}/_MarFormListView",
            CommonConfig.UserControlPath);
        #endregion

        // _TabsTreeView


    }

    /// <summary>
    ///     The controller names.
    /// </summary>
    public class ControllerNames
    {
        #region Static Fields

        /// <summary>
        ///     The active encounter controller.
        /// </summary>
        public static readonly string activeEncounterController = "ActiveEncounter";

        /// <summary>
        ///     The home.
        /// </summary>
        public static readonly string home = "Home";

        /// <summary>
        ///     The patient search.
        /// </summary>
        public static readonly string patientSearch = "PatientSearch";

        #endregion
    }

    /// <summary>
    ///     The action results.
    /// </summary>
    public class ActionResults
    {
        #region Static Fields

        /// <summary>
        ///     The bill header.
        /// </summary>
        public static readonly string BillHeader = "BillHeader";

        /// <summary>
        ///     The logoff.
        /// </summary>
        public static readonly string Logoff = "LogOff";

        /// <summary>
        ///     The welcome.
        /// </summary>
        public static readonly string Welcome = "Welcome";

        /// <summary>
        ///     The active encounter default action.
        /// </summary>
        public static readonly string activeEncounterDefaultAction = "ActiveEncounter";

        /// <summary>
        ///     The login.
        /// </summary>
        public static readonly string login = "UserLogin";

        /// <summary>
        ///     The patient search.
        /// </summary>
        public static readonly string patientSearch = "PatientSearch";

        #endregion
    }

    /// <summary>
    ///     The common config.
    /// </summary>
    public class CommonConfig
    {
        #region Public Properties

        /// <summary>
        ///     Gets or sets a value indicating whether admin rights on accept or decline.
        /// </summary>
        public static bool AdminRightsOnAcceptOrDecline { get; set; }

        /// <summary>
        ///     Gets the base image path.
        /// </summary>
        public static string BaseImagePath
        {
            get
            {
                return HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            }
        }

        /// <summary>
        ///     Gets the blob path.
        /// </summary>
        public static string BlobPath
        {
            get
            {
                return ConfigurationManager.AppSettings["blobPath"].ToString(CultureInfo.InvariantCulture);
            }
        }

        /// <summary>
        ///     Gets the date time format.
        /// </summary>
        public static string DateTimeFormat
        {
            get
            {
                return "dd/mm/yyyy hh:mm";
            }
        }

        /// <summary>
        ///     Gets the default avatar.
        /// </summary>
        public static string DefaultAvatar
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["default_avatar"]);
            }
        }

        /// <summary>
        ///     Gets the default language.
        /// </summary>
        public static string DefaultLanguage
        {
            get
            {
                return "en-US";
            }
        }

        /// <summary>
        ///     Gets the default name of home group.
        /// </summary>
        public static string DefaultNameOfHomeGroup
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["DefaultHomeGroupName"]);
            }
        }

        /*
         * By: Amit Jain
         * On: 07082014
         * Purpose: Add Property as the Default Name of HomeGroup in norwegian by default.
         */
        // Additions Start here
        /// <summary>
        ///     Get the Default Name of Home Group in Norwegian
        /// </summary>
        public static string DefaultNameOfHomeGroupNorwegian
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["DefaultNameOfHomeGroupNorwegian"]);
            }
        }

        /// <summary>
        ///     Gets the default picture.
        /// </summary>
        public static string DefaultPicture
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["DefaultProfilePicture"]);
            }
        }

        /// <summary>
        ///     Gets the display time format.
        /// </summary>
        public static string DisplayTimeFormat
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["DisplayTimeFormat"]);
            }
        }

        /// <summary>
        ///     Gets the en date format.
        /// </summary>
        public static string EnDateFormat
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["EnDateFormat"]);
            }
        }

        /// <summary>
        ///     Gets the en display date format.
        /// </summary>
        public static string EnDisplayDateFormat
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["EnDisplayDateFormat"]);
            }
        }

        /// <summary>
        ///     Gets the error.
        /// </summary>
        public static string Error
        {
            get
            {
                return "Encountered unexpected character '<'";
            }
        }

        /// <summary>
        ///     Gets the events page size.
        /// </summary>
        public static int EventsPageSize
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["EventsPageSize"]);
            }
        }

        /// <summary>
        ///     Gets the expire cookies in days.
        /// </summary>
        public static int ExpireCookiesInDays
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["ExpireCookiesInDays"]);
            }
        }

        /// <summary>
        ///     Gets the first page size.
        /// </summary>
        public static int FirstPageSize
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["FirstPageSize"]);
            }
        }

        /// <summary>
        ///     Gets the gmail client id.
        /// </summary>
        public static string GmailClientID
        {
            get
            {
                return ConfigurationManager.AppSettings["GmailClientID"];
            }
        }

        /// <summary>
        ///     Gets the groups page size.
        /// </summary>
        public static int GroupsPageSize
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["GroupsPageSize"]);
            }
        }

        /// <summary>
        ///     Gets the import xml billing file path.
        /// </summary>
        public static string ImportXMLBillingFilePath
        {
            get
            {
                return ConfigurationManager.AppSettings["ImportXMLBillingFilePath"];
            }
        }

        /// <summary>
        ///     Gets the invitation page size.
        /// </summary>
        public static int InvitationPageSize
        {
            get
            {
                return Convert.ToInt32(ConfigurationManager.AppSettings["InvitationPageSize"]);
            }
        }

        /// <summary>
        ///     Gets the labtest result set excel template.
        /// </summary>
        public static string LabtestResultSetExcelTemplate
        {
            get
            {
                return ConfigurationManager.AppSettings["LabtestResultSetExcelTemplate"];
            }
        }

        // public static string Language
        // {
        // get
        // {
        // return System.Web.HttpContext.Current.Request.UserLanguages[0] == OppmannEnums.Language.no.ToString() ? OppmannEnums.Language.nb.ToString() : System.Web.HttpContext.Current.Request.UserLanguages[0];
        // }
        // }

        /// <summary>
        ///     Gets the language.
        /// </summary>
        public static string Language
        {
            get
            {
                if (HttpContext.Current != null
                    && HttpContext.Current.Session[SessionNames.SessionClass.ToString()] != null)
                {
                    var session = HttpContext.Current.Session[SessionNames.SessionClass.ToString()] as SessionClass;
                    return string.IsNullOrEmpty(session.SelectedCulture) ? "en-US" : session.SelectedCulture;
                }

                return "en-US";
            }
        }

        /// <summary>
        ///     Gets the login url.
        /// </summary>
        public static string LoginUrl
        {
            get
            {
                return string.Format("/{0}/{1}", ControllerNames.home, ActionResults.login);
            }
        }


        public static string UnauthorizedAccess
        {
            get
            {
                return string.Format("/{0}/{1}", ControllerNames.home, ActionNameAccess.UnauthorizedView);
            }
        }

        /// <summary>
        ///     Gets the manual dashboard excel template file path.
        /// </summary>
        public static string ManualDashboardExcelTemplateFilePath
        {
            get
            {
                return ConfigurationManager.AppSettings["ManualDashboardExcelTemplateFilePath"];
            }
        }

        /// <summary>
        ///     Gets the max file size in mb.
        /// </summary>
        public static int MaxFileSizeInMB
        {
            get
            {
                int fileSize = Convert.ToInt32(ConfigurationManager.AppSettings["maxFileSizeToUpload"]);
                return 1024 * 1024 * fileSize;
            }
        }

        /// <summary>
        ///     Gets the nb date format.
        /// </summary>
        public static string NbDateFormat
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["NbDateFormat"]);
            }
        }

        /// <summary>
        ///     Gets the nb display date format.
        /// </summary>
        public static string NbDisplayDateFormat
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["NbDisplayDateFormat"]);
            }
        }

        /// <summary>
        ///     Gets the online help file path.
        /// </summary>
        public static string OnlineHelpFilePath
        {
            get
            {
                return ConfigurationManager.AppSettings["OnlineHelpFilePath"];
            }
        }

        /// <summary>
        ///     Gets the outlook client id.
        /// </summary>
        public static string OutlookClientID
        {
            get
            {
                return ConfigurationManager.AppSettings["OutlookClientID"];
            }
        }

        /// <summary>
        ///     Gets the outlook redirect url.
        /// </summary>
        public static string OutlookRedirectUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["OutlookRedirectUrl"];
            }
        }

        /// <summary>
        ///     Gets the patient documents file path.
        /// </summary>
        public static string PatientDocumentsFilePath
        {
            get
            {
                return "\\Content\\Images\\{0}";
            }
        }

        // ashwani

        /// <summary>
        ///     Gets the profile pic virtual path.
        /// </summary>
        public static string ProfilePicVirtualPath
        {
            get
            {
                return "/Content/Images/ProfileImages/{0}/{1}";
            }
        }

        /// <summary>
        ///     Gets the remittance advice xml file path.
        /// </summary>
        public static string RemittanceAdviceXmlFilePath
        {
            get
            {
                return ConfigurationManager.AppSettings["RemittanceAdviceXmlFilePath"];
            }
        }

        /// <summary>
        ///     Gets the service url.
        /// </summary>
        public static string ServiceUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["serviceURL"].ToString(CultureInfo.InvariantCulture);
            }
        }

        /// <summary>
        ///     Gets the site url.
        /// </summary>
        public static string SiteUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["siteUrl"].ToString(CultureInfo.InvariantCulture);
            }
        }

        /// <summary>
        ///     Gets the user control path.
        /// </summary>
        public static string UserControlPath
        {
            get
            {
                return ConfigurationManager.AppSettings["UserControlsPath"];
            }
        }

        /// <summary>
        ///     Gets the user locale.
        /// </summary>
        public static string UserLocale
        {
            get
            {
                string[] languages = HttpContext.Current.Request.UserLanguages;
                string browserLanguage = DefaultLanguage;
                if (languages != null && languages.Length > 0)
                {
                    browserLanguage = languages[0];

                    if (browserLanguage == "ar-sa" || browserLanguage == "sa" || browserLanguage == "ar")
                    {
                        browserLanguage = "ar-SA";
                    }

                    if (browserLanguage == "en-us" || browserLanguage == "en")
                    {
                        browserLanguage = DefaultLanguage;
                    }

                    // Set default language.
                    if (string.IsNullOrWhiteSpace(browserLanguage)
                        || (browserLanguage.ToLower() != "ar-sa" && browserLanguage.ToLower() != "en-us"))
                    {
                        browserLanguage = DefaultLanguage;
                    }
                }

                return browserLanguage;
            }
        }

        /// <summary>
        ///     Gets the version.
        /// </summary>
        public static string Version
        {
            get
            {
                return Convert.ToString(ConfigurationManager.AppSettings["Version"]);
            }
        }

        /// <summary>
        ///     Gets the xml bill file path.
        /// </summary>
        public static string XMLBillFilePath
        {
            get
            {
                return ConfigurationManager.AppSettings["XmlBillFilePath"];
            }
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// The generate login code.
        /// </summary>
        /// <param name="len">
        /// The len.
        /// </param>
        /// <param name="upper">
        /// The upper.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public static string GenerateLoginCode(int len, bool upper)
        {
            var rand = new Random();
            char[] allowableChars = "0123456789".ToCharArray();
            string final = string.Empty;
            for (int i = 0; i <= len - 1; i++)
                final += allowableChars[rand.Next(allowableChars.Length - 1)];

            return upper ? final.ToUpper() : final;
        }

        /// <summary>
        /// The generate password reset token.
        /// </summary>
        /// <param name="len">
        /// The len.
        /// </param>
        /// <param name="upper">
        /// The upper.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public static string GeneratePasswordResetToken(int len, bool upper)
        {
            var rand = new Random();
            char[] allowableChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ0123456789".ToCharArray();
            string final = string.Empty;
            for (int i = 0; i <= len - 1; i++)
                final += allowableChars[rand.Next(allowableChars.Length - 1)];
            return upper ? final.ToUpper() : final;
        }

        #endregion


        public static string ImageUploads
        {
            get
            {
                return "/Content/UserFiles/";
            }
        }

        public static string GenerateUniqueFileName(HttpPostedFileBase currentFile)
        {
            var dPath = HttpContext.Current.Server.MapPath("~" + ImageUploads);
            if (!Directory.Exists(dPath))
                Directory.CreateDirectory(dPath);

            var ext = Path.GetExtension(currentFile.FileName);

            var fileName = $"{Convert.ToString((new Random()).Next(0, 10000))}{Path.GetExtension(currentFile.FileName)}";
            var file = $"{dPath}/{fileName}";
            var isExists = File.Exists(file);

            while (isExists)
            {
                fileName = Path.GetFileNameWithoutExtension(fileName);          //1
                fileName += Convert.ToString((new Random()).Next(0, 1000));      //13
                fileName = fileName + ext;      //13.jpg
                file = $"{dPath}/{fileName}";        //folder1/13.jpg
                isExists = File.Exists(file);
            }

            return file;
        }
    }

    /// <summary>
    ///     The utility.
    /// </summary>
    public class Utility
    {
        #region Public Methods and Operators

        /// <summary>
        /// The get app settings.
        /// </summary>
        /// <param name="key">
        /// The key.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public static string GetAppSettings(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        /// <summary>
        /// The get decrypted app settings value.
        /// </summary>
        /// <param name="key">
        /// The key.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public static string GetDecryptedAppSettingsValue(string key)
        {
            string value = ConfigurationManager.AppSettings[key];
            if (!string.IsNullOrEmpty(value))
            {
                value = EncryptDecrypt.Decrypt(value);
            }

            return value;
        }

        #endregion
    }

    /// <summary>
    ///     The email info.
    /// </summary>
    public class EmailInfo
    {
        #region Public Properties

        /// <summary>
        ///     Gets or sets the display name.
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        ///     Gets or sets the email.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        ///     Gets or sets the message body.
        /// </summary>
        public string MessageBody { get; set; }

        /// <summary>
        ///     Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     Gets or sets the patient id.
        /// </summary>
        public int PatientId { get; set; }

        /// <summary>
        ///     Gets or sets the subject.
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        ///     Gets or sets the verification link.
        /// </summary>
        public string VerificationLink { get; set; }

        /// <summary>
        ///     Gets or sets the verification token id.
        /// </summary>
        public string VerificationTokenId { get; set; }

        public string Physician { get; set; }

        public string Time { get; set; }
        public string Dated { get; set; }
        public string Appointment { get; set; }
        #endregion



    }
}
