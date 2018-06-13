using SuppliesDotCom.Model.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SuppliesDotCom.Model
{
    public class BaseEntity<T> : IEntity<T>
    {
        [Key]
        public T Id { get; set; }
    }
}
