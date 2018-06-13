function SearchPatient() {
    /// <summary>
    /// Searches the patient.
    /// </summary>
    /// <returns></returns>
    var isvalidSearch = ValidSearch();
    if (isvalidSearch) {
        var contactnumber = $("#txtMobileNumber").val() != '' ? $('#lblCountryCode').html() + '-' + $("#txtMobileNumber").val() : "";
        var jsonData = JSON.stringify({
            PatientID: 0,
            PersonLastName: $("#txtLastName").val(),
            PersonEmiratesIDNumber: $("#txtEmiratesNationalId").val(),
            PersonPassportNumber: $("#txtPassportnumber").val(),
            PersonBirthDate: $("#txtBirthDate").val(),
            ContactMobilePhone: contactnumber
        });
        $.ajax({
            type: "POST",
            url: '/PatientSearch/GetPatientInfoSearchResult',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: jsonData,
            success: function (data) {
                $('#divSearchResult').empty();
                $('#divSearchResult').html(data);
                $('#collapseOne').addClass('in');
                SetGridPaging('?', '?PatientID=' + 0 + '&PersonLastName=' + $("#txtLastName").val() + '&PersonEmiratesIDNumber=' + $("#txtEmiratesNationalId").val()
                    + '&PersonPassportNumber=' + $("#txtPassportnumber").val() + '&PersonBirthDate=' + $("#txtBirthDate").val() + '&ContactMobilePhone=' + $("#txtMobileNumber").val() + '&');
                if ($('#hdMessageId').val() != '' && $('#hdMessageId').val() == 6) {
                    $('.editPatientAnchor').hide();
                }
                //$("#PatientSearch").find('tbody').addClass('scroller');
                //$("#PatientSearch").freezeHeader({ 'height': '300px' });
            },
            error: function (msg) {
            }
        });

        //BindCountryDataWithCountryCode("#ddlCountries", "#hdCountry", "#lblCountryCode");
    }
}

//function SetGridCustomSorting() {
//    /// <summary>
//    /// Sets the grid custom sorting.
//    /// </summary>
//    /// <returns></returns>
//    SetGridPaging('GetPatientInfoSearchResult?', 'GetPatientInfoSearchCustomResult?Ln=' + $("#txtLastName").val() + '&EID=' + $("#txtEmiratesNationalId").val()
//                   + '&PassNo=' + $("#txtPassportnumber").val() + '&BD=' + $("#txtBirthDate").val() + '&MobileNo=' + $("#txtMobileNumber").val() + '&');
//}

function ValidSearch() {
    /// <summary>
    /// Valids the search.
    /// </summary>
    /// <returns></returns>
    var txtvalue = 0;
    $('#ValidatePatientSearch input[type=text]').each(function () {
        if ($(this).val() != "") {
            txtvalue = txtvalue + 1;
        }
    });
    if (txtvalue < 1) {
        ShowMessage("Confirm at least one piece of information", "Alert", "warning", true);
        return false;
    }
    else {
        return true;
    }
    return false;
}

$(function () {
    if ($("#hidFirstTimeLogin").val() == "True") {
        OpenUserChangePasswordView();
    } else {
        $('#divChangepassword').hide();
        if ($("#hidRole").val() == "0") {
            OpenUserRoleView();
        } else {
            $('#UserRoleDiv').hide();
        }
        $(".EmiratesMask").mask("999-99-9999");
        var ButtonKeys = { "EnterKey": 13 };
        $(".white-bg").keypress(function (e) {
            if (e.which == ButtonKeys.EnterKey) {
                $("#btnSearch").click();
            }
        });
        //BindCountryDataWithCountryCode("#ddlCountries", "#hdCountry", "#lblCountryCode");
    }
});

function EditPatient(id) {
    /// <summary>
    /// Edits the patient.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var txtPatientInfoId = id;
    var jsonData = JSON.stringify({
        id: txtPatientInfoId,
        viewOnly: ''
    });
    $.ajax({
        type: "POST",
        url: '/PatientSearch/EditPatient',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            window.location = window.location.protocol + "//" + window.location.host + "/PatientInfo/PatientInfo?patientId=" + id;
        },
        error: function (msg) {
        }
    });
}

function ViewPatient(id) {

    /// <summary>
    /// Views the patient.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var txtPatientInfoId = id;
    var jsonData = JSON.stringify({
        Id: txtPatientInfoId,
        ViewOnly: 'true'
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/GetPatientInfo',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {

            if (data) {
                $('#PatientInfoDiv').empty();
                $('#PatientInfoDiv').html(data);
                $('#collapseOne').addClass('in');
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function editDetails(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var id = dataItem.PatientID;
    EditPatient(id);

}

function OpenUserRoleView() {
    /// <summary>
    /// Opens the user role view.
    /// </summary>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: '/RoleSelection/Index',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $('#UserRoleDiv').empty();
            $('#UserRoleDiv').html(data);
            $('#divhidepopup').show();
        },
        error: function (msg) {
        }
    });
    //$('#UserRoleDiv').load("/RoleSelection/Index", function () {
    //    $('#divhidepopup').show();
    //});
}

function RedirectEHR(PatientId) {
    /// <summary>
    /// Redirects the ehr.
    /// </summary>
    /// <param name="PatientId">The patient identifier.</param>
    /// <returns></returns>
    window.location.href = window.location.protocol + "//" + window.location.host + "/Summary/PatientSummary?pId=" + PatientId;
}

function ViewAuth(patientId) {
    /// <summary>
    /// Views the authentication.
    /// </summary>
    /// <param name="patientId">The patient identifier.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        PatientID: patientId
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/GetActiveEncounterId',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                if (data == 0) {
                    ShowMessage("There is no encounter for current patient.", "Warning", "warning", true);
                } else {
                    $("#authorizationdiv").empty();
                    $("#authorizationdiv").html(data);
                    //$("#AuthorizationMemberID").val(patientId);
                    $(".hidePopUp").show();
                }
            }
        },
        error: function (msg) {
        }
    });
}

function OpenUserChangePasswordView() {
    /// <summary>
    /// Opens the user change password view.
    /// </summary>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: '/Security/GetLoggedInUserDetails',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $('#UserChangePasswordDiv').empty();
            $('#UserChangePasswordDiv').html(data);
            $('#divChangepassword').show();
        },
        error: function (msg) {
        }
    });
    //$('#UserRoleDiv').load("/RoleSelection/Index", function () {
    //    $('#divhidepopup').show();
    //});
}