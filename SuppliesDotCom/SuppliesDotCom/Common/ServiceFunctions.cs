using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace SuppliesDotCom.Common
{
    public class ServiceFunctions
    {
        private static readonly string ServiceUrl = CommonConfig.ServiceUrl;
        public static readonly string GetAllFacilityList = ServiceUrl + "GetFacilities";
        public static readonly string GetAllPhysicianList = ServiceUrl + "GetPhysician";
        public static readonly string GetUser = ServiceUrl + "GetUser";//Ashwani
        public static readonly string GetOfflineTime = ServiceUrl + "GetOfflineTime";//Ashwani
        public static readonly string GetUserByUserName = ServiceUrl + "GetUserByUserName";//Ashwani


        public static readonly string GetUserById = ServiceUrl + "GetUserById";//Ashwani 
        public static readonly string GetAllUsers = ServiceUrl + "GetAllUsers";//Ashwani AddUser

        public static readonly string SaveUser = ServiceUrl + "AddUser";//Ashwani AddUser
        public static readonly string GetRoleById = ServiceUrl + "GetRoleById";//Ashwani
        public static readonly string GetAllRoles = ServiceUrl + "GetAllRoles";//Ashwani
        public static readonly string AddRole = ServiceUrl + "AddRole";//Ashwani
        public static readonly string GetAllScreensList = ServiceUrl + "GetAllScreensList";//Ashwani
        public static readonly string GetScreenListByGroupId = ServiceUrl + "GetScreenListByGroupId";//Ashwani
        public static readonly string GetScreenDetailById = ServiceUrl + "GetScreenDetailById";//Ashwani
        public static readonly string AddScreen = ServiceUrl + "AddScreen";//Ashwani
        public static readonly string GetAllTabs = ServiceUrl + "GetAllTabs";//Ashwani
        public static readonly string GetTabByTabId = ServiceUrl + "GetTabByTabID";//Ashwani
        public static readonly string AddUpdateTab = ServiceUrl + "AddUpdateTab";//Ashwani

        public static readonly string GetCountryInfoByCountryID = ServiceUrl + "GetCountryInfoByCountryID";//Ashwani
        public static readonly string GetGlobalCodeCategories = ServiceUrl + "GetGlobalCodeCategories";
        public static readonly string GetCountries = ServiceUrl + "GetCountries";
        public static readonly string GetGlobalCodeCategoriesRange = ServiceUrl + "GetGlobalCodeCategoriesRange";

        public static readonly string SaveFacility = ServiceUrl + "AddFacility";
        public static readonly string SavePhysician = ServiceUrl + "AddPhysician";
        public static readonly string AddGlobalCodeCategory = ServiceUrl + "AddGlobalCodeCategory";

        public static readonly string DeleteFacility = ServiceUrl + "DeleteFacility";
        public static readonly string DeletePhysician = ServiceUrl + "DeletePhysician";

        public static readonly string GetFacilityById = ServiceUrl + "GetFacilityById";
        public static readonly string GetPhysicianById = ServiceUrl + "GetPhysicianById";


        public static readonly string GetServiceCodes = ServiceUrl + "GetServiceCodes";
        public static readonly string SaveServiceCode = ServiceUrl + "AddServiceCode";
        public static readonly string DeleteServiceCode = ServiceUrl + "DeleteServiceCode";
        public static readonly string GetServiceCodeById = ServiceUrl + "GetServiceCodeById";
        public static readonly string GetGlobalCodesById = ServiceUrl + "GetGlobalCodesById";

        public static readonly string GetFacilityGlobalCodeCategories = ServiceUrl + "GetFacilityGlobalCodeCategories";

        public static readonly string GetInsuranceCompanies = ServiceUrl + "GetInsuranceCompanies";
        public static readonly string AddInsuranceCompany = ServiceUrl + "AddInsuranceCompany";
        public static readonly string DeleteInsuranceCompany = ServiceUrl + "DeleteInsuranceCompany";
        public static readonly string GetInsuranceCompanyById = ServiceUrl + "GetInsuranceCompanyById";

        public static readonly string GetInsurancePlans = ServiceUrl + "GetInsurancePlans";
        public static readonly string AddInsurancePlans = ServiceUrl + "AddInsurancePlans";
        public static readonly string DeleteInsurancePlan = ServiceUrl + "DeleteInsurancePlan";
        public static readonly string GetInsurancePlanById = ServiceUrl + "GetInsurancePlanById";

        public static readonly string GetInsurancePolices = ServiceUrl + "GetInsurancePolices";
        public static readonly string AddInsurancePolices = ServiceUrl + "AddInsurancePolices";
        public static readonly string DeleteInsurancePolicy = ServiceUrl + "DeleteInsurancePolicy";
        public static readonly string GetInsurancePolicyById = ServiceUrl + "GetInsurancePolicyById";
        public static readonly string GetGlobalCodesByCateGoryId = ServiceUrl + "GetGlobalCodesByCateGoryId";

        public static readonly string AddPatientRelationAddress = ServiceUrl + "AddPatientRelationAddress";
        public static readonly string GetPatientAddressRelation = ServiceUrl + "GetPatientAddressRelation";//GetPatientAddressRelation
        public static readonly string AddPatientInsurance = ServiceUrl + "AddPatientInsurance";
        
        /*
         * Owner: Amit Jain
         * On: 25092014
         * Purpose: Following are the methods used in Encounter Order */
        //Additions start here
        public static readonly string GetPhysicianOrderDetailById = ServiceUrl + "GetPhysicianOrderDetailById";
        public static readonly string GetPhysicianOrders = ServiceUrl + "GetPhysicianOrders";
        //Additions end here

        public static readonly string GetPatientSearchResult = ServiceUrl + "GetPatientSearchResult";//Shashank
        public static readonly string GetEncounterList = ServiceUrl + "GetEncounterList";
        public static readonly string GetPatientInfoById = ServiceUrl + "GetPatientInfoById";
        /*
         * Owner: Amit Jain
         * On: 25092014
         * Purpose: Following are the methods used in Encounter Order */
        //Additions start here
        public static readonly string GetStateList = ServiceUrl + "GetStateList";
        public static readonly string GetCityList = ServiceUrl + "GetCityList";
        public static readonly string AddPhysicianOrder = ServiceUrl + "AddPhysicianOrder";
        //Additions end here


        public static readonly string AddLoginTrackingData = ServiceUrl + "AddLoginTrackingData";
        public static readonly string GetMostRecentLoginTrackingData = ServiceUrl + "GetMostRecentLoginTrackingData";


        public static readonly string GetAllBedRateCardList = ServiceUrl + "GetBedRateCardsList";//GetBedRateCardsList
        public static readonly string SaveBedRateCard = ServiceUrl + "SaveBedRateCard";
        public static readonly string GetBedRateCardById = ServiceUrl + "GetBedRateCardById";
        public static readonly string DeleteBedRateCard = ServiceUrl + "DeleteBedRateCard";

        public static readonly string SavePatientInfo = ServiceUrl + "AddPatientInfo";
        public static readonly string DeletePatientInfo = ServiceUrl + "DeletePatientInfo";
        public static readonly string GetPatientInsurance = ServiceUrl + "GetPatientInsurance";
        public static readonly string GetPatientAddress = ServiceUrl + "GetPatientAddress";
        public static readonly string GetPatientPhone = ServiceUrl + "GetPatientPhone";
        public static readonly string GetPatientRelationship = ServiceUrl + "GetPatientRelationship";
        public static readonly string GetPatientRelationShipAddress = ServiceUrl + "GetPatientRelationShipAddress";
        public static readonly string GetPatientRelationAddressById = ServiceUrl + "GetPatientRelationAddressById";
        public static readonly string GetDocuments = ServiceUrl + "GetDocuments";
        public static readonly string AddPatientPhone = ServiceUrl + "AddPatientPhone";
        public static readonly string GetPatientPhoneById = ServiceUrl + "GetPatientPhoneById";
        
        /*
         * Owner: Amit Joshi
         * On: 27092014
         * Purpose: Following are the methods used in HCPCSCodes */
        //Additions start here
        public static readonly string GetHCPCSCodes = ServiceUrl + "GetHCPCSCodes";
        public static readonly string AddHCPCSCodes = ServiceUrl + "AddHCPCSCodes";
        public static readonly string DeleteHCPCSCodes = ServiceUrl + "DeleteHCPCSCodes";
        public static readonly string GetHCPCSCodesById = ServiceUrl + "GetHCPCSCodesById";

        /*
         * Owner: Amit Joshi
         * On: 27092014
         * Purpose: Following are the methods used in DRGCodes */
        //Additions start here
        public static readonly string GetDRGCodes = ServiceUrl + "GetDRGCodes";
        public static readonly string AddDRGCodes = ServiceUrl + "AddDRGCodes";
        public static readonly string DeleteDRGCodes = ServiceUrl + "DeleteDRGCodes";
        public static readonly string GetDRGCodesById = ServiceUrl + "GetDRGCodesById";


        /*
         * Owner: Amit Joshi
         * On: 27092014
         * Purpose: Following are the methods used in CPTCodes */
        //Additions start here
        public static readonly string GetCPTCodes = ServiceUrl + "GetCPTCodes";
        public static readonly string AddCPTCodes = ServiceUrl + "AddCPTCodes";
        public static readonly string DeleteCPTCodes = ServiceUrl + "DeleteCPTCodes";
        public static readonly string GetCPTCodesById = ServiceUrl + "GetCPTCodesById";

        /*
        * Owner: Amit Joshi
        * On: 27092014
        * Purpose: Following are the methods used in USCLSCodes */
        //Additions start here
        public static readonly string GetUSCLSCodes = ServiceUrl + "GetUSCLSCodes";
        public static readonly string AddUSCLSCodes = ServiceUrl + "AddUSCLSCodes";
        public static readonly string GetUSCLSCodesById = ServiceUrl + "GetUSCLSCodesById";
    }
}