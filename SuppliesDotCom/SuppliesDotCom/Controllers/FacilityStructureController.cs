// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FacilityStructureController.cs" company="Spadez">
//   Omnihealth care
// </copyright>
// <summary>
//   The facility structure controller.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Bal.BusinessAccess;
    using Common;
    using Common.Common;
    using Model;
    using Model.CustomModel;
    using Models;
    using System.IO;

    /// <summary>
    /// The facility structure controller.
    /// </summary>
    public class FacilityStructureController : BaseController
    {
        #region Public Methods and Operators

        /// <summary>
        ///     Get the details of the FacilityStructure View in the Model FacilityStructure such as FacilityStructureList, list of
        ///     countries etc.
        /// </summary>
        /// <returns>
        ///     returns the actionresult in the form of current object of the Model FacilityStructure to be passed to View
        ///     FacilityStructure
        /// </returns>
        public ActionResult Index()
        {

            // Intialize the View Model i.e. FacilityStructureView which is binded to Main View Index.cshtml under FacilityStructure
            var fsView = new FacilityStructureView
            {
                // FacilityStructureList = facilityStructureList,
                FacilityStructureList = new List<FacilityStructureCustomModel>(),
                CurrentFacilityStructure =
                    new FacilityStructureCustomModel
                    {
                        ServiceCodesList = new List<ServiceCode>(),
                        EquipmentList = new List<EquipmentMaster>()//,
                        //AppointmentList = new List<AppointmentTypes>()
                    }
            };

            // Pass the View Model in ActionResult to View FacilityStructure
            return View(fsView);
        }

        /// <summary>
        /// Binds the facility data.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult BindFacilityData()
        {
            var bal = new FacilityBal();
            var userIsAdmin = Helpers.GetLoggedInUserIsAdmin();
            var cId = Helpers.GetDefaultCorporateId();
            var facId = 0;
            if (!userIsAdmin)
            {
                facId = Helpers.GetDefaultFacilityId();
            }

            var facilityList = bal.GetFacilities(cId, facId);
            var list =
                facilityList.Select(
                    item => new SelectListItem { Text = item.FacilityName, Value = Convert.ToString(item.FacilityId) })
                    .ToList();
            return Json(list);
        }

        /// <summary>
        /// Bind all the FacilityStructure list
        /// </summary>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <param name="structureId">
        /// The structure identifier.
        /// </param>
        /// <param name="showInActive">
        /// if set to <c>true</c> [show in active].
        /// </param>
        /// <returns>
        /// action result with the partial view containing the FacilityStructure list object
        /// </returns>
        public ActionResult BindFacilityStructureGrid(string facilityid, int structureId, bool showInActive)
        {
            // Initialize the FacilityStructure BAL object
            using (var bal = new FacilityStructureBal())
            {
                var currentFacilityId = 0;
                var fList = new List<FacilityStructureCustomModel>();
                if (Session[SessionNames.FacilityStructureData.ToString()] != null && structureId == 0)
                {
                    var fdata = Session[SessionNames.FacilityStructureData.ToString()] as FacilityDataTemp;
                    if (fdata != null)
                    {
                        currentFacilityId = fdata.CurrentFacilityId;
                        fList = fdata.FacStructureData;
                    }
                }

                // var facilityStructureList=facilityStructureBal.GetfacilityStructureData(Convert.ToInt32(facilityid), structureId,showInActive);

                var facilityStructureList = showInActive
                    ? bal
                        .GetfacilityStructureData
                        (Convert.ToInt32(facilityid), structureId, true)
                    : ((int.Parse(facilityid) == currentFacilityId && structureId == 0 &&
                        fList.Count > 0)
                        ? fList
                        : bal.GetfacilityStructureData(Convert.ToInt32(facilityid), structureId, false));
                //: bal.GetFacilityStructureCustom(facilityid, structureId));

                if (showInActive && int.Parse(facilityid) > 0 && structureId == 0)
                {
                    currentFacilityId = Convert.ToInt32(facilityid);
                    fList = facilityStructureList;
                    var newObj = new FacilityDataTemp
                    {
                        CurrentFacilityId = currentFacilityId,
                        FacStructureData = fList
                    };
                    Session[SessionNames.FacilityStructureData.ToString()] = newObj;
                }



                switch (structureId)
                {
                    case 82:
                        return PartialView(PartialViews.FacilityStructureFloorList, facilityStructureList);
                    case 83:
                        return PartialView(PartialViews.FacilityStructureDeptList, facilityStructureList);
                    case 84:
                        return PartialView(PartialViews.FacilityStructureRoomsList, facilityStructureList);
                    case 85:
                        return PartialView(PartialViews.FacilityStructureBedsList, facilityStructureList);
                }

                // Pass the ActionResult with List of FacilityStructureViewModel object to Partial View FacilityStructureList
                return PartialView(PartialViews.FacilityStructureList, facilityStructureList);
            }
        }

        /// <summary>
        /// Bind all the FacilityStructure list
        /// </summary>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <returns>
        /// action result with the partial view containing the FacilityStructure list object
        /// </returns>
        public ActionResult BindFacilityStructureGridTreeView(string facilityid)
        {
            // Initialize the FacilityStructure BAL object
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                var fList = new List<FacilityStructureCustomModel>();
                if (Session[SessionNames.FacilityStructureData.ToString()] != null)
                {
                    var fdata = Session[SessionNames.FacilityStructureData.ToString()] as FacilityDataTemp;
                    if (fdata != null && fdata.CurrentFacilityId == int.Parse(facilityid))
                        fList = fdata.FacStructureData;

                }



                // Get the facilities list
                //var facilityStructureList = fList.Count > 0
                //    ? fList
                //    : facilityStructureBal.GetFacilityStructureCustom(facilityid, 0);

                var facilityStructureList = fList.Count > 0
                   ? fList
                   : facilityStructureBal.GetFacilityStructureCustom(facilityid, 0);

                // Pass the ActionResult with List of FacilityStructureViewModel object to Partial View FacilityStructureList
                var partialviewData = PartialView(PartialViews.FacilityStructureTreeView,
                    facilityStructureList);
                return partialviewData;

                // return PartialView(PartialViews.FacilityStructureList, facilityStructureList);// Commented for testi ng purpose 
            }
        }



        /// <summary>
        ///     Bind all the FacilityStructure list
        /// </summary>
        /// <returns>
        ///     action result with the partial view containing the FacilityStructure list object
        /// </returns>
        public ActionResult BindFacilityStructureList()
        {
            // Initialize the FacilityStructure BAL object
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                var facilityId = Convert.ToString(Helpers.GetDefaultFacilityId());

                // Get the facilities list
                var list = facilityStructureBal.GetFacilityStructure(facilityId);
                list = list.Where(x => x.FacilityId.Equals(facilityId)).ToList();

                // Pass the ActionResult with List of FacilityStructureViewModel object to Partial View FacilityStructureList
                return PartialView(PartialViews.FacilityStructureList, list);
            }
        }

        /// <summary>
        /// Delete the current FacilityStructure based on the FacilityStructure ID passed in the FacilityStructureModel
        /// </summary>
        /// <param name="facilityStructureId">
        /// The facility structure identifier.
        /// </param>
        /// <param name="bedid">
        /// The bedid.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult DeleteFacilityStructure(int facilityStructureId, int bedid)
        {
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                // Get FacilityStructure model object by current FacilityStructure ID
                var currentFacilityStructure =
                    facilityStructureBal.GetFacilityStructureById(Convert.ToInt32(facilityStructureId));

                // apply check if the current structure id have childs
                var canDelete = facilityStructureBal.CheckForChildrens(facilityStructureId);
                if (canDelete)
                {
                    return Json(-1);
                }

                if (bedid != 0)
                {
                    //using (var bedMasterbal = new BedMasterBal())
                    //{
                    //    var canDeleteBed = bedMasterbal.CheckIdBedOccupied(bedid);
                    //    if (canDeleteBed)
                    //    {
                    //        return Json(-2);
                    //    }
                    //}
                }

                var userid = Helpers.GetLoggedInUserId();

                // Check If FacilityStructure model is not null
                if (currentFacilityStructure != null)
                {
                    if (currentFacilityStructure.GlobalCodeID == 85)
                    {
                        //using (var bedMasterBal = new BedMasterBal())
                        //{
                        //    // var currentFacilityBed = bedMasterBal.GetBedMasterById(Convert.ToInt32(facilityStructureId));
                        //    // currentFacilityBed.IsDeleted = true;
                        //    // currentFacilityBed.DeletedBy = userid;
                        //    // currentFacilityBed.DeletedDate = Helpers.GetInvariantCultureDateTime();
                        //    // Call the AddBedMaster Method to Add / Update current BedMaster
                        //    bedMasterBal.DeleteBedMasterById(Convert.ToInt32(facilityStructureId));
                        //}
                    }

                    currentFacilityStructure.IsDeleted = true;
                    currentFacilityStructure.DeletedBy = userid;
                    currentFacilityStructure.DeletedDate = Helpers.GetInvariantCultureDateTime();

                    // Update Operation of current FacilityStructure
                    var result = facilityStructureBal.DeleteFacilityStructureById(Convert.ToInt32(facilityStructureId));

                    // return deleted ID of current FacilityStructure as Json Result to the Ajax Call.
                    return Json(result);
                }
            }

            // Return the Json result as Action Result back JSON Call Success
            return Json(null);
        }

        /// <summary>
        /// Gets the type of the bed charges by bed.
        /// </summary>
        /// <param name="bedType">
        /// Type of the bed.
        /// </param>
        /// <returns>
        /// The <see cref="JsonResult"/>.
        /// </returns>
        public JsonResult GetBedChargesByBedType(int bedType)
        {
            //var bedRateCardBal = new BedRateCardBal();
            //var bedRate = bedRateCardBal.GetBedRateByBedTypeId(bedType);
            //return Json(bedRate, JsonRequestBehavior.AllowGet);
            return Json(0);
            //var serviceCodebalObj = new ServiceCodeBal(Helpers.DefaultServiceCodeTableNumber);
            //var obj = serviceCodebalObj.GetServiceCodeByCodeValue(bedType.ToString());
            //return Json(obj.ServiceCodePrice, JsonRequestBehavior.AllowGet);
        }

       /// <summary>
        /// Gets the bread crumbs.
        /// </summary>
        /// <param name="structureId">
        /// The structure identifier.
        /// </param>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <param name="parentId">
        /// The parent identifier.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult GetBreadCrumbs(int structureId, string facilityid, string parentId)
        {
            var bal = new FacilityStructureBal();
            var list = bal.GetFacilityStructureBreadCrumbs(structureId, facilityid, parentId);
            return Json(list);
        }

        /// <summary>
        /// Get the details of the current FacilityStructure in the view model by ID
        /// </summary>
        /// <param name="facilityStructureId">
        /// facilityStructureId
        /// </param>
        /// <returns>
        /// Partial View
        /// </returns>
        public ActionResult GetFacilityStructure(int facilityStructureId)
        {
            FacilityStructureCustomModel vm;
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                // Call the AddFacilityStructure Method to Add / Update current FacilityStructure
                var currentFacilityStructure =
                    facilityStructureBal.GetFacilityStructureById(facilityStructureId);
                //UBedMaster ubedmaster;
                var baseBalObj = new BaseBal();
                //using (var bedMasterbal = new BedMasterBal())
                //    ubedmaster = bedMasterbal.GetBedMasterByStructureId(facilityStructureId);


                vm = new FacilityStructureCustomModel
                {
                    TimingAdded = baseBalObj.GetTimingAddedById(facilityStructureId),
                    //BedTypeId =
                    //    ubedmaster != null
                    //        ? ubedmaster.BedType
                    //        : 0,
                    //BedId =
                    //    ubedmaster != null
                    //        ? ubedmaster.BedId
                    //        : 0,
                    FacilityStructureId =
                        currentFacilityStructure
                            .FacilityStructureId,
                    GlobalCodeID =
                        currentFacilityStructure
                            .GlobalCodeID,
                    FacilityStructureValue =
                        currentFacilityStructure
                            .FacilityStructureValue,
                    FacilityStructureName =
                        currentFacilityStructure
                            .FacilityStructureName,
                    Description =
                        currentFacilityStructure
                            .Description,
                    ParentId =
                        currentFacilityStructure
                            .ParentId,
                    ParentTypeGlobalID =
                        currentFacilityStructure
                            .ParentTypeGlobalID,
                    FacilityId =
                        currentFacilityStructure
                            .FacilityId,
                    SortOrder =
                        currentFacilityStructure
                            .SortOrder,
                    IsActive =
                        currentFacilityStructure
                            .IsActive,
                    CreatedBy =
                        currentFacilityStructure
                            .CreatedBy,
                    CreatedDate =
                        currentFacilityStructure
                            .CreatedDate,
                    ModifiedBy =
                        currentFacilityStructure
                            .ModifiedBy,
                    ModifiedDate =
                        currentFacilityStructure
                            .ModifiedDate,
                    IsDeleted =
                        currentFacilityStructure
                            .IsDeleted,
                    DeletedBy =
                        currentFacilityStructure
                            .DeletedBy,
                    DeletedDate =
                        currentFacilityStructure
                            .DeletedDate,
                    ExternalValue1 =
                        currentFacilityStructure
                            .ExternalValue1,
                    ExternalValue2 =
                        currentFacilityStructure
                            .ExternalValue2,
                    ExternalValue3 =
                        currentFacilityStructure
                            .ExternalValue3,
                    ExternalValue4 =
                        currentFacilityStructure
                            .ExternalValue4,
                    ExternalValue5 =
                        currentFacilityStructure
                            .ExternalValue5,
                    CanOverRideValue =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Bed)
                        && !string.IsNullOrEmpty(
                            currentFacilityStructure
                                .ExternalValue1)
                            ? "Yes"
                            : "No",
                    CanOverRide =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Bed)
                        && !string.IsNullOrEmpty(
                            currentFacilityStructure
                                .ExternalValue1),
                    AvailableInOverRideList =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Bed)
                        && !string.IsNullOrEmpty(
                            currentFacilityStructure
                                .ExternalValue2),
                    OverRidePriority =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Bed)
                        && !string.IsNullOrEmpty(
                            currentFacilityStructure
                                .ExternalValue3)
                            ? Convert.ToInt32(
                                currentFacilityStructure
                                    .ExternalValue3)
                            : 0,
                    RevenueGLAccount =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Department)
                            ? currentFacilityStructure
                                .ExternalValue1
                            : string.Empty,
                    ARMasterAccount =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Department)
                            ? currentFacilityStructure
                                .ExternalValue2
                            : string.Empty,
                    NonChargeableRoom =
                        currentFacilityStructure
                            .GlobalCodeID
                        == Convert.ToInt32(
                            BaseFacilityStucture
                                .Rooms)
                        && !string.IsNullOrEmpty(
                            currentFacilityStructure
                                .ExternalValue1)
                            ? "Yes"
                            : "No",
                    DeptClosingTime =
                        currentFacilityStructure
                            .DeptClosingTime,
                    DeptOpeningDays =
                        currentFacilityStructure
                            .DeptOpeningDays,
                    DeptOpeningTime =
                        currentFacilityStructure
                            .DeptOpeningTime,
                    DeptTurnaroundTime =
                        currentFacilityStructure
                            .DeptTurnaroundTime,
                    CorporateId =
                        baseBalObj
                            .GetCorporateIdFromFacilityId
                            (
                                Convert.ToInt32(
                                    currentFacilityStructure
                                        .FacilityId)),
                    EquipmentIds = currentFacilityStructure.EquipmentIds,
                    ServiceCodesList = new List<ServiceCode>()
                };

                if (currentFacilityStructure.GlobalCodeID == 84)
                {
                    var eqBal = new EquipmentBal();
                    var equipmentList = eqBal.GetEquipmentListByFacilityId(currentFacilityStructure.FacilityId,
                        facilityStructureId);
                    vm.EquipmentList = equipmentList;


                    //var apBal = new AppointmentTypesBal();
                    //var appointmnetList =
                    //    apBal.GetAppointmneTypesByFacilityId(Convert.ToInt32(currentFacilityStructure.FacilityId));
                    //vm.AppointmentList = appointmnetList;
                }
                else
                {
                    vm.EquipmentList = new List<EquipmentMaster>();
                    //vm.AppointmentList = new List<AppointmentTypes>();
                }
            }
            return PartialView(PartialViews.FacilityStructureAddEdit, vm);
        }

        /// <summary>
        /// Gets the facility stucture list TreeView.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult GetFacilityStuctureListTreeView()
        {
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                var facilityId = Helpers.GetDefaultFacilityId();
                var facilityStructureList =
                    facilityStructureBal.GetFacilityStructureCustom(Convert.ToString(facilityId), 0);
                return PartialView(PartialViews.FacilityStructureTreeView, facilityStructureList);
            }
        }

        /// <summary>
        /// Gets the maximum sort order.
        /// </summary>
        /// <param name="facilityId">
        /// The facility identifier.
        /// </param>
        /// <param name="structureType">
        /// Type of the structure.
        /// </param>
        /// <returns>
        /// The <see cref="JsonResult"/>.
        /// </returns>
        public JsonResult GetMaxSortOrder(string facilityId, string structureType)
        {
            using (var bal = new FacilityStructureBal())
            {
                var sortOrder = bal.GetMaxSortOrder(facilityId, structureType);
                return Json(sortOrder);
            }
        }

        /// <summary>
        /// Gets the parent value.
        /// </summary>
        /// <param name="structureId">
        /// The structure identifier.
        /// </param>
        /// <param name="facilityid">
        /// The facilityid.
        /// </param>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult GetParentValue(int structureId, string facilityid)
        {
            var bal = new FacilityStructureBal();
            var list = bal.GetFacilityStructureParent(structureId, facilityid);
            return Json(list);
        }

        /// <summary>
        /// Reset the FacilityStructure View Model and pass it to FacilityStructureAddEdit Partial View.
        /// </summary>
        /// <returns>
        /// The <see cref="ActionResult"/>.
        /// </returns>
        public ActionResult ResetFacilityStructureForm()
        {
            //var serviceCodeBal = new ServiceCodeBal(Helpers.DefaultServiceCodeTableNumber);
            //var serviceCodesList =
            //    serviceCodeBal.GetServiceCodes()
            //        .Where(x => x.CanOverRide == 1)
            //        .OrderBy(X => X.ServiceCodeValue)
            //        .ToList();

            // Intialize the new object of FacilityStructure ViewModel
            var facilityStructureViewModel = new FacilityStructureCustomModel { ServiceCodesList = new List<ServiceCode>() };

            // Pass the View Model as FacilityStructureViewModel to PartialView FacilityStructureAddEdit just to update the AddEdit partial view.
            return PartialView(PartialViews.FacilityStructureAddEdit, facilityStructureViewModel);
        }

        /// <summary>
        /// Add New or Update the FacilityStructure based on if we pass the FacilityStructure ID in the
        ///     FacilityStructureViewModel object.
        /// </summary>
        /// <param name="vm">
        /// pass the details of FacilityStructure in the view model
        /// </param>
        /// <returns>
        /// returns the newly added or updated ID of FacilityStructure row
        /// </returns>
        public ActionResult SaveFacilityStructure(FacilityStructureCustomModel vm)
        {
            // Initialize the newId variable 
            var newId = -1;
            var userid = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();

            // Check if FacilityStructureViewModel 
            if (vm != null)
            {
                using (var facilityStructureBal = new FacilityStructureBal())
                {
                    // Apply check if the data is inactive and it have cascading child with it.
                    if (!vm.IsActive)
                    {
                        var checkIfChildExist = facilityStructureBal.CheckForChildrens(vm.FacilityStructureId);
                        if (checkIfChildExist)
                            return Json(-1);
                    }

                    if (vm.FacilityStructureId > 0)
                    {
                        vm.ModifiedBy = userid;
                        vm.ModifiedDate = Helpers.GetInvariantCultureDateTime();
                    }
                    else
                    {
                        vm.CreatedBy = userid;
                        vm.CreatedDate = Helpers.GetInvariantCultureDateTime();
                    }

                    vm.IsDeleted = false;
                    var facilitysturcture = new FacilityStructure
                    {
                        FacilityStructureId =
                                                        vm.FacilityStructureId,
                        GlobalCodeID = vm.GlobalCodeID,
                        FacilityStructureValue =
                                                        vm.FacilityStructureValue,
                        FacilityStructureName =
                                                        vm.FacilityStructureName,
                        Description = vm.Description,
                        ParentId = vm.ParentId,
                        ParentTypeGlobalID =
                                                        vm.ParentTypeGlobalID,
                        FacilityId = vm.FacilityId,
                        SortOrder = vm.SortOrder,
                        IsActive = vm.IsActive,
                        CreatedBy = userid,
                        CreatedDate = currentDate,
                        ModifiedBy = vm.ModifiedBy,
                        ModifiedDate = currentDate,
                        IsDeleted = false,
                        DeletedBy = vm.DeletedBy,
                        DeletedDate = vm.DeletedDate,
                        ExternalValue1 =
                                                        vm.ExternalValue1 == "0"
                                                            ? string.Empty
                                                            : vm.ExternalValue1,
                        ExternalValue2 =
                                                        vm.ExternalValue2 == "0"
                                                            ? string.Empty
                                                            : vm.ExternalValue2,
                        ExternalValue3 =
                                                        vm.ExternalValue3 == "0"
                                                            ? string.Empty
                                                            : vm.ExternalValue3,
                        ExternalValue4 =
                                                        vm.ExternalValue4,

                        ExternalValue5 =
                                                        vm.ExternalValue5 == "0"
                                                            ? string.Empty
                                                            : vm.ExternalValue5,
                        EquipmentIds = vm.EquipmentIds
                        // DeptClosingTime =
                        // facilityStructureModel.DeptClosingTime, 
                        // DeptOpeningDays =
                        // facilityStructureModel.DeptOpeningDays, 
                        // DeptOpeningTime =
                        // facilityStructureModel.DeptOpeningTime, 
                        // DeptTurnaroundTime =
                        // facilityStructureModel.DeptTurnaroundTime, 
                    };

                    // Call the AddFacilityStructure Method to Add / Update current FacilityStructure
                    if (!facilityStructureBal.CheckStructureExist(facilitysturcture))
                    {
                        newId = facilityStructureBal.AddUptdateFacilityStructure(facilitysturcture);

                        /* On: 25 November, 2015
                         * By: Amit Jain
                         * Purpose: Add the Facility Structure reference to Equipment Master table conditionally.
                         */
                        if (!string.IsNullOrEmpty(facilitysturcture.EquipmentIds))
                        {
                            var eqList = facilitysturcture.EquipmentIds.Split(',').Select(Int32.Parse).ToList();
                            if (eqList.Count > 0)
                            {
                                using (var eBal = new EquipmentBal())
                                {
                                    eBal.AddRoomIdToEquipments(facilitysturcture.FacilityStructureId,
                                        eqList);
                                }
                            }
                        }


                        // Add Department Timmings 
                        if (newId > 0 && vm.GlobalCodeID == 83)
                        {

                            if (vm.DeptTimmingsList != null)
                            {
                                var facilityDepartmentList = new List<DeptTimming>();
                                facilityDepartmentList.AddRange(
                                    vm.DeptTimmingsList.Select(item => new DeptTimming
                                    {
                                        FacilityStructureID = newId,
                                        OpeningDayId = item.OpeningDayId,
                                        ClosingTime = item.ClosingTime,
                                        OpeningTime = item.OpeningTime,
                                        TrunAroundTime = item.TrunAroundTime,
                                        DeptTimmingId = 0,
                                        IsActive = true,
                                        CreatedBy = userid,
                                        CreatedDate = currentDate,
                                    }));
                                using (var departmentTimmingsBal = new DeptTimmingBal())
                                {
                                    departmentTimmingsBal.SaveDeptTimmingList(facilityDepartmentList);

                                }

                            }
                            else
                            {
                                using (var departmentTimmingsBal = new DeptTimmingBal())
                                {
                                    departmentTimmingsBal.DeleteDepartmentTiming(newId);

                                }
                            }
                        }
                        else if (vm.FacilityStructureId > 0
                                 && vm.GlobalCodeID == 85)
                        {
                            // ....Add Bed Master data
                            //using (var bedMasterBal = new BedMasterBal())
                            //{
                            //    var getBedMasterObj = bedMasterBal.GetBedMasterById(vm.BedId);
                            //    if (getBedMasterObj != null)
                            //    {
                            //        var ubedMasterToUpdate = new UBedMaster
                            //                                     {
                            //                                         BedId = vm.BedId,
                            //                                         FacilityId =
                            //                                             Convert.ToInt32(
                            //                                                 vm.FacilityId),
                            //                                         FacilityStructureId = newId,
                            //                                         BedType = vm.BedTypeId,
                            //                                         Rate = null,
                            //                                         StartDate =
                            //                                             vm.CreatedDate,
                            //                                         IsOccupied = getBedMasterObj.IsOccupied,
                            //                                         IsRateApplied = null,
                            //                                         SortOrder = null,
                            //                                         IsActive = true,
                            //                                         CreatedBy = getBedMasterObj.CreatedBy,
                            //                                         CreatedDate = getBedMasterObj.CreatedDate,
                            //                                         ModifiedBy =
                            //                                             vm.ModifiedBy,
                            //                                         ModifiedDate =
                            //                                             vm.ModifiedDate,
                            //                                         IsDeleted =
                            //                                             vm.IsDeleted,
                            //                                         DeletedBy =
                            //                                             vm.DeletedBy,
                            //                                         DeletedDate =
                            //                                             vm.DeletedDate
                            //                                     };

                            //        // Call the AddBedMaster Method to Add / Update current BedMaster
                            //        bedMasterBal.AddUpdateBedMaster(ubedMasterToUpdate);
                            //    }
                            //}
                        }
                        else if (vm.GlobalCodeID == 85)
                        {
                            // .... New Bed master entry
                            //using (var bedMasterBal = new BedMasterBal())
                            //{
                            //    var ubedMasterToAdd = new UBedMaster
                            //                              {
                            //                                  BedId = 0,
                            //                                  FacilityId =
                            //                                      Convert.ToInt32(
                            //                                          vm.FacilityId),
                            //                                  FacilityStructureId = newId,
                            //                                  BedType = vm.BedTypeId,
                            //                                  Rate = null,
                            //                                  StartDate = vm.CreatedDate,
                            //                                  IsOccupied = false,
                            //                                  IsRateApplied = null,
                            //                                  SortOrder = null,
                            //                                  IsActive = true,
                            //                                  CreatedBy = vm.CreatedBy,
                            //                                  CreatedDate = vm.CreatedDate,
                            //                                  ModifiedBy = vm.ModifiedBy,
                            //                                  ModifiedDate =
                            //                                      vm.ModifiedDate,
                            //                                  IsDeleted = vm.IsDeleted,
                            //                                  DeletedBy = vm.DeletedBy,
                            //                                  DeletedDate = vm.DeletedDate
                            //                              };

                            //    // Call the AddBedMaster Method to Add / Update current BedMaster
                            //    bedMasterBal.AddUpdateBedMaster(ubedMasterToAdd);
                            //}
                        }
                    }
                    else
                    {
                        return Json("isExist");
                    }
                }
            }

            return Json(newId);
        }

        /// <summary>
        /// Binds the department timmings.
        /// </summary>
        /// <param name="facilityStructureId">The facility structure identifier.</param>
        /// <returns></returns>
        public ActionResult BindDepartmentTimmings(int facilityStructureId)
        {
            var deptTimmingbal = new DeptTimmingBal();
            var deptTimmingobj = deptTimmingbal.GetDepTimingsById(facilityStructureId);
            return Json(deptTimmingobj, JsonRequestBehavior.AllowGet);
        }

        #endregion


        #region Appointment Rooms View

        public ActionResult AppointmentRoomsView()
        {
            using (var bal = new FacilityStructureBal())
            {
                var fsView = new FacilityStructureView
                {
                    FacilityStructureList = bal.GetAppointRoomAssignmentsList(Helpers.GetDefaultFacilityId(), string.Empty),
                    CurrentFacilityStructure =
                            new FacilityStructureCustomModel
                            {
                                //AppointmentList = new List<AppointmentTypes>(),
                                FacilityId = Convert.ToString(Helpers.GetDefaultFacilityId())
                            }
                };
                return View(fsView);
            }
        }

        public PartialViewResult BindAppointmentListByFacility(int facilityId)
        {
            return null;
            //using (var bal = new AppointmentTypesBal())
            //{
            //    var list = bal.GetAppointmneTypesByFacilityId(facilityId);
            //    return PartialView(PartialViews.AppointmentsListViewInFacilityStructure, list);
            //}
        }

        public ActionResult SaveAppointmentRooms(int facilityStructureId, string appointmentTypeIds)
        {
            using (var fBal = new FacilityStructureBal())
            {
                var current = fBal.GetFacilityStructureById(facilityStructureId);
                current.ExternalValue4 = !string.IsNullOrEmpty(appointmentTypeIds) ? appointmentTypeIds : string.Empty;
                fBal.AddUptdateFacilityStructure(current);
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }

        //public ActionResult GetfacilityStructureData(int id)
        //{
        //    using (var fRep=new FacilityStructureBal() )
        //    {
        //        var facilityStructure = fRep.GetFacilityStructureById(id);
        //        var jsonResult = new
        //        {
        //            facilityStructure.FacilityStructureId,
        //            facilityStructure.ParentId,
        //            facilityStructure.FacilityStructureName,
        //            facilityStructure.SortOrder,
        //            facilityStructure.Description,
        //            facilityStructure.IsActive,
        //           };

        //    }
        //}

        public ActionResult BindAppointmentRoomAssignmentList(int facilityId, string txtSearch)
        {
            using (var bal = new FacilityStructureBal())
            {
                var list = bal.GetAppointRoomAssignmentsList(facilityId, txtSearch);
                return PartialView(PartialViews.AssignedAppointmentsList, list);
            }
        }

        public ActionResult EditAppointmentTypeRoomStructure(int facilityStructureId)
        {
            using (var bal = new FacilityStructureBal())
            {
                var current = bal.GetFacilityStructureById(facilityStructureId);
                return Json(current, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion







        [HttpPost]
        public ActionResult BindGlobalCodesDropdownData(int structureId, int bedType, bool loadFacilities)
        {
            var categories = new List<string> { "5001", "1001", };
            var bedRate = "0.00";

            List<DropdownListData> list;
            var listParentStructure = new List<DropdownListData>();
            var listFacilities = new List<DropdownListData>();
            using (var bal = new GlobalCodeBal())
                list = bal.GetListByCategoriesRange(categories);


            if (loadFacilities)
            {
                var fbal = new FacilityBal();
                var userIsAdmin = Helpers.GetLoggedInUserIsAdmin();
                var cId = Helpers.GetDefaultCorporateId();
                var facId = 0;

                if (!userIsAdmin)
                    facId = Helpers.GetDefaultFacilityId();


                listFacilities = fbal.GetFacilityDropdownData(cId, facId);
            }

            if (structureId > 0)
            {
                var parentId = 0;
                switch (structureId)
                {
                    case 82:
                        parentId = 0;
                        break;
                    case 83:
                        parentId = 82;
                        break;
                    case 84:
                        parentId = 83;
                        break;
                    case 85:
                        parentId = 84;
                        break;
                }
                using (var bal = new FacilityStructureBal())
                    listParentStructure = bal.GetFacilityStructureListByParentId(parentId);
            }


            //if (structureId == 85 && bedType > 0)
            //{
            //    using (var bedRateCardBal = new BedRateCardBal())
            //        bedRate = bedRateCardBal.GetBedRateByBedTypeId(bedType);
            //}

            var jsonData = new
            {
                listFacilityStructure = list.Where(g => g.ExternalValue1.Equals("5001")).OrderBy(g => g.Value).ToList(),
                listBedTypes = list.Where(g => g.ExternalValue1.Equals("1001")).OrderBy(m => m.Text).ToList(),
                bedRate,
                listParentStructure,
                listFacilities
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }



        /// <summary>
        /// Get the details of the current FacilityStructure in the view model by ID
        /// </summary>
        /// <param name="facilityStructureId">
        /// facilityStructureId
        /// </param>
        /// <returns>
        /// Partial View
        /// </returns>
        public JsonResult GetFacilityStructureDetails(int facilityStructureId)
        {
            using (var facilityStructureBal = new FacilityStructureBal())
            {
                // Call the AddFacilityStructure Method to Add / Update current FacilityStructure
                var model =
                    facilityStructureBal.GetFacilityStructureById(facilityStructureId);

                var vm = new FacilityStructureCustomModel
                {
                    FacilityStructureId = model.FacilityStructureId,
                    GlobalCodeID = model.GlobalCodeID,
                    FacilityStructureValue = model.FacilityStructureValue,
                    FacilityStructureName = model.FacilityStructureName,
                    Description = model.Description,
                    ParentId = model.ParentId,
                    ParentTypeGlobalID = model.ParentTypeGlobalID,
                    FacilityId = model.FacilityId,
                    SortOrder = model.SortOrder,
                    IsActive = model.IsActive,
                    CreatedBy = model.CreatedBy,
                    CreatedDate = model.CreatedDate,
                    ExternalValue1 = model.ExternalValue1,
                    ExternalValue2 = model.ExternalValue2,
                    ExternalValue3 = model.ExternalValue3,
                    ExternalValue4 = model.ExternalValue4,
                    ExternalValue5 = model.ExternalValue5,
                    DeptClosingTime = model.DeptClosingTime,
                    DeptOpeningDays = model.DeptOpeningDays,
                    DeptOpeningTime = model.DeptOpeningTime,
                    DeptTurnaroundTime = model.DeptTurnaroundTime,
                };

                var parentStructureId = 0;
                var listBedTypes = new List<DropdownListData>();
                List<DropdownListData> listParentStructure;
                var listDepTimings = new List<DeptTimming>();

                var partialViewServiceCodes = string.Empty;
                var fsType = Convert.ToInt32(model.GlobalCodeID);
                switch (fsType)
                {
                    case 83:
                        var deptTimmingbal = new DeptTimmingBal();
                        listDepTimings = deptTimmingbal.GetDepTimingsById(facilityStructureId);
                        vm.RevenueGLAccount = model.ExternalValue1;
                        vm.ARMasterAccount = model.ExternalValue2;
                        parentStructureId = 82;
                        break;

                    case 84:
                        vm.NonChargeableRoom = !string.IsNullOrEmpty(model.ExternalValue1) ? "Yes" : "No";

                        parentStructureId = 83;
                        break;

                    case 85:
                        parentStructureId = 84;
                        //using (var bmBal = new BedMasterBal())
                        //{
                        //    var ubedmaster = bmBal.GetBedMasterByStructureId(facilityStructureId);
                        //    vm.BedTypeId = ubedmaster.BedType;
                        //    vm.BedId = ubedmaster.BedId;

                        //    using (var bedRateCardBal = new BedRateCardBal())
                        //        vm.BedCharge = bedRateCardBal.GetBedRateByBedTypeId(Convert.ToInt32(ubedmaster.BedType));
                        //}

                        vm.CanOverRide = !string.IsNullOrEmpty(model.ExternalValue1);
                        vm.AvailableInOverRideList = !string.IsNullOrEmpty(model.ExternalValue2);
                        vm.OverRidePriority = !string.IsNullOrEmpty(model.ExternalValue3) ? Convert.ToInt32(model.ExternalValue3) : 0;
                        vm.CanOverRideValue = !string.IsNullOrEmpty(model.ExternalValue1) ? "Yes" : "No";

                        var categories = new List<string> { "1001" };
                        using (var bal = new GlobalCodeBal())
                            listBedTypes = bal.GetListByCategoriesRange(categories);

                        if (listBedTypes.Count > 0)
                            listBedTypes = listBedTypes.OrderBy(m => m.Text).ToList();

                        partialViewServiceCodes = RenderPartialViewToString(PartialViews.BedOverrideServiceCodesList, new List<ServiceCode>());
                        break;
                }

                using (var bal = new FacilityStructureBal())
                    listParentStructure = bal.GetFacilityStructureListByParentId(parentStructureId);

                var jsonData = new
                {
                    vm,
                    listParentStructure,
                    listBedTypes,
                    listDepTimings,
                    partialViewServiceCodes
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
        }


        private string RenderPartialViewToString(string viewName, object model)
        {
            if (string.IsNullOrEmpty(viewName))
                viewName = ControllerContext.RouteData.GetRequiredString("action");

            ViewData.Model = model;

            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);

                return sw.GetStringBuilder().ToString();
            }
        }
    }


    public class FacilityDataTemp
    {
        public List<FacilityStructureCustomModel> FacStructureData { get; set; }
        public int CurrentFacilityId { get; set; }
    }
}