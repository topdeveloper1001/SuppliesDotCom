using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Repository.Common;
using System;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class FacilityStructureRepository : GenericRepository<FacilityStructure>
    {
        private readonly DbContext _context;
        public FacilityStructureRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }


        public List<FacilityStructureCustomModel> GetFacilityStructureData(int facilityId, int structureId, bool showIsActive)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pFacilityId, @pStructureId,@pShowIsActive", StoredProcedures.SPROC_GetFacilityStructureData);
                    var sqlParameters = new SqlParameter[3];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pStructureId", structureId);
                    sqlParameters[2] = new SqlParameter("pShowIsActive", showIsActive);
                    IEnumerable<FacilityStructureCustomModel> result = _context.Database.SqlQuery<FacilityStructureCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Gets the facility rooms custom model.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="structureId">The structure identifier.</param>
        /// <returns></returns>
        public List<FacilityStructureRoomsCustomModel> GetFacilityRoomsCustomModel(int facilityId, int structureId)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pFacilityId, @pStructureId", StoredProcedures.SPROC_GetFacilityStructueChildParent);
                    var sqlParameters = new SqlParameter[2];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pStructureId", structureId);
                    IEnumerable<FacilityStructureRoomsCustomModel> result = _context.Database.SqlQuery<FacilityStructureRoomsCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Gets the facility rooms custom model.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="structureId">The structure identifier.</param>
        /// <param name="depIds"></param>
        /// <param name="roomIds"></param>
        /// <returns></returns>
        public List<FacilityStructureRoomsCustomModel> GetFacilityRoomsByDepartments(int facilityId, int structureId, string depIds, string roomIds)
        {
            try
            {
                if (_context != null)
                {
                    var spName = string.Format("EXEC {0} @pFacilityId, @pStructureId, @pDeptIds, @pRoomIds", StoredProcedures.SPROC_GetRoomsByDepartments);
                    var sqlParameters = new SqlParameter[4];
                    sqlParameters[0] = new SqlParameter("pFacilityId", facilityId);
                    sqlParameters[1] = new SqlParameter("pStructureId", structureId);
                    sqlParameters[2] = new SqlParameter("pDeptIds", depIds);
                    sqlParameters[3] = new SqlParameter("pRoomIds", roomIds);
                    IEnumerable<FacilityStructureRoomsCustomModel> result = _context.Database.SqlQuery<FacilityStructureRoomsCustomModel>(spName, sqlParameters);
                    return result.ToList();
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }


        public List<FacilityStructureCustomModel> GetAppointRoomAssignmentsList(int facilityId, string searchText)
        {
            try
            {
                if (_context != null)
                {
                    searchText = string.IsNullOrEmpty(searchText) ? string.Empty : searchText;
                    var spName = string.Format("EXEC {0} @pFId, @pSearch", StoredProcedures.SPROC_GetAppointmentRoomsAssignements);
                    var sqlParameters = new SqlParameter[2];
                    sqlParameters[0] = new SqlParameter("pFId", facilityId);
                    sqlParameters[1] = new SqlParameter("pSearch", searchText);

                    //We Assume here: _context is your EF DbContext
                    using (var multiResultSet = _context.MultiResultSetSqlQuery(spName, parameters: sqlParameters))
                    {
                        var fList = multiResultSet.ResultSetFor<FacilityStructureCustomModel>().ToList();
                        //var appList = multiResultSet.ResultSetFor<AppointmentTypesCustomModel>().ToList();

                        //fList =
                        //    fList.Select(
                        //        fs =>
                        //        {
                        //            var aList =
                        //                appList.Where(a => int.Parse(a.ExtValue2) == fs.FacilityStructureId).ToList();
                        //            fs.AppointmentList = new List<AppointmentTypes>(aList);

                        //            return fs;

                        //        }).ToList();

                        return fList;
                    }
                }
                return null;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

    }
}
