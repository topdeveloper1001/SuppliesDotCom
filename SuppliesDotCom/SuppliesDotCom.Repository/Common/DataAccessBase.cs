using System;
using SuppliesDotCom.Common;

namespace SuppliesDotCom.Repository.Common
{
    public class DataAccessBase : IDisposable
    {
        #region Property Declarations

        public AuthorizedInfo AuthorizedInfo { get; set; }
        
        #endregion Property Declarations

        #region Constructor and Destructors


        #region IDisposable Members

        /// <summary>
        /// Releases all resources used by this object.
        /// </summary>
        /// <remarks>
        /// Calling Dispose allows the resources used by this object to 
        /// be reallocated for other purposes.
        /// </remarks>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases all resources used by this object.
        /// </summary>
        /// <remarks>
        /// Calling Dispose allows the resources used by this object to be reallocated for other purposes.
        /// </remarks>
        /// <param name="disposing"><see langword="true"/>/<see langword="false"/>.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                
            }
        }


        #endregion

        #endregion Constructor and Destructors

    }
}
