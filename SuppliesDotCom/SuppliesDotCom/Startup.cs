using Hangfire;
using System.Configuration;
using Owin;

namespace SuppliesDotCom
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            GlobalConfiguration.Configuration.UseSqlServerStorage(
                ConfigurationManager.ConnectionStrings["BillingEntities"].ConnectionString);

            app.UseHangfireDashboard();
            app.UseHangfireServer();
        }
    }
}