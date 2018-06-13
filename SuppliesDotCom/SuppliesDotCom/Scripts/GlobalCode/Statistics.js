$(function () {
    $("#globalCodeForm").validationEngine();
});

function ClearStatisticsForm() {
    $('#globalCodeForm').clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $('#collapseGlobalCodesList').addClass('in');
    $('.btnGlobalCodeSave').val('Save');
}

function CheckIfGlobalCodeNameAlreadyExist() {
    var id = $("#hfGlobalCodeID").val();
    if (id == '')
        id = 0;
    var name = $("#txtGlobalCodeName").val();
    var jsonData = JSON.stringify({
        GlobalCodeName: name,
        GlobalCodeId: id,
        GlobalCodeCategoryValue: "1064"
    });

    $.ajax({
        type: "POST",
        url: "/GlobalCode/CheckDuplicateSubCategory",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (isExist) {
            //If Already exist, it will return true otherwise false
            if (isExist) {
                ShowMessage("Record already exists! ", "Alert", "info", true);
            }
            else {
                SaveStatistics();
            }
        },
        error: function (msg) {
        }
    });
}

function SaveStatistics() {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalCodeValue = $("#hfGlobalCodeValue").val();
    var globalCodeCategory = "1064";
    var globalCodeName = $("#txtGlobalCodeName").val();
    var description = $("#txtDescription").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: description,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: isActive,
        IsDeleted: false
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateStatistics",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindList("#GlobalCodesList", data);
                ClearStatisticsForm();
                ResetValues("#chkActive", "#hfGlobalCodeValue", globalCodeValue, globalCodeId);
                $('#collapseGlobalCodesList').addClass('in');
                var msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";

                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {

        }
    });
    return false;
}

function EditStatistics(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindStatisticsDetailsInEditMode(data);
        },
        error: function (msg) {
        }
    });
}

function DeleteStatistics() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCode/DeleteStatistics';
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
                    BindList("#GlobalCodesList", data);
                    ShowMessage("GlobalCode deleted successfully", "Deleted!", "info", true);
                    ClearStatisticsForm();
                }
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteStatistics(id) {
//    if (confirm("Do you want to delete GlobalCode?")) {
//        var url = '/GlobalCode/DeleteStatistics';
//        $.ajax({
//            type: "POST",
//            url: url,
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: JSON.stringify({
//                globalCodeId: id
//            }),
//            success: function (data) {
//                if (data != null) {
//                    BindList("#GlobalCodesList", data);
//                    ShowMessage("GlobalCode deleted successfully", "Deleted!", "info", true);
//                    ClearStatisticsForm();
//                }
//            },
//            error: function (msg) {
//            }
//        });
//    }
//    else {
//        return false;
//    }
//}

function BindStatisticsDetailsInEditMode(data) {
    $('#collapseGlobalCodeAddEdit').addClass('in');
    $("#hfGlobalCodeID").val(data.Id);
    $("#hdGlobalCodeCategoryValue").val(data.Category);
    $("#txtGlobalCodeName").val(data.Name);
    $("#hfGlobalCodeValue").val(data.Value);
    $("#txtDescription").val(data.Description);
    $("#txtSortOrder").val(data.SortOrder);
    $('#chkActive')[0].checked = data.IsActive;
    if ($("#hfGlobalCodeID").val() <= 0) {
        $('.btnGlobalCodeSave').val('Save');
    }
    else {
        $('.btnGlobalCodeSave').val('Update');
    }
    $('#collapseDiagnosisAddEdit').addClass('in');
}