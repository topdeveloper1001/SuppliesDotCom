using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class UserRoleRepository : GenericRepository<UserRole>
    {
        public UserRoleRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
