using System;
using System.Linq;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class LoginTrackingBal : BaseBal
    {
        /// <summary>
        /// Get the Most Recent Login tracking info
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="loginType">Type of the login.</param>
        /// <returns></returns>
        public bool IsFirstTimeLoggedIn(int? userId, int loginType)
        {
            using (var rep = UnitOfWork.LoginTrackingRepository)
            {
                var isFirstTime =
                    rep.GetAll()
                        .Where(o => o.ID == userId && o.LoginUserType == loginType)
                        .OrderByDescending(m => m.LoginTime)
                        .Any();
                return !isFirstTime;
            }
        }

        //Function to add update login tracking
        /// <summary>
        /// Adds the update login tracking data.
        /// </summary>
        /// <param name="loginTracking">The login tracking.</param>
        /// <returns></returns>
        public int AddUpdateLoginTrackingData(LoginTracking loginTracking)
        {
            try
            {
                using (var ltRepository = UnitOfWork.LoginTrackingRepository)
                {
                    if (loginTracking.LoginTrackingID > 0)
                        ltRepository.UpdateEntity(loginTracking, loginTracking.LoginTrackingID);
                    else
                        ltRepository.Create(loginTracking);
                    return loginTracking.LoginTrackingID;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int UpdateLoginOutTime(int userId, DateTime logouttime)
        {
            using (var rep = UnitOfWork.LoginTrackingRepository)
            {
                var current = rep.Where(l => l.ID == userId).OrderByDescending(m => m.LoginTime).FirstOrDefault();
                if (current != null)
                {
                    current.LogoutTime = logouttime;
                    rep.UpdateEntity(current, current.LoginTrackingID);
                    return current.LoginTrackingID;
                }
            }
            return 0;
        }


    }
}
