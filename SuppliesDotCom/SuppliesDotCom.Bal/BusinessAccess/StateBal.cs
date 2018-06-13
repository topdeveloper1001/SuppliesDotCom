using System.Linq;
using System.Collections.Generic;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class StateBal : BaseBal
    {
        /// <summary>
        /// Get the States
        /// </summary>
        /// <returns>Return the states by country ID</returns>
        public List<StateCustomModel> GetStatesByCountryId(int countryId)
        {           
            using (var stateRepository = UnitOfWork.StateRepository)
            {
                var list = stateRepository.Where(s => s.CountryID == countryId && s.IsDeleted == false).ToList();
               List<StateCustomModel> customstatelist = new List<StateCustomModel>();
               customstatelist = (from y in list
                                  select new StateCustomModel{ 
               StateID=y.StateID,
               StateName=y.StateName
               }).ToList();

               return customstatelist;
            }           
        }
    }
}
