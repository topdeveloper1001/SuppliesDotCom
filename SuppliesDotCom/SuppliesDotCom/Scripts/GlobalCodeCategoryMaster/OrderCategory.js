var controllerUrl = "/GlobalCodeCategoryMaster/";

$(document).ready(function () {
    BindOperationTypes();
    $("#validate").validationEngine();
    $(".menu").click(function () {
        $(".out").toggleClass("in");
    });

    $("#btnSave").click(AddGlobalCodeCategory);
    $("#btnCancel").click(ResetOrderCategoryForm);

    BindOrderTypeCategories();
});

function AddGlobalCodeCategory() {
    var isValid = jQuery("#validate").validationEngine({ returnIsValid: true });
    if (!isValid) return false;

    var id = $("#hfGlobalCodeCategoryID").val();
    var globalCodeCategoryValue = $("#GlobalCodeCategoryValue").val();
    var globalCodeCategoryName = $("#GlobalCodeCategoryName").val().trim();
    var glNumber = $("#txtRevenueGeneralLedgerNumber").val().trim();
    var arMasterAccount = $("#txtARMasterAccount").val();
    var operationType = $("#ddlOperationTypes").val();
    var dOperationType = "";

    if (operationType != null && operationType != "") {
        $.each(operationType, function (i, obj) {
            if (i == 0)
                dOperationType = obj;
            else
                dOperationType += "," + obj;
        });
    }

    var jsonData = JSON.stringify({
        globalCodeCategoryId: id,
        GlobalCodeCategoryName: globalCodeCategoryName,
        GlobalCodeCategoryValue: globalCodeCategoryValue,
        FacilityNumber: 0,
        GroupCode: 'CPT',
        globalCodeCategory: globalCodeCategoryValue,
        IsActive: $('#chkActive').is(':checked'),
        IsDeleted: false,
        ExternalValue1: glNumber,
        ExternalValue2: arMasterAccount,
        ExternalValue3: 'OrderCategory',
        ExternalValue4: dOperationType
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: controllerUrl + "AddUpdateGlobalCodeCategory",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            var msg = "";
            if (data != null && data > 0) {
                BindOrderTypeCategories();
                ResetOrderCategoryForm();
                $('#collapseTwo').addClass('in');
                msg = "Record Saved successfully !";
                if (id > 0)
                    msg = "Record updated successfully";
                $('#GlobalCodeCategoryValue').attr("readonly", false);

                ShowMessage(msg, "Success", "success", true);
            }
            else {
                if (data == -1)
                    ShowErrorMessage("OrderType Category Name or Code already exists there under this Facility. Change the Category Name or Code, and try saving again!"
                        , true);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    });
    return false;
}


function EditGlobalCodeCategory(GlobalCodeCategoryID) {
    var jsonData = JSON.stringify({ GlobalCodeCategoryId: GlobalCodeCategoryID });

    $.ajax({
        type: "POST",
        url: controllerUrl + 'EditGlobalCategoryCodeOrderType',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != null && data.m != null) {
                var obj = data.m;
                $('#collapseOne').addClass('in');
                $('#hfGlobalCodeCategoryID').val(obj.GlobalCodeCategoryID);
                $('#GlobalCodeCategoryValue').val(obj.GlobalCodeCategoryValue);
                $('#GlobalCodeCategoryValue').attr("readonly", true);
                $('#GlobalCodeCategoryName').val(obj.GlobalCodeCategoryName);
                $('#txtRevenueGeneralLedgerNumber').val(obj.ExternalValue1);
                $('#txtARMasterAccount').val(obj.ExternalValue2);
                $('#txtARMasterAccount').val(obj.ExternalValue2);
                $('#chkActive').val(obj.IsActive);
                $('#btnSave').text(data.SaveText);

                if (obj.ExternalValue4 != null && obj.ExternalValue4 != "") {
                    var res = obj.ExternalValue4.split(",");
                    $('.selectpicker').selectpicker('val', res);
                    $('.selectpicker').selectpicker('refresh');
                }
            } else ShowMessage("Error", "Success", "success", true);
        },
        error: function (msg) {
            ShowMessage(msg, "Success", "success", true);

        }
    });
}

function DeleteGlobalCodeCategory() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var url = controllerUrl + 'DeleteGlobalCodeCategoryOrderType';
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                globalCodeCategoryId: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data != null) {
                    ResetOrderCategoryForm();
                    BindOrderTypeCategories();
                    $('#collapseTwo').addClass('in');
                    ShowMessage("Category deleted successfully", "Success", "success", true);
                }
                else {
                    ShowErrorMessage("Error while deleting the Records! Try again in a while", true);
                }
            },
            error: function (msg) {
            }
        });
    }
}

function ResetOrderCategoryForm() {
    $('#GlobalCodeCategoryInfo').clearForm(true);
    $.validationEngine.closePrompt(".formError", true);
    $("#chkActive").prop('checked', true);
    $('#collapseOne').removeClass('in');
    $('#GlobalCodeCategoryValue').removeAttr("readonly");
    $('#btnSave').text("Save");
    $("#ddlOperationTypes").selectpicker('val', '');
}

//function SortOrderTypeCategoriesList(event) {
//    var url = controllerUrl + "GetGlobalCodeCategoryListOrderType";
//    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
//        url += "?" + "&" + event.data.msg;
//    }
//    $.ajax({
//        type: "POST",
//        url: url,
//        contentType: "application/json; charset=utf-8",
//        dataType: "html",
//        data: null,
//        success: function (data) {
//            $('#GlobalCodeCategoryList').empty();
//            $('#GlobalCodeCategoryList').html(data);
//            $('#collapseTwo').addClass('in');
//        },
//        error: function (msg) {
//        }
//    });

//    return false;
//}


function BindOperationTypes() {
    var url = controllerUrl + 'GetGlobalCodeCatByExternalValue';

    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {},
        success: function (data) {
            var ddlSelector = "#ddlOperationTypes";
            $(ddlSelector).empty();

            var items = "";//"<option data-hidden=\"true\" value='0'></option>";//"<option data-hidden=\"true\" value='0'>--Select--</option>";
            $.each(data, function (i, obj) {
                var newItem = "<option id='" + obj.GlobalCodeCategoryValue + "'  value='" + obj.GlobalCodeCategoryValue + "'>" + obj.GlobalCodeCategoryName + "</option>";
                items += newItem;
            });

            $(ddlSelector).html(items);
            $(ddlSelector).selectpicker('val', ''); 
        },
        error: function (msg) {
        }
    });

}


function BindOrderTypeCategories() {
    $.ajax({
        type: "POST",
        url: controllerUrl + "BindOrderTypeCategories",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $("#dtOrderTypeCategories").dataTable({
                destroy: true,
                aaData: data,
                scrollY: "400px",
                scrollCollapse: true,
                bProcessing: true,
                paging: false,
                "columnDefs": [
                    {
                        "targets": 0
                    },
                    {
                        "targets": 6, "render": function (data, type, full, meta) {
                            return '<a style="float:left; margin-right: 7px; width:15px;" href="javascript:void(0);" title="Edit Category" onclick="EditGlobalCodeCategory(' + full[0] + ');"><img src="/images/edit.png"></a>' +
                                '<a href="javascript:void(0);" title="Delete Facility" onclick="return OpenConfirmPopup(' + full[0] + ',\'Delete Category\',\'\',DeleteGlobalCodeCategory,null);" style="float: left; width: 15px;">' +
                                '<img src="/images/delete.png" /></a>';
                        }
                    }
                ]
            });
        },
        error: function (msg) {

            console.log(msg.responseText);
        }
    });
}