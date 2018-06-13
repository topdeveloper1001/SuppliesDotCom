$(function() {
    $("#DashboardParametersFormDiv").validationEngine();
    BindGlobalCodesWithValue("#ddlDashboardType", 4401, '');
    BindGlobalCodesWithValue("#ddlIndicatorCategory", 4407, '');
    BindGlobalCodesWithValue("#ddlDataField", 4403, '');
    BindGlobalCodesWithValue("#ddlValueType", 4343, '');
    BindGlobalCodesWithValue("#ddlArgument", 4405, '');
    BindGlobalCodesWithValue("#ddlColorCode", 4406, '');
    BindDropDownOnlyWithSelect("#ddlExternalDashboardType");
    $("#ddlDashboardType").change(function() {
        var sourceValue = $(this).val();
        if (sourceValue == "1") { //1 value is for External dashboard type
            BindGlobalCodesWithValue("#ddlExternalDashboardType", 4345, '');
            $("#ddlExternalDashboardType").addClass("validate[required]");
        } else {
            BindDropDownOnlyWithSelect("#ddlExternalDashboardType");
            $(".ddlExternalDashboardTypeformError").remove();
            $("#ddlExternalDashboardType").removeClass("validate[required]");
        }
    });
});

function SaveDashboardParameters(id) {
    var isValid = jQuery("#DashboardParametersFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var dashboardType = $("#ddlDashboardType").val();
        var indicatorCategory = $("#ddlIndicatorCategory").val();
        var dataField = $("#ddlDataField").val();
        var valueType = $("#ddlValueType").val();
        var argument = $("#ddlArgument").val();
        var rangeFrom = $("#txtRangeFrom").val();
        var rangeTo = $("#txtRangeTo").val();
        var colorCode = $("#ddlColorCode").val();
        var externalDashboardType = $("#ddlExternalDashboardType").val();
        var jsonData = JSON.stringify({
            ParameterId: $("#hfDashboardParameterId").val(),
            DashboardType: dashboardType,
            IndicatorCategory: indicatorCategory,
            DataField: dataField,
            ValueType: valueType,
            Argument: argument,
            RangeFrom: rangeFrom,
            RangeTo: rangeTo,
            ColorCode: colorCode,
            ExternalValue1: externalDashboardType
        });
        $.ajax({
            type: "POST",
            url: '/DashboardParameters/SaveDashboardParameters',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                BindList("#DashboardParametersListDiv", data);
                ClearDashboardParametersForm();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditDashboardParameters(id) {
    var jsonData = JSON.stringify({
        id: id
    });
    $.ajax({
        type: "POST",
        url: '/DashboardParameters/GetDashboardParametersDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDashboardParametersDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteDashboardParameters() {
    var jsonData = JSON.stringify({
        id: $("#hfGlobalConfirmId").val()
    });
    $.ajax({
        type: "POST",
        url: '/DashboardParameters/DeleteDashboardParameters',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            BindList("#DashboardParametersListDiv", data);
            ShowMessage("Records Deleted Successfully", "Sucess", "success", true);
        },
        error: function (msg) {
            return true;
        }
    });
}

function ClearDashboardParametersForm() {
    $("#DashboardParametersFormDiv").clearForm(true);
    $('#collapseDashboardParametersAddEdit').addClass('in');
    $('#collapseDashboardParametersList').addClass('in');
    $("#DashboardParametersFormDiv").validationEngine();
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
    $("#hfDashboardParameterId").val("0");
}

function BindDashboardParametersDetails(data) {
    $("#btnSave").val("Update");
    $('#collapseDashboardParametersList').addClass('in');
    $('#collapseDashboardParametersAddEdit').addClass('in');
    $("#DashboardParametersFormDiv").validationEngine();
    $("#hfDashboardParameterId").val(data.ParameterId);
    $("#ddlDashboardType").val(data.DashboardType);
    $("#ddlIndicatorCategory").val(data.IndicatorCategory);
    $("#ddlDataField").val(data.DataField);
    $("#ddlValueType").val(data.ValueType);
    $("#ddlArgument").val(data.Argument);
    $("#txtRangeFrom").val(data.RangeFrom);
    $("#txtRangeTo").val(data.RangeTo);
    $("#ddlColorCode").val(data.ColorCode);
    var sourceValue = data.DashboardType;
    if (sourceValue == "1") {//1 value is for External dashboard type
        BindGlobalCodesWithValue("#ddlExternalDashboardType", 4345, '');
        $("#ddlExternalDashboardType").addClass("validate[required]");
    } else {
        BindDropDownOnlyWithSelect("#ddlExternalDashboardType");
        $(".ddlExternalDashboardTypeformError").remove();
        $("#ddlExternalDashboardType").removeClass("validate[required]");
    }
    $("#ddlExternalDashboardType").val(data.ExternalValue1);
}


function SortDashboardParamiter(event) {
    
    var url = "/DashboardParameters/SortDashboardParameters";
   
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#DashboardParametersListDiv").empty();
            $("#DashboardParametersListDiv").html(data);

        },
        error: function (msg) {
        }
    });
}