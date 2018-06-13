//-----------------Not IN USE-------------------------------

function SaveGlobalCodeCategory(id) {
    return false;
    
}

//$(document).ready(function () {
//    $("#MoveRight,#MoveLeft").click(function (event) {

//        var id = $(event.target).attr("id");
//        var selectFrom = id == "MoveRight" ? "#SelectLeft" : "#SelectRight";
//        var moveTo = id == "MoveRight" ? "#SelectRight" : "#SelectLeft";

//        var selectedItems = $(selectFrom + " :selected").toArray();
//        $(moveTo).append(selectedItems);
//        selectedItems.remove;
//    });
//});

function OnChangeFacility(ddlFacility) {
    var facilityId = $(ddlFacility).val();
    if (facilityId != '' && facilityId != null) {
        $.ajax({
            type: "POST",
            url: '/GlobalCodeCategory/GetGlobalCodeCategories',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {

                if (data) {
                    $('#lstGlobalCodeCategoriesLeft').html('');
                    $('#lstGlobalCodeCategoriesRight').html('');
                    $('#lstGlobalCodeCategoriesLeft').html(data);
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
    //alert(val);
    return false;
}



//Added by Ashwani

//$(document).ready(function () {
//    $("#validate").validationEngine();
//    $(".menu").click(function () {
//        $(".out").toggleClass("in");
//    });
//});

function GetGlobalCodeCategories() {
    var facilityNumber = $(ddlFacility).val();
    var jsonData = JSON.stringify({
        FacilityNumber: facilityNumber
    });
    if (facilityNumber != '' && facilityNumber != null) {
        $.ajax({
            type: "POST",
            url: '/GlobalCodeCategory/GetFacilityGlobalCodeCategories',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data) {
                    //ddlGCC
                    var items = '<option value="0">--Select--</option>';
                    $.each(data, function (i, gcc) {
                        items += "<option value='" + gcc.GlobalCodeCategoryValue + "'>" + gcc.GlobalCodeCategoryName + "</option>";
                    });
                    $('#ddlGCC').html(items);
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
    return false;
}

function CheckDuplicateGlobalCode() {
    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalCodeCategory = $("#ddlGCC").val();
    //var globalCodeCategoryValue=
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (isValid) {
        var globalCodeName = $("#txtGlobalCodeName").val();
        var jsonData = JSON.stringify({
            GlobalCodeName: globalCodeName,
            GlobalCodeId: globalCodeId,
            GlobalCodeCategoryValue: globalCodeCategory
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/GlobalCode/CheckDuplicateGlobalCodeName",
            data: jsonData,
            dataType: "",
            beforeSend: function () { },
            success: function (data) {
                //Append Data to grid
                if (data != 'False') {
                    ShowMessage("GlobalCode already exist!", "Alert", "info", true);
                }
                else {
                    AddGlobalCode();
                    return true;
                }
            },
            error: function (msg) {
            }
        });
        return false;
    }
    else {
        AddGlobalCode();
    }
    return false;
}


function AddGlobalCode() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $("#hfGlobalCodeID").val();

    var globalCodeValue = $("#txtGlobalCodeValue").val();
    var globalCodeName = $("#txtGlobalCodeName").val();
    var faciltyNumber = $("#ddlFacility").val();
    var globalCodeCategory = $("#ddlGCC").val();
    var sortOrder = $("#txtSortOrder").val();
    var description = $("#txtDescription").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId, GlobalCodeName: globalCodeName, SortOrder: sortOrder, Description: description,
        FacilityNumber: faciltyNumber, GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeValue: globalCodeValue,
        IsActive: isActive, CreatedBy: 1, CreatedDate: new Date(), IsDeleted: false
    });
    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateGlobalCode",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                BindGlobalCodeList();
                ClearFields();
                ResetValues("#chkActive", "#txtGlobalCodeValue", globalCodeValue, globalCodeId);
                $('#collapseGlobalCodesList').addClass('in');
                msg = "Record Saved successfully !";
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


function BindGlobalCodeList() {
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobalCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {
            $('#GlobalCodeList').empty();
            $('#GlobalCodeList').html(data);
            $('#collapseGlobalCodesList').addClass('in');
        },
        error: function (msg) {
            alert('i am here');

        }
    });
}

function BindOrderTypeCategories() {
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobalCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        //data: jsonData,
        success: function (data) {

        },
        error: function (msg) {
            alert('i am here');

        }
    });
}

function ClearFields() {
    $('#GlobalCodeInfo').clearForm();
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $.ajax({
        type: "POST",
        url: "/GlobalCode/ResetGlobalCodeForm",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#GlobalCodeInfo").empty();
            $("#GlobalCodeInfo").html(data);
            $('#collapseGlobalCodesList').addClass('in');
        },
        error: function (msg) {
        }
    });
}
//-----------------Not IN USE-------------------------------



//--------------Changes by Amit Jain as on 09122014---------------------
$(function () {
    $("#globalCodeForm").validationEngine();
    BindCategories();
});

function OnChangeGlobalCodeCategory(ddlSelector) {
    var selectedValue = $(ddlSelector).val();
    if (selectedValue > 0) {
        $.ajax({
            type: "POST",
            url: '/GlobalCode/GetMaxSortOrderAndGlobalCodeValueByCategoryValue',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ categoryValue: selectedValue }),
            success: function (data) {
                $("#txtSortOrder").val(data.sortOrder);
                $("#txtGlobalCodeValue").val(data.GlobalCodeValue);
                $("#hdGlobalCodeCategoryValue").val(selectedValue);
                BindGlobalCodesList();
            },
            error: function (msg) {
            }
        });
    }
}

function BindCategories() {
    $.ajax({
        type: "POST",
        url: '/GlobalCode/BindGlobalCodeCategories',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlGlobalCodeCategories", "#hdGlobalCodeCategoryValue");
        },
        error: function (msg) {
        }
    });
}

function ClearAllGlobalCodes() {
    $("#hdGlobalCodeCategoryValue").val($("#ddlGlobalCodeCategories").val());
    $("#hfGlobalCodeID").val();
    $('#globalCodeForm').clearForm();
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseGlobalCodeAddEdit').removeClass('in');
    $('#collapseGlobalCodesList').addClass('in');
    //BindCategories();
    //ResetAllDropdowns("#globalCodeForm");
    //BindGlobalCodesList();
    $('.btnGlobalCodeSave').val('Save');
}

function CheckIfGlobalCodeNameAlreadyExist() {
    var id = $("#hfGlobalCodeID").val();
    var name = $("#txtGlobalCodeName").val();
    var jsonData = JSON.stringify({
        GlobalCodeName: name,
        GlobalCodeId: id,
        GlobalCodeCategoryValue: $("#ddlGlobalCodeCategories").val()
    });

    $.ajax({
        type: "POST",
        url: "/GlobalCode/CheckDuplicateSubCategory",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            //If Already exist, it will return true otherwise false
            if (data) {
                ShowMessage("Record already exists! ", "Alert", "info", true);
            }
            else {
                SaveGlobalCode();
                return true;
            }
        },
        error: function (msg) {
        }
    });
}

function BindGlobalCodesList() {
    var categoryValue = $("#hdGlobalCodeCategoryValue").val();
    if (categoryValue <= 0)
        categoryValue = "";

    $.ajax({
        type: "POST",
        url: '/GlobalCode/BindGlobalCodesList',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: JSON.stringify({ categoryValue: categoryValue }),
        success: function (data) {
            BindList("#GlobalCodesList", data);
            SetGridPaging("?", "?categoryValue=" + categoryValue + "&");
        },
        error: function (msg) {
        }
    });

}

function SaveGlobalCode() {
    var isValid = jQuery("#globalCodeForm").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }

    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalCodeCategory = $("#ddlGlobalCodeCategories").val();
    var globalCodeName = $("#txtGlobalCodeName").val();
    var globalCodeValue = $("#txtGlobalCodeValue").val();
    var description = $("#txtDescription").val();
    //var faciltyNumber = $("#ddlFacility").val();
    var sortOrder = $("#txtSortOrder").val();
    var isActive;
    if ($('#chkActive').is(':checked'))
        isActive = true;
    else
        isActive = false;

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: globalCodeName,
        SortOrder: sortOrder,
        Description: description,
        FacilityNumber: 0,
        GlobalCodeValue: globalCodeValue,
        IsActive: isActive,
        IsDeleted: false
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/GlobalCode/AddUpdateGlobalCode",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //Append Data to grid
            if (data != null) {
                ClearAllGlobalCodes();
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

function EditGlobalCode(id) {
    var jsonData = JSON.stringify({ id: id });
    $.ajax({
        type: "POST",
        url: '/GlobalCode/GetGlobaCodeById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindGlobalCodeDetailsInEditMode(data);
        },
        error: function (msg) {
        }
    });
}

function DeleteGlobalCode() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = '/GlobalCode/DeleteGlobalCode';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                globalCodeId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data > 0) {
                    ShowMessage("GlobalCode deleted successfully", "Deleted!", "info", true);
                    ClearAllGlobalCodes();
                }
            },
            error: function (msg) {
            }
        });
    }
}

//function DeleteGlobalCode(id) {
//    if (confirm("Do you want to delete GlobalCode?")) {
//        var url = '/GlobalCode/DeleteGlobalCode';
//        $.ajax({
//            type: "POST",
//            url: url,
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            data: JSON.stringify({
//                globalCodeId: id
//            }),
//            success: function (data) {
//                if (data > 0) {
//                    ShowMessage("GlobalCode deleted successfully", "Deleted!", "info", true);
//                    ClearAllGlobalCodes();
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

function BindGlobalCodeDetailsInEditMode(data) {
    $('#collapseGlobalCodeAddEdit').addClass('in');
    $("#hfGlobalCodeID").val(data.Id);
    $("#hdGlobalCodeCategoryValue").val(data.Category);
    $("#ddlGlobalCodeCategories").val(data.Category);
    $("#txtGlobalCodeName").val(data.Name);
    $("#txtGlobalCodeValue").val(data.Value);
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

//--------------Changes by Amit Jain as on 09122014---------------------
