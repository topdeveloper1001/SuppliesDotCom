var IsDirty = false;
var Default_Button = null;
//Adding keypress event on document to set up the default button click
//$(document).bind('keypress', null, function (e) {

//    if (e.keyCode == 13) {

//        if (Default_Button)
//            Default_Button.click();
//        e.preventDefault();
//    }
//}
//        );

function SetDefaultButton(btn) {
    $(document).bind('keypress', null, function (e) {

        if (e.keyCode == 13) {

            if (Default_Button)
                Default_Button.click();
            e.preventDefault();
        }
    }
        );
    ///<summary>set the default button on the page.When enter key is pressed the default button's click event is raised </summary>
    ///<param name="btn">client id of the button </param>
    Default_Button = $get(btn);
}

//This function displays progress bar
function overlay() {
    $('#overlay').show();
    $('body').css("overflow", "hidden");
    //setTimeout('document.images["myAnimatedImage"].src = "images/loader.gif"', 200);
    $('#overlay').css("top", document.documentElement.scrollTop + 'px');
}

//This function hide the progress bar after processing
function overlayhide() {
    $('body').css("overflow", "auto");
    $('#overlay').hide();
    //$("#overlay").css("top", document.documentElement.scrollTop);
}






//This function'll validate controls on save
function validationmsg(val) {
    jAlert(val + CommanMessage.IsRequired);

}


function AttachMethodForDirtyCheck() {
    $('input').not('[type=button]').each(function () { $(this).bind("change", function () { SetDirty(); }); });
    $('select').each(function () { $(this).bind("change", function () { SetDirty(); }); });
    $('textarea').each(function () { $(this).bind("change", function () { SetDirty(); }); });
}

function SetDirty() {
    IsDirty = true;
}

//16072013
//Reason: To unset the dirty Bit after operations like save, update.
//Scope: Insert function is defind in the code
function UnSetDirty() {
    IsDirty = false;
}
//end

function checkDirty(screenID, url) {

    var resolveUrl = $("#hdnResolveUrl").val();

    if (IsDirty == true) {
        return jConfirm(CommanMessage.UnsavedData, CommanMessage.ConfirmTitle, function (result) {
            if (result) {
                IsDirty = false;

                OpenPage(screenID, resolveUrl);
                // window.location.href = url;


            }
            else

                return false;
        });
    }
    else {
        OpenPage(screenID, resolveUrl);
        //window.location.href = url;
    }
}

function checkDirtyApprovalSteps(screenID, url) {
    var resolveUrl = $("#hdnResolveUrl").val();

    if (IsDirty == true) {
        return jConfirm(CommanMessage.UnsavedData, CommanMessage.ConfirmTitle, function (result) {
            if (result) {
                IsDirty = false;
                OpenLoanApprovalPage(screenID, resolveUrl);
            }
            else

                return false;
        });
    }
    else {
        OpenLoanApprovalPage(screenID, resolveUrl);
    }
}
function DetachValidation() {
    try {
        jQuery("#form1").validationEngine("detach");
    }
    catch (e) {
    }
}

function showMessage(text) {
    $(".Divmessage").html(text);
    $(".Divmessage").show();
    $(".Divmessage").fadeOut(2500);
}


function TextAreaValid(e, MaxValue) {
    try {
        //var max = parseInt($(e).attr('maxlength'));
        var max = MaxValue;
        if ($(e).val().length > max) {
            $(e).val($(e).val().substr(0, max));
            return false;
        }
        else {
            return true;
        }
    }
    catch (ex) {

        return false;
    }
}

function SetMenuActive() {
    var href = window.location.pathname.toLowerCase();
    if (href.indexOf("dashboard")) {
        $("#li_Dashboard").attr("class", "active");
    }
    else if (href.indexOf("clientaddress.aspx") > 0 || href.indexOf("clientbankinfo.aspx") > 0 || href.indexOf("clientdocuments.aspx") > 0 || href.indexOf("clientemployerinfo.aspx") > 0 || href.indexOf("clienthomerefrence.aspx") > 0 || href.indexOf("clientinfo.aspx") > 0 || href.indexOf("clientphoneinfo.aspx") > 0 || href.indexOf("clientsearch.aspx") > 0 || href.indexOf("clientquestions.aspx") > 0 || href.indexOf("financialinfo.aspx") > 0 || href.indexOf("clientsummary.aspx") > 0 || href.indexOf("loanlist.aspx") > 0) {
        $("#li_client").attr("class", "active");
    }
}

//This function will convert phone to US Phone format
function toUSPhoneFormat(phone) {
    if (phone != null) {
        arrChars = phone.split('');
        formatedString = '';
        if (phone.length <= 10 && phone.length >= 7) {
            for (i = 0; i < phone.length; i++) {
                if (i == 0)
                    formatedString += '(';
                if (i == 3)
                    formatedString += ') ';
                if (i == 6)
                    formatedString += '-';

                formatedString += arrChars[i];
            }
            return formatedString;

        }
        else {
            return phone;
        }
    }
}

//This function will convert phone to US Phone format
function fromUSPhoneToStringFormat(phone) {
    if (phone != null) {
        if (phone.length >= 10) {

            var strPhone = phone.replace(/[^a-zA-Z0-9]+/g, '');
            return strPhone;
        }
        else {
            return phone;
        }
    }
}

//This function change first letter to upper case
function capitaliseFirstLetter(obj) {
    //changeCheck();
    return $(obj).val($(obj).val().charAt(0).toUpperCase() + $(obj).val().slice(1));
}






//////////////
function checkEmployerName(obj) {
    var txtValue = obj.value;
    var countryid = $('#dropdown_Country').val();
    CommonWebServices.CheckEmployerAlreadyExist(txtValue, countryid, onsuccessEmployerName, onfailure);
}
function onsuccessEmployerName(result) {
    if (result != false) {
        jAlert(CommanMessage.EmployerAlreadyExist);

        return false;
    }

}


//This function will trim empty space from a field
function trimSpace(field) {
    field.value = field.value.replace(/\s/g, '');
}

function checkMinValue(min, max, type) {
    if (type == 'min') {
        if (parseFloat($(min).val()) > parseFloat(max.val())) {
            jAlert(CommanMessage.NotLessMinValue);
            $(min).val("");
            return false;
        }
    }
    else {
        if (parseFloat(min.val()) > parseFloat($(max).val())) {
            jAlert(CommanMessage.NotGreaterMaxValue);
            $(max).val("");
            return false;
        }
    }
}


function checkDatesFormat(startdata, enddate, selectedType) {
    if (startdata != "" && enddate != "") {

        //Checke valid From date --------------------
        if (startdata.val() != "") {
            var validDate = startdata.val().split('/');
            if (parseInt(validDate[2], 10) < 1900) {
                startdata.val('');
                startdata.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
            var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
            if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
                startdata.val('');
                startdata.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
        }
        //------------------------------------------
        //Checke valid end date --------------------
        if (enddate.val() != "") {
            var validDate = enddate.val().split('/');
            if (parseInt(validDate[2], 10) < 1900) {
                enddate.val('');
                enddate.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
            var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
            if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
                enddate.val('');
                enddate.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
        }
        //------------------------------------------

        if (selectedType == 1) {
            startdata.focus();
        }
        else {
            enddate.focus();
        }

        var srdate = new Date(startdata.val());
        var eddate = new Date(enddate.val());
        if (srdate > eddate) {
            enddate.val("");
            jAlert(CommanMessage.StartDateVsEndDate);
            enddate.focus();
            return false;
        }
        else {
            return true;
        }

    }
}




//This function will check dates ie start date and end date
function checkDates(startdata, enddate) {
    if (startdata != "" && enddate != "") {

        //Checke valid From date --------------------
        if (startdata.val() != "") {
            var validDate = startdata.val().split('/');
            if (parseInt(validDate[2], 10) < 1900) {
                startdata.val('');
                startdata.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
            var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
            if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
                startdata.val('');
                startdata.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
        }
        //------------------------------------------
        //Checke valid end date --------------------
        if (enddate.val() != "") {
            var validDate = enddate.val().split('/');
            if (parseInt(validDate[2], 10) < 1900) {
                enddate.val('');
                enddate.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
            var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
            if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
                enddate.val('');
                enddate.focus();
                jAlert(CommanMessage.InvalidDate);
                return false;
            }
        }
        //------------------------------------------

        var srdate = new Date(startdata.val());
        var eddate = new Date(enddate.val());
        if (srdate > eddate) {
            enddate.val("");
            jAlert(CommanMessage.StartDateVsEndDate);
            enddate.focus();
            return false;
        }
        else {
            return true;
        }
    }
}

//Redirect Url to LoanTypeStep 
function CheckStep(screenID) {
    if (screenID != 0) {
        OpenPage(screenID, "");
    }
}
function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}

function CommaFormattedWithoutDecimal(amount) {
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    amount = n;
    //    if (d.length < 1) { amount = n; }
    //    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}

function CurrencyFormat(field) {
    var currency = parseFloat(field.value.replace(',', '')).toFixed(2);
    field.value = CommaFormatted(currency);
}



function trimvalue(control) {
    var controlid = control.id;
    control.value = control.value.trim();
    return true;
}

//This function will remove special character
function RemoveSpecialCharacter(obj) {
    var strval = $(obj).val().replace(/[^a-zA-Z0-9]+/g, '');
    $(obj).val(strval)
}

function CheckNumeric(obj) {
    var strval = $(obj).val().replace(/[^a-zA-Z0-9]+/g, '');
    if (isNaN(strval) == true) {
        $(obj).val('')
    }
    else {
        $(obj).val(strval)
    }
}

//This function will remove all except character
function RemoveAllExceptCharacter(obj) {
    var strval = $(obj).val().replace(/[^a-zA-Z]+/g, '');
    $(obj).val(strval)
}




/// This method is used to check valid date
function CheckValidDate(obj) {
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        return true;
    }
}

/// This method is used to check valid date Not Less Than Today Date
function CheckValidDateNotLessThanTodayDate(obj) {
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }

        var CurrentDate = new Date(parseInt(new Date().getFullYear(), 10), parseInt(new Date().getMonth(), 10), parseInt(new Date().getDate(), 10));
        if (dt < CurrentDate) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.ValidDateNotLessThanTodayDate);
            return false;
        }
        return true;
    }
}

///This method is used to check valid date of birth
function CheckValidDateOfBirth(obj) {
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        var ActualYear = parseInt(validDate[2], 10) + 18;
        var ActualMonth = parseInt(validDate[0], 10);
        var ActualDay = parseInt(validDate[1], 10);

        var CurrentYear = new Date().getFullYear();
        var CurrentMonth = new Date().getMonth();
        var CurrentDay = new Date().getDay();

        var AD = new Date(ActualMonth + "/" + ActualDay + "/" + ActualYear);
        var CD = new Date();

        //        if (CurrentYear >= ActualYear && ActualMonth <= CurrentMonth && ActualDay <= CurrentDay) {
        //            return true;
        //        }
        if (AD <= CD) {
            return true;
        }
        else {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDateOfBirth);
            return false;
        }
        return true;
    }
}

///This method is used to check valid expiry date
function CheckValidExpiryDate(obj) {
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidDate);
            return false;
        }
        var ExpiryDate = new Date(obj.value);
        var CurrentDate = new Date();
        if (ExpiryDate > CurrentDate) {
            return true;
        }
        else if (ExpiryDate.toDateString() == CurrentDate.toDateString()) {
            return true;
        }
        else {
            obj.value = "";
            obj.focus();
            jAlert(CommanMessage.InvalidExpiryDate);
            return false;
        }
        return true;
    }
}





function DisplayGray() {

    $('input[disabledgray]').each(function () {
        $('input[disabledgray]').removeClass('button');
        $('input[disabledgray]').addClass('gray');
        $('input[disabledgray]').next().removeClass();
    });
}


/*Global Code Category 70*/
LoanStatementDocumentType = new function () {
    this.LSDocType = 1041;

}
ImportantNoticetDocumentType = new function () {
    this.INMissedPaymentDocType = 1111;
    this.INAccountDelinquentDocType = 1112;
    this.INUrgentNoticeDocType = 1113;
    this.INDemandLetterDocType = 1114;
}

function checkonlysymbols(con) {
    var str = con.val();
    if (str.match(/^[^A-Z0-9]*$/i)) {
        alert(' Special characters are Invalid');
        con.val("");
    }
    //            else { 
    //               alert('Valid'); 
    //            }
}

