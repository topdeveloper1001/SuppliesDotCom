using System.Linq;
using System.Collections.Generic;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class CityBal : BaseBal
    {
        public CityBal()
        {
           
        }

        /// <summary>
        /// Get the Cities
        /// </summary>
        /// <returns>Return the Countries View Model</returns>
        public List<CityCustomModel> GetCityListByStateId(int stateId)
        {
            var list = new List<City>();
            using (var cityRepository = UnitOfWork.CityRepository)
            {
                list = cityRepository.GetAll().Where(s => s.StateID == stateId && s.IsActive == true).ToList();
                List<CityCustomModel> customCitylist = new List<CityCustomModel>();
                customCitylist = (from y in list
                                   select new CityCustomModel
                                   {
                                       CityID = y.CityID,
                                       Name = y.Name
                                   }).ToList();

                return customCitylist;
            }
            
        }
    }
}
