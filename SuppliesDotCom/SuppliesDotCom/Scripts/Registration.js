


$(document).ready(function () {
    //$('#AdditionalContactCountry').change(function (e) {
    //    
    //  var bal=  $("#AdditionalContactCountry option:selected").text();        
    //    if (bal == "United Arab Emirates") {
    //        $("#AdditionalContactEmirateState").css("visibility", "visible");
    //        $("#lblemirates").css("visibility", "visible");
    //    }
    //    else{
    //        $("#AdditionalContactEmirateState").css("visibility", "hidden");
    //        $("#lblemirates").css("visibility", "hidden");
    //    }

    //});


    $(".PhoneMask").mask("999-9999999");
    $(".EmiratesMask").mask("999-99-9999");



    $('#IsVIP').change(function () {

        var url = '';
        var showandhide = $(this).is(':checked');

        if ($(this).is(':checked')) {
            $("#PersonVIP").css("visibility", "visible");

        }
        else {
            $("#spVIP").text("");
            $("#PersonVIP").css("visibility", "hidden");
        }
    });

    $("#PersonEmiratesIDExpiration").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });
    $("#PersonBirthDate").datepicker({
        yearRange: "-130: +0",
        changeMonth: true,
        dateFormat: 'dd/mm/yy',
        changeYear: true
    });
    $("#EncounterAccidentDate").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#PersonEligibilityStartDate").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });
    $("#PersonEligibilityEndDate").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });

    $("#PersonHusbandPassportExpiry").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });

    $("#PersonHealthCardExpiryDate").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });

    $(".EncounterAccidentDate").datepicker({
        changeMonth: true,
        changeYear: true
    });

    $("#PolicyBeginDate").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });

    $("#PolicyEndDate").datepicker({
        yearRange: "-0:+20",
        changeMonth: true,
        changeYear: true
    });
    //$("#PersonEmiratesIDExpiration, #PersonBirthDate").calendar();


    $('#tabs').tabs({
        activate: function (event, ui) {
            //console.log(event);
            // console.log(ui.newTab.index());
            // alert(ui.newTab.index());

            if (ui.newTab.index() == 0) {

            }
            else if (ui.newTab.index() == 1) {

            }
            else if (ui.newTab.index() == 2) {

            }
            else if (ui.newTab.index() == 3) {

            }
            else if (ui.newTab.index() == 4) {

            }
            else {

            }



        }
    });



});

function CheckCountry(country, state, lbl) {
    var countryname = $("#" + country + " option:selected").text();
    if (countryname == "United Arab Emirates") {
        var statename = $("#" + state).val();
        if (statename == "") {
            $("#" + lbl).text("Please select state.");
            return false;
        }
        else {
            $("#" + lbl).text("");
        }
    }

    $("#IsDrafted").val('false');
}

function SelectCode(phoneid, dropdwnid, lblmsg) {
    var reg = /^[0-9]{3}\-[0-9]{7}$/;

    if ($("#" + dropdwnid).val() == 0) {
        $("#" + lblmsg).text("Please select country code.");
        $("#" + phoneid).val("");
    }
    else {
        if (!reg.test($("#" + phoneid).val())) {
            $("#" + lblmsg).text("Please enter correct format of phone number.");
        }
        else {
            $("#" + lblmsg).text("");
        }
    }
}

function HideAndShowStates(country, state, label, lblstate) {

    var bal = $("#" + country + " option:selected").text();
    if (bal == "United Arab Emirates") {
        $("#" + state).css("visibility", "visible");
        $("#" + label).css("visibility", "visible");
    }
    else {
        $("#" + state).css("visibility", "hidden");
        $("#" + label).css("visibility", "hidden");
        $("#" + lblstate).text("");
    }
}

function CheckDates(date1, date2, spanid) {

    var Date1 = new Date($("#" + date1).val());

    var Date2 = new Date($("#" + date2).val());



    if (Date1 > Date2) {

        $("#" + spanid).text("End date should greater than start date.");
        return false;

    }
    else {
        $("#" + spanid).text("");
        return true;
    }
}

function CalculateAge(birthday) {



    //var re = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;
    var date1 = birthday.value.split('/');
    var newdate = date1[1] + "/" + date1[0] + "/" + date1[2];
    if (birthday.value != '') {

        //if (re.test(birthday.value)) {
        birthdayDate = new Date(newdate);
        dateNow = new Date();
        var years = (dateNow.getFullYear() + 2) - birthdayDate.getFullYear();
        var months = dateNow.getMonth() - birthdayDate.getMonth();
        var days = dateNow.getDate() - birthdayDate.getDate();
        if (isNaN(years)) {
            $("#PersonAge").val('');
            //document.getElementById('lblAge').innerHTML = '';
            document.getElementById('lblError').innerHTML = 'Birth date is incorrect!';
            return false;
        }

        else {
            document.getElementById('lblError').innerHTML = '';

            if (months < 0 || (months == 0 && days < 0)) {
                years = parseInt(years) - 1;
                $("#PersonAge").val(years);
                //document.getElementById('PersonAge').innerHTML = years + ' Years '
            }
            else {
                $("#PersonAge").val(years);
                //document.getElementById('lblAge').innerHTML = years + ' Years '
            }
        }
        //}
        //else {
        //document.getElementById('lblError').innerHTML = 'Date must be mm/dd/yyyy format';
        // return false;
        //}
    }
}


//get file path from client system
function getNameFromPath(strFilepath) {


    var objRE = new RegExp(/([^\/\\]+)$/);
    var strName = objRE.exec(strFilepath);

    if (strName == null) {
        return null;
    }
    else {

        return strName[0];
    }
}


function CheckRegistrationControls() {

    $("#lblMessage").css("display", "block");

    return ValidateEmirateId1('PersonEmiratesIDNumber');
}

function CheckRegistrationControlsForUpdate() {
    // $('#loading').show();
}

function checkexcelfileformat(id) {


    var file = getNameFromPath($("#" + id.id).val());
    var flag;
    if (file != null) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        // alert(extension);
        switch (extension) {
            case 'xlsx':
                flag = true;
                break;
            default:
                flag = false;
        }
    }
    if (flag == false) {
        //alert("You can upload only jpg,png,gif,bmp, jpeg extension file");
        $("#sp" + id.id).text("You can upload only .xlsx extension file");
        $("#" + id.id).val("");
        return false;
    }
    else {

        readURL(id);
        $("#sp" + id.id).text("");
        return true;

    }
}

function checkpersonfile(id) {


    var file = getNameFromPath($("#" + id.id).val());
    var flag;
    if (file != null) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        // alert(extension);
        switch (extension) {
            case 'jpg':
            case 'png':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'JPG':
                flag = true;
                break;
            default:
                flag = false;
        }
    }
    if (flag == false) {
        //alert("You can upload only jpg,png,gif,bmp, jpeg extension file");
        $("#sp" + id.id).text("You can upload only .jpg, .png, .gif, .bmp extension file");
        $("#" + id.id).val("");
        return false;
    }
    else {

        readURL(id);
        $("#sp" + id.id).text("");
        return true;
        // var size = GetFileSize('Property_Brochure_Name');
        //if (size > 3) {
        // $("#spanfile").text("You can upload file up to 3 MB");
        //return false;
        // }
        //else {
        //$("#spanfile").text("");
        // }
    }
}

function checkfile(id) {


    var file = getNameFromPath($("#" + id).val());
    var flag;
    if (file != null) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        // alert(extension);
        switch (extension) {
            case 'pdf':
                flag = true;
                break;
            default:
                flag = false;
        }
    }
    if (flag == false) {
        //alert("You can upload only jpg,png,gif,bmp, jpeg extension file");
        $("#sp" + id).text("You can upload only .pdf extension file");
        $("#" + id).val("");
        return false;
    }
    else {
        $("#sp" + id).text("");
        return true;
        // var size = GetFileSize('Property_Brochure_Name');
        //if (size > 3) {
        // $("#spanfile").text("You can upload file up to 3 MB");
        //return false;
        // }
        //else {
        //$("#spanfile").text("");
        // }
    }
}

function CheckIfPdfFilesBrochure(name) {
    var flag;
    var file = getNameFromPath($("#" + name).val());
    if (file != null) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        switch (extension) {
            case 'pdf':
                flag = true;
                break;
            default:
                flag = false;
        }
    }
    if (flag == false) {
        $("#spProperty_Brochure_Name").text("You can upload only pdf extension file");
        $("#Property_Brochure_Name").val("");
        return false;
    }
    else {
        return true;
    }
}

function ValidateControl() {
    return ValidateEmirateId('PersonEmiratesIDNumber');
}

function ValidateEmirateId(id) {

    var _ID = $("#" + id).val();

    var reg = /^[0-9]{3}\-[0-9]{4}\-[0-9]{7}\-[0-9]{1}$/;

    if (!reg.test(_ID)) {

        //$("#" + id).css("border", "1px solid red");
        $("#sp" + id).text("Please enter valid number.");
        return false;
    }
    else {
        $("#sp" + id).text("");
        checkDuplicateEmirateID(id);

        if ($("#PersonAge").val() <= 0) {
            $("#lblAgeerror").text("Please enter valid birth date.");
            return false;
        }
        else {
            $("#lblAgeerror").text("");
        }


    }

}

function ValidateEmirateId1(id) {

    var _ID = $("#" + id).val();

    var reg = /^[0-9]{3}\-[0-9]{4}\-[0-9]{7}\-[0-9]{1}$/;

    if (!reg.test(_ID)) {

        //$("#" + id).css("border", "1px solid red");
        if (_ID == "") {
            return true;
        }
        else {
            $("#sp" + id).text("Please enter valid number.");
            return false;
        }

    }
    else {
        $("#sp" + id).text("");
        checkDuplicateEmirateID(id);

        if ($("#PersonAge").val() <= 0) {
            if ($("#PersonBirthDate").val() == "") {
            }
            else {
                $("#lblAgeerror").text("Please enter valid birth date.");
            }
            return false;
        }
        else {
            $("#lblAgeerror").text("");
        }

        if ($("#IsVIP").is(':checked')) {
            if ($("#PersonVIP").val() == "") {
                $("#spVIP").text("Please enter description.");
                return false;
            }
            else {
                $("#spVIP").text("");
            }

        }


    }
    //if (true) {
    //    $('#loading').show();
    //    $("#overlay").unbind("click");
    //}

}

function ValidateEmirateIdForLogin(id) {

    var _ID = $("#" + id).val();

    var reg = /^[0-9]{3}\-[0-9]{4}\-[0-9]{7}\-[0-9]{1}$/;

    if (!reg.test(_ID)) {

        //$("#" + id).css("border", "1px solid red");
        $("#sp" + id).text("Please enter valid number.");
        return false;
    }
    else {
        $("#sp" + id).text("");
        // checkDuplicateEmirateID(id);

    }

}

function CheckDuplicateValue(id, url, msg) {
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            value: $("#" + id).val()
        }),
        success: function (data) {

            if (data) {
                $("#sp" + id).text(msg);
            }
            else {
                $("#sp" + id).text("");
            }
        },
        error: function (msg) {

        }
    });
}
function CheckIfEncountersOpens(PatientID, url) {

    $.ajax({
        type: "POST",
        url: '/Home/CheckIfEncountersOpens',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            Id: PatientID
        }),
        success: function (data) {

            if (data) {
                alert('There is already opened encounter with this patient');
            }
            else {
                window.location.href = url;
            }


        },
        error: function (msg) {

        }
    });
}




function checkDuplicateEmirateID(id) {

    $.ajax({
        type: "POST",
        url: '/Home/CheckDuplicateEmirateId',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            emirateNumber: $("#" + id).val(),
            'patientID': $("#PatientID").val()
        }),
        success: function (data) {

            if (data) {
                $("#sp" + id).text("Emirate ID Number already exist.");
            }
            else {
                $("#sp" + id).text("");
            }


        },
        error: function (msg) {

        }
    });
}



function checkDuplicatePassportNumber(id) {

    total = parseInt($("#" + id).val());
    if (isNaN(total) == false) {
        $.ajax({
            type: "POST",
            url: '/Home/CheckDuplicatePassportNumber',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                passportNumber: $("#" + id).val(),
                'patientID': $("#PatientID").val()
            }),
            success: function (data) {

                if (data) {
                    $("#sp" + id).text("Passport Number already exist.");
                }
                else {
                    $("#sp" + id).text("");
                }


            },
            error: function (msg) {

            }
        });
    }
}

/*
* Owner: Shashank Awasthy
* On: 11092014
* Purpose: Get the payer id in the using the insurance company selection.
*/
function BindPayerID() {

    var selVal = $('#InsuranceCompanyName :selected').val();
    if (selVal !== "" && selVal !== '0') {
        $.ajax({
            type: "POST",
            url: '/Home/GetInsuranceCompanyPayer',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                'InsuranceCompanyNumber': selVal
            }),
            success: function (data) {

                $("#txtPersonPayerID").val(data);
            },
            error: function (msg) {
            }
        });
    }
    else {
        $("#txtPersonPayerID").val();
    }
}

/*
* Owner: Shashank Awasthy
* On: 11092014
* Purpose: Get the payer id in the using the insurance company selection.
*/
function CheckForInpatientEncounter(PatientID, url) {

    $.ajax({
        type: "POST",
        url: '/Home/CheckForActiveEncounter',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            'patientId': PatientID
        }),
        success: function (data) {
            if (data) {
                if (data === "inpatient")
                    window.location.href = url;
            }
        },
        error: function (msg) {

        }
    });
}

/*
* Owner: Shashank Awasthy
* On: 11092014
* Purpose: Get the payer id in the using the insurance company selection.
*/
function CheckForOutPatientEncounter(PatientID, url) {

    $.ajax({
        type: "POST",
        url: '/Home/CheckForActiveEncounter',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            'patientId': PatientID
        }),
        success: function (data) {
            if (data) {
                if (data === "outpatient")
                    window.location.href = url;
            }
        },
        error: function (msg) {

        }
    });
}
