// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CorporateTest.cs" company="SPadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   Summary description for CorporateTest
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace SuppliesDotCom.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using SuppliesDotCom.Bal.BusinessAccess;
    using SuppliesDotCom.Model;
    using SuppliesDotCom.Model.CustomModel;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    /// <summary>
    ///     Summary description for CorporateTest
    /// </summary>
    [TestClass]
    public class CorporateTest
    {
        #region Fields

        /// <summary>
        /// The model.
        /// </summary>
        private readonly Corporate model;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="CorporateTest"/> class.
        /// </summary>
        public CorporateTest()
        {
            this.model = new Corporate();
        }

        #endregion

        #region Public Properties

        /// <summary>
        ///     Gets or sets the test context which provides
        ///     information about and functionality for the current test run.
        /// </summary>
        public TestContext TestContext { get; set; }

        #endregion

        // You can use the following additional attributes as you write your tests:
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup()
        // {
        // using (var corporateBal = new CorporateBal())
        // {
        // corporateBal.DeleteCorporateData(model.CorporateID);
        // }
        // }
        // Use TestInitialize to run code before running each test 
        #region Public Methods and Operators

        /// <summary>
        ///     The test method 1.
        /// </summary>
        [TestMethod]
        public void CreateCorporate()
        {
            using (var corporateBal = new CorporateBal())
            {
                this.model.CorporateName = this.GetRandomString(10);
                this.model.CorporateNumber = this.GetRandomStringNumber(4);
                this.model.CountryID = "45";
                this.model.StateID = "3";
                this.model.CityID = "3";
                this.model.CreatedBy = 9999;
                this.model.CreatedDate = DateTime.Now;
                this.model.DefaultCPTTableNumber = "4010";
                this.model.BillEditRuleTableNumber = "100";

                corporateBal.AddUptdateCorporate(this.model); // ... Create new corporate
                int corporateId = this.model.CorporateID;

                IEnumerable<Facility> facilitylistObj = new FacilityBal().GetFacilitiesByCorpoarteId(corporateId);
                    
                    // .... Get the facilities for the newly created Corporate
                Assert.IsNotNull(facilitylistObj); // .... check if the cororate facility created on not
                Assert.IsTrue(facilitylistObj.Any()); // .... check if there is any oject in the list
                if (facilitylistObj.Any())
                {
                    Facility facilityobj = facilitylistObj.FirstOrDefault();

                    // .... Assertion below
                    Assert.AreEqual(facilityobj.CorporateID, this.model.CorporateID);
                    Assert.IsTrue(facilityobj.FacilityName.Contains(this.model.CorporateName.Substring(0, 3)));

                    SuppliesDotComParametersBal balBSP = new SuppliesDotComParametersBal();
                    var facilityparmaters = balBSP.GetDetailsByCorporateAndFacility(
                        corporateId,
                        facilityobj.FacilityNumber);
                    Assert.IsTrue(facilityparmaters != null);
                    Assert.IsTrue(facilityparmaters.CPTTableNumber == this.model.DefaultCPTTableNumber);
                    Assert.IsTrue(facilityparmaters.BillEditRuleTableNumber == this.model.BillEditRuleTableNumber);

                    // ... Facilitystructure Checks
                    List<FacilityStructureCustomModel> facilityStructureList =
                        new FacilityStructureBal().GetFacilityStructure(facilityobj.FacilityId.ToString());
                    Assert.IsTrue(facilityStructureList.Any());

                    // ... UBed Master Checks
                    IEnumerable<BedMasterCustomModel> ubedMasterobjList =
                        new BedMasterBal().GetBedMasterListByRole(facilityobj.FacilityId, this.model.CorporateID);
                    Assert.IsTrue(ubedMasterobjList.Any());

                    // ... Role Creation Checks
                    List<Role> rolesList = new RoleBal().GetRolesByCorporateIdFacilityId(
                        this.model.CorporateID, 
                        facilityobj.FacilityId);
                    Assert.IsTrue(rolesList.Any());

                    // ... Facility Roles Creation Checks
                    List<FacilityRoleCustomModel> facilityRoleList =
                        new FacilityRoleBal().GetFacilityRoleListByFacility(
                            this.model.CorporateID, 
                            facilityobj.FacilityId, 
                            0);
                    Assert.IsTrue(facilityRoleList.Any());

                    // ... users Creation Checks
                    List<UsersCustomModel> usersList =
                        new UsersBal().GetUsersByCorporateIdFacilityId(this.model.CorporateID, facilityobj.FacilityId);
                    Assert.IsTrue(usersList.Any());

                    // ... UserRole Creation Checks
                    // var userRoleList = new UserRoleBal().GetUserRolesByCorporateFacilityAndUserId(
                    // model.CorporateID,
                    // facilityobj.FacilityId);
                    // Assert.IsTrue(usersList.Any());

                    // ... ModuleAccess Creation Checks
                    List<ModuleAccess> moduleAccessList =
                        new ModuleAccessBal().GetModulesAccessList(this.model.CorporateID, facilityobj.FacilityId);
                    Assert.IsTrue(moduleAccessList.Any());

                    // ... DashboardIndicator Creation Checks
                    // var dashBoardIndicatorsList = new DashboardIndicatorDataBal().GetDashboardIndicatorDataList(
                    // model.CorporateID,
                    // facilityobj.FacilityId);
                    // Assert.IsTrue(dashBoardIndicatorsList.Any());
                }

                corporateBal.DeleteCorporateData(this.model.CorporateID.ToString()); // ...clean Data after Test
                Corporate corporateAftertest = corporateBal.GetCorporateById(this.model.CorporateID);
                Assert.IsNull(corporateAftertest);
            }
        }

        /// <summary>
        /// Gets the random string.
        /// </summary>
        /// <param name="length">
        /// The length.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string GetRandomString(int length)
        {
            const string Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(Chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        /// <summary>
        /// Gets the random string number.
        /// </summary>
        /// <param name="length">
        /// The length.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string GetRandomStringNumber(int length)
        {
            const string Chars = "0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(Chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        /// <summary>
        /// The my test cleanup.
        /// </summary>
        [TestCleanup]
        public void MyTestCleanup()
        {
            using (var corporateBal = new CorporateBal())
            {
                corporateBal.DeleteCorporateData(this.model.CorporateID.ToString());
            }
        }

        /// <summary>
        /// The my test initialize.
        /// </summary>
        [TestInitialize]
        public void MyTestInitialize()
        {
        }

        #endregion
    }
}