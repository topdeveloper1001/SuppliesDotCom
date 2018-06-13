using SuppliesDotCom.Model;


namespace SuppliesDotCom.Repository.GenericRepository
{
    public class RolePermissionRepository : GenericRepository<RolePermission>
    {
        public RolePermissionRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }

    }
}
