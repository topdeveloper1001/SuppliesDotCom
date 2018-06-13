$(function () {
    ajaxStartActive = false;
    $(".PhoneMask").mask("999-9999999");
    $(".EmiratesMask").mask("999-99-9999");

    $("#divActiveMother").hide();
    BindPatientDataOnLoad();
    jqueryFormSub();

    //----------Patient Portal Access Feature
    $("#PatientLoginDetail_PatientPortalAccess").prop('checked', 'checked');
    $("#divPatientInfo").validationEngine();

    if ($('#PatientIsVIP').is(':checked')) {
        $("#divCheckIsVip").show();
        $("#divIsVIP").addClass("yellowBox1");
    } else {
        $("#divIsVIP").removeClass("yellowBox1");
        $("#divCheckIsVip").hide();
    }


    $('#PatientIsVIP').change(function () {
        if ($(this).is(':checked')) {
            $("#divCheckIsVip").show();
            $("#divIsVIP").addClass("yellowBox1");
        } else {
            $("#spVIP").text("");
            $("#divCheckIsVip").hide();
            $("#divIsVIP").removeClass("yellowBox1");
        }
    });

    var selectedCountryId = $("#CurrentPatient_PatientInfo_PersonNationality").val();
    if (selectedCountryId > 0) {
        $("#ddlPersonNationality").val(selectedCountryId);
    }


    if ($('#PatientId').length > 0 && $('#PatientId').val() > 0) {
        $('.moreinfo').show();
        $('#divEncounterOptions').show();
    }

    if ($("#PatientId").length > 0) {
        if ($('#PatientId').val() == '0')
            ClearData();
        else if ($('#CurrentPatient_PatientInfo_PersonMedicalRecordNumber').val() != '')
            $('#CurrentPatient_PatientInfo_PersonMedicalRecordNumber').attr('disabled', 'disabled');
    }

    $("#ddlInsurancePolicy").change(function () {
        var selectedPolicyId = $(this).val();
        if (selectedPolicyId > 0) {
            $("#InsurancePolicyId").val(selectedPolicyId);
        }
    });

    if ($("#btnRegisterNewPatient").length > 0) {
        $("#btnRegisterNewPatient").click(function () {
            RegisterNewPatient();
            return false;
        });
    }

    $("#ddlPersonNationality").change(function () {
        $("#CurrentPatient_PatientInfo_PersonNationality").val($(this).val());
    });

    if ($("#btnUpdatePatientInfo").length > 0) {
        $("#btnUpdatePatientInfo").click(function () {
            UpdatePatientInfo();
            return false;
        });
    }

    //-------------Added for Super Powers functionality-------------///
    $("#GlobalPatientId").val($('#PatientId').length > 0 && $('#PatientId').val() > 0 ? $("#PatientId").val() : 0);

    BindLinkUrlsForSuperPowers();
    //-------------Added for Super Powers functionality-------------///

    $('#imageLoadPhoto').on('click', function () { $.validationEngine.closePrompt(".formError", true); });

    InitializeDatesInPatientInfo();

    $('#btnVirtualDischargeConfirm').on('click', function () {
        var encounterid = $("#hidVirtualDischargeEncId").val();
        var patientId = $("#hidVirtualDischargePatientId").val();
        var messageid = $("#hidVirtualDischargeMessageId").val();
        window.location.href = window.location.protocol + "//" + window.location.host + "/Encounter/Index?patientId=" + patientId + "&messageId=" + messageid + "&encid=" + encounterid;
    });

    $('#btnVirtualDischargeCancel').on('click', function () {
        $("#divConfirmVirtualDischargeBox").modal('hide');
    });
});

var imageName = '';
var fileName = '';

function EditPatientInfo(id) {
    ajaxStartActive = true;
    var txtPatientInfoId = id;
    var jsonData = JSON.stringify({
        Id: txtPatientInfoId,
        ViewOnly: ''
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/GetPatientInfo',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#PatientInfoDiv').empty();
                $('#PatientInfoDiv').html(data);
                $('#collapseOne').addClass('in');
                BindCountryDataWithCountryCode("#ddlPersonContactNumber", "#ddlPersonNationality", '#lblPersonContactNumber');
                FormatMaskedPhone('#lblPersonContactNumber', "#ddlPersonContactNumber", "#txtContactNumber");

                InitializeDatesInPatientInfo();
            }
        },
        error: function (msg) {
        }
    });
}

function ViewPatientInfo(id) {
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

function DeletePatientInfo(id) {
    var txtPatientInfoId = id;
    var jsonData = JSON.stringify({
        Id: txtPatientInfoId,
        ModifiedBy: 1,//Put logged in user id here
        ModifiedDate: new Date(),
        IsDeleted: true,
        DeletedBy: 1,//Put logged in user id here
        DeletedDate: new Date(),
        IsActive: false
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/DeletePatientInfo',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#divPatientInfo').empty();
                $('#divPatientInfo').html(data);
            }
            else {
                return false;
            }
        },
        error: function (msg) {
            return true;
        }
    });
}

function IsValid(id) {
    var isValid = jQuery("#divPatientInfo").validationEngine({ returnIsValid: true });
    if (isValid == true) {
        CheckIfEmiratesIDExists(id);//Change By Ashwani
    }
    return false;
}

function ClearPatientInfoForm() {
    $("#divPatientInfo").clearForm();
}

function CalculateAge(birthday) {
    var control = $("#CurrentPatient_PersonAge");

    if (control.length == 0)
        control = $("#CurrentPatient_PatientInfo_PersonAge");

    $.ajax({
        type: "POST",
        url: '/Home/CalculateAgeInYears',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ dValue: birthday.value }),
        success: function (data) {
            control.val(data);
            return false;
        },
        error: function (msg) {
            return false;
        }
    });
    return false;


    //var date1 = birthday.value.split('/');
    ///*
    //Changes by Amit Jain as Date was not picked correctly, now working correctly
    //On: 13102014
    //*/
    //var newdate = date1[0] + "/" + date1[1] + "/" + date1[2];
    //if (birthday.value != '') {
    //    birthdayDate = new Date(newdate);
    //    dateNow = new Date();
    //    var years = dateNow.getFullYear() - birthdayDate.getFullYear();
    //    var months = dateNow.getMonth() - birthdayDate.getMonth();
    //    var days = dateNow.getDate() - birthdayDate.getDate();
    //    if (isNaN(years)) {
    //        control.val('');
    //    }
    //    else {
    //        if (months < 0 || (months == 0 && days < 0)) {
    //            years = parseInt(years) - 1;
    //            if (years < 0)
    //                years = 0;
    //            control.val(years);
    //        }
    //        else {
    //            control.val(years);
    //        }
    //    }
    //}
    return false;
}

function BindInsuranceCompaniesData(selector) {
    $.getJSON("/Insurance/GetInsuranceCompaniesDropdownData", {}, function (data) {
        var insuranceCompanyHiddenField = "#Insurance_InsuranceCompanyId";
        var insurancePlanHiddenField = "#Insurance_InsurancePlanId";
        BindInsuranceDropdownData(data, selector, insuranceCompanyHiddenField);

        var data1 = data;
        if ($(insuranceCompanyHiddenField).val() != '') {
            data1 = data.filter(function (item) { return item.Value != $(insuranceCompanyHiddenField).val(); });
        }
        BindInsuranceDropdownData(data1, "#ddlInsuranceCompany2", "#CompanyId2");

        /*
        Owner: Amit Jain
        On: 27102014
        Purpose: Remove validation of Insurance Plans and policies dropdown controls if Insurance Company is set as Self-Pay in Dropdownlist.
        */
        if ($('#ddlPersonInsuranceCompany').val() == '999') {
            ChangeJqueryValidation('#ddlInsurancePlan', false);
            ChangeJqueryValidation('#ddlInsurancePolicy', false);
            $("#ddlInsurancePlan").empty();
            $("#ddlInsurancePlan").append('<option value="0">--Select--</option>');
            $("#ddlInsurancePolicy").empty();
            $("#ddlInsurancePolicy").append('<option value="0">--Select--</option>');
        }
        else {
            var ddlSelectedInsurance = $("#ddlPersonInsuranceCompany option:selected");
            if (ddlSelectedInsurance != null && ddlSelectedInsurance != '--Select--') {
                var insuranceName = ddlSelectedInsurance.text();
                $("#txtCompanyName").val(insuranceName);
                $(insuranceCompanyHiddenField).val(ddlSelectedInsurance.val());
                //
                var selectedPlanId = '';
                if ($(insurancePlanHiddenField).val() != '')
                    selectedPlanId = $(insurancePlanHiddenField).val();
                BindCompanyInsurancePlans(ddlSelectedInsurance.val(), selectedPlanId);
                BindCompanyInsurancePlan2($("#CompanyId2").val());
                BindInsurancePolicies2($("#Plan2").val());
            }
        }
    });
}

function BindInsuranceCompanyName() {
    var insuranceCompanyHiddenField = "#Insurance_InsuranceCompanyId";
    /*
    Here, IfInsuranceCompanyId  value is 999, then it means it's a Self-Pay option and so, there won't be any policy or plan against it.
    */
    if ($('#ddlPersonInsuranceCompany').val() > 0 && $('#ddlPersonInsuranceCompany').val() != '' && $('#ddlPersonInsuranceCompany').val() != '999') {
        ChangeJqueryValidation('#ddlInsurancePlan', true);
        ChangeJqueryValidation('#ddlInsurancePolicy', true);
        ChangeJqueryValidation('#Insurance_Startdate', true);
        ChangeJqueryValidation('#Insurance_Expirydate', true);
        $(".ddlInsurancePolicyformError").remove();
        $('#txtCompanyName').val($("#ddlPersonInsuranceCompany option:selected").text());
        $(insuranceCompanyHiddenField).val($("#ddlPersonInsuranceCompany").val());
        BindCompanyInsurancePlans($("#ddlPersonInsuranceCompany").val(), '');
        $("#InsuranceCompanyId").val($("#ddlPersonInsuranceCompany").val());
    }
    else {
        $(".ddlInsurancePlanformError").remove();
        $(".ddlInsurancePolicyformError").remove();
        ChangeJqueryValidation('#ddlInsurancePlan', false);
        ChangeJqueryValidation('#ddlInsurancePolicy', false);
        ChangeJqueryValidation('#Insurance_Startdate', false);
        ChangeJqueryValidation('#Insurance_Expirydate', false);
        $("#ddlInsurancePlan").empty();
        $("#ddlInsurancePlan").append('<option value="0">--Select--</option>');
        $("#ddlInsurancePolicy").empty();
        $("#ddlInsurancePolicy").append('<option value="0">--Select--</option>');

        $("#InsuranceCompanyId").val(999);
        $("#InsurancePlanId").val(0);
        $("#InsurancePolicyId").val(0);
    }
}

function SetSubmit() {
    $('#myForm').submit();
}

function ActiveEncounterCheck(patientId, encountertype) {
    var jsonData = JSON.stringify({
        patientid: patientId,
        encountertype: encountertype
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/CheckActiveEncounter',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
        },
        error: function (msg) {
        }
    });
}

function ClearInfoForm() {
    var patientId = $("#PatientId").length > 0 ? $("#PatientId").val() : 0;
    if (patientId > 0) {
        $('#divMoreInfo').hide();
    } else {
        $("#divPatientInfo").clearForm();
    }
    window.location.reload();
}

function CheckEncounterState(selectedState, PatientID) {
    var isopenOrders = false;
    if (selectedState == "discharge" || selectedState == "endencounter") {
        var jsonData1 = JSON.stringify({
            patientId: PatientID
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/Encounter/PatientEncounterOrderPendingPinfo',
            dataType: "json",
            async: false,
            data: jsonData1,
            success: function (data) {
                if (data.pendingorders) {
                    if (data.encType == 2) {
                        VirtualDischargePatient(data.encID, PatientID, 9, 'Discharge Patient', 'Encounter have orders that are open. Do you want to virtually discharge the patient?');
                    } else {
                        ShowMessageWithDuration("Unable to Discharge Patient/End Encounter, Reason : Encounter have some open orders that need to be attended.", "Warning", "warning", true, 2000);
                    }
                    isopenOrders = true;
                }
            },
            error: function (msg) {
                return false;
            }
        });
    }
    if (!isopenOrders) {
        var jsonData = JSON.stringify({
            state: selectedState,
            patientID: PatientID,
            ViewOnly: ''
        });
        $.ajax({
            type: "POST",
            url: '/PatientInfo/CheckEncounterState',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data != null) {
                    var msg = data.message;
                    if (data.messageId == 1 && (data.encPatientType == "3" || data.encPatientType == "1")) {
                        if (data.encPatientType == "1" || data.encPatientType == "3") {
                            if (confirm("Do you want to admit this patient? ")) {
                                var encId = data.encId;
                                window.location = window.location.protocol + "//" + window.location.host + "/Encounter/Index?patientId=" + PatientID + "&messageId=1&encId=" + encId;
                                //this will redirect the user to admit the patient whcih was outpatient or ER earlier.
                                return true;
                            }
                        }
                    }
                    if (msg != '' && msg != 'new') {
                        ShowMessage(msg, "Alert", "warning", true);
                    } else if (!data.isRecordExist && data.isNew == false) {
                        ShowMessage("Encounter doesn't start yet", "Alert", "warning", true);
                    } else {
                        window.location = window.location.protocol + "//" + window.location.host + "/Encounter/Index?patientId=" + PatientID + "&messageId=" + data.messageId;
                        return true;
                    }
                }
            },
            error: function (msg) {
            }
        });
    }
}

function DisableButtons(id) {
    var jsonData = JSON.stringify({
        patientId: id
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/CheckPatientEncounter',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                if (data.EncounterEndTime == null) {
                    $("#admitpatientLinkDiv").attr("disabled", "disabled");
                    $("#outpatientLinkDiv").attr("disabled", "disabled");
                    //$("#admitpatientLinkDiv").css("background-color", "gray");
                    //$("#outpatientLinkDiv").css("background-color", "gray");
                    return false;
                }
            }
            $("#dischargepatientLinkDiv").attr("disabled", "disabled");
            $("#endEncounterLinkDiv").attr("disabled", "disabled");
            //$("#dischargepatientLinkDiv").css("background-color", "gray");
            //$("#endEncounterLinkDiv").css("background-color", "gray");
        },
        error: function (msg) {
            $("#dischargepatientLinkDiv").attr("disabled", "disabled");
            $("#endEncounterLinkDiv").attr("disabled", "disabled");
            //$("#dischargepatientLinkDiv").css("background-color", "gray");
            //$("#endEncounterLinkDiv").css("background-color", "gray");
        }
    });
}

function CheckIfPassportAlreadyExists() {
    var passportText = $("#CurrentPatient_PatientInfo_PersonPassportNumber").val(); //updated on 07062015 by kishna
    passportText = passportText == null ? $("#txtPersonPassportNumber").val() : passportText;
    //var passportText = $('#txtPersonPassportNumber').val(); //to get the id of Passport. 
    var pId = $("#PatientId").length > 0 ? $("#PatientId").val() : 0;

    if (passportText !== '') {
        $.post("/PatientInfo/CheckIfPassportExists", { passport: passportText, patientId: pId }, function (response) {
            if (response != null && response) {
                ShowMessage("This Passport Number already exists in the System!", "Alert", "warning", true);
                $("#CurrentPatient_PatientInfo_PersonPassportNumber").val('');
                $("#CurrentPatient_PatientInfo_PersonPassportNumber").focus();
            }
        });
    }
}

function CheckIfEmiratesIDExists() {
    var id = $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").val();
    var pId = $("#PatientId").val();
    var txtPersonLastName = $("#txtPersonLastName").val();
    var txtPersonBirthDate = new Date($("#CurrentPatient_PatientInfo_PersonBirthDate").val());
    if (pId == '' || pId == '0')
        pId = 0;

    if (id != '') {
        var jsonData = JSON.stringify({
            emiratesId: id,
            patientId: pId,
            lastName: txtPersonLastName,
            birthDate: txtPersonBirthDate
        });

        $.ajax({
            type: "POST",
            url: '/PatientInfo/CheckIfEmiratesIDExists',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data) {
                    ShowMessage("This user already exists in the System!", "Alert", "warning", true);//Emirate ID Number
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").val('');
                    $("#txtPersonLastName").val('');
                    $("#CurrentPatient_PatientInfo_PersonBirthDate").val('');
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").focus();
                }
                else {
                    SavePatientInfo(pId);
                }
            },
            error: function (msg) {
            }
        });
    }
}

//function to get auto generated medical number
function GetAutoGeneratedMedicalNumber() {
    $.ajax({
        type: "POST",
        url: '/PatientInfo/GetAutoGenerateMedicalNumber',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#CurrentPatient_PatientInfo_PersonMedicalRecordNumber").val(data);
        },
        error: function (msg) {
        }
    });
}


//function to check the medical number already exists
function CheckMedicalNumberExist(txtMedical) {
    if (txtMedical.value !== '') {
        var MedicalNumberAdded = txtMedical.value;
        var jsonData = JSON.stringify({
            newMedicalRecordNumber: MedicalNumberAdded
        });
        $.ajax({
            type: "POST",
            url: '/PatientInfo/CheckMedicalNumberExist',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data) {
                    txtMedical.value = '';
                    ShowMessage("This Medical Number already exists in the System!", "Alert", "warning", true);
                }
                else {

                }
            },
            error: function (msg) {
            }
        });
    }
}

//function to add patient Contact
function PatientContact(patientID) {
    var txtContactNumber = $('#txtContactNumber').val();
    if (txtContactNumber != '') {
        var lblPersonContactNumber = $('#lblPersonContactNumber').text();
        txtContactNumber = lblPersonContactNumber + "-" + txtContactNumber;
    }

    var jsonData = JSON.stringify({
        PatientID: patientID,
        ContactNumber: txtContactNumber,
        PatientPhoneId: $('#CurrentPhone_PatientPhoneId').val()
    });

    $.ajax({
        type: "POST",
        url: '/PatientInfo/AddPatientContact',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindPhoneList(patientID);//added by ashwani
        },
        error: function (msg) {
        }
    });
}

//function to bind phone list on update
function BindPhoneList(patientID) {
    var jsonData = JSON.stringify({
        PatientID: patientID
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/BindPhoneList',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $('#tabs-7').empty();
                $('#tabs-7').html(data);

            }
            else {

            }
        },
        error: function (msg) {
        }
    });
}

function ChangeJqueryValidation(dropdownSelector, addValidation) {

    $.validationEngine.closePrompt(".formError", true);
    $(dropdownSelector).removeClass('validate[required]');
    if (addValidation) {
        $(dropdownSelector).addClass('validate[required]');
    }
    $("#divPatientInfo").validationEngine();
}

//Function to open the Authorization Popup
function OpenAuthorizationPopup(encounterid) {
    $('#authorizationdiv').empty();
    $('#authorizationdiv').load("/PatientInfo/GetAuthorization", function () {
        $('#divhidepopup').show();
    });
}

function GetEncounterAuth(patientID) {
    var jsonData = JSON.stringify({
        PatientID: patientID
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
                    ShowMessage("There is no active encounter for current patient.", "Warning", "warning", true);
                } else {
                    $("#authorizationdiv").empty();
                    $("#authorizationdiv").html(data);
                    //$("#AuthorizationMemberID").val(patientID);
                    $("#divhidepopup").show();
                    //var jsonDatanew = JSON.stringify({
                    //    encId: data
                    //});
                    //$.ajax({
                    //    type: "POST",
                    //    url: '/PatientInfo/GetAuthorization',
                    //    async: false,
                    //    contentType: "application/json; charset=utf-8",
                    //    dataType: "html",
                    //    data: jsonDatanew,
                    //    success: function (data1) {
                    //        if (data1){
                    //            $("#authorizationdiv").empty();
                    //            $("#authorizationdiv").html(data1);
                    //            $("#divhidepopup").show();
                    //        }
                    //    },
                    //    error: function (msg) {
                    //    }
                    //});
                }
            }
        },
        error: function (msg) {
        }
    });
}

function ViewPatientDocument(id) {
    var jsonData = JSON.stringify({
        documentid: id,
    });
    $.ajax({
        type: "POST",
        url: '/FileUploader/GetDocumentById',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data) {
                $("#authorizationdiv").empty();
                $("#authorizationdiv").html(data);
                $("#divhidepopup").show();
            }
        },
        error: function (msg) {
        }
    });
}

function BindCompanyInsurancePlans(id, selectedPlanId) {
    var insurancePolicyControl = "#Insurance_InsurancePolicyId";
    if (id > 0) {
        $.post("/PatientInfo/GetInsurancePlansByCompanyId", { companyId: id }, function (data) {
            var ddlSelector = "#ddlInsurancePlan";
            BindDropdownData(data, ddlSelector, selectedPlanId);

            var planName = $(ddlSelector + " option:selected").text();
            if (planName != '' && planName != '--Select--') {
                $("#PlanName").val(planName);
            }

            if (selectedPlanId != '' && selectedPlanId > 0) {
                $('#InsurancePlanId').val(selectedPlanId);
                //
                BindInsurancePolicies($(insurancePolicyControl).val());
            }
        });
    }
}

function BindInsurancePolicies(selectedPolicyId) {
    //
    if ($("#ddlInsurancePlan").val() > 0) {
        $.post("/PatientInfo/GetInsurancePolicesByPlanId", { planId: $("#ddlInsurancePlan").val() }, function (responseData) {
            $('#InsurancePlanId').val($("#ddlInsurancePlan").val());
            var ddlPolicySelector = "#ddlInsurancePolicy";
            BindDropdownData(responseData, ddlPolicySelector, selectedPolicyId);
            //
            //Set the selected policy in the insurance tab
            var policyName = $(ddlPolicySelector + " option:selected").text();
            if (policyName != '' && policyName != '--Select--') {
                $("#PolicyName").val(policyName);
            }

            if (selectedPolicyId > 0) {
                $('#InsurancePolicyId').val(selectedPolicyId);
            }
        });
    }
}

//---------------For 2nd Health Care Plan----------------------------/////
function BindCompanyInsurancePlan2(companyId) {
    if (companyId > 0) {
        $.post("/PatientInfo/GetInsurancePlansByCompanyId", { companyId: companyId }, function (data) {
            var ddlSelector = "#ddlInsurancePlan2";
            BindDropdownData(data, ddlSelector, "#Plan2");
        });
    }
}

function BindInsurancePolicies2(planId) {
    if (planId > 0) {
        $.post("/PatientInfo/GetInsurancePolicesByPlanId", { planId: planId }, function (data) {
            var ddlSelector = "#ddlInsurancePolicy2";
            BindDropdownData(data, ddlSelector, "#Policy2");
        });
    }
}
//---------------For 2nd Health Care Plan----------------------------/////

function RegisterNewPatient() {
    ajaxStartActive = true;
    var isValid = jQuery("#divPatientInfo").validationEngine({ returnIsValid: true });
    if (isValid) {
        var txtContactNumber = $('#txtContactNumber').val();
        if (txtContactNumber != '') {
            var lblPersonContactNumber = $('#lblPersonContactNumber').text();
            $('#CurrentPatient_PatientInfo_PersonContactNumber').val(lblPersonContactNumber + "-" + txtContactNumber);
        }
        var txtPersonVip = $("#CurrentPatient_PatientInfo_PersonVIP").val();
        var isVip = $("#PatientIsVIP")[0].checked;
        var personVip = isVip != null && isVip == true ? (txtPersonVip == '' ? 'true' : txtPersonVip) : null;

        $("#CurrentPatient_PatientInfo_PersonMotherName").val($("#ddlActiveMother").val());
        $("#CurrentPatient_PatientInfo_PersonVIP").val(personVip);
        $("#Insurance_InsuranceCompanyId").val($("#ddlPersonInsuranceCompany").val());
        $("#Insurance_InsurancePlanId").val($("#ddlInsurancePlan").val());
        $("#Insurance_InsurancePolicyId").val($("#ddlInsurancePolicy").val());

        $("#Insurance_CompanyId2").val($("#ddlInsuranceCompany2").val());
        $("#Insurance_Plan2").val($("#ddlInsurancePlan2").val());
        $("#Insurance_Policy2").val($("#ddlInsurancePolicy2").val());

        /*Document Upload Start*/
        var docId = $("#ddlDocumentType").val();
        $("#DocumentsAttachment_DocumentTypeID").val(docId);
        var txtDocumentName = $("#ddlDocumentType :selected").text();
        $("#DocumentsAttachment_DocumentName").val(txtDocumentName);
        $("#DocumentsAttachment_DocumentNotes").val(txtDocumentName);
        /*Document Upload Start END*/


        /* Address & Contacts Section  Start*/

        $("#CurrentPatientAddressRelation_PatientAddressRelationID").val(0);
        $("#CurrentPatientAddressRelation_PatientAddressRelationType").val($("#ddlPersonRelation").val());
        $("#CurrentPatientAddressRelation_FirstName").val($("#AddressRelationFirstName").val());
        $("#CurrentPatientAddressRelation_LastName").val($("#AddressRelationLastName").val());
        var addressRelationIsPrimary = $("#chkIsPrimary")[0].checked;
        $("#CurrentPatientAddressRelation_IsPrimary").val(addressRelationIsPrimary);
        $("#CurrentPatientAddressRelation_StreetAddress1").val($("#AddressRelationStreetAddress1").val());
        $("#CurrentPatientAddressRelation_StreetAddress2").val($("#AddressRelationStreetAddress2").val());
        $("#CurrentPatientAddressRelation_POBox").val($("#AddressRelationPOBox").val());
        $("#hdCountry").val($("#ddlCountries").val());
        $("#hdState").val($("#ddlStates").val());
        $("#hdCity").val($("#ddlCities").val());
        $("#CurrentPatientAddressRelation_ZipCode").val($("#AddressRelationZipCode").val());

        /* Address & Contacts Section END */


        /* Insurance Company Tab Start*/
        $("#Insurance_CompanyName").val($("#IsuranceCompanyName").val());
        $("#Insurance_Startdate").val($("#InsStartDate").val());
        $("#Insurance_Expirydate").val($("#InsEndtDate").val());
        $("#Insurance_PatientInsuranceId2").val($("#ddlInsuranceCompany2").val());
        $("#Insurance_CompanyId2").val($("#ddlInsuranceCompany2").val());
        $("#Insurance_PersonHealthCareNumber2").val($("#IsuranceCompanyPersonHealthCareNumber2").val());
        $("#Insurance_Plan2").val($("#ddlInsurancePlan2").val());

        $("#Insurance_StartDate2").val($("#IsuranceCompanyPersonHealthStartDate2").val());
        $("#Insurance_EndDate2").val($("#IsuranceCompanyPersonHealthEndDate2").val());

        /* Insurance Company Tab END*/
        if ($("#CurrentPatient_PatientInfo_PersonNationality").length > 0 && $("#CurrentPatient_PatientInfo_PersonNationality").val() == '')
            $("#CurrentPatient_PatientInfo_PersonNationality").val($("#ddlPersonNationality").val());

        var formData = $("#myForm").serializeArray();
        $.post("/PatientInfo/RegisterNewPatient", formData, function (data) {
            if (data != null) {
                var status = data.Status;
                var message = data.Message;
                if (status > 0) {
                    ShowMessage("Patient has been registered successfully!", "Success", "success", true);
                    setTimeout(function () {
                        window.location = window.location.protocol + "//" + window.location.host + "/PatientInfo/PatientInfo?patientId=" + status;
                    }, 1000);
                }
                else {
                    if (status == -1)
                        ShowMessage(message, "Duplicate", "warning", true);
                    else
                        ShowErrorMessage(message, "Error", "error", true);
                }
            }
            return false;
        });
    }
    return false;
}

function UpdatePatientInfo() {
    ajaxStartActive = true;
    var isValid = jQuery("#divPatientInfo").validationEngine({ returnIsValid: true });
    if (isValid) {
        var txtContactNumber = $('#txtContactNumber').val();
        if (txtContactNumber != '') {
            var lblPersonContactNumber = $('#lblPersonContactNumber').text();
            $('#CurrentPhone_PhoneNo').val(lblPersonContactNumber + "-" + txtContactNumber);
        }
        var txtPersonVip = $("#CurrentPatient_PatientInfo_PersonVIP").val();
        var isVip = $("#PatientIsVIP")[0].checked;
        var personVip = isVip != null && isVip == true ? (txtPersonVip == '' ? 'true' : txtPersonVip) : null;

        $("#CurrentPatient_PatientInfo_PersonVIP").val(personVip);
        $("#Insurance_InsuranceCompanyId").val($("#ddlPersonInsuranceCompany").val());
        $("#Insurance_InsurancePlanId").val($("#ddlInsurancePlan").val());
        $("#Insurance_InsurancePolicyId").val($("#ddlInsurancePolicy").val());

        if ($("#CurrentPatient_PatientInfo_PersonNationality").val() == '')
            $("#CurrentPatient_PatientInfo_PersonNationality").val($("#ddlPersonNationality").val());


        var formData = $("#myForm").serializeArray();
        $.post("/PatientInfo/UpdatePatientInfo", formData, function (data) {
            if (data != null) {
                var patientId = data.Status;
                var message = data.Message;
                if (patientId > 0) {

                    if (data.Value3 != null && $("#PatientLoginDetail_Id").length > 0)
                        $("#PatientLoginDetail_Id").val(data.Value3);

                    BindInsuranceList(patientId);
                    GetPatientPhones(patientId);

                    $("#Startdate").val($("#Insurance_Startdate").val());
                    $("#Expirydate").val($("#Insurance_Expirydate").val());
                    ShowMessage("Patient Information has been updated successfully!", "Success", "success", true);
                }
                else {
                    if (patientId == -1)
                        ShowMessage(message, "Duplicate", "warning", true);
                    else if (patientId == -3)
                        ShowWarningMessage("Insurance Dates Range are not valid", true);
                    else
                        ShowErrorMessage(message, "Error", "error", true);
                }
            }
            return false;
        });
    }
    return false;
}





/*--------------Sort Encounter Grid--------By krishna on 17082015---------*/
function BindEncounterBySort(event) {
    var url = "/PatientInfo/GetEncountersListView";
    var pId = $("#PatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + pId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#divEncountersList").empty();
            $("#divEncountersList").html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}

/*--------------Sort Patient Attachments--------By krishna on 17082015---------*/
function BindPatientAttachmentsBySort(event) {
    var url = "/PatientInfo/GetPatientAttachmentsPartialView1";
    var pId = $("#PatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + pId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#divDocumentsGrid").empty();
            $("#divDocumentsGrid").html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}

/*--------------Sort Phone Grid--------By krishna on 18082015---------*/
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

function CloseCropPopup() {
    $('#divhidepopup1').hide();

    //$.ajax({
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    url: "/ImagePreview/RemoveImageByteSession",
    //    dataType: "json",
    //    async: false,
    //    data: null,
    //    success: function (data) {
    //        $('#divhidepopup1').hide();
    //    },
    //    error: function (msg) {
    //        $('#divhidepopup1').hide();
    //    }
    //});
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

function InitializeDatesInPatientInfo() {
    //
    $("#Insurance_Startdate").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $("#Insurance_Expirydate").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $("#CurrentPatient_PatientInfo_PersonEmiratesIDExpiration").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $("#CurrentPatient_PatientInfo_PersonPassportExpirtyDate").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $("#CurrentPatient_PatientInfo_PersonBirthDate").datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        closeOnDateSelect: true
    });
}

function ViewTransactions(encounterId, patientId) {
    /// <summary>
    /// Views the transactions.
    /// </summary>
    /// <param name="encounterId">The encounter identifier.</param>
    /// <param name="patientId">The patient identifier.</param>
    /// <returns></returns>
    window.location.href = window.location.protocol + "//" + window.location.host + "/PreliminaryBill/Index?eId=" + encounterId + "&pId=" + patientId;
}


function BindInsuranceList(patientID) {
    var jsonData = JSON.stringify({
        patinetId: patientID
    });
    $.ajax({
        type: "POST",
        url: '/PatientInfo/GetPatientInsuranceInfo',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                $("#CompanyName").val(data.CompanyName);
                $("#PlanName").val(data.PlanName);
                $("#PolicyName").val(data.PolicyName);
                $("#PersonHealthCareNumber").val(data.PersonHealthCareNumber);
                //$("#Expirydate").val();
            }
            else {

            }
        },
        error: function (msg) {
        }
    });
}


function GetPatientPhones(pId) {
    var jsonData = JSON.stringify({
        patientId: pId
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/PatientInfo/GetPatientPhonesBySort',
        dataType: "html",
        async: false,
        data: jsonData,
        success: function (data) {
            $("#divPhoneGrid").empty();
            $("#divPhoneGrid").html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}

function CheckForPatientOpenOrders(pid) {
    var jsonData = JSON.stringify({
        patientId: pid
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Encounter/PatientEncounterOrderPending',
        dataType: "json",
        async: false,
        data: jsonData,
        success: function (data) {
            if (data)
                return true;
            else
                return false;
        },
        error: function (msg) {
            return false;
        }
    });
}

function ShowActiveMotherDropdown() {
    var newBorn = $("#chkNewBaby").is(':checked');
    if (newBorn) {
        $("#divActiveMother").show();
        BindMotherDropdownData();
    }
    else {
        $("#divActiveMother").hide();
    }

}



function BindMotherDropdownData() {
    $.ajax({
        type: "POST",
        url: "/ActiveEncounter/GetActiveMotherDropdownData",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $("#ddlActiveMother").empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, info) {
                items += "<option value='" + info.Value + "'>" + info.Text + "</option>";
            });

            $("#ddlActiveMother").html(items);
        },
        error: function (msg) {

        }
    });
}



function GetMotherName() {
    var patientId = $("#PatientId").val();
    if (patientId > 0) {
        var jsonData = JSON.stringify({
            patientId: patientId
        });
        $.ajax({
            type: "POST",
            url: "/PatientInfo/GetMotherName",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                $("#motherName").text(data);
            },
            error: function (msg) {

            }
        });
    }
}

var VirtualDischargePatient = function (encounterid, patientId, messageid, title, msg) {
    $("#hidVirtualDischargeEncId").val(encounterid);
    $("#hidVirtualDischargePatientId").val(patientId);
    $("#hidVirtualDischargeMessageId").val(messageid);
    $("#h5title").html(title);
    if (msg != '')
        $("#h5Message").html(msg);
    //$.blockUI({ message: $('#divConfirmVirtualDischargeBox'), css: { width: '350px' } });
    //setTimeout($.blockUI({ message: $('#divConfirmVirtualDischargeBox'), css: { width: '350px' } }), 500);

    $("#divConfirmVirtualDischargeBox").modal();
}

function BindPatientDataOnLoad() {
    var patientId = $("#PatientId").val() != "" && $("#PatientId").val() != null ? $("#PatientId").val() : 0;
    $.getJSON("/PatientInfo/GetPatientDataOnLoad", { patientId: patientId }, function (data) {
        BindInsuranceData(data.insList);

        BindCountryCodeData("#ddlPersonNationality", "#CurrentPatient_PatientInfo_PersonNationality", "", data.countryData);
        BindCountryCodeData("#ddlPersonContactNumber", "#CurrentPatient_PatientInfo_PersonNationality", "#lblPersonContactNumber", data.countryData);
        MaskedPhone('#lblPersonContactNumber', "#ddlPersonContactNumber", "#CurrentPhone_PhoneNo");

        $("#txtContactNumber").val($("#CurrentPhone_PhoneNo").val());

        if (data.mName != null && data.mName != "")
            $("#motherName").text(data.mName);
    });
}

function BindInsuranceData(data) {
    var insuranceCompanyHiddenField = "#Insurance_InsuranceCompanyId";
    var insurancePlanHiddenField = "#Insurance_InsurancePlanId";
    var selector = "#ddlPersonInsuranceCompany";
    BindInsuranceDropdownData(data, selector, insuranceCompanyHiddenField);

    var data1 = data;
    if ($(insuranceCompanyHiddenField).val() != '') {
        data1 = data.filter(function (item) { return item.Value != $(insuranceCompanyHiddenField).val(); });
    }
    BindInsuranceDropdownData(data1, "#ddlInsuranceCompany2", "#CompanyId2");

    /*
    Owner: Amit Jain
    On: 27102014
    Purpose: Remove validation of Insurance Plans and policies dropdown controls if Insurance Company is set as Self-Pay in Dropdownlist.
    */
    if ($('#ddlPersonInsuranceCompany').val() == '999') {
        ChangeJqueryValidation('#ddlInsurancePlan', false);
        ChangeJqueryValidation('#ddlInsurancePolicy', false);
        $("#ddlInsurancePlan").empty();
        $("#ddlInsurancePlan").append('<option value="0">--Select--</option>');
        $("#ddlInsurancePolicy").empty();
        $("#ddlInsurancePolicy").append('<option value="0">--Select--</option>');
    }
    else {
        var ddlSelectedInsurance = $("#ddlPersonInsuranceCompany option:selected");
        if (ddlSelectedInsurance != null && ddlSelectedInsurance != '--Select--') {
            var insuranceName = ddlSelectedInsurance.text();
            $("#txtCompanyName").val(insuranceName);
            $(insuranceCompanyHiddenField).val(ddlSelectedInsurance.val());
            //
            var selectedPlanId = '';
            if ($(insurancePlanHiddenField).val() != '')
                selectedPlanId = $(insurancePlanHiddenField).val();
            BindCompanyInsurancePlans(ddlSelectedInsurance.val(), selectedPlanId);
            BindCompanyInsurancePlan2($("#CompanyId2").val());
            BindInsurancePolicies2($("#Plan2").val());
        }
    }
}











function RegisterNewPatientOld() {
    ajaxStartActive = true;
    var isValid = jQuery("#divPatientInfo").validationEngine({ returnIsValid: true });
    if (isValid) {
        var txtContactNumber = $('#txtContactNumber').val();
        if (txtContactNumber != '') {
            var lblPersonContactNumber = $('#lblPersonContactNumber').text();
            $('#CurrentPatient_PatientInfo_PersonContactNumber').val(lblPersonContactNumber + "-" + txtContactNumber);
        }
        var txtPersonVip = $("#CurrentPatient_PatientInfo_PersonVIP").val();
        var isVip = $("#PatientIsVIP")[0].checked;
        var personVip = isVip != null && isVip == true ? (txtPersonVip == '' ? 'true' : txtPersonVip) : null;

        $("#CurrentPatient_PatientInfo_PersonMotherName").val($("#ddlActiveMother").val());
        $("#CurrentPatient_PatientInfo_PersonVIP").val(personVip);
        $("#Insurance_InsuranceCompanyId").val($("#ddlPersonInsuranceCompany").val());
        $("#Insurance_InsurancePlanId").val($("#ddlInsurancePlan").val());
        $("#Insurance_InsurancePolicyId").val($("#ddlInsurancePolicy").val());

        $("#Insurance_CompanyId2").val($("#ddlInsuranceCompany2").val());
        $("#Insurance_Plan2").val($("#ddlInsurancePlan2").val());
        $("#Insurance_Policy2").val($("#ddlInsurancePolicy2").val());

        /*Document Upload Start*/
        var docId = $("#ddlDocumentType").val();
        $("#DocumentsAttachment_DocumentTypeID").val(docId);
        var txtDocumentName = $("#ddlDocumentType :selected").text();
        $("#DocumentsAttachment_DocumentName").val(txtDocumentName);
        $("#DocumentsAttachment_DocumentNotes").val(txtDocumentName);
        /*Document Upload Start END*/


        /* Address & Contacts Section  Start*/

        $("#CurrentPatientAddressRelation_PatientAddressRelationID").val(0);
        $("#CurrentPatientAddressRelation_PatientAddressRelationType").val($("#ddlPersonRelation").val());
        $("#CurrentPatientAddressRelation_FirstName").val($("#AddressRelationFirstName").val());
        $("#CurrentPatientAddressRelation_LastName").val($("#AddressRelationLastName").val());
        var addressRelationIsPrimary = $("#chkIsPrimary")[0].checked;
        $("#CurrentPatientAddressRelation_IsPrimary").val(addressRelationIsPrimary);
        $("#CurrentPatientAddressRelation_StreetAddress1").val($("#AddressRelationStreetAddress1").val());
        $("#CurrentPatientAddressRelation_StreetAddress2").val($("#AddressRelationStreetAddress2").val());
        $("#CurrentPatientAddressRelation_POBox").val($("#AddressRelationPOBox").val());
        $("#hdCountry").val($("#ddlCountries").val());
        $("#hdState").val($("#ddlStates").val());
        $("#hdCity").val($("#ddlCities").val());
        $("#CurrentPatientAddressRelation_ZipCode").val($("#AddressRelationZipCode").val());

        /* Address & Contacts Section END */


        /* Insurance Company Tab Start*/
        $("#Insurance_CompanyName").val($("#IsuranceCompanyName").val());
        $("#Insurance_Startdate").val($("#InsStartDate").val());
        $("#Insurance_Expirydate").val($("#InsEndtDate").val());
        $("#Insurance_PatientInsuranceId2").val($("#ddlInsuranceCompany2").val());
        $("#Insurance_CompanyId2").val($("#ddlInsuranceCompany2").val());
        $("#Insurance_PersonHealthCareNumber2").val($("#IsuranceCompanyPersonHealthCareNumber2").val());
        $("#Insurance_Plan2").val($("#ddlInsurancePlan2").val());

        $("#Insurance_StartDate2").val($("#IsuranceCompanyPersonHealthStartDate2").val());
        $("#Insurance_EndDate2").val($("#IsuranceCompanyPersonHealthEndDate2").val());

        /* Insurance Company Tab END*/

        if ($("#CurrentPatient_PatientInfo_PersonNationality").length > 0 && $("#CurrentPatient_PatientInfo_PersonNationality").val() == '')
            $("#CurrentPatient_PatientInfo_PersonNationality").val($("#ddlPersonNationality").val());

        var formData = $("#myForm").serializeArray();
        $.post("/PatientInfo/RegisterNewPatient", formData, function (data) {
            if (data != null) {
                var patientId = data.patientId;
                var status = data.status;
                if (patientId > 0 && status == "success") {
                    //BindSecondInsuranceList(patientId);
                    ShowMessage("Patient has been registered successfully!", status, status, true);
                    setTimeout(function () {
                        window.location = window.location.protocol + "//" + window.location.host + "/PatientInfo/PatientInfo?patientId=" + patientId;
                    }, 1000);

                    //BindSecondInsuranceList(patientId);
                }
                else if (status == "duplicate") {
                    ShowMessage("Emirate Id already exist!", "Warning", "warning", true);//Emirate ID Number
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").val('');
                    $("#txtPersonLastName").val('');
                    $("#CurrentPatient_PatientInfo_PersonBirthDate").val('');
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").focus();
                } else if (status == "error") {
                    ShowErrorMessage("Something went wrong while saving patient information. Please try again later!", true);
                }
                else if (status == "duplicatememberid") {
                    ShowMessage("This Member ID already belongs to some other patient!", "Alert", "warning", true);
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").focus();
                }
                else if (status == "duplicateemail") {
                    ShowMessage("This Email already belongs to some other patient!", "Alert", "warning", true);
                    $("#PatientLoginDetail_Email").focus();
                }
                else if (status == "duplicatepassport") {
                    ShowMessage("This Passport Number already belongs to some other patient!", "Alert", "warning", true);
                }
                else if (status == "duplicateUser") {
                    ShowMessage("These Details already belongs to some other patient!", "Alert", "warning", true);
                } else {
                    ShowErrorMessage("Error while saving patient information. Please try again later!", true);
                }
            }
            return false;
        });
        return false;
    }
    return false;
}
function UpdatePatientInfoOld() {
    ajaxStartActive = true;
    var isValid = jQuery("#divPatientInfo").validationEngine({ returnIsValid: true });
    if (isValid) {
        var txtContactNumber = $('#txtContactNumber').val();
        if (txtContactNumber != '') {
            var lblPersonContactNumber = $('#lblPersonContactNumber').text();
            $('#CurrentPhone_PhoneNo').val(lblPersonContactNumber + "-" + txtContactNumber);
        }
        var txtPersonVip = $("#CurrentPatient_PatientInfo_PersonVIP").val();
        var isVip = $("#PatientIsVIP")[0].checked;
        var personVip = isVip != null && isVip == true ? (txtPersonVip == '' ? 'true' : txtPersonVip) : null;

        $("#CurrentPatient_PatientInfo_PersonVIP").val(personVip);
        $("#Insurance_InsuranceCompanyId").val($("#ddlPersonInsuranceCompany").val());
        $("#Insurance_InsurancePlanId").val($("#ddlInsurancePlan").val());
        $("#Insurance_InsurancePolicyId").val($("#ddlInsurancePolicy").val());

        if ($("#CurrentPatient_PatientInfo_PersonNationality").val() == '')
            $("#CurrentPatient_PatientInfo_PersonNationality").val($("#ddlPersonNationality").val());


        var formData = $("#myForm").serializeArray();
        $.post("/PatientInfo/UpdatePatientInfo", formData, function (data) {
            if (data != null) {
                var patientId = data.patientId;
                var status = data.status;
                if (patientId > 0 && status == "success") {
                    if (data.loginId != null && $("#PatientLoginDetail_Id").length > 0)
                        $("#PatientLoginDetail_Id").val(data.loginId);
                    BindInsuranceList(patientId);
                    GetPatientPhones(patientId);
                    $("#Startdate").val($("#Insurance_Startdate").val());
                    $("#Expirydate").val($("#Insurance_Expirydate").val());
                    ShowMessage("Patient Information has been updated successfully!", status, status, true);
                }
                else if (status == "duplicate") {
                    ShowMessage("This user already exists in the System!", "Alert", "warning", true);//Emirate ID Number
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").val('');
                    $("#txtPersonLastName").val('');
                    $("#CurrentPatient_PatientInfo_PersonBirthDate").val('');
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").focus();
                } else if (status == "error") {
                    ShowErrorMessage("Something went wrong while updating the patient information. Please try again later!", true);
                }
                else if (status == "duplicatememberid") {
                    ShowMessage("This Member ID already belongs to some other patient!", "Alert", "warning", true);
                    $("#CurrentPatient_PatientInfo_PersonEmiratesIDNumber").focus();
                }
                else if (status == "duplicateemail") {
                    ShowMessage("This Email already belongs to some other patient!", "Alert", "warning", true);
                    $("#PatientLoginDetail_Email").focus();
                }
                else {
                    ShowErrorMessage("Error while updating the patient information. Please try again later!", true);
                }
            }
            return false;
        });
        return false;
    }
    return false;
}