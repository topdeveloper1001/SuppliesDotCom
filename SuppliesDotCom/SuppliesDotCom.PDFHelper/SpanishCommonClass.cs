using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.PDFHelper
{
    public enum PayFrequencyTypeSpanish
    {
        bisemanal = 1,
        quincenal = 2,
        semanal = 3,
        mensual = 4
    }
    public class SpanishCommonClass
    {

        public static string SpanishDate(DateTime dateTime, String currentUICulture, string specailDateFormat = null)
        {
            try
            {
                System.Globalization.CultureInfo cultureinfo = new System.Globalization.CultureInfo(currentUICulture);
                if (specailDateFormat != null)
                {
                    return dateTime.ToString(specailDateFormat, cultureinfo);
                }
                string DateFormat = string.Empty;//System.Configuration.ConfigurationManager.AppSettings["SpanishPDFTemplatesDateFormat"];

                //if (string.IsNullOrEmpty(DateFormat))//If key is not defined get defaut value.
                //    {
                DateFormat = "dd $ MMMM $ yyyy";
                // }

                return dateTime.ToString(DateFormat, cultureinfo).Replace("$", "de");
            }
            catch
            {
                throw;
            }

        }
    }
}
