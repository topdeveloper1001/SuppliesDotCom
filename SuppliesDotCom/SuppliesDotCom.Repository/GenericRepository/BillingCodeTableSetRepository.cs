using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class BillingCodeTableSetRepository : GenericRepository<BillingCodeTableSet>
    {
        public BillingCodeTableSetRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
