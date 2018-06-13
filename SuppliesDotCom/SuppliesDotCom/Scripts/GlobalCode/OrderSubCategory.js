var blockNumber = 2;
var noMoreData = false;
var inProgress = false;
var pageUrl = "/GlobalCode/";

$(function () {
    $("#SubCategoryDiv").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });

    BindGlobalCodesWithValue("#ddlCodeType", 5101, '');
    BindOrderTypeCategories("#ddlOrderTypeCategories", "#hdOrderTypeCategoryId");
});


function ShowInActiveOrderTypeSubCategory(chkSelector) {
    $("#chkActive").prop("checked", false);
    //var categoryId = $("#hfGlobalCodeID").val();

    var active = $(chkSelector)[0].checked;
    var isActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: pageUrl + "ShowSubCategoriesByStatus",
        data: JSON.stringify({ gcc: $("#ddlOrderTypeCategorySearch").val() > 0 ? $("#ddlOrderTypeCategorySearch").val() : "", blockNumber: blockNumber, showInActive: isActive }),
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#OrderTypeSubCategoryGrid").empty();
                $("#OrderTypeSubCategoryGrid").html(data);
            }
        },
        error: function (msg) {

        }
    });
}

function BindOrderTypeSubCategoriesList() {
    var active = $("#chkShowInActive").is(':checked');
    var showInActive = active == true ? false : true;
    $.ajax({
        type: "POST",
        url: pageUrl + 'GetOrderTypeSubCategoriesList',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: JSON.stringify({ gcc: $("#ddlOrderTypeCategorySearch").val() > 0 ? $("#ddlOrderTypeCategorySearch").val() : "", blockNumber: blockNumber, showInActive: showInActive }),
        success: function (data) {
            $("#OrderTypeSubCategoryGrid").empty();
            $("#OrderTypeSubCategoryGrid").html(data);
        },
        error: function (msg) {
        }
    });

    return false;
}

function CheckDuplicateRecord() {
    var name = $("#txtOrderTypeSubCategoryName").val().trim();
    var globalCodeId = $("#hfGlobalCodeID").val().trim();
    var globalCodeCategory = $("#ddlOrderTypeCategories").val();

    var isValid = jQuery("#SubCategoryDiv").validationEngine({ returnIsValid: true });
    if (isValid) {
        var globalCodeName = $("#txtOrderTypeSubCategoryName").val().trim();
        var jsonData = JSON.stringify({
            GlobalCodeName: name,
            GlobalCodeId: globalCodeId,
            GlobalCodeCategoryValue: globalCodeCategory
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: pageUrl + "CheckDuplicateSubCategory",
            data: jsonData,
            dataType: "",
            beforeSend: function () { },
            success: function (data) {
                //Append Data to grid
                if (data) {
                    ShowMessage("Order sub category already exist!", "Warning", "warning", true);
                }
                else {
                    AddOrderSubCategory();
                    return true;
                }
            },
            error: function (msg) {
            }
        });
        return false;
    }
    else {
        AddOrderSubCategory();
    }
    return false;
}

function AddOrderSubCategory() {
    var isValid = jQuery("#SubCategoryDiv").validationEngine({ returnIsValid: true });
    if (!isValid) {
        return false;
    }
    var globalCodeId = $("#hfGlobalCodeID").val();
    var globalCodeCategory = $("#ddlOrderTypeCategories").val();
    var name = $("#txtOrderTypeSubCategoryName").val().trim();
    var codeType = $("#ddlCodeType").val().trim();
    var rangeFrom = $("#txtRangeFrom").val().trim();
    var rangeTo = $("#txtRangeTo").val().trim();
    var isActive = false;

    if ($('#chkActive').is(':checked'))
        isActive = true;

    var jsonData = JSON.stringify({
        GlobalCodeID: globalCodeId,
        GlobalCodeCategoryValue: globalCodeCategory,
        //GlobalCodeCategoryValue: globalCodeCategory,
        GlobalCodeName: name,
        ExternalValue1: codeType,
        ExternalValue2: rangeFrom,
        ExternalValue3: rangeTo,
        Description: name,
        FacilityNumber: $("#hfFacilityId").val(),
        GlobalCodeValue: 0,     //to be changed later
        IsActive: isActive,
        IsDeleted: false
    });
    if (ajaxStartActive) {
        ajaxStartActive = false;
    }
    $('#loader_event').show();
    var msg = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: pageUrl + "AddOrderTypeCategory",
        data: jsonData,
        dataType: "json",
        beforeSend: function () { },
        success: function (data) {
            $('#loader_event').hide();

            //Append Data to grid
            if (data != null) {
                BindOrderTypeSubCategoriesList();
                ClearFields();
                //BindOrderTypeSubCategories(data);
                msg = "Record Saved successfully !";
                if (globalCodeId > 0)
                    msg = "Record updated successfully";
                $("#hfGlobalCodeID").val('0');
                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {

        }
    });
    return false;
}

function EditRecord(globalCodeId) {
    if (globalCodeId > 0) {
        var jsonData = JSON.stringify({ id: globalCodeId });
        $.ajax({
            type: "POST",
            url: pageUrl + 'GetOrderSubCategoryDetail',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data != null) {
                    BindOrderTypeSubCategories(data);
                }
            },
            error: function (msg) {
            }
        });
    }
}

function DeleteRecord() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = pageUrl + 'DeleteOrderSubCategory';
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
                    ShowMessage("Record deleted successfully", "Alert", "info", true);
                    ClearFields();
                    BindOrderTypeSubCategoriesList();
                    //$('#GlobalCodeList').empty();
                    //$('#GlobalCodeList').html(data);
                    //$('#collapseTwo').addClass('in');
                }
                else {
                }
            },
            error: function (msg) {
            }
        });
    }
}

//Bind Dropdown Data of Order Type Categories
function BindOrderTypeCategories(ddlSelector, hdSelector) {
    var jsonData = JSON.stringify({
        startRange: "11000",
        endRange: "11999"
    });
    $.ajax({
        type: "POST",
        url: pageUrl + "GetOrderSubCategoriesByExternalValue",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(ddlSelector).empty();
            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, gcc) {
                items += "<option value='" + gcc.GlobalCodeCategoryValue + "'>" + gcc.GlobalCodeCategoryName + "</option>";
            });

            $(ddlSelector).html(items);

            var hdValue = $(hdSelector).val();
            if (hdValue != null && hdValue != '') {
                $(ddlSelector).val(hdValue);
            }
            var ddlSelector1 = "#ddlOrderTypeCategorySearch";
            $(ddlSelector1).empty();
            $(ddlSelector1).html(items);
        },
        error: function (msg) {
        }
    });
}

function ClearFields() {
    $("#SubCategoryDiv").clearForm(true);
    $("#ddlCodeType")[0].selectedIndex = 0;
    $("#hfGlobalCodeID").val(0);
    $('#collapseOne').removeClass('in');
    $('#collapseOne').addClass('in');
    $.validationEngine.closePrompt(".formError", true);
    $("#chkActive").prop('checked', true);
}

function BindOrderTypeSubCategories(data) {
    $("#hfGlobalCodeID").val(data.GlobalCodeID);
    $("#txtOrderTypeSubCategoryName").val(data.GlobalCodeName);
    $("#ddlCodeType").val(data.ExternalValue1);
    $("#txtRangeFrom").val(data.ExternalValue2);
    $("#txtRangeTo").val(data.ExternalValue3);
    $("#ddlOrderTypeCategories").val(data.GlobalCodeCategoryValue);
    $("#hfGlobalCodeValue").val(data.GlobalCodeValue);
    $("#chkActive").prop('checked', data.IsActive);
    //$("#ddlCodeType")[0].selectedIndex = 1;
    $.validationEngine.closePrompt(".formError", true);
    $('#collapseOne').removeClass('in');
    $('#collapseOne').addClass('in');

}

function SearchRecords() {
    var showInActive = $("#chkShowInActive").is(':checked');
    if (showInActive) {
        showInActive = false;
    } else {
        showInActive = true;
    }
    var jsonData = JSON.stringify({
        gcc: $("#ddlOrderTypeCategorySearch").val() > 0 ? $("#ddlOrderTypeCategorySearch").val() : "",
        blockNumber: blockNumber,
        showInActive: showInActive
    });
    $.ajax({
        type: "POST",
        url: pageUrl + 'GetOrderTypeSubCategoriesList',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            $("#OrderTypeSubCategoryGrid").empty();
            $("#OrderTypeSubCategoryGrid").html(data);
        },
        error: function (msg) {
        }
    });
}

function SortOrderTypeSubCategoriesList(event) {

    var showInActive = $("#chkShowInActive").is(':checked');
    if (showInActive) {
        showInActive = false;
    } else {
        showInActive = true;
    }

    var url = pageUrl + "GetOrderTypeSubCategoriesList";
    var gcc = $("#ddlOrderTypeCategorySearch").val() > 0 ? $("#ddlOrderTypeCategorySearch").val() : "";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?gcc=" + gcc + "&blockNumber=" + blockNumber + '&showInActive=' + showInActive + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#OrderTypeSubCategoryGrid").empty();
            $("#OrderTypeSubCategoryGrid").html(data);
        },
        error: function (msg) {
        }
    });

    return false;
}

