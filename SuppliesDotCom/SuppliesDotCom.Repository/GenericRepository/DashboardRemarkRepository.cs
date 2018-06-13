using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class DashboardRemarkRepository : GenericRepository<DashboardRemark>
    {
        public DashboardRemarkRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
