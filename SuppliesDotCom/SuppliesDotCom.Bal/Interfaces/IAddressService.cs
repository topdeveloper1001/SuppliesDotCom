using SuppliesDotCom.Common;
using SuppliesDotCom.Model.EntityDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SuppliesDotCom.Bal.Interfaces
{
    public interface IAddressService
    {
        Task<List<SelectList>> GetCountriesAsync();
        Task<List<SelectList>> GetStatesAsync(long countryId);
        Task<IEnumerable<SelectList>> GetCitiesAsync(long stateId);
        Task<DefaultDataDto> GetDefaultDataAsync(long userId);
        Task<List<SelectList>> GetEntitiesByCityAsync(long cityId = 0, long corporateId = 0);
        Task<List<SelectList>> GetCorporatesAsync(long corporateId = 0, long userId = 0);
    }
}
