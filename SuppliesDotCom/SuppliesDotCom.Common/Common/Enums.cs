using System.ComponentModel;

namespace SuppliesDotCom.Common.Common
{
    public enum ExcelImportResultCodes
    {
        Initialized = 0,
        Success = 1,
        OtherInvalidData = 101,
        DatesInCorrect = 102,
        FileEmpty = 103,
        ExecutionError = 104,
        CodeMissing = 105,
        DatesFormat2 = 106
    }

    /// <summary>
    ///     Enum for labels used in Login Screen
    /// </summary>
    public enum LoginScreenLabels
    {
        LanguageId = 5,
        MicrosoftAdvantage = 2,
        Welcome = 1
    }

    /// <summary>
    ///     Enum for labels used in FAQ Screen
    /// </summary>
    public enum FaqScreenLabels
    {
        Faq = 1
    }

    /// <summary>
    ///     Enum used in prize screen
    /// </summary>
    public enum PrizeScreenEnums
    {
        DefaultNoOfPrizes = 14
    }

    /// <summary>
    ///     Enum for labels used in Quiz Screen
    /// </summary>
    public enum QuizScreenLabels
    {
        Quiz = 4
    }

    /// <summary>
    ///     Enum for labels used in Settings Screen
    /// </summary>
    public enum SettingsScreenLabels
    {
        Contact = 28,
        Faq = 31,
        HowToParticipate = 26,
        LogOff = 25,
        ManageYourProfile = 25,
        MyPrizeOrders = 30,
        MyProfile = 15,
        Quiz = 14,
        TermsAndConditions = 26
    }

    /// <summary>
    ///     Enum for id_org fields
    /// </summary>
    public enum CategoryImages
    {
        Appliances = 52,
        Avatar = 127,
        Clothing = 36,
        Electronics = 21,
        Home = 80,
        Leisure = 27
    }

    /// <summary>
    ///     Enums for transaction status
    /// </summary>
    public enum TransactionStatusText
    {
        New = 1,
        Ordered = 2,
        Completed = 3,
        Backordered = 4,
        Approved = 5,
        Shipped = 6
    }

    /// <summary>
    ///     Enums for transaction type
    /// </summary>
    public enum TransactionTypeText
    {
        Sale = 1,
        Order = 2,
        Birthday = 3,
        Quiz = 4,
        Learning = 5,
        Random = 6,
        Welcome = 7
    }

    public enum GlobalCodeCategoryValue
    {
        DashBoardBudgetType = 3112,
        DashboardBudgetFor = 3119,
        DashboardTargetsUOM = 1012,
        DashboardTargetsTimingIncrement = 1013,
        DashboardStatDesc = 3110,
        ExternalDashboardType = 4345,
        DashboardProjectsType = 4408,
        DashboardIndicatorSettings = 4400,
        KPICategoryType = 4346,
        KpiSubCategories1 = 4347,
        KpiSubCategories2 = 4351,
        DashboardFrequencyType = 4344,
        DashboardFormatType = 4343,
        DashboardTypes = 4401,
        ExternalDashboardCategories = 4402,
        ExternalDashboardDataFields = 4403,
        ExternalDashboardArguments = 4405,
        ExternalDashboardColors = 4406,
        TypeofData = 4407,
        FacilityRegions = 4141,
        ProjectsPercentageValue = 4601,
        Column = 14400,
    }

    public enum OrderTypesNotInUse
    {
        USCLS = 3,
        DRUG = 5
    }

    public enum PermissionTypes
    {
        Screen = 1,
    }

    public enum LoginResponseTypes
    {
        Success = 0,
        Failed = 1,
        InActive = 2,
        IsDeleted = 3,
        CaptchaFailed = 4,
        FailedAttemptsOver = 5,
        Blocked = 6,
        UnknownError = 7,
        AccountNotActivated = 8,
        OddLoginTiming = 9,
        WrongPassword = 10,
        UserNotFound = 11,
        UserNotFoundInCorporate = 12
    }

    public enum SessionEnum
    {
        User,
        SessionUser,
        GroupId,
        SelectedCulture,
        parentId,
        previousUrl,
        eventviewstate,
        PreviousGroupId,
        SecretLogin,
        SessionGroup,
        ContentStream,
        ContentStreamDoc,
        ContentLength,
        ContentType,
        UtcDiffWithuniversalTime,
        CroppedContentType,
        IsDayLight,
        SessionGuardianUserId,
        SessionFiltersToPersist,
        TimezoneName,
        PatientId,
        TempFile,
        ProfileImage,
        TempProfileFile,
        OtherDoc,
        TempOtherDoc,
        PatientDoc,
        PatientDocName,
        DocTypeId,
        OldDoc,
        OtherOldDoc
    }



    public enum SessionNames
    {
        SessionClass,
        SessoionModuleAccess,
        SelectedFacilityId,
        FacilityStructureData,
        Files
    }

    public enum MappingRoleType
    {
        Facility,
        Corporate
    }

    //enum Phone Type
    public enum PhoneType
    {
        HomePhone = 1,
        MobilePhone = 2,
        BusinessPhone = 3,
        Others = 4
    }

    public enum DefaultRoles
    {
        SysAdmin = 40
    }

    public enum MaxValueKeys
    {
        MedicalRecordNumber = 1
    }

    public enum DefaultRoleIDs
    {
        SysAdminRole = 40 //To be changed later
    }

    //Added By Shashank
    public enum NotesUserType
    {
        Physician = 1,
        Nurse = 2
    }




    public enum DocumentTemplateTypes
    {
        ProfileImage = 1,
        RadImaging = 2,
        LegalDocuments = 3,
        OldMedicalRecords = 4,
        OtherPatientDocuments = 5,
        OnlineHelp = 99,
        Authorization = 10,
    }

    public enum DocAssociatedType
    {
        PatientDemographicDocument = 1,
        OnlineHelp = 99,
        Authorization = 10,
    }


    public enum BaseFacilityStucture
    {
        Floor = 82,
        Department = 83,
        Rooms = 84,
        Bed = 85
    }

    public enum MessageType
    {
        AdmitPatient = 1,
        StartOutPatient = 2,
        Discharge = 3,
        EndEncounter = 4,
        EncounterDetails = 5,
        ViewEHR = 6,
        ViewAuthorization = 7,
        ViewBillingHeader = 8,
        ViewScrubReport = 9,
        EnterManualPayment = 10,
        ViewPatientPortal = 11,
        ViewEM = 6,
        Other = 99,
        PatientSchedular = 12,
        ServiceCodeMainCategory = 6200
    }

    public enum FavoriteCategories
    {
        Orders = 1,
        Diagnosis = 2,
        CPT = 3,
        HCPCS = 4,
        BedCharges = 8,
        DRG = 9,
        DRUG = 5,
    }

    public enum StoredProcedures
    {
        SPROC_REP_PasswordChangelog,
        SPROC_REP_PasswordDisablelog,
        CleanupAllDataByCorporate,
        SPROC_DefaultCorporateItems,
        SPROC_GetDBBudgetActual,
        SPROC_GetDBCharges,
        SPROC_GetDBChargesByCorporate,
        SPROC_SetDBChargesActuals,
        SPROC_SetDBCountersActuals,
        SPROC_GetManualDashboardDataSA,
        SPROC_GetManualDashboardDataStatList_SA,
        SPROC_GetDBBudgetActualManual_Acute,
        SPROC_GetPatientFallRate_ManualDashboard,
        SPROC_GetPatientFallRate_DashboardData,
        SPROC_GetSubCategoryCharts_Manual,
        SPROC_GetSubCategoryCharts_PixorMix,
        SPROC_GetManualDashboardDataList,
        SPROC_GetManualDashboardDataListV1,
        SPROC_GetManualDashboardDataByIndicatorNumber,
        SPROC_GetManualDashboardDataByIndicatorNumberV1,
        SPROC_GetDBBudgetActualManualIndicators,
        SPROC_GetDBBudgetManualBalanceSheet,
        SPROC_GetManualDashboardDataListRebind,
        SPROC_GetManualDashboardDataListRebindV1,
        SPROC_GetDashboardDataStatList_SA,
        SPROC_GetDashboardBalanceSheetDataList_SA,
        SPROC_GetDashboardDataBalanceSheetDataList_SA,
        SPROC_GetDashboardDataGraph_SA,
        SPROC_UpdateDashboardIndicatorsData,
        SPROC_UpdateCalculativeIndicatorData_SA,
        SPROC_SetStaticBudgetTarget,
        SPROC_DBDCalc_IndicatorUpdate,
        SPROC_DBDGenerate_IndicatorEffects,
        SPROC_SaveAllDashboardIndicatorData,
        SPROC_SaveIndicatorDataAfterNewIndicator,
        SPROC_SaveIndicatorDataAfterNewIndicator_New,
        SPROC_SortDashboardIndicatorCols,
        SPROC_GetDashBoardIndicators,
        SPROC_MakeIndicatorInActive,
        SPROC_GetDetailsByBillingSystemParametersId,
        SPROC_UpdateTableNumberInBillingCodes,
        SPROC_DeleteFacilityData,
        SPROC_DefaultFacilityItems,
        SprocSaveFacilityRole,
        SPROC_GetFacilityStructureData,
        SprocGetOrderTypeCategoriesByFacility,
        SPROC_CreateOpenOrderActivityTimeForFrequency,
        SPROC_DeleteIndicatorDataCheckList,
        SPROC_Get_REP_LoginTimeDayNightWise,
        SPROC_AddUpdateModuleAccess,
        SPROC_AddUpdateRolePermission,
        SprocGetAllTabs,
        SPROC_GetUsersRoleWise,
        GetDashboardParameters,
        SPROC_Get_REP_ChargeReport,
        SPROC_GET_REP_CHargeReportDetails,
        SprocGetTabsList,
        SprocGetTabsByRole,
        SprocSaveTab,
        SPROC_GetFacilityStructueChildParent,
        SPROC_GetRoomsByDepartments,
        SPROC_GetAppointmentRoomsAssignements,
        SPORC_GetDashboardTransactionCounterData,
        SPROC_GetGlobalCodesByCategories,
        SprocGetGlobalCodesByCategory,
        SPROC_REP_UserActivityLog,
        SprocGetTabsListOnModuleAccessLoad,
        SprocGetTabsInRoleTabsView,
    }

    public enum ParamtersLevel
    {
        Corporate = 1073,
        Facility = 1074,
        Bill = 1075,
        Claim = 1076,
    }

    public enum ParamtersType
    {
        Single = 1077,
        Range = 1078,
    }

    public enum ParamtersDataType
    {
        Integer = 1079,
        Numeric = 1080,
        Date = 1081,
        String = 1082,
        Bool = 1083,
        LocalTimeType = 5127,
        DemoTimeType = 4125
    }

    public enum AttachmentType
    {
        ProfilePicture = 1,
        OnlineHelp = 99,
        Authorization = 10,
    }






    public enum TableNames
    {
        Authorization = 1,
        BillHeader = 2,
        Corporate = 3,
        Denial = 4,
        Diagnosis = 5,
        DiagnosisCode = 6,
        Drug = 7,
        Encounter = 8,
        Facility = 9,
        HCPCSCodes = 10,
        InsuranceCompany = 11,
        InsurancePlans = 12,
        InsurancePolices = 13,
        MCContract = 14,
        OpenOrder = 15,
        OpenOrderActivitySchedule = 16,
        OpenOrderActivityTime = 17,
        OrderActivity = 18,
        PatientInfo = 19,
        RuleMaster = 20,
        PatientInsurance = 21,
        BillActivity = 22,
        CPTCodes = 23,
        DRGCodes = 24,
        ServiceCode = 25
    }

    public enum ReportingType
    {
        UserLoginActivity = 1,
        PasswordDisablesLog = 2,
        PasswordChangeLog = 3,
        DailyChargeReport = 4,
        ChargesByPayorReport = 5,
        PayorWiseAgeingReport = 6,
        PatientWiseAgeingReport = 7,
        DepartmentWiseAgeingReport = 8,
        PayorWiseReconciliationReport = 9,
        PatientWiseReconciliationReport = 10,
        DepartmentWiseReconciliationReport = 11,
        RevenueForecastReport = 12,
        ClaimTransactionDetailReport = 13,
        DenialReport = 14,
        JournalEntrySupport = 15,
        JournalEntrySupportMCD = 16,
        JournalEntrySupportWO = 17,
        CorrectionLog = 18,
        ChargeReport = 19,
        ChargeDetailReport = 20,
        PhysicianActivityReport = 21,
        ScrubbeSummary = 22,
        ErrorDetail = 23,
        ErrorSummary = 24,
        DetailUserTransactions = 25,
        PhysicianUtilization = 26,
        DepartmentUtilization = 27,
        FutureOrders = 30,
        SchedulingActivityLog = 31
    }

    public enum ReportingTypeActions
    {
        UserLoginActivityPdf = 1,
        PasswordDisablesLogPdf = 2,
        PasswordChangeLogPdf = 3,
        DailyChargeReportPdf = 4,
        ChargesByPayorReportPdf = 5,
        PayorWiseAgeingReport = 6,
        PatientWiseAgeingReport = 7,
        DepartmentWiseAgeingReport = 8,
        PayorWiseReconciliationReport = 9,
        PatientWiseReconciliationReport = 10,
        DepartmentWiseReconciliationReport = 11,
        OverviewAgingReport = 12,
        CorrectionLog = 18,
        ChargeReport = 19
    }




    public enum OrderTypeCategory
    {
        EvaluationandManagement = 11009,
        Anesthesia = 11001,
        Surgery = 11010,
        Radiology = 11070,
        PathologyandLaboratory = 11080,
        Medicine = 11090,
        Pharmacy = 11100,
        LabTest = 11020,
    }

    public enum ParamterSystemCode
    {
        LogOffTime = 130,
        OPEndTime = 200,
        ClaimDaysLimit = 300,
    }


    public enum RuleStepDataType
    {
        STRING = 1,
        BIT = 2,
        DATETIME = 3,
        DECIMAL = 4,
        INT = 5,
    }

    public enum ControllerAccess
    {
        Summary,              //EHR TAB
        PreliminaryBill,      //Bed Transactions View
        BillHeader,           //Bill Header View
        Authorization,        //Authorization,
        PatientInfo,          //Register New Patient, Edit Patient Details, 
        Encounter,            //Admit Patient, 
        Diagnosis,            //Additional Diagnosis View
        ActiveEncounter,      //Active Encounters, Addtional Diagnosis, Unclosed Orders (O/P and ER),
        PatientSearch,        //Encounter Views,
    }

    public enum ActionNameAccess
    {
        PatientSummary,             //EHR TAB
        Index,                      //General, Bed Transactions View, Bill Header View, Encounter Details
        AuthorizationMain,          //AuthorizationMain,
        RegisterPatient,            //Register New Patient, Edit Patient Details
        AdditionalDiagnosis,        //Additional Diagnosis
        ActiveEncounter,            //Active Encounter, Addtional Diagnosis
        PatientSearch,              //Encounter Views
        UnauthorizedView
    }


    public enum ChargesDashBoard
    {
        RoomGrossCharges = 10,
        AncillaryGrossCharges = 1018,
        OutpatientGrossCharges = 1019,
        EmergencyRoomGrossCharges = 1020,
        InpatientGrossRevenuePerPatientDay = 14,
        OutpatientRevenuePerEncounter = 15,
        ERpatientRevenuePerEncounter = 16,
        InpatientEncounters = 17,
        OutpatientEncounters = 1002,
        EREncounters = 1004,
        Admissions = 1015,
        Discharges = 1014,
        ALOS = 22,
        InpatientsADC = 1023,
        NumberofTotalClaimsSubmitted = 24,
        DollarAmountofTotalClaimsSubmitted = 25,
        NumberofTotalInpatientClaimsSubmitted = 26,
        DollarAmountofTotalInpatientClaimsSubmitted = 27,
        NumberofTotalOutpatientClaimsSubmitted = 28,
        DollarAmountoftotalOutpatientClaimsSubmitted = 29,
        NumberofTotalEmergencyRoomClaimsSubmitted = 30,
        DollarAmountoftotalEmergencyRoomClaimsSubmitted = 31,
        AverageDollarAmountofTotalClaims = 32,
        AverageDollarAmountofInpatientClaim = 33,
        AverageDollarAmountofOutpatientClaim = 34,
        AverageDollarAmountofEmergencyRoomClaim = 35,
        NumberofTotalClaimsPaidonRemittance = 36,
        NumberofTotalClaimsDeniedonRemittance = 37,
        ClaimsAcceptancePercentageFirstSubmission = 38,
        PatientDays = 1001,
        PharmacyOrders = 1011,
        LabTests = 1009,
        SurgeryMinutes = 1026,
        PhysicianExams = 1007,
        ManagedCareDiscounts = 1025,
        Writeoffs = 1024,
        PatientCashCollected = 1022,
        SugeryCPT = 1021,
        InsuranceCashCollected = 1016
    }

    public enum OperatingRoomTypes
    {
        Surgery = 1,
        Anesthesia = 2
    }

    public enum LoginTrackingTypes
    {
        UserLogin = 1,
        PatientLogin = 2
    }

    public enum DashboardType
    {
        ExecutiveDashboard = 1,
        SummaryDashboard = 2,
        ClinicalQulaityDashboard = 3,
        FinancialMGTDashboard = 4,
        RevenueMGTDashboard = 5,
        CaseMGTDashboard = 6,
        HumanResourcesDashboard = 7,
        ProjectsDashboard = 8,
        ExecutiveKeyPerformanceDashboard = 9,
        ClinicalCompliance = 10,
        BillScrubber = 11
    }

    public enum ExecutiveDashboardSection1Stat
    {
        Admissions = 101,
        Discharges = 102,
        InpatientDays = 103,
        OutpatientEncounters = 104,
        TotalOperatingBeds = 108,
        OccupancyRate = 109,
        AverageDailyCensus = 144,
        PatientDays = 242,
        AverageLengthofStay = 106,
        AdjustedPatientDays = 105
    }

    public enum ExecutiveDashboardSection5Stat
    {
        NetRevenue = 110,
        SWB = 111,
        OtherDirect = 113,
        OperatingMargin = 114,
        SWBIndirect = 155,
        IndirectCosts = 115,
        EBITDA = 116,
        DeprandAmort = 117,
        Interest = 118,
        NetIncomeLoss = 119,
        SWBPercentageofNetRevenue = 120,
        IndirectPercentageofNetRevenue = 121,
        EBITDAMargin = 122,
        NetIncomeMargin = 162,
        OperatingMarginPercentage = 145,
        NewMarketDevelopmentCosts = 260,
        PaidInterest = 261,
        FacilityRentUtilities = 280,
        MarketingBDCosts = 281,
        NewMarketDevelopmentOtherCosts = 282,
        ExpansionPreOpeningCosts = 610,
        Consumables = 609,
    }

    public enum ExecutiveDashboardSection10Stat
    {
        CashfromOperations = 124,
        ChangesinWorkingCapital = 125,
        OtherAdjustments = 126,
        CapitalExpenditures = 127,
        NetCashChange = 128,
        CashintheBank = 129,
        DaysofTotalExpendituresinCash = 130,
        ARNetDays = 131,
        NetCashflowfromOperations = 283,
        NetCashFlowfromInvesting = 284,
        IssueofDebt = 285,
        IssueofCapitalShare = 286,
        NetCashFlowfromFinancing = 287,
        OpeningCash = 288
    }

    public enum ExecutiveDashboardBalanceSheetStat
    {
        CashAndBank = 289,
        AccountsRecivable = 290,
        OtherReceivables = 291,
        Prepaids = 292,
        CurrentAssets = 293,
        FixedAssetsnet = 294,
        OtherAssets = 295,
        TotalAssets = 296,
        Accruals = 297,
        TradeandOtherPayables = 298,
        CurrentPortionLTD = 299,
        TotalCurrentLiabilities = 300,
        LongTermDebt = 301,
        TotalLiabilities = 302,
        ShareCapital = 303,
        RetainedEarnings = 304,
        TotalEquity = 305,
        TotalEquityLiabilities = 306,
        Prepayments = 600,
        LoansAdvances = 601,
        Inventory = 602,
        Investments = 603,
        RelatedPartyPayable = 604,
        AccrualsDeferredPayments = 605,
        Gratuity = 606,
        LoansLongTerm = 607,
        ProfitLoss = 608,
        DepositRentutilities = 1319,
        Lessaccumulateddepreciation = 1318,
        FixedAssets = 1317
    }

    public enum ExecutiveDashboardAcuteSection1Stat
    {
        Admissions = 101,
        Discharges = 102,
        InpatientDays = 103,
        OutpatientEncounters = 104,
        AdjustedPatientDays = 105,
        AverageLengthofStay = 106,
        AverageDailyCensus = 144,
        CaseMix = 107,
        TotalOperatingBeds = 108,
        OccupancyRate = 109,
    }

    public enum ExecutiveDashboardAcuteSection5Stat
    {
        NetRevenue = 110,
        SWB = 111,
        Supplies = 112,
        OtherDirect = 113,
        OperatingMargin = 114,
        SWBIndirect = 155,
        IndirectCosts = 115,
        EBITDA = 116,
        DeprandAmort = 117,
        Interest = 118,
        NetIncomeLoss = 119,
        SWBPercentageofNetRevenue = 120,
        IndirectPercentageofNetRevenue = 121,
        EBITDAMargin = 122,
        NetIncomeMargin = 162,
        OperatingMarginPercentage = 145
    }

    public enum ExecutiveDashboardAcuteSection10Stat
    {
        CashfromOperations = 124,
        ChangesinWorkingCapital = 125,
        OtherAdjustments = 126,
        CapitalExpenditures = 127,
        NetCashChange = 128,
        CashintheBank = 129,
        DaysofTotalExpendituresinCash = 130,
        ARNetDays = 131,
    }

    public enum OtherStats
    {
        ClinicalPositionsFilled = 132,
        ClinicalPositionsOpen = 133,
        TotalClinicalPositions = 134,
        AdmPositionsFilled = 135,
        AdmPositionsOpen = 136,
        TotalAdmPositions = 137,
        TotalPositions = 138,
        ClicnicalStaffingperPatientDay = 139,
        TotalStaffingperPatientDay = 140,
        AdmissionbyReferralSource = 141,
        NursetoPatientRatio = 142,
        CashCollections = 143,
    }

    public enum Section2Narrations
    {
        Section1 = 1,
        Section2 = 2,
        Section3 = 3,
        Section4 = 4
    }

    public enum Section6Narrations
    {
        Section5 = 5,
        Section6 = 6,
        Section7 = 7,
        Section8 = 8,
        Section9 = 9
    }

    public enum Section11Narrations
    {
        Section10 = 10,
        Section11 = 11,
        Section12 = 12,
    }


    public enum ExecutiveDashboardGraphs
    {
        Section3G1 = 144,
        Section3G2 = 156,
        Section4G1 = 109,
        Section4G2 = 104,
        Section7G1 = 120,
        Section7G2 = 110,
        Section8G1 = 121,
        Section8G2 = 122,
        Section9G1 = 159,
        Section9G2 = 141,
        Section12G1 = 124,
    }

    public enum DashboardProjectType
    {
        Strategic = 1,
        Operational = 2,
        Financial = 3,
        Individual = 4,
    }
    public enum ExternalDashboardColor
    {
        Green = 1,
        Yellow = 2,
        Red = 3,
    }

    public enum Day
    {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
    }

    public enum CalenderViewType
    {
        Day,
        Week,
        Month
    }

    public enum SchedularNotificationTypes
    {
        fromschedulartopatientonnewbooking = 1,
        patientreminderbefore3days = 2,
        patientreminderbefore1day = 3,
        patientReminderbeforeonappointmentday = 4,
        everymorningnotificationtophysician = 5,
        appointmenttypessubtemplate = 6,
        appointmentapprovaltophysician = 7,
        physicianapporovelemail = 8,
        physiciancancelappointment = 9,
        appointmentapprovedbyphysician = 10,
        preapprovedappointmentconfirm = 20,
        preapprovedappointmentcancel = 30,
    }

    public enum XmlReportingType
    {
        BatchReport = 1,
        XmlReportingInitialClaimErrorReport = 2
    }

    public enum ModulesAccessible
    {
        EhrView = 1,
        TransactionsView = 2,
        DiagnosisView = 3,
        BillHeaderView = 4,
        AuthorizationView = 5,
        PatientInfoView = 6,
        AdmitPatientView = 7,
        StartOpView = 8,
        DischargePatientView = 9,
        EndOpView = 10
    }

    public enum MimeTypes
    {
        [Description("application/postscript")]
        ai,
        [Description("audio/x-aiff")]
        aif,
        [Description("audio/x-aiff")]
        aifc,
        [Description("audio/x-aiff")]
        aiff,
        [Description("text/plain")]
        asc,
        [Description("application/atom+xml")]
        atom,
        [Description("audio/basic")]
        au,
        [Description("video/x-msvideo")]
        avi,
        [Description("application/x-bcpio")]
        bcpio,
        [Description("application/octet-stream")]
        bin,
        [Description("image/bmp")]
        bmp,
        [Description("application/x-netcdf")]
        cdf,
        [Description("image/cgm")]
        cgm,
        [Description("application/x-cpio")]
        cpio,
        [Description("application/mac-compactpro")]
        cpt,
        [Description("application/x-csh")]
        csh,
        [Description("text/css")]
        css,
        [Description("application/x-director")]
        dcr,
        [Description("video/x-dv")]
        dif,
        [Description("application/x-director")]
        dir,
        [Description("image/vnd.djvu")]
        djv,
        [Description("image/vnd.djvu")]
        djvu,
        [Description("application/octet-stream")]
        dll,
        [Description("application/octet-stream")]
        dmg,
        [Description("application/octet-stream")]
        dms,
        [Description("application/msword")]
        doc,
        [Description("application/msword")]
        docx,
        [Description("application/xml-dtd")]
        dtd,
        [Description("video/x-dv")]
        dv,
        [Description("application/x-dvi")]
        dvi,
        [Description("application/x-director")]
        dxr,
        [Description("application/postscript")]
        eps,
        [Description("text/x-setext")]
        etx,
        [Description("application/octet-stream")]
        exe,
        [Description("application/andrew-inset")]
        ez,
        [Description("image/gif")]
        gif,
        [Description("application/srgs")]
        gram,
        [Description("application/srgs+xml")]
        grxml,
        [Description("application/x-gtar")]
        gtar,
        [Description("application/x-hdf")]
        hdf,
        [Description("application/mac-binhex40")]
        hqx,
        [Description("text/html")]
        htm,
        [Description("text/html")]
        html,
        [Description("x-conference/x-cooltalk")]
        ice,
        [Description("image/x-icon")]
        ico,
        [Description("text/calendar")]
        ics,
        [Description("image/ief")]
        ief,
        [Description("text/calendar")]
        ifb,
        [Description("model/iges")]
        iges,
        [Description("model/iges")]
        igs,
        [Description("application/x-java-jnlp-file")]
        jnlp,
        [Description("image/jp2")]
        jp2,
        [Description("image/jpeg")]
        jpe,
        [Description("image/jpeg")]
        jpeg,
        [Description("image/jpeg")]
        jpg,
        [Description("application/x-javascript")]
        js,
        [Description("audio/midi")]
        kar,
        [Description("application/x-latex")]
        latex,
        [Description("application/octet-stream")]
        lha,
        [Description("application/octet-stream")]
        lzh,
        [Description("audio/x-mpegurl")]
        m3u,
        [Description("audio/mp4a-latm")]
        m4a,
        [Description("audio/mp4a-latm")]
        m4b,
        [Description("audio/mp4a-latm")]
        m4p,
        [Description("video/vnd.mpegurl")]
        m4u,
        [Description("video/x-m4v")]
        m4v,
        [Description("image/x-macpaint")]
        mac,
        [Description("application/x-troff-man")]
        man,
        [Description("application/mathml+xml")]
        mathml,
        [Description("application/x-troff-me")]
        me,
        [Description("model/mesh")]
        mesh,
        [Description("audio/midi")]
        mid,
        [Description("audio/midi")]
        midi,
        [Description("application/vnd.mif")]
        mif,
        [Description("video/quicktime")]
        mov,
        [Description("video/x-sgi-movie")]
        movie,
        [Description("audio/mpeg")]
        mp2,
        [Description("audio/mpeg")]
        mp3,
        [Description("video/mp4")]
        mp4,
        [Description("video/mpeg")]
        mpe,
        [Description("video/mpeg")]
        mpeg,
        [Description("video/mpeg")]
        mpg,
        [Description("audio/mpeg")]
        mpga,
        [Description("application/x-troff-ms")]
        ms,
        [Description("model/mesh")]
        msh,
        [Description("video/vnd.mpegurl")]
        mxu,
        [Description("application/x-netcdf")]
        nc,
        [Description("application/oda")]
        oda,
        [Description("application/ogg")]
        ogg,
        [Description("image/x-portable-bitmap")]
        pbm,
        [Description("image/pict")]
        pct,
        [Description("chemical/x-pdb")]
        pdb,
        [Description("application/pdf")]
        pdf,
        [Description("image/x-portable-graymap")]
        pgm,
        [Description("application/x-chess-pgn")]
        pgn,
        [Description("image/pict")]
        pic,
        [Description("image/pict")]
        pict,
        [Description("image/png")]
        png,
        [Description("image/x-portable-anymap")]
        pnm,
        [Description("image/x-macpaint")]
        pnt,
        [Description("image/x-macpaint")]
        pntg,
        [Description("image/x-portable-pixmap")]
        ppm,
        [Description("application/vnd.ms-powerpoint")]
        ppt,
        [Description("application/postscript")]
        ps,
        [Description("video/quicktime")]
        qt,
        [Description("image/x-quicktime")]
        qti,
        [Description("image/x-quicktime")]
        qtif,
        [Description("audio/x-pn-realaudio")]
        ra,
        [Description("audio/x-pn-realaudio")]
        ram,
        [Description("image/x-cmu-raster")]
        ras,
        [Description("application/rdf+xml")]
        rdf,
        [Description("image/x-rgb")]
        rgb,
        [Description("application/vnd.rn-realmedia")]
        rm,
        [Description("application/x-troff")]
        roff,
        [Description("text/rtf")]
        rtf,
        [Description("text/richtext")]
        rtx,
        [Description("text/sgml")]
        sgm,
        [Description("text/sgml")]
        sgml,
        [Description("application/x-sh")]
        sh,
        [Description("application/x-shar")]
        shar,
        [Description("model/mesh")]
        silo,
        [Description("application/x-stuffit")]
        sit,
        [Description("application/x-koan")]
        skd,
        [Description("application/x-koan")]
        skm,
        [Description("application/x-koan")]
        skp,
        [Description("application/x-koan")]
        skt,
        [Description("application/smil")]
        smi,
        [Description("application/smil")]
        smil,
        [Description("audio/basic")]
        snd,
        [Description("application/octet-stream")]
        so,
        [Description("application/x-futuresplash")]
        spl,
        [Description("application/x-wais-source")]
        src,
        [Description("application/x-sv4cpio")]
        sv4cpio,
        [Description("application/x-sv4crc")]
        sv4crc,
        [Description("image/svg+xml")]
        svg,
        [Description("application/x-shockwave-flash")]
        swf,
        [Description("application/x-troff")]
        t,
        [Description("application/x-tar")]
        tar,
        [Description("application/x-tcl")]
        tcl,
        [Description("application/x-tex")]
        tex,
        [Description("application/x-texinfo")]
        texi,
        [Description("application/x-texinfo")]
        texinfo,
        [Description("image/tiff")]
        tif,
        [Description("image/tiff")]
        tiff,
        [Description("application/x-troff")]
        tr,
        [Description("text/tab-separated-values")]
        tsv,
        [Description("text/plain")]
        txt,
        [Description("application/x-ustar")]
        ustar,
        [Description("application/x-cdlink")]
        vcd,
        [Description("model/vrml")]
        vrml,
        [Description("application/voicexml+xml")]
        vxml,
        [Description("audio/x-wav")]
        wav,
        [Description("image/vnd.wap.wbmp")]
        wbmp,
        [Description("application/vnd.wap.wbxml")]
        wbmxl,
        [Description("text/vnd.wap.wml")]
        wml,
        [Description("application/vnd.wap.wmlc")]
        wmlc,
        [Description("text/vnd.wap.wmlscript")]
        wmls,
        [Description("application/vnd.wap.wmlscriptc")]
        wmlsc,
        [Description("model/vrml")]
        wrl,
        [Description("image/x-xbitmap")]
        xbm,
        [Description("application/xhtml+xml")]
        xht,
        [Description("application/xhtml+xml")]
        xhtml,
        [Description("application/vnd.ms-excel")]
        xls,
        [Description("application/vnd.ms-excel")]
        xlsx,
        [Description("application/xml")]
        xml,
        [Description("image/x-xpixmap")]
        xpm,
        [Description("application/xml")]
        xsl,
        [Description("application/xslt+xml")]
        xslt,
        [Description("application/vnd.mozilla.xul+xml")]
        xul,
        [Description("image/x-xwindowdump")]
        xwd,
        [Description("chemical/x-xyz")]
        xyz,
        [Description("application/zip")]
        zip
    }

    public enum JsonResultsArray
    {
        TimeSlotsData,
        UserDto,
        BookedAppointments,
        Defaults,
        ClinicanDetail,
        CliniciansData,
        Cities,
        PatientSearchResults,
        AppointmentWeeklyScheduledData,
        PatientInfo,
        ManagedCareResult,
        PolicyResult,
        PlanResult,
        FavoriteResult,
        Claims,
        Tabs,
        OpenOrders,
        OrderActivities,
        MedicalHistory,
        GlobalCategory,
        GlobalCode,
        Allergy,
        Vitals,
        MedicalNotes,
        MedicalRecord,
        DiagnosisCodes,
        FavoriteDiagnosis,
        Diagnosis
    }
}