function SavePatientAddress(id, patientId) {
    patientId = $("#PatientId").val();
    var firstName = $("#FirstName").val();
    var lastName = $("#LastName").val();
    var streetAddress1 = $("#StreetAddress1").val();
    var streetAddress2 = $("#StreetAddress2").val();
    var ddlPersonRelation = $("#ddlPersonRelation").val();
    var txtPoBox = $("#POBox").val();
    var ddlCountries = $('#ddlCountries').val();
    var ddlStates = $('#ddlStates').val();
    var ddlCity = $('#ddlCities').val();
    var txtZipCode = $('#ZipCode').val();
    var txtCreatedBy = 1;
    var txtCreatedDate = new Date();
    var jsonData = JSON.stringify({
        PatientAddressRelationID: id,
        PatientID: patientId,
        PatientAddressRelationType: ddlPersonRelation,
        FirstName: firstName,
        LastName: lastName,
        StreetAddress1: streetAddress1,
        StreetAddress2: streetAddress2,
        CityID: ddlCity,
        StateID: ddlStates,
        CountryID: ddlCountries,
        ZipCode: txtZipCode,
        POBox: txtPoBox,
        IsPrimary: $('#chkIsPrimary').prop('checked'),
        CreatedBy: txtCreatedBy,
        CreatedDate: txtCreatedDate,
        IsDeleted: false
    });

    $.ajax({
        type: "POST",
        url: '/PatientInfo/SavePatientAddressRelation',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                BindPatientAddressGrid(patientId);
                ClearAddressAll();
                var msg = "Records Saved successfully !";
                if (id > 0)
                    msg = "Records updated successfully";
                ShowMessage(msg, "Success", "success", true);
            }
        },
        error: function (msg) {
        }
    });
}

function EditPatientAddressRelation(id) {
    $.post("/PatientInfo/GetPatientAddressById", { patientRelationId: id }, function (data) {
        if (data != null) {
            $("#PatientAddressRelationID").val(data.PatientAddressRelationID);
            $("#PatientAddressRelationType").val(data.PatientAddressRelationType);
            $("#ddlPersonRelation").val(data.PatientAddressRelationType);
            $("#FirstName").val(data.FirstName);
            $("#LastName").val(data.LastName);
            $("#StreetAddress1").val(data.StreetAddress1);
            $("#StreetAddress2").val(data.StreetAddress2);
            $("#POBox").val(data.POBox);
            $("#ZipCode").val(data.ZipCode);
            $('#ddlCountries').val(data.CountryID);
            $('#hdCountry').val(data.CountryID);
            $('#hdState').val(data.StateID);
            $('#hdCity').val(data.CityID);
            SetCountryStateCity();
            $("#btnSaveAddressRelation").val("Update");
            if (data.IsPrimary)
                $("#chkIsPrimary").prop("checked", "checked");

            $.validationEngine.closePrompt(".formError", true);
            $("#AddressesTab").focus();
        }
    });
}

$(function () {
    ajaxStartActive = false;
    BindRelationShipData("#ddlPersonRelation");
    $("#divPatientAddress").validationEngine();

    //Bind States
    $('#ddlCountries').change(function () {
        var id = $('#ddlCountries').val();
        getCountryByID(id);
        
        //GetStates(id);
        //GetCities(id);
    });

    //Bind Cities
    $('#ddlStates').change(function () {
        
        var id = $('#ddlStates').val();
        //GetStates(id);
        GetCities(id);
    });
    ajaxStartActive = true;
});

function IsValidAddress() {
    var isValid = jQuery("#divPatientAddress").validationEngine({ returnIsValid: true });
    if (isValid && $("#PatientId").val() > 0) {
        SavePatientAddress($("#PatientAddressRelationID").val(), $("#PatientId").val());
    }
    return false;
}

function BindPatientAddressGrid(patientId) {
    
    var jsonData = JSON.stringify({
        patientId: patientId,
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/PatientInfo/GetPatientAddressInfo",
        dataType: "html",
        async: false,
        data: jsonData,
        success: function (data) {
            $("#divPatientAddressGrid").empty();
            $("#divPatientAddressGrid").html(data);
        },
        error: function (msg) {

        }

    });
}

function ClearAddressAll() {
    var patientId = $("#PatientId").val();
    $("#divPatientAddress").clearForm(false);
    $.validationEngine.closePrompt(".formError", true);
    BindPatientAddressGrid(patientId);
    $("#btnSaveAddressRelation").val("Save");
    return false;
}

function BindRelationShipData(selector) {
    $.post("/PatientInfo/GetPatientRelations", {}, function (data) {
        if (data) {
            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, globalCode) {
                items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
            });
            $(selector).html(items);
        }
    });
}


function DeletePatientAddressRelation() {
    if ($("#hfGlobalConfirmId").val() > 0) {
        $.ajax({
            type: "POST",
            url: '/PatientInfo/DeletePatientAddressRelation',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({
                Id: $("#hfGlobalConfirmId").val()
            }),
            success: function (data) {
                if (data) {
                    BindPatientAddressGrid($('#PatientId').val());
                    ClearAddressAll();
                    var msg = "Records Deleted successfully !";
                    ShowMessage(msg, "Success", "success", true);
                }
            },
            error: function (msg) {

            }
        });
    }
}

//function DeletePatientAddressRelation(id) {
//    if (confirm("Do you want to delete this record? ")) {
//        $.ajax({
//            type: "POST",
//            url: '/PatientInfo/DeletePatientAddressRelation',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: JSON.stringify({
//                Id: id
//            }),
//            success: function (data) {
//                if (data) {
//                    BindPatientAddressGrid($('#PatientId').val());
//                    ClearAddressAll();
//                    var msg = "Records Deleted successfully !";
//                    ShowMessage(msg, "Success", "success", true);
//                }
//            },
//            error: function (msg) {

//            }
//        });
//    }
//}

function SetCountryStateCityLocal() {
    if ($('#hdCountry1').val() > 0) {
        GetStates($('#hdCountry1').val());
        $("#ddlCountries").val($('#hdCountry1').val());
        getCountryByID($('#hdCountry1').val());
    }
    if ($('#hdState1').val() > 0) {
        GetCities($('#hdState1').val());
        $("#ddlStates").val($('#hdState1').val());
    }
    if ($('#hdCity1').val() > 0) {
        $("#ddlCities").val($('#hdCity1').val());
    }
}

//Method to get UserInfo when Selected Self
function GetUserSelfInfo(obj) {
    if (obj.value == RelationshipType.Self) {
        $.post("/PatientInfo/GetPatientById", { Id: $("#PatientId").val() }, function (data) {
            $('#FirstName').val(data.PersonFirstName);
            $('#LastName').val(data.PersonLastName);
        });
    }
    else {
        $('#FirstName').val('');
        $('#LastName').val('');
    }
}

function DivClose() {
    $("#collapseOne").removeClass("in");
    $("#collapseThree").removeClass("in");
}

function Div1OpenClose() {
    $("#collapseThree").addClass("in");//add class to Open the Div
    $("#collapseTwo").removeClass("in");//Remove class is used to close the div
}



function BindAddressBySort(event) {

    var url = "/PatientInfo/GetPatientAddressInfo";
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
            $("#divPatientAddressGrid").empty();
            $("#divPatientAddressGrid").html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}