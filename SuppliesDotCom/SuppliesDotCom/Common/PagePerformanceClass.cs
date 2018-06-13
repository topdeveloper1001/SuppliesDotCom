// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PagePerformanceClass.cs" company="Spadez">
//   OmniHealth Care
// </copyright>
// <Author>
// Shashank Awasthy
// </Author>
// <summary>
//   The page performance class.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Common
{
    using System;

    /// <summary>
    /// The page performance class.
    /// </summary>
    public class PagePerformanceClass
    {
        #region Public Properties

        /// <summary>
        /// Gets or sets the action name.
        /// </summary>
        public string ActionName { get; set; }

        /// <summary>
        /// Gets or sets the controller name.
        /// </summary>
        public string ControllerName { get; set; }

        /// <summary>
        /// Gets or sets the created date.
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets the createdby.
        /// </summary>
        public int? Createdby { get; set; }

        /// <summary>
        /// Gets or sets the loading time.
        /// </summary>
        public string LoadingTime { get; set; }

        #endregion
    }
}