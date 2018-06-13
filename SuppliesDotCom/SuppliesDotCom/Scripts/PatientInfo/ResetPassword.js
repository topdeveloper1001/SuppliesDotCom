$(function () {
    //$("#ResetPasswordDetailForm").validationEngine();
    $("#btnForgotPasswordSaveDetails").click(function() {
        UpdatePassword();
        return false;
    });

    $(".DateTime").datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        maxDate: '0',
        closeOnDateSelect: true
    });

    $("#btnForgotPasswordCancelDetails").click(function() {
        $("#txtBirthDate").val('');
        $("#txtEmirateId").val('');
        return false;
    });
});

function UpdatePassword() {
    /// <summary>
    /// Updates the password.
    /// </summary>
    /// <returns></returns>
    var isValid = true;//$("#ResetPasswordDetailForm").validationEngine({ returnIsValid: true });
    if (isValid) {
        var patientId = $("#PatientId").val();
        var jsonData = {
            Id: $("#Id").val(),
            Email: $("#Email").val(),
            PatientPortalAccess:true,
            IsDeleted: false,
            DeleteVerificationToken: false,
            BirthDate: $("#txtBirthDate").val(),
            EmriateId: $("#txtEmirateId").val(),
            PatientId: patientId
        };
        $.post("/Home/ResetUserPassword", jsonData, function(data) {
            var message = data.message != '' ? data.message : "Password deatils Send Successfully";
            if (data.error == "") {
                ShowMessage(message, "Success", "success", true);
                setTimeout(function () {
                    window.location = window.location.protocol + "//" + window.location.host + "/Home/UserLogin";
                }, 2000);
            } else {
                ShowMessage(message, "Error", "warning", true);
            }
        });
    }
}

function ShowMessage(msg, title, shortCutFunction, showCloseButton) {
    /// <summary>
    /// Shows the message.
    /// </summary>
    /// <param name="msg">The MSG.</param>
    /// <param name="title">The title.</param>
    /// <param name="shortCutFunction">The short cut function.</param>
    /// <param name="showCloseButton">The show close button.</param>
    /// <returns></returns>
    toastr.options = {
        "closeButton": showCloseButton,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "2000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $("#toastrOptions").text("Command: toastr["
                    + shortCutFunction
                    + "](\""
                    + msg
                    + (title ? "\", \"" + title : '')
                    + "\")\n\ntoastr.options = "
                    + JSON.stringify(toastr.options, null, 2)
    );

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
}