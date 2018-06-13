using SuppliesDotCom.Model.EntityDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SuppliesDotCom.Bal.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> AuthenticateAsync(string username, string password, string deviceToken, string platform, bool isPatient = false);
        Task<UserDto> GetUserAsync(long userId, bool isPatient = true, string deviceToken = "", string platform = "");
        Task<bool> SaveUserLocationAsync(string lat, string lng, long userId, bool isPatient = true);
        Task<List<PatientDto>> GetPatientsByUserIdAsync(long userId = 0);
    }
}
