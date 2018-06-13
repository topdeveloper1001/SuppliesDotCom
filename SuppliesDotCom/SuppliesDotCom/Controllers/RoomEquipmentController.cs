// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RoomEquipmentController.cs" company="RoomEquipments">
//   Room Equipment assignment screen
// </copyright>
// <summary>
//   The room equipment controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Remoting.Messaging;
    using System.Web.Mvc;

    using SuppliesDotCom.Bal.BusinessAccess;
    using SuppliesDotCom.Common;
    using SuppliesDotCom.Model.CustomModel;
    using SuppliesDotCom.Models;
    using SuppliesDotCom.Model;

    /// <summary>
    /// The room equipment controller.
    /// </summary>
    public class RoomEquipmentController : Controller
    {
        // GET: /RoomEquipment/
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
            var facilityEquipmentList = gcBal.GetRoomEquipmentALLList(Helpers.GetDefaultFacilityId().ToString());
            var viewtoRetrun = new RoomEquipmentView()
                                   {
                                       GCCurrentDataView = new GlobalCodeCustomDModel(),
                                       GClistView = facilityEquipmentList
                                   };
            return this.View(viewtoRetrun);
        }

        /// <summary>
        /// Gets the facility equipments.
        /// </summary>
        /// <param name="coporateId">The coporate identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public ActionResult GetFacilityEquipments(int coporateId, int facilityId)
        {
            using (var equipmentBal = new EquipmentBal())
            {
                var facilityEquipmentList = equipmentBal.GetEquipmentList(false, facilityId.ToString());
                return PartialView(PartialViews.FacilityEquipmentListView, facilityEquipmentList);
            }
        }

        /// <summary>
        /// Gets the room equipments.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="roomId">The room identifier.</param>
        /// <returns></returns>
        public ActionResult GetRoomEquipments(int facilityId, int roomId)
        {
            using (var globalCodeBal = new GlobalCodeBal())
            {
                var facilityEquipmentList = globalCodeBal.GetRoomEquipmentList(facilityId.ToString(), roomId.ToString());
                var selectedObjects = facilityEquipmentList != null
                                          ? facilityEquipmentList.Select(x => x.GlobalCodeValue).ToList()
                                          : new List<string>() { "0" };
                var list = new
                               {
                                   equipments = selectedObjects
                               };
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Saves the room equipments.
        /// </summary>
        /// <param name="globalCodeObj">The global code object.</param>
        /// <returns></returns>
        public ActionResult SaveRoomEquipments(List<GlobalCodes> globalCodeObj)
        {
            using (var gcBal = new GlobalCodeBal())
            {
                foreach (var item in globalCodeObj)
                {
                    item.CreatedDate = Helpers.GetInvariantCultureDateTime();
                    item.CreatedBy = Helpers.GetLoggedInUserId();
                }

                var result = gcBal.AddUpdateGlobalCodesList(globalCodeObj);
                //return Json(result, JsonRequestBehavior.AllowGet);
                var facilityEquipmentList = gcBal.GetRoomEquipmentALLList(globalCodeObj[0].FacilityNumber);
                return PartialView(PartialViews.RoomEquipmentList, facilityEquipmentList);
            }
        }

        /// <summary>
        /// Deletes the equipment.
        /// </summary>
        /// <param name="globalCodeid">The global codeid.</param>
        /// <param name="facilityNumber">The facility number.</param>
        /// <returns></returns>
        public ActionResult DeleteEquipment(int globalCodeid, string facilityNumber)
        {
            using (var gcBal = new GlobalCodeBal())
            {
                var objToReturn = gcBal.DeleteGlobalCode(globalCodeid, facilityNumber);
                return PartialView(PartialViews.RoomEquipmentList, objToReturn);
            }
        }

        #endregion
    }
}