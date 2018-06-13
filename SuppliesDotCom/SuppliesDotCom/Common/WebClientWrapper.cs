using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace SuppliesDotCom.Common
{
    public class WebClientWrapper : IDisposable
    {
        public WebClient WebClient;
        private const string ConsumerKey = "Anuj";
        private const string ConsumerSecret = "SecretGivenToConsumer";
        private const string ByDefaultRequestMethod = "GET";
        private const string HeaderAuthorization = "Authorization";
        private const string HeaderAuthorizationType = "OAuth ";

        public WebClientWrapper(Uri uri)
        {
            WebClient = new WebClient();
            //AddRequestHeaders(ByDefaultRequestMethod, uri);
        }

        public WebClientWrapper(WebClient webClient, Uri uri)
        {
            WebClient = webClient;
            //AddRequestHeaders(ByDefaultRequestMethod, uri);
        }

        public void Dispose()
        {
            WebClient = null;
        }
    }
}