var globalCodeValueSelector = "#hfGlobalCodeValue";
var globalCodeCategoryValueSelector = "#hdGlobalCodeCategoryValue";
var SetupUrl = "/Setup/";

$(function () {
    $("#globalCodeForm").validationEngine();
    $("#divCategoryDropdown").hide();

    if ($("#hfGlobalCodeValue").length == 0) {
        globalCodeValueSelector = "#txtGlobalCodeValue";
    }
    var showCategory = $("#hdWithCategoryDropdown").val();
    if (showCategory == "True") {
        $("#divCategoryDropdown").show();
    }
    var withExternalValue = $("#hdWithExternalValues").val();
    if (withExternalValue == 'False') {
        $("#divExternalValues").hide();
    }

    $("#chkActive").prop('checked', true);
});

function ClearGenericForm(category) {
    var gccParentValue = $("#hdGlobalCodeCategoryParentValue").val();
    $('#globalCodeForm').clearForm(true);
    $("#hdGlobalCodeCategoryParentValue").val(gccParentValue);
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $('#collapseGlobalCodesList').addClass('in');
    $('.btnGlobalCodeSave').val('Save');
    ResetGenericCodeValues(category, "", globalCodeValueSelector);
    $(globalCodeCategoryValueSelector).val(category);
    $('#chkActive').prop('checked', true);
}

function CheckIfGenericCodeExists() {
    var category = $(globalCodeCategoryValueSelector).val();
    var id = $("#hfGlobalCodeID").val();
    if (id == '')
        id = 0;
    var name = $("#txtGlobalCodeName").val();
    var jsonData = JSON.stringify({
        GlobalCodeName: name,
        GlobalCodeId: id,
        GlobalCodeCategoryValue: category
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
            var msg = "Record Already Exists! If not found in Active list, you may have found it in In-Active list";
            if (isExist) {
                ShowMessage(msg, "Alert", "info", true);
            }
            else {
                SaveGeneric();
            }
        },
        error: function (msg) {
        }
    });
}

function SaveGeneric() {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalCodeValue = $(globalCodeValueSelector).val();
    var globalCodeCategory = $(globalCodeCategoryValueSelector).val();
    var globalCodeName = $("#txtGlobalCodeName").val();
    var description = $("#txtDescription").length > 0 ? $("#txtDescription").val() : "";
    var externalValue1 = $("#txtExternalValue1").val();
    var isActive = $("#chkActive").length > 0 ? $("#chkActive")[0].checked : true;
    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: description,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: isActive,
        IsDeleted: false,
        ExternalValue1: externalValue1,
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: SetupUrl + "AddUpdateRecord",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindList("#GlobalCodesList", data);
                $("#chkShowInActive").prop('checked', false);
                ClearGenericForm(globalCodeCategory);
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

function EditRecordInGeneric(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: "/GlobalCode/GetGlobaCodeById",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindGenericDetailsInEditMode(data);
            $('#collapseGlobalCodeAddEdit').addClass('in').attr('style', 'height:auto;');
        },
        error: function (msg) {
        }
    });
}

function DeleteRecordInGeneric() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var categoryId = $(globalCodeCategoryValueSelector).val();
        if (categoryId != '') {
            var url = SetupUrl + "DeleteRecord";
            $.ajax({
                type: "POST",
                url: url,
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                data: JSON.stringify({
                    globalCodeId: $("#hfGlobalConfirmId").val(),
                    category: categoryId
                }),
                success: function (data) {
                    if (data != null) {
                        var globalCodeCategory = $(globalCodeCategoryValueSelector).val();
                        ClearGenericForm(globalCodeCategory);
                        BindList("#GlobalCodesList", data);
                        $("#chkShowInActive").prop('checked', false);

                        ShowMessage("Record deleted successfully", "Deleted!", "info", true);
                    }
                },
                error: function (msg) {
                }
            });
        }
    }
}

function BindGenericDetailsInEditMode(data) {
    $('#collapseGlobalCodeAddEdit').addClass('in');
    $("#hfGlobalCodeID").val(data.Id);
    $(globalCodeCategoryValueSelector).val(data.Category);

    $("#txtGlobalCodeName").val(data.Name);
    $(globalCodeValueSelector).val(data.Value);

    if ($("#txtDescription").length > 0) {
        $("#txtDescription").val(data.Description);
    }
    $("#txtSortOrder").val(data.SortOrder);

    var active = $("#chkActive");
    if (active.length > 0) {
        active.prop("checked", data.IsActive);
    }
    if ($("#hfGlobalCodeID").val() <= 0) {
        $('.btnGlobalCodeSave').val('Save');
    }
    else {
        $('.btnGlobalCodeSave').val('Update');
    }
    $('#collapseDiagnosisAddEdit').addClass('in');

    if ($("#hdWithCategoryDropdown").val() == "True") {
        $("#txtGlobalCodeCategoryName").val(data.CategoryName);
    }
}

function ResetGenericCodeValues(categoryId, chkActive, codeValueSelector) {
    $.ajax({
        type: "POST",
        url: SetupUrl + "SetMaxGlobalCodeValue",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ category: categoryId }),
        success: function (maxValue) {
            ResetControls(chkActive, codeValueSelector, maxValue);
        },
        error: function (msg) {
        }
    });
}

function ShowDeletedRecords() {
    var categoryId = $(globalCodeCategoryValueSelector).val();
    var isActive = $("#chkShowDeleted")[0].checked;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: SetupUrl + "ShowDeletedRecords",
        data: JSON.stringify({ category: categoryId, showDeleted: isActive }),
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindList("#GlobalCodesList", data);
            }
        },
        error: function (msg) {

        }
    });
}

function ShowInActiveRecordsInCodeView(chkSelector) {
    $("#txtGlobalCodeName").val('');
    $("#txtDescription").val('');
    $("#chkActive").prop("checked", false);
    var categoryId = $(globalCodeCategoryValueSelector).val();
    var isActive = $(chkSelector)[0].checked;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: SetupUrl + "ShowInActiveRecords",
        data: JSON.stringify({ category: categoryId, inActiveStatus: isActive }),
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                $('#collapseGlobalCodesList').addClass('in').attr('style', 'height:auto;');
                BindList("#GlobalCodesList", data);
                $("#chkActive").prop('checked', true);

            }
        },
        error: function (msg) {

        }
    });
}

function SortNoteTypeList(event) {
    var categoryId = $(globalCodeCategoryValueSelector).val();
    var url = SetupUrl + "GetGenericTypeData";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?category=" + categoryId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#chkShowInActive").prop("checked", false);

            BindList("#GlobalCodesList", data);
        },
        error: function (msg) {
        }
    });
}