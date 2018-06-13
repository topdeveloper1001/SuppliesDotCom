var globalCodeValueSelector = "#hfGlobalCodeValue";
var globalCodeCategoryValueSelector = "#hdGlobalCodeCategoryValue";

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
            if (isExist) {
                ShowMessage("Record already exists! ", "Alert", "info", true);
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
    var externalValue2 = $("#txtExternalValue2").val();
    var externalValue3 = $("#txtExternalValue3").val();
    var externalValue4 = $("#txtExternalValue4").val();
    var externalValue5 = $("#txtExternalValue5").val();
    //var externalValue6 = $("#chkExternalValue6")[0].checked;
    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: globalCodeName,
        SortOrder: 0,
        Description: description,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: true,
        IsDeleted: false,
        ExternalValue1: externalValue1,
        ExternalValue2: externalValue2,
        ExternalValue3: externalValue3,
        ExternalValue4: externalValue4,
        ExternalValue5: externalValue5,
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateRecordGenericExternal",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindList("#GlobalCodesList", data);
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
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindGenericDetailsInEditMode(data);
        },
        error: function (msg) {
        }
    });
}

function DeleteRecordInGeneric() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var categoryId = $(globalCodeCategoryValueSelector).val();
        if (categoryId != '') {
            var url = '/GlobalCode/DeleteRecordGenericExternal';
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
                        ShowMessage("Record deleted successfully", "Deleted!", "info", true);
                    }
                },
                error: function (msg) {
                }
            });
        }
    }
}

//function DeleteRecordInGeneric(id) {
//    var categoryId = $(globalCodeCategoryValueSelector).val();
//    if (categoryId != '') {
//        if (confirm("Do you want to delete GlobalCode?")) {
//            var url = '/GlobalCode/DeleteRecordGenericExternal';
//            $.ajax({
//                type: "POST",
//                url: url,
//                async: false,
//                contentType: "application/json; charset=utf-8",
//                dataType: "html",
//                data: JSON.stringify({
//                    globalCodeId: id,
//                    category: categoryId
//                }),
//                success: function (data) {
//                    if (data != null) {
//                        var globalCodeCategory = $(globalCodeCategoryValueSelector).val();
//                        ClearGenericForm(globalCodeCategory);
//                        BindList("#GlobalCodesList", data);
//                        ShowMessage("Record deleted successfully", "Deleted!", "info", true);
//                    }
//                },
//                error: function (msg) {
//                }
//            });
//        }
//    }
//}

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

    if ($("#hfGlobalCodeID").val() <= 0) {
        $('.btnGlobalCodeSave').val('Save');
    }
    else {
        $('.btnGlobalCodeSave').val('Update');
    }
    $('#collapseDiagnosisAddEdit').addClass('in');

    if ($("#hdWithExternalValues").val() == "True") {
        $("#txtExternalValue1").val(data.ExternalValue1);
        $("#txtExternalValue2").val(data.ExternalValue2);
        $("#txtExternalValue3").val(data.ExternalValue3);
        $("#txtExternalValue4").val(data.ExternalValue4);
        $("#txtExternalValue5").val(data.ExternalValue5);
        //if (data.ExternalValue6 != '' && data.ExternalValue6 == "True") {
        //    $("#chkExternalValue6").prop("checked", true);
        //}
    }

    if ($("#hdWithCategoryDropdown").val() == "True") {
        $("#txtGlobalCodeCategoryName").val(data.CategoryName);
    }
}

function ResetGenericCodeValues(categoryId, chkActive, codeValueSelector) {
    $.ajax({
        type: "POST",
        url: "/GlobalCode/SetMaxGlobalCodeValue",
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
        url: "/GlobalCode/ShowDeletedRecords",
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

function ShowInActiveRecordsInExternalView(chkSelector) {
    var categoryId = $(globalCodeCategoryValueSelector).val();
    var isActive = $(chkSelector)[0].checked;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/ShowInActiveRecords",
        data: JSON.stringify({ category: categoryId, showInActive: isActive }),
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

//-------------Smart Search of Global Code Categories starts here-------------------

function OnGCodeCategorySelection(e) {
    var dataItem = this.dataItem(e.item.index());
    $("#txtGlobalCodeCategoryName").val(dataItem.Name);
    $('#hdGlobalCodeCategoryValue').val(dataItem.CodeValue);
}

function SelectGCodeCategory(e) {
    var typeId = $("#hdGlobalCodeCategoryParentValue").val();
    if (typeId != '') {
        var value = null;
        if (e.filter.filters != null && e.filter.filters.length > 0) {
            value = e.filter.filters[0].value;
        }
        return {
            typeId: typeId,
            text: value
        };
    }
    return {
        text: ''
    };
}

//-------------Smart Search of Global Code Categories ends here-------------------


function SortDepartmenType(event) {
    var categoryId = $(globalCodeCategoryValueSelector).val();
    var isActive = $("#chkShowInActive")[0].checked;
    if (isActive == true) {
        isActive = false;
    } else {
        isActive = true;
    }
    var url = "/GlobalCode/GetDepartmentTypeList";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?categoryId=" + categoryId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: null,
        url: url,
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


function SortNoteTypeList(event) {
    var categoryId = $(globalCodeCategoryValueSelector).val();
    var url = '/GlobalCode/GetGenericTypeData';
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