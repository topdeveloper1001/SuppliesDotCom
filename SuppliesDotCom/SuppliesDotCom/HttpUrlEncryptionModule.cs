using System;
using System.Text;
using System.Web;

namespace SuppliesDotCom
{
    /// <summary>
    /// HttpUrlEncryptionModule to handle encryption and decryption of query strings in URL.
    /// </summary>
    public class HttpUrlEncryptionModule : IHttpModule
    {
        private const String EncryptionKey = "287C5D125D6B7E7223E1F719E3D58D17BB967703017E1BBE28618FAC6C4501E910C7E59800B5D4C2EDD5B0ED98874A3E952D60BAF260D9D374A74C76CB741803";
        private const String KeyForEncryptedQueryString = "D";
        private const String GetMethod = "GET";

        #region IHttpModule Members
        public void Dispose()
        {
        }
        public void Init(HttpApplication context)
        {
            context.BeginRequest += ApplicationContextBeginRequest;
        }

        #endregion
        /// <summary>
        /// Begin Request event that encrypts or decrypts the URL.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ApplicationContextBeginRequest(object sender, EventArgs e)
        {
            var httpContext = HttpContext.Current;
            if (!httpContext.Request.RawUrl.Contains("?")) return;
            if (httpContext.Request.Url.Query.Length == 0) return;
            var query = httpContext.Request.Url.Query.Substring(1);
            var path = HttpContext.Current.Request.Path;

            if (query.StartsWith(KeyForEncryptedQueryString, StringComparison.OrdinalIgnoreCase))
            {
                // Decrypts the query string and rewrites the path.
                var rawQuery = query.Replace(KeyForEncryptedQueryString + "=", string.Empty);
                var decryptedQuery = EncryptDecryptQueryString(rawQuery, false);
                httpContext.RewritePath(path, string.Empty, decryptedQuery);
            }
            else if (httpContext.Request.HttpMethod.Equals(GetMethod, StringComparison.OrdinalIgnoreCase)
                     && !query.StartsWith(KeyForEncryptedQueryString, StringComparison.OrdinalIgnoreCase))
            {
                // Encrypt the query string and redirects to the encrypted URL.
                // Remove if you don't want all query strings to be encrypted automatically.
                if (path.ToLowerInvariant().EndsWith(".js") || path.ToLowerInvariant().EndsWith(".css"))
                {
                    return;
                }
                var encryptedQuery = EncryptDecryptQueryString(query, true);
                httpContext.Response.Redirect(path + encryptedQuery);
            }
            else if (httpContext.Request.HttpMethod.Equals(GetMethod, StringComparison.OrdinalIgnoreCase)
                     && query.StartsWith(KeyForEncryptedQueryString, StringComparison.OrdinalIgnoreCase))
            {
                // Encrypt the query string and redirects to the encrypted URL.
                // Remove if you don't want all query strings to be encrypted automatically.
                var encryptedQuery = EncryptDecryptQueryString(query, false);
                httpContext.Response.Redirect(path + encryptedQuery);
            }
        }

        /// <summary>
        /// Encrypts or Decrypts the Querystring.
        /// </summary>
        /// <param name="queryString">QueryString to encrypt or decrypt.</param>
        /// <param name="isEncryption">True if for encryption.</param>
        /// <returns>Encrypted/Decrypted string.</returns>
        private string EncryptDecryptQueryString(string queryString, bool isEncryption)
        {
            if (isEncryption)
            {
                return "?" + KeyForEncryptedQueryString + "="
                    + EncryptDecryptText(true, queryString, EncryptionKey);
            }
            return EncryptDecryptText(false, queryString, EncryptionKey);
        }

        private static string EncryptDecryptText(bool isEncode, string text, string encryptionKey)
        {
            // Step 1. Hash the encryptionKey using MD5 hash generator as the result is a 128 bit byte array
            // which is a valid length for the TripleDES encoder we use below
            var hashProvider = new System.Security.Cryptography.MD5CryptoServiceProvider();
            var tdesKey = hashProvider.ComputeHash(Encoding.Unicode.GetBytes(encryptionKey));

            // Step 2. Create a new TripleDESCryptoServiceProvider object
            var tdesAlgorithm = new System.Security.Cryptography.TripleDESCryptoServiceProvider
                                {
                                    Key = tdesKey,
                                    Mode =
                                        System.Security
                                        .Cryptography
                                        .CipherMode.ECB,
                                    Padding =
                                        System.Security
                                        .Cryptography
                                        .PaddingMode.PKCS7
                                };

            // Step 3. Setup the encoder

            // Step 4. Convert the input text to a byte[]
            byte[] dataToEncryptDecrypt = isEncode ? Encoding.Unicode.GetBytes(text) : Convert.FromBase64String(text);

            // Step 5. Attempt to encrypt/Decrypt the string
            byte[] encryptDecryptedBytes;
            try
            {
                if (isEncode)
                {
                    var encryptor = tdesAlgorithm.CreateEncryptor();
                    encryptDecryptedBytes = encryptor.TransformFinalBlock(dataToEncryptDecrypt, 0,
                                                                          dataToEncryptDecrypt.Length);
                }
                else
                {
                    var decryptor = tdesAlgorithm.CreateDecryptor();
                    encryptDecryptedBytes = decryptor.TransformFinalBlock(dataToEncryptDecrypt, 0,
                                                                          dataToEncryptDecrypt.Length);
                }
            }
            finally
            {
                // Clear the TripleDes and Hashprovider services of any sensitive information
                tdesAlgorithm.Clear();
                hashProvider.Clear();
            }

            // Step 6. Return the encrypted string as a base64 encoded string
            return isEncode ? Convert.ToBase64String(encryptDecryptedBytes) : Encoding.Unicode.GetString(encryptDecryptedBytes);
        }
    }
}
