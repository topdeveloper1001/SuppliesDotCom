using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SuppliesDotCom.Common
{
    public static class ExcelExportHelper
    {
        public static FileContentResult ExportExcel(ExcelData e)
        {
            var wb = new HSSFWorkbook();
            var sheet = wb.CreateSheet(e.SheetName);
            var format = wb.CreateDataFormat();
            var rIndex = 0;
            if (e.FreezeTopRow)
                sheet.CreateFreezePane(0, 1, 0, 1);

            //Creating Header 
            var row = sheet.CreateRow(rIndex);

            if (e.AreCustomColumns)
            {
                var count = e.CustomColumns != null && e.CustomColumns.Any() ? e.CustomColumns.Count : 0;

                //Check if Data Columns contains more columns than the Header Columns 
                if (e.Data.Columns.Count > count)
                {
                    var columnsToRemove = e.Data.Columns.Count - count;
                    for (int i = columnsToRemove - 1; i >= 0; i--)
                        e.Data.Columns.Remove(e.Data.Columns[count + i]);
                }

                foreach (var col in e.CustomColumns)
                    row.CreateCell(col.Key).SetCellValue(col.Value);
            }
            else
            {
                foreach (DataColumn col in e.Data.Columns)
                    row.CreateCell(col.Ordinal).SetCellValue(col.ColumnName);
            }

            //Default Cell Style
            var cellStyleWithDefaultNumericValue = wb.CreateCellStyle();
            cellStyleWithDefaultNumericValue.DataFormat = HSSFDataFormat.GetBuiltinFormat("0.00");

            if (e.Data.Rows.Count > 0)
            {
                foreach (DataRow rw in e.Data.Rows)
                {
                    rIndex++;
                    row = sheet.CreateRow(rIndex);
                    foreach (DataColumn col in e.Data.Columns)
                    {
                        var value = Convert.ToString(rw[col.Ordinal]);
                        row.CreateCell(col.Ordinal).SetCellType(GetCellType(value));
                        row.CreateCell(col.Ordinal).SetCellValue(value);
                    }
                }
            }

            using (var ms = new MemoryStream())
            {
                wb.Write(ms);
                var contentType = MimeMapping.GetMimeMapping(e.FileName);
                var result = new FileContentResult(ms.ToArray(), contentType);
                result.FileDownloadName = e.FileName;
                return result;
            }
        }

        private static CellType GetCellType(string value)
        {
            bool boolValue;
            Int32 intValue;
            Int64 bigintValue;
            double doubleValue;
            DateTime dateValue;

            if (int.TryParse(value, out intValue) || long.TryParse(value, out bigintValue) || double.TryParse(value, out doubleValue))
                return CellType.Numeric;
            else if (bool.TryParse(value, out boolValue))
            {
                return CellType.Boolean;
            }
            else
                return CellType.String;
        }
    }


    public class ExcelData
    {
        public bool AreCustomColumns { get; set; }
        public Dictionary<int, string> CustomColumns { get; set; }
        public DataTable Data { get; set; }
        public string SheetName { get; set; }
        public bool AutoFilter { get; set; }
        public bool FreezeTopRow { get; set; }
        public string FileName { get; set; }
    }
}