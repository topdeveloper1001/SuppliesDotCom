using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Interfaces;
using SuppliesDotCom.Model;
using SuppliesDotCom.Repository.Common;
using System.Data.SqlClient;

namespace SuppliesDotCom.Repository.GenericRepository
{
    public class GenericRepository<TModel> : DataAccessBase, IDataRepository<TModel> where TModel : class, new()
    {
        public DbContext DatabaseContext { get; set; }
        internal DbSet<TModel> DbSet;
        public bool AutoSave { get; set; }

        #region Constructor & Destructor

        public GenericRepository(IDbContextFactory dbContextFactory)
        {
            AutoSave = true;
            DatabaseContext = dbContextFactory.Context;
        }

        public GenericRepository(BillingEntities context)
        {
            this.DatabaseContext = context;

            this.DbSet = context.Set<TModel>();
        }

        public GenericRepository()
        {
            AutoSave = true;
            var dbContextFactory = new DbContextFactory();
            DatabaseContext = dbContextFactory.Context;
        }

        #endregion Constructor & Destructor
        public void ExecuteCommand(string sql, SqlParameter[] parameters, bool isCompiled = true)
        {
            var query = sql;
            if (!isCompiled)
            {
                var paramsString = parameters.Any(a => a.ParameterName.Contains("@")) ? string.Join(",", parameters.Select(p => p.ParameterName)) : string.Join(",", parameters.Select(p => $"@{p.ParameterName}"));
                query = $"Exec {sql} {paramsString}";
            }
            DatabaseContext.Database.ExecuteSqlCommand(query, parameters);
        }

        public object ExecuteOutputCommand(string sql, params object[] parameters)
        {
            return this.DatabaseContext.Database.ExecuteSqlCommand(sql, parameters);
        }

        public IEnumerable<TModel> GetListByStoredProcedure(string storedProcedureName, params object[] parameters)
        {
            var execSQL = string.Format("EXEC {0}", storedProcedureName);
            IEnumerable<TModel> res = this.DatabaseContext.Database.SqlQuery<TModel>(execSQL, parameters);
            return res;
        }

        public virtual TModel GetSingle(object keyValues)
        {
            return DatabaseContext.Set<TModel>().Find(keyValues);
        }

        public virtual TModel GetSingle(object keyValues, params Expression<Func<TModel, object>>[] childrensToInclude)
        {
            var model = DatabaseContext.Set<TModel>().Find(keyValues);
            if (model != null)
            {
                foreach (var children in childrensToInclude)
                {
                    var member = children.Body as MemberExpression;
                    if (member == null) { throw new ArgumentException("'children' should be a member expression", "childrensToInclude"); }
                    var propertyInfo = (PropertyInfo)member.Member;
                    var isCollectionObject = propertyInfo.PropertyType.IsGenericType;
                    if (isCollectionObject)
                    {
                        if (DatabaseContext != null) { DatabaseContext.Entry(model).Collection(member.Member.Name).Load(); }
                    }
                    else
                    {
                        if (DatabaseContext != null) { DatabaseContext.Entry(model).Reference(member.Member.Name).Load(); }
                    }
                }
            }

            return model;
        }
        public virtual IQueryable<TModel> GetAll()
        {
            return DatabaseContext.Set<TModel>();
        }

        #region Get All pageList
        public virtual IPagedList GetAll(IPagedListParameters pagedListParameters)
        {
            var pagedResult = new PagedList();
            IQueryable<TModel> queryResults = DatabaseContext.Set<TModel>();
            if (!string.IsNullOrEmpty(pagedListParameters.SerchColumnName) &&
                !string.IsNullOrEmpty(pagedListParameters.SerchColumnValue))
            {
                queryResults = queryResults.Where(pagedListParameters.SerchColumnName,
                                                  pagedListParameters.SerchColumnValue);
            }
            else if (!string.IsNullOrEmpty(pagedListParameters.SerchColumnValue))
            {
                queryResults = queryResults.FullTextSearch(pagedListParameters.SerchColumnValue);
            }

            queryResults = queryResults.OrderBy(pagedListParameters.SortColumn, pagedListParameters.SortAssending);

            pagedResult.TotalRecordCount = queryResults.Count();

            queryResults =
                queryResults.Skip(pagedListParameters.SkipCount).Take(pagedListParameters.TakeCount);
            //pagedResult.Data = queryResults.ToList();
            pagedResult.Data = GenericHelper.GetTypedList(queryResults.AsEnumerable());
            return pagedResult;
        }
        #endregion

        public virtual Int32 Count()
        {
            return DatabaseContext.Set<TModel>().Count();
        }

        public virtual Int64 Max(Expression<Func<TModel, long>> predicate)
        {
            return DatabaseContext.Set<TModel>().Max(predicate);
        }

        public virtual int? Create(TModel entity)
        {
            DatabaseContext.Set<TModel>().Add(entity);
            return AutoSave ? Save() : null;
        }

        public virtual int? Create(IEnumerable<TModel> entities)
        {
            foreach (var entity in entities) { Create(entity); }
            return null;
        }

        public virtual int? Update(TModel entity)
        {
            return AutoSave ? Save() : null;
        }

        public virtual int? Update(IEnumerable<TModel> entities)
        {
            foreach (var entity in entities) { Update(entity); }
            return null;
        }

        public virtual int? Delete(TModel entity)
        {
            DatabaseContext.Set<TModel>().Remove(entity);
            return AutoSave ? Save() : null;
        }

        public virtual int? Delete(IEnumerable<TModel> entities)
        {
            foreach (var entity in entities) { Delete(entity); }
            return null;
        }

        public int? Delete(object id)
        {
            TModel entity = GetSingle(Convert.ToInt32(id, CultureInfo.InvariantCulture));
            if (entity == null) return null;
            Delete(entity);
            return 1;
        }

        public int? Delete(string ids)
        {
            ids = ids.TrimEnd(',');
            var idArray = ids.Split(',');
            var processed = 0;
            foreach (var id in idArray)
            {
                if (string.IsNullOrEmpty(id)) continue;
                Delete(id);
                processed++;
            }
            return processed;
        }

        public int? Save()
        {
            return DatabaseContext.SaveChanges();
        }

        public int? Save(TModel entity)
        {
            if (DatabaseContext.Entry(entity).State == EntityState.Unchanged) { return null; }
            if (DatabaseContext.Entry(entity).State == EntityState.Detached) { DatabaseContext.Set<TModel>().Add(entity); }
            return DatabaseContext.SaveChanges();
        }

        public virtual IQueryable<TModel> Where(Expression<Func<TModel, bool>> predicate)
        {
            return DatabaseContext.Set<TModel>().Where(predicate);
        }

        public virtual IQueryable<TModel> Where(IPagedListParameters pagedListParameters)
        {
            IQueryable<TModel> queryResults = DatabaseContext.Set<TModel>();
            queryResults = queryResults.OrderBy(pagedListParameters.SortColumn, pagedListParameters.SortAssending);
            return queryResults;
        }

        public virtual IQueryable<TModel> Where(Expression<Func<TModel, bool>> predicate, params Expression<Func<TModel, object>>[] childrensToInclude)
        {
            var model = DatabaseContext.Set<TModel>().Where(predicate);
            foreach (var member in childrensToInclude.Select(children => children.Body as MemberExpression))
            {
                if (member == null) { throw new ArgumentException("'children' should be a member expression", "childrensToInclude"); }
                model.Include(member.Member.Name).Load();
            }
            return model;
        }

        public virtual IQueryable<TModel> Where(IList<Expression<Func<TModel, bool>>> predicates)
        {
            IQueryable<TModel> queryResults = DatabaseContext.Set<TModel>();
            if (predicates != null)
            {
                queryResults = predicates.Aggregate(queryResults, (current, predicate) => current.Where(predicate));
            }
            return queryResults;
        }

        public virtual IPagedList Where(Expression<Func<TModel, bool>> predicate, IPagedListParameters pagedListParameters)
        {
            IList<Expression<Func<TModel, bool>>> predicates = new List<Expression<Func<TModel, bool>>>();
            predicates.Add(predicate);
            return Where(predicates, pagedListParameters);
        }

        public virtual IPagedList Where(IList<Expression<Func<TModel, bool>>> predicates, IPagedListParameters pagedListParameters)
        {
            IPagedList pagedResult = new PagedList();
            IQueryable<TModel> queryResults = DatabaseContext.Set<TModel>();
            if (predicates != null)
            {
                queryResults = predicates.Aggregate(queryResults, (current, predicate) => current.Where(predicate));
            }
            queryResults = queryResults.OrderBy(pagedListParameters.SortColumn, pagedListParameters.SortAssending);

            pagedResult.TotalRecordCount = queryResults.Count();
            if (predicates != null)
            {
                queryResults = queryResults.Skip(pagedListParameters.SkipCount).Take(pagedListParameters.TakeCount);
            }
            pagedResult.Data = queryResults.ToList();
            return pagedResult;
        }

        protected virtual List<Dictionary<string, Object>> GetTypedList(IEnumerable list)
        {
            return GenericHelper.GetTypedList(list);
        }

        /*
         * Owner: Amit Jain
         * On: 01102014
         * Purpose: Add the new method for updating entity
         */
        /// <summary>
        /// Update Entity Values
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual int? UpdateEntity(TModel entity, int id)
        {
            if (AutoSave)
            {
                var oldEntity = GetSingle(id);
                DatabaseContext.Entry(oldEntity).CurrentValues.SetValues(entity);
                Update(oldEntity);
                return id;
            }
            return null;
        }


        /// <summary>
        /// Updates the entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public virtual long? UpdateEntity(TModel entity, long id)
        {
            if (AutoSave)
            {
                var oldEntity = GetSingle(id);
                DatabaseContext.Entry(oldEntity).CurrentValues.SetValues(entity);
                Update(oldEntity);
                return id;
            }
            return null;
        }
    }
}
