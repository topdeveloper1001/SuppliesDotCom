$(function () {
    $("#facilityDiv").validationEngine();

    //Date time that must exceed the current date
    BindCountryData("#ddlCountries", "#hdCountry");
    BindCorporates("#ddlCorporate", $("#CorporateID").val());
    BindTimeZones("#ddlFacilityTimeZone", '#FacilityTimeZone');
    BindGlobalCodesWithValue("#ddlFacilityRegions", 4141, "");
    BindGlobalCodesWithValue("#ddlFacilityType", 4242, "");
});

function SaveFacility() {

    var sId = $("#SenderID").val();
    var isValid = jQuery("#facilityDiv").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        var jsonData = {
            FacilityId: $("#FacilityId").val(),
            FacilityNumber: $("#FacilityNumber").val(),
            FacilityName: $("#FacilityName").val(),
            FacilityStreetAddress: $("#FacilityStreetAddress").val(),
            FacilityStreetAddress2: $("#FacilityStreetAddress2").val(),
            FacilityCity: $("#ddlCities").val(),
            FacilityZipCode: $("#FacilityZipCode").val(),
            FacilityLicenseNumber: $("#FacilityLicenseNumber").val(),
            FacilityLicenseNumberExpire: $("#FacilityLicenseNumberExpire").val(),
            FacilityTypeLicense: $("#FacilityTypeLicense").val(),
            FacilityRelated: $("#ddlFacilityType").val(),
            FacilityTotalStaffedBed: $("#FacilityTotalStaffedBed").val(),
            FacilityTotalLicenseBed: $("#FacilityTotalLicenseBed").val(),
            FacilityPOBox: $("#FacilityPOBox").val(),
            CountryID: $("#ddlCountries").val(),
            FacilityState: $("#ddlStates").val(),
            IsActive: true,
            CorporateID: $("#ddlCorporate").val(),
            FacilityTimeZone: $("#ddlFacilityTimeZone").val(),
            RegionId: $("#ddlFacilityRegions").val(),
            IsDeleted: false,
            SenderID: $("#SenderID").val()
        };

        $.post("/Facility/SaveFacility", jsonData, function (data) {
            var value = TryParseInt(data, 0);

            if (value > 0) {
                var errMessage = "";
                if (data == 1) {//1 means facility number and License number matched
                    errMessage = "Facility number and License number already exists in the System!";

                }
                else if (data == 2)//2 means facility number  matched
                {

                    errMessage = "Facility number you entered already exists in the System!";

                }
                else if (data == 3) {//3 means  License number matched

                    errMessage = "License number you entered already exists in the System!";
                }
                ShowMessage(errMessage, "Warning", "warning", true);
            }
            else if (data != null) {
                var msg = "Records Saved successfully !";
                if ($("#FacilityId").val() > 0)
                    msg = "Records updated successfully";

                ClearFacilityForm();
                BindList("#facilityGrid", data);
                ShowMessage(msg, "Success", "success", true);
            }
            else {
                ShowErrorMessage("Error while saving the Facility Information. Try again later!", true);
            }
        });
    }
    return false;
}

//function EditFacility(id) {
//    $.getJSON("/Facility/GetFacility", { facilityId: id }, function (data) {
//        if (data != null) {
//            $('#colFacilityAddEdit').addClass('in').attr('style', 'height:auto;');
//            BindFacilityDetails(data);
          
//        }
//    });
//}



function EditFacility(id) {
    var jsonData = JSON.stringify({
        facilityId: id
    });
    $.ajax({
        type: "POST",
        url: '/Facility/GetFacility',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $('#colFacilityAddEdit').addClass('in').attr('style', 'height:auto;');
            BindFacilityDetails(data);
        },
        error: function (msg) {

        }
    });
}

function DeleteFacility(id) {
    if (confirm("Do you want to delete this record? ")) {
        $.post("/Facility/DeleteFacility", { facilityId: id }, function (data) {
            var value = TryParseInt(data, 0);
            if (data != null && value == 0) {
                BindList("#facilityGrid", data);
                ClearFacilityForm();
                ShowMessage("Facility Deleted Successfully!", "Success", "info", true);
            }
            else {
                ShowWarningMessage('This Facility cannot be deleted as it is associated with Role.', true);
            }
        });
    }
    return false;
}

function ClearFacilityForm() {
    var country = $("#ddlCountries").val();
    var state = $("#ddlStates").val();
    var city = $("#ddlCities").val();
    $.validationEngine.closePrompt(".formError", true);
    $("#facilityDiv").clearForm(true);
    $("#ddlCountries").val(country);
    $("#ddlStates").val(state);
    $("#ddlCities").val(city);
    $('#colFacilityAddEdit').removeClass('in');
    $('#colList').addClass('in');
    $("#facilityDiv").validationEngine();
    InitializeDateTimePicker();
    $('#btnSaveFacility').val('Save');
}

function BindFacilityDetails(data) {
    $("#FacilityId").val(data.FacilityId);
    $("#ddlCorporate").val(data.CorporateID);
    $("#FacilityNumber").val(data.FacilityNumber);
    $("#FacilityName").val(data.FacilityName);
    $("#FacilityLicenseNumber").val(data.FacilityLicenseNumber);
    $("#hdCountry").val(data.CountryID);
    $("#ddlCountries").val(data.CountryID);
    $("#hdState").val(data.FacilityState);
    $("#hdCity").val(data.FacilityCity);
    SetCountryStateCity();
    $("#FacilityZipCode").val(data.FacilityZipCode);
    $("#FacilityPOBox").val(data.FacilityPOBox);
    $("#FacilityTotalLicenseBed").val(data.FacilityTotalLicenseBed);
    $("#FacilityTotalStaffedBed").val(data.FacilityTotalStaffedBed);
    $("#FacilityTypeLicense").val(data.FacilityTypeLicense);
    $("#ddlFacilityType").val(data.FacilityRelated);
    $("#FacilityLicenseNumberExpire").val(data.FacilityLicenseNumberExpire);
    //$("#FacilityTimeZone").val(data.FacilityTimeZone);
    $("#FacilityStreetAddress").val(data.FacilityStreetAddress);
    $("#FacilityStreetAddress2").val(data.FacilityStreetAddress2);
    $("#ddlFacilityRegions").val(data.RegionId);
    $("#SenderID").val(data.SenderID);
    $("#ddlFacilityTimeZone").val(data.FacilityTimeZone);

    //setTimeout($("#ddlFacilityTimeZone").val($('#FacilityTimeZone').val()), 1000);
    //setTimeout($("#ddlFacilityTimeZone").val(data.FacilityTimeZone), 1000);
    $('#colList').removeClass('in');
    $('#colFacilityAddEdit').addClass('in');
    $('#btnSaveFacility').val('Update');
    InitializeDateTimePicker();
}





/*--------------Sort Facility Grid--------By krishna on 28082015---------*/
function BindFaciltyList(event) {

    var url = "/Facility/BindFaciltyList";
    //var reportingTypeId = $("#id").val();

    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#gridContent").empty();
            $("#gridContent").html(data);

        },
        error: function (msg) {
        }
    });
}



function DeleteItemInFacility() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.post("/Facility/DeleteFacility", { facilityId: $("#hfGlobalConfirmId").val() }, function (data) {
            var value = TryParseInt(data, 0);
            if (data != null && value == 0) {
                BindList("#facilityGrid", data);
                ShowMessage("Facility Deleted Successfully!", "Success", "info", true);
            }
            else {
                ShowWarningMessage('This Facility cannot be deleted as it is associated with Role.', true);
            }
        });
    }
    return false;
}