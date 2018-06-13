// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FacilityStructureCustomModel.cs" company="">
//   
// </copyright>
// <summary>
//   Defines the FacilityStructureCustomModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace SuppliesDotCom.Model.CustomModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    ///     Facility Structure Custom Model
    /// </summary>
    [NotMapped]
    public class FacilityStructureCustomModel : FacilityStructure
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the ar master account.
        /// </summary>
        public string ARMasterAccount { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether available in over ride list.
        /// </summary>
        public bool AvailableInOverRideList { get; set; }

        /// <summary>
        /// Gets or sets the bed charge.
        /// </summary>
        public string BedCharge { get; set; }

        /// <summary>
        /// Gets or sets the bed id.
        /// </summary>
        public int BedId { get; set; }

        /// <summary>
        /// Gets or sets the bed type id.
        /// </summary>
        public int? BedTypeId { get; set; }

        /// <summary>
        /// Gets or sets the bed type name.
        /// </summary>
        public string FacilityStrucutureTypeName { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether can over ride.
        /// </summary>
        public bool CanOverRide { get; set; }

        /// <summary>
        /// Gets or sets the can over ride value.
        /// </summary>
        public string CanOverRideValue { get; set; }

        /// <summary>
        /// Gets or sets the facility name.
        /// </summary>
        public string FacilityName { get; set; }

        /// <summary>
        /// Gets or sets the global code id value.
        /// </summary>
        public string GlobalCodeIdValue { get; set; }

        /// <summary>
        /// Gets or sets the grid type.
        /// </summary>
        public int GridType { get; set; }

        /// <summary>
        /// Gets or sets the non chargeable room.
        /// </summary>
        public string NonChargeableRoom { get; set; }

        /// <summary>
        /// Gets or sets the over ride priority.
        /// </summary>
        public int OverRidePriority { get; set; }

        /// <summary>
        /// Gets or sets the parent id value.
        /// </summary>
        public string ParentIdValue { get; set; }

        /// <summary>
        /// Gets or sets the revenue gl account.
        /// </summary>
        public string RevenueGLAccount { get; set; }

        /// <summary>
        /// Gets or sets the service codes list.
        /// </summary>
        public List<ServiceCode> ServiceCodesList { get; set; }

        /// <summary>
        /// Gets or sets the department working days.
        /// </summary>
        /// <value>
        /// The department working days.
        /// </value>
        public string DepartmentWorkingDays { get; set; }

        /// <summary>
        /// Gets or sets the department working timming.
        /// </summary>
        /// <value>
        /// The department working timming.
        /// </value>
        public string DepartmentWorkingTimming { get; set; }

        /// <summary>
        /// Gets or sets the dept timmings list.
        /// </summary>
        /// <value>
        /// The dept timmings list.
        /// </value>
        public List<DeptTimming> DeptTimmingsList { get; set; }

        /// <summary>
        /// Gets or sets the corporate identifier.
        /// </summary>
        /// <value>
        /// The corporate identifier.
        /// </value>
        public int CorporateId { get; set; }

        public string AppointmentType { get; set; }

        public List<EquipmentMaster> EquipmentList { get; set; }

        //public List<AppointmentTypes> AppointmentList { get; set; }

        public string TimingAdded { get; set; }

        public string RoomDepartment { get; set; }

        public string BedType { get; set; }

        #endregion
    }

    /// <summary>
    /// FacilityStructureRooms Custom model
    /// </summary>
    public class FacilityStructureRoomsCustomModel
    {
        /// <summary>
        /// Gets or sets the facility structure identifier.
        /// </summary>
        /// <value>
        /// The facility structure identifier.
        /// </value>
        public int FacilityStructureId { get; set; }
        
        /// <summary>
        /// Gets or sets the name of the facility structure.
        /// </summary>
        /// <value>
        /// The name of the facility structure.
        /// </value>
        public string FacilityStructureName { get; set; }
        
        /// <summary>
        /// Gets or sets the parent identifier.
        /// </summary>
        /// <value>
        /// The parent identifier.
        /// </value>
        public Nullable<int> ParentId { get; set; }
        
        /// <summary>
        /// Gets or sets the facility identifier.
        /// </summary>
        /// <value>
        /// The facility identifier.
        /// </value>
        public string FacilityId { get; set; }
        
        /// <summary>
        /// Gets or sets the sort order.
        /// </summary>
        /// <value>
        /// The sort order.
        /// </value>
        public Nullable<int> SortOrder { get; set; }
        
        /// <summary>
        /// Gets or sets a value indicating whether this instance is active.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance is active; otherwise, <c>false</c>.
        /// </value>
        public bool IsActive { get; set; }

        /// <summary>
        /// Gets or sets the name of the parent.
        /// </summary>
        /// <value>
        /// The name of the parent.
        /// </value>
        public string ParentName { get; set; }

        public string Description { get; set; }

    }
}