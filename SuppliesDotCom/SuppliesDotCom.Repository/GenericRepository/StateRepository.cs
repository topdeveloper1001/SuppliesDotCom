using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class StateRepository :GenericRepository<State>
    {
        public StateRepository(BillingEntities context)
            : base(context)
        { }
    }
}
