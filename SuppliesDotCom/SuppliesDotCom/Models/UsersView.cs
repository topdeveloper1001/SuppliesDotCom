using SuppliesDotCom.Model.CustomModel;
using System.Collections.Generic;

namespace SuppliesDotCom.Models
{
    public class UsersView
    {
        public List<UsersCustomModel> UsersList { get; set; }
        public UsersCustomModel CurrentUser { get; set; }
    }
}