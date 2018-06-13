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
    public class DashboardIndicatorsRepository : GenericRepository<DashboardIndicators>
    {
        private readonly DbContext _context;
        public DashboardIndicatorsRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="indicatorNumber"></param>
        /// <param name="subCategory1"></param>
        /// <param name="subCategory2"></param>
        /// <param name="year"></param>
        /// <param name="expressionValue"></param>
        /// <returns></returns>
        public bool CreateDashboardStructure(int corporateId, string indicatorNumber, string subCategory1, string subCategory2, int year)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID, @IndicatorNumber,@CurrentYear,@SubCategory1,@SubCategory2 ", StoredProcedures.SPROC_SaveIndicatorDataAfterNewIndicator);
                    var sqlParameters = new SqlParameter[5];

                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("IndicatorNumber", indicatorNumber);
                    sqlParameters[2] = new SqlParameter("CurrentYear", year);
                    sqlParameters[3] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[4] = new SqlParameter("SubCategory2", subCategory2);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="indicatorNumber"></param>
        /// <param name="subCategory1"></param>
        /// <param name="subCategory2"></param>
        /// <param name="year"></param>
        /// <param name="expressionValue"></param>
        /// <returns></returns>
        public bool CreateDashboardStructure(int corporateId, string indicatorNumber, string subCategory1, string subCategory2, int year, string expressionValue, string type)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID, @IndicatorNumber,@CurrentYear,@SubCategory1,@SubCategory2,@ExpressionValue,@Type ", StoredProcedures.SPROC_SaveIndicatorDataAfterNewIndicator_New);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("IndicatorNumber", indicatorNumber);
                    sqlParameters[2] = new SqlParameter("CurrentYear", year);
                    sqlParameters[3] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[4] = new SqlParameter("SubCategory2", subCategory2);
                    sqlParameters[5] = new SqlParameter("ExpressionValue",
                        expressionValue ?? "");
                    sqlParameters[6] = new SqlParameter("Type", type);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="corporateId"></param>
        /// <param name="indicatorNumber"></param>
        /// <param name="subCategory1"></param>
        /// <param name="subCategory2"></param>
        /// <param name="year"></param>
        /// <param name="expressionValue"></param>
        /// <returns></returns>
        public bool CreateDashboardStructureV1(int corporateId, string indicatorNumber, string subCategory1, string subCategory2, int year, string expressionValue, string type)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CID, @IndicatorNumber,@CurrentYear,@SubCategory1,@SubCategory2,@ExpressionValue,@Type ", StoredProcedures.SPROC_SaveIndicatorDataAfterNewIndicator_New);
                    var sqlParameters = new SqlParameter[7];
                    sqlParameters[0] = new SqlParameter("CID", corporateId);
                    sqlParameters[1] = new SqlParameter("IndicatorNumber", indicatorNumber);
                    sqlParameters[2] = new SqlParameter("CurrentYear", year);
                    sqlParameters[3] = new SqlParameter("SubCategory1", subCategory1);
                    sqlParameters[4] = new SqlParameter("SubCategory2", subCategory2);
                    sqlParameters[5] = new SqlParameter("ExpressionValue",
                        expressionValue ?? "");
                    sqlParameters[6] = new SqlParameter("Type", type);
                    ExecuteCommand(spName, sqlParameters);
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }
        public List<DashboardIndicatorsCustomModel> GetDashboardIndicatorsListActiveInActiveNew(int corpoarteId, string sort, string sortdir, int? showinactive)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @SortBy, @SortDir, @CorporateId, @ShowInActive", StoredProcedures.SPROC_SortDashboardIndicatorCols.ToString());
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("SortBy", sort);
                    sqlParameters[1] = new SqlParameter("SortDir", sortdir);
                    sqlParameters[2] = new SqlParameter("CorporateId", corpoarteId);
                    sqlParameters[3] = new SqlParameter("ShowInActive", showinactive);
                    IEnumerable<DashboardIndicatorsCustomModel> result = _context.Database.SqlQuery<DashboardIndicatorsCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception )
            {

            }
            return null;
        }

        public List<DashboardIndicatorsCustomModel> GetDashboardIndicatorsData(int corpoarteId ,int? showinactive)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @CorporateId, @ShowInActive", StoredProcedures.SPROC_GetDashBoardIndicators);
                    var sqlParameters = new SqlParameter[2];
                    sqlParameters[0] = new SqlParameter("CorporateId", corpoarteId);
                    sqlParameters[1] = new SqlParameter("ShowInActive", showinactive);
                    IEnumerable<DashboardIndicatorsCustomModel> result = _context.Database.SqlQuery<DashboardIndicatorsCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
            }
            catch (Exception )
            {

            }
            return null;
        }




        public bool MakeIndicatorInActive(int corpoarteId, int showinactive, string indicatorNumber, int fId, string subCat1, string subCaT2)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pIndicatorNumber,@pSubCategory1,@pSubCategory2,@pCId, @pFId, @pIsActive", StoredProcedures.SPROC_MakeIndicatorInActive);
                    var sqlParameters = new SqlParameter[6];
                    sqlParameters[0] = new SqlParameter("pIndicatorNumber", indicatorNumber);
                    sqlParameters[1] = new SqlParameter("pSubCategory1", subCat1);
                    sqlParameters[2] = new SqlParameter("pSubCategory2", subCaT2);
                    sqlParameters[3] = new SqlParameter("pCId", corpoarteId);
                    sqlParameters[4] = new SqlParameter("pFId", fId);
                    sqlParameters[5] = new SqlParameter("pIsActive", showinactive);
                   
                    ExecuteCommand(spName, sqlParameters);
                    return true ;
                }
            }
            catch (Exception )
            {

            }
            return false;
        }

    }
}
