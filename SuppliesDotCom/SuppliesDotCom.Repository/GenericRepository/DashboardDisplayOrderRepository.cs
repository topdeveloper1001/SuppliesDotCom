using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class DashboardDisplayOrderRepository : GenericRepository<DashboardDisplayOrder>
    {
        public DashboardDisplayOrderRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
