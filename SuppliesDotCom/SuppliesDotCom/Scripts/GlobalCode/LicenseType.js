$(function () {
    BindUserRoleDropdown();
});


function SaveLicenceType() {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalExternal1 = $("#ddlUserRole option:selected").text();
    var globalCodeName = $("#txtGlobalCodeName").val();
    var ddlRoleValue = $("#ddlUserRole").val();

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: 1104,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: globalCodeName,
        FacilityNumber: 0,
        IsActive: true,
        IsDeleted: false,
        ExternalValue1: globalExternal1,
        ExternalValue2: ddlRoleValue
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/SaveLicenceType",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //$('#collapseGlobalCodesList').addClass('in').attr('style', 'height:auto;');
            if (data != null) {
                ClearLicenseType();
                var msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";
                BindList("#LicenceTypeList", data);
                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {

        }
    });
    return false;
}



function BindUserRoleDropdown() {
    $.ajax({
        type: "POST",
        url: "/GlobalCode/GetUserRole",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, deaprtments) {
                    items += "<option value='" + deaprtments.Value + "'>" + deaprtments.Text + "</option>";
                });
                $("#ddlUserRole").html(items);
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}



function BindLicencTypeData(data) {
    $('#collapseGlobalCodeAddEdit').addClass('in').attr('style', 'height:auto;');
    $('#ddlUserRole option').map(function () { if ($(this).text() == data.ExternalValue1) return this; }).attr('selected', 'selected');
    $("#txtGlobalCodeName").val(data.Name);
    $("#hfGlobalCodeID").val(data.Id);
    $("#btnSavePhysician").val("Update");
    $('#collapseOne').addClass('in');
}


function DeleteLicenceType() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCode/DeleteLicenceType';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                globalCodeId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data != null) {
                    BindList("#LicenceTypeList", data);
                    ShowMessage("Licence Type deleted successfully", "Deleted!", "info", true);
                }
            },
            error: function () {
            }
        });
    }
}

function EditLiceneceType(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindLicencTypeData(data);
        },
        error: function () {
        }
    });
}


function ClearLicenseType() {
    $('#globalCodeForm').clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $('#collapseGlobalCodesList').addClass('in');
    $('.btnGlobalCodeSave').val('Save');
}

function SortLicenseGrid(event) {
    var url = "/GlobalCode/GetLicenseTypeData";
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
            $("#LicenceTypeList").empty();
            $("#LicenceTypeList").html(data);
        },
        error: function () {
        }
    });
}