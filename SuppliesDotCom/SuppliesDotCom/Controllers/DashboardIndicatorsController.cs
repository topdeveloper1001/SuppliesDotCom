using System.IO;
using System.Web;
using SuppliesDotCom.Models;
using SuppliesDotCom.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Model;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;

namespace SuppliesDotCom.Controllers
{
    public class DashboardIndicatorsController : BaseController
    {
        /// <summary>
        /// Get the details of the DashboardIndicators View in the Model DashboardIndicators such as DashboardIndicatorsList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model DashboardIndicators to be passed to View DashboardIndicators
        /// </returns>
        public ActionResult Index()
        {
            //Initialize the DashboardIndicators BAL object
            using (var bal = new DashboardIndicatorsBal())
            {
                var corporateId = Helpers.GetSysAdminCorporateID();
                //Get the Entity list
                //var list = bal.GetDashboardIndicatorsListByCorporate(corporateId, Helpers.GetDefaultFacilityId());
                var list = bal.GetDashboardIndicatorsDataList(Helpers.GetSysAdminCorporateID(), 1);
                var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                var data = HtmlExtensions.OrderByDir(list, "ASC", orderByExpression);

                //Intialize the View Model i.e. DashboardIndicatorsView which is binded to Main View Index.cshtml under DashboardIndicators
                var viewModel = new DashboardIndicatorsView
                {
                    DashboardIndicatorsList = data,
                    CurrentDashboardIndicators = new DashboardIndicators
                    {
                        IndicatorNumber = bal.GetIndicatorNextNumber(corporateId),
                        OwnerShip = bal.GetNameByUserId(Helpers.GetLoggedInUserId())
                    }
                };

                //Pass the View Model in ActionResult to View DashboardIndicators
                return View(viewModel);
            }
        }

        /// <summary>
        /// Get the details of the DashboardIndicators View in the Model DashboardIndicators such as DashboardIndicatorsList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model DashboardIndicators to be passed to View DashboardIndicators
        /// </returns>
        public ActionResult IndexV1()
        {
            //Initialize the DashboardIndicators BAL object
            using (var bal = new DashboardIndicatorsBal())
            {
                var corporateId = Helpers.GetSysAdminCorporateID();
                //Get the Entity list
                var list = bal.GetDashboardIndicatorsListByCorporate(corporateId, Helpers.GetDefaultFacilityId());
                var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                var data = HtmlExtensions.OrderByDir(list, "ASC", orderByExpression);

                //Intialize the View Model i.e. DashboardIndicatorsView which is binded to Main View Index.cshtml under DashboardIndicators
                var viewModel = new DashboardIndicatorsView
                {
                    DashboardIndicatorsList = data,
                    CurrentDashboardIndicators = new DashboardIndicators
                    {
                        IndicatorNumber = bal.GetIndicatorNextNumber(corporateId),
                        OwnerShip = bal.GetNameByUserId(Helpers.GetLoggedInUserId())
                    }
                };

                //Pass the View Model in ActionResult to View DashboardIndicators
                return View(viewModel);
            }
        }

        /// <summary>
        /// Add New or Update the DashboardIndicators based on if we pass the DashboardIndicators ID in the DashboardIndicatorsViewModel object.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>
        /// returns the newly added or updated ID of DashboardIndicators row
        /// </returns>
        public ActionResult SaveDashboardIndicators(DashboardIndicators model)
        {
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardIndicatorsCustomModel>();

            //Check if Model is not null 
            if (model != null)
            {
                model.CorporateId = Helpers.GetSysAdminCorporateID();
                using (var bal = new DashboardIndicatorsBal())
                {
                    if (model.IndicatorID == 0)
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }

                    //using (var dashboardIndicatorDataBal = new DashboardIndicatorDataBal())
                    //{
                    //    switch (model.IsActive)
                    //    {
                    //        case 0:
                    //            dashboardIndicatorDataBal.BulkInactiveDashboardIndicatorData(model.IndicatorNumber,
                    //                Helpers.GetSysAdminCorporateID());
                    //            break;
                    //        default:
                    //            dashboardIndicatorDataBal.BulkActiveDashboardIndicatorData(model.IndicatorNumber,
                    //                Helpers.GetSysAdminCorporateID());
                    //            break;
                    //    }
                    //}
                    list = bal.SaveDashboardIndicators(model);

                    //Add by shashank to check the Special case for the Indicator i.e. is the Target/Budget is static for indicator 
                    //.... Should only Call for Dashboard type = Budget (Externalvalue1='1')
                    if (!string.IsNullOrEmpty(model.IndicatorNumber) && model.ExternalValue4.ToLower() == "true")
                    {
                        using (var ibal = new DashboardIndicatorDataBal())
                            ibal.SetStaticBudgetTargetIndciators(model);
                    }

                    bal.UpdateIndicatorsOtherDetail(model);


                    //Call the AddDashboardIndicators Method to Add / Update current DashboardIndicators
                    var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                    list = HtmlExtensions.OrderByDir<DashboardIndicatorsCustomModel>(list, "ASC", orderByExpression);
                }
            }
            //Pass the ActionResult with List of DashboardIndicatorsViewModel object to Partial View DashboardIndicatorsList
            return PartialView(PartialViews.DashboardIndicatorsList, list);
        }
        /// <summary>
        /// Add New or Update the DashboardIndicators based on if we pass the DashboardIndicators ID in the DashboardIndicatorsViewModel object.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>
        /// returns the newly added or updated ID of DashboardIndicators row
        /// </returns>
        public ActionResult SaveDashboardIndicatorsV1(DashboardIndicators model)
        {
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardIndicatorsCustomModel>();

            //Check if Model is not null 
            if (model != null)
            {
                model.CorporateId = Helpers.GetSysAdminCorporateID();
                using (var bal = new DashboardIndicatorsBal())
                {
                    if (model.IndicatorID == 0)
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }
                    using (var dashboardIndicatorDataBal = new DashboardIndicatorDataBal())
                    {
                        switch (model.IsActive)
                        {
                            case 0:
                                dashboardIndicatorDataBal.BulkInactiveDashboardIndicatorData(model.IndicatorNumber,
                                    Helpers.GetSysAdminCorporateID());
                                break;
                            default:
                                dashboardIndicatorDataBal.BulkActiveDashboardIndicatorData(model.IndicatorNumber,
                                    Helpers.GetSysAdminCorporateID());
                                break;
                        }
                    }
                    using (var oDashboardIndicatorDataBal = new DashboardIndicatorDataBal())
                    {
                        oDashboardIndicatorDataBal.GenerateIndicatorEffects(model);
                    }
                    list = bal.SaveDashboardIndicatorsV1(model);

                    //Add by shashank to check the Special case for the Indicator i.e. is the Target/Budget is static for indicator 
                    //.... Should only Call for Dashboard type = Budget (Externalvalue1='1')
                    if (!string.IsNullOrEmpty(model.IndicatorNumber) && model.ExternalValue4.ToLower() == "true")
                    {
                        using (var ibal = new DashboardIndicatorDataBal())
                            ibal.SetStaticBudgetTargetIndciators(model);
                    }
                    using (var oDashboardIndicatorDataBal = new DashboardIndicatorDataBal())
                    {
                        oDashboardIndicatorDataBal.GenerateIndicatorEffects(model);
                        oDashboardIndicatorDataBal.UpdateCalculateIndicatorUpdate(model);
                    }
                    //Call the AddDashboardIndicators Method to Add / Update current DashboardIndicators
                    var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                    list = HtmlExtensions.OrderByDir<DashboardIndicatorsCustomModel>(list, "ASC", orderByExpression);
                }
            }
            //Pass the ActionResult with List of DashboardIndicatorsViewModel object to Partial View DashboardIndicatorsList
            return PartialView(PartialViews.DashboardIndicatorsList, list);
        }
        public ActionResult BindDashboardIndicatorsList()
        {
            var list = new List<DashboardIndicatorsCustomModel>();
            var oDashboardIndicatorsBal = new DashboardIndicatorsBal();
            Int32 corporateId = Helpers.GetSysAdminCorporateID();
            Int32 facilityId = 0;
            list = oDashboardIndicatorsBal.GetDashboardIndicatorsListByCorporate(corporateId, facilityId);
            return PartialView(PartialViews.DashboardIndicatorsList, list);
        }

        /// <summary>
        /// Get the details of the current DashboardIndicators in the view model by ID
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public JsonResult GetDashboardIndicatorsDetails(int id)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Call the AddDashboardIndicators Method to Add / Update current DashboardIndicators
                var current = bal.GetDashboardIndicatorsById(id);

                //Pass the ActionResult with the current DashboardIndicatorsViewModel object as model to PartialView DashboardIndicatorsAddEdit
                return Json(current);
            }
        }

        /// <summary>
        /// Gets the dashboard indicators details by number.
        /// </summary>
        /// <param name="number">The number.</param>
        /// <returns></returns>
        public JsonResult GetDashboardIndicatorsDetailsByNumber(string number)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Call the AddDashboardIndicators Method to Add / Update current DashboardIndicators
                var current = bal.GetDashboardIndicatorsByNumber(number);

                //Pass the ActionResult with the current DashboardIndicatorsViewModel object as model to PartialView DashboardIndicatorsAddEdit
                return Json(current);
            }
        }

        /// <summary>
        /// Delete the current DashboardIndicators based on the DashboardIndicators ID passed in the DashboardIndicatorsModel
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteDashboardIndicators(int id)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Get DashboardIndicators model object by current DashboardIndicators ID
                var model = bal.GetDashboardIndicatorsById(id);
                var isDeleted = false;
                var list = new List<DashboardIndicatorsCustomModel>();
                //Check If DashboardIndicators model is not null
                if (model != null)
                {
                    model.IsActive = 0;

                    //Update Operation of current DashboardIndicators
                    isDeleted = bal.DeleteIndicator(model);
                    //return deleted ID of current DashboardIndicators as Json Result to the Ajax Call.
                    using (var dashboardIndicatorDataBal = new DashboardIndicatorDataBal())
                    {
                        dashboardIndicatorDataBal.BulkInactiveDashboardIndicatorData(model.IndicatorNumber, Helpers.GetSysAdminCorporateID());
                    }

                    bal.UpdateIndicatorsOtherDetail(model);
                }
                //var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                //list = HtmlExtensions.OrderByDir<DashboardIndicatorsCustomModel>(list, "ASC", orderByExpression);
                //return PartialView(PartialViews.DashboardIndicatorsList, list);
                return Json(isDeleted);
            }
            //Pass the ActionResult with List of DashboardIndicatorsViewModel object to Partial View DashboardIndicatorsList
        }

        /// <summary>
        /// Gets the indicators.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetIndicators()
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                var indicatorsObjList = bal.GetDashboardIndicatorsListByCorporate(Helpers.GetSysAdminCorporateID(), 0);
                var list = new List<SelectListItem>();
                if (indicatorsObjList.Any())
                {
                    list.AddRange(indicatorsObjList.Select(item => new SelectListItem
                    {
                        Text = item.Dashboard,
                        Value = item.IndicatorNumber
                    }));
                }
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Determines whether [is indicator number unique] [the specified indicator number].
        /// </summary>
        /// <param name="indicatorNumber">The indicator number.</param>
        /// <param name="id">The indicator identifier.</param>
        /// <param name="subCategory1"></param>
        /// <param name="subCategory2"></param>
        /// <returns></returns>
        public ActionResult IsIndicatorNumberExists(string indicatorNumber, int id, string subCategory1, string subCategory2)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                var isIndicatorNumberExist = bal.IsIndicatorExist(indicatorNumber, id, Helpers.GetSysAdminCorporateID(), subCategory1, subCategory2);
                return Json(isIndicatorNumberExist, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Binds the department dropdown data.
        /// </summary>
        /// <returns></returns>
        public ActionResult BindDepartmentDropdownData()
        {
            using (var bal = new FacilityStructureBal())
            {
                var facilityid = Helpers.GetDefaultFacilityId();
                var corporateid = Helpers.GetSysAdminCorporateID();

                //Get the Entity list
                var facilityDepartments = bal.GetFacilityDepartments(corporateid, Convert.ToString(facilityid));
                var list = new List<SelectListItem>();
                if (facilityDepartments.Count > 0)
                {
                    list.Add(new SelectListItem
                    {
                        Text = @"All",
                        Value = "0"
                    });
                    list.AddRange(facilityDepartments.Where(x => !string.IsNullOrEmpty(x.ExternalValue1)).Select(item => new SelectListItem
                    {
                        Value = Convert.ToString(item.ExternalValue1),
                        Text = Convert.ToString(item.ExternalValue1) + @" (Department Name :" + item.FacilityStructureName + @" )",
                    }));
                    return Json(list, JsonRequestBehavior.AllowGet);
                }
                return Json(null);
            }
        }

        /// <summary>
        /// Exports to excel.
        /// </summary>
        /// <returns></returns>
        public ActionResult ExportToExcel(int? showInActive)
        {
            var workbook = new HSSFWorkbook();
            var sheet = workbook.CreateSheet("DashboardIndicatorsData");
            var format = workbook.CreateDataFormat();
            sheet.CreateFreezePane(0, 1, 0, 1);
            sheet.SetAutoFilter(CellRangeAddress.ValueOf("A1:L1"));
            // Add header labels
            var rowIndex = 0;
            var row = sheet.CreateRow(rowIndex);
            row.CreateCell(0).SetCellValue("Indicator Number");
            row.CreateCell(1).SetCellValue("Dashboard");
            row.CreateCell(2).SetCellValue("Description");
            row.CreateCell(3).SetCellValue("Defination");
            row.CreateCell(4).SetCellValue("Sub Category 1");
            row.CreateCell(5).SetCellValue("Sub Category 2");
            row.CreateCell(6).SetCellValue("Format Type");
            row.CreateCell(7).SetCellValue("Decimal Numbers");
            row.CreateCell(8).SetCellValue("Ferquency Type");
            row.CreateCell(9).SetCellValue("OwnerShip");
            row.CreateCell(10).SetCellValue("Facility");
            row.CreateCell(11).SetCellValue("SortOrder");
            rowIndex++;
            using (var bal = new DashboardIndicatorsBal())
            {
                var indicatorsData = bal.GetDashboardIndicatorsListActiveInActive(Helpers.GetSysAdminCorporateID(), showInActive);
                indicatorsData = indicatorsData.OrderBy(x => Convert.ToInt32(x.IndicatorNumber)).ToList();
                var cellStyle = workbook.CreateCellStyle();
                cellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("0.00");

                foreach (var item in indicatorsData)
                {
                    row = sheet.CreateRow(rowIndex);
                    row.CreateCell(0).SetCellType(CellType.Numeric);
                    row.CreateCell(0).CellStyle = cellStyle;
                    row.CreateCell(0).SetCellValue(Convert.ToDouble(item.IndicatorNumber));
                    row.CreateCell(1).SetCellValue(item.Dashboard);
                    row.CreateCell(2).SetCellValue(item.Description);
                    row.CreateCell(3).SetCellValue(item.Defination);
                    row.CreateCell(4).SetCellValue(item.SubCategoryFirst);
                    row.CreateCell(5).SetCellValue(item.SubCategorySecond);
                    row.CreateCell(6).SetCellValue(item.FormatTypeStr);
                    row.CreateCell(7).SetCellType(CellType.Numeric);
                    row.CreateCell(7).CellStyle = cellStyle;
                    row.CreateCell(7).SetCellValue(item.DecimalNumbers);
                    row.CreateCell(8).SetCellValue(item.FerquencyTypeStr);
                    row.CreateCell(9).SetCellValue(item.OwnerShip);
                    row.CreateCell(10).SetCellValue(item.FacilityNameStr);
                    row.CreateCell(11).SetCellValue(Convert.ToInt32(item.SortOrder));
                    rowIndex++;
                }
            }
            using (var exportData = new MemoryStream())
            {
                var currentDateTime = Helpers.GetInvariantCultureDateTime();
                var cookie = new HttpCookie("Downloaded", "True");
                Response.Cookies.Add(cookie);
                workbook.Write(exportData);
                var saveAsFileName = string.Format("DashboardIndicatorsData-{0:d}.xls", currentDateTime).Replace("/", "-");
                return File(exportData.ToArray(), "application/vnd.ms-excel", string.Format("{0}", saveAsFileName));
            }
        }

        /// <summary>
        /// Binds the indicators by order.
        /// </summary>
        /// <param name="sort">The sort.</param>
        /// <param name="sortdir">The sortdir.</param>
        /// <param name="showInActive"></param>
        /// <returns></returns>
        public ActionResult BindIndicatorsByOrder(string sort, string sortdir, int showInActive)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardIndicatorsListActiveInActive(Helpers.GetSysAdminCorporateID(), showInActive);
                //Intialize the View Model i.e. DashboardIndicatorsView which is binded to Main View Index.cshtml under DashboardIndicators
                var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>(sort);

                var data = HtmlExtensions.OrderByDir<DashboardIndicatorsCustomModel>(list, sortdir, orderByExpression);

                //Pass the View Model in ActionResult to View DashboardIndicators
                return PartialView(PartialViews.DashboardIndicatorsList, data);
            }
        }
        public ActionResult BindDataIndicatorsByOrder(string sort, string sortdir, int showInActive)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardIndicatorsListActiveInActiveNew(Helpers.GetSysAdminCorporateID(), sort, sortdir, showInActive);

                //Pass the View Model in ActionResult to View DashboardIndicators
                return PartialView(PartialViews.DashboardIndicatorsList, list);
            }
        }
        /// <summary>
        /// Gets the indicatorby corporate.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetIndicatorbyCorporate()
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardIndicatorsListByCorporate(Helpers.GetSysAdminCorporateID(), Helpers.GetDefaultFacilityId());
                //Pass the View Model in ActionResult to View DashboardIndicators
                var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                var data = HtmlExtensions.OrderByDir<DashboardIndicatorsCustomModel>(list, "ASC", orderByExpression);
                //Pass the View Model in ActionResult to View DashboardIndicators
                return PartialView(PartialViews.DashboardIndicatorsList, data);
            }
        }

        /// <summary>
        /// Binds the indicators active inactive.
        /// </summary>
        /// <param name="showInActive">The show in active.</param>
        /// <returns></returns>
        public ActionResult BindIndicatorsActiveInactive(int showInActive)
        {
            using (var bal = new DashboardIndicatorsBal())
            {
                //Get the Entity list
                //var list = bal.GetDashboardIndicatorsListActiveInActive(Helpers.GetSysAdminCorporateID(), showInActive);
                var list = bal.GetDashboardIndicatorsDataList(Helpers.GetSysAdminCorporateID(), showInActive);

                //Intialize the View Model i.e. DashboardIndicatorsView which is binded to Main View Index.cshtml under DashboardIndicators
                var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorsCustomModel>("Dashboard");
                var data = HtmlExtensions.OrderByDir<DashboardIndicatorsCustomModel>(list, "ASC", orderByExpression);

                //Pass the View Model in ActionResult to View DashboardIndicators
                return PartialView(PartialViews.DashboardIndicatorsList, data);
            }
        }

        public ActionResult CheckDuplicateSortOrder(int sortOrder, int indicatorIdPk)
        {
            var result = false;
            using (var bal = new DashboardIndicatorsBal())
                result = bal.CheckDuplicateSortOrder(sortOrder, indicatorIdPk);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
