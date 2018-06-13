using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Bal.Interfaces
{
    public interface IService<T>
    {
        Task<List<T>> GetListByCategory(string category, List<string> exclusions = null);
    }
}
