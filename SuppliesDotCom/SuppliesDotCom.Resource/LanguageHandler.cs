using System.Globalization;
using System.Resources;

namespace SuppliesDotCom.Resource
{
    public class LanguageHandler
    {

        #region Private member variables
        private ResourceManager _resourceMgr;
        private static readonly LanguageHandler instance = new LanguageHandler();
        #endregion

        #region Constructors
        public LanguageHandler()
        {

        }
        #endregion

        #region Public methods
        public static LanguageHandler Instance
        {
            get
            {
                return instance;
            }
        }

        /// <summary>
        /// Get the correct languagetext by key, if no key is found then the return value will be "[key]".
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public string GetKeyValue(string key)
        {
            if (_resourceMgr == null)
            {
                _resourceMgr = new ResourceManager(GetType().Namespace + ".Resources.SuppliesDotCom", System.Reflection.Assembly.GetExecutingAssembly());
            }
            key = key.ToLower().Trim();
            var retValue = _resourceMgr.GetString(key.ToLower()) ?? string.Format("[{0}]", key);
            return retValue;
        }

        public string GetKeyValueByCulture(string key, System.Globalization.CultureInfo culture)
        {
            if (_resourceMgr == null)
            {
                _resourceMgr = new ResourceManager(GetType().Namespace + ".Resources.SuppliesDotCom", System.Reflection.Assembly.GetExecutingAssembly());
            }
            var retValue = _resourceMgr.GetString(key.ToLower(), culture) ?? string.Format("[{0}]", key);
            return retValue;
        }

        public string GetFileText(string key, CultureInfo culture)
        {
            var result = string.Empty;
            key = key.ToLower().Trim();
            switch (key)
            {
                case "patientportalemailverification":
                    result = Resources.SuppliesDotCom.PatientPortalEmailVerification_en_US;
                    break;
                case "patientforgotpasswordemail":
                    result = Resources.SuppliesDotCom.PatientForgotPasswordTemplate_en_US;
                    break;
                case "newpasswordemail":
                    result = Resources.SuppliesDotCom.NewPasswordEmailTemplate_en_US;
                    break;
                case "usertokentoaccess":
                    result = Resources.SuppliesDotCom.UserTokenTemplate_en_US;
                    break;
                case "resetpasswordtemplate":
                    result = Resources.SuppliesDotCom.ResetPasswordTemplate_en_US;
                    break;
                case "forgotpwdtemplate":
                    result = Resources.SuppliesDotCom.ForgotPasswordTemplate_en_US;
                    break;
                case "fromschedulartopatientonnewbooking":
                    result = Resources.SuppliesDotCom.fromschedulartopatientonnewbooking;
                    break;
                case "patientreminderbefore3days":
                    result = Resources.SuppliesDotCom.patientreminderbefore3days;
                    break;
                case "patientreminderbefore1day":
                    result = Resources.SuppliesDotCom.patientreminderbefore1day;
                    break;
                case "patientReminderbeforeonappointmentday":
                    result = Resources.SuppliesDotCom.patientReminderbeforeonappointmentday;
                    break;
                case "everymorningnotificationtophysician":
                    result = Resources.SuppliesDotCom.everymorningnotificationtophysician;
                    break;
                case "appointmenttypessubtemplate":
                    result = Resources.SuppliesDotCom.AppointmentTypesSubTemplate;
                    break;
                case "physicianapporovelemail":
                    result = Resources.SuppliesDotCom.PhysicianApporovelEmail;
                    break;
                case "physiciancancelappointment":
                    result = Resources.SuppliesDotCom.AppointmentCancelByPhysician;
                    break;
                case "appointmentapprovedbyphysician":
                    result = Resources.SuppliesDotCom.AppointmentApprovedByPhysician;
                    break;
                case "barcodeview":
                    result = Resources.SuppliesDotCom.BarcodeView;
                    break;
            }
            return result;
        }

        #endregion
    }
}
