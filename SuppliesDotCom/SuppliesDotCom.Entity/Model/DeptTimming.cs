// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DeptTimming.cs" company="Spadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The dept timming.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// The dept timming.
    /// </summary>
    public class DeptTimming
    {
        #region Properties
        /// <summary>
        /// Gets or sets the timing identifier.
        /// </summary>
        /// <value>
        /// The timing identifier.
        /// </value>
        [Key]
        public int DeptTimmingId { get; set; }

        /// <summary>
        /// Gets or sets the facility structure identifier.
        /// </summary>
        /// <value>
        /// The facility structure identifier.
        /// </value>
        public int FacilityStructureID { get; set; }

        /// <summary>
        /// Gets or sets the opening day identifier.
        /// </summary>
        /// <value>
        /// The opening day identifier.
        /// </value>
        public string OpeningDayId { get; set; }

        /// <summary>
        /// Gets or sets the opening time.
        /// </summary>
        /// <value>
        /// The opening time.
        /// </value>
        public string OpeningTime { get; set; }

        /// <summary>
        /// Gets or sets the closing time.
        /// </summary>
        /// <value>
        /// The closing time.
        /// </value>
        public string ClosingTime { get; set; }

        /// <summary>
        /// Gets or sets the trun around time.
        /// </summary>
        /// <value>
        /// The trun around time.
        /// </value>
        public string TrunAroundTime { get; set; }

        /// <summary>
        /// Gets or sets the is active.
        /// </summary>
        /// <value>
        /// The is active.
        /// </value>
        public bool IsActive { get; set; }

        /// <summary>
        /// Gets or sets the created by.
        /// </summary>
        /// <value>
        /// The created by.
        /// </value>
        public int CreatedBy { get; set; }

        /// <summary>
        /// Gets or sets the created date.
        /// </summary>
        /// <value>
        /// The created date.
        /// </value>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets the modified by.
        /// </summary>
        /// <value>
        /// The modified by.
        /// </value>
        public int ModifiedBy { get; set; }

        /// <summary>
        /// Gets or sets the modified date.
        /// </summary>
        /// <value>
        /// The modified date.
        /// </value>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Gets or sets the ext value1.
        /// </summary>
        /// <value>
        /// The ext value1.
        /// </value>
        public string ExtValue1 { get; set; }

        /// <summary>
        /// Gets or sets the ext value2.
        /// </summary>
        /// <value>
        /// The ext value2.
        /// </value>
        public string ExtValue2 { get; set; }

        #endregion
    }
}