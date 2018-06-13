$(function () {
    $("#ManualDashboardFormDiv").validationEngine();
    LoadDropdownsInManualDashboard();
    $("#ddlSubCategory1").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            RebindSubCategories2InManualDashboard(selectedValue, "0");
        } else {
            BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
        }
    });

    $('#btnExportExcel').click(function () {
        //e.preventDefault();
        var item = $(this);
        var hrefString = item.attr("href");
        var controllerAction = hrefString.split('?')[0];
        //var parametersArray = hrefString.split('?')[1].split('&');
        var facilityid = $('#ddlFacilityFilter').val();
        var yearFilter = $('#ddlYearFilter').val();
        var ownerFilter = $('#ddlOwnerFilter').val();
        var indicatorFilter = $('#ddlIndicatorFilter').val();
        facilityid = facilityid != null ? facilityid : 0;
        var hrefNew = controllerAction + "?facilityId=" + facilityid + "&year=" + yearFilter + "&indicator=" + indicatorFilter + "&owner=" + ownerFilter;
        item.removeAttr('href');
        item.attr('href', hrefNew);
        return true;
    });

    //$('#chkShowInActive').change(function () {
    //    ClearManualDashboardForm();
    //    $.validationEngine.closePrompt(".formError", true);
    //    var jsonData = {
    //        showInActive: $("#chkShowInActive").prop("checked")
    //    };
    //    $.post("/ManualDashboard/BindGridActiveInactive", jsonData, function (data) {
    //        BindList("#ManualDashboardListDiv", data);
    //    });
});

function LoadDropdownsInManualDashboard() {
    $.ajax({
        type: "POST",
        url: "/ManualDashboard/BindAllListsInManualDashboardData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data != null) {
                BindDropdownData(data.listBudgetType, '#ddlBudgetType', '#hfBudgetType');
                BindDropdownData(data.listFormatType, "#ddlFormatType", "#hfFormatType");
                BindDropdownData(data.listFrequency, "#ddlFrequency", "#hfFrequency");
                BindDropdownData(data.listDashboardType, "#ddlDashboardType", "#hfDashboardType");
                BindDropdownData(data.listKPICategory, "#ddlKPICategory", "#hfKPICategory");
                BindDropdownData(data.listSubCat1, "#ddlSubCategory1", "");
                BindDropdownData(data.listSubCat2, "#ddlSubCategory2", "");
                BindDropdownData(data.listIndicators, '#ddlIndicators', $('#hfIndicators').val());
                BindDropdownData(data.listIndicators, "#ddlIndicatorFilter", "");
                BindDropdownData(data.listFacilities, '#ddlFacility', $('#hfFacilityId').val());
                BindDropdownData(data.listFacilities, '#ddlFacilityFilter', $('#hdCFacilityId').val());
                $('#ddlFacilityFilter option[value="0"]').text('---All---');
                BindDropdownData(data.listOwnership, "#ddlOwnerFilter", "");
                BindDropdownData(data.listYears, '#ddlYear', $('#hfYear').val());
                BindDropdownData(data.listYears, "#ddlYearFilter", "");
                BindDropdownData(data.listDepartments, "#ddlDepartment", "#hfDepartment");
                $('.divMonths input[type=text]').attr("disabled", false);
                $('#ddlFrequency').val('1').attr("disabled","disabled");
            }
            //BindDropdownData(data, selector, selectedId);
        },
        error: function (msg) {
        }
    });
}

function GetManualDashboardList() {
    $.ajax({
        type: "POST",
        url: '/ManualDashboard/GetManualDashboardList',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: "",
        success: function (data) {
            BindList("#ManualDashboardListDiv", data);
        },
        error: function (msg) {

        }
    });
}

function SaveManualDashboard() {
    var isValid = jQuery("#ManualDashboardFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtId = $("#txtID").val();
        var txtBudgetType = $("#ddlBudgetType").val();
        var txtExternalValue1 = $("#ddlDepartment").val();
        var txtOtherDescription = $("#txtOtherDescription").val();
        var txtFacilityId = $("#ddlFacility").val();
        var txtIndicators = $("#ddlIndicators").val();
        var txtSubCategory1 = $("#ddlSubCategory1").val();
        var txtSubCategory2 = $("#ddlSubCategory2").val();
        var txtFrequency = $("#ddlFrequency").val();
        var txtCompanyTotal = $("#txtCompanyTotal").val();
        var txtOwnerShip = $("#txtOwnerShip").val();
        var txtYear = $("#ddlYear").val();
        var txtM1 = $("#txtM1").val();
        var txtM2 = $("#txtM2").val();
        var txtM3 = $("#txtM3").val();
        var txtM4 = $("#txtM4").val();
        var txtM5 = $("#txtM5").val();
        var txtM6 = $("#txtM6").val();
        var txtM7 = $("#txtM7").val();
        var txtM8 = $("#txtM8").val();
        var txtM9 = $("#txtM9").val();
        var txtM10 = $("#txtM10").val();
        var txtM11 = $("#txtM11").val();
        var txtM12 = $("#txtM12").val();
        var showInActive = $("#chkStatus").prop("checked");
        var jsonData = JSON.stringify({
            ID: txtId,
            BudgetType: txtBudgetType,
            Indicators: txtIndicators,
            SubCategory1: txtSubCategory1,
            SubCategory2: txtSubCategory2,
            Frequency: txtFrequency,
            DataType: '',
            CompanyTotal: txtCompanyTotal,
            OwnerShip: txtOwnerShip,
            Year: txtYear,
            M1: txtM1 == null || txtM1 == '' ? '0.0000' : txtM1,
            M2: txtM2 == null || txtM2 == '' ? '0.0000' : txtM2,
            M3: txtM3 == null || txtM3 == '' ? '0.0000' : txtM3,
            M4: txtM4 == null || txtM4 == '' ? '0.0000' : txtM4,
            M5: txtM5 == null || txtM5 == '' ? '0.0000' : txtM5,
            M6: txtM6 == null || txtM6 == '' ? '0.0000' : txtM6,
            M7: txtM7 == null || txtM7 == '' ? '0.0000' : txtM7,
            M8: txtM8 == null || txtM8 == '' ? '0.0000' : txtM8,
            M9: txtM9 == null || txtM9 == '' ? '0.0000' : txtM9,
            M10: txtM10 == null || txtM10 == '' ? '0.0000' : txtM10,
            M11: txtM11 == null || txtM11 == '' ? '0.0000' : txtM11,
            M12: txtM12 == null || txtM12 == '' ? '0.0000' : txtM12,
            OtherDescription: txtOtherDescription,
            FacilityId: txtFacilityId,
            ExternalValue1: txtExternalValue1,
            IsActive: showInActive
        });
        $.ajax({
            type: "POST",
            url: '/ManualDashboard/SaveManualDashboard',
            async: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data != null && data != '') {
                    RebindGrid();
                    ClearManualDashboardForm();
                    var msg = "Records Saved successfully !";

                    if (txtId != "")
                        msg = "Records updated successfully";
                    ShowMessage(msg, "Success", "success", true);
                }
                else
                    ShowMessage("Eror while saving / updating records!!", "Alert", "warning", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditManualDashboard(facilityId, corpId, indicatorNumber, type, year, subCat1, subCat2) {
    if (subCat1 == null)
        subCat1 = "0";
    if (subCat2 == null)
        subCat2 = "0";
    $.post("/ManualDashboard/GetManualDashboardDetails", { facilityId: facilityId, corporateId: corpId, year: year, indicatorNumber: indicatorNumber, budgetType: type, subCategory1: subCat1, subCategory2: subCat2 }, function (data) {
        BindManualDashboardDetails(data);
    });
}

//function DeleteManualDashboardWithConfirm(facilityId, corpId, indicatorNumber, type, year, subCat1, subCat2, title, msg, confirmEvent, cancelEvent) {
//    $("#h5Globaltitle").html(title);
//    if (msg != '')
//        $("#h5GlobalMessage").html(msg);

//    if (cancelEvent == null)
//        cancelEvent = CancelEvent;

//    $.blockUI({ message: $('#divConfirmBox'), css: { width: '350px' } });

//    //Remove Button Clicks
//    $('#divConfirmBox').off('click', '#btnGlobalConfirm', ConfirmedDeleteInManualDashboardData(null));
//    $('#divConfirmBox').off('click', '#btnGlobalCancel', cancelEvent);

//    var jsonData = JSON.stringify({
//        facilityId: facilityId,
//        corporateId: corpId,
//        year: year,
//        indicatorNumber: indicatorNumber,
//        budgetType: type,
//        subCategory1: subCat1,
//        subCategory2: subCat2
//    });

//    //Add Button Clicks
//    $('#divConfirmBox').on('click', '#btnGlobalConfirm', ConfirmedDeleteInManualDashboardData(jsonData));
//    $('#divConfirmBox').on('click', '#btnGlobalCancel', cancelEvent);
//}


//function ConfirmedDeleteInManualDashboardData(jsonData) {
//    $.ajax({
//        type: "POST",
//        url: '/ManualDashboard/DeleteManualDashboardDetails',
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: jsonData,
//        success: function (data) {
//            BindList("#ManualDashboardListDiv", data);
//        },
//        error: function (msg) {

//        }
//    });
//}

function DeleteManualDashboard(facilityId, corpId, indicatorNumber, type, year, subCat1, subCat2) {
    if (confirm("Do you want to delete this record? ")) {
        var jsonData = JSON.stringify({
            facilityId: facilityId,
            corporateId: corpId,
            year: year,
            indicatorNumber: indicatorNumber,
            budgetType: type,
            subCategory1: subCat1,
            subCategory2: subCat2
        });
        $.ajax({
            type: "POST",
            url: '/ManualDashboard/DeleteManualDashboardDetails',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#ManualDashboardListDiv", data);
            },
            error: function (msg) {

            }
        });
    }
}

function ClearManualDashboardForm() {
    $("#ManualDashboardFormDiv").clearForm(true);
    $('#collapseManualDashboardAddEdit').removeClass('in');
    $('#collapseManualDashboardList').addClass('in');
    $("#ManualDashboardFormDiv").validationEngine();
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
    $('#ManualDashboardFormDiv input, select').removeAttr('disabled');
    $('.btn-group input').removeAttr('disabled');
    $('.clsDisabled').removeAttr("disabled");
    $("#chkStatus").prop("checked", "checked");
    $('.divMonths input[type=text]').prop("disabled", false);
    $('#ddlFrequency').val('1').attr("disabled", "disabled");
}

function BindManualDashboardDetails(vmData) {
    var data = vmData.current;
    var locked = vmData.locked;
    if (data != null) {
        $("#btnSave").val("Update");
        $('#collapseManualDashboardList').removeClass('in');
        $('#collapseManualDashboardAddEdit').addClass('in');
        $("#ManualDashboardFormDiv").validationEngine();
        $("#txtID").val(data.ID);
        if (data.SubCategory1 != null && data.SubCategory1 > 0) {
            $('#ddlSubCategory1').val(data.SubCategory1);
            RebindSubCategories2InManualDashboard(data.SubCategory1, data.SubCategory2);
        } else
            BindGlobalCodesWithValue("#ddlSubCategory2", 4351, data.SubCategory2);
        $("#ddlBudgetType").val(data.BudgetType);
        //$("#ddlDashboardType").val(data.DashboardType);
        //$("#ddlKPICategory").val(data.KPICategory);
        $("#ddlFacility").val(data.FacilityId);
        $("#ddlDepartment").val(data.ExternalValue1);
        //$("#txtDefination").val(data.Defination);
        $("#txtOtherDescription").val(data.OtherDescription);
        $("#ddlIndicators").val(data.Indicators);
        $("#ddlFrequency").val(data.Frequency);
        $("#txtCompanyTotal").val(data.CompanyTotal);
        $("#txtOwnerShip").val(data.OwnerShip);
        $("#ddlYear").val(data.Year);
        //$("#SubCategoryValue1Str").val(data.SubCategory1);
        //$("#SubCategoryValue2Str").val(data.SubCategory2);


        $("#txtM1").val(data.M1);
        $("#txtM2").val(data.M2);
        $("#txtM3").val(data.M3);
        $("#txtM4").val(data.M4);
        $("#txtM5").val(data.M5);
        $("#txtM6").val(data.M6);
        $("#txtM7").val(data.M7);
        $("#txtM8").val(data.M8);
        $("#txtM9").val(data.M9);
        $("#txtM10").val(data.M10);
        $("#txtM11").val(data.M11);
        $("#txtM12").val(data.M12);
        if (data.ExternalValue2 == '3') {
            $('#ManualDashboardFormDiv input, select').attr('disabled', 'disabled');
            $('.btn-group input').removeAttr('disabled');
        }

        $("#ddlSubCategory1").attr("disabled", true);
        $("#ddlSubCategory2").attr("disabled", true);
        $("#chkStatus").prop("checked", data.IsActive);
        $('.clsDisabled').attr("disabled", "disabled");

        //$("#txtM1").prop('disabled', false);
        //$("#txtM2").prop('disabled', false);
        //$("#txtM2").prop('disabled', false);
        //$("#txtM3").prop('disabled', false);
        //$("#txtM4").prop('disabled', false);
        //$("#txtM5").prop('disabled', false);
        //$("#txtM6").prop('disabled', false);
        //$("#txtM7").prop('disabled', false);
        //$("#txtM8").prop('disabled', false);
        //$("#txtM9").prop('disabled', false);
        //$("#txtM10").prop('disabled', false);
        //$("#txtM11").prop('disabled', false);
        //$("#txtM12").prop('disabled', false);
        $('.divMonths input[type=text]').prop("disabled", false);


        if (locked != null) {
            if (locked.M1 == '1')
                $("#txtM1").prop('disabled', true);
            if (locked.M2 == '1')
                $("#txtM2").prop('disabled', true);
            if (locked.M2 == '1')
                $("#txtM2").prop('disabled', true);
            if (locked.M3 == '1')
                $("#txtM3").prop('disabled', true);
            if (locked.M4 == '1')
                $("#txtM4").prop('disabled', true);
            if (locked.M5 == '1')
                $("#txtM5").prop('disabled', true);
            if (locked.M6 == '1')
                $("#txtM6").prop('disabled', true);
            if (locked.M7 == '1')
                $("#txtM7").prop('disabled', true);
            if (locked.M8 == '1')
                $("#txtM8").prop('disabled', true);
            if (locked.M9 == '1')
                $("#txtM9").prop('disabled', true);
            if (locked.M10 == '1')
                $("#txtM10").prop('disabled', true);
            if (locked.M11 == '1')
                $("#txtM11").prop('disabled', true);
            if (locked.M12 == '1')
                $("#txtM12").prop('disabled', true);

        }
    }
}

/// <var>bind the accounts dropdown</var>
var BindDepartmentsDropdown = function () {
    $.post("/FacilityDepartment/BindAccountDropdowns", null, function (data) {
        BindDropdownData(data.reveuneAccount, "#ddlDepartment", "#hfDepartment");
        //BindDropdownData(data.generalLederAccount, "#ddlDebitAccount", "#hdDebitAccount");
    });
};

function IsDataExist() {
    var isValid = jQuery("#ManualDashboardFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtBudgetType = $("#ddlBudgetType").val();
        var txtFacilityId = $("#ddlFacility").val();
        var txtIndicators = $("#ddlIndicators").val();
        var txtYear = $("#ddlYear").val();
        var jsonData = JSON.stringify({
            id: $("#txtID").val(),
            indicatorNumber: txtIndicators,
            budgetType: txtBudgetType,
            facilityId: txtFacilityId,
            year: txtYear
        });
        $.ajax({
            type: "POST",
            url: '/ManualDashboard/IsDataExist',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data != true)
                    SaveManualDashboard();
                else {
                    ShowMessage("Data already exist!", "Info", "warning", true);
                }
            },
            error: function (msg) {

            }
        });
    }
}

function RebindGrid() {
    //showLoader();
    //ajaxStartActive = false;

    //alert('Hello');
    var fId = $("#ddlFacilityFilter").length > 0 ? $("#ddlFacilityFilter").val() : 0;
    var jsonData = JSON.stringify({
        facilityId: fId,
        year: $("#ddlYearFilter").val() > 0 ? $("#ddlYearFilter").val() : 0,
        indicator: $("#ddlIndicatorFilter").val() > 0 ? $("#ddlIndicatorFilter").val() : 0,
        owner: $("#ddlOwnerFilter").val() != '' || $("#ddlOwnerFilter").val() != '0' ? $("#ddlOwnerFilter").val() : '',
    });
    $.ajax({
        type: "POST",
        url: '/ManualDashboard/RebindGridWithFacility',
        async: true,
        //cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        //beforeSend: function () { showLoader(); },
        success: function (data) {
            //hideLoader();
            BindList("#ManualDashboardListDiv", data);
            //ajaxStartActive = false;
        },
        error: function (msg) {

        }
    });
}

function RebindSubCategories2InManualDashboard(selectedValue, subCategory2SelectedValue) {
    $.post("/GlobalCode/GetGlobalCodesDropdownDataByExternalValue1", { globalCodeValue: selectedValue, parentCategory: "4347" }, function (data) {
        if (subCategory2SelectedValue == null)
            subCategory2SelectedValue = "";
        BindDropdownData(data, "#ddlSubCategory2", subCategory2SelectedValue);
    });
}

/// <var>The bind grid by order</var>
var BindGridByOrder = function (sortby, sortDirection, id) {
    var jsonData = {
        sort: sortby,
        sortdir: sortDirection,
        facilityId: $("#ddlFacilityFilter").val(),
        year: $("#ddlYearFilter").val() > 0 ? $("#ddlYearFilter").val() : 0,
        indicator: $("#ddlIndicatorFilter").val() > 0 ? $("#ddlIndicatorFilter").val() : 0,
        owner: $("#ddlOwnerFilter").val() != '' || $("#ddlOwnerFilter").val() != '0' ? $("#ddlOwnerFilter").val() : '',
    };
    $.post("/ManualDashboard/BindManualDashboardIndicatorsDataByOrder", jsonData, function (data) {
        BindList("#ManualDashboardListDiv", data);
        var newSortdirection = sortDirection == "DESC" ? "ASC" : "DESC";
        $('#' + id).removeAttr('onclick');
        $('#' + id).attr('onclick', 'BindGridByOrder("' + sortby + '","' + newSortdirection + '","' + id + '");');
    });
};

function ReBindIndicatorListOnChangeOwnership() {
    var value = $("#ddlOwnerFilter").val() != '' && $("#ddlOwnerFilter").val() != '0' ? $("#ddlOwnerFilter").val() : '';
    $.post("/ManualDashboard/GetIndicatorsList", { ownership: value, }, function (data) {
        BindDropdownData(data, "#ddlIndicatorFilter", "");
    });
}


//----- Active and InActive-----
$('#chkShowInActive').change(function () {
    ClearManualDashboardForm();
    var showInActive = $("#chkShowInActive").prop("checked");
    var showActive = showInActive == true ? false : true;
    var fId = $("#ddlFacilityFilter").length > 0 ? $("#ddlFacilityFilter").val() : 0;
    var jsonData = JSON.stringify({
        facilityId: fId,
        year: $("#ddlYearFilter").val() > 0 ? $("#ddlYearFilter").val() : 0,
        indicator: $("#ddlIndicatorFilter").val() > 0 ? $("#ddlIndicatorFilter").val() : 0,
        owner: $("#ddlOwnerFilter").val() != '' || $("#ddlOwnerFilter").val() != '0' ? $("#ddlOwnerFilter").val() : '',
        showInActive: showActive
    });
    $.ajax({
        type: "POST",
        url: '/ManualDashboard/RebindGriActiveInActive',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            BindList("#ManualDashboardListDiv", data);
        },
        error: function (msg) {

        }
    });


});


function showLoader() {
    $("#progressbar").css("display", "");
    $("#progressbar").css("display", "block");
    //$("#progressbar").show();
}

function hideLoader() {
    setTimeout(function () {
        $("#progressbar").css("display", "none");
        //$("#progressbar").hide();
    }, 1000);
}


function ConfirmDelete(confirmedFirstId, confirmedSecondId, confirmedThirdId, confirmedFourthId, confirmedFifthId, title, msg, confirmEvent, cancelEvent) {

}