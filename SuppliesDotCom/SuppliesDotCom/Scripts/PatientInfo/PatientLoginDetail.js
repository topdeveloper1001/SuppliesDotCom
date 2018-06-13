var codeStatus = 0;

$(function () {
    $("#PatientLoginDetailForm").validationEngine();
    $("#btnLoginDetailSave").click(function () {
        SavePatientLoginDetails(true);
        return false;
    });

    $("#btnLoginDetailSaveDetails").click(function () {
        VerifyAndSavePatientLoginDetails(true);
        return false;
    });

    $("#btnLoginDetailCancel").click(function () {
        $("#Email").val('');
        return false;
    });

    $("#btnLoginDetailCancelDetails").click(function () {
        $("#Password").val('');
        $("#ConfirmPassword").val('');
        return false;

        $('#btnLoginDetailCancel').click(function () {
            $('#PatientLoginDetailForm .emptyTxt').val('');
        });
    });

    if ($("#txtCodeValue").length > 0) {
        $("#txtCodeValue").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        $("#divMessage").hide();
    }
});

function SavePatientLoginDetails(showMessage) {
    var isValid = $("#PatientLoginDetailForm").validationEngine({ returnIsValid: true });
    if (isValid) {
        var jsonData = {
            Id: $("#Id").val(),
            PatientId: $("#hdPatientId").val(),
            Email: $("#Email").val(),
            PatientPortalAccess: $("#PatientPortalAccess")[0].checked,
            IsDeleted: false,
            DeleteVerificationToken: false,
            ExternalValue1: $("#ExternalValue1").val(),
            CodeValue: $("#CodeValue").val(),
            TokenId: $("#TokenId").val(),
        };
        $.post("/PatientInfo/SavePatientLoginDetails", jsonData, function (data) {
            var message = data.message != '' ? data.message : "Security Settings Saved Successfully";
            $("#ExternalValue1").val(data.ExternalValue1);
            $("#Id").val(data.updatedId);
            if (showMessage && data.updatedId > 0)
                ShowMessage(message, "Success", "success", true);
            else
                ShowErrorMessage(message, true);
        });
    }
}

function VerifyAndSavePatientLoginDetails(showMessage) {
    var isValid = $("#PatientLoginDetailForm").validationEngine({ returnIsValid: true });
    if (isValid) {
        if (codeStatus == 0) {
            var jsonData = {
                Id: $("#Id").val(),
                PatientId: $("#PatientId").val(),
                Email: $("#Email").val(),
                Password: $("#Password").val(),
                IsDeleted: false,
                DeleteVerificationToken: true,
                CodeValue: $("#CodeValue").val(),
                NewCodeValue: $("#txtCodeValue").val()
            };
            $.post("/Home/SavePatientLoginDetails", jsonData, function (data) {
                if (data.Status != -1) {
                    if ($("#Id").val() > 0 && showMessage) {
                        ShowMessage("Records Saved Successfully!", "Success", "success", true);
                        $("#divMessage").show();
                    }
                } else {
                    ShowMessage("Invalid 8-Digit Code. Try again!", "Alert", "warning", true);
                }
            });
        }
        else
            ShowMessage("Invalid 8-Digit Code. Try again!", "Alert", "warning", true);
    }
}

function CheckIfCodeMatched() {
    var value = $("#txtCodeValue").val();
    var codeSaved = $("#CodeValue").val();
    if (value != codeSaved) {
        ShowMessage("Invalid 8-Digit Code. Try again!", "Alert", "warning", true);
        codeStatus = 1;
    }
    else
        codeStatus = 0;
}