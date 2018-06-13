using System;
using System.Web;
using SuppliesDotCom.Interface;
using SuppliesDotCom.Common.Common;

namespace SuppliesDotCom.Common
{


    public static class HttpContextSessionWrapperExtension
    {
        public static HttpContextSessionWrapper HttpContextSessionWrapper { get { return new HttpContextSessionWrapper(); } }
       

        public static string SessionGuardianUserId { get { return HttpContextSessionWrapper.SessionGuardianUserId; } }
        public static string SelectedCulture { get { return HttpContextSessionWrapper.SelectedCulture; } }
        public static Byte[] ContentStream
        {
            get { return HttpContextSessionWrapper.ContentStream; }
            set { HttpContextSessionWrapper.ContentStream = value; }
        }
        public static Byte[] ContentStreamDoc
        {
            get { return HttpContextSessionWrapper.ContentStreamDoc; }
            set { HttpContextSessionWrapper.ContentStreamDoc = value; }
        }
        public static int? ContentLength
        {
            get { return HttpContextSessionWrapper.ContentLength; }
            set { if (value != null) HttpContextSessionWrapper.ContentLength = (int)value; }
        }
        public static string ContentType
        {
            get { return HttpContextSessionWrapper.ContentType; }
            set { HttpContextSessionWrapper.ContentType = value; }
        }
        public static string CroppedContentType
        {
            get { return HttpContextSessionWrapper.CroppedContentType; }
            set { HttpContextSessionWrapper.CroppedContentType = value; }
        }
    }

    public class HttpContextSessionWrapper : ISessionWrapper
    {
        public string ContentType
        {
            get { return GetFromSession<string>(SessionEnum.ContentType.ToString()); }
            set { SetInSession(SessionEnum.ContentType.ToString(), value); }
        }

        public string SessionGuardianUserId
        {
            get { return GetFromSession<string>(SessionEnum.SessionGuardianUserId.ToString()); }
            set { SetInSession(SessionEnum.SessionGuardianUserId.ToString(), value); }
        }
        public byte[] ContentStream
        {
            get { return GetFromSession<byte[]>(SessionEnum.ContentStream.ToString()); }
            set { SetInSession(SessionEnum.ContentStream.ToString(), value); }
        }
        public byte[] ContentStreamDoc
        {
            get { return GetFromSession<byte[]>(SessionEnum.ContentStreamDoc.ToString()); }
            set { SetInSession(SessionEnum.ContentStreamDoc.ToString(), value); }
        }
        public int ContentLength
        {
            get { return GetFromSessionStruct<Int32>(SessionEnum.ContentLength.ToString()); }
            set { SetInSession(SessionEnum.ContentLength.ToString(), value); }
        }
        public string CroppedContentType
        {
            get { return GetFromSession<string>(SessionEnum.CroppedContentType.ToString()); }
            set { SetInSession(SessionEnum.CroppedContentType.ToString(), value); }
        }
        private static T GetFromSessionStruct<T>(string key, T defaultValue = default(T)) where T : struct
        {
            var obj = HttpContext.Current.Session[key];
            if (obj == null)
            {
                return defaultValue;
            }
            return (T)obj;
        }
        public T GetFromSession<T>(string key) where T : class
        {
            var obj = HttpContext.Current.Session[key];
            return (T)obj;
        }
        private static void SetInSession<T>(string key, T value)
        {
            HttpContext.Current.Session[key] = value;
        }
       
        public string SessionGroupId
        {
            get { return GetFromSession<string>(SessionEnum.GroupId.ToString()); }
            set { SetInSession(SessionEnum.GroupId.ToString(), value); }
        }
        public string SelectedCulture
        {
            get { return GetFromSession<string>(SessionEnum.SelectedCulture.ToString()); }
            set { SetInSession(SessionEnum.SelectedCulture.ToString(), value); }
        }
        public string SecretLogin
        {
            get { return GetFromSession<string>(SessionEnum.SecretLogin.ToString()); }
            set { SetInSession(SessionEnum.SecretLogin.ToString(), value); }
        }

        public string PreviousGroupId
        {
            get { return GetFromSession<string>(SessionEnum.PreviousGroupId.ToString()); }
            set { SetInSession(SessionEnum.PreviousGroupId.ToString(), value); }
        }
        public string SessionParentId
        {
            get { return GetFromSession<string>(SessionEnum.parentId.ToString()); }
            set { SetInSession(SessionEnum.parentId.ToString(), value); }
        }


        public string SessionUtcDiffWithuniversalTime
        {
            get { return GetFromSession<string>(SessionEnum.UtcDiffWithuniversalTime.ToString()); }
            set { SetInSession(SessionEnum.UtcDiffWithuniversalTime.ToString(), value); }
        }

        public string IsDayLight
        {
            get { return GetFromSession<string>(SessionEnum.IsDayLight.ToString()); }
            set { SetInSession(SessionEnum.IsDayLight.ToString(), value); }
        }

        public string TimezoneName
        {
            get { return GetFromSession<string>(SessionEnum.TimezoneName.ToString()); }
            set { SetInSession(SessionEnum.TimezoneName.ToString(), value); }
        }

        
    }
}