using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Repository.Common;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class CityRepository : GenericRepository<City>
    {
        private readonly DbContext _context;

        public CityRepository(BillingEntities context)
            : base(context)
        {
            AutoSave = true;
            _context = context;
        }

    }
}
