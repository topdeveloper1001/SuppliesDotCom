using System;
using System.Globalization;

namespace SuppliesDotCom.Common
{
    public class CommonHelper
    {
        public static int GetWeekOfYearISO8601(DateTime date)
        {
            var cal = CultureInfo.CurrentCulture.Calendar;
            var day = (int)cal.GetDayOfWeek(date);

            return cal.GetWeekOfYear(date.AddDays(4 - (day == 0 ? 7 : day)),
                CalendarWeekRule.FirstFourDayWeek,
                DayOfWeek.Monday);
        }


        public static string GenerateToken(int len, bool upper = false)
        {
            var rand = new Random();
            char[] allowableChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ0123456789".ToCharArray();
            string final = string.Empty;
            for (int i = 0; i <= len - 1; i++)
                final += allowableChars[rand.Next(allowableChars.Length - 1)];
            return upper ? final.ToUpper() : final;
        }
    }
}
