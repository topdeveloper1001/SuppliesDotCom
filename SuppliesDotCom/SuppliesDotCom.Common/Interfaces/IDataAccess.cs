using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
namespace SuppliesDotCom.Common.Interfaces
{
    public enum DbInitializationStrategy
    {
        None = 0,
        DropCreateDatabaseAlways = 1,
        DropCreateDatabaseIfModelChanges = 2
    }
    public interface IDbInitializer
    {
        void InitializeDb(DbInitializationStrategy strategy);
    }
    public interface IDataRepository<TModel>
    {
        TModel GetSingle(object keyValues);
        IQueryable<TModel> GetAll();
        IPagedList GetAll(IPagedListParameters pagedListParameters);
        Int32 Count();
        Int64 Max(Expression<Func<TModel, long>> predicate);
        int? Create(TModel entity);
        int? Create(IEnumerable<TModel> entities);
        int? Update(TModel entity);
        int? Update(IEnumerable<TModel> entities);
        int? Delete(TModel entity);
        int? Delete(IEnumerable<TModel> entities);
        int? Delete(object id);
        int? Delete(string ids);
        int? Save();
        int? Save(TModel entity);
        IQueryable<TModel> Where(Expression<Func<TModel, bool>> predicate);
        IQueryable<TModel> Where(IPagedListParameters pagedListParameters);
        void ExecuteCommand(string sql, SqlParameter[] parameters, bool isCompiled);
        IQueryable<TModel> Where(Expression<Func<TModel, bool>> predicate, params Expression<Func<TModel, object>>[] childrensToInclude);
        IQueryable<TModel> Where(IList<Expression<Func<TModel, bool>>> predicates);
        IPagedList Where(Expression<Func<TModel, bool>> predicate, IPagedListParameters pagedListParameters);
        IPagedList Where(IList<Expression<Func<TModel, bool>>> predicates, IPagedListParameters pagedListParameters);

    }
}
