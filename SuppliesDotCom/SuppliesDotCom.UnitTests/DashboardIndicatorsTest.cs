using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SuppliesDotCom.UnitTests
{
    [TestClass]
    public class DashboardIndicatorsTest
    {
        #region Fields

        /// <summary>
        /// The model.
        /// </summary>
        private readonly DashboardIndicators model;

        #endregion


        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="CorporateTest"/> class.
        /// </summary>
        public DashboardIndicatorsTest()
        {
            model = new DashboardIndicators();
        }

        #endregion

        #region Public Properties

        /// <summary>
        ///     Gets or sets the test context which provides
        ///     information about and functionality for the current test run.
        /// </summary>
        public TestContext TestContext { get; set; }

        #endregion

        [TestMethod]
        public void CheckActiveInactive()
        {
            model.IndicatorNumber = "227";
            model.CorporateId = 12;
            model.FacilityId = 17;
            model.IsActive = 1;
            model.SubCategory1 = "0";
            model.SubCategory2 = "0";
            using (var dashbal = new DashboardIndicatorsBal())
            {
                //dashbal.MakeIndicatorInActive(model);

                using (var mBal = new ManualDashboardBal())
                {
                    IEnumerable<DashboardIndicatorData> mList
                        = mBal.GetIndicatorsDataForIndicatorNumber(Convert.ToInt32(model.CorporateId), Convert.ToInt32(model.FacilityId),
                        "2016", model.IndicatorNumber, "1", "0", "0");
                    Assert.IsNotNull(mList);

                    dashbal.UpdateIndicatorsOtherDetail(model);

                    IEnumerable<DashboardIndicatorData> mList1
                        = mBal.GetIndicatorsDataForIndicatorNumber(Convert.ToInt32(model.CorporateId), Convert.ToInt32(model.FacilityId),
                        "2016", model.IndicatorNumber, "1", "0", "0");

                    DashboardIndicatorData dashboardObj = mList.FirstOrDefault();
                    if (dashboardObj != null) Assert.AreEqual(dashboardObj.IsActive, false);
                    model.IsActive = 0;
                    dashbal.UpdateIndicatorsOtherDetail(model);
                    //if (Convert.ToBoolean(mList.))
                    // {
                    //     model.IsActive = 1;
                    //     dashbal.MakeIndicatorInActive(model);
                    // }

                }

            }
        }

    }
}
