using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class EquipmentRepository : GenericRepository<EquipmentMaster>
    {
        public EquipmentRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
