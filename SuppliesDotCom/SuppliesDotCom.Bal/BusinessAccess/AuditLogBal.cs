using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class AuditLogBal : BaseBal
    {

        /// <summary>
        /// Adds the uptdate audit log.
        /// </summary>
        /// <param name="auditLog">The audit log.</param>
        /// <returns></returns>
        public int AddUptdateAuditLog(AuditLog auditLog)
        {
            using (var auditlogRep = UnitOfWork.AuditLogRepository)
            {
                if (auditLog.AuditLogID > 0)
                    auditlogRep.UpdateEntity(auditLog, auditLog.AuditLogID);
                else
                    auditlogRep.Create(auditLog);
                return auditLog.AuditLogID;
            }
        }
    }
}
