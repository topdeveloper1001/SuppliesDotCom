using AutoMapper;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model.EntityDto;
using SuppliesDotCom.Model.Model;

namespace SuppliesDotCom.Bal.Mapper
{
    public class CommonMapperProfile : Profile
    {
        public CommonMapperProfile()
        {
            //Create Users Entity Mapping
            CreateMap<Users, UserDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(o => string.Format("{0} {1}", o.FirstName, o.LastName)))
                .ReverseMap();

        }
    }
}
