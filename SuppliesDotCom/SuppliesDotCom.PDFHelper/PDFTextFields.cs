using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;



namespace SuppliesDotCom.PDFHelper
{
    public class PDFTextFields
    {
        List<PdfControlList> listSpanishPdfControlList = new List<PdfControlList>();
        public List<PdfControlList> AddTextFields(ArgumentList argumentList, string ConectionString, string patientId, string encounterId)
        {
            String strConnString = ConectionString; //ConfigurationManager.ConnectionStrings["conString"].ConnectionString;
            SqlConnection con = new SqlConnection(strConnString);
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PID", patientId);
            cmd.Parameters.AddWithValue("@EID", encounterId);
            cmd.CommandText = "SPROC_FORM1_FeedDatainPDF";//  "GetAllSPs";  GetUDFs GetTables PF_PDFTemplateKeyNameKeyValueOMNI
            cmd.Connection = con;

            try
            {
                con.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        listSpanishPdfControlList.Add(
         new PdfControlList
         {
             ControlName = Convert.ToString(reader["KeyName"]),
             ControlValue = Convert.ToString(reader["KeyValue"])
         });
                    }
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }


            //   listSpanishPdfControlList.Add(
            //  new PdfControlList
            //  {
            //      ControlName = "conf_empname",
            //      ControlValue = "Jai baba Nanak"
            //  });

            //   listSpanishPdfControlList.Add(
            //new PdfControlList
            //{
            //    ControlName = "WL_NammedInsurance",
            //    ControlValue = PF_PDFTemplateWelcomeLetter.WL_NammedInsurance
            //});
            //   listSpanishPdfControlList.Add(
            //new PdfControlList
            //{
            //    ControlName = "WL_AccountCode",
            //    ControlValue = PF_PDFTemplateWelcomeLetter.WL_AccountCode
            //});
            //   listSpanishPdfControlList.Add(
            //  new PdfControlList
            //  {
            //      ControlName = "WL_PolicyHeader",
            //      ControlValue = PF_PDFTemplateWelcomeLetter.WL_PolicyHeader
            //  });
            //   listSpanishPdfControlList.Add(
            //   new PdfControlList
            //   {
            //       ControlName = "A_Agent",
            //       ControlValue = PF_PDFTemplateWelcomeLetter.A_Agent
            //   });
            //   listSpanishPdfControlList.Add(
            //     new PdfControlList
            //     {
            //         ControlName = "A_Borrower",
            //         ControlValue = PF_PDFTemplateWelcomeLetter.A_Borrower
            //     });
            return listSpanishPdfControlList;
        }
    }
}
