// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BaseBal.cs" company="Spadez">
//   OmniHealth Care
// </copyright>
// <summary>
//   The queryable extensions.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using SuppliesDotCom.Bal.Mapper;
using Newtonsoft.Json;
using Omu.ValueInjecter;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Diagnostics;
    using System.Globalization;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Runtime.Remoting.Messaging;

    using SuppliesDotCom.Common.Common;
    using SuppliesDotCom.Model;
    using SuppliesDotCom.Model.CustomModel;
    using SuppliesDotCom.Repository.UOW;
    using System.Threading.Tasks;

    /// <summary>
    /// The queryable extensions.
    /// </summary>
    public static class QueryableExtensions
    {
        //http://www.annew.com.au/net/left-joins-in-ef/

        public static IQueryable<TResult> LeftJoin<TOuter, TInner, TKey, TResult>(
            this IQueryable<TOuter> outer,
            IQueryable<TInner> inner,
            Expression<Func<TOuter, TKey>> outerKeySelector,
            Expression<Func<TInner, TKey>> innerKeySelector,
            Expression<Func<JoinResult<TOuter, TInner>, TResult>> resultSelector)
        {
            var result = outer
                .GroupJoin(inner, outerKeySelector, innerKeySelector, (outer1, inners) => new { outer1, inners = inners.DefaultIfEmpty() })
                .SelectMany(row => row.inners, (row, inner1) => new JoinResult<TOuter, TInner> { Outer = row.outer1, Inner = inner1 })
                .Select(resultSelector);

            return result;
        }

        /// <summary>
        /// The join result.
        /// </summary>
        /// <typeparam name="TOuter">
        /// </typeparam>
        /// <typeparam name="TInner">
        /// </typeparam>
        public class JoinResult<TOuter, TInner>
        {
            public TOuter Outer { get; set; }
            public TInner Inner { get; set; }
        }
    }

    /// <summary>
    /// The base bal.
    /// </summary>
    public class BaseBal : IDisposable
    {
        public string TableNumber { get; set; }

        public string TableDescription { get; set; }

        public string CptTableNumber { get; set; }

        public string ServiceCodeTableNumber { get; set; }

        public string DrgTableNumber { get; set; }

        public string DrugTableNumber { get; set; }

        public string HcpcsTableNumber { get; set; }

        public string DiagnosisTableNumber { get; set; }

        public string BillEditRuleTableNumber { get; set; }

        public DateTime? CodeEffectiveFrom { get; set; }

        public DateTime? CodeEffectiveTill { get; set; }

        public BaseBal(string billEditRuleTableNumber)
        {
            if (!string.IsNullOrEmpty(billEditRuleTableNumber)) BillEditRuleTableNumber = billEditRuleTableNumber;
        }

        public BaseBal()
        {

        }

        public BaseBal(string cptTableNumber, string serviceCodeTableNumber, string drgTableNumber, string drugTableNumber, string hcpcsTableNumber,
            string diagnosisTableNumber)
        {
            if (!string.IsNullOrEmpty(cptTableNumber)) CptTableNumber = cptTableNumber;

            if (!string.IsNullOrEmpty(serviceCodeTableNumber)) ServiceCodeTableNumber = serviceCodeTableNumber;

            if (!string.IsNullOrEmpty(drgTableNumber)) DrgTableNumber = drgTableNumber;

            if (!string.IsNullOrEmpty(drugTableNumber)) DrugTableNumber = drugTableNumber;

            if (!string.IsNullOrEmpty(hcpcsTableNumber)) HcpcsTableNumber = hcpcsTableNumber;

            if (!string.IsNullOrEmpty(diagnosisTableNumber)) DiagnosisTableNumber = diagnosisTableNumber;
        }

        private bool _disposed;

        public readonly UnitOfWork UnitOfWork = new UnitOfWork();

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    UnitOfWork.Dispose();
                }
            }
            _disposed = true;
        }

        /// <summary>
        /// Gets the facility name by number.
        /// </summary>
        /// <param name="number">The number.</param>
        /// <returns></returns>
        public string GetFacilityNameByNumber(string number)
        {
            using (var facilityRep = UnitOfWork.FacilityRepository)
            {
                var facility = facilityRep.Where(a => a.FacilityNumber.Equals(number)).FirstOrDefault();
                return (facility != null) ? facility.FacilityName : string.Empty;
            }
        }

        public Facility GetFacilityByFacilityId(int facilityId)
        {
            var facility = new Facility();
            var fid = Convert.ToInt32(facilityId);
            if (facilityId > 0)
            {
                using (var rep = UnitOfWork.FacilityRepository)
                {
                    facility = rep.Where(f => f.FacilityId == fid).FirstOrDefault();
                }
            }
            return facility;
        }

        public string GetFacilityNameByFacilityId(int facilityId)
        {
            Facility facility = null;
            if (facilityId > 0)
            {
                using (var rep = UnitOfWork.FacilityRepository) facility = rep.Where(f => f.FacilityId == facilityId).FirstOrDefault();
            }
            return facility != null ? facility.FacilityName : string.Empty;
        }

        public string GetRoleNameByRoleId(int roleId)
        {
            var roleName = string.Empty;
            if (roleId > 0)
            {
                using (var rep = UnitOfWork.RoleRepository) roleName = rep.Where(r => r.RoleID == roleId).Select(role => role.RoleName).FirstOrDefault();
            }
            return roleName;
        }

        public string GetNameByCorporateId(int id)
        {
            using (var rep = UnitOfWork.CorporateRepository)
            {
                var corp = rep.Where(c => c.CorporateID == id).FirstOrDefault();
                return corp != null ? corp.CorporateName : string.Empty;
            }
        }

        public int GetAgeByDate(DateTime dateValue)
        {
            var age = DateTime.Now - dateValue;
            return (int)(age.Days / 365.25);
        }

        /// <summary>
        /// Gets the global category name by identifier.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public string GetGlobalCategoryNameById(string categoryValue, string facilityId = "")
        {
            if (!string.IsNullOrEmpty(categoryValue))
            {
                using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
                {
                    var category = rep.Where(g => g.GlobalCodeCategoryValue.Equals(categoryValue) && g.IsDeleted.HasValue ? !g.IsDeleted.Value : false && (string.IsNullOrEmpty(facilityId) || g.FacilityNumber.Equals(facilityId))).FirstOrDefault();
                    return category != null ? category.GlobalCodeCategoryName : string.Empty;
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the name by global code identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public string GetNameByGlobalCodeId(int id)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var gl = rep.Where(g => g.GlobalCodeID == id).FirstOrDefault();
                return gl != null ? gl.GlobalCodeName : string.Empty;
            }
        }

        /// <summary>
        /// Gets the name by global code value.
        /// </summary>
        /// <param name="codeValue">The code value.</param>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public string GetNameByGlobalCodeValue(string codeValue, string categoryValue, string fId = "")
        {
            if (!string.IsNullOrEmpty(codeValue))
            {
                using (var rep = UnitOfWork.GlobalCodeRepository)
                {
                    var gl =
                        rep.Where(
                            g => g.GlobalCodeValue.Equals(codeValue) && !g.IsDeleted.Value && g.GlobalCodeCategoryValue.Equals(categoryValue) && (string.IsNullOrEmpty(fId) || g.FacilityNumber.Equals(fId)))
                            .FirstOrDefault();
                    return gl != null ? gl.GlobalCodeName : string.Empty;
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the name by global code value.
        /// </summary>
        /// <param name="codeValue">The code value.</param>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public string GetNameByGlobalCodeValueAndSubCategory1(string codeValue, string categoryValue, string subCategory1)
        {
            if (!string.IsNullOrEmpty(codeValue))
            {
                using (var rep = UnitOfWork.GlobalCodeRepository)
                {
                    var gl =
                        rep.Where(
                            g =>
                            g.GlobalCodeValue.Equals(codeValue) && g.GlobalCodeCategoryValue.Equals(categoryValue)
                            && g.ExternalValue1.Equals(subCategory1)).FirstOrDefault();
                    return gl != null ? gl.GlobalCodeName : string.Empty;
                }
            }
            return string.Empty;
        }


        /// <summary>
        /// addded by shashnak to get the user name
        /// </summary>
        /// <param name="UserID">The user identifier.</param>
        /// <returns></returns>
        public string GetNameByUserId(int? UserID)
        {
            try
            {
                using (var usersRep = UnitOfWork.UsersRepository)
                {
                    var usersModel = usersRep.Where(x => x.UserID == UserID && x.IsDeleted == false).FirstOrDefault();
                    return usersModel != null ? usersModel.FirstName + " " + usersModel.LastName : string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public GeneralCodesCustomModel GetSelectedCodeParent(string code, string Type)
        //{
        //    var finalList = new GeneralCodesCustomModel();
        //    using (var bal = new GlobalCodeBal())
        //    {
        //        var type = (OrderType)Enum.Parse(typeof(OrderType), Type);
        //        switch (type)
        //        {
        //            case OrderType.CPT:
        //                using (var cptBal = new CPTCodesBal(CptTableNumber))
        //                {
        //                    var cptList = cptBal.GetCPTCodesByCode(code);
        //                    var cptCoderange = cptList.CTPCodeRangeValue;
        //                    if (cptCoderange != null)
        //                    {
        //                        var cptCoderangeInt = Convert.ToInt32(cptCoderange);
        //                        var cptCategory = bal.GetGeneralGlobalCodeByRangeVal(cptCoderangeInt, Type);
        //                        return cptCategory;
        //                    }
        //                }
        //                break;
        //            case OrderType.HCPCS:
        //                using (var hcpcsBal = new HCPCSCodesBal(HcpcsTableNumber))
        //                {
        //                    var hcpcsObj = hcpcsBal.GetFilteredHCPCSCodes(code);
        //                    if (hcpcsObj.Any())
        //                    {
        //                        var generalCodesCustomModel = new GeneralCodesCustomModel()
        //                        {
        //                            GlobalCodeCategoryName = "HCPCS Codes",
        //                            GlobalCodeCategoryId = "11200",
        //                            GlobalCodeName = "NA",
        //                            GlobalCodeId = 9090
        //                        };
        //                        return generalCodesCustomModel;
        //                    }
        //                }
        //                break;
        //            case OrderType.DRUG:
        //                using (var drugBal = new DrugBal(DrugTableNumber))
        //                {
        //                    var drugObj = drugBal.GetCurrentDrugByCode(code);
        //                    var drugBrandId = drugObj.BrandCode;
        //                    if (drugBrandId != null)
        //                    {
        //                        var drugBrandIdInt = Convert.ToInt32(drugBrandId);
        //                        var category = bal.GetGeneralGlobalCodeByRangeVal(drugBrandIdInt, Type);
        //                        return category;
        //                    }
        //                }
        //                break;
        //        }
        //    }



        //    //if (finalList.Count > 0)
        //    //{
        //    //    code = code.ToLower().Trim();
        //    //    finalList = finalList.Where(f => !string.IsNullOrEmpty(f.Code) && f.Code.ToLower().Contains(code)).ToList();
        //    //}
        //    return finalList;
        //}

        public List<string> GetColumnsByTableName(string tableName)
        {
            var list = new List<string>();
            var entity = (TableNames)Enum.Parse(typeof(TableNames), tableName);
            switch (entity)
            {
                case TableNames.Authorization:
                    list = typeof(Authorization).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.Corporate:
                    list = typeof(Corporate).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.Drug:
                    list = typeof(Drug).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.Facility:
                    list = typeof(Facility).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.HCPCSCodes:
                    list = typeof(HCPCSCodes).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.PatientInfo:
                    list = typeof(PatientInfo).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.RuleMaster:
                    list = typeof(RuleMaster).GetProperties().Select(i => i.Name).ToList();
                    break;
                case TableNames.PatientInsurance:
                    list = typeof(PatientInsurance).GetProperties().Select(i => i.Name).ToList();
                    break;
                default:
                    break;
            }
            return list;
        }

        public string GetKeyColmnNameByTableName(string tableName)
        {
            var keyColumn = string.Empty;
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var gc = rep.Where(a => a.GlobalCodeName.Equals(tableName)).FirstOrDefault();
                keyColumn = gc != null ? gc.ExternalValue1 : string.Empty;
            }
            return keyColumn;
        }



        /// <summary>
        /// Gets the global code by global code category identifier global code value.
        /// </summary>
        /// <param name="gcCategoryValue">The global code category value.</param>
        /// <param name="gcvalue">The global codevalue.</param>
        /// <returns></returns>
        public GlobalCodes GetGlobalCodeByCategoryAndCodeValue(string gcCategoryValue, string gcvalue)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode =
                    gcRep.Where(
                        s =>
                        s.IsDeleted == false && s.GlobalCodeCategoryValue.Equals(gcCategoryValue)
                        && s.GlobalCodeValue.Equals(gcvalue)).FirstOrDefault();
                return globalCode ?? new GlobalCodes();
            }
        }

        /// <summary>
        /// Gets the table strutureby table identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetTableStruturebyTableId(string id)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var tableNameCategoryvalue = Convert.ToInt32(GlobalCodeCategoryValue.Column).ToString();
                var globalCodelist =
                    gcRep.Where(
                        s =>
                        s.IsDeleted == false && s.GlobalCodeCategoryValue.Equals(tableNameCategoryvalue)
                        && s.ExternalValue1.Equals(id) && s.IsActive).ToList();
                return globalCodelist;
            }
        }

        /// <summary>
        /// Gets the name of the column data type by table name column.
        /// </summary>
        /// <param name="tableName">Name of the table.</param>
        /// <param name="columnName">Name of the column.</param>
        /// <returns></returns>
        public string GetColumnDataTypeByTableNameColumnName(string tableName, string columnName)
        {
            var list = string.Empty;
            var entity = (TableNames)Enum.Parse(typeof(TableNames), tableName);
            switch (entity)
            {
                case TableNames.Authorization:
                    var authorizationval =
                        typeof(Authorization).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (authorizationval != null)
                        list = authorizationval.PropertyType.GenericTypeArguments.Length > 0
                                   ? authorizationval.PropertyType.GenericTypeArguments[0].Name
                                   : authorizationval.PropertyType.Name;
                    break;
                case TableNames.Corporate:
                    var corporateVal = typeof(Corporate).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (corporateVal != null)
                        list = corporateVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? corporateVal.PropertyType.GenericTypeArguments[0].Name
                                   : corporateVal.PropertyType.Name;
                    break;
                case TableNames.Drug:
                    var DrugVal = typeof(Drug).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (DrugVal != null)
                        list = DrugVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? DrugVal.PropertyType.GenericTypeArguments[0].Name
                                   : DrugVal.PropertyType.Name;
                    break;
                case TableNames.Facility:
                    var FacilityVal = typeof(Facility).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (FacilityVal != null)
                        list = FacilityVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? FacilityVal.PropertyType.GenericTypeArguments[0].Name
                                   : FacilityVal.PropertyType.Name;
                    break;
                case TableNames.HCPCSCodes:
                    var HCPCSCodesVal = typeof(HCPCSCodes).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (HCPCSCodesVal != null)
                        list = HCPCSCodesVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? HCPCSCodesVal.PropertyType.GenericTypeArguments[0].Name
                                   : HCPCSCodesVal.PropertyType.Name;
                    break;
                case TableNames.PatientInfo:
                    var PatientInfoVal = typeof(PatientInfo).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (PatientInfoVal != null)
                        list = PatientInfoVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? PatientInfoVal.PropertyType.GenericTypeArguments[0].Name
                                   : PatientInfoVal.PropertyType.Name;
                    break;
                case TableNames.RuleMaster:
                    var RuleMasterVal = typeof(RuleMaster).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (RuleMasterVal != null)
                        list = RuleMasterVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? RuleMasterVal.PropertyType.GenericTypeArguments[0].Name
                                   : RuleMasterVal.PropertyType.Name;
                    break;
                case TableNames.PatientInsurance:
                    var PatientInsuranceVal =
                        typeof(PatientInsurance).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (PatientInsuranceVal != null)
                        list = PatientInsuranceVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? PatientInsuranceVal.PropertyType.GenericTypeArguments[0].Name
                                   : PatientInsuranceVal.PropertyType.Name;
                    break;
                case TableNames.CPTCodes:
                    var CPTCodesVal = typeof(CPTCodes).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (CPTCodesVal != null) //list = CPTCodesVal.PropertyType.GenericTypeArguments[0].Name;
                        list = CPTCodesVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? CPTCodesVal.PropertyType.GenericTypeArguments[0].Name
                                   : CPTCodesVal.PropertyType.Name;
                    break;
                case TableNames.DRGCodes:
                    var DRGCodesVal = typeof(DRGCodes).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (DRGCodesVal != null)
                        list = DRGCodesVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? DRGCodesVal.PropertyType.GenericTypeArguments[0].Name
                                   : DRGCodesVal.PropertyType.Name;
                    break;
                case TableNames.ServiceCode:
                    var ServiceCodeVal = typeof(ServiceCode).GetProperties().FirstOrDefault(i => i.Name == columnName);
                    if (ServiceCodeVal != null)
                        list = ServiceCodeVal.PropertyType.GenericTypeArguments.Length > 0
                                   ? ServiceCodeVal.PropertyType.GenericTypeArguments[0].Name
                                   : ServiceCodeVal.PropertyType.Name;
                    break;
                default:
                    break;
            }
            return list;
        }

        /// <summary>
        /// Gets the invariant culture date time.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public DateTime GetInvariantCultureDateTime(int facilityid)
        {

            var facilitybal = new FacilityBal();
            var facilityObj = facilitybal.GetFacilityTimeZoneById(facilityid);
            var tzi = TimeZoneInfo.FindSystemTimeZoneById(facilityObj);
            var utcTime = DateTime.Now.ToUniversalTime();
            var convertedTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, tzi);
            //d = DateTime.Parse(s, CultureInfo.InvariantCulture);
            //string strDate = localTime.ToString(FMT);
            //DateTime now2 = DateTime.ParseExact(strDate, FMT, CultureInfo.InvariantCulture);
            // DateTime now2 = DateTime.Parse(s, CultureInfo.InvariantCulture);
            return convertedTime;
        }



        /// <summary>
        /// Gets the indicator name by indicatornumber.
        /// </summary>
        /// <param name="indicatornumber">The indicatornumber.</param>
        /// <returns></returns>
        public string GetIndicatorNameByIndicatornumber(string indicatornumber, Int32 corporateId)
        {
            return string.Empty;
        }

        /// <summary>
        /// Gets the name of the facility identifier from.
        /// </summary>
        /// <param name="facilityName">Name of the facility.</param>
        /// <returns></returns>
        public int GetFacilityIdFromName(string facilityName)
        {
            var id = 0;
            if (!string.IsNullOrEmpty(facilityName))
            {
                using (var rep = UnitOfWork.FacilityRepository)
                {
                    facilityName = facilityName.ToLower().Trim();
                    var obj = rep.Where(f => f.FacilityName.ToLower().Trim().Equals(facilityName)).FirstOrDefault();
                    if (obj != null) id = obj.FacilityId;
                }
            }
            return id;
        }

        /// <summary>
        /// Gets the name of the corporate identifier from.
        /// </summary>
        /// <param name="corpName">Name of the corp.</param>
        /// <returns></returns>
        public int GetCorporateIdFromName(string corpName)
        {
            var id = 0;
            if (!string.IsNullOrEmpty(corpName))
            {
                using (var rep = UnitOfWork.CorporateRepository)
                {
                    corpName = corpName.ToLower().Trim();
                    var obj = rep.Where(f => f.CorporateName.ToLower().Trim().Equals(corpName)).FirstOrDefault();
                    if (obj != null) id = obj.CorporateID;
                }
            }
            return id;
        }

        /// <summary>
        /// Gets the corporate name from identifier.
        /// </summary>
        /// <param name="corpId">The corp identifier.</param>
        /// <returns></returns>
        public string GetCorporateNameFromId(int corpId)
        {
            var corpName = "";
            using (var rep = UnitOfWork.CorporateRepository)
            {
                var obj = rep.Where(f => f.CorporateID == corpId).FirstOrDefault();
                if (obj != null) corpName = obj.CorporateName;
            }
            return corpName;
        }

        /// <summary>
        /// Gets the corporate identifier from facility identifier.
        /// </summary>
        /// <param name="facilityid">The facilityid.</param>
        /// <returns></returns>
        public int GetCorporateIdFromFacilityId(int facilityid)
        {
            var id = 0;
            using (var rep = UnitOfWork.FacilityRepository)
            {
                var obj = rep.Where(f => f.FacilityId == facilityid).FirstOrDefault();
                if (obj != null)
                {
                    id = Convert.ToInt32(obj.CorporateID);
                }
            }

            return id;
        }

        /// <summary>
        /// Gets the name of the global code identifier by.
        /// </summary>
        /// <param name="category">The category.</param>
        /// <param name="gcName">Name of the gc.</param>
        /// <returns></returns>
        public string GetGlobalCodeIdByName(string category, string gcName)
        {
            var id = string.Empty;
            if (!string.IsNullOrEmpty(gcName) && !string.IsNullOrEmpty(category))
            {
                gcName = gcName.ToLower().Trim();
                using (var rep = UnitOfWork.GlobalCodeRepository)
                {
                    var obj =
                        rep.Where(
                            g =>
                            g.GlobalCodeCategoryValue.Equals(category)
                            && g.GlobalCodeName.ToLower().Trim().Contains(gcName)).FirstOrDefault();

                    if (obj != null) id = obj.GlobalCodeValue;
                }
            }
            return id;
        }

        /// <summary>
        /// Gets the facility lic number by facility identifier.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public string GetFacilityLicNumberByFacilityId(int facilityId)
        {
            if (facilityId > 0)
            {
                using (var rep = UnitOfWork.FacilityRepository)
                {
                    var facility = rep.Where(f => f.FacilityId == facilityId).FirstOrDefault();
                    return facility != null ? facility.FacilityLicenseNumber : "";
                }
            }
            return "";
        }

        /// <summary>
        /// Gets the facility sender identifier by facility identifier.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public string GetFacilitySenderIdByFacilityId(int facilityId)
        {
            if (facilityId > 0)
            {
                using (var rep = UnitOfWork.FacilityRepository)
                {
                    var facility = rep.Where(f => f.FacilityId == facilityId).FirstOrDefault();
                    return facility != null ? facility.SenderID : "";
                }
            }
            return "";
        }

        /// <summary>
        /// Gets the user name by user identifier.
        /// </summary>
        /// <param name="UserID">The user identifier.</param>
        /// <returns></returns>
        public string GetUserNameByUserId(int? UserID)
        {
            try
            {
                using (var usersRep = UnitOfWork.UsersRepository)
                {
                    var usersModel = usersRep.Where(x => x.UserID == UserID && x.IsDeleted == false).FirstOrDefault();
                    return usersModel != null ? usersModel.UserName : string.Empty;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the sub categories2.
        /// </summary>
        /// <param name="gcValue1">The gc value1.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetSubCategories2(string gcValue1)
        {
            var list = new List<GlobalCodes>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                list =
                    rep.Where(
                        f => f.ExternalValue1.Trim().Equals(gcValue1) && f.GlobalCodeCategoryValue.Trim().Equals("4351"))
                        .ToList();

            }
            return list;
        }

        /// <summary>
        /// Gets the facilities by corporate identifier.
        /// </summary>
        /// <param name="cId">The c identifier.</param>
        /// <returns></returns>
        public List<int> GetFacilityIdsByCorporateId(int cId)
        {
            List<int> list;
            using (var rep = UnitOfWork.FacilityRepository) list = rep.Where(c => c.CorporateID == cId).Select(f => f.FacilityId).ToList();
            return list;
        }




        /// <summary>
        /// Checks for duplicate table set.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="tableNumber">The table number.</param>
        /// <param name="typeId">The type identifier.</param>
        /// <returns></returns>
        public bool CheckForDuplicateTableSet(int id, string tableNumber, string typeId)
        {
            using (var rep = UnitOfWork.BillingCodeTableSetRepository)
            {
                return
                    rep.Where(
                        d =>
                        (d.Id == id || id == 0) && d.TableNumber.Trim().Equals(tableNumber)
                        && d.CodeTableType.Trim().Equals(typeId)).Any();
            }
        }

        /// <summary>
        /// Saves the table number.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns></returns>
        public int SaveTableNumber(BillingCodeTableSet model)
        {
            var newId = 0;
            using (var rep = UnitOfWork.BillingCodeTableSetRepository)
            {
                rep.Create(model);
                newId = model.Id;
            }
            return newId;
        }

        /// <summary>
        /// Gets the table numbers list.
        /// </summary>
        /// <param name="typeId">The type identifier.</param>
        /// <returns></returns>
        public List<BillingCodeTableSet> GetTableNumbersList(string typeId)
        {
            using (var rep = UnitOfWork.BillingCodeTableSetRepository)
            {
                return
                    rep.Where(d => d.CodeTableType.Trim().Equals(typeId) || string.IsNullOrEmpty(typeId))
                        .OrderBy(f => f.CodeTableType)
                        .ToList();
            }
        }

        /// <summary>
        /// Gets the department name by identifier.
        /// </summary>
        /// <param name="facilityDeaprtmentId">The facility deaprtment identifier.</param>
        /// <returns></returns>
        public string GetDepartmentNameById(int facilityDeaprtmentId)
        {
            using (var facilityrep = UnitOfWork.FacilityStructureRepository)
            {
                var facilityDepartment =
                    facilityrep.Where(x => x.FacilityStructureId == facilityDeaprtmentId).FirstOrDefault();
                return facilityDepartment == null ? string.Empty : facilityDepartment.FacilityStructureName;
            }
        }

        /// <summary>
        /// Gets the faculty department.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns></returns>


        /// <summary>
        /// Gets the week of year is o8601.
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns></returns>
        public int GetWeekOfYearISO8601Bal(DateTime date)
        {
            var day = (int)CultureInfo.CurrentCulture.Calendar.GetDayOfWeek(date);
            return CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                date.AddDays(4 - (day == 0 ? 7 : day)),
                CalendarWeekRule.FirstFourDayWeek,
                DayOfWeek.Monday);
        }

        /// <summary>
        /// Firsts the date of week.
        /// </summary>
        /// <param name="year">The year.</param>
        /// <param name="weekNum">The week number.</param>
        /// <param name="rule">The rule.</param>
        /// <returns></returns>
        public DateTime FirstDateOfWeekBal(int year, int weekNum, CalendarWeekRule rule)
        {
            var jan1 = new DateTime(year, 1, 1);

            var daysOffset = DayOfWeek.Monday - jan1.DayOfWeek;
            var firstMonday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            var firstWeek = cal.GetWeekOfYear(firstMonday, rule, DayOfWeek.Monday);

            if (firstWeek > 0) weekNum -= 1;

            var result = firstMonday.AddDays(weekNum * 7);

            return result;
        }

        /// <summary>
        /// Gets the corporate physician roles.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public List<UserRole> GetCorporatePhysicianRoles(int corporateId)
        {
            using (var rolebal = new RoleBal())
            {
                using (var userRoleBal = new UserRoleBal())
                {
                    var roleIdlist = rolebal.GetPhysicianRolesByCorporateId(corporateId);
                    var physicianTypeUserId =
                        userRoleBal.GetUserIdByCorporateAndRoleTypeId(corporateId, roleIdlist).ToList();
                    return physicianTypeUserId;
                }
            }
        }


        public string GetTimingAddedById(int id)
        {
            using (var fBal = UnitOfWork.DeptTimmingRepository)
            {
                var list = fBal.Where(x => x.FacilityStructureID == id && x.IsActive).FirstOrDefault();
                return list != null && list.IsActive ? "YES" : "NO";
            }
        }

        public string GetFacilityStructureNameById(int id)
        {
            using (var facilitySructureBal = new FacilityStructureBal())
            {
                var roomObj = facilitySructureBal.GetFacilityStructureById(id);
                return roomObj != null ? roomObj.FacilityStructureName : string.Empty;
            }
        }

        public List<GlobalCodes> GetGlobalCodesListByCategory(string gcc)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var list =
                    rep.Where(g => g.IsActive && g.IsDeleted != true && g.GlobalCodeCategoryValue.Trim().Equals(gcc)).ToList();
                return list;
            }
        }

        /// <summary>
        /// Gets External Value1 value by identifier.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public string GetExternalValue1ById(string categoryValue)
        {
            if (!string.IsNullOrEmpty(categoryValue))
            {
                using (var rep = UnitOfWork.GlobalCodeCategoryRepository)
                {
                    var category = rep.Where(g => g.GlobalCodeCategoryValue.Equals(categoryValue)).FirstOrDefault();
                    return category != null ? category.ExternalValue1 : string.Empty;
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the global codes by categories sp.
        /// </summary>
        /// <param name="gccValues">The GCC values.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetGlobalCodesByCategoriesSp(string gccValues)
        {
            using (var gccRep = UnitOfWork.GlobalCodeRepository)
            {
                var listToreturn = gccRep.GetGlobalCodesByCategoriesSp(gccValues);
                return listToreturn;
            }
        }

        protected static Dictionary<TKey, TValue> ToDictionary<TSource, TKey, TValue>(IEnumerable<TSource> items, Converter<TSource, TKey> keySelector, Converter<TSource, TValue> valueSelector)
        {
            return items.ToDictionary(item => keySelector(item), item => valueSelector(item));
        }

        public async Task<string> GetGlobalCodeNameAsync(string codeValue, string categoryValue)
        {
            if (!string.IsNullOrEmpty(codeValue))
            {
                using (var rep = UnitOfWork.GlobalCodeRepository)
                {
                    var gl = await
                        rep.Where(
                            g => g.GlobalCodeValue.Equals(codeValue) && g.GlobalCodeCategoryValue.Equals(categoryValue))
                            .FirstOrDefaultAsync();
                    return gl != null ? gl.GlobalCodeName : string.Empty;
                }
            }
            return string.Empty;
        }


    }
}
