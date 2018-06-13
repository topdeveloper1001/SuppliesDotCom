using System.Collections.Generic;
namespace SuppliesDotCom.Common.Common
{
    public static class Constants
    {
        public const string DashboardCfm = "/ms_we_dashboard.cfm";
        public const string FaqCfm = "/faq.cfm";
        public const string HereAndNowCfm = "/here_and_now.cfm";
        public const string LeftCfm = "/left.cfm";
        public const string LoginCfm = "/ms_we_login.cfm";
        public const string MenuCfm = "/ms_we_menu";
        public const string ReportingCfm = "/ms_we_reporting.cfm";
        public const string Silver = "silver";
        public const string Gold = "gold";
        public const string Platinum = "platinum";
        public const string Afford = "afford";
        public const string News = "news";
        //
        public const string RgMatchEmailPattern =
                  @"^(([\w-]+\.)+[\w-]+|([a-zA-Z]{1}|[\w-]{2,}))@"
           + @"((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?
				[0-9]{1,2}|25[0-5]|2[0-4][0-9])\."
           + @"([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?
				[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|"
           + @"([a-zA-Z]+[\w-]+\.)+[a-zA-Z]{2,4})$";
        public const string HeaderAuthorization = "Authorization";
        public const string HeaderAuthorizationType = "OAuth ";
        public const string ContentType = "application/json; charset=utf-8";
        public const string ByDefaultRequestMethod = "POST";
        public const string ConsumerKey = "Anuj";
        public const string ConsumerSecret = "SecretGivenToConsumer";
        public const string OAuthVersion = "1.0";
        public const string OAuthParameterPrefix = "oauth_";
        public const string OAuthConsumerKeyKey = "oauth_consumer_key";
        public const string OAuthCallbackKey = "oauth_callback";
        public const string OAuthVersionKey = "oauth_version";
        public const string OAuthSignatureMethodKey = "oauth_signature_method";
        public const string OAuthSignatureKey = "oauth_signature";
        public const string OAuthTimestampKey = "oauth_timestamp";
        public const string OAuthNonceKey = "oauth_nonce";
        public const string OAuthTokenKey = "oauth_token";
        public const string OAuthTokenSecretKey = "oauth_token_secret";
        public const string Hmacsha1SignatureType = "HMAC-SHA1";
        public const string PlainTextSignatureType = "PLAINTEXT";
        public const string Rsasha1SignatureType = "RSA-SHA1";
        public const string Realm = "CocktailUKService";
        public const string UnreservedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";
        public const string HomeGroupTitle = "Family Group";

        public const string Prize3OfflineCatIDs = "PRIZE3_OFFLINECATIDS";
        public const string PrizeFactor = "PRIZE_FACTOR";
        public const string Appliances = "/CategoriesImages/Appliances.png";
        public const string Avatar = "/CategoriesImages/Avatar.png";
        public const string Clothing = "/CategoriesImages/Clothing.png";
        public const string Electronics = "/CategoriesImages/Electronics.png";
        public const string Home = "/CategoriesImages/Home.png";
        public const string Leisure = "/CategoriesImages/Leisure.png";
        public const string Kids_Corner = "/CategoriesImages/Kids_Corner.png";
        public const string Sports = "/CategoriesImages/Sports.png";
        public const string SmartBox = "/CategoriesImages/Smart_Box.png";
        public const string Prize2CategoryNameOrgKids = "børnehjørnet";
        public const string Prize2CategoryNameOrgSport = "Sport";
        public const string PrizeOption1 = "prize_option1";
        public const string PrizeOption1Choices = "prize_option1_choices";
        public const string PrizeOption2 = "prize_option2";
        public const string PrizeOption2Choices = "prize_option2_choices";
        public const string AttributePrizeOption1 = "PrizeOption1";
        public const string AttributePrizeOption2 = "PrizeOption2";
        public const string AttributePrizeOptionChoices1 = "PrizeOption1Choices";
        public const string AttributePrizeOptionChoices2 = "PrizeOption2Choices";
        public const string NullUser = "00000000-0000-0000-0000-000000000000";
    }
}
