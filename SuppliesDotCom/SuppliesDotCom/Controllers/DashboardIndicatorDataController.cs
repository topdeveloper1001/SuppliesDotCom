using SuppliesDotCom.Bal.BusinessAccess;
using SuppliesDotCom.Common;
using SuppliesDotCom.Common.Common;
using SuppliesDotCom.Model;
using SuppliesDotCom.Model.CustomModel;
using SuppliesDotCom.Models;
using Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Transactions;
using System.Web.Mvc;

namespace SuppliesDotCom.Controllers
{
    public class DashboardIndicatorDataController : BaseController
    {
        /// <summary>
        /// Get the details of the DashboardIndicatorData View in the Model DashboardIndicatorData such as DashboardIndicatorDataList, list of countries etc.
        /// </summary>
        /// <returns>
        /// returns the actionresult in the form of current object of the Model DashboardIndicatorData to be passed to View DashboardIndicatorData
        /// </returns>
        public ActionResult Index()
        {
            //Initialize the DashboardIndicatorData BAL object
            using (var bal = new DashboardIndicatorDataBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardIndicatorDataList(Helpers.GetSysAdminCorporateID(), Helpers.GetDefaultFacilityId());

                //Intialize the View Model i.e. DashboardIndicatorDataView which is binded to Main View Index.cshtml under DashboardIndicatorData
                var viewModel = new DashboardIndicatorDataView
                {
                    DashboardIndicatorDataList = list,
                    CurrentDashboardIndicatorData = new DashboardIndicatorData()
                };

                //Pass the View Model in ActionResult to View DashboardIndicatorData
                return View(viewModel);
            }
        }

        /// <summary>
        /// Add New or Update the DashboardIndicatorData based on if we pass the DashboardIndicatorData ID in the DashboardIndicatorDataViewModel object.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>
        /// returns the newly added or updated ID of DashboardIndicatorData row
        /// </returns>
        public ActionResult SaveDashboardIndicatorData(DashboardIndicatorData model)
        {
            var userId = Helpers.GetLoggedInUserId();
            var currentDate = Helpers.GetInvariantCultureDateTime();
            var list = new List<DashboardIndicatorDataCustomModel>();

            //Check if Model is not null
            if (model != null)
            {
                model.CorporateId = Helpers.GetSysAdminCorporateID();
                model.IsActive = true;
                using (var bal = new DashboardIndicatorDataBal())
                {
                    if (model.ID == 0)
                    {
                        model.CreatedBy = userId;
                        model.CreatedDate = currentDate;
                    }

                    //Call the AddDashboardIndicatorData Method to Add / Update current DashboardIndicatorData
                    list = bal.SaveDashboardIndicatorData(model);
                }
            }
            //Pass the ActionResult with List of DashboardIndicatorDataViewModel object to Partial View DashboardIndicatorDataList
            return PartialView(PartialViews.DashboardIndicatorDataList, list);
        }


        /// <summary>
        /// Get the details of the current DashboardIndicatorData in the view model by ID
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="type"></param>
        /// <returns></returns>
        public JsonResult GetDashboardIndicatorDataDetails(int id, int type)
        {
            var model = new DashboardIndicatorData { IsActive = true, ID = 0 };
            if (type == 1 && id > 0)
            {
                //Call the AddDashboardIndicatorData Method to Add / Update current DashboardIndicatorData
                using (var bal = new DashboardIndicatorDataBal())
                    model = bal.GetDashboardIndicatorDataById(id);
            }

            //Pass the ActionResult with the current DashboardIndicatorDataViewModel object as model to PartialView DashboardIndicatorDataAddEdit
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Delete the current DashboardIndicatorData based on the DashboardIndicatorData ID passed in the DashboardIndicatorDataModel
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ActionResult DeleteDashboardIndicatorData(int id)
        {
            using (var bal = new DashboardIndicatorDataBal())
            {
                //Get DashboardIndicatorData model object by current DashboardIndicatorData ID
                var model = bal.GetDashboardIndicatorDataById(id);
                //var userId = Helpers.GetLoggedInUserId();
                //var currentDate = Helpers.GetInvariantCultureDateTime();
                var list = new List<DashboardIndicatorDataCustomModel>();

                //Check If DashboardIndicatorData model is not null
                if (model != null)
                {
                    model.IsActive = false;

                    //Update Operation of current DashboardIndicatorData
                    list = bal.SaveDashboardIndicatorData(model);
                    //return deleted ID of current DashboardIndicatorData as Json Result to the Ajax Call.
                }
                //Pass the ActionResult with List of DashboardIndicatorDataViewModel object to Partial View DashboardIndicatorDataList
                return PartialView(PartialViews.DashboardIndicatorDataList, list);
            }
        }

        /// <summary>
        /// Binds the indicators by order.
        /// </summary>
        /// <param name="sort">The sort.</param>
        /// <param name="sortdir">The sortdir.</param>
        /// <returns></returns>
        public ActionResult BindIndicatorsDataByOrder(string sort, string sortdir)
        {
            using (var bal = new DashboardIndicatorDataBal())
            {
                //Get the Entity list
                var list = bal.GetDashboardIndicatorDataList(Helpers.GetSysAdminCorporateID(), Helpers.GetDefaultFacilityId());
                //Intialize the View Model i.e. DashboardIndicatorsView which is binded to Main View Index.cshtml under DashboardIndicators
                var orderByExpression = HtmlExtensions.GetOrderByExpression<DashboardIndicatorDataCustomModel>(sort);
                var data = HtmlExtensions.OrderByDir<DashboardIndicatorDataCustomModel>(list, sortdir, orderByExpression);
                //Pass the View Model in ActionResult to View DashboardIndicators
                return PartialView(PartialViews.DashboardIndicatorDataList, data);
            }
        }

        #region Import Dashboard Indicator Data
        public DataTable Import(string filePath)
        {
            var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read);
            var file = new FileInfo(filePath);
            IExcelDataReader excelReader = null;

            //1. Reading from a binary Excel file ('97-2003 format; *.xls)
            if (file.Extension == ".xls")
                excelReader = ExcelReaderFactory.CreateBinaryReader(stream);

            //2. Reading from a OpenXml Excel file (2007 format; *.xlsx)
            else if (file.Extension == ".xlsx")
                excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);


            //4. DataSet - Create column names from first row
            if (excelReader != null)
            {
                excelReader.IsFirstRowAsColumnNames = true;
                var result = excelReader.AsDataSet();

                //5. Data Reader methods
                if (result != null && result.Tables.Count > 0 && result.Tables[0].Rows.Count > 0)
                    return result.Tables[0];

                //6. Free resources (IExcelDataReader is IDisposable)
                excelReader.Close();
            }
            return null;
        }

        public ActionResult ImportExcelFiles()
        {
            if (Request.Files != null && Request.Files.Count > 0)
            {
                const string tempFilePath = @"/Content/Temp/";
                var uploadedFile = Request.Files[0];
                if (uploadedFile != null)
                {
                    var fi = new FileInfo(uploadedFile.FileName);
                    HttpContextSessionWrapperExtension.ContentLength = null;
                    HttpContextSessionWrapperExtension.ContentType = null;
                    if (Session[SessionEnum.TempFile.ToString()] != null)
                    {
                        Session[SessionEnum.TempFile.ToString()] = null;
                        HttpContextSessionWrapperExtension.ContentStream = null;
                    }

                    Session[SessionEnum.TempFile.ToString()] = uploadedFile;
                    HttpContextSessionWrapperExtension.ContentLength = uploadedFile.ContentLength;
                    HttpContextSessionWrapperExtension.ContentType = uploadedFile.ContentType;
                    var bytesData = new byte[uploadedFile.ContentLength];
                    uploadedFile.InputStream.Read(bytesData, 0, uploadedFile.ContentLength);

                    var tempFile = new byte[uploadedFile.ContentLength];
                    uploadedFile.InputStream.Read(tempFile, 0, uploadedFile.ContentLength);

                    var serverPath = Server.MapPath(tempFilePath);
                    if (Directory.Exists(serverPath))
                    {
                        var getFiles = Directory.GetFiles(serverPath);
                        foreach (var item in getFiles)
                            System.IO.File.Delete(item);

                        Directory.Delete(serverPath);
                    }

                    Directory.CreateDirectory(serverPath);

                    var filename = fi.Name;
                    using (var transScope = new TransactionScope())
                    {
                        var completePath = Path.Combine(serverPath, filename);
                        uploadedFile.SaveAs(completePath);
                        var dtData = Import(completePath);

                        if (dtData != null && dtData.Rows.Count > 0)
                        {
                            for (var i = dtData.Rows.Count - 1; i >= 0; i--)
                            {
                                if (dtData.Rows[i]["IndicatorNumber"] == DBNull.Value)
                                    dtData.Rows[i].Delete();
                            }
                            dtData.AcceptChanges();

                            var list = ConvertIndicatorDataTableToList(dtData);
                            if (list.Count > 0)
                            {
                                var getFiles = Directory.GetFiles(serverPath);

                                foreach (var item in getFiles)
                                    System.IO.File.Delete(item);

                                using (var bal = new DashboardIndicatorDataBal())
                                {
                                    var result = bal.BulkSaveDashboardIndicatorData(list, Helpers.GetDefaultFacilityId(), Helpers.GetSysAdminCorporateID());
                                    if (result.Count == 0)
                                    {
                                        ViewBag.ImportStatus = result.Count == 0 ? -1 : 1;
                                        Session[SessionEnum.TempFile.ToString()] = null;
                                    }
                                }
                            }
                        }
                        transScope.Complete();
                    }
                }
            }
            return RedirectToAction("Index");
        }


        /// <summary>
        /// Converts the indicator data table to list.
        /// </summary>
        /// <param name="dataTable">The data table.</param>
        /// <returns></returns>
        private static List<DashboardIndicatorDataCustomModel> ConvertIndicatorDataTableToList(DataTable dataTable)
        {
            return (from DataRow row in dataTable.Rows
                    select new DashboardIndicatorDataCustomModel
                    {
                        ID = 0,
                        CreatedBy = Helpers.GetLoggedInUserId(),
                        CreatedDate = Helpers.GetInvariantCultureDateTime(),
                        IndicatorNumber = Convert.ToString(row["IndicatorNumber"]),
                        SubCategory1 = Convert.ToString(row["SubCategory1"]),
                        SubCategory2 = Convert.ToString(row["SubCategory2"]),
                        StatisticData = Convert.ToString(row["StatisticData"]),
                        Month = Convert.ToInt32(row["Month"]),
                        Year = Convert.ToString(row["Year"]),
                        FacilityNameStr = Convert.ToString(row["Facility"]),
                        CorporateName = Convert.ToString(row["Corporate"]),
                        BudgetType = Convert.ToString(row["BudgetType"]),
                        DepartmentNumber = Convert.ToString(row["DepartmentNumber"]),
                        IndicatorId = 101,
                        IsActive = true,
                    }).ToList();
        }

        #endregion

    }
}
