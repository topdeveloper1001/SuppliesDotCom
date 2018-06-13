using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class CorporateBal : BaseBal
    {
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<Corporate> GetCorporate(int cId)
        {
            try
            {
                using (var corporateRep = UnitOfWork.CorporateRepository)
                {
                    var lstCorporate = cId > 0
                        ? corporateRep.Where(a => a.IsDeleted != true && a.CorporateID == cId).ToList()
                        : corporateRep.Where(a => a.IsDeleted != true).ToList();
                    return lstCorporate.OrderBy(x => x.CorporateNumber, new NumericComparer()).ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Get Entity Name By Id
        /// </summary>
        /// <returns>Return the Entity Respository</returns>
        public string GetCorporateNameById(int? corporateId)
        {
            using (var corporateRep = UnitOfWork.CorporateRepository)
            {
                var iQueryabletransactions = corporateRep.Where(a => a.CorporateID == corporateId).FirstOrDefault();
                return (iQueryabletransactions != null) ? iQueryabletransactions.CorporateName : string.Empty;
            }
        }

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="corporate"></param>
        /// <returns></returns>
        public int AddUptdateCorporate(Corporate corporate)
        {
            using (var corporateRep = UnitOfWork.CorporateRepository)
            {
                int newId;
                if (corporate.CorporateID > 0)
                {
                    var currentData = GetCorporateById(corporate.CorporateID);
                    corporate.CreatedBy = currentData.CreatedBy;
                    corporate.CreatedDate = currentData.CreatedDate;
                    newId = Convert.ToInt32(corporateRep.UpdateEntity(corporate, corporate.CorporateID));
                }
                else
                    newId = Convert.ToInt32(corporateRep.Create(corporate));

                return newId;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="CorporateId">The corporate identifier.</param>
        /// <returns></returns>
        public Corporate GetCorporateById(int? CorporateId)
        {
            using (var corporateRep = UnitOfWork.CorporateRepository)
            {
                var corporate = corporateRep.Where(x => x.CorporateID == CorporateId).FirstOrDefault();
                return corporate;
            }
        }

        /// <summary>
        /// Method to To check Duplicate Corporate on the basis of Name
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public bool CheckDuplicateCorporate(string name, int id)
        {
            try
            {
                using (var corporateRep = UnitOfWork.CorporateRepository)
                {
                    var res = corporateRep.Where(x => x.CorporateID != id && x.IsDeleted != true && x.CorporateName == name).FirstOrDefault();
                    return res != null;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Checks the duplicate corporate number.
        /// </summary>Updated By Krishna on 21082015
        /// <param name="number">The number.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public bool CheckDuplicateCorporateNumber(string number, int id)
        {
            try
            {
                using (var corporateRep = UnitOfWork.CorporateRepository)
                {
                    var res = corporateRep.Where(x => x.CorporateID != id && x.IsDeleted != true && x.CorporateNumber == number).FirstOrDefault();
                    return res != null;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Deletes the corporate data.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <returns></returns>
        public bool DeleteCorporateData(string corporateId)
        {
            return UnitOfWork.CorporateRepository.DeleteCorporateData(corporateId);
        }

        /// <summary>
        /// Gets the corporate DDL.
        /// </summary>
        /// <param name="cId">The c identifier.</param>
        /// <returns></returns>
        public List<Corporate> GetCorporateDDL(int cId)
        {
            try
            {
                using (var corporateRep = UnitOfWork.CorporateRepository)
                {
                    var lstCorporate =
                        corporateRep.Where(
                            a => (a.IsDeleted == null || !(bool)a.IsDeleted) && (cId == 0 || a.CorporateID == cId))
                            .ToList();
                    return lstCorporate.OrderBy(x => x.CorporateID).ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="defaultTableNumber"></param>
        /// <param name="corporateId"></param>
        /// <returns></returns>
        public bool CheckDefaultTableNumber(string defaultTableNumber, int corporateId)
        {
            bool retValue;
            using (var corporateRep = UnitOfWork.CorporateRepository)
            {
                var count = corporateRep.Where(i => i.DefaultDRUGTableNumber == defaultTableNumber && i.CorporateID != corporateId).Count();
                retValue = count > 0;
            }
            return retValue;
        }
        ///// <summary>
        ///// Get the Entity
        ///// </summary>
        ///// <returns>Return the Entity List</returns>
        //public List<CorporateCustomModel> GetCorporateCustomModel(int cId)
        //{
        //    try
        //    {
        //        using (var CorporateRep = UnitOfWork.CorporateRepository)
        //        {
        //            var lstCorporate = cId > 0 ? CorporateRep.Where(a => (a.IsDeleted == null || !(bool)a.IsDeleted) && a.CorporateID == cId).ToList() : CorporateRep.Where(a => a.IsDeleted == null || !(bool)a.IsDeleted).ToList();
        //            return lstCorporate;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        /// <summary>
        /// Gets all corporate.
        /// </summary>
        /// <returns></returns>
        public List<Corporate> GetAllCorporate()
        {
            try
            {
                using (var corporateRep = UnitOfWork.CorporateRepository)
                {
                    var lstCorporate = corporateRep.Where(a => a.IsDeleted == null || !(bool)a.IsDeleted).ToList();
                    return lstCorporate.OrderByDescending(x => x.CorporateID).ToList();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public void CreateDefaultCorporateItem(int corporateId, string corporateName)
        {
            using (var rep = UnitOfWork.CorporateRepository)
            {
                rep.CreateDefaultCorporateItem(corporateId, corporateName);
            }
        }

        public List<DropdownListData> GetCorporateDropdownData(int cId)
        {
            var list = new List<DropdownListData>();
            using (var corporateRep = UnitOfWork.CorporateRepository)
            {
                var lstCorporate =
                    corporateRep.Where(
                        a => (a.IsDeleted == null || !(bool)a.IsDeleted) && (cId == 0 || a.CorporateID == cId))
                        .ToList();

                list.AddRange(lstCorporate.Select(item => new DropdownListData
                {
                    Text = item.CorporateName,
                    Value = Convert.ToString(item.CorporateID)
                }));
            }
            return list;
        }
    }
}

