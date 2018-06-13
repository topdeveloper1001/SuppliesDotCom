using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.Mapper
{
    public class GlobalCodesMapper : Mapper<GlobalCodes, GlobalCodeCustomModel>
    {
        public override GlobalCodeCustomModel MapModelToViewModel(GlobalCodes model)
        {
            var vm = base.MapModelToViewModel(model);
            if (vm != null)
            {
                using (var bal = new BaseBal())
                {
                    vm.GlobalCodeCustomValue = bal.GetGlobalCategoryNameById(model.GlobalCodeCategoryValue);
                }
            }
            return vm;
        }
    }
}
