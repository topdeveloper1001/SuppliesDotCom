// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FilterConfig.cs" company="Spadez">
//   Omnihealthcare
// </copyright>
// <summary>
//   The filter config.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom
{
    using System.Web.Mvc;

    /// <summary>
    /// The filter config.
    /// </summary>
    public class FilterConfig
    {
        #region Public Methods and Operators

        /// <summary>
        /// The register global filters.
        /// </summary>
        /// <param name="filters">
        /// The filters.
        /// </param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new ElmahErrorAttribute());
            filters.Add(new HandleErrorAttribute());
        }

        #endregion
    }
}