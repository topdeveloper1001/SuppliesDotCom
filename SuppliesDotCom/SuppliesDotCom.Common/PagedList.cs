using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using SuppliesDotCom.Common.Interfaces;
using System.Collections;

namespace SuppliesDotCom.Common
{

    public class AuthorizedInfo
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        //public IList<Privilege> AllowedPrivileges { get; set; }
        //public IList<Privilege> NotAllowedPrivileges { get; set; }
        //public IList<Privilege> AnonymousPrivileges { get; set; }
        public string DbConnection { get; set; }
        public string DbProvider { get; set; }
    }
    public static class Constants
    {
        public const string IdColumn = "Id";
    }
    /// <summary>
    /// Paged List used to get the data based on the page size and page index
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public sealed class PagedList : IPagedList
    {
        #region IPagedList Members

        public int TotalRecordCount { get; set; }
        public object Data { get; set; }

        #endregion
    }

    /// <summary>
    /// Paged list parameters to get the data from server side paging
    /// </summary>
    public class PagedListParameters : IPagedListParameters
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int SkipCount { get; set; }
        public int TakeCount { get; set; }

        public string SortColumn { get; set; }
        public IList<Column> SortColumns { get; set; }

        public string SortDirection { get; set; }
        public bool SortAssending { get; set; }

        public string SerchColumnName { get; set; }
        public string SerchColumnValue { get; set; }

        public IList<Column> FilterColumns { get; set; }
        public IList<Expression<Func<object, bool>>> FilterExpressions { get; set; }

        public IList<Column> GroupColumns { get; set; }

        public IList<AggregateColumn> AggregateColumns { get; set; }

        public IList<Column> ReturnColumns { get; set; }

        public string SearchProviderName { get; set; }

        public PagedListParameters() { }
        public PagedListParameters(NameValueCollection flexGridPagingFormCollection)
        {
            PageIndex = 1;
            PageSize = 10;
            ReturnColumns = new List<Column>();
            SortColumns = new List<Column>();
            FilterColumns = new List<Column>();
            FilterExpressions = new List<Expression<Func<object, bool>>>();
            GroupColumns = new List<Column>();
            AggregateColumns = new List<AggregateColumn>();

            //Generic Filter
            foreach (var key in flexGridPagingFormCollection.AllKeys) // <-- No duplicates returned.
            {
                //if (key == "page" || key == "size" || key == "orderBy") { continue; }
                switch (key)
                {
                    case "page":
                        PageIndex = int.Parse(flexGridPagingFormCollection[key], CultureInfo.InvariantCulture);
                        break;
                    case "size":
                        PageSize = int.Parse(flexGridPagingFormCollection[key], CultureInfo.InvariantCulture);
                        break;
                    case "orderBy":
                        var sortItems = flexGridPagingFormCollection["orderBy"].Split('-');
                        SortColumn = sortItems[0];
                        SortDirection = sortItems[1];
                        break;
                    default:
                        var column = new Column { Member = key, Value = flexGridPagingFormCollection[key] };
                        FilterColumns.Add(column);
                        break;
                }
            }



            SkipCount = (PageIndex - 1) * PageSize;
            TakeCount = PageSize;



            if (String.IsNullOrEmpty(SortColumn) == true) { SortColumn = Constants.IdColumn; }
            if (String.IsNullOrEmpty(SortDirection) == true) { SortDirection = "asc"; }
            SortAssending = (SortDirection.ToUpperInvariant() == "ASC");
            var sortColumn = new Column { Member = SortColumn, SortAssending = SortAssending };
            SortColumns.Add(sortColumn);
        }

        public string GetSortColumns()
        {
            var sortColumns = String.Empty;
            foreach (var sortColumn in SortColumns)
            {
                if (sortColumn.Unbound) { continue; }
                if (String.IsNullOrEmpty(sortColumn.TableName))
                {
                    var col = ReturnColumns.Where(o => o.Member == sortColumn.Member).FirstOrDefault();
                    if (col != null)
                    {
                        sortColumn.TableName = col.TableName;
                    }
                }
                const string columnText = "{0}.{1} {2},";
                if (sortColumn.SortAssending)
                {
                    sortColumns += String.Format(CultureInfo.InvariantCulture, columnText, sortColumn.TableName,
                                              sortColumn.Member, "ASC");
                }
                else
                {
                    sortColumns += String.Format(CultureInfo.InvariantCulture, columnText, sortColumn.TableName,
                                             sortColumn.Member, "DESC");
                }
            }
            if (String.IsNullOrEmpty(sortColumns))
            {
                sortColumns = "Id ASC";
            }
            return sortColumns.TrimEnd(',');
        }

        public string GetReturnColumns()
        {
            var returnColumns = String.Empty;

            foreach (var returnColumn in ReturnColumns)
            {
                if (returnColumn.Unbound) { continue; }
                const string columnText = "{0}.{1} AS [{2}],";
                if (String.IsNullOrEmpty(returnColumn.Title))
                {
                    returnColumn.Title = returnColumn.Member;
                }
                returnColumns += String.Format(CultureInfo.InvariantCulture, columnText, returnColumn.TableName, returnColumn.Member, returnColumn.Member);
            }
            if (String.IsNullOrEmpty(returnColumns))
            {
                returnColumns = "*";
            }
            return returnColumns.TrimEnd(',');
        }



    }

    //public static class Extensions
    //{
    //    public static IEnumerable<TSource> DistinctBy<TSource, TKey>
    //(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
    //    {
    //        var seenKeys = new HashSet<TKey>();
    //        foreach (TSource element in source)
    //        {
    //            if (seenKeys.Add(keySelector(element)))
    //            {
    //                yield return element;
    //            }
    //        }
    //    }
    //}

    #region New Query Parameters

    public class Column
    {
        //Telerik MVC Grid Column Properties
        public Action HeaderTemplate { get; set; }
        public Action FooterTemplate { get; set; }
        public string ClientTemplate { get; set; }
        public bool Encoded { get; set; }
        public bool Filterable { get; set; }
        public string Format { get; set; }
        public bool Groupable { get; set; }
        public IDictionary<string, object> HeaderHtmlAttributes { get; set; }
        public IDictionary<string, object> FooterHtmlAttributes { get; set; }
        public bool Hidden { get; set; }
        public IDictionary<string, object> HtmlAttributes { get; set; }
        public string Member { get; set; }
        public Type MemberType { get; set; }
        public string Title { get; set; }
        public bool ReadOnly { get; set; }
        public bool Sortable { get; set; }
        public bool Visible { get; set; }
        public string Width { get; set; }

        //Additional Columns
        public string TableName { get; set; }
        public string RelatedMember { get; set; }
        public string RelatedTableName { get; set; }
        public bool SortAssending { get; set; }
        public object Value { get; set; }
        public bool Unbound { get; set; }

        public Column()
        {
            Sortable = true;
            ReadOnly = true;
            Visible = true;
            Width = "100px";
            HeaderHtmlAttributes = new Dictionary<string, object>();
            FooterHtmlAttributes = new Dictionary<string, object>();
            HtmlAttributes = new Dictionary<string, object>();
        }

    }

    public class AggregateColumn
    {
        private readonly IDictionary<string, Func<AggregateFunction>> aggregateFactories;

        public AggregateColumn()
        {
            Aggregates = new List<AggregateFunction>();

            //aggregateFactories = new Dictionary<string, Func<AggregateFunction>>
            //  {
            //      { "sum", () => new SumFunction { SourceField = Member } },
            //      { "count", () => new CountFunction{ SourceField = Member } },
            //      { "average", () => new AverageFunction { SourceField = Member } },
            //      { "min", () => new MinFunction { SourceField = Member } },
            //      { "max", () => new MaxFunction { SourceField = Member } }
            //  };
        }

        public ICollection<AggregateFunction> Aggregates { get; private set; }

        public string Member { get; set; }

        public void Deserialize(string source)
        {
            var components = source.Split('-');

            if (components.Any())
            {
                Member = components[0];

                for (var i = 1; i < components.Length; i++)
                {
                    DeserializeAggregate(components[i]);
                }
            }
        }

        private void DeserializeAggregate(string aggregate)
        {
            Func<AggregateFunction> factory;

            if (aggregateFactories.TryGetValue(aggregate, out factory))
            {
                Aggregates.Add(factory());
            }
        }

        public string Serialize()
        {
            var result = new StringBuilder(Member);

            var aggregates = Aggregates.Select(aggregate => aggregate.FunctionName.Split('_')[0].ToLowerInvariant());

            foreach (var aggregate in aggregates)
            {
                result.Append("-");
                result.Append(aggregate);
            }

            return result.ToString();
        }
    }

    public abstract class AggregateFunction
    {
        public abstract string AggregateMethodName { get; }

        private string functionName;

        /// <summary>
        /// Gets or sets the informative message to display as an illustration of the aggregate function.
        /// </summary>
        /// <value>The caption to display as an illustration of the aggregate function.</value>
        public string Caption
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the name of the field, of the item from the set of items, which value is used as the argument of the aggregate function.
        /// </summary>
        /// <value>The name of the field to get the argument value from.</value>
        public virtual string SourceField
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the name of the aggregate function, which appears as a property of the group record on which records the function works.
        /// </summary>
        /// <value>The name of the function as visible from the group record.</value>
        public virtual string FunctionName
        {
            get
            {
                if (string.IsNullOrEmpty(this.functionName))
                {
                    this.functionName = this.GenerateFunctionName();
                }

                return this.functionName;
            }
            set
            {
                this.functionName = value;
            }
        }

        public Type MemberType
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a string that is used to format the result value.
        /// </summary>
        /// <value>The format string.</value>
        public virtual string ResultFormatString
        {
            get;
            set;
        }

        /// <summary>
        /// Creates the aggregate expression that is used for constructing expression 
        /// tree that will calculate the aggregate result.
        /// </summary>
        /// <param name="enumerableExpression">The grouping expression.</param>
        /// <param name="liftMemberAccessToNull"></param>
        /// <returns></returns>
        public abstract Expression CreateAggregateExpression(Expression enumerableExpression, bool liftMemberAccessToNull);

        /// <summary>
        /// Generates default name for this function using this type's name.
        /// </summary>
        /// <returns>
        /// Function name generated with the following pattern: 
        /// {<see cref="object.GetType()"/>.<see cref="MemberInfo.Name"/>}_{<see cref="object.GetHashCode"/>}
        /// </returns>
        protected virtual string GenerateFunctionName()
        {
            return string.Format(CultureInfo.InvariantCulture, "{0}_{1}", this.GetType().Name, this.GetHashCode());
        }
    }

    public class AggregateFunctionCollection : Collection<AggregateFunction>
    {
        /// <summary>
        /// Gets the <see cref="AggregateFunction"/> with the specified function name.
        /// </summary>
        /// <value>
        /// First <see cref="AggregateFunction"/> with the specified function name 
        /// if any, otherwise null.
        /// </value>
        public AggregateFunction this[string functionName]
        {
            get
            {
                return this.FirstOrDefault(f => f.FunctionName == functionName);
            }
        }
    }


    #endregion New Query Parameters

    public class NumeralAlphaCompare : IComparer<string>
    {
        public int Compare(string x, string y)
        {
            var nIndexX = x.Replace(":", " ").IndexOf(" ");
            var nIndexY = y.Replace(":", " ").IndexOf(" ");
            var bSpaceX = nIndexX > -1;
            var bSpaceY = nIndexY > -1;

            long nX;
            long nY;
            if (bSpaceX && bSpaceY)
            {
                if (long.TryParse(x.Substring(0, nIndexX).Replace(".", ""), out nX)
                    && long.TryParse(y.Substring(0, nIndexY).Replace(".", ""), out nY))
                {
                    if (nX < nY)
                    {
                        return -1;
                    }
                    else if (nX > nY)
                    {
                        return 1;
                    }
                }
            }
            else if (bSpaceX)
            {
                if (long.TryParse(x.Substring(0, nIndexX).Replace(".", ""), out nX)
                    && long.TryParse(y, out nY))
                {
                    if (nX < nY)
                    {
                        return -1;
                    }
                    else if (nX > nY)
                    {
                        return 1;
                    }
                }
            }
            else if (bSpaceY)
            {
                if (long.TryParse(x, out nX)
                    && long.TryParse(y.Substring(0, nIndexY).Replace(".", ""), out nY))
                {
                    if (nX < nY)
                    {
                        return -1;
                    }
                    else if (nX > nY)
                    {
                        return 1;
                    }
                }
            }
            else
            {
                if (long.TryParse(x, out nX)
                    && long.TryParse(y, out nY))
                {
                    if (nX < nY)
                    {
                        return -1;
                    }
                    else if (nX > nY)
                    {
                        return 1;
                    }
                }
            }
            return y.CompareTo(x);
        }
    }


    public class StringLogicalComparer
    {
        public static int Compare(string s1, string s2)
        {
            //get rid of special cases
            if ((s1 == null) && (s2 == null)) return 0;
            else if (s1 == null) return -1;
            else if (s2 == null) return 1;

            if ((s1.Equals(string.Empty) && (s2.Equals(string.Empty)))) return 0;
            else if (s1.Equals(string.Empty)) return -1;
            else if (s2.Equals(string.Empty)) return -1;

            //WE style, special case
            bool sp1 = Char.IsLetterOrDigit(s1, 0);
            bool sp2 = Char.IsLetterOrDigit(s2, 0);
            if (sp1 && !sp2) return 1;
            if (!sp1 && sp2) return -1;

            int i1 = 0, i2 = 0; //current index
            int r = 0; // temp result
            while (true)
            {
                bool c1 = Char.IsDigit(s1, i1);
                bool c2 = Char.IsDigit(s2, i2);
                if (!c1 && !c2)
                {
                    bool letter1 = Char.IsLetter(s1, i1);
                    bool letter2 = Char.IsLetter(s2, i2);
                    if ((letter1 && letter2) || (!letter1 && !letter2))
                    {
                        if (letter1 && letter2)
                        {
                            r = Char.ToLower(s1[i1]).CompareTo(Char.ToLower(s2[i2]));
                        }
                        else
                        {
                            r = s1[i1].CompareTo(s2[i2]);
                        }
                        if (r != 0) return r;
                    }
                    else if (!letter1 && letter2) return -1;
                    else if (letter1 && !letter2) return 1;
                }
                else if (c1 && c2)
                {
                    r = CompareNum(s1, ref i1, s2, ref i2);
                    if (r != 0) return r;
                }
                else if (c1)
                {
                    return -1;
                }
                else if (c2)
                {
                    return 1;
                }
                i1++;
                i2++;
                if ((i1 >= s1.Length) && (i2 >= s2.Length))
                {
                    return 0;
                }
                else if (i1 >= s1.Length)
                {
                    return -1;
                }
                else if (i2 >= s2.Length)
                {
                    return -1;
                }
            }
        }

        private static int CompareNum(string s1, ref int i1, string s2, ref int i2)
        {
            int nzStart1 = i1, nzStart2 = i2; // nz = non zero
            int end1 = i1, end2 = i2;

            ScanNumEnd(s1, i1, ref end1, ref nzStart1);
            ScanNumEnd(s2, i2, ref end2, ref nzStart2);
            int start1 = i1; i1 = end1 - 1;
            int start2 = i2; i2 = end2 - 1;

            int nzLength1 = end1 - nzStart1;
            int nzLength2 = end2 - nzStart2;

            if (nzLength1 < nzLength2) return -1;
            else if (nzLength1 > nzLength2) return 1;

            for (int j1 = nzStart1, j2 = nzStart2; j1 <= i1; j1++, j2++)
            {
                int r = s1[j1].CompareTo(s2[j2]);
                if (r != 0) return r;
            }
            // the nz parts are equal
            int length1 = end1 - start1;
            int length2 = end2 - start2;
            if (length1 == length2) return 0;
            if (length1 > length2) return -1;
            return 1;
        }

        //lookahead
        private static void ScanNumEnd(string s, int start, ref int end, ref int nzStart)
        {
            nzStart = start;
            end = start;
            bool countZeros = true;
            while (Char.IsDigit(s, end))
            {
                if (countZeros && s[end].Equals('0'))
                {
                    nzStart++;
                }
                else countZeros = false;
                end++;
                if (end >= s.Length) break;
            }
        }

    }

    public class NumericComparer : IComparer<string>
    {
        public NumericComparer()
        { }

        public int Compare(string x, string y)
        {
            x = x.Replace("-", "");
            y = y.Replace("-", "");
            return StringLogicalComparer.Compare((string)x, (string)y);
        }
    }


    public static class StringExtensions
    {
        public static bool ContainsAny(this string str, IEnumerable<string> searchTerms)
        {
            return searchTerms.Any(searchTerm => str.ToLower().Contains(searchTerm.ToLower()));
        }

        public static bool ContainsAll(this string str, IEnumerable<string> searchTerms)
        {
            return searchTerms.All(searchTerm => str.ToLower().Contains(searchTerm.ToLower()));
        }
    }
}
