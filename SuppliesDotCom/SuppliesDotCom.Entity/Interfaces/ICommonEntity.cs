namespace SuppliesDotCom.Model.Interfaces
{
    interface ICommonEntity<TKey> : IEntity<TKey>, IEntityUpdatable, IEntityCreatable
    {

    }
}
