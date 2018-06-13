using System;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class ProjectTargetsMapper : Mapper<ProjectTargets, ProjectTargetsCustomModel>
    {
        public override ProjectTargetsCustomModel MapModelToViewModel(ProjectTargets model)
        {
            var vm = base.MapModelToViewModel(model);
            if (vm != null)
            {
                using (var bal = new BaseBal())
                {
                    vm.TargetPercentageValueStr = bal.GetNameByGlobalCodeValue(Convert.ToString(model.TargetedCompletionValue),
                   Convert.ToString((int)GlobalCodeCategoryValue.ProjectsPercentageValue));
                }
            }
            return vm;
        }
    }
}
