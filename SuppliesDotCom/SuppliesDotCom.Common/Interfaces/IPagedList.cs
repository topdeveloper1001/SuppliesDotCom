using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace SuppliesDotCom.Common.Interfaces
{
    /// <summary>
    /// Interface for name
    /// </summary>
    public interface INameId
    {
        Int32 Id { get; set; }
        string Name { get; set; }
    }
    /// <summary>
    /// Interface for paged list
    /// </summary>
    public interface IPagedList
    {
        int TotalRecordCount { get; set; }

        object Data { get; set; }
    }
    /// <summary>
    /// Interface for paged list parameters
    /// </summary>
    public interface IPagedListParameters
    {
        int PageIndex { get; set; }
        int PageSize { get; set; }
        int SkipCount { get; set; }
        int TakeCount { get; set; }

        string SortColumn { get; set; }
        string SortDirection { get; set; }
        bool SortAssending { get; set; }
        string SerchColumnName { get; set; }
        string SerchColumnValue { get; set; }

        IList<Column> SortColumns { get; set; }
        IList<Column> FilterColumns { get; set; }
        IList<Expression<Func<object, bool>>> FilterExpressions { get; set; }
        IList<Column> GroupColumns { get; set; }
        IList<AggregateColumn> AggregateColumns { get; set; }
        IList<Column> ReturnColumns { get; set; }

        string GetSortColumns();
        string GetReturnColumns();

    }
}
