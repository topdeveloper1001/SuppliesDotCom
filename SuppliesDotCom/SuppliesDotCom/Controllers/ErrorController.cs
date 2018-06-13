using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SuppliesDotCom.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /Error/
        public ViewResult Index()
        {
            return View("Error");
        }

        public ViewResult NotFound()
        {
            Response.StatusCode = 404;  //you may want to set this to 200
            return View("NotFound");
        }

        public ViewResult UnauthorisedAccess()
        {
            Response.StatusCode = 403;  //you may want to set this to 200
            return View("UnauthorisedAccess");
        }
    }
}