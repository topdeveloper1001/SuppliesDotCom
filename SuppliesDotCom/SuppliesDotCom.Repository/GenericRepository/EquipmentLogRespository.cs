using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class EquipmentLogRespository : GenericRepository<EquipmentLog>
    {
        public EquipmentLogRespository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
