using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace SuppliesDotCom.Common
{
    public class MailHelper
    {
        //public static bool SendMail(EmailInfo objRequest)
        //{
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(objRequest.VerificationLink))
        //            objRequest.VerificationLink = Helpers.ResolveUrl2(string.Format("{0}?e={1}&vtoken={2}", objRequest.VerificationLink, objRequest.Email, objRequest.VerificationTokenId));

        //        objRequest.MessageBody = objRequest.MessageBody.Replace("{url}", objRequest.VerificationLink);
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        //LogFile.WriteLog(DateTime.Now,"2 Exception orccred while sending email : " + ex.Message);
        //        // throw ex;
        //        return false;
        //    }
        //}

        //public static bool SendMail2(EmailInfo objRequest)
        //{
        //    try
        //    {
        //        var enableSsl = Convert.ToBoolean(Utility.GetAppSettings(AppSettingsKeys.EnableSsl));
        //        var smtpMailClient = new SmtpClient(Utility.GetAppSettings(AppSettingsKeys.SmtpServerHost),
        //            int.Parse(Utility.GetAppSettings(AppSettingsKeys.SmtpServerPort)))
        //        {
        //            UseDefaultCredentials = false,
        //            EnableSsl = enableSsl,
        //            Credentials =
        //                new NetworkCredential(Utility.GetAppSettings(AppSettingsKeys.SmtpServerUserName),
        //                    //AppSettingsKeys.SmtpServerUserPassword
        //                    Utility.GetDecryptedAppSettingsValue(AppSettingsKeys.SmtpServerUserPassword))
        //        };

        //        var userName = Utility.GetAppSettings(AppSettingsKeys.SchedulingNotificationEmailFrom);
        //        //var userName = Utility.GetAppSettings(AppSettingsKeys.SmtpServerUserName);
        //        var mailMessage = new MailMessage(new MailAddress(userName, objRequest.DisplayName),
        //            new MailAddress(objRequest.Email, String.Empty))
        //        {
        //            Subject = objRequest.Subject,
        //            Body = objRequest.MessageBody,
        //            IsBodyHtml = true
        //        };
        //        smtpMailClient.Send(mailMessage);


        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        //LogFile.WriteLog(DateTime.Now,"2 Exception orccred while sending email : " + ex.Message);
        //        // throw ex;
        //        return false;
        //    }
        //}

        //public static bool SendMail3(EmailInfo objRequest)
        //{
        //    try
        //    {
        //        var smtpMailClient = new SmtpClient();
        //        var userName = Utility.GetAppSettings(AppSettingsKeys.SchedulingNotificationEmailFrom);
        //        var mailMessage = new MailMessage(new MailAddress(userName, objRequest.DisplayName),
        //            new MailAddress(objRequest.Email, String.Empty))
        //        {
        //            Subject = objRequest.Subject,
        //            Body = objRequest.MessageBody,
        //            IsBodyHtml = true
        //        };

        //        //SmtpExeption(smtpMailClient);
        //        smtpMailClient.Send(mailMessage);


        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        ErrorLog(ex);
        //        //LogFile.WriteLog(DateTime.Now,"2 Exception orccred while sending email : " + ex.Message);
        //        // throw ex;
        //        return false;
        //    }
        //}

        public static void ErrorLog(Exception ex)
        {
            var date = DateTime.Now.Day + "." + DateTime.Now.Month + "." + DateTime.Now.Year;
            string subPath = "LogFolder";
            bool exists = Directory.Exists(HttpContext.Current.Server.MapPath(subPath));
            if (!exists)
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath(subPath));

            var filePathName = "~/" + subPath + "/" + date + "CallBackLog.txt";
            if (!System.IO.File.Exists(HttpContext.Current.Server.MapPath(filePathName)))
            {

                FileStream fs1 = new FileStream(HttpContext.Current.Server.MapPath(filePathName), FileMode.OpenOrCreate, FileAccess.ReadWrite);
                StreamWriter file2 = new StreamWriter(fs1);
                file2.WriteLine("todaydate->" + DateTime.Now);
                file2.Close();
            }
            else
            {
                using (StreamWriter sw = System.IO.File.AppendText(HttpContext.Current.Server.MapPath(filePathName)))
                {
                    sw.WriteLine(ex.Message);
                    sw.WriteLine(ex.StackTrace);
                }
            }

        }


        public static void SmtpExeption(SmtpClient exe)
        {
            var date = DateTime.Now.Day + "." + DateTime.Now.Month + "." + DateTime.Now.Year;
            string subPath = "LogFolder";


            bool exists = Directory.Exists(HttpContext.Current.Server.MapPath(subPath));
            if (!exists)
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath(subPath));

            var filePathName = "~/" + subPath + "/" + date + "smtpException.txt";
            if (!System.IO.File.Exists(HttpContext.Current.Server.MapPath(filePathName)))
            {

                FileStream fs1 = new FileStream(HttpContext.Current.Server.MapPath(filePathName), FileMode.OpenOrCreate, FileAccess.ReadWrite);
                StreamWriter file2 = new StreamWriter(fs1);
                file2.WriteLine("todaydate->" + DateTime.Now);
                file2.WriteLine(exe.Port);

                file2.Close();
            }
            else
            {
                using (StreamWriter sw = System.IO.File.AppendText(HttpContext.Current.Server.MapPath(filePathName)))
                {
                    sw.WriteLine("Port: " + exe.Port);
                    sw.WriteLine("Host: " + exe.Host);
                    sw.WriteLine("Credential: " + exe.Credentials);
                    sw.WriteLine("Delivery Format: " + exe.DeliveryFormat);
                    sw.WriteLine("Essl: " + exe.EnableSsl);
                    sw.WriteLine("Target Name:  " + exe.TargetName);
                }
            }

        }

        public static async Task<bool> SendEmailAsync(EmailInfo objRequest)
        {
            if (!string.IsNullOrEmpty(objRequest.VerificationLink))
            {
                objRequest.VerificationLink = Helpers.ResolveUrl2(string.Format("{0}?e={1}&vtoken={2}", objRequest.VerificationLink, objRequest.Email, objRequest.VerificationTokenId));
                objRequest.MessageBody = objRequest.MessageBody.Replace("{url}", objRequest.VerificationLink);
            }


            var client = new SendGridClient("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");

            var userName = Utility.GetAppSettings(AppSettingsKeys.SchedulingNotificationEmailFrom);
            var mailMessage = new MailMessage(new MailAddress(userName, objRequest.DisplayName),
                new MailAddress(objRequest.Email, String.Empty))
            {
                Subject = objRequest.Subject,
                Body = objRequest.MessageBody,
                IsBodyHtml = true
            };

            var msg = CreateSingleEmail(new EmailAddress(userName, objRequest.DisplayName), new EmailAddress(objRequest.Email, String.Empty),
                objRequest.Subject, string.Empty, objRequest.MessageBody);

            var response = await client.SendEmailAsync(msg);
            return response.StatusCode == HttpStatusCode.Accepted;
        }


        private static SendGridMessage CreateSingleEmail(EmailAddress from,
                                                        EmailAddress to,
                                                        string subject,
                                                        string plainTextContent,
                                                        string htmlContent)
        {
            var msg = new SendGridMessage();
            msg.SetFrom(from);
            msg.SetSubject(subject);
            if (!string.IsNullOrEmpty(plainTextContent))
            {
                msg.AddContent(MimeType.Text, plainTextContent);
            }

            if (!string.IsNullOrEmpty(htmlContent))
            {
                msg.AddContent(MimeType.Html, htmlContent);
            }

            msg.AddTo(to);
            return msg;
        }
    }
}