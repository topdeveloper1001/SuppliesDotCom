$(function () {
    //-----------For Import Excel----------//
    if ($("#ImportStatus").length > 0) {
        if ($("#ImportStatus").val() == 1)
            ShowMessage("Data Imported Successfully", "Success", "Success", true);
        else if ($("#ImportStatus").val() == -1)
            ShowErrorMessage("Error while importing data to Database.Try again later", true);
    }
    //-----------For Import Excel----------//


    BindFiscalYearDDls("#ddlYear", "");
    $("#DashboardIndicatorDataFormDiv").validationEngine();
    BindFacilitiesWithoutCorporate('#ddlFacility', "");
    BindIndicators('#ddlIndicator', "");
    BindMonthsList('#ddlMonth', "");
    BindGlobalCodesWithValue("#ddlSubCategory1", 4347, "");
    BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
    BindGlobalCodesWithValue("#ddlBudgetType", 3112, "");

    $('#ddlIndicator').on('change', function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            GetIndicatorNumber(selectedValue);
        }
    });
    $("#ddlSubCategory1").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue > 0) {
            RebindSubCategories2(selectedValue, "0");
        } else {
            BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
        }
    });
});

function SaveDashboardIndicatorData(id) {
    var isValid = jQuery("#DashboardIndicatorDataFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var txtId = $("#ID").val();
        var txtIndicatorId = $("#ddlIndicator").val();
        var txtIndicatorNumber = $("#txtIndicatorNumber").val();
        var txtSubCategory1 = $("#ddlSubCategory1").val();
        var txtSubCategory2 = $("#ddlSubCategory2").val();
        var txtStatisticData = $("#txtStatisticData").val();
        var txtMonth = $("#ddlMonth").val();
        var year = $("#ddlYear").val();
        var txtFacilityId = $("#ddlFacility").val();
        var departmentNumber = $("#DepartmentNumber").val();
        var jsonData = JSON.stringify({
            ID: txtId,
            IndicatorId: txtIndicatorId,
            IndicatorNumber: txtIndicatorNumber,
            SubCategory1: txtSubCategory1,
            SubCategory2: txtSubCategory2,
            StatisticData: txtStatisticData,
            Month: txtMonth,
            Year: year,
            FacilityId: txtFacilityId,
            DepartmentNumber: departmentNumber,
            ExternalValue1: $("#ddlBudgetType").val(),
        });
        $.ajax({
            type: "POST",
            url: '/DashboardIndicatorData/SaveDashboardIndicatorData',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                $("#DashboardIndicatorDataListDiv").empty();
                BindList("#DashboardIndicatorDataListDiv", data);
                ClearDashboardIndicatorDataForm();
                var msg = "Records Saved successfully !";
                if (id > 0) {
                    msg = "Records updated successfully";
                }
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}

function EditDashboardIndicatorData(id, formTypeId) {
    $.post("/DashboardIndicatorData/GetDashboardIndicatorDataDetails", { id: id, type: formTypeId }, function (data) {
        BindDashboardIndicatorDataDetails(data);
        $("#divhidepopup1").show();
        $('.editdis').attr('disabled','disabled');
    });
}

function DeleteDashboardIndicatorData() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/DashboardIndicatorData/DeleteDashboardIndicatorData',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardIndicatorDataListDiv", data);
                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
            },
            error: function (msg) {
                return true;
            }
        });
    }
}

//function DeleteDashboardIndicatorData(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/DashboardIndicatorData/DeleteDashboardIndicatorData',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindList("#DashboardIndicatorDataListDiv", data);
//                ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function ClearDashboardIndicatorDataForm() {
    $("#DashboardIndicatorDataFormDiv").clearForm(true);
    //$('#collapseDashboardIndicatorDataAddEdit').removeClass('in');
    $('#collapseDashboardIndicatorDataList').addClass('in');
    $("#DashboardIndicatorDataFormDiv").validationEngine();
    ClosePopup();
}

function BindDashboardIndicatorDataDetails(data) {
    $("#btnSave").val("Update");
    $('#collapseDashboardIndicatorDataList').removeClass('in');
    $('#collapseDashboardIndicatorDataAddEdit').addClass('in');
    $("#DashboardIndicatorDataFormDiv").validationEngine();
    $('#ID').val(data.ID);
    $('#ddlIndicator').val(data.IndicatorNumber);
    $('#txtIndicatorNumber').val(data.IndicatorNumber);
    $('#ddlSubCategory1').val(data.SubCategory1);
    $('#ddlSubCategory2').val(data.SubCategory2);
    $('#txtStatisticData').val(data.StatisticData);
    $('#ddlMonth').val(data.Month);
    $('#ddlYear').val(data.Year);
    $('#ddlFacility').val(data.FacilityId);
    $('#ddlBudgetType').val(data.ExternalValue1);
    $('#DepartmentNumber').val(data.DepartmentNumber);
    GetIndicatorNumber(data.IndicatorNumber);

    if (data.SubCategory1 != null && data.SubCategory1 > 0) {
        $('#ddlSubCategory1').val(data.SubCategory1);
        RebindSubCategories2(data.SubCategory1, data.SubCategory2);
    } else
        BindGlobalCodesWithValue("#ddlSubCategory2", 4351, "");
}

function GetIndicatorNumber(selectedValue) {
    $.post("/DashboardIndicators/GetDashboardIndicatorsDetailsByNumber", { number: selectedValue }, function (data) {
        $("#txtIndicatorNumber").val(data.IndicatorNumber);
        switch (data.FormatTypeStr) {
            case "Number":
                $('#txtStatisticData').removeClass('validate[required]');
                $('#txtStatisticData').addClass('validate[required[integer]]');
                break;
            case "Percentage":
                $('#txtStatisticData').removeClass('validate[required]');
                $('#txtStatisticData').addClass('validate[required[number]]');
                break;
            case "Text":
                $('#txtStatisticData').removeClass('validate[required]');
                $('#txtStatisticData').addClass('validate[required]');
                break;
            default:
                $('#txtStatisticData').addClass('validate[required]');
                break;
        }
        $("#DashboardIndicatorDataFormDiv").validationEngine();
    });
}

function ClosePopup() {
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
    $("#divhidepopup1").hide();
    $('.editdis').removeAttr('disabled');
}

function RebindSubCategories2(selectedValue, subCategory2SelectedValue) {
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
        sortdir: sortDirection
    };
    $.post("/DashboardIndicatorData/BindIndicatorsDataByOrder", jsonData, function (data) {
        BindList("#DashboardIndicatorDataListDiv", data);
        var newSortdirection = sortDirection == "DESC" ? "ASC" : "DESC";
        $('#' + id).removeAttr('onclick');
        $('#' + id).attr('onclick', 'BindGridByOrder("' + sortby + '","' + newSortdirection + '","' + id + '");');
    });
};