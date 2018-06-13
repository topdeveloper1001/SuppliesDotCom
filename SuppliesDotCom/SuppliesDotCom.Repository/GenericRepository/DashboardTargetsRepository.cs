using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class DashboardTargetsRepository : GenericRepository<DashboardTargets>
    {
        public DashboardTargetsRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
