using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class DashboardIndicatorDataRepository : GenericRepository<DashboardIndicatorData>
    {
        private readonly DbContext _context;
        public DashboardIndicatorDataRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        /// <summary>
        /// us the pdate dashboard indicators data.
        /// </summary>
        /// <param name="corporateid">The corporateid.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="budgetType">Type of the budget.</param>
        /// <param name="year">The year.</param>
        /// <param name="status">if set to <c>true</c> [status].</param>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public bool UpdateDashboardIndicatorsData(int corporateid, int facilityId, string indicatorNumber, string budgetType, string year, bool status, string type, string subCategory1, string subCategory2)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pIndicatorNumber,@pCID,@pStatus,@pFID,@pbudgetType,@pYear,@pType@SubCategory1,@SubCategory2", StoredProcedures.SPROC_UpdateDashboardIndicatorsData);
                    var sqlParameters = new SqlParameter[9];
                    sqlParameters[0] = new SqlParameter("pIndicatorNumber", indicatorNumber);
                    sqlParameters[1] = new SqlParameter("pCID", corporateid);
                    sqlParameters[2] = new SqlParameter("pStatus", status);
                    sqlParameters[3] = new SqlParameter("pFID", facilityId);
                    sqlParameters[4] = new SqlParameter("pbudgetType", budgetType);
                    sqlParameters[5] = new SqlParameter("pYear", year);
                    sqlParameters[6] = new SqlParameter("pType", type);
                    sqlParameters[7] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[8] = new SqlParameter("SubCategory2", subCategory2);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch
            {
                //throw ex;
            }
            return false;
        }


        /// <summary>
        /// Updates the calculative indicator data.
        /// </summary>
        /// <param name="indicatorNumbers">The indicator numbers.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="year">The year.</param>
        /// <param name="budgetType">Type of the budget.</param>
        /// <param name="loggedInUserId">The logged in user identifier.</param>
        /// <param name="subCategory1">The sub category1.</param>
        /// <param name="subcategory2">The subcategory2.</param>
        /// <returns></returns>
        public bool UpdateCalculativeIndicatorData(string indicatorNumbers, string corporateId, string facilityId, string year, string budgetType, string loggedInUserId, string subCategory1, string subcategory2)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @IndicatorNumbers,@CorporateId,@FacilityId,@Year,@BudgetType,@LoggedInUserId,@SubCategory1,@SubCategory2", StoredProcedures.SPROC_UpdateCalculativeIndicatorData_SA);
                    var sqlParameters = new SqlParameter[8];
                    sqlParameters[0] = new SqlParameter("IndicatorNumbers", indicatorNumbers);
                    sqlParameters[1] = new SqlParameter("CorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("FacilityId", facilityId);
                    sqlParameters[3] = new SqlParameter("Year", year);
                    sqlParameters[4] = new SqlParameter("BudgetType", budgetType);
                    sqlParameters[5] = new SqlParameter("LoggedInUserId", loggedInUserId);
                    sqlParameters[6] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[7] = new SqlParameter("SubCategory2", subcategory2);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception )
            {
                //throw ex;
            }
            return false;
        }


        /// <summary>
        /// Sets the static budget target.
        /// </summary>
        /// <param name="indicatorNumbers">The indicator numbers.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="year">The year.</param>
        /// <param name="budgetType">Type of the budget.</param>
        /// <param name="loggedInUserId">The logged in user identifier.</param>
        /// <param name="subCategory1">The sub category1.</param>
        /// <param name="subcategory2">The subcategory2.</param>
        /// <returns></returns>
        public bool SetStaticBudgetTarget(string indicatorNumbers, string corporateId, string facilityId, string year, string budgetType, string loggedInUserId, string subCategory1, string subcategory2)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pIndicatorNumber,@pSubCategory1,@pSubCategory2,@pCorporateId,@pBudgetType,@FacID,@pYear", StoredProcedures.SPROC_SetStaticBudgetTarget);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pIndicatorNumber", indicatorNumbers);
                    sqlParameters[1] = new SqlParameter("pSubCategory1", subCategory1);
                    sqlParameters[2] = new SqlParameter("pSubCategory2", subcategory2);
                    sqlParameters[3] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[4] = new SqlParameter("pBudgetType", budgetType);
                    sqlParameters[5] = new SqlParameter("FacID", facilityId);
                    sqlParameters[6] = new SqlParameter("pYear", year);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception )
            {
                //throw ex;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="facilityId"></param>
        /// <param name="indicatorNumbers"></param>
        /// <param name="budgetType"></param>
        /// <param name="year"></param>
        /// <param name="subCategory1"></param>
        /// <param name="subcategory2"></param>
        /// <returns></returns>
        public bool UpdateCalculateIndicatorUpdate(string corporateId, string facilityId, string indicatorNumbers,
            string budgetType, string year, string subCategory1, string subcategory2)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@IndicatorNumber,@BudgetType,@CurrentYear,@SubCategory1,@SubCategory2", StoredProcedures.SPROC_DBDCalc_IndicatorUpdate);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("IndicatorNumber", indicatorNumbers);
                    sqlParameters[3] = new SqlParameter("BudgetType", budgetType);
                    sqlParameters[4] = new SqlParameter("CurrentYear", year);
                    sqlParameters[5] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[6] = new SqlParameter("SubCategory2", subcategory2);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception )
            {
                //throw ex;
            }
            return false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="indicatorNumbers"></param>
        /// <returns></returns>
        public bool GenerateIndicatorEffects(string corporateId, string indicatorNumbers)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@IndicatorNumber", StoredProcedures.SPROC_DBDGenerate_IndicatorEffects);
                    var sqlParameters = new SqlParameter[2];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("IndicatorNumber", indicatorNumbers);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception )
            {
                //throw ex;
            }
            return false;
        }


        public DashboardIndicatorDataCustomModel SaveIndicatorsPlusData(ManualDashboard model)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @IndicatorNumber,@SubCat1,@SubCat2,@M1,@M2,@M3,@M4,@M5,@M6,@M7,@M8,@M9,@M10,@M11,@M12,@FacilityId,@CId,@BugdetType,@Year,@DashDesc,@Ownership,@Definition",
                            StoredProcedures.SPROC_SaveAllDashboardIndicatorData);
                    var sqlParameters = new SqlParameter[22];
                    sqlParameters[0] = new SqlParameter("IndicatorNumber", model.Indicators);
                    sqlParameters[1] = new SqlParameter("SubCat1", model.SubCategory1);
                    sqlParameters[2] = new SqlParameter("SubCat2", model.SubCategory2);
                    sqlParameters[3] = new SqlParameter("M1", model.M1);
                    sqlParameters[4] = new SqlParameter("M2", model.M2);
                    sqlParameters[5] = new SqlParameter("M3", model.M3);
                    sqlParameters[6] = new SqlParameter("M4", model.M4);
                    sqlParameters[7] = new SqlParameter("M5", model.M5);
                    sqlParameters[8] = new SqlParameter("M6", model.M6);
                    sqlParameters[9] = new SqlParameter("M7", model.M7);
                    sqlParameters[10] = new SqlParameter("M8", model.M8);
                    sqlParameters[11] = new SqlParameter("M9", model.M9);
                    sqlParameters[12] = new SqlParameter("M10", model.M10);
                    sqlParameters[13] = new SqlParameter("M11", model.M11);
                    sqlParameters[14] = new SqlParameter("M12", model.M12);
                    sqlParameters[15] = new SqlParameter("FacilityId", model.FacilityId);
                    sqlParameters[16] = new SqlParameter("CId", model.CorporateId);
                    sqlParameters[17] = new SqlParameter("BugdetType", model.BudgetType);
                    sqlParameters[18] = new SqlParameter("Year", model.Year);
                    sqlParameters[19] = new SqlParameter("DashDesc", model.OtherDescription);
                    sqlParameters[20] = new SqlParameter("Ownership", model.OwnerShip);
                    sqlParameters[21] = new SqlParameter("Definition", model.Defination);
                    IEnumerable<DashboardIndicatorDataCustomModel> result = _context.Database.SqlQuery<DashboardIndicatorDataCustomModel>(spName, sqlParameters);
                    return result.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                //throw ex;
            }
            return null;
        }
    }
}
