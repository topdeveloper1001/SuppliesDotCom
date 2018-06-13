function selectRole(roleId, facilityid, corporateId, roleName, facilityName) {
    $("#lblRoleId").text(roleName);
    $("#lblFacilityId").text(facilityName);
    var jsonData = JSON.stringify({
        roleId: roleId,
        facilityId: facilityid,
        corporateId: corporateId
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/RoleSelection/SetUserRole",
        data: jsonData,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            //window.location = window.location.protocol + "//" + window.location.host + "/PatientSearch/PatientSearch";
            window.location = window.location.protocol + "//" + window.location.host + "/Home/Welcome";
        },
        error: function (msg) {
        }
    });
    return false;
}

function closeThis(selector) {
    $(selector).hide();
    return false;
}