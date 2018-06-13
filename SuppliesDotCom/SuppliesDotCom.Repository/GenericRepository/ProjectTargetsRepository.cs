using SuppliesDotCom.Model;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class ProjectTargetsRepository : GenericRepository<ProjectTargets>
    {
        public ProjectTargetsRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
        }
    }
}
