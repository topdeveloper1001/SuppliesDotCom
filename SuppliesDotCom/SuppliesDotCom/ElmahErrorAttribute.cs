// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ElmahErrorAttribute.cs" company="Spadez">
//   OmniHealthcare
// </copyright>
// <summary>
//   The elmah error attribute.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace SuppliesDotCom
{
    using System.Web;
    using System.Web.Mvc;

    using Elmah;

    /// <summary>
    ///     The elmah error attribute.
    /// </summary>
    public class ElmahErrorAttribute : HandleErrorAttribute
    {
        #region Public Methods and Operators

        /// <summary>
        /// The on exception.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        public override void OnException(ExceptionContext context)
        {
            base.OnException(context);

            // Commented the below code as it is not working
            // but we need this for future purpose
            // if (!context.ExceptionHandled       // if unhandled, will be logged anyhow
            // || TryRaiseErrorSignal(context) // prefer signaling, if possible
            // || IsFiltered(context))         // filtered?
            // return;
            LogException(context);
        }

        #endregion

        #region Methods

        /// <summary>
        /// The get http context impl.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <returns>
        /// The <see cref="HttpContext"/>.
        /// </returns>
        private static HttpContext GetHttpContextImpl(HttpContextBase context)
        {
            return context.ApplicationInstance.Context;
        }

        /// <summary>
        /// Determines whether the specified context is filtered.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        private static bool IsFiltered(ExceptionContext context)
        {
            var config = context.HttpContext.GetSection("elmah/errorFilter") as ErrorFilterConfiguration;

            if (config == null)
            {
                return false;
            }

            var testContext = new ErrorFilterModule.AssertionHelperContext(
                context.Exception, 
                GetHttpContextImpl(context.HttpContext));
            return config.Assertion.Test(testContext);
        }

        /// <summary>
        /// Logs the exception.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        private static void LogException(ExceptionContext context)
        {
            HttpContext httpContext = GetHttpContextImpl(context.HttpContext);
            var error = new Error(context.Exception, httpContext);
            ErrorLog.GetDefault(httpContext).Log(error);
        }

        /// <summary>
        /// Tries the raise error signal.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        private static bool TryRaiseErrorSignal(ExceptionContext context)
        {
            HttpContext httpContext = GetHttpContextImpl(context.HttpContext);
            if (httpContext == null)
            {
                return false;
            }

            ErrorSignal signal = ErrorSignal.FromContext(httpContext);
            if (signal == null)
            {
                return false;
            }

            signal.Raise(context.Exception, httpContext);
            return true;
        }

        #endregion
    }
}