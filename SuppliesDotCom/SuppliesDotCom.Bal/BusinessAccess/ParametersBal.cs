using System;
using System.Collections.Generic;
using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class ParametersBal : BaseBal
    {
        /// <summary>
        /// Get the Entity
        /// </summary>
        /// <returns>Return the Entity List</returns>
        public List<Parameters> GetParameters()
        {
            try
            {
                using (var parametersRep = UnitOfWork.ParametersRepository)
                {
                    var lstParameters = parametersRep.Where(a => a.IsActive == null || (bool)a.IsActive).ToList();
                    return lstParameters;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get Entity Name By Id
        /// </summary>
        /// <returns>Return the Entity Respository</returns>
        // public string GetParametersNameById(int? ParametersID)
        // {
        //   using (var ParametersRep = UnitOfWork.ParametersRepository)
        //   {
        //       var iQueryabletransactions = ParametersRep.Where(a => a.ParametersId == ParametersID).FirstOrDefault();
        //       return (iQueryabletransactions != null) ? iQueryabletransactions.ParametersName : string.Empty;
        //   }
        //}

        /// <summary>
        /// Method to add/Update the Entity in the database.
        /// </summary>
        /// <param name="Parameters"></param>
        /// <returns></returns>
        public int AddUptdateParameters(Parameters Parameters)
        {
            using (var ParametersRep = UnitOfWork.ParametersRepository)
            {
                if (Parameters.ParametersID > 0)
                    ParametersRep.UpdateEntity(Parameters, Parameters.ParametersID);
                else
                    ParametersRep.Create(Parameters);
                return Parameters.ParametersID;
            }
        }

        /// <summary>
        /// Method to add the Entity in the database By Id.
        /// </summary>
        /// <param name="shared"></param>
        /// <returns></returns>
        public Parameters GetParametersByID(int? ParametersId)
        {
            using (var ParametersRep = UnitOfWork.ParametersRepository)
            {
                var Parameters = ParametersRep.Where(x => x.ParametersID == ParametersId).FirstOrDefault();
                return Parameters;
            }
        }

        public Parameters GetSingleParameterBySystemCode(string systemCode, int corporateId, int facilityId)
        {
            using (var rep = UnitOfWork.ParametersRepository)
            {
                var current = rep.Where(x => x.SystemCode.Equals(systemCode) && x.CorporateID != null && (int)x.CorporateID == corporateId && x.FacilityID != null && (int)x.FacilityID == facilityId).FirstOrDefault();
                return current;
            }
        }

        public List<ParametersCustomModel> GetParametersCustomModel(int corporateid, int facilityid)
        {
            try
            {
                var paramters = new List<ParametersCustomModel>();
                using (var parametersRep = UnitOfWork.ParametersRepository)
                {
                    var lstParameters = parametersRep.Where(a => (a.IsActive == null || (bool)a.IsActive)).ToList();
                    if (corporateid != 0)
                        lstParameters =
                            lstParameters.Where(a => a.CorporateID == corporateid && a.FacilityID == facilityid)
                                .ToList();
                    using (var globalCodeBal = new GlobalCodeBal())
                    {
                        paramters.AddRange(lstParameters.Select(item => new ParametersCustomModel()
                        {
                            ParametersID = item.ParametersID,
                            CorporateID = item.CorporateID,
                            FacilityID = item.FacilityID,
                            FacilityNumber = item.FacilityNumber,
                            ParamLevel = item.ParamLevel,
                            ParamName = item.ParamName,
                            ParamDescription = item.ParamDescription,
                            ParamType = item.ParamType,
                            ParamDataType = item.ParamDataType,
                            IntValue1 = item.IntValue1,
                            IntValue2 = item.IntValue2,
                            NumValue1 = item.NumValue1,
                            NumValue2 = item.NumValue2,
                            DatValue1 = item.DatValue1,
                            DatValue2 = item.DatValue2,
                            StrValue1 = item.StrValue1,
                            StrValue2 = item.StrValue2,
                            BitValue = item.BitValue,
                            EffectiveStartDate = item.EffectiveStartDate,
                            EffectiveEndDate = item.EffectiveEndDate,
                            ModifiedBy = item.ModifiedBy,
                            ModifiedDate = item.ModifiedDate,
                            IsActive = item.IsActive,
                            CreatedBy = item.CreatedBy,
                            CreatedDate = item.CreatedDate,
                            SystemCode = item.SystemCode,
                            ParamLevelName =
                                globalCodeBal.GetNameByGlobalCodeId(Convert.ToInt32(item.ParamLevel)),
                            ParamTypeName = item.ParamType == false ? "Single Value" : "Range",
                            ParamDataTypeName =
                                globalCodeBal.GetNameByGlobalCodeId(Convert.ToInt32(item.ParamDataType)),
                            Value1 =
                                Convert.ToInt32(item.ParamDataType) == Convert.ToInt32(ParamtersDataType.Integer)
                                    ? item.IntValue1.ToString()
                                    : Convert.ToInt32(item.ParamDataType) == Convert.ToInt32(ParamtersDataType.Numeric)
                                        ? item.NumValue1.ToString()
                                        : Convert.ToInt32(item.ParamDataType) == Convert.ToInt32(ParamtersDataType.Date)
                                            ? item.DatValue1 != null ? item.DatValue1.ToString() : string.Empty
                                            : Convert.ToInt32(item.ParamDataType) ==
                                              Convert.ToInt32(ParamtersDataType.String)
                                                ? item.StrValue1.ToString()
                                                : Convert.ToInt32(item.ParamDataType) ==
                                                  Convert.ToInt32(ParamtersDataType.Bool)
                                                    ? Convert.ToBoolean(item.BitValue).ToString()
                                                    : Convert.ToInt32(item.ParamDataType) == (Convert.ToInt32(ParamtersDataType.LocalTimeType))
                                                    ? (item.ExtValue1).ToString()
                                                    : Convert.ToInt32(item.ParamDataType) == (Convert.ToInt32(ParamtersDataType.DemoTimeType))
                                                        ? (item.ExtValue1).ToString() : string.Empty,
                            Value2 =
                                Convert.ToBoolean(item.ParamType)
                                    ? Convert.ToInt32(item.ParamDataType) == Convert.ToInt32(ParamtersDataType.Integer)
                                        ? item.IntValue2.ToString()
                                        : Convert.ToInt32(item.ParamDataType) ==
                                          Convert.ToInt32(ParamtersDataType.Numeric)
                                            ? item.NumValue2.ToString()
                                            : Convert.ToInt32(item.ParamDataType) ==
                                              Convert.ToInt32(ParamtersDataType.Date)
                                                ? item.DatValue2 != null ? item.DatValue2.ToString() : string.Empty
                                                : Convert.ToInt32(item.ParamDataType) ==
                                                  Convert.ToInt32(ParamtersDataType.String)
                                                    ? item.StrValue2.ToString()
                                                    : Convert.ToInt32(item.ParamDataType) ==
                                                      Convert.ToInt32(ParamtersDataType.Bool)
                                                        ? Convert.ToBoolean(item.BitValue).ToString()
                                                        : Convert.ToInt32(item.ParamDataType) == (Convert.ToInt32(ParamtersDataType.LocalTimeType))
                                                        ? (item.ExtValue2).ToString()
                                                        : Convert.ToInt32(item.ParamDataType) == (Convert.ToInt32(ParamtersDataType.DemoTimeType))
                                                            ? (item.ExtValue2).ToString()
                                                        : string.Empty
                                    : string.Empty,
                        }));
                        return paramters;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public ParametersCustomModel GetParametersCustomModelByID(int? ParametersId)
        {
            using (var ParametersRep = UnitOfWork.ParametersRepository)
            {
                using (var globalCodeBal = new GlobalCodeBal())
                {
                    var parametersobj = ParametersRep.Where(x => x.ParametersID == ParametersId).FirstOrDefault();
                    var parmcutomModel = new ParametersCustomModel();
                    if (parametersobj != null)
                    {
                        parmcutomModel.ParametersID = parametersobj.ParametersID;
                        parmcutomModel.CorporateID = parametersobj.CorporateID;
                        parmcutomModel.FacilityID = parametersobj.FacilityID;
                        parmcutomModel.FacilityNumber = parametersobj.FacilityNumber;
                        parmcutomModel.ParamLevel = parametersobj.ParamLevel;
                        parmcutomModel.ParamName = parametersobj.ParamName;
                        parmcutomModel.ParamDescription = parametersobj.ParamDescription;
                        parmcutomModel.ParamType = parametersobj.ParamType;
                        parmcutomModel.ParamDataType = parametersobj.ParamDataType;
                        parmcutomModel.IntValue1 = parametersobj.IntValue1;
                        parmcutomModel.IntValue2 = parametersobj.IntValue2;
                        parmcutomModel.NumValue1 = parametersobj.NumValue1;
                        parmcutomModel.NumValue2 = parametersobj.NumValue2;
                        parmcutomModel.DatValue1 = parametersobj.DatValue1;
                        parmcutomModel.DatValue2 = parametersobj.DatValue2;
                        parmcutomModel.StrValue1 = parametersobj.StrValue1;
                        parmcutomModel.StrValue2 = parametersobj.StrValue2;
                        parmcutomModel.BitValue = parametersobj.BitValue;
                        parmcutomModel.EffectiveStartDate = parametersobj.EffectiveStartDate;
                        parmcutomModel.EffectiveEndDate = parametersobj.EffectiveEndDate;
                        parmcutomModel.ModifiedBy = parametersobj.ModifiedBy;
                        parmcutomModel.ModifiedDate = parametersobj.ModifiedDate;
                        parmcutomModel.IsActive = parametersobj.IsActive;
                        parmcutomModel.CreatedBy = parametersobj.CreatedBy;
                        parmcutomModel.CreatedDate = parametersobj.CreatedDate;
                        parmcutomModel.SystemCode = parametersobj.SystemCode;
                        parmcutomModel.ParamLevelName =
                            globalCodeBal.GetNameByGlobalCodeId(Convert.ToInt32(parametersobj.ParamLevel));
                        parmcutomModel.ParamTypeName = parametersobj.ParamType == false ? "Single Value" : "Range";
                        parmcutomModel.ParamDataTypeName =
                            globalCodeBal.GetNameByGlobalCodeId(Convert.ToInt32(parametersobj.ParamDataType));
                        parmcutomModel.Value1 =
                            Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Integer)
                                ? parametersobj.IntValue1.ToString()
                                : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Numeric)
                                    ? parametersobj.NumValue1.ToString()
                                    : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Date)
                                        ? parametersobj.DatValue1 != null ? parametersobj.DatValue1.ToString() : string.Empty
                                        : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.String)
                                            ? parametersobj.StrValue1.ToString()
                                            : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Bool)
                                                ? Convert.ToBoolean(parametersobj.BitValue).ToString()
                                                : Convert.ToInt32(parametersobj.ParamDataType) == (Convert.ToInt32(ParamtersDataType.LocalTimeType))
                                                    ? (parametersobj.ExtValue1).ToString()
                                                    : Convert.ToInt32(parametersobj.ParamDataType) == (Convert.ToInt32(ParamtersDataType.DemoTimeType))
                                                        ? (parametersobj.ExtValue1).ToString() : string.Empty;
                        parmcutomModel.Value2 =
                            Convert.ToBoolean(parametersobj.ParamType)
                                ? Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Integer)
                                    ? parametersobj.IntValue2.ToString()
                                    : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Numeric)
                                        ? parametersobj.NumValue2.ToString()
                                        : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Date)
                                            ? parametersobj.DatValue2 != null ? parametersobj.DatValue2.ToString() : string.Empty
                                            : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.String)
                                                ? parametersobj.StrValue2.ToString()
                                                : Convert.ToInt32(parametersobj.ParamDataType) == Convert.ToInt32(ParamtersDataType.Bool)
                                                    ? Convert.ToBoolean(parametersobj.BitValue).ToString()
                                                    : Convert.ToInt32(parametersobj.ParamDataType) == (Convert.ToInt32(ParamtersDataType.LocalTimeType))
                                                        ? (parametersobj.ExtValue2).ToString()
                                                        : Convert.ToInt32(parametersobj.ParamDataType) == (Convert.ToInt32(ParamtersDataType.DemoTimeType))
                                                            ? (parametersobj.ExtValue2).ToString()
                                                            : string.Empty
                                : string.Empty;
                    }
                    return parmcutomModel;
                }
            }
        }
    }
}

