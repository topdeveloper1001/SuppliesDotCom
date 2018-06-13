using System;

namespace SuppliesDotCom.Model.Interfaces
{
    public interface IEntityCreatable
    {
        long CreatedBy { get; set; }
        DateTime CreatedDate { get; set; }
    }
}
