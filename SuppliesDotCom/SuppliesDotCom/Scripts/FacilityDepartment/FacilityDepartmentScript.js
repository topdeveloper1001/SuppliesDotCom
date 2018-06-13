$(function () {
    $("#FacilityDepartmentFormDiv").validationEngine();
    BindGlobalCodesWithValue("#ddlActivityType", 1201, "#hdActivityid");
    BindAccountsDropdown();
    $('#chkStatus').prop('checked', 'checked');
    $("#ddlActivityType").change(function () {
        if ($(this).val() != '0') {
            $('#txtActivityName').val($("#ddlActivityType :selected").text());
        } else {
            $('#txtActivityName').val('');
        }
    });
});

function SaveFacilityDepartment() {
    var isValid = jQuery("#FacilityDepartmentFormDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var id = $('#hdid').val();
        var txtActivityId = $("#ddlActivityType").val();
        var txtActivityName = $("#txtActivityName").val();
        var txtCreditAccount = $("#ddlCreditAccount").val();
        var txtDebitAccount = $("#ddlDebitAccount").val();
        var txtContraRevenueAccount = $("#txtContraRevenueAccount").val();
        var txtWriteOffAccount = $("#txtWriteOffAccount").val();
        var txtIsActive = $("#chkStatus").prop('checked');
        var ddlCreditAccountName = $("#ddlCreditAccount :selected").text();
        var ddlDebitAccountName = $("#ddlDebitAccount :selected").text();
        var externalValue3 = $("#ExternalValue3").val();
        var jsonData = JSON.stringify({
            Id: id,
            ActivityId: txtActivityId,
            ActivityName: txtActivityName,
            CreditAccount: txtCreditAccount,
            DebitAccount: txtDebitAccount,
            ContraRevenueAccount: txtContraRevenueAccount,
            WriteOffAccount: txtWriteOffAccount,
            IsActive: txtIsActive,
            ExternalValue1: ddlCreditAccountName,
            ExternalValue2: ddlDebitAccountName,
            ExternalValue3: externalValue3
        });
        $.ajax({
            type: "POST",
            url: '/FacilityDepartment/SaveFacilityDepartment',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                //BindList("#FacilityDepartmentListDiv", data);
                ClearFacilityDepartmentForm();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                BindFacilityDepartmentData();
                ShowMessage(msg, "Success", "success", true);
            },
            error: function (msg) {

            }
        });
    }
}

function EditFacilityDepartment(id) {
    var jsonData = JSON.stringify({
        Id: id
    });
    $.ajax({
        type: "POST",
        url: '/FacilityDepartment/GetFacilityDepartmentDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindFacilityDepartmentDetails(data);
            $('#collapseFacilityDepartmentAddEdit').addClass('in').attr('style', 'height:auto;');
        },
        error: function (msg) {

        }
    });
}



function DeleteFacilityDepartment() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        var jsonData = JSON.stringify({
            id: $("#hfGlobalConfirmId").val()
        });
        $.ajax({
            type: "POST",
            url: '/FacilityDepartment/DeleteFacilityDepartment',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                //BindList("#FacilityDepartmentListDiv", data);
                //GetFacilityDepartments();
                BindFacilityDepartmentData();
                ShowMessage("Records Deleted Successfully", "Success", "success", true);
            },
            error: function (msg) {
                return true;
            }
        });
    }
    }

//function DeleteFacilityDepartment(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        var jsonData = JSON.stringify({
//            id: id
//        });
//        $.ajax({
//            type: "POST",
//            url: '/FacilityDepartment/DeleteFacilityDepartment',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                BindList("#FacilityDepartmentListDiv", data);
//                GetFacilityDepartments();
//                ShowMessage("Records Deleted Successfully", "Success", "success", true);
//            },
//            error: function (msg) {
//                return true;
//            }
//        });
//    }
//}

function ClearFacilityDepartmentForm() {
    $("#FacilityDepartmentFormDiv").clearForm(true);
    $('#collapseFacilityDepartmentAddEdit').removeClass('in');
    $('#collapseFacilityDepartmentList').addClass('in');
    $("#FacilityDepartmentFormDiv").validationEngine();
    $('#chkStatus').prop('checked', 'checked');
    $("#btnSave").val("Save");
    $.validationEngine.closePrompt(".formError", true);
}

function BindFacilityDepartmentDetails(data) {
    $("#btnSave").val("Update");
    $('#collapseFacilityDepartmentList').removeClass('in');
    $('#collapseFacilityDepartmentAddEdit').addClass('in');
    $("#FacilityDepartmentFormDiv").validationEngine();
    var formPrefix = "#";
    //IdSelector.val(data.Id);
    $(formPrefix + 'hdid').val(data.Id);
    $(formPrefix + 'hdActivityid').val(data.ActivityId);
    $(formPrefix + 'ddlActivityType').val(data.ActivityId);
    $(formPrefix + 'txtActivityName').val(data.ActivityName);
    $(formPrefix + 'ddlCreditAccount').val(data.CreditAccount);
    $(formPrefix + 'ddlDebitAccount').val(data.DebitAccount);
    $(formPrefix + 'txtContraRevenueAccount').val(data.ContraRevenueAccount);
    $(formPrefix + 'txtWriteOffAccount').val(data.WriteOffAccount);
    $(formPrefix + 'ExternalValue3').val(data.ExternalValue3);
    $(formPrefix + 'chkStatus').prop('checked', data.IsActive);
    $(formPrefix + 'btnSave').text("Update");
}

/// <var>Get The facility departments</var>
//var GetFacilityDepartments = function () {
//    $.post("/FacilityDepartment/GetFacilityDepartments", null, function (data) {
//        BindList("#FacilityDepartmentListDiv", data);
       
//    });
//};


function BindFacilityDepartmentData() {
    var active = $("#chkShowInActive").is(':checked');
    var activeData = active == true ? false : true;
    var showInactive = activeData;
   $.ajax({
        type: "POST",
        url: '/FacilityDepartment/GetFacilityDepartments',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: JSON.stringify({
            showInactive: showInactive,
        }),
        success: function (data) {
            ClearFacilityDepartmentForm();
            $('#collapseFacilityDepartmentList').addClass('in').attr('style', 'height:auto;');
            BindList("#FacilityDepartmentListDiv", data);

          
        },
        error: function (msg) {

        }
    });
}


/// <var>bind the accounts dropdown</var>
var BindAccountsDropdown = function () {
    $.post("/FacilityDepartment/BindAccountDropdowns", null, function (data) {
        BindDropdownData(data.reveuneAccount, "#ddlCreditAccount", "#hdCreditAccount");
        BindDropdownData(data.generalLederAccount, "#ddlDebitAccount", "#hdDebitAccount");
    });
};

function SortFacilityDepartmentGrid(event) {
    var active = $("#chkShowInActive").is(':checked');
    var activeData = active == true ? false : true;
    var showInactive = activeData;
    var url = "/FacilityDepartment/GetFacilityDepartments";
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: JSON.stringify({
            showInactive: showInactive,
        }),
        success: function (data) {
            $("#FacilityDepartmentListDiv").empty();
            $("#FacilityDepartmentListDiv").html(data);
        },
        error: function () {
        }
    });
}


function ShowInActiveRecords() {
    var active = $("#chkShowInActive").is(':checked');
    var activeData = active == true ? false : true;
    var showInactive = activeData;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/FacilityDepartment/GetFacilityDepartments",
        data: JSON.stringify({
            showInactive: showInactive,
            }),
        dataType: "html",
        success: function (data) {

            if (data != null) {
                $('#collapseFacilityDepartmentList').addClass('in').attr('style', 'height:auto;');
                BindList("#FacilityDepartmentListDiv", data);
            }
        },
        error: function (msg) {

        }
    });
}
