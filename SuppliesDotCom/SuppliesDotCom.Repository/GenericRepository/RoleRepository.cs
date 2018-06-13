using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class RoleRepository : GenericRepository<Role>
    {
        public RoleRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
