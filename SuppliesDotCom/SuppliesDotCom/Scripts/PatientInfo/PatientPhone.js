$(function () {
    ajaxStartActive = false;
    BindGlobalCodesWithValue("#ddlPhoneType", 1102, "");
    BindCountryDataWithCountryCode("#ddlPhoneNo", "#txtPhoneNo", '#lblPhoneNo');
    $("#divPatientPhone").validationEngine();
    $(".PhoneMask").mask("999-9999999");
});

function SavePatientPhone() {
    var isValid = jQuery("#divPhoneAddEdit").validationEngine({ returnIsValid: true });
    if (isValid) {
        var ddlPhoneType = $("#ddlPhoneType").val();
        var patientId = $("#PatientId").val();
        var isPrimary = $('#chkActive').prop('checked');
        var isdontContact = $('#chkDoNotDistrub').prop('checked');

        var phoneNo = $("#txtPhoneNo").val();
        if (phoneNo != '') {
            var lblPhoneNo = $('#lblPhoneNo').text();
            phoneNo = lblPhoneNo + "-" + phoneNo;
        }

        var jsonData = {
            PatientPhoneId: $("#PatientPhoneId").val(),
            PatientID: patientId,
            PhoneNo: phoneNo,
            PhoneType: ddlPhoneType,
            IsPrimary: isPrimary,
            IsdontContact: isdontContact,
            IsDeleted: false
        };

        $.post("/PatientInfo/SavePatientPhone", jsonData, function (data) {
            if (data != null) {
                var newId = data.result;
                if (newId > 0) {
                    var list = data.pView;
                    var id = $("#PatientPhoneId").val();
                    BindList("#divPhoneGrid", data.pView);
                    if (ddlPhoneType == 2) {
                        $('#txtContactNumber').val(phoneNo);
                        FormatMaskedPhone('#lblPersonContactNumber', "#ddlPersonContactNumber", "#txtContactNumber");
                    }
                    ClearPhoneTabAll();
                    var msg = "Records Saved successfully !";
                    if (id > 0)
                        msg = "Records updated successfully";

                    ShowMessage(msg, "Success", "success", true);
                }
                else {
                    ShowWarningMessage("It seems we have already a Primary Phone Number with this patient!!");
                }
            } else {
                ShowErrorMessage('Unable to save record.', true);
            }
        });
    }
    return false;
}

function EditPatientPhone(id) {
    $.post("/PatientInfo/GetPatientPhoneById", { patientphoneId: id }, function (data) {
        if (data != null) {
            $("#PatientPhoneId").val(data.PatientPhoneId);
            $("#ddlPhoneType").val(data.PhoneType);
            $("#txtPhoneNo").val(data.PhoneNo);
            FormatMaskedPhone('#lblPhoneNo', "#ddlPhoneNo", "#txtPhoneNo");
            $(".PhoneMask").mask("999-9999999");
            if (data.IsPrimary != null && data.IsPrimary == true) {
                $("#chkActive").prop("checked", "checked");
            }
            else
                $("#chkActive").prop("checked", false);

            if (data.IsdontContact != null && data.IsdontContact == true) {
                $("#chkDoNotDistrub").prop("checked", "checked");
            }
            else
                $("#chkDoNotDistrub").prop("checked", false);
            $("#btnPatientPhoneSave").val("Update");
            $("#PhonelistTab").focus();
        }
    });
}

function DeletePatientPhone() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.post("/PatientInfo/DeletePatientPhone", { id: $("#hfGlobalConfirmId").val() }, function (data) {
            if (data != null) {
                BindList("#divPhoneGrid", data);
                ShowMessage('Record Deleted Successfully.', "Warning", "info", true);
            } else {
                ShowErrorMessage('Unable to delete record.', true);
            }
        });
    }
}

//function DeletePatientPhone(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        $.post("/PatientInfo/DeletePatientPhone", { id: id }, function (data) {
//            if (data != null) {
//                BindList("#divPhoneGrid", data);
//                ShowMessage('Record Deleted Successfully.', "Success", "info", true);
//            } else {
//                ShowErrorMessage('Unable to delete record.', true);
//            }
//        });
//    }
//}

function ClearPhoneTabAll() {
    $("#divPhoneAddEdit").clearForm();
    $.validationEngine.closePrompt(".formError", true);
    $("#ddlPhoneNo").val('971');
    $("#lblPhoneNo").val('+971');
    $("#btnPatientPhoneSave").val("Save");
    $("#PatientPhoneId").val('');
}

///*--------------Sort Phone Grid--------By krishna on 18082015---------*/
//function BindPatientPhonesBySort(event) {
//    var url = "/PatientInfo/GetPatientPhonesPartialView";
//    var patientId = $("#PatientId").val();
//    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
//        url += "?patientId=" + patientId + "&" + event.data.msg;
//    }
//    $.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: url,
//        dataType: "html",
//        async: true,
//        data: null,
//        success: function (data) {
//            $("#divPhoneGrid").empty();
//            $("#divPhoneGrid").html(data);
//        },
//        error: function (msg) {

//        }
//    });
//    return false;
//}

function GetPatientPhonesBySort(event) {

    var url = "/PatientInfo/GetPatientPhonesBySort";
    var patientId = $("#PatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + patientId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {

            $("#divPhoneGrid").empty();
            $("#divPhoneGrid").html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}