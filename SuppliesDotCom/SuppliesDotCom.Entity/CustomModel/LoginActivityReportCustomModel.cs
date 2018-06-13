using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuppliesDotCom.Model.CustomModel
{
    [NotMapped]
    public class LoginActivityReportCustomModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime LoginDate { get; set; }
        public int DayShiftMinutes { get; set; }
        public int NightShiftMinutes { get; set; }
    }
}