using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace SuppliesDotCom.Common
{
    public class WebRequestWrapper : IDisposable
    {
        public WebRequest Request;
        private const string HeaderAuthorization = "Authorization";
        private const string HeaderAuthorizationType = "OAuth ";
        private const string ContentType = "application/json; charset=utf-8";
        private const string ByDefaultRequestMethod = "POST";
        private const string consumerKey = "Anuj";
        private const string consumerSecret = "SecretGivenToConsumer";

        public WebRequestWrapper(string method, Uri uri)
        {
            var requestUri = uri;
            Request = WebRequest.Create(requestUri);
            Request.Method = method;
            Request.ContentType = ContentType;
            //AddRequestHeaders(method, uri);
        }
        public WebRequestWrapper(string method, Uri uri, string contentType, Int32 timeout, Int32 readtimeout)
        {
            var requestUri = uri;
            Request = WebRequest.Create(requestUri);
            Request.Method = method;
            Request.ContentType = contentType;
            Request.Timeout = timeout;
            //Request.ReadWriteTimeout = 1000 * (60 * 6);
            //AddRequestHeaders(method, uri);
        }
        public WebRequestWrapper(Uri uri)
        {
            var requestUri = uri;
            Request = WebRequest.Create(requestUri);
            Request.Method = ByDefaultRequestMethod;
            Request.ContentType = ContentType;
            //AddRequestHeaders(ByDefaultRequestMethod, uri);
        }



        public void Dispose()
        {
            Request = null;
        }
    }
}