using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class FacilityDepartmentRepository : GenericRepository<FacilityDepartment>
    {
        public FacilityDepartmentRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
