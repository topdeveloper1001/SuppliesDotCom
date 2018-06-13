using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class DashboardBudgetRepository : GenericRepository<DashboardBudget>
    {
        private readonly DbContext _context;
        public DashboardBudgetRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        /// <summary>
        /// Gets the database budget actual.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="bugetFor">The buget for.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <returns></returns>
        public List<DashboardBudgetReportCustomModel> GetDBBudgetActual(int facilityId, int corporateId, string bugetFor, string fiscalyear)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID, @BudgetFor,@FiscalYear", StoredProcedures.SPROC_GetDBBudgetActual.ToString());
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("BudgetFor", bugetFor);
                    sqlParameters[3] = new SqlParameter("FiscalYear", fiscalyear);
                    IEnumerable<DashboardBudgetReportCustomModel> result = _context.Database.SqlQuery<DashboardBudgetReportCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the database charges dash board.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="bugetFor">The buget for.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <returns></returns>
        public List<DashboardChargesCustomModel> GetDBChargesDashBoard(int facilityId, int corporateId, string bugetFor, string fiscalyear)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID, @BudgetFor,@FiscalYear", StoredProcedures.SPROC_GetDBCharges);
                    if (facilityId == -1)
                        spName = string.Format("EXEC {0} @CID,@FID, @BudgetFor,@FiscalYear", StoredProcedures.SPROC_GetDBChargesByCorporate);
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("BudgetFor", bugetFor);
                    sqlParameters[3] = new SqlParameter("FiscalYear", fiscalyear);
                    IEnumerable<DashboardChargesCustomModel> result = _context.Database.SqlQuery<DashboardChargesCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //SPROC_GetDBCharges// SPROC_SetDBChargesActuals 

        /// <summary>
        /// Sets the database charges actuals.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="bugetFor">The buget for.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <returns></returns>
        public bool SetDBChargesActuals(int facilityId, int corporateId, string bugetFor, string fiscalyear)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID, @BudgetFor,@FiscalYear", StoredProcedures.SPROC_SetDBChargesActuals.ToString());
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("BudgetFor", bugetFor);
                    sqlParameters[3] = new SqlParameter("FiscalYear", fiscalyear);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
                return false;
            }
            catch (Exception )
            {
                return false;
            }
        }

        /// <summary>
        /// Sets the database counter actuals.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="bugetFor">The buget for.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <returns></returns>
        public bool SetDBCounterActuals(int facilityId, int corporateId, string bugetFor, string fiscalyear)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID, @BudgetFor,@FiscalYear", StoredProcedures.SPROC_SetDBCountersActuals.ToString());
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("BudgetFor", bugetFor);
                    sqlParameters[3] = new SqlParameter("FiscalYear", fiscalyear);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
                return false;
            }
            catch (Exception )
            {
                return false;
            }
        }

        /// <summary>
        /// Gets the manual dash board.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoard(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    //var spName =
                    //    string.Format(
                    //        "EXEC {0} @pFacilityId,@pCorporateId, @pIndicatorNumber,@pFiscalYear,@pfacilityType,@psegment,@pDepartment",
                    //        StoredProcedures.SPROC_GetManualDashboardData);
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId, @pIndicatorNumber,@pFiscalYear,@pfacilityType,@psegment,@pDepartment",
                            StoredProcedures.SPROC_GetManualDashboardDataSA);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[3] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[4] = new SqlParameter("pfacilityType", facilityType);
                    sqlParameters[5] = new SqlParameter("psegment", segment);
                    sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the manual dash board stat data.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetManualDashBoardStatData(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManualBB);
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManual);
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManualAj);
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManual_Modified);
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion,@IndiatorNumber", StoredProcedures.SPROC_GetDBBudgetActualManualSA);
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion,@IndiatorNumber", StoredProcedures.SPROC_GetManualDashboardDataStatList_SA);
                    var sqlParameters = new SqlParameter[6];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    //sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    sqlParameters[5] = new SqlParameter("IndiatorNumber", type);
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the manual dash board stat data.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetManualDashBoardStatDataAcute(int facilityId, int corporateId, string type,
            string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion",
                        StoredProcedures.SPROC_GetDBBudgetActualManual_Acute);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the manual dash board patient fall list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<PatientFallStats> GetManualDashBoardPatientFallList(int facilityId, int corporateId, string type, int fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @FID,@CID,@pFiscalYear ", StoredProcedures.SPROC_GetPatientFallRate_ManualDashboard);
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("FID", facilityId);
                    sqlParameters[1] = new SqlParameter("CID", corporateId);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    IEnumerable<PatientFallStats> result = _context.Database.SqlQuery<PatientFallStats>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<PatientFallStats> GetManualDashBoardPatientFallListV1(int facilityId, int corporateId, string type, int fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @FID,@CID,@pFiscalYear ", StoredProcedures.SPROC_GetPatientFallRate_DashboardData);
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("FID", facilityId);
                    sqlParameters[1] = new SqlParameter("CID", corporateId);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    IEnumerable<PatientFallStats> result = _context.Database.SqlQuery<PatientFallStats>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Gets the sub category charts.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetSubCategoryCharts(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId, @pIndicatorNumber,@pFiscalYear,@pfacilityType,@psegment,@pDepartment",
                            StoredProcedures.SPROC_GetSubCategoryCharts_Manual);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[3] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[4] = new SqlParameter("pfacilityType", facilityType);
                    sqlParameters[5] = new SqlParameter("psegment", segment);
                    sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="facilityId"></param>
        /// <param name="corporateId"></param>
        /// <param name="type"></param>
        /// <param name="fiscalyear"></param>
        /// <param name="facilityType"></param>
        /// <param name="segment"></param>
        /// <param name="Department"></param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetSubCategoryChartsPayorMix(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId, @pIndicatorNumber,@pFiscalYear,@pfacilityType,@psegment,@pDepartment",
                            StoredProcedures.SPROC_GetSubCategoryCharts_PixorMix);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[3] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[4] = new SqlParameter("pfacilityType", facilityType);
                    sqlParameters[5] = new SqlParameter("psegment", segment);
                    sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Gets the manual dash board data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoardDataList(int facilityId, int corporateId, string fiscalyear)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId,@pFiscalYear",
                            StoredProcedures.SPROC_GetManualDashboardDataList);
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    //sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    //sqlParameters[4] = new SqlParameter("pfacilityType", facilityType);
                    //sqlParameters[5] = new SqlParameter("psegment", segment);
                    //sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ManualDashboardModel> GetManualDashBoardDataListV1(int facilityId, int corporateId, string fiscalyear)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId,@pFiscalYear",
                            StoredProcedures.SPROC_GetManualDashboardDataListV1);
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    //sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    //sqlParameters[4] = new SqlParameter("pfacilityType", facilityType);
                    //sqlParameters[5] = new SqlParameter("psegment", segment);
                    //sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Gets the manual dash board data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="indicatorNumber"></param>
        /// <param name="budgetType"></param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoardDataByIndicatorNumber(int facilityId, int corporateId, string fiscalyear, string indicatorNumber, string budgetType, string subCategory1, string subCategory2)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId,@pFiscalYear, @IndicatorNumber, @BudgetType,@SubCategory1,@SubCategory2",
                            StoredProcedures.SPROC_GetManualDashboardDataByIndicatorNumber);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[3] = new SqlParameter("IndicatorNumber", indicatorNumber);
                    sqlParameters[4] = new SqlParameter("BudgetType", budgetType);
                    sqlParameters[5] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[6] = new SqlParameter("SubCategory2", subCategory2);
                   var result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Gets the manual dash board data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="indicatorNumber"></param>
        /// <param name="budgetType"></param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoardDataByIndicatorNumberV1(int facilityId, int corporateId, string fiscalyear, string indicatorNumber, string budgetType)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId,@pFiscalYear, @IndicatorNumber, @BudgetType",
                            StoredProcedures.SPROC_GetManualDashboardDataByIndicatorNumberV1);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[3] = new SqlParameter("IndicatorNumber", indicatorNumber);
                    sqlParameters[4] = new SqlParameter("BudgetType", budgetType);
                    var result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// Gets the manual dash board stat data.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetManualDashBoardStatSingleData(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManualIndicators);
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManual_Modified);

                    var sqlParameters = new SqlParameter[6];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    sqlParameters[5] = new SqlParameter("pIndicatorNumber", type);
                    //sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the executive dashboard balance sheet.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetExecutiveDashboardBalanceSheet(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetManualBalanceSheet);
                    //var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDBBudgetActualManual_Modified);

                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the manual dash board data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="ownership"></param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoardDataListRebind(int facilityId, int corporateId, int fiscalyear, string ownership, string indicator)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId,@pFiscalYear,@Ownership,@IndicatorNumber",
                            StoredProcedures.SPROC_GetManualDashboardDataListRebind);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[3] = new SqlParameter("Ownership", ownership);
                    sqlParameters[4] = new SqlParameter("IndicatorNumber", indicator);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Gets the manual dash board data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="ownership"></param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoardDataListRebindV1(int facilityId, int corporateId, int fiscalyear, string ownership, string indicator)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId,@pFiscalYear,@Ownership,@IndicatorNumber",
                            StoredProcedures.SPROC_GetManualDashboardDataListRebindV1);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[3] = new SqlParameter("Ownership", ownership);
                    sqlParameters[4] = new SqlParameter("IndicatorNumber", indicator);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #region New Changes on 12 August 2015 by Shashank

        /// <summary>
        /// Gets the manual dash board stat data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetManualDashBoardStatDataList(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion,@IndiatorNumber", StoredProcedures.SPROC_GetManualDashboardDataStatList_SA);
                    var sqlParameters = new SqlParameter[6];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    //sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    sqlParameters[5] = new SqlParameter("IndiatorNumber", type);
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the dashboard data stat list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetDashboardDataStatList(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion,@IndiatorNumber", StoredProcedures.SPROC_GetDashboardDataStatList_SA);
                    var sqlParameters = new SqlParameter[6];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    sqlParameters[5] = new SqlParameter("IndiatorNumber", type);
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the dashboard balance sheet data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetManualDashboardBalanceSheetDataList(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDashboardBalanceSheetDataList_SA);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the dashboard data balance sheet data list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ExternalDashboardModel> GetDashboardDataBalanceSheetDataList(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID,@FID,@TillDate,@FacilityRelated,@FacilityRegion", StoredProcedures.SPROC_GetDashboardDataBalanceSheetDataList_SA);
                    var sqlParameters = new SqlParameter[5];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("FID", facilityId);
                    sqlParameters[2] = new SqlParameter("TillDate", fiscalyear);
                    sqlParameters[3] = new SqlParameter("FacilityRelated", facilityType == 0 ? DBNull.Value : (object)facilityType.ToString());
                    sqlParameters[4] = new SqlParameter("FacilityRegion", segment == 0 ? DBNull.Value : (object)segment.ToString());
                    IEnumerable<ExternalDashboardModel> result = _context.Database.SqlQuery<ExternalDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }

            }
            catch (Exception )
            {
                //throw ex;
            }
            return null;
        }

        /// <summary>
        /// Gets the manual dash board graphs v1.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="type">The type.</param>
        /// <param name="fiscalyear">The fiscalyear.</param>
        /// <param name="facilityType">Type of the facility.</param>
        /// <param name="segment">The segment.</param>
        /// <param name="Department">The department.</param>
        /// <returns></returns>
        public List<ManualDashboardModel> GetManualDashBoardGraphsV1(int facilityId, int corporateId, string type, string fiscalyear, int facilityType, int segment, int Department)
        {
            try
            {
                if (_context != null)
                {
                    var spName =
                        string.Format(
                            "EXEC {0} @pFacilityId,@pCorporateId, @pIndicatorNumber,@pFiscalYear,@pfacilityType,@psegment,@pDepartment",
                            StoredProcedures.SPROC_GetDashboardDataGraph_SA);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pCorporateId", corporateId);
                    sqlParameters[2] = new SqlParameter("pIndicatorNumber", type);
                    sqlParameters[3] = new SqlParameter("pFiscalYear", fiscalyear);
                    sqlParameters[4] = new SqlParameter("pfacilityType", facilityType);
                    sqlParameters[5] = new SqlParameter("psegment", segment);
                    sqlParameters[6] = new SqlParameter("pDepartment", Department);
                    IEnumerable<ManualDashboardModel> result = _context.Database.SqlQuery<ManualDashboardModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
