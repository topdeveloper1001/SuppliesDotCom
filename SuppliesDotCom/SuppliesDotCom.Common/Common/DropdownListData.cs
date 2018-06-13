using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.Common.Common
{
    public class DropdownListData
    {
        public string Text { get; set; }
        public string Value { get; set; }
        public string CategoryValue { get; set; }
        public string ExternalValue1 { get; set; }
        public string ExternalValue2 { get; set; }
        public string ExternalValue3 { get; set; }
        public int? SortOrder { get; set; }
        public long Id { get; set; }
    }
}
