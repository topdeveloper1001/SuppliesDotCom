using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuppliesDotCom.PDFHelper
{
    public class SpanishText
    {
        private string _titleId = "0";
        public SpanishText(string titleID)
        {
            _titleId = titleID;
        }
        public SpanishText()
        {
            _titleId = "0";
        }

        #region PublicProperty
        public static string Month
        {
            get
            {
                return "mes";
            }
        }
        public static string Installments
        {
            get
            {
                return "CUOTAS";//Mean fee
            }
        }
        public static string Months
        {
            get
            {
                return "meses";
            }
        }
        public static string Year
        {
            get
            {
                return "año";
            }
        }
        public static string Years
        {
            get
            {
                return "años";
            }
        }

        public string ClientTitle
        {

            get
            {
                return clientTitle(_titleId);
            }
        }
        #endregion PublicProperty

        private string clientTitle(string _titleId)
        {
            string _clientTitle = null;
            switch (_titleId)
            {
                case "0":
                    _clientTitle = null;
                    break;
                case "1":
                    _clientTitle = "Sr.";
                    break;
                case "2":
                case "3":
                    _clientTitle = "Sra.";/*case 2 and 3 will return same value*/
                    break;
                default:
                    _clientTitle = null;
                    break;
            }
            return _clientTitle;
        }
    }
}
