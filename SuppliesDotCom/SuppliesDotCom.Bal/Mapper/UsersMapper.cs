using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model.EntityDto;

namespace SuppliesDotCom.Bal.Mapper
{
    public class UsersMapper : Mapper<Users, UsersViewModel>
    {
        public override UsersViewModel MapModelToViewModel(Users model)
        {
            var vm = base.MapModelToViewModel(model);
            return vm;
        }
    }


    public class UserDtoMapper : Mapper<Users, UserDto>
    {
        public override UserDto MapModelToViewModel(Users model)
        {
            var vm = base.MapModelToViewModel(model);
            vm.Name = $"{model.FirstName} {model.LastName}";
            return vm;
        }
    }
}
