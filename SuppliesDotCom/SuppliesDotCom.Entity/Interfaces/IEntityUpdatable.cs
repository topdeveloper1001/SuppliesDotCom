using System;

namespace SuppliesDotCom.Model.Interfaces
{
    public interface IEntityUpdatable
    {
        //FK
        long? ModifiedBy { get; set; }   
        DateTime? ModifiedDate { get; set; }
    }
}
