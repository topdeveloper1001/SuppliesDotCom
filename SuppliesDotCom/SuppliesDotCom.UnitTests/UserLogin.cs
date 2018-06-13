// --------------------------------------------------------------------------------------------------------------------
// <copyright file="UserLogin.cs" company="Spadez">
//   OmniHeathCare
// </copyright>
// <summary>
//   The user login.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.UnitTests
{
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;

using Microsoft.VisualStudio.TestTools.UnitTesting;

    /// <summary>
    /// The user login.
    /// </summary>
    [TestClass]
    public class UserLogin
    {
        #region Fields

        /// <summary>
        /// The model.
        /// </summary>
        private readonly Users model;

        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="UserLogin"/> class.
        /// </summary>
        public UserLogin()
        {
            this.model = new Users();
        }

        #endregion

        #region Public Methods and Operators

        /// <summary>
        /// The check if both username and password empty.
        /// </summary>
        [TestMethod]
        public void CheckIfBothUsernameAndPasswordEmpty()
        {
            using (var bal = new UsersBal())
            {
                /* Uncomment the below 2 lines to pass this Test Method */
                this.model.UserName = "kperry";
                this.model.Password = "Loveme7070";

                Users usersViewModel = bal.GetUser(this.model.UserName, this.model.Password);
                Assert.IsTrue(
                    usersViewModel != null && !string.IsNullOrEmpty(this.model.UserName)
                    && !string.IsNullOrEmpty(this.model.Password));
            }
        }

        /// <summary>
        /// Checks if user exists.
        /// </summary>
        [TestMethod]
        public void CheckIfUserExists()
        {
            using (var bal = new UsersBal())
            {
                /* Uncomment the below 2 lines to pass this Test Method */
                this.model.UserName = "kperry";
                this.model.Password = "Loveme7070";

                Users usersViewModel = bal.GetUser(this.model.UserName, this.model.Password);
                Assert.IsNotNull(this.model);
                Assert.IsNotNull(usersViewModel);
                Assert.AreEqual(this.model.UserName, usersViewModel.UserName);
            }
        }

        #endregion
    }
}
