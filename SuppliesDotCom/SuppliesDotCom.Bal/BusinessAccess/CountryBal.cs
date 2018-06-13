using System.Linq;
using System.Collections.Generic;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class CountryBal : BaseBal
    {
        public CountryBal()
        {
        }

        /// <summary>
        /// Get the Countries
        /// </summary>
        /// <returns>Return the list of Countries </returns>
        public List<Country> GetCountries()
        {
            var list = new List<Country>();
            using (var countryRepository = UnitOfWork.CountryRepository)
                list = countryRepository.GetAll().OrderBy(c => c.CountryName).ToList();
            return list;
        }

        public CountryCustomModel GetCountryInfoByCountryID(int countryId)
        {
            using (var countryRepository = UnitOfWork.CountryRepository)
            {
                var objCountry = countryRepository.Where(s => s.CountryID == countryId && s.IsDeleted == false).FirstOrDefault();
                CountryCustomModel objCountryCustomModel = new CountryCustomModel();
                objCountryCustomModel.CodeValue = objCountry.CodeValue;// (from y in objCountry select new CountryCustomModel { CodeValue = y.co });
                return objCountryCustomModel;
            }
        }

        public List<CountryCustomModel> GetCountryWithCode()
        {
            var list = new List<CountryCustomModel>();
            using (var rep = UnitOfWork.CountryRepository)
            {
                var countries = rep.GetAll().ToList();
                if (countries.Any())
                {
                    list.AddRange(countries.Select(item => new CountryCustomModel
                    {
                        CountryID = item.CountryID,
                        CountryName = item.CountryName,
                        CodeValue = item.CodeValue,
                        CountryWithCode = string.Format("{0}-{1}", item.CountryName, item.CodeValue)
                    }));

                    list = list.OrderBy(c => c.CountryName).ToList();
                }
            }
            return list;
        }

    }
}
