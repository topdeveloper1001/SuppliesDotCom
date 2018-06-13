function ChangePassword() {

    /// <summary>
    /// Changes the password.
    /// </summary>
    /// <returns></returns>
    var isValid = jQuery("#divChangepassword").validationEngine({ returnIsValid: true });
    if (isValid) {
        var txtNewPassword = $("#txtNewPassword").val();
        var jsonData = JSON.stringify({
            newPassword: txtNewPassword,
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Home/ChangeNewPassword",
            data: jsonData,
            dataType: "html",
            success: function (data) {
        
                if (data == "\"-1\"") {
                    ShowMessage("Current Password and New Password cannot be same!", "Warning", "warning", true);
                    return false;
                }
                if (data == 'true') {
                    ShowMessageWithDuration('Password Changed Successfully. Please Login again.', "Success", "success", true, 1000);
                    //setTimeout(function() {
                    //    window.location = window.location.protocol + "//" + window.location.host;
                    //}, 2000);
                } else {
                    ShowMessageWithDuration('Unable to change password.', "Warning", "warning", true, 1000);
                    //setTimeout(function() {
                    //    window.location = window.location.protocol + "//" + window.location.host;
                    //}, 2000);
                }
                $('#divChangepassword').hide();
            },
            error: function(msg) {
            }
        });
    }
    return false;
}

$(function() {
    $("#divChangepassword").validationEngine();
});


function closeThis(selector) {
    /// <summary>
    /// Closes the this.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <returns></returns>
    $(selector).hide();
    return false;
}