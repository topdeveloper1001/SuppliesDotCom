using System;
using System.Web;
using System.Web.Mvc;

namespace SuppliesDotCom.Controllers
{
    public class BSAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return (httpContext.Session["UserId"] != null ? true : false);
        }
    }
    public class AjaxAttribute : ActionMethodSelectorAttribute
    {
        public override bool IsValidForRequest(ControllerContext controllerContext, System.Reflection.MethodInfo methodInfo)
        {
            return controllerContext.RequestContext.HttpContext.Request.IsAjaxRequest();
        }
    }
    public class AdminAttribute : ActionMethodSelectorAttribute
    {
        public override bool IsValidForRequest(ControllerContext controllerContext, System.Reflection.MethodInfo methodInfo)
        {
            return Convert.ToBoolean(controllerContext.HttpContext.Session["IsAdmin"]);
        }
    }
}