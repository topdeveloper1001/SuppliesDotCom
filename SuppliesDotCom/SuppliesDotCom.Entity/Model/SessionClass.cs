// --------------------------------------------------------------------------------------------------------------------
// <copyright file="SessionClass.cs" company="Spadez">
//   Omnihealthcare
// </copyright>
// <Owner>
// Shashank
// </Owner>
// <summary>
//   The session class.
// </summary>
// --------------------------------------------------------------------------------------------------------------------




namespace SuppliesDotCom.Model
{
    using System.Collections.Generic;

    using SuppliesDotCom.Model;

    /// <summary>
    /// The session class.
    /// </summary>
    public class SessionClass
    {
        /// <summary>
        /// Gets or sets the user name.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Gets or sets the facility number.
        /// </summary>
        public string FacilityNumber { get; set; }

        /// <summary>
        /// Gets or sets the role id.
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// Gets or sets the facility id.
        /// </summary>
        public int FacilityId { get; set; }

        /// <summary>
        /// Gets or sets the corporate id.
        /// </summary>
        public int CorporateId { get; set; }

        /// <summary>
        /// Gets or sets the menu session list.
        /// </summary>
        public IEnumerable<Tabs> MenuSessionList { get; set; }

        /// <summary>
        /// Gets or sets the role name.
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// Gets or sets the facility name.
        /// </summary>
        public string FacilityName { get; set; }

        /// <summary>
        /// Gets or sets the user id.
        /// </summary>
        public int UserId { get; set; }

        public long DefaultCountryId { get; set; }

        /// <summary>
        /// Gets or sets the time zone.
        /// </summary>
        public string TimeZone { get; set; }

        /// <summary>
        /// Gets or sets the sys admin corporate id.
        /// </summary>
        public int SysAdminCorporateId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether first time login.
        /// </summary>
        public bool FirstTimeLogin { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether user is admin.
        /// </summary>
        public bool UserIsAdmin { get; set; }

        /// <summary>
        /// Gets or sets the selected culture.
        /// </summary>
        public string SelectedCulture { get; set; }

        /// <summary>
        /// Gets or sets the auto log off minutes.
        /// </summary>
        public decimal AutoLogOffMinutes { get; set; }

        /// <summary>
        /// Gets or sets the login user type.
        /// </summary>
        public int LoginUserType { get; set; }

        /// <summary>
        /// Gets or sets the nav tab id.
        /// </summary>
        public string NavTabId { get; set; }

        /// <summary>
        /// Gets or sets the nav parent tab id.
        /// </summary>
        public string NavParentTabId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is ehr accessible.
        /// </summary>
        public bool IsEhrAccessible { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is active encounters accessible.
        /// </summary>
        public bool IsActiveEncountersAccessible { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is bill header view accessible.
        /// </summary>
        public bool IsBillHeaderViewAccessible { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is authorization accessible.
        /// </summary>
        public bool IsAuthorizationAccessible { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether is patient search accessible.
        /// </summary>
        public bool IsPatientSearchAccessible { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether schedular accessible.
        /// </summary>
        public bool SchedularAccessible { get; set; }

        /// <summary>
        /// Gets or sets the user email.
        /// </summary>
        public string UserEmail { get; set; }

        /// <summary>
        /// Gets or sets the cpt table number.
        /// </summary>
        public string CptTableNumber { get; set; }

        /// <summary>
        /// Gets or sets the service code table number.
        /// </summary>
        public string ServiceCodeTableNumber { get; set; }

        /// <summary>
        /// Gets or sets the drug table number.
        /// </summary>
        public string DrugTableNumber { get; set; }

        /// <summary>
        /// Gets or sets the drg table number.
        /// </summary>
        public string DrgTableNumber { get; set; }

        /// <summary>
        /// Gets or sets the diagnosis code table number.
        /// </summary>
        public string DiagnosisCodeTableNumber { get; set; }

        /// <summary>
        /// Gets or sets the hc pcs table number.
        /// </summary>
        public string HcPcsTableNumber { get; set; }

        /// <summary>
        /// Gets or sets the bill edit rule table number.
        /// </summary>
        public string BillEditRuleTableNumber { get; set; }

        public string RoleKey { get; set; }

        public int CountryId { get; set; }
    }
}