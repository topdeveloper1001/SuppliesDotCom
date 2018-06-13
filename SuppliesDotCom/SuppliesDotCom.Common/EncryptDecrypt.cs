using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace SuppliesDotCom.Common
{
    public class EncryptDecrypt
    {
        /// <summary>
        /// Method is used to encrypt string value
        /// </summary>
        /// <param name="Data"></param>
        /// <returns></returns>
        public static string Encrypt(string Data)
        {
            var shaM = new SHA1Managed();
            Convert.ToBase64String(shaM.ComputeHash(Encoding.ASCII.GetBytes(Data)));
            //// Getting the bytes of the encrypted data.// 
            byte[] bytEncrypt = ASCIIEncoding.ASCII.GetBytes(Data);
            //// Converting the byte into string.// 
            string strEncrypt = System.Convert.ToBase64String(bytEncrypt);
            return strEncrypt;
        }
        /// <summary>
        /// Method is used encrypt integer values
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string EncryptInteger(int input)
        {
            var Data = Convert.ToString(input);
            var shaM = new SHA1Managed();
            Convert.ToBase64String(shaM.ComputeHash(Encoding.ASCII.GetBytes(Data)));
            //// Getting the bytes of the encrypted data.// 
            byte[] bytEncrypt = ASCIIEncoding.ASCII.GetBytes(Data);
            //// Converting the byte into string.// 
            string strEncrypt = System.Convert.ToBase64String(bytEncrypt);
            return strEncrypt;
        }
        /// <summary>
        /// Method is used to decrypt string values
        /// </summary>
        /// <param name="Data"></param>
        /// <returns></returns>
        public static string Decrypt(string Data)
        {
            byte[] bytData = System.Convert.FromBase64String(Data);
            string strData = ASCIIEncoding.ASCII.GetString(bytData);
            return strData;
        }
    
    
    
        private static byte[] KEY = new byte[] { 0x12, 0xe3, 0x4a, 0xa1, 0x45, 0xd2, 0x56, 0x7c, 0x54, 0xac, 0x67, 0x9f, 0x45, 0x6e, 0xaa, 0x56 };
        private static byte[] IV = new byte[] { 0x12, 0xe3, 0x4a, 0xa1, 0x45, 0xd2, 0x56, 0x7c };


        public static string GetEncryptedData(string input, string strEncryption)
        {
          
                if (strEncryption == "N") return input;
                //var decalruptpasword = DecryptBase64("mTsBiy1m+2LIlx5ERsHryQ==", KEY, IV);
                return EncryptBase64(input, KEY, IV);
           
        }

        public static string GetDecryptedData(string input, string strDecryption)
        {
            
                if (strDecryption == "N") return input;
                return DecryptBase64(input, KEY, IV);
            
        }

        public static string EncryptBase64(string StringToEncrypt, byte[] Key, byte[] IV)
        {
            TripleDESCryptoServiceProvider tripledes = new TripleDESCryptoServiceProvider();

            byte[] inputByteArray = Encoding.UTF8.GetBytes(StringToEncrypt);

            MemoryStream ms = new MemoryStream();

            CryptoStream cs = new CryptoStream(ms, tripledes.CreateEncryptor(Key, IV), CryptoStreamMode.Write);

            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();

            String str = Convert.ToBase64String(ms.ToArray());
            cs.Clear();
            return str;
        }

        public static string DecryptBase64(string ciphertext, byte[] Key, byte[] IV)
        {
            TripleDESCryptoServiceProvider tripledes = new TripleDESCryptoServiceProvider();

            MemoryStream ms = new MemoryStream();

            CryptoStream cs = new CryptoStream(ms, tripledes.CreateDecryptor(Key, IV), CryptoStreamMode.Write);

            byte[] cipherbytes = Convert.FromBase64String(ciphertext);

            cs.Write(cipherbytes, 0, cipherbytes.Length);
            cs.FlushFinalBlock();

            //construct the string
            byte[] DecryptedArray = ms.ToArray();
            Char[] characters = new Char[43693];
            Decoder dec = Encoding.UTF8.GetDecoder();

            int charlen = dec.GetChars(DecryptedArray, 0, DecryptedArray.Length, characters, 0);

            string DecrpytedString = new string(characters, 0, charlen);

            return DecrpytedString;
        }
    
    
    }
}
