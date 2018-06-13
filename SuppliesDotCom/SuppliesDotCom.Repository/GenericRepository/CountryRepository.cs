using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class CountryRepository :GenericRepository<Country>
    {
        public CountryRepository(BillingEntities context)
            : base(context)
        { }
    }
}
