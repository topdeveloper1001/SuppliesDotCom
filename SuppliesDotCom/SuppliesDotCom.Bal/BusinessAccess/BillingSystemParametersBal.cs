using System;
using System.Data.Entity.Validation;
using System.Linq;
using SuppliesDotCom.Model;


namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class SuppliesDotComParametersBal : BaseBal
    {
        ///// <summary>
        ///// Get the Entity
        ///// </summary>
        ///// <returns>Return the Entity List</returns>
        //public List<SuppliesDotComParametersCustomModel> GetSuppliesDotComParametersList(int corporateId)
        //{
        //    var list = new List<SuppliesDotComParametersCustomModel>();
        //    using (var rep = UnitOfWork.SuppliesDotComParametersRepository)
        //    {
        //        var lstSuppliesDotComParameters = corporateId > 0
        //            ? rep.Where(a => a.IsActive && a.CorporateId == corporateId).ToList()
        //            : rep.Where(a => a.IsActive).ToList();
        //        if (lstSuppliesDotComParameters.Count > 0)
        //        {
        //            list.AddRange(lstSuppliesDotComParameters.Select(item => new SuppliesDotComParametersCustomModel
        //            {
        //                Id = item.Id,
        //                ARGLacct = item.ARGLacct,
        //                BadDebtGLacct = item.BadDebtGLacct,
        //                BillHoldDays = item.BillHoldDays,
        //                CreatedBy = item.CreatedBy,
        //                CreatedDate = item.CreatedDate,
        //                EffectiveDate = item.EffectiveDate,
        //                EndDate = item.EndDate,
        //                ERCloseBillsHours = item.ERCloseBillsHours,
        //                ExternalValue1 = item.ExternalValue1,
        //                ExternalValue2 = item.ExternalValue2,
        //                ExternalValue3 = item.ExternalValue3,
        //                ExternalValue4 = item.ExternalValue4,
        //                FacilityName = GetFacilityNameByNumber(item.FacilityNumber),
        //                FacilityNumber = item.FacilityNumber,
        //                IsActive = item.IsActive,
        //                MgdCareGLacct = item.MgdCareGLacct,
        //                ModifiedBy = item.ModifiedBy,
        //                ModifiedDate = item.ModifiedDate,
        //                OupatientCloseBillsTime = item.OupatientCloseBillsTime,
        //                SmallBalanceAmount = item.SmallBalanceAmount,
        //                SmallBalanceGLacct = item.SmallBalanceGLacct,
        //                SmallBalanceWriteoffDays = item.SmallBalanceWriteoffDays
        //            }));
        //        }
        //    }
        //    return list;
        //}

        ///// <summary>
        ///// Method to add the Entity in the database By Id.
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //public SuppliesDotComParameters GetSuppliesDotComParametersById(int? id)
        //{
        //    using (var rep = UnitOfWork.SuppliesDotComParametersRepository)
        //    {
        //        var model = rep.Where(x => x.Id == id).FirstOrDefault();
        //        return model;
        //    }
        //}

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int SaveSuppliesDotComParameters(BillingSystemParameters model)
        {
            using (var rep = UnitOfWork.SuppliesDotComParametersRepository)
            {
                if (model.Id > 0)
                {
                    var oldValues = GetDetailsByBillingParameterId(model.Id);
                    var current = rep.GetSingle(model.Id);
                    model.CreatedBy = current.CreatedBy;
                    model.CreatedDate = current.CreatedDate;
                    rep.UpdateEntity(model, model.Id);

                    //Updates the table Number in all the Billing Code Database Tables
                    //rep.UpdateTableNumberInAllBillingCodes(Convert.ToInt32(model.CorporateId), model.FacilityNumber,
                    //  Convert.ToString(model.Id), oldValues.CPTTableNumber, oldValues.ServiceCodeTableNumber, oldValues.DrugTableNumber, oldValues.DRGTableNumber, oldValues.HCPCSTableNumber, oldValues.DiagnosisTableNumber);
                }
                else
                {
                    try
                    {
                        rep.Create(model);
                    }
                    catch (DbEntityValidationException dbEx)
                    {
                        var raise =
                            dbEx.EntityValidationErrors.Aggregate<DbEntityValidationResult, Exception>(dbEx,
                                (current1, validationErrors) =>
                                    validationErrors.ValidationErrors.Select(
                                        validationError =>
                                            string.Format("{0}:{1}", validationErrors.Entry.Entity.ToString(),
                                                validationError.ErrorMessage))
                                        .Aggregate(current1,
                                            (current, message) => new InvalidOperationException(message, current)));
                        throw raise;
                    }
                }

                return model.Id;
            }
        }

        /// <summary>
        /// Gets the details by corporate and facility.
        /// </summary>
        /// <param name="corporateId">The corporate identifier.</param>
        /// <param name="facilityNumber">The facility number.</param>
        /// <returns></returns>
        public BillingSystemParameters GetDetailsByCorporateAndFacility(int corporateId, string facilityNumber)
        {
            using (var rep = UnitOfWork.SuppliesDotComParametersRepository)
            {
                var item =
                    rep.Where(b => b.IsActive && b.CorporateId == corporateId && b.FacilityNumber.Equals(facilityNumber))
                        .OrderByDescending(b => b.Id).FirstOrDefault();
                return item ?? new BillingSystemParameters();
            }
        }

        public BillingSystemParameters GetDetailsByBillingParameterId(int billingParameterId)
        {
            using (var rep = UnitOfWork.SuppliesDotComParametersRepository)
            {
                var item =
                    rep.GetDetailsBySuppliesDotComParametersId(billingParameterId);
                return item ?? new BillingSystemParameters();
            }
        }

    }
}
