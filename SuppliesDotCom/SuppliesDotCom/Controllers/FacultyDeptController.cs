// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FacultyDeptController.cs" company="Spadez">
//   Omnihealthcare
// </copyright>
// <summary>
//   The faculty dept controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    using SuppliesDotCom.Bal.BusinessAccess;
    using SuppliesDotCom.Common;
    using SuppliesDotCom.Model.CustomModel;
    using SuppliesDotCom.Models;

    /// <summary>
    /// The faculty dept controller.
    /// </summary>
    public class FacultyDeptController : Controller
    {
        // GET: /FacultyDept/
        #region Public Methods and Operators

        /// <summary>
        /// The index.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult Index()
        {
            var gcBal = new GlobalCodeBal();

            // var facilityEquipmentList = gcBal.GetRoomEquipmentALLList(Helpers.GetDefaultFacilityId().ToString());
            var viewtoRetrun = new RoomEquipmentView()
            {
                GCCurrentDataView = new GlobalCodeCustomDModel(),
                GClistView = new List<GlobalCodeCustomDModel>()
            };
            return this.View(viewtoRetrun);
        }

        /// <summary>
        /// Gets the facility departments.
        /// </summary>
        /// <param name="coporateId">The coporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetFacilityDepartments(int coporateId, int facilityId)
        {
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                var facilityDepartmentList = facilityStructureBal.GetFacilityDepartments(coporateId, facilityId.ToString());
                return PartialView(PartialViews.FacilityDepartmentListView, facilityDepartmentList);
            }
        }

        #endregion
    }
}