// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DeptTimmingRepository.cs" company="SPadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The dept timming repository.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom.Repository.GenericRepository
{
    using SuppliesDotCom.Model;

    /// <summary>
    /// The dept timming repository.
    /// </summary>
    public class DeptTimmingRepository : GenericRepository<DeptTimming>
    {
        #region Constructors and Destructors

        /// <summary>
        /// Initializes a new instance of the <see cref="DeptTimmingRepository"/> class.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        public DeptTimmingRepository(BillingEntities context)
            : base(context)
        {
            this.AutoSave = true;
        }

        #endregion
    }
}