$(function () {
    $("#ManualDashboardFormDiv").validationEngine();
    //GetManualDashboardList();
    BindGlobalCodesWithValue('#ddlBudgetType', 3112, '#hfBudgetType');
    BindFiscalYearDDls('#ddlYear', $('#hfYear').val());
    BindFacilities('#ddlFacility', $('#hfFacilityId').val());
    BindIndicators('#ddlIndicators', $('#hfIndicators').val());
    BindGlobalCodesWithValue("#ddlFrequency", 4344, "#hfFrequency");
    BindGlobalCodesWithValue("#ddlFormatType", 4343, "#hfFormatType");
    BindGlobalCodesWithValue("#ddlDashboardType", 4345, "#hfDashboardType");
    BindGlobalCodesWithValue("#ddlKPICategory", 4346, "#hfKPICategory");
    BindGlobalCodesWithValue("#ddlSubCategory1", 4347, "");
    BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
    BindDepartmentsDropdown();
    BindFacilitiesWithoutCorporate('#ddlFacilityFilter', $('#hdCFacilityId').val());
    setTimeout(function () {
        $('#ddlFacilityFilter option[value="0"]').text('---All---');
    }, 200);

    $("#ddlSubCategory1").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            RebindSubCategories2InManualDashboard(selectedValue, "0");
        } else {
            BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
        }
    });

    //$('#btnExportExcel').click(function () {
    //    
    //    //e.preventDefault();
    //    var item = $(this);
    //    var hrefString = item.attr("href");
    //    var controllerAction = hrefString.split('?')[0];
    //    //var parametersArray = hrefString.split('?')[1].split('&');
    //    var facilityid = $('#ddlFacilityFilter').val();
    //    facilityid = facilityid != null ? facilityid : 0;
    //    var hrefNew = controllerAction + "?facilityId=" + facilityid;
    //    item.removeAttr('href');
    //    item.attr('href', hrefNew);
    //    return true;
    //});

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

    $('#chkShowInActive').change(function () {
        ClearManualDashboardForm();
        $.validationEngine.closePrompt(".formError", true);
        var jsonData = {
            showInActive: $("#chkShowInActive").prop("checked")
        };
        $.post("/ManualDashboard/BindGridActiveInactive", jsonData, function (data) {
            BindList("#ManualDashboardListDiv", data);
        });
    });

    /*
    By: Amit Jain
    On: 13072015
    Purpose: Bind the dropdowns for filtering the manual dashboard data 
    */
    BindIndicatorsFilterDropdown();
    BindOwnershipFilterDropdown();
    BindYearFilterDropdown();
    $('.divMonths input[type=text]').attr("disabled", false);
});

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
            M1: txtM1,
            M2: txtM2,
            M3: txtM3,
            M4: txtM4,
            M5: txtM5,
            M6: txtM6,
            M7: txtM7,
            M8: txtM8,
            M9: txtM9,
            M10: txtM10,
            M11: txtM11,
            M12: txtM12,
            OtherDescription: txtOtherDescription,
            FacilityId: txtFacilityId,
            ExternalValue1: txtExternalValue1,
            IsActive: showInActive
        });
        $.ajax({
            type: "POST",
            url: '/ManualDashboardV1/SaveManualDashboard',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                //BindList("#ManualDashboardListDiv", data);
                RebindGrid();
                ClearManualDashboardForm();
                var msg = "Records Saved successfully !";
                if (txtId != "")
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditManualDashboard(facilityId, corpId, indicatorNumber, type, year) {
    $.post("/ManualDashboardV1/GetManualDashboardDetails", { facilityId: facilityId, corporateId: corpId, year: year, indicatorNumber: indicatorNumber, budgetType: type }, function (data) {
        BindManualDashboardDetails(data);
    });
}

//function DeleteManualDashboard() {
//    var jsonData = JSON.stringify({
//        facilityId: $("#hfGlobalConfirmFirstId").val(),
//        corporateId: $("#hfGlobalConfirmedSecondId").val(),
//        year: $("#hfGlobalConfirmedFifthId").val(),
//        indicatorNumber: $("#hfGlobalConfirmedThridId").val(),
//        budgetType: $("#hfGlobalConfirmedFourthId").val(),
//    });
//    $.ajax({
//        type: "POST",
//        url: '/ManualDashboardV1/DeleteManualDashboardDetails',
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

function DeleteManualDashboard(facilityId, corpId, indicatorNumber, type, year) {
    if (confirm("Do you want to delete this record? ")) {
        var jsonData = JSON.stringify({
            facilityId: facilityId,
            corporateId: corpId,
            year: year,
            indicatorNumber: indicatorNumber,
            budgetType: type
        });
        $.ajax({
            type: "POST",
            url: '/ManualDashboardV1/DeleteManualDashboardDetails',
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
        }
        else
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
        $("#txtOwnerShip").val(data.OwnershipUser);
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
    ajaxStartActive = true;
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

//----------------For Search Criteria --------------------------
/*
   By: Amit Jain
   On: 13072015
   Purpose: Bind the dropdowns for filtering the manual dashboard data 
   */
function BindIndicatorsFilterDropdown() {
    $.getJSON("/ManualDashboard/GetIndicatorsList", {}, function (data) {
        BindDropdownData(data, "#ddlIndicatorFilter", "");
    });
}

function BindOwnershipFilterDropdown() {
    $.getJSON("/ManualDashboard/GetOwnershipList", {}, function (data) {
        BindDropdownData(data, "#ddlOwnerFilter", "");
    });
}

function BindYearFilterDropdown() {
    $.getJSON("/ManualDashboard/GetYearsList", {}, function (data) {
        BindDropdownData(data, "#ddlYearFilter", "");
    });
}
//----------------For Search Criteria --------------------------

function ReBindIndicatorListOnChangeOwnership() {
    var value = $("#ddlOwnerFilter").val() != '' && $("#ddlOwnerFilter").val() != '0' ? $("#ddlOwnerFilter").val() : '';
    $.post("/ManualDashboard/GetIndicatorsList", { ownership: value, }, function (data) {
        BindDropdownData(data, "#ddlIndicatorFilter", "");
    });
}