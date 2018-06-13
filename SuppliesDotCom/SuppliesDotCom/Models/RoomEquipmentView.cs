// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RoomEquipmentView.cs" company="Spadez">
//   Room Equipment Custom view
// </copyright>
// <summary>
//   The room equipment view.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Models
{
using System.Collections.Generic;

using SuppliesDotCom.Model.CustomModel;

    /// <summary>
    /// The room equipment view.
    /// </summary>
    public class RoomEquipmentView
    {
        /// <summary>
        /// Gets or sets the g clist view.
        /// </summary>
        /// <value>
        /// The g clist view.
        /// </value>
        public List<GlobalCodeCustomDModel> GClistView { get; set; }

        /// <summary>
        /// Gets or sets the gc current data view.
        /// </summary>
        /// <value>
        /// The gc current data view.
        /// </value>
        public GlobalCodeCustomDModel GCCurrentDataView { get; set; }
    }
}