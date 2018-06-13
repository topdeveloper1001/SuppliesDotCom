using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace SuppliesDotCom.Common
{
    public class Anchor
    {
        /// <summary>
        /// Method is used get anchor text from the string value
        /// </summary>
        /// <param name="html"></param>
        /// <returns></returns>
        public static string GetAnchorText(string html)
        {
            var aText = Regex.Matches(html, @"<a [^>]*>(.*?)</a>").Cast<Match>().Select(m => m.Groups[1].Value).FirstOrDefault();
            return aText;
        }
        /// <summary>
        /// Method is used to get href value from anchor 
        /// </summary>
        /// <param name="html"></param>
        /// <returns></returns>
        public static string GetAnchorHref(string html)
        {
            var regex = new Regex("<a [^>]*href=(?:'(?<href>.*?)')|(?:\"(?<href>.*?)\")", RegexOptions.IgnoreCase);
            var hrefList = regex.Matches(html).OfType<Match>().Select(m => m.Groups["href"].Value).ToList();
            var aHref = "";
            foreach (var item in hrefList)
            {
                if (item.Contains(".cfm") || item.Contains("campaign_id") || item.Contains("campaign_link_url"))
                {
                    aHref = item;
                }
            }
            //var aHref = regex.Matches(html).OfType<Match>().Select(m => m.Groups["href"].Value).FirstOrDefault();
            return aHref;
        }
    }
}
