using System;
using System.IO;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using SuppliesDotCom.Common.Common;
using System.Text;

namespace SuppliesDotCom.Common
{
    using System.Data;

    public class XmlParser
    {
        /// <summary>
        /// Method is used to get node values from the xml string
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public static string GetNodeValue(string xml)
        {
            var doc = XDocument.Parse(xml);
            var nodeValue = (from c in doc.Descendants("var")
                             where c.Attribute("name").Value == SuppliesDotCom.Common.Common.Constants.Prize3OfflineCatIDs
                             select c.Value).SingleOrDefault();
            return nodeValue == null ? "" : nodeValue;
        }
        /// <summary>
        /// Method is used to get prize factor node values from the xml string
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public static double GetNodeValuePrizeFactor(string xml)
        {
            var doc = XDocument.Parse(xml);
            var nodeValue = (from c in doc.Descendants("var")
                             where c.Attribute("name").Value == SuppliesDotCom.Common.Common.Constants.PrizeFactor
                             select c.Value).SingleOrDefault();
            return nodeValue == null ? 0.0 : Convert.ToDouble(nodeValue);
        }
        /// <summary>
        /// Method is used to get prize option choices from the xml string
        /// </summary>
        /// <param name="xml"></param>
        /// <param name="attributeName"></param>
        /// <returns></returns>
        public static string GetPrizeOptionChoices(string xml, string attributeName)
        {
            //xml = "<wddxPacket version='1.0'><header/><data><struct><var name='prize_option4'><string></string></var><var name='prize_option1'><string>Select colour:</string></var><var name='prize_option5_choices'><string></string></var><var name='prize_option2_choices'><string>S;M;L;XL;XXL</string></var><var name='prize_option3_choices'><string></string></var><var name='prize_option4_choices'><string></string></var><var name='prize_option1_choices'><string>439Driftwood;2C2GaleBlue;2C5TrueBlack</string></var><var name='prize_option5'><string></string></var><var name='prize_option3'><string></string></var><var name='prize_option2'><string>Select size:</string></var></struct></data></wddxPacket>";//hard code
            if (attributeName == SuppliesDotCom.Common.Common.Constants.AttributePrizeOption1)
                attributeName = SuppliesDotCom.Common.Common.Constants.PrizeOption1;
            else if (attributeName == SuppliesDotCom.Common.Common.Constants.AttributePrizeOptionChoices1)
                attributeName = SuppliesDotCom.Common.Common.Constants.PrizeOption1Choices;
            else if (attributeName == SuppliesDotCom.Common.Common.Constants.AttributePrizeOption2)
                attributeName = SuppliesDotCom.Common.Common.Constants.PrizeOption2;
            else if (attributeName == SuppliesDotCom.Common.Common.Constants.AttributePrizeOptionChoices2)
                attributeName = SuppliesDotCom.Common.Common.Constants.PrizeOption2Choices;

            var doc = XDocument.Parse(xml);
            var nodeValue = (from c in doc.Descendants("var")
                             where c.Attribute("name").Value == attributeName
                             select c.Value).SingleOrDefault();
            return nodeValue ?? "";
        }

        /// <summary>
        /// Saves the string to XML file.
        /// </summary>
        /// <param name="filePath">The file path.</param>
        /// <param name="data">The data.</param>
        /// <param name="fileName">Name of the file.</param>
        public static void SaveStringToXMLFile(string filePath, string data, string fileName)
        {
            var completeFilePath = filePath + "\\" + fileName + ".xml";
            if (!Directory.Exists(filePath))
                Directory.CreateDirectory(filePath);
            try
            {
                var doc = new XmlDocument();
                doc.LoadXml(data);
                doc.PreserveWhitespace = true;
                // Save the document to a file. White space is 
                // preserved (no white space).
                doc.Save(completeFilePath);
            }
            catch (Exception)
            {

            }

        }

        /// <summary>
        /// Gets the xmlstring.
        /// </summary>
        /// <param name="filePath">The file path.</param>
        /// <returns></returns>
        public static string GetXmlstring(string filePath)
        {
            var doc = new XmlDocument();
            doc.LoadXml(filePath);
            return doc.InnerXml.ToString();
        }


        /// <summary>
        /// Gets the formatted XML.
        /// </summary>
        /// <param name="xml">The XML.</param>
        /// <returns></returns>
        public static String GetFormattedXml(string xml)
        {
            var result = "";
            var mStream = new MemoryStream();
            var writer = new XmlTextWriter(mStream, Encoding.Unicode);
            var document = new XmlDocument();
            try
            {
                // Load the XmlDocument with the XML.
                document.LoadXml(xml);
                writer.Formatting = Formatting.Indented;
                // Write the XML into a formatting XmlTextWriter
                document.WriteContentTo(writer);
                writer.Flush();
                mStream.Flush();
                // Have to rewind the MemoryStream in order to read
                // its contents.
                mStream.Position = 0;
                // Read MemoryStream contents into a StreamReader.
                var sReader = new StreamReader(mStream);
                // Extract the text from the StreamReader.
                var formattedXml = sReader.ReadToEnd();
                result = formattedXml;
            }
            catch (XmlException)
            {
                //throw ex;
                return string.Empty;
            }
            mStream.Close();
            writer.Close();
            return result;
        }

        /// <summary>
        /// Gets the XML.
        /// </summary>
        /// <param name="xmlFileUrl">The XML file URL.</param>
        /// <returns></returns>
        public static string GetXML(string xmlFileUrl)
        {
            try
            {

                using (var xmlreader = new XmlTextReader(xmlFileUrl))
                {
                    var ds = new DataSet();
                    ds.ReadXml(xmlreader);
                    return ds.GetXml();
                }
            }
            catch (Exception )
            {
                return null;
            }
        }
    }
}
