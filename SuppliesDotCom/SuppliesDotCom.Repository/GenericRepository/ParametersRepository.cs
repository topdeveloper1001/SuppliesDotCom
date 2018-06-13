using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class ParametersRepository : GenericRepository<Parameters>
    {
        public ParametersRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
