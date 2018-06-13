using System.Linq;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;
using System.Collections.Generic;
using System;

namespace SuppliesDotCom.Bal.BusinessAccess
{
    public class GlobalCodeBal : BaseBal
    {
        public List<GlobalCodeCustomModel> GetAllGlobalCodes(string categoryValue)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var mList = rep.Where(a => a.GlobalCodeCategoryValue.Equals(categoryValue) && a.IsActive && a.IsDeleted != true).ToList();
                if(mList.Any())
                {
                    list.AddRange(mList.Select(items => new GlobalCodeCustomModel
                    {
                        GlobalCodes = items,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(items.GlobalCodeCategoryValue)
                    }));
                }
            }
            return list;
        }

        public List<GlobalCodeCustomModel> DeleteGlobalCodeById(int id,string category)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                rep.Delete(id);
                var mList = rep.Where(a => a.GlobalCodeCategoryValue.Equals(category) && a.IsActive && a.IsDeleted != true).ToList();
                if (mList.Any())
                {
                    list.AddRange(mList.Select(items => new GlobalCodeCustomModel
                    {
                        GlobalCodes = items,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(items.GlobalCodeCategoryValue)
                    }));
                }
            }
            return list;
        }

        //Function to get GlobalCodes by GlobalCodeID
        /// <summary>
        /// Gets the global code by global code identifier.
        /// </summary>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public GlobalCodes GetGlobalCodeByGlobalCodeId(int globalCodeId)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = gcRep.Where(s => s.IsDeleted == false && s.GlobalCodeID == globalCodeId).FirstOrDefault();
                return globalCode ?? new GlobalCodes();
            }
        }

        //Function to get GlobalCodes by GlobalCodeCategoryID
        /// <summary>
        /// Gets the global code by global code category identifier.
        /// </summary>
        /// <param name="categoryValue">The global code category identifier.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetGCodesListByCategoryValue(string categoryValue)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var list = gcRep.Where(s => s.IsDeleted == false
                && s.GlobalCodeCategoryValue.Equals(categoryValue))
                .OrderBy(g => g.SortOrder).ToList();
                return list;
            }
        }

        //Function to add update tab
        /// <summary>
        /// Adds the update global codes.
        /// </summary>
        /// <param name="globalCodes">The global codes.</param>
        /// <returns></returns>
        public int AddUpdateGlobalCodes(GlobalCodes globalCodes)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                gcRep.AutoSave = true;

                if (string.IsNullOrEmpty(globalCodes.GlobalCodeValue) || int.Parse(globalCodes.GlobalCodeValue) == 0)
                {
                    var maxId = GetMaxGlobalCodeValueByCategory(globalCodes.GlobalCodeCategoryValue) + 1;
                    globalCodes.GlobalCodeValue = Convert.ToString(maxId);
                }


                if (globalCodes.GlobalCodeID > 0)
                {
                    var current = gcRep.GetSingle(globalCodes.GlobalCodeID);
                    if (current != null)
                    {
                        globalCodes.CreatedBy = current.CreatedBy;
                        globalCodes.CreatedDate = current.CreatedDate;
                    }
                    gcRep.UpdateEntity(globalCodes, globalCodes.GlobalCodeID);
                }
                else
                    gcRep.Create(globalCodes);
                return globalCodes.GlobalCodeID;
            }
        }

        /// <summary>
        /// Adds the update global codes list.
        /// </summary>
        /// <param name="globalCodes">The global codes.</param>
        /// <returns></returns>
        public bool AddUpdateGlobalCodesList(List<GlobalCodes> globalCodes)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                gcRep.AutoSave = true;
                try
                {
                    var objToDelete = GetPreviousRecords(globalCodes[0].FacilityNumber, globalCodes[0].ExternalValue1);
                    if (objToDelete.Any()) gcRep.Delete(objToDelete);
                    gcRep.Create(globalCodes);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public List<GlobalCodes> GetPreviousRecords(string facilitynumber, string roomId)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var objToDelete =
                                        gcRep.Where(
                                            x =>
                                            x.GlobalCodeCategoryValue == "4910" && x.FacilityNumber == facilitynumber && x.ExternalValue1 == roomId)
                                            .ToList();
                return objToDelete;
            }
        }

        /// <summary>
        /// Gets the list by category identifier.
        /// </summary>
        /// <param name="categoryValue">The identifier.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetGlobalCodesByCategoryValue(string categoryValue, string fn = "")
        {
            using (var gRepository = UnitOfWork.GlobalCodeRepository)
            {
                var list = gRepository.Where(g => g.GlobalCodeCategoryValue.Equals(categoryValue) && g.IsActive && g.IsDeleted.HasValue && !g.IsDeleted.Value
                && (string.IsNullOrEmpty(fn) || g.FacilityNumber.Equals(fn))
                ).ToList();
                return list.OrderBy(x => x.GlobalCodeName).ToList();
            }
        }

        /// <summary>
        /// Gets the type of the encounter types by patient.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="patientTypeId">The patient type identifier.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetEncounterTypesByPatientType(string id, string patientTypeId)
        {
            using (var gRepository = UnitOfWork.GlobalCodeRepository)
            {
                var list =
                    gRepository.Where(
                        g =>
                            g.GlobalCodeCategoryValue.Equals(id) && !(bool)g.IsDeleted &&
                            g.ExternalValue1.Equals(patientTypeId)).OrderBy(g => g.GlobalCodeID).ToList();
                return list;
            }
        }

        /// <summary>
        /// Method to To check Duplicate GlobalCodeName
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="id">The identifier.</param>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public bool CheckDuplicateGlobalCodeName(string name, int id, string categoryValue, string facilityNumber)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                name = name.Trim().ToLower();

                var isExists =
                    rep.Where(
                        g =>
                            g.IsDeleted == false && g.GlobalCodeName.Trim().ToLower().Equals(name) &&
                            g.GlobalCodeCategoryValue.Trim().Equals(categoryValue) &&
                            (string.IsNullOrEmpty(facilityNumber) || g.FacilityNumber.Equals(facilityNumber))
                            &&
                            ((id > 0 && g.GlobalCodeID != id) || id == 0)).Any();
                return isExists;
            }
        }

        /// <summary>
        /// Gets the global code by identifier and category identifier.
        /// </summary>
        /// <param name="categoryValue">The category identifier.</param>
        /// <param name="globalCodeValue">The global code identifier.</param>
        /// <returns></returns>
        public string GetNameByGlobalCodeValueAndCategoryValue(string categoryValue, string globalCodeValue)
        {
            if (!string.IsNullOrEmpty(categoryValue) && !string.IsNullOrEmpty(globalCodeValue))
            {
                using (var rep = UnitOfWork.GlobalCodeRepository)
                {
                    var globalCode = rep.Where(c => c.GlobalCodeCategoryValue.Equals(categoryValue)
                    && c.GlobalCodeValue.Equals(globalCodeValue)).FirstOrDefault();

                    if (globalCode != null)
                        return globalCode.GlobalCodeName;
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the global code name by identifier and category identifier.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public string GetGlobalCodeNameByIdAndCategoryId(string categoryId, int globalCodeId)
        {
            using (var cateRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = cateRep.Where(c => c.GlobalCodeCategoryValue.Equals(categoryId) && c.GlobalCodeID == globalCodeId).FirstOrDefault();
                if (globalCode != null)
                    return globalCode.GlobalCodeName;
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the global codes by categories range.
        /// </summary>
        /// <param name="startRange">The start range.</param>
        /// <param name="endRange">The end range.</param>
        /// <returns></returns>
        public List<GlobalCodeCustomModel> GetGlobalCodesByCategoriesRange(int startRange, int endRange)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var gModellist =
                    rep.Where(f => f.IsDeleted != null && !(bool)f.IsDeleted)
                        .ToList()
                        .Where(
                            g =>
                                Convert.ToInt32(g.GlobalCodeCategoryValue) >= startRange &&
                                Convert.ToInt32(g.GlobalCodeCategoryValue) <= endRange)
                        .OrderByDescending(v => v.CreatedDate)
                        .ToList();

                if (gModellist.Count > 0)
                {
                    list.AddRange(gModellist.Select(items => new GlobalCodeCustomModel
                    {
                        GlobalCodes = items,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(items.GlobalCodeCategoryValue)
                    }));
                }
                return list;
            }
        }

        /// <summary>
        /// Gets the maximum global code value by category.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public int GetMaxGlobalCodeValueByCategory(string categoryValue)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var maxValue = 0;
                var list =
                    rep.Where(g => g.GlobalCodeCategoryValue.Equals(categoryValue) && !string.IsNullOrEmpty(g.GlobalCodeValue))
                        .Select(m => m.GlobalCodeValue).ToList();
                if (list.Count > 0)
                    maxValue = list.Select(int.Parse).Max();
                return maxValue;
            }
        }


        /// <summary>
        /// Gets the external val1 val2 by identifier and category identifier.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public string GetExternalVal1Val2ByIdAndCategoryId(string categoryId, int globalCodeId)
        {
            using (var cateRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = cateRep.Where(c => c.GlobalCodeCategoryValue.Equals(categoryId) && c.GlobalCodeID == globalCodeId).FirstOrDefault();
                if (globalCode != null)
                    return string.Format("{0} - {1}", globalCode.ExternalValue1, globalCode.ExternalValue2);
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the type of the range by category.
        /// </summary>
        /// <param name="p">The p.</param>
        /// <returns></returns>
        public string GetRangeByCategoryType(string p)
        {
            using (var cateRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = cateRep.Where(c => c.GlobalCodeCategoryValue.Equals(p)).ToList();
                if (globalCode.Any())
                {
                    var first = globalCode.FirstOrDefault();
                    var lastOrDefault = globalCode.LastOrDefault();
                    if (first != null && lastOrDefault != null)
                    {
                        return string.Format("{0} - {1}", first.ExternalValue2, lastOrDefault.ExternalValue3);
                    }
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the maximum global code by category value.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public GlobalCodes GetMaxGlobalCodeByCategoryValue(string categoryValue)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var model = rep.Where(g => g.GlobalCodeCategoryValue.Equals(categoryValue)).OrderByDescending(a => a.GlobalCodeValue).FirstOrDefault();
                return model;
            }
        }

        /// <summary>
        /// Gets all global codes.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <param name="showDeleted"></param>
        /// <returns></returns>
        public List<GlobalCodeCustomModel> ShowDeletedRecordsByCategoryValue(string categoryValue, bool showDeleted)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCodes = showDeleted
                    ? gcRep.Where(s => s.IsDeleted == true && s.GlobalCodeCategoryValue.Equals(categoryValue)).ToList()
                    : gcRep.Where(
                        s => s.IsDeleted == false && s.IsActive && s.GlobalCodeCategoryValue.Equals(categoryValue))
                        .ToList();
                if (globalCodes.Count > 0)
                {
                    list.AddRange(globalCodes.Select(item => new GlobalCodeCustomModel
                    {
                        GlobalCodes = item,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(item.GlobalCodeCategoryValue)
                    }));
                }
            }
            return list;
        }


        /// <summary>
        /// Gets the global code by global code identifier.
        /// </summary>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <returns></returns>
        public GlobalCodeCustomModel GetGlobalCodeCustomById(int globalCodeId)
        {
            var cModel = new GlobalCodeCustomModel { GlobalCodes = new GlobalCodes() };
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = gcRep.Where(s => s.IsDeleted == false && s.GlobalCodeID == globalCodeId).FirstOrDefault();
                if (globalCode != null)
                {
                    cModel.GlobalCodes = globalCode;
                    cModel.GlobalCodeCustomValue = GetGlobalCategoryNameById(globalCode.GlobalCodeCategoryValue);
                }
            }
            return cModel;
        }

        public List<GlobalCodes> DeleteRecordAndGetGlobalCodesList(int globalCodeId, string category)
        {
            List<GlobalCodes> list;
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                rep.Delete(globalCodeId);
                list = GetGCodesListByCategoryValue(category);
            }
            return list;
        }

        public List<GlobalCodeCustomModel> ShowInActiveRecordsByCategoryValue(string categoryValue, bool showInActive)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCodes = showInActive
                    ? gcRep.Where(s => s.GlobalCodeCategoryValue.Equals(categoryValue) && !s.IsActive && s.IsDeleted == false).ToList()
                    : gcRep.Where(
                        s => s.IsActive && s.GlobalCodeCategoryValue.Equals(categoryValue) && s.IsDeleted == false)
                        .ToList();
                if (globalCodes.Count > 0)
                {
                    list.AddRange(globalCodes.Select(item => new GlobalCodeCustomModel
                    {
                        GlobalCodes = item,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(item.GlobalCodeCategoryValue)
                    }));
                }
            }
            return list;
        }


        /// <summary>
        /// Gets the global code by global code category identifier.
        /// </summary>
        /// <param name="categoryValue">The global code category identifier.</param>
        /// <returns></returns>
        public List<string> GetGlobalCodesLabelsListByCategoryValue(string categoryValue)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var list =
                    gcRep.Where(s => s.IsDeleted == false && s.GlobalCodeCategoryValue.Equals(categoryValue))
                        .OrderBy(g => g.SortOrder).Select(g => g.GlobalCodeName)
                        .ToList();
                return list;
            }
        }

        public bool CheckDuplicateVital(int id, string categoryValue, string value, string unitOfMeasure)
        {
            using (var gRepository = UnitOfWork.GlobalCodeRepository)
            {
                value = value.ToLower();
                var gc = id > 0
                    ? gRepository.Where(
                        x =>
                            x.IsDeleted == false && x.GlobalCodeValue.ToLower().Equals(value) && x.GlobalCodeID != id &&
                            x.GlobalCodeCategoryValue.Equals(categoryValue) && x.ExternalValue1.Equals(unitOfMeasure)).FirstOrDefault()
                    : gRepository.Where(x =>
                            x.IsDeleted == false && x.GlobalCodeValue.ToLower().Equals(value) &&
                            x.GlobalCodeCategoryValue.Equals(categoryValue) && x.ExternalValue1.Equals(unitOfMeasure)).FirstOrDefault();
                return gc != null;
            }
        }

        public GlobalCodes GetGlobalCodeByFacilityAndCategory(string category, string facilityNumber)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var model =
                    rep.Where(g => g.GlobalCodeCategoryValue.Equals(category) && g.FacilityNumber.Equals(facilityNumber) && g.IsDeleted == false && g.IsActive)
                        .FirstOrDefault();
                return model ?? new GlobalCodes();
            }
        }

        public GlobalCodes GetGlobalCodeByFacilityAndCategoryForSecurityparameter(string category, string facilityNumber)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var model =
                    rep.Where(g => g.GlobalCodeCategoryValue.Equals(category) && g.FacilityNumber.Equals(facilityNumber) && g.IsDeleted == false && g.IsActive)
                        .FirstOrDefault();
                return model;
            }
        }

        public int GetMaxGlobalCodeValueByCategory(string categoryValue, string facilityNumber)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var maxValue = 0;
                var list =
                    rep.Where(g => g.GlobalCodeCategoryValue.Equals(categoryValue) && !string.IsNullOrEmpty(g.GlobalCodeValue) && g.FacilityNumber.Equals(facilityNumber))
                        .Select(m => m.GlobalCodeValue).ToList();
                if (list.Count > 0)
                    maxValue = list.Select(int.Parse).Max();
                return maxValue;
            }
        }


        /// <summary>
        /// Gets all global codes.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public List<GlobalCodeCustomModel> GetSubCategoriesList(string categoryValue)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCodes = gcRep.Where(
                    s => s.IsDeleted == false && s.IsActive && s.GlobalCodeCategoryValue.Equals(categoryValue))
                    .ToList();

                if (globalCodes.Count > 0)
                {
                    if (categoryValue.Trim().Equals("4347"))
                    {
                        list.AddRange(globalCodes.Select(item => new GlobalCodeCustomModel
                        {
                            SubCategory1 = item.GlobalCodeName,
                            GcValue = item.GlobalCodeValue,
                            SubCategory2 = string.Empty,
                            GcId = item.GlobalCodeID
                        }));
                    }
                    else
                    {
                        list.AddRange(globalCodes.Select(item => new GlobalCodeCustomModel
                        {
                            SubCategory1 = !string.IsNullOrEmpty(item.ExternalValue1) ? GetSubCategory1Name(item.ExternalValue1) : string.Empty,
                            GcValue = item.GlobalCodeValue,
                            SubCategory2 = item.GlobalCodeName,
                            GcId = item.GlobalCodeID,
                        }));
                    }
                    list = list.OrderBy(g => int.Parse(g.GcValue)).ToList();
                }
            }
            return list;
        }
        /// <summary>
        /// Gets all global codes.
        /// </summary>
        /// <param name="categoryValue">The category value.</param>
        /// <returns></returns>
        public List<GlobalCodeCustomModel> GetSubCategoriesListBySubCategory1Value(string categoryValue, string selectedValue)
        {
            var list = new List<GlobalCodeCustomModel>();
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCodes = gcRep.Where(
                    s => s.IsDeleted == false && s.IsActive && s.GlobalCodeCategoryValue.Equals(categoryValue) && s.ExternalValue1.Equals(selectedValue))
                    .ToList();

                if (globalCodes.Count > 0)
                {
                    if (categoryValue.Trim().Equals("4347"))
                    {
                        list.AddRange(globalCodes.Select(item => new GlobalCodeCustomModel
                        {
                            SubCategory1 = item.GlobalCodeName,
                            GcValue = item.GlobalCodeValue,
                            SubCategory2 = string.Empty,
                            GcId = item.GlobalCodeID
                        }));
                    }
                    else
                    {
                        list.AddRange(globalCodes.Select(item => new GlobalCodeCustomModel
                        {
                            SubCategory1 = !string.IsNullOrEmpty(item.ExternalValue1) ? GetSubCategory1Name(item.ExternalValue1) : string.Empty,
                            GcValue = item.GlobalCodeValue,
                            SubCategory2 = item.GlobalCodeName,
                            GcId = item.GlobalCodeID,
                        }));
                    }
                    list = list.OrderBy(g => int.Parse(g.GcValue)).ToList();
                }
            }
            return list;
        }

        private string GetSubCategory1Name(string gcValue1)
        {
            var sc2 = string.Empty;
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var current =
                    rep.Where(
                        g => g.GlobalCodeCategoryValue.Trim().Equals("4347") && g.GlobalCodeValue.Trim().Equals(gcValue1))
                        .FirstOrDefault();
                if (current != null)
                    sc2 = current.GlobalCodeName;
            }
            return sc2;
        }

        public GlobalCodes GetIndicatorSettingsByCorporateId(string corporateId)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var categoryValue = Convert.ToString((int)GlobalCodeCategoryValue.DashboardIndicatorSettings);
                var maxValue = GetMaxGlobalCodeValueByCategory(categoryValue) + 1;
                var result =
                    rep.Where(
                        g =>
                            g.ExternalValue1.ToLower().Trim().Equals(corporateId) &&
                            g.GlobalCodeCategoryValue.ToLower().Trim().Equals(categoryValue)).FirstOrDefault();
                return result ?? new GlobalCodes
                {
                    GlobalCodeID = 0,
                    GlobalCodeCategoryValue = categoryValue,
                    GlobalCodeValue = Convert.ToString(maxValue),
                    ExternalValue1 = corporateId,
                    ExternalValue2 = string.Empty
                };
            }
        }



        /// <summary>
        /// Gets the global codes by categories range.
        /// </summary>
        /// <param name="startRange">The start range.</param>
        /// <param name="endRange">The end range.</param>
        /// <param name="blockNumber"></param>
        /// <param name="blockSize"></param>
        /// <param name="skip"></param>
        /// <param name="showInActive"></param>
        /// <returns></returns>
        public List<GlobalCodeCustomModel> GetGlobalCodesByCategoriesRangeOnDemand(int startRange, int endRange, int blockNumber, int blockSize, bool skip, bool showInActive, long facilityId = 0, long corporateId = 0)
        {
            var startIndex = (blockNumber - 1) * blockSize;

            var list = new List<GlobalCodeCustomModel>();
            var fnumber = facilityId > 0 ? Convert.ToString(facilityId) : string.Empty;
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var gModellist =
                    rep.Where(f => f.IsDeleted != null && !(bool)f.IsDeleted && f.IsActive == showInActive && (string.IsNullOrEmpty(fnumber) || f.FacilityNumber.Equals(fnumber)))
                        .ToList()
                        .Where(
                            g =>
                                Convert.ToInt32(g.GlobalCodeCategoryValue) >= startRange &&
                                Convert.ToInt32(g.GlobalCodeCategoryValue) <= endRange)
                        .OrderByDescending(v => v.CreatedDate)
                        .Skip(skip ? 0 : startIndex)
                        .Take(blockSize)
                        .ToList();

                if (gModellist.Count > 0)
                {
                    list.AddRange(gModellist.Select(items => new GlobalCodeCustomModel
                    {
                        GlobalCodes = items,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(items.GlobalCodeCategoryValue, items.FacilityNumber),
                        CodeType = GetNameByGlobalCodeValue(items.ExternalValue1, "5101")

                    }));
                }
                return list;
            }
        }

        public List<GlobalCodeCustomModel> GetGlobalCodesByCategoriesRangeOnDemand(string gcc, int blockNumber, int blockSize, bool skip, bool showInActive, long facilityId = 0, long corporateId = 0)
        {
            var startIndex = (blockNumber - 1) * blockSize;
            var fnumber = facilityId > 0 ? Convert.ToString(facilityId) : string.Empty;

            var list = new List<GlobalCodeCustomModel>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                gcc = gcc.Trim();
                var gModellist =
                    rep.Where(
                        f => f.IsDeleted != null && !(bool)f.IsDeleted && f.GlobalCodeCategoryValue.Trim().Equals(gcc) && f.IsActive == showInActive
                        && (string.IsNullOrEmpty(fnumber) || f.FacilityNumber.Equals(fnumber)))
                        .OrderByDescending(v => v.CreatedDate)
                        .Skip(skip ? 0 : startIndex)
                        .Take(blockSize)
                        .ToList();

                if (gModellist.Count > 0)
                {
                    list.AddRange(gModellist.Select(items => new GlobalCodeCustomModel
                    {
                        GlobalCodes = items,
                        GlobalCodeCustomValue = GetGlobalCategoryNameById(items.GlobalCodeCategoryValue, items.FacilityNumber),
                        CodeType = GetNameByGlobalCodeValue(items.ExternalValue1, "5101")
                    }));
                }
                return list;
            }
        }

        /// <summary>
        /// Gets the room equipment list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <param name="roomid">The roomid.</param>
        /// <returns></returns>
        public List<GlobalCodes> GetRoomEquipmentList(string facilityId, string roomid)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var roomEquipmentsList = rep.Where(
                      x =>
                      x.FacilityNumber == facilityId && x.ExternalValue1 == roomid && x.GlobalCodeCategoryValue == "4910")
                      .ToList();
                return roomEquipmentsList;
            }
        }

        /// <summary>
        /// Gets the room equipment all list.
        /// </summary>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<GlobalCodeCustomDModel> GetRoomEquipmentALLList(string facilityId)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var list = new List<GlobalCodeCustomDModel>();
                var roomEquipmentsList = rep.Where(
                      x =>
                      x.FacilityNumber == facilityId && x.GlobalCodeCategoryValue == "4910")
                      .ToList();
                list.AddRange(roomEquipmentsList.Select(items => new GlobalCodeCustomDModel
                {
                    CorporateId = this.GetCorporateIdFromFacilityId(Convert.ToInt32(items.FacilityNumber)),
                    RoomId = (items.ExternalValue1),
                    GlobalCodeID = items.GlobalCodeID,
                    GlobalCodeName = items.GlobalCodeName,
                    GlobalCodeCategoryValue = items.GlobalCodeCategoryValue,
                    GlobalCodeValue = items.GlobalCodeValue,
                    RoomSTR = GetFacilityStructureNameById(Convert.ToInt32(items.ExternalValue1)),
                    FacilityNumber = items.FacilityNumber
                }));
                return list;
            }
        }

        /// <summary>
        /// Deletes the global code.
        /// </summary>
        /// <param name="globalCodeId">The global code identifier.</param>
        /// <param name="facilityId">The facility identifier.</param>
        /// <returns></returns>
        public List<GlobalCodeCustomDModel> DeleteGlobalCode(int globalCodeId, string facilityId)
        {
            List<GlobalCodeCustomDModel> list;
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                rep.Delete(globalCodeId);
                list = GetRoomEquipmentALLList(facilityId);
            }
            return list;
        }


        /// <summary>
        /// Gets the global code name by value and category identifier.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="globalCodeVal">The global code value.</param>
        /// <returns></returns>
        public string GetGlobalCodeNameByValueAndCategoryId(string categoryId, string globalCodeVal)
        {
            using (var cateRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = cateRep.Where(c => c.GlobalCodeCategoryValue.Equals(categoryId) && c.GlobalCodeValue == globalCodeVal).FirstOrDefault();
                if (globalCode != null)
                    return globalCode.GlobalCodeName;
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the global code sotring by value and category identifier.
        /// </summary>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="globalCodeVal">The global code value.</param>
        /// <returns></returns>
        public int GetGlobalCodeSotringByValueAndCategoryId(string categoryId, string globalCodeVal)
        {
            using (var cateRep = UnitOfWork.GlobalCodeRepository)
            {
                var globalCode = cateRep.Where(c => c.GlobalCodeCategoryValue.Equals(categoryId) && c.GlobalCodeValue == globalCodeVal).FirstOrDefault();
                if (globalCode != null)
                    return Convert.ToInt32(globalCode.SortOrder);
            }

            return 0;
        }


        /// <summary>
        /// Gets the list by categories range.
        /// </summary>
        /// <param name="categories">The categories.</param>
        /// <returns></returns>
        public List<DropdownListData> GetListByCategoriesRange(IEnumerable<string> categories, string facilityId = "0")
        {
            var list = new List<DropdownListData>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var gc =
                    rep.Where(g => g.IsActive && g.IsDeleted == false && categories.Contains(g.GlobalCodeCategoryValue) && (g.FacilityNumber.Equals(facilityId)))
                        .ToList();

                if (gc.Any())
                {
                    gc = gc.OrderBy(g => g.GlobalCodeCategoryValue).ThenBy(g1 => g1.GlobalCodeName).ToList();
                    list.AddRange(gc.Select(item => new DropdownListData
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeValue,
                        ExternalValue1 = item.GlobalCodeCategoryValue,
                        ExternalValue2 = item.ExternalValue1 ?? "0",
                        //SortOrder = Convert.ToInt32(item.GlobalCodeValue)
                    }));
                }
            }
            return list;
        }

        public List<DropdownListData> GetListByCategoriesRange(IEnumerable<string> categories, IEnumerable<string> extValue1)
        {
            var list = new List<DropdownListData>();
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                var gc =
                    rep.Where(g => g.IsActive && g.IsDeleted == false && categories.Contains(g.GlobalCodeCategoryValue) && (!extValue1.Any() || extValue1.Contains(g.ExternalValue1))).ToList();
                if (gc.Any())
                {
                    gc = gc.OrderBy(g => g.GlobalCodeCategoryValue).ThenBy(g1 => g1.GlobalCodeName).ToList();
                    list.AddRange(gc.Select(item => new DropdownListData
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeValue,
                        ExternalValue1 = item.ExternalValue1,
                        ExternalValue2 = item.GlobalCodeCategoryValue
                        //SortOrder = Convert.ToInt32(item.GlobalCodeValue)
                    }));
                }
            }
            return list;
        }

        /// <summary>
        /// Creates the order activity scheduler timming.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public bool CreateOrderActivitySchedulerTimming(int id)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                return rep.CreateOrderActivitySchedulerTimming(id);
            }
        }



        public List<DropdownListData> GetGCodesListByCategoryValue(string categoryValue, IEnumerable<string> extValues1, string withoutValue)
        {
            var list = new List<DropdownListData>();
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var gclist =
                    gcRep.Where(
                        s =>
                            s.IsDeleted == false && s.GlobalCodeCategoryValue.Equals(categoryValue) &&
                            (extValues1.Count() == 0 || extValues1.Contains(s.ExternalValue1)) &&
                            (string.IsNullOrEmpty(withoutValue) || !s.ExternalValue1.Equals(withoutValue)))
                        .OrderBy(g => g.SortOrder)
                        .ToList();

                if (gclist.Count > 0)
                {
                    list.AddRange(gclist.Select(item => new DropdownListData
                    {
                        Text = item.GlobalCodeName,
                        Value = item.GlobalCodeValue,
                        ExternalValue1 = item.ExternalValue1,
                        SortOrder = Convert.ToInt32(item.GlobalCodeValue)
                    }));
                }

                return list;
            }
        }


        public List<GlobalCodes> GetGCodesListByCategoryValue(string categoryValue, string externalValue1, string externalValue3)
        {
            using (var gcRep = UnitOfWork.GlobalCodeRepository)
            {
                var list =
                    gcRep.Where(
                        s =>
                            s.IsDeleted == false && s.GlobalCodeCategoryValue.Equals(categoryValue) &&
                            !s.ExternalValue1.Equals(externalValue1) && !s.ExternalValue3.Equals(externalValue3))
                        .OrderBy(g => g.SortOrder)
                        .ToList();
                return list;
            }
        }



        public List<GlobalCodeCustomModel> GetGlobalCodesByCategory(string categoryValue, long corporateId, long facilityId, long userId, long id, out long newId, bool listStatus, bool isFacilityPassed = false)
        {
            using (var rep = UnitOfWork.GlobalCodeRepository)
            {
                return rep.GetGlobalCodesByCategory(categoryValue, corporateId, facilityId, userId, id, out newId, listStatus, isFacilityPassed);
            }
        }

        public List<int> GetDefaultMonthAndYearByFacilityId(int facilityId, int corporateId)
        {
            var currentDateTime = GetInvariantCultureDateTime(facilityId);
            var result = new List<int>();
            using (var rep = UnitOfWork.IndicatorDataCheckListRepository)
            {
                var current =
                    rep.Where(
                        f => f.FacilityId == facilityId && f.CorporateId == corporateId && f.Year == currentDateTime.Year)
                        .FirstOrDefault();

                if (current != null)
                {
                    result.Add(Convert.ToInt32(current.ExternalValue1));        //Default Year
                    result.Add(Convert.ToInt32(current.ExternalValue2));        //Default Month
                }
            }
            return result;
        }


    }
}
