var homeUrl = "/Home/";
var sess_pollInterval = 30000;
var sess_expirationMinutes = 10.00;
var sess_intervalID;
var sess_lastActivity;
var sess_over = sess_over == true ? true : false;
var site = site || {};
var isSessionOutMessage = true;

site.baseUrl = site.baseUrl || "";

$(function () {

    var buttonKeys = { "EnterKey": 13 };
    $("#divSessionPoup").keypress(function (e) {
        if (e.which == buttonKeys.EnterKey) {
            $("#btnSessionTimeOut").click();
        }
    });


    $('#btnSessionTimeOut').on('click', function () {
        isSessionOutMessage = true;
        window.location.href = window.location.protocol + "//" + window.location.host + homeUrl + "LogOff";
        return false;
    });


    $(".PhoneMask").mask("999-9999999");
    //$('.table').find('a').on('click', function(e) {
    //    $('.table').find('a').closest('tr').removeClass('highlighted_row');
    //    $(this).closest('tr').addClass('highlighted_row');
    //});
    //$(".licType").mask("********************");
    $(".collapseTitle").bind("click", function () {
        $.validationEngine.closePrompt(".formError", true);
    });
    $(".PatientAddressInfo").bind("click", function () {

        $.validationEngine.closePrompt(".formError", true);
    });
    //$('a[title]').qtip();
    InitializeDateTimePicker();
    //$(window).scroll(function () { $.validationEngine.closePrompt(".formError", true); });
    InitializeSession();

    $(".partialContents").each(function (index, item) {
        var url = site.baseUrl + $(item).data("url");
        if (url && url.length > 0) {
            $(item).load(url);
        }
    });

    if (isEmpty("#superPowersDiv")) {
        $("#superPowersDiv").hide();
    }

    //$("#StartDate2").datepicker().datepicker("setDate", new Date());
    //$("#EndDate2").datepicker().datepicker("setDate", new Date());
    ///// <summary>
    ///// s this instance.
    ///// </summary>updated on 07082015 by krishna on 13072015
    ///// <returns></returns>
    //$('#StartDate2').datetimepicker({
    //    format: 'm/d/Y',
    //    onShow: function (ct) {
    //        this.setOptions({
    //            maxDate: $('#EndDate2').val() ? $('#EndDate2').val() : false
    //        });
    //    },
    //    timepicker: false
    //});
    //$('#EndDate2').datetimepicker({
    //    format: 'm/d/Y',
    //    onShow: function (ct) {
    //        this.setOptions({
    //            minDate: $('#StartDate2').val() ? $('#StartDate2').val() : false
    //        });
    //    },
    //    timepicker: false
    //});

    $('.panel-heading').on('click', function () { $.validationEngine.closePrompt(".formError", true); });
});

var ajaxStartActive = true;

$(document).ajaxStart(function () {
    if (ajaxStartActive) {
        //Processing.showPleaseWait();
        //var pageName = window.location.pathname;
        //if (pageName.indexOf("/FacilityStructure/Index") < 0) {
        $.blockUI({
            message: '<img src="/images/ajax-loader-bar.GIF" alt="Please wait.." />',
            css: {
                border: 'none',
                padding: '15px',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
            }
        });
        //}
    }
});
//$(document).ajaxComplete(function () {
//    Processing.hidePleaseWait();
//});
$(document).ajaxStop(function () {
    //Processing.hidePleaseWait();
    $.unblockUI();
});
//$(document).ajaxStart(Processing.showPleaseWait()).ajaxStop(Processing.hidePleaseWait());

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
        //"preventDuplicates": true,
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

function ShowCustomMessage(msg, title, shortCutFunction, showCloseButton) {
    /// <summary>
    /// Shows the custom message.
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
        "hideMethod": "fadeOut",
        "progressBar": true
    }
    //PatientSearch/PatientSearch?messageid=7
    //var AuthLink = window.location.protocol + "//" + window.location.host + "/PatientSearch/PatientSearch?messageid=7";
    //var manageCareLink = window.location.protocol + "//" + window.location.host + "/ManagedCare/Index";
    //msg = '<div>' + msg + '&nbsp;<a href="'+AuthLink+'" target="_blank">Add Authorization</a>' +
    //    '&nbsp; or <a href="' + manageCareLink + '" target="_blank">Add Manage Care data</a></div>' +
    //    '</div>';
    if (!msg) {
        msg = getMessage();
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

function ShowErrorMessage(msg, showCloseButton) {
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
        "hideMethod": "fadeOut",
    }

    if (!msg) {
        msg = getMessage();
    }

    $("#toastrOptions").text("Command: toastr["
        + "error"
        + "](\""
        + msg
        + ("Error" ? "\", \"" + "Error" : '')
        + "\")\n\ntoastr.options = "
        + JSON.stringify(toastr.options, null, 2)
    );

    var $toast = toastr["error"](msg, "Error"); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
}

function ShowWarningMessage(msg, showCloseButton) {
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
        "hideMethod": "fadeOut",
    }

    $("#toastrOptions").text("Command: toastr["
        + "warning"
        + "](\""
        + msg
        + ("Alert" ? "\", \"" + "Alert" : '')
        + "\")\n\ntoastr.options = "
        + JSON.stringify(toastr.options, null, 2)
    );

    var $toast = toastr["warning"](msg, "Alert"); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
}

////-----------JS Enums---------------
CountryCode = new function () {
    this.UnitedArabAmirates = 45;
    this.UnitedArabAmiratesNumber = 971;
}

RelationshipType = new function () {
    this.Self = 1;
}

//enum for Order status
OrderStatus = new function () {
    this.Open = 1;
}

DefaultStateCode = new function () {
    this.ABUDHABI = 3;
}

DefaultCityCode = new function () {
    this.ABUDHABI = 3;
}

////-----------JS Enums---------------
VitalUnits = new function () {
    this.Meter = 1;
    this.Fahrenheit = 2;
    this.mmHg = 3;
    this.bpm = 4;
    this.egg = 5;
    this.kg = 6;
    this.cms = 7;
    this.Celsius = 8;
    this.Pounds = 9;
    this.gm = 10;
    this.lbs = 11;
    this.mgdl = 12;
};

VitalType = new function () {
    this.BloodPressureSystolic = 1;
    this.Weight = 2;
    this.Temperature = 3;
    this.Pulse = 4;
    this.BloodPressureDiastolic = 5;
    this.Glucose = 6;
};

OrderType = new function () {
    this.CPT = 4;
    this.HCPCS = 5;
    this.DRG = 7;
    this.DRUG = 8;
    this.DiagnosisCode = 2300;
    this.Orders = 2302;
};

OrderCodeTypes = new function () {
    this.EvaluationandManagement = 11009;
    this.Anesthesia = 11001;
    this.Surgery = 11010;
    this.Radiology = 11070;
    this.PathologyandLaboratory = 11080;
    this.Medicine = 11090;
    this.Pharmacy = 11100;

}
/////----------JS enums end here-------------------

//now using anywhere but keep just for understanding purposes
function ShowGenericMessage(msg, title) {
    /// <summary>
    /// Shows the generic message.
    /// </summary>
    /// <param name="msg">The MSG.</param>
    /// <param name="title">The title.</param>
    /// <returns></returns>
    var shortCutFunction = "info";
    //var $showDuration = 500;
    //var $hideDuration = 1000;
    //var $timeOut = 1000;
    //var $extendedTimeOut = 1000;
    //var $showEasing = $('#showEasing');
    //var $hideEasing = $('#hideEasing');
    //var $showMethod = $('#showMethod');
    //var $hideMethod = $('#hideMethod');
    //var toastIndex = toastCount++;

    //toastr.options = {
    //    closeButton: $('#closeButton').prop('checked'),
    //    debug: $('#debugInfo').prop('checked'),
    //    positionClass: $('#positionGroup input:radio:checked').val() || 'toast-top-right',
    //    onclick: null
    //};

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }


    //if ($('#addBehaviorOnToastClick').prop('checked')) {
    //    toastr.options.onclick = function () {
    //        alert('You can perform some custom action after a toast goes away');
    //    };
    //}

    //if ($showDuration.val().length) {
    //    toastr.options.showDuration = $showDuration.val();
    //}

    //if ($hideDuration.val().length) {
    //    toastr.options.hideDuration = $hideDuration.val();
    //}

    //if ($timeOut.val().length) {
    //    toastr.options.timeOut = $timeOut.val();
    //}

    //if ($extendedTimeOut.val().length) {
    //    toastr.options.extendedTimeOut = $extendedTimeOut.val();
    //}

    //if ($showEasing.val().length) {
    //    toastr.options.showEasing = $showEasing.val();
    //}

    //if ($hideEasing.val().length) {
    //    toastr.options.hideEasing = $hideEasing.val();
    //}

    //if ($showMethod.val().length) {
    //    toastr.options.showMethod = $showMethod.val();
    //}

    //if ($hideMethod.val().length) {
    //    toastr.options.hideMethod = $hideMethod.val();
    //}

    if (!msg) {
        msg = getMessage();
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
    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
            $toast.remove();
        });
    }
    if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function () {
            alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
        });
    }
}

function InitializeDateTimePicker() {

    //$(".dtGeneral1").datepicker({
    //    yearRange: "-20: +40",
    //    changeMonth: true,
    //    dateFormat: 'mm/dd/yy',
    //    changeYear: true
    $(".dtGeneral").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true

    });

    /// <summary>
    /// Initializes the date time picker.
    /// </summary>
    /// <returns></returns>
    /// /Date time that must not exceed the current date
    /// //$(".dtLessThanCurrent").datepicker({
    /// //    yearRange: "-50: +0",
    /// //    changeMonth: true,
    /// //    dateFormat: 'mm/dd/yy',
    /// //    changeYear: true
    /// //});
    /// //    changeMonth: true,
    /// //    dateFormat: 'mm/dd/yy',
    /// //    changeYear: true
    /// //});
    /// //    changeMonth: true,
    /// //    dateFormat: 'mm/dd/yy',
    /// //    changeYear: true
    /// //});

    $(".DateTime").datetimepicker({
        format: 'm/d/Y',
        timepicker: false,
        minDate: '1901/01/01',//yesterday is minimum date(for today use 0 or -1970/01/01)
        closeOnDateSelect: true
    });

    $(".dtLessThanCurrent").datetimepicker({
        timepicker: false,
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        closeOnDateSelect: true
    });

    $(".dtGreaterThanCurrent").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        timepicker: false,
        closeOnDateSelect: true
    });

    $(".dtGeneral").datetimepicker({
        format: 'm/d/Y',
        minDate: '1901/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        timepicker: false,
        closeOnDateSelect: true
    });

    $(".dtGeneralMasked").datetimepicker({
        minDate: '1950/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        format: 'm/d/Y H:i',
        mask: true,
    });

    //$(".dtGeneralMaskedWithTime").datetimepicker({
    //    minDate: '1950/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
    //    maxDate: '2025/12/12',
    //    format: 'm/d/Y H:i',
    //    mask: true,
    //    closeOnDateSelect: false
    //});

    $(".dtGeneralWithTime").datetimepicker({
        minDate: '1950/12/12',//yesterday is minimum date(for today use 0 or -1970/01/01)
        maxDate: '2025/12/12',
        format: 'm/d/Y H:i',
        mask: false,
        closeOnDateSelect: false
    });

    $(".dtGeneralTimeOnly").datetimepicker({
        datepicker: false,
        format: 'H:i',
        step: 30,
        mask: false,
    });
    $(".dtGeneralTimeOnlyHours").datetimepicker({
        datepicker: false,
        format: 'H:i',
        step: 60,
        mask: false,
    });

    function ClearValidation() {
        $.validationEngine.closePrompt(".formError", true);
    }
}

function BindCountryData(ddlSelector, hdSelector) {
    //Bind Countries
    /// <summary>
    /// Binds the country data.
    /// </summary>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    $.ajax({
        cache: false,
        type: "POST",
        url: homeUrl + "GetCountriesWithDefault",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(ddlSelector).empty();
            var items = '<option countryCode="0" value="0">--Select--</option>';

            $.each(data.list, function (i, country) {
                items += "<option countryCode='" + country.CodeValue + "' value='" + country.CountryID + "'>" + country.CountryName + "</option>";
            });

            $(ddlSelector).html(items);

            var selectedValue = $(hdSelector) != null && $(hdSelector).val() != '' && $(hdSelector).val() != '0'
                ? $(hdSelector).val() : data.defaultCountry;
            $(ddlSelector).val(selectedValue);

            GetStates(selectedValue, "#ddlStates", "#hdState");
        },
        error: function (msg) {
        }
    });
}

function GetStates(countryID, ddlSelector, hdSelector) {
    /// <summary>
    /// Gets the states.
    /// </summary>
    /// <param name="countryID">The country identifier.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    var id = countryID;
    $.ajax({
        type: "POST",
        url: homeUrl + "GetStatesByCountryId",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            countryId: id
        }),
        success: function (data) {
            if (data != null) {
                var items = '<option value="0">--Select--</option>';

                $.each(data, function (i, state) {
                    items += "<option value='" + state.StateID + "'>" + state.StateName + "</option>";
                });

                $(ddlSelector).html(items);

                var selectedValue = hdSelector != null && $(hdSelector).val() != '' && $(hdSelector).val() != "0"
                    ? $(hdSelector).val() : 0;
                $(ddlSelector).val(selectedValue);

                GetCities($(ddlSelector).val(), "#ddlCities", "#hdCity");
            }
        },
        error: function (msg) {
        }
    });
}

function GetCities(id, ddlSelector, hdSelector) {

    /// <summary>
    /// Gets the cities.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    if (id != '') {
        $.ajax({
            type: "POST",
            url: homeUrl + "GetCitiesByStateId",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                stateId: id
            }),
            success: function (data) {
                $(ddlSelector).empty();

                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, city) {
                    items += "<option value='" + city.CityID + "'>" + city.Name + "</option>";
                });
                $(ddlSelector).html(items);

                var selectedValue = hdSelector != null && $(hdSelector).val() != '' && $(hdSelector).val() != "0"
                    ? $(hdSelector).val() : DefaultCityCode.ABUDHABI;
                $(ddlSelector).val(selectedValue);
                if ($(ddlSelector).val() == '' || $(ddlSelector).val() == null) {
                    $(ddlSelector).val(0);
                }
            },
            error: function (msg) {
            }
        });
    }
    else {
        $(ddlSelector).empty();
        $(ddlSelector).html('<option value="0">--Select--</option>');
    }
}

function BindCountryDataWithCountryCode(selector, hiddenFieldSelector, lblSelector) {
    //Bind Countries
    /// <summary>
    /// Binds the country data with country code.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="hiddenFieldSelector">The hidden field selector.</param>
    /// <param name="lblSelector">The label selector.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: homeUrl + "GetCountriesWithDefault",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            //BindCountryCodeData(selector, hiddenFieldSelector, lblSelector, data.list);
            var items = '<option  countryCode="0" value="0">--Select--</option>';
            $.each(data.list, function (i, country) {
                items += "<option countryCode='" + country.CodeValue + "' value='" + country.CountryID + "'>" + country.CountryName + "</option>";
            });
            $(selector).html(items);

            if ($(hiddenFieldSelector) != null && $(hiddenFieldSelector).val() != '' && $(hiddenFieldSelector).val() != 0 && $(hiddenFieldSelector).length > 0)
                $(selector).val($(hiddenFieldSelector).val());
            else {
                $(selector).val(data.defaultCountry);
            }

            if (lblSelector != '')
                OnCountryDropdownChange(lblSelector, selector);
        },
        error: function (msg) {
        }
    });
}

function BindCountryCodeData(selector, hiddenFieldSelector, lblSelector, data) {
    var items = '<option  countryCode="0" value="0">--Select--</option>';
    $.each(data, function (i, country) {
        items += "<option countryCode='" + country.CodeValue + "' value='" + country.CountryID + "'>" + country.CountryName + "</option>";
    });
    $(selector).html(items);

    if ($(hiddenFieldSelector) != null && $(hiddenFieldSelector).val() != '' && $(hiddenFieldSelector).val() != 0 && $(hiddenFieldSelector).length > 0)
        $(selector).val($(hiddenFieldSelector).val());
    else {
        $(selector).val(199);
    }

    if (lblSelector != '')
        OnCountryDropdownChange(lblSelector, selector);
}

function OnCountryDropdownChange(lblSelector, dropdownSelector) {
    /// <summary>
    /// Called when [country dropdown change].
    /// </summary>
    /// <param name="lblSelector">The label selector.</param>
    /// <param name="dropdownSelector">The dropdown selector.</param>
    /// <returns></returns>
    //var ddlValue = $(dropdownSelector).attr('countryCode');
    var ddlValue = $('option:selected', dropdownSelector).attr('countryCode');
    if (ddlValue != '') {
        $(lblSelector).text("+" + ddlValue);
    }
}

//function to select dropdown to uae
function SelectDefaultDropdown(ddl) {
    /// <summary>
    /// Selects the default dropdown.
    /// </summary>
    /// <param name="ddl">The DDL.</param>
    /// <returns></returns>
    $('#' + ddl).val(CountryCode.UnitedArabAmirates);
}

function SelectDefaultDropdownNumbers(ddl) {
    /// <summary>
    /// Selects the default dropdown numbers.
    /// </summary>
    /// <param name="ddl">The DDL.</param>
    /// <returns></returns>
    $('#' + ddl).val(CountryCode.UnitedArabAmiratesNumber);
}

function DropdownValidation(txtId, dropdownId) {
    /// <summary>
    /// Dropdowns the validation.
    /// </summary>
    /// <param name="txtId">The text identifier.</param>
    /// <param name="dropdownId">The dropdown identifier.</param>
    /// <returns></returns>
    $.validationEngine.closePrompt(".formError", true);
    var txtValue = $("#" + txtId).val();
    $("#" + dropdownId).removeClass('validate[required]');

    if (txtValue != '') {
        $("#" + dropdownId).addClass('validate[required]');
    }
    $("#InsuranceCompanyFormDiv").validationEngine();
}
////--------------------Bind Countries Data end here--------------------

function MaskedPhone(lblId, ddlId, txtboxId) {
    /// <summary>
    /// Formats the masked phone.
    /// </summary>
    /// <param name="lblId">The label identifier.</param>
    /// <param name="ddlId">The DDL identifier.</param>
    /// <param name="txtboxId">The txtbox identifier.</param>
    /// <returns></returns>
    if ($(txtboxId).length > 0) {
        var txtValue = $(txtboxId).val();
        var phArray = txtValue.split('-');
        var phoneValue = '';
        if (phArray.length == 3) {
            phoneValue = phArray[1] + '-' + phArray[2];
        }
        else if (phArray.length == 2) {
            if (txtValue.indexOf('+') != -1)
                phoneValue = phArray[0] + '-' + phArray[1];
            else
                phoneValue = phArray[1];
        }

        $(txtboxId).val(phoneValue);


        var countryCode = $('option:selected', ddlId).attr('countryCode');
        $(lblId).text("+" + countryCode);
    }
}

function FormatMaskedPhone(lblId, ddlId, txtboxId) {
    /// <summary>
    /// Formats the masked phone.
    /// </summary>
    /// <param name="lblId">The label identifier.</param>
    /// <param name="ddlId">The DDL identifier.</param>
    /// <param name="txtboxId">The txtbox identifier.</param>
    /// <returns></returns>
    if ($(txtboxId).length > 0) {
        var txtValue = $(txtboxId).val();
        if (txtValue != '') {
            var phoneArray = txtValue.split('-');
            if (phoneArray.length == 3) {
                var countryCode = phoneArray[0];
                if (countryCode.indexOf("+") != -1)
                    countryCode = countryCode.substring(1, countryCode.length);
                var phone = phoneArray[1] + "-" + phoneArray[2];
                $(txtboxId).val(phone);
                $(lblId).text(phoneArray[0]);
                $(ddlId).val(countryCode);
            }
            else if (phoneArray.length == 2) {
                var countryCode1 = phoneArray[0];
                if (countryCode1.indexOf("+") != -1)
                    countryCode1 = countryCode1.substring(1, countryCode1.length);
                $(txtboxId).val(phoneArray[1]);
                $(lblId).text(phoneArray[0]);
                $(ddlId).val(countryCode1);
            }
        }
    }
}

function BindGenericDDL(selector, SelectedValueSelector, ControlerURL) {
    //Bind Countries
    /// <summary>
    /// Binds the generic DDL.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="SelectedValueSelector">The selected value selector.</param>
    /// <param name="ControlerURL">The controler URL.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: ControlerURL,//homeUrl + "GetPhoneCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                $(selector).empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, item) {
                    items += "<option value='" + item.ValueID + "'>" + item.ValueName + "</option>";
                });
                $(selector).html(items);

                if ($(SelectedValueSelector) != null && $(SelectedValueSelector).val() > 0)
                    $(selector).val($(SelectedValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function ShowMessageWithDuration(msg, title, shortCutFunction, showCloseButton, duration) {
    /// <summary>
    /// Shows the duration of the message with.
    /// </summary>
    /// <param name="msg">The MSG.</param>
    /// <param name="title">The title.</param>
    /// <param name="shortCutFunction">The short cut function.</param>
    /// <param name="showCloseButton">The show close button.</param>
    /// <param name="duration">The duration.</param>
    /// <returns></returns>
    toastr.options = {
        "closeButton": showCloseButton,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": duration,
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    if (!msg) {
        msg = getMessage();
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

function CheckValidExpiryDate(obj) {
    $(".txtPersonPassportExpireDateformError").remove();
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
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
            ShowMessage('Invalid Expiry Date.', "Alert", "warning", true);
            return false;
        }
        return true;
    }
}

function BindGenericEnitityDDL(ddlid, hid, displayVal, displayName, entity) {
    /// <summary>
    /// Binds the generic enitity DDL.
    /// </summary>
    /// <param name="ddlid">The ddlid.</param>
    /// <param name="hid">The hid.</param>
    /// <param name="displayVal">The display value.</param>
    /// <param name="displayName">The display name.</param>
    /// <param name="entity">The entity.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        column1: displayVal,
        column2: displayName,
        enitityName: entity
    });
    //Bind Countries
    $.ajax({
        type: "POST",
        url: Home / BindGenericEnitityDDL,//homeUrl + "GetPhoneCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                $(ddlid).empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, item) {
                    items += "<option value='" + item.ValueID + "'>" + item.ValueName + "</option>";
                });
                $(ddlid).html(items);

                if ($(hid) != null && $(hid).val() > 0)
                    $(ddlid).val($(hid).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilities(selector, selectedId) {
    //Bind Facilities
    /// <summary>
    /// Binds the facilities.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: homeUrl + "GetFacilitiesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(selector).empty();
            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, facility) {
                items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
            });
            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

function BindRoles(corporateId, selector, selectedId) {
    /// <summary>
    /// Binds the roles.
    /// </summary>
    /// <param name="corporateId">The corporate identifier.</param>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        corporateId: corporateId
    });
    //Bind Roles
    $.ajax({
        type: "POST",
        url: homeUrl + "GetRolesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, role) {
                items += "<option value='" + role.Value + "'>" + role.Text + "</option>";
            });

            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

function BindRolesByFacility(corporateId, facilityId, selector, selectedId) {
    /// <summary>
    /// Binds the roles by facility.
    /// </summary>
    /// <param name="corporateId">The corporate identifier.</param>
    /// <param name="facilityId">The facility identifier.</param>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        corporateId: corporateId,
        facilityId: facilityId
    });
    //Bind Roles
    $.ajax({
        type: "POST",
        url: homeUrl + "GetRolesByFacilityDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, role) {
                items += "<option value='" + role.Value + "'>" + role.Text + "</option>";
            });

            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

function BindFacilityRolesByFacilityCorporateId(corporateId, facilityId, selector, selectedId) {
    /// <summary>
    /// Binds the roles by facility.
    /// </summary>
    /// <param name="corporateId">The corporate identifier.</param>
    /// <param name="facilityId">The facility identifier.</param>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        corporateId: corporateId,
        facilityId: facilityId
    });
    //Bind Roles
    $.ajax({
        type: "POST",
        url: homeUrl + "GetFacilityRolesByCorporateFacilityDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, role) {
                items += "<option value='" + role.Value + "'>" + role.Text + "</option>";
            });

            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

function BindCorporates(selector, selectedId) {
    //Bind Corporates
    /// <summary>
    /// Binds the corporates.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: homeUrl + "GetCorporatesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Select--</option>';

            $.each(data, function (i, corporate) {
                items += "<option value='" + corporate.Value + "'>" + corporate.Text + "</option>";
            });
            $(selector).html(items);

            if (selectedId != null && selectedId != '' && $(selectedId).val() != '' && $(selectedId).val() != '0')
                $(selector).val(selectedId);

        },
        error: function (msg) {
        }
    });
}

//The following method checks that date must be after or equal to the current date 
function CheckDate(obj, selector) {
    /// <summary>
    /// Checks the date.
    /// </summary>
    /// <param name="obj">The object.</param>
    /// <param name="selector">The selector.</param>
    /// <returns></returns>
    $("." + selector + "formError").remove();
    var value = obj.value;
    if (value != "") {
        var validDate = value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var ExpiryDate = new Date(value);
        var CurrentDate = new Date();
        if (ExpiryDate > CurrentDate) {
            return true;
        }
        else if (ExpiryDate.toDateString() == CurrentDate.toDateString()) {
            return true;
        }
        else {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        return true;
    }
}

//The following method checks that date should not be before or equal to the current date 
function CheckIfAfterCurrentDate(obj, selector) {
    /// <summary>
    /// Checks if after current date.
    /// </summary>
    /// <param name="obj">The object.</param>
    /// <param name="selector">The selector.</param>
    /// <returns></returns>
    $("." + selector + "formError").remove();
    var value = obj.value;
    if (value != "") {
        var validDate = value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var ExpiryDate = new Date(value);
        var CurrentDate = new Date();
        if (ExpiryDate < CurrentDate) {
            return true;
        }
        else if (ExpiryDate.toDateString() == CurrentDate.toDateString()) {
            return true;
        }
        else {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        return true;
    }
}

//In the below method, date can be before, equal to or after the current date
function CheckGeneralDate(obj, selector) {
    /// <summary>
    /// Checks the general date.
    /// </summary>
    /// <param name="obj">The object.</param>
    /// <param name="selector">The selector.</param>
    /// <returns></returns>
    $("." + selector + "formError").remove();
    var value = obj.value;
    if (value != "") {
        var validDate = value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        //var ExpiryDate = new Date(value);
        //var CurrentDate = new Date();
        //if (ExpiryDate > CurrentDate) {
        //    return true;
        //}
        //else if (ExpiryDate.toDateString() == CurrentDate.toDateString()) {
        //    return true;
        //}
        //else {
        //    value = "";
        //    obj.focus();
        //    ShowMessage('Invalid Date.', "Alert", "warning", true);
        //    return false;
        //}
        return true;
    }
}

function SetLoginDetails() {
    /// <summary>
    /// Sets the login details.
    /// </summary>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        corporateId: corporateId
    });
    //Bind Roles
    $.ajax({
        type: "POST",
        url: homeUrl + "GetRolesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {

        },
        error: function (msg) {
        }
    });
}

//This function will check dates ie start date and end date
function CheckTwoDates(startdata, enddate, selector) {
    /// <summary>
    /// Checks the two dates.
    /// </summary>
    /// <param name="startdata">The startdata.</param>
    /// <param name="enddate">The enddate.</param>
    /// <param name="selector">The selector.</param>
    /// <returns></returns>
    $("." + selector + "formError").remove();
    if (startdata != "" && enddate != "") {

        //Checke valid From date --------------------
        if (startdata.val() != "") {
            var validDate = startdata.val().split('/');
            if (parseInt(validDate[2], 10) < 1900) {
                startdata.val('');
                startdata.focus();
                ShowMessage('Invalid Date.', "Alert", "warning", true);
                return false;
            }
            var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
            if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
                startdata.val('');
                startdata.focus();
                ShowMessage('Invalid Date.', "Alert", "warning", true);
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
                ShowMessage('Invalid Date.', "Alert", "warning", true);
                return false;
            }
            var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
            if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
                enddate.val('');
                enddate.focus();
                ShowMessage('Invalid Date.', "Alert", "warning", true);
                return false;
            }
        }
        //------------------------------------------

        var srdate = new Date(startdata.val());
        var eddate = new Date(enddate.val());
        if (srdate > eddate) {
            enddate.val("");
            ShowMessage('Start date should not be greater than end date.', "Alert", "warning", true);
            enddate.focus();
            return false;
        }
        else {
            return true;
        }
    }
}

/// This method is used to check valid date Not Less Than Today Date
function CheckValidDateNotLessThanTodayDate(obj, selector) {
    $("." + selector + "formError").remove();
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }

        var CurrentDate = new Date(parseInt(new Date().getFullYear(), 10), parseInt(new Date().getMonth(), 10), parseInt(new Date().getDate(), 10));
        if (dt < CurrentDate) {
            obj.value = "";
            obj.focus();
            ShowMessage('Date Can Not Be Less Than Today Date.', "Alert", "warning", true);
            return false;
        }
        return true;
    }
}

//This method is used to check valid date of birth
function CheckValidDateOfBirth(obj, selector) {
    $("." + selector + "formError").remove();
    if (obj.value != "") {
        var validDate = obj.value.split('/');
        if (parseInt(validDate[2], 10) < 1900) {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var dt = new Date(parseInt(validDate[2], 10), parseInt(validDate[0], 10) - 1, parseInt(validDate[1], 10));
        if (dt.getDate() != parseInt(validDate[1], 10) || dt.getMonth() != (parseInt(validDate[0], 10) - 1) || dt.getFullYear() != parseInt(validDate[2], 10)) {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date.', "Alert", "warning", true);
            return false;
        }
        var ActualYear = parseInt(validDate[2], 10);
        var ActualMonth = parseInt(validDate[0], 10);
        var ActualDay = parseInt(validDate[1], 10);

        var actualDate = new Date(ActualMonth + "/" + ActualDay + "/" + ActualYear);
        var currentDate = new Date();

        if (actualDate <= currentDate) {
            return true;
        }
        else {
            obj.value = "";
            obj.focus();
            ShowMessage('Invalid Date of birth.', "Alert", "warning", true);
            return false;
        }
    }
    return true;
}

//Need to fix it is work around
function SetGridPaging(strMethod, strExpected) {
    $('.gridFooter,.gridHead').find('a').each(function (index, element) {
        var hrfString = $(element).prop('href');
        hrfString = String(hrfString).replace(strMethod, strExpected);
        $(element).prop('href', '');
        $(element).prop('href', hrfString);
    });
}

//Need to fix it is work around
function SetGridSorting(event, gridSelector) {
    //$('.gridFooter,.gridHead').find('a').each(function (index, element) {
    //    var hrfString = $(element).prop('href');
    //    if (hrfString != '' || hrfString != null) {
    //        var queryString = hrfString.split('?')[1];
    //        $(element).bind("click", { msg: queryString }, event);
    //    }
    //    else {
    //        $(element).bind("click", event);
    //    }
    //    $(element).removeAttr('href');
    //});

    $(gridSelector + " .gridFooter," + gridSelector + " .gridHead").find('a').each(function (index, element) {

        var hrfString = $(element).prop('href');
        if (hrfString != '' || hrfString != null) {
            var queryString = hrfString.split('?')[1];
            $(element).bind("click", { msg: queryString }, event);
        }
        else {
            $(element).bind("click", event);
        }
        $(element).removeAttr('href');
    });
}

//Add ,@ClearTextBox = "True" in any of the control to clear text value
function ClearData() {
    $('[ClearTextBox=True]').each(function (index, element) {
        $(element).val('');
    });
}

function OnSelection(e) {
    //setTimeout(function () {
    //    var value = null;
    //    if (e.filter.filters != null && e.filter.filters.length > 0) {
    //        value = e.filter.filters[0].value;
    //    }
    //    return {
    //        text: value
    //    };
    //}, 1000);
    var value = null;
    if (e.filter.filters != null && e.filter.filters.length > 0) {
        value = e.filter.filters[0].value;
    }
    return {
        text: value
    };

}

var Processing;
/*  Processing.showPleaseWait TO SHOW Processing.hidePleaseWait(); TO HIDE*/
Processing = Processing || (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-header">' +
        '<h1>Processing...</h1>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="progress progress-striped active">' +
        '<div class="bar" style="width: 100%;">' +
        '<h1>Processing...</h1>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

    var pleaseWaitdiv = $('<div class="modal fade bs-example-modal-sm loader-popup" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">' +
        '   <div class="modal-dialog modal-sm" style="margin-top: 20%;">' +
        '     <div class="modal-content loader"><div class="modal-body">' +
        '      <img src="/images/ajax-loader-bar.GIF"><p>Please wait...</p>' +
        '     </div></div>' +
        '   </div>' +
        ' </div>');

    return {
        showPleaseWait: function () {
            $.blockUI({
                message: '<img src="/images/ajax-loader-bar.GIF"><p>Please wait...</p>',
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
        },
        hidePleaseWait: function () {
            $.unblockUI();
        },
    };

    //return {
    //    showPleaseWait: function () {
    //        $('.modal-backdrop').removeClass('out');
    //        $('.modal-sm').removeClass('out');
    //        $('.modal-sm').removeClass('in');

    //        $('.modal-backdrop').addClass('in');
    //        $('.loader-popup').addClass('in');
    //        $('body').css('overflow-y', 'hidden');
    //        pleaseWaitdiv.modal('show');
    //    },
    //    hidePleaseWait: function () {
    //        pleaseWaitdiv.modal('hide');
    //        $('.modal-backdrop').removeClass('in');

    //        $('.modal-backdrop').addClass('out');
    //        $('.modal-sm').addClass('out');
    //        $('body').css('overflow-y', 'auto');
    //        $('.loader-popup').removeClass('in');
    //        $('.loader-popup').addClass('out');
    //        //modal fade bs-example-modal-sm loader-popup out
    //        pleaseWaitdiv.modal('hide');
    //    },
    //};
})();

function BindDropdownData(data, ddlSelector, hdSelector) {
    /// <summary>
    /// Binds the dropdown data.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>

    $(ddlSelector).empty();
    var items = '<option value="0">--Select--</option>';
    $.each(data, function (i, obj) {
        var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
        items += newItem;
    });

    $(ddlSelector).html(items);
    var hdValue = "";
    if (hdSelector.indexOf('#') != -1) {
        hdValue = $(hdSelector).val();
    }
    else {
        hdValue = hdSelector;
    }
    //
    if (hdValue != null && hdValue != '') {
        $(ddlSelector).val(hdValue);
        //if (hdSelector == "#hdOrderTypeSubCategoryID") {
        //    $("#ddlOrderTypeSubCategory").select2({
        //        minimumResultsForSearch: Infinity,
        //        placeholder: "Select"
        //    }).select2('val', hdValue);
        //}
        //if (hdSelector == "#hdOrderCodeId") {
        //    $("#ddlOrderCodes").select2({
        //        minimumResultsForSearch: Infinity,
        //        placeholder: "Select"
        //    }).select2('val', hdValue);
        //}
        if ($(ddlSelector).val() == null || $(ddlSelector).val() == undefined) {
            $(ddlSelector + " option").filter(function (index) { return $(this).text() === "" + hdValue + ""; }).attr('selected', 'selected');
        }
    }
    else {
        if ($(ddlSelector).length > 0)
            $(ddlSelector)[0].selectedIndex = 0;
    }
}

function jqueryFormSub() {
    /*!
 * jQuery Form Plugin
 * version: 2.43 (12-MAR-2010)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
    ; (function ($) {

        /*
            Usage Note:
            -----------
            Do not use both ajaxSubmit and ajaxForm on the same form.  These
            functions are intended to be exclusive.  Use ajaxSubmit if you want
            to bind your own submit handler to the form.  For example,
        
            $(document).ready(function() {
                $('#myForm').bind('submit', function() {
                    $(this).ajaxSubmit({
                        target: '#output'
                    });
                    return false; // <-- important!
                });
            });
        
            Use ajaxForm when you want the plugin to manage all the event binding
            for you.  For example,
        
            $(document).ready(function() {
                $('#myForm').ajaxForm({
                    target: '#output'
                });
            });
        
            When using ajaxForm, the ajaxSubmit function will be invoked for you
            at the appropriate time.
        */

        /**
         * ajaxSubmit() provides a mechanism for immediately submitting
         * an HTML form using AJAX.
         */
        $.fn.ajaxSubmit = function (options) {
            // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
            if (!this.length) {
                log('ajaxSubmit: skipping submit process - no element selected');
                return this;
            }

            if (typeof options == 'function')
                options = { success: options };

            var url = $.trim(this.attr('action'));
            if (url) {
                // clean url (don't include hash vaue)
                url = (url.match(/^([^#]+)/) || [])[1];
            }
            url = url || window.location.href || '';

            options = $.extend({
                url: url,
                type: this.attr('method') || 'GET',
                iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
            }, options || {});

            // hook for manipulating the form data before it is extracted;
            // convenient for use with rich editors like tinyMCE or FCKEditor
            var veto = {};
            this.trigger('form-pre-serialize', [this, options, veto]);
            if (veto.veto) {
                log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
                return this;
            }

            // provide opportunity to alter form data before it is serialized
            if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
                log('ajaxSubmit: submit aborted via beforeSerialize callback');
                return this;
            }

            var a = this.formToArray(options.semantic);
            if (options.data) {
                options.extraData = options.data;
                for (var n in options.data) {
                    if (options.data[n] instanceof Array) {
                        for (var k in options.data[n])
                            a.push({ name: n, value: options.data[n][k] });
                    }
                    else
                        a.push({ name: n, value: options.data[n] });
                }
            }

            // give pre-submit callback an opportunity to abort the submit
            if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
                log('ajaxSubmit: submit aborted via beforeSubmit callback');
                return this;
            }

            // fire vetoable 'validate' event
            this.trigger('form-submit-validate', [a, this, options, veto]);
            if (veto.veto) {
                log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
                return this;
            }

            var q = $.param(a);

            if (options.type.toUpperCase() == 'GET') {
                options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
                options.data = null;  // data is null for 'get'
            }
            else
                options.data = q; // data is the query string for 'post'

            var $form = this, callbacks = [];
            if (options.resetForm) callbacks.push(function () { $form.resetForm(); });
            if (options.clearForm) callbacks.push(function () { $form.clearForm(); });

            // perform a load on the target only if dataType is not provided
            if (!options.dataType && options.target) {
                var oldSuccess = options.success || function () { };
                callbacks.push(function (data) {
                    var fn = options.replaceTarget ? 'replaceWith' : 'html';
                    $(options.target)[fn](data).each(oldSuccess, arguments);
                });
            }
            else if (options.success)
                callbacks.push(options.success);

            options.success = function (data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
                for (var i = 0, max = callbacks.length; i < max; i++)
                    callbacks[i].apply(options, [data, status, xhr || $form, $form]);
            };

            // are there files to upload?
            var files = $('input:file', this).fieldValue();
            var found = false;
            for (var j = 0; j < files.length; j++)
                if (files[j])
                    found = true;

            var multipart = false;
            //	var mp = 'multipart/form-data';
            //	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

            // options.iframe allows user to force iframe mode
            // 06-NOV-09: now defaulting to iframe mode if file input is detected
            if ((files.length && options.iframe !== false) || options.iframe || found || multipart) {
                // hack to fix Safari hang (thanks to Tim Molendijk for this)
                // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
                if (options.closeKeepAlive)
                    $.get(options.closeKeepAlive, fileUpload);
                else
                    fileUpload();
            }
            else
                $.ajax(options);

            // fire 'notify' event
            this.trigger('form-submit-notify', [this, options]);
            return this;


            // private function for handling file uploads (hat tip to YAHOO!)
            function fileUpload() {
                var form = $form[0];

                if ($(':input[name=submit]', form).length) {
                    alert('Error: Form elements must not be named "submit".');
                    return;
                }

                var opts = $.extend({}, $.ajaxSettings, options);
                var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

                var id = 'jqFormIO' + (new Date().getTime());
                var $io = $('<iframe id="' + id + '" name="' + id + '" src="' + opts.iframeSrc + '" onload="(jQuery(this).data(\'form-plugin-onload\'))()" />');
                var io = $io[0];

                $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

                var xhr = { // mock object
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: 'n/a',
                    getAllResponseHeaders: function () { },
                    getResponseHeader: function () { },
                    setRequestHeader: function () { },
                    abort: function () {
                        this.aborted = 1;
                        $io.attr('src', opts.iframeSrc); // abort op in progress
                    }
                };

                var g = opts.global;
                // trigger ajax global events so that activity/block indicators work like normal
                if (g && !$.active++) $.event.trigger("ajaxStart");
                if (g) $.event.trigger("ajaxSend", [xhr, opts]);

                if (s.beforeSend && s.beforeSend(xhr, s) === false) {
                    s.global && $.active--;
                    return;
                }
                if (xhr.aborted)
                    return;

                var cbInvoked = false;
                var timedOut = 0;

                // add submitting element to data if we know it
                var sub = form.clk;
                if (sub) {
                    var n = sub.name;
                    if (n && !sub.disabled) {
                        opts.extraData = opts.extraData || {};
                        opts.extraData[n] = sub.value;
                        if (sub.type == "image") {
                            opts.extraData[n + '.x'] = form.clk_x;
                            opts.extraData[n + '.y'] = form.clk_y;
                        }
                    }
                }

                // take a breath so that pending repaints get some cpu time before the upload starts
                function doSubmit() {
                    // make sure form attrs are set
                    var t = $form.attr('target'), a = $form.attr('action');

                    // update form attrs in IE friendly way
                    form.setAttribute('target', id);
                    if (form.getAttribute('method') != 'POST')
                        form.setAttribute('method', 'POST');
                    if (form.getAttribute('action') != opts.url)
                        form.setAttribute('action', opts.url);

                    // ie borks in some cases when setting encoding
                    if (!opts.skipEncodingOverride) {
                        $form.attr({
                            encoding: 'multipart/form-data',
                            enctype: 'multipart/form-data'
                        });
                    }

                    // support timout
                    if (opts.timeout)
                        setTimeout(function () { timedOut = true; cb(); }, opts.timeout);

                    // add "extra" data to form if provided in options
                    var extraInputs = [];
                    try {
                        if (opts.extraData)
                            for (var n in opts.extraData)
                                extraInputs.push(
                                    $('<input type="hidden" name="' + n + '" value="' + opts.extraData[n] + '" />')
                                        .appendTo(form)[0]);

                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                        $io.data('form-plugin-onload', cb);
                        form.submit();
                    }
                    finally {
                        // reset attrs and remove "extra" input elements
                        form.setAttribute('action', a);
                        t ? form.setAttribute('target', t) : $form.removeAttr('target');
                        $(extraInputs).remove();
                    }
                };

                if (opts.forceSync)
                    doSubmit();
                else
                    setTimeout(doSubmit, 10); // this lets dom updates render

                var domCheckCount = 100;

                function cb() {
                    if (cbInvoked)
                        return;

                    var ok = true;
                    try {
                        if (timedOut) throw 'timeout';
                        // extract the server response from the iframe
                        var data, doc;

                        doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;

                        var isXml = opts.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                        log('isXml=' + isXml);
                        if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
                            if (--domCheckCount) {
                                // in some browsers (Opera) the iframe DOM is not always traversable when
                                // the onload callback fires, so we loop a bit to accommodate
                                log('requeing onLoad callback, DOM not available');
                                setTimeout(cb, 250);
                                return;
                            }
                            log('Could not access iframe DOM after 100 tries.');
                            return;
                        }

                        log('response detected');
                        cbInvoked = true;
                        xhr.responseText = doc.body ? doc.body.innerHTML : null;
                        xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                        xhr.getResponseHeader = function (header) {
                            var headers = { 'content-type': opts.dataType };
                            return headers[header];
                        };

                        if (opts.dataType == 'json' || opts.dataType == 'script') {
                            // see if user embedded response in textarea
                            var ta = doc.getElementsByTagName('textarea')[0];
                            if (ta)
                                xhr.responseText = ta.value;
                            else {
                                // account for browsers injecting pre around json response
                                var pre = doc.getElementsByTagName('pre')[0];
                                if (pre)
                                    xhr.responseText = pre.innerHTML;
                            }
                        }
                        else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                            xhr.responseXML = toXml(xhr.responseText);
                        }
                        data = $.httpData(xhr, opts.dataType);
                    }
                    catch (e) {
                        log('error caught:', e);
                        xhr.error = e;
                        ok = true;
                        //$.handleError(opts, xhr, 'error', e);
                    }

                    // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                    if (ok) {
                        opts.success(data, 'success');
                        if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
                    }
                    if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
                    if (g && ! --$.active) $.event.trigger("ajaxStop");
                    if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

                    // clean up
                    setTimeout(function () {
                        $io.removeData('form-plugin-onload');
                        $io.remove();
                        xhr.responseXML = null;
                    }, 100);
                };

                function toXml(s, doc) {
                    if (window.ActiveXObject) {
                        doc = new ActiveXObject('Microsoft.XMLDOM');
                        doc.async = 'false';
                        doc.loadXML(s);
                    }
                    else
                        doc = (new DOMParser()).parseFromString(s, 'text/xml');
                    return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
                };
            };
        };

        /**
         * ajaxForm() provides a mechanism for fully automating form submission.
         *
         * The advantages of using this method instead of ajaxSubmit() are:
         *
         * 1: This method will include coordinates for <input type="image" /> elements (if the element
         *	is used to submit the form).
         * 2. This method will include the submit element's name/value data (for the element that was
         *	used to submit the form).
         * 3. This method binds the submit() method to the form for you.
         *
         * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
         * passes the options argument along after properly binding events for submit elements and
         * the form itself.
         */
        $.fn.ajaxForm = function (options) {
            return this.ajaxFormUnbind().bind('submit.form-plugin', function (e) {
                e.preventDefault();
                $(this).ajaxSubmit(options);
            }).bind('click.form-plugin', function (e) {
                var target = e.target;
                var $el = $(target);
                if (!($el.is(":submit,input:image"))) {
                    // is this a child element of the submit el?  (ex: a span within a button)
                    var t = $el.closest(':submit');
                    if (t.length == 0)
                        return;
                    target = t[0];
                }
                var form = this;
                form.clk = target;
                if (target.type == 'image') {
                    if (e.offsetX != undefined) {
                        form.clk_x = e.offsetX;
                        form.clk_y = e.offsetY;
                    } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                        var offset = $el.offset();
                        form.clk_x = e.pageX - offset.left;
                        form.clk_y = e.pageY - offset.top;
                    } else {
                        form.clk_x = e.pageX - target.offsetLeft;
                        form.clk_y = e.pageY - target.offsetTop;
                    }
                }
                // clear form vars
                setTimeout(function () { form.clk = form.clk_x = form.clk_y = null; }, 100);
            });
        };

        // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
        $.fn.ajaxFormUnbind = function () {
            return this.unbind('submit.form-plugin click.form-plugin');
        };

        ///**
        // * formToArray() gathers form element data into an array of objects that can
        // * be passed to any of the following ajax functions: $.get, $.post, or load.
        // * Each object in the array has both a 'name' and 'value' property.  An example of
        // * an array for a simple login form might be:
        // *
        // * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
        // *
        // * It is this array that is passed to pre-submit callback functions provided to the
        // * ajaxSubmit() and ajaxForm() methods.
        // */
        //$.fn.formToArray = function (semantic) {
        //    var a = [];
        //    if (this.length == 0) return a;

        //    var form = this[0];
        //    var els = semantic ? form.getElementsByTagName('*') : form.elements;
        //    if (!els) return a;
        //    for (var i = 0, max = els.length; i < max; i++) {
        //        var el = els[i];
        //        var n = el.name;
        //        if (!n) continue;

        //        if (semantic && form.clk && el.type == "image") {
        //            // handle image inputs on the fly when semantic == true
        //            if (!el.disabled && form.clk == el) {
        //                a.push({ name: n, value: $(el).val() });
        //                a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
        //            }
        //            continue;
        //        }

        //        var v = $.fieldValue(el, true);
        //        if (v && v.constructor == Array) {
        //            for (var j = 0, jmax = v.length; j < jmax; j++)
        //                a.push({ name: n, value: v[j] });
        //        }
        //        else if (v !== null && typeof v != 'undefined')
        //            a.push({ name: n, value: v });
        //    }

        //    if (!semantic && form.clk) {
        //        // input type=='image' are not found in elements array! handle it here
        //        var $input = $(form.clk), input = $input[0], n = input.name;
        //        if (n && !input.disabled && input.type == 'image') {
        //            a.push({ name: n, value: $input.val() });
        //            a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
        //        }
        //    }
        //    return a;
        //};

        ///**
        // * Serializes form data into a 'submittable' string. This method will return a string
        // * in the format: name1=value1&amp;name2=value2
        // */
        //$.fn.formSerialize = function (semantic) {
        //    //hand off to jQuery.param for proper encoding
        //    return $.param(this.formToArray(semantic));
        //};

        ///**
        // * Serializes all field elements in the jQuery object into a query string.
        // * This method will return a string in the format: name1=value1&amp;name2=value2
        // */
        //$.fn.fieldSerialize = function (successful) {
        //    var a = [];
        //    this.each(function () {
        //        var n = this.name;
        //        if (!n) return;
        //        var v = $.fieldValue(this, successful);
        //        if (v && v.constructor == Array) {
        //            for (var i = 0, max = v.length; i < max; i++)
        //                a.push({ name: n, value: v[i] });
        //        }
        //        else if (v !== null && typeof v != 'undefined')
        //            a.push({ name: this.name, value: v });
        //    });
        //    //hand off to jQuery.param for proper encoding
        //    return $.param(a);
        //};

        /**
         * Returns the value(s) of the element in the matched set.  For example, consider the following form:
         *
         *  <form><fieldset>
         *	  <input name="A" type="text" />
         *	  <input name="A" type="text" />
         *	  <input name="B" type="checkbox" value="B1" />
         *	  <input name="B" type="checkbox" value="B2"/>
         *	  <input name="C" type="radio" value="C1" />
         *	  <input name="C" type="radio" value="C2" />
         *  </fieldset></form>
         *
         *  var v = $(':text').fieldValue();
         *  // if no values are entered into the text inputs
         *  v == ['','']
         *  // if values entered into the text inputs are 'foo' and 'bar'
         *  v == ['foo','bar']
         *
         *  var v = $(':checkbox').fieldValue();
         *  // if neither checkbox is checked
         *  v === undefined
         *  // if both checkboxes are checked
         *  v == ['B1', 'B2']
         *
         *  var v = $(':radio').fieldValue();
         *  // if neither radio is checked
         *  v === undefined
         *  // if first radio is checked
         *  v == ['C1']
         *
         * The successful argument controls whether or not the field element must be 'successful'
         * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
         * The default value of the successful argument is true.  If this value is false the value(s)
         * for each element is returned.
         *
         * Note: This method *always* returns an array.  If no valid value can be determined the
         *	   array will be empty, otherwise it will contain one or more values.
         */
        //$.fn.fieldValue = function (successful) {
        //    for (var val = [], i = 0, max = this.length; i < max; i++) {
        //        var el = this[i];
        //        var v = $.fieldValue(el, successful);
        //        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
        //            continue;
        //        v.constructor == Array ? $.merge(val, v) : val.push(v);
        //    }
        //    return val;
        //};

        ///**
        // * Returns the value of the field element.
        // */
        //$.fieldValue = function (el, successful) {
        //    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
        //    if (typeof successful == 'undefined') successful = true;

        //    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        //        (t == 'checkbox' || t == 'radio') && !el.checked ||
        //        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        //        tag == 'select' && el.selectedIndex == -1))
        //        return null;

        //    if (tag == 'select') {
        //        var index = el.selectedIndex;
        //        if (index < 0) return null;
        //        var a = [], ops = el.options;
        //        var one = (t == 'select-one');
        //        var max = (one ? index + 1 : ops.length);
        //        for (var i = (one ? index : 0) ; i < max; i++) {
        //            var op = ops[i];
        //            if (op.selected) {
        //                var v = op.value;
        //                if (!v) // extra pain for IE...
        //                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
        //                if (one) return v;
        //                a.push(v);
        //            }
        //        }
        //        return a;
        //    }
        //    return el.value;
        //};

        ///**
        // * Clears the form data.  Takes the following actions on the form's input fields:
        // *  - input text fields will have their 'value' property set to the empty string
        // *  - select elements will have their 'selectedIndex' property set to -1
        // *  - checkbox and radio inputs will have their 'checked' property set to false
        // *  - inputs of type submit, button, reset, and hidden will *not* be effected
        // *  - button elements will *not* be effected
        // */
        //$.fn.clearForm = function () {
        //    return this.each(function () {
        //        $('input,select,textarea', this).clearFields();
        //    });
        //};

        ///**
        // * Clears the selected form elements.
        // */
        //$.fn.clearFields = $.fn.clearInputs = function () {
        //    return this.each(function () {
        //        var t = this.type, tag = this.tagName.toLowerCase();
        //        if (t == 'text' || t == 'password' || tag == 'textarea')
        //            this.value = '';
        //        else if (t == 'checkbox' || t == 'radio')
        //            this.checked = false;
        //        else if (tag == 'select')
        //            this.selectedIndex = 0;
        //    });
        //};

        ///**
        // * Resets the form data.  Causes all form elements to be reset to their original value.
        // */
        //$.fn.resetForm = function () {
        //    return this.each(function () {
        //        // guard against an input with the name of 'reset'
        //        // note that IE reports the reset function as an 'object'
        //        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
        //            this.reset();
        //    });
        //};

        ///**
        // * Enables or disables any matching elements.
        // */
        //$.fn.enable = function (b) {
        //    if (b == undefined) b = true;
        //    return this.each(function () {
        //        this.disabled = !b;
        //    });
        //};

        ///**
        // * Checks/unchecks any matching checkboxes or radio buttons and
        // * selects/deselects and matching option elements.
        // */
        //$.fn.selected = function (select) {
        //    if (select == undefined) select = true;
        //    return this.each(function () {
        //        var t = this.type;
        //        if (t == 'checkbox' || t == 'radio')
        //            this.checked = select;
        //        else if (this.tagName.toLowerCase() == 'option') {
        //            var $sel = $(this).parent('select');
        //            if (select && $sel[0] && $sel[0].type == 'select-one') {
        //                // deselect all other options
        //                $sel.find('option').selected(false);
        //            }
        //            this.selected = select;
        //        }
        //    });
        //};

        // helper fn for console logging
        // set $.fn.ajaxSubmit.debug to true to enable debug logging
        function log() {
            if ($.fn.ajaxSubmit.debug) {
                var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
                if (window.console && window.console.log)
                    window.console.log(msg);
                else if (window.opera && window.opera.postError)
                    window.opera.postError(msg);
            }
        };

    })(jQuery);

}

function BindList(htmlSelector, data) {
    /// <summary>
    /// Binds the list.
    /// </summary>
    /// <param name="htmlSelector">The HTML selector.</param>
    /// <param name="data">The data.</param>
    /// <returns></returns>
    //// Changes don by Shashank To fix the Double header which is appear in try order activity grid in Physician task.
    //// Changes done on the 14 March 2016
    //if (!$(htmlSelector).hasClass('in'))
    //    $(htmlSelector).addClass('in').attr('style', 'height:auto;');
    $(htmlSelector).empty();
    $(htmlSelector).html(data);
}

function ResetAllDropdowns(divSelector) {
    /// <summary>
    /// Resets all dropdowns.
    /// </summary>
    /// <param name="divSelector">The div selector.</param>
    /// <returns></returns>
    $(divSelector + 'select').each(function () {
        $(this)[0].selectedIndex = 0;
    });
}

function ToggleRadioButtons(activeSelector, cssClass) {
    /// <summary>
    /// Toggles the radio buttons.
    /// </summary>
    /// <param name="activeSelector">The active selector.</param>
    /// <param name="cssClass">The CSS class.</param>
    /// <returns></returns>
    $(cssClass).attr("checked", false);
    $(activeSelector).prop("checked", "checked");
}

function hideColumnColorRow(column, gridId) {
    /// <summary>
    /// Hides the column color row.
    /// </summary>
    /// <param name="column">The column.</param>
    /// <param name="gridId">The grid identifier.</param>
    /// <returns></returns>
    $('#' + gridId + ' td:nth-child(' + column + '),th:nth-child(' + column + ')').hide();
}

function InitializeExportPanel() {
    /// <summary>
    /// Initializes the export panel.
    /// </summary>
    /// <returns></returns>
    $(".btnExportRadioPanel").bind("click", function () {
        $("#rdExportDiv").show();
    });
}

function HideExportPanel() {
    /// <summary>
    /// Hides the export panel.
    /// </summary>
    /// <returns></returns>
    $("#rdExportDiv").hide();
}

function ConvertJSDateTimeToServerString(value) {
    /// <summary>
    /// Converts the js date time to server string.
    /// </summary>
    /// <param name="value">The value.</param>
    /// <returns></returns>
    var date = new Date(value);
    var day = date.getDate().toString().length == 1 ? "0" + date.getDate().toString() : date.getDate().toString();        // yields day
    var month = date.getMonth() == 0 ? "0" + (date.getMonth() + 1).toString() : ((date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString());    // yields month
    var year = date.getFullYear();  // yields year
    //var hour = date.getHours().toString() == 0 ? "00" : date.getHours();     // yields hours 
    //var minute = date.getMinutes().toString() == 0 ? "00" : date.getMinutes(); // yields minutes
    //var second = date.getSeconds().toString() == 0 ? "00" : date.getSeconds(); // yields seconds

    // After this construct a string with the above results as below
    var time = day + "/" + month + "/" + year; //+ " " + hour + ':' + minute + ':' + second;
    return time;
}

function CheckIfTestCasePassed(firstValue, secondValue, compareType, dataType) {
    /// <summary>
    /// Checks if test case passed.
    /// </summary>
    /// <param name="firstValue">The first value.</param>
    /// <param name="secondValue">The second value.</param>
    /// <param name="compareType">Type of the compare.</param>
    /// <param name="dataType">Type of the data.</param>
    /// <returns></returns>
    if (dataType != 1) {
        var status = false;
        firstValue = firstValue.toLowerCase();
        secondValue = secondValue.toLowerCase();
        compareType = compareType.toLowerCase();
        switch (compareType) {
            case "=":
            case "is":
                status = (firstValue == secondValue);
                break;
            case "<>":
            case "is not":
                status = (firstValue != secondValue);
                break;
            case "like":
            case "in":
                status = (firstValue.indexOf(secondValue) != -1);
                break;
            case ">":
                status = (parseFloat(firstValue) > parseFloat(secondValue));
                break;
            case ">=":
                status = (parseFloat(firstValue) >= parseFloat(secondValue));
                break;
            case "<":
                status = (parseFloat(firstValue) < parseFloat(secondValue));
                break;
            case "<=":
                status = (parseFloat(firstValue) <= parseFloat(secondValue));
                break;
            case "not in":
                status = (firstValue.indexOf(secondValue) == -1);
                break;
            case "not like":
                status = (secondValue.indexOf(firstValue) == -1);
                break;
            case "between":
                var secondvaluearray = secondValue.split('and');
                var secondvalue1 = secondvaluearray[0];
                var secondvalue2 = secondvaluearray[1];
                status = ((parseFloat(firstValue) >= parseFloat(secondvalue1)) && (parseFloat(firstValue) <= parseFloat(secondvalue2)));
                break;
            case "not between":
                var secondvaluearray1 = secondValue.split('and');
                var secondvalue3 = secondvaluearray1[0];
                var secondvalue4 = secondvaluearray1[1];
                status = ((parseFloat(firstValue) <= parseFloat(secondvalue3)) && (parseFloat(firstValue) >= parseFloat(secondvalue4)));
                break;
            default:
                break;
        }
    }
    else {
        status = CheckTestCasesForDates(compareType, firstValue, secondValue);
    }
    return status;
}

function CheckTestCasesForDates(compareType, firstValue, secondValue) {
    /// <summary>
    /// Checks the test cases for dates.
    /// </summary>
    /// <param name="compareType">Type of the compare.</param>
    /// <param name="firstValue">The first value.</param>
    /// <param name="secondValue">The second value.</param>
    /// <returns></returns>
    var status = false;
    var firstDate = new Date(firstValue);
    var secondDate = new Date(secondValue);
    var currentDate = new Date();
    compareType = compareType.toLowerCase();
    switch (compareType) {
        case "=":
        case "is":
            status = (firstDate == secondDate);
            break;
        case "is not":
        case "<>":
            status = (firstDate != secondDate);
            break;
        case "Like":
            status = true;
            break;
        case ">":
            status = (firstDate > secondDate);
            break;
        case ">=":
            status = (firstDate >= secondDate);
            break;
        case "<":
            status = (firstDate < secondDate);
            break;
        case "<=":
            status = (firstDate <= secondDate);
            break;
        case "in":
            status = (firstValue.indexOf(secondValue) != -1);
            break;
        case "not in":
            break;
        default:
            break;
    }
    return status;
}

function BindGlobalCodes(selector, categoryIdval, hidValueSelector) {
    /// <summary>
    /// Binds the global codes.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="categoryIdval">The category idval.</param>
    /// <param name="hidValueSelector">The hid value selector.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeID + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindDropDownOnlyWithSelect(selector) {
    $(selector).html('');
    var items = '<option value="0">--Select--</option>';
    $(selector).html(items);
}
function BindGlobalCodesWithValue(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}
function BindGlobalCodesWithValueOrderBy(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                data = jLinq.from(data).orderBy("GlobalCodeValue").select();
                var items = '';
                $.each(data, function (i, globalCode) {
                    if (globalCode.GlobalCodeValue == 7) {
                        items += "<option value='0' disabled='disabled' title='Department closed'>" + globalCode.GlobalCodeName + "</option>";
                    } else {
                        items += "<option value='" + globalCode.GlobalCodeValue + "' disabled='disabled' title='Department closed'>" + globalCode.GlobalCodeName + "</option>";
                    }
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}
function BindGlobalCodesWithValueForMonth(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodesOrderByGlobalCodeId",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}
function BindGlobalCodesWithValueWithOrder(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodesOrderbyCode",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindGlobalCodesOrderbyName(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodesOrderbyName",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function InitializeSession() {

    if (sess_over) {
        window.location.href = window.location.protocol + "//" + window.location.host + homeUrl + "LogOff";
    }
    sess_lastActivity = new Date();
    sessSetInterval();
    sess_over = false;
    $(document).bind('keypress.session', function (ed, e) {
        sessKeyPressed(ed, e);
    });
    $(document).bind('mousedown.session', function (ed, e) {
        if (ed.which == 1 || ed.which == 2 || ed.which == 3) {
            sessKeyPressed(ed, e);
        }
    });
    $.post(homeUrl + "GetSecurityParameters", { globalCodeCategoryValue: 2121 }, function (responseData) {
        if (responseData != null) {
            sess_expirationMinutes = parseInt(responseData, 10);
            if (sess_expirationMinutes <= 0)
                sess_expirationMinutes = 10;
        }
    });
}

function sessSetInterval() {
    sess_intervalID = setInterval(sessInterval, sess_pollInterval);
}

function sessClearInterval() {
    clearInterval(sess_intervalID);
}

function sessKeyPressed(ed, e) {
    sess_lastActivity = new Date();
}

function sessLogOut() {
    sess_over = true;
    CallLogOutFunction();
}

function sessInterval() {

    var now = new Date();
    //get milliseconds of differneces 
    var diff = now - sess_lastActivity;
    //get minutes between differences
    var diffMins = (diff / 1000 / 60);

    //wran before expiring
    //stop the timer
    //sessClearInterval();
    //console.log('ticks:' + diffMins + " Mintues:" + sess_expirationMinutes);
    if (diffMins > sess_expirationMinutes) {
        isSessionOutMessage = false;
        sessLogOut();
    }
}
function schSessionInterval() {
    //
    var now = new Date();
    //get milliseconds of differneces 
    var diff = now - sess_lastActivity;
    //get minutes between differences
    var diffMins = (diff / 1000 / 60);

    //wran before expiring
    //stop the timer
    //sessClearInterval();

    if (diffMins > sess_expirationMinutes) {
        sessLogOut();
    }
}


function CallLogOutFunction() {
    if (!isSessionOutMessage) {
        $.ajax({
            type: "POST",
            url: homeUrl + "SessionTimeout",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: null,
            success: function (data) {
                if (data) {
                    //alert('Session is Over, Please log in again!');
                    $("#divSessionPoup").modal();

                }
                //isSessionOutMessage = true;
                //window.location.href = window.location.protocol + "//" + window.location.host + homeUrl + "LogOff";
                //return false;
            },
            error: function (msg) {
            }
        });
    }
}

function BindTimeZones(selector, hidValueSelector) {
    $.ajax({
        type: "POST",
        url: homeUrl + "GetTimeZones",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, timeZone) {
                    items += "<option value='" + timeZone.Value + "'>" + timeZone.Text + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function ResetValues(chkSelector, valueSelector, value, id) {
    if ($(chkSelector) != null) {
        $(chkSelector).prop('checked', true);
    }
    if (id == 0) {
        value = parseInt(value, 10);
        ++value;
        $(valueSelector).val(value);
    }
}

function ResetControls(chkSelector, valueSelector, value) {
    if ($(chkSelector) != null) {
        $(chkSelector).prop('checked', true);
    }

    value = parseInt(value, 10);
    $(valueSelector).val(value);
}

function BindDropdownDataV2(data, ddlSelector, hdSelector, selectLabel) {
    /// <summary>
    /// Binds the dropdown data.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    $(ddlSelector).empty();
    var items = "<option value='0'>" + selectLabel + "</option>";
    $.each(data, function (i, obj) {
        var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
        items += newItem;
    });

    $(ddlSelector).html(items);

    var hdValue = "";
    if (hdSelector.indexOf('#') != -1) {
        hdValue = $(hdSelector).val();
    }
    else {
        hdValue = hdSelector;
    }

    if (hdValue != null && hdValue != '') {
        $(ddlSelector).val(hdValue);
        if ($(ddlSelector).val() == null || $(ddlSelector).val() == undefined) {
            //var selectedText = ddlSelector + " option:contains(" + theText + ")";
            $(ddlSelector + " option:contains(" + hdValue + ")").attr("selected", "selected");
        }
    }
    else {
        if ($(ddlSelector).length > 0)
            $(ddlSelector)[0].selectedIndex = 0;
    }

    if ($(ddlSelector).val() == null) {
        $(ddlSelector).val("0");
    }
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (!isNaN(str)) {
            retValue = parseInt(str);
        }
    }
    return retValue;
}

function GetFirstDayOfCurrentMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
}

function GetLastDateOfCurrentMonth() {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
}

var RowColumnColorGrid = function (gridId) {
    $("#" + gridId + " tbody tr").each(function (i, row) {
        var $actualRow = $(row);
        if (i == 2 || i == 5) {
            if ($actualRow.find('.col2').html().indexOf('-') != -1) {
                $actualRow.find('.col2').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col2').addClass('rowColor9');
            }

            if ($actualRow.find('.col3').html().indexOf('-') != -1) {
                $actualRow.find('.col3').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col3').addClass('rowColor9');
            }

            if ($actualRow.find('.col4').html().indexOf('-') != -1) {
                $actualRow.find('.col4').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col4').addClass('rowColor9');
            }

            if ($actualRow.find('.col5').html().indexOf('-') != -1) {
                $actualRow.find('.col5').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col5').addClass('rowColor9');
            }

            if ($actualRow.find('.col6').html().indexOf('-') != -1) {
                $actualRow.find('.col6').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col6').addClass('rowColor9');
            }

            if ($actualRow.find('.col7').html().indexOf('-') != -1) {
                $actualRow.find('.col7').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col7').addClass('rowColor9');
            }

            if ($actualRow.find('.col8').html().indexOf('-') != -1) {
                $actualRow.find('.col8').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col8').addClass('rowColor9');
            }

            if ($actualRow.find('.col9').html().indexOf('-') != -1) {
                $actualRow.find('.col9').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col9').addClass('rowColor9');
            }

            if ($actualRow.find('.col10').html().indexOf('-') != -1) {
                $actualRow.find('.col10').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col10').addClass('rowColor9');
            }

            if ($actualRow.find('.col11').html().indexOf('-') != -1) {
                $actualRow.find('.col11').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col11').addClass('rowColor9');
            }

            if ($actualRow.find('.col12').html().indexOf('-') != -1) {
                $actualRow.find('.col12').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col12').addClass('rowColor9');
            }

            if ($actualRow.find('.col13').html().indexOf('-') != -1) {
                $actualRow.find('.col13').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col13').addClass('rowColor9');
            }
        }
        if (i == 8) {
            if ($actualRow.find('.col13').html().indexOf('-') != -1) {
                $actualRow.find('.col13').addClass('rowColor10');
            }
            else {
                $actualRow.find('.col13').addClass('rowColor9');
            }
        }
    });
};

var numbersData = null;
var limit = 0;
function BindNumbersDropdownData(maxValue, ddlSelector) {
    if (limit == maxValue && numbersData != null) {
        BindDropdownData(numbersData, ddlSelector, "");
    } else {
        $.ajax({
            type: "POST",
            url: homeUrl + "GetNumbers",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ limit: maxValue }),
            success: function (data) {
                limit = maxValue;
                numbersData = data;
                BindDropdownData(numbersData, ddlSelector, "");
            },
            error: function (errorResponse) {
                console.log(errorResponse);
            }
        });
    }
}

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}
function ToJavaScriptMonthDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}
(function ($) {
    $.fn.Scrollable = function (options) {
        var defaults = {
            ScrollHeight: 350, // to set height of grid 
            Width: 0 // to set width of grid Default value is 0 
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            var grid = $(this).get(0);
            var gridWidth = grid.offsetWidth;
            var gridHeight = grid.offsetHeight;
            var headerCellWidths = new Array();
            for (var i = 0; i < grid.getElementsByTagName("TH").length; i++) {
                headerCellWidths[i] = grid.getElementsByTagName("TH")[i].offsetWidth;
            }

            //var divElement = "<div style=\"background: none repeat scroll 0 0 #317cb3; \"></div>";
            var divElement = document.createElement("div");
            //divElement.setAttribute("background", "none repeat scroll 0 0 #317cb3");
            grid.parentNode.appendChild(divElement);
            var parentDiv = grid.parentNode;
            var table = document.createElement("table");
            for (i = 0; i < grid.attributes.length; i++) {
                if (grid.attributes[i].specified && grid.attributes[i].name != "id") {
                    table.setAttribute(grid.attributes[i].name, grid.attributes[i].value);
                }
            }
            table.style.cssText = grid.style.cssText;
            table.style.width = gridWidth + "px";
            table.appendChild(document.createElement("tbody"));
            table.getElementsByTagName("tbody")[0].appendChild(grid.getElementsByTagName("TR")[0]);
            var cells = table.getElementsByTagName("TH");

            var gridRow = grid.getElementsByTagName("TR")[0];
            for (var i = 0; i < cells.length; i++) {
                var width;
                if (gridRow != null && gridRow != undefined) {
                    if (headerCellWidths[i] > gridRow.getElementsByTagName("TD")[i].offsetWidth) {
                        width = headerCellWidths[i];
                    }
                    else {
                        width = gridRow.getElementsByTagName("TD")[i].offsetWidth;
                    }

                    cells[i].style.width = parseInt(width - 3) + "px";
                    gridRow.getElementsByTagName("TD")[i].style.width = parseInt(width - 3) + "px";
                }
            }
            parentDiv.removeChild(grid);

            var dummyHeader = document.createElement("div");
            dummyHeader.setAttribute("id", "blueHeaderDiv");

            dummyHeader.appendChild(table);
            parentDiv.appendChild(dummyHeader);
            if (options.Width > 0) {
                gridWidth = options.Width;
            }
            var scrollableDiv = document.createElement("div");
            if (parseInt(gridHeight) > options.ScrollHeight) {
                gridWidth = parseInt(gridWidth) + 17;
            }
            scrollableDiv.style.cssText = "overflow-y:scroll;max-height:" +
                //options.ScrollHeight + "px;width:" + gridWidth + "px";
                options.ScrollHeight + "px;";
            scrollableDiv.appendChild(grid);
            parentDiv.appendChild(scrollableDiv);
        });
    };
})(jQuery);

function BindInsuranceDropdownData(data, ddlSelector, hdSelector) {
    /// <summary>
    /// Binds the dropdown data.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    $(ddlSelector).empty();
    var items = '<option value="0">--Select--</option>';
    //items += '<option value="999">Self-Pay</option>';
    $.each(data, function (i, obj) {
        var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";

        //Filling the object to list
        items += newItem;
    });

    $(ddlSelector).html(items);
    if ($(hdSelector).val() != null && $(hdSelector).val() > 0) {
        $(ddlSelector).val($(hdSelector).val());
    }
    else {
        if ($(ddlSelector).length > 0)
            $(ddlSelector)[0].selectedIndex = 0;
    }
}

function GetFormattedDateValue(strDate) {
    var dateValue = new Date(strDate);
    strDate = dateFormat(dateValue, "dd/mm/yyyy");
    return strDate;
}

/// <var>The bind fiscal year ddl</var>
var BindFiscalYearDDls = function (selector, selectedval) {
    var currentYearplus = new Date().getFullYear();
    var currentYearminus = new Date().getFullYear();
    $(selector).append(
        $("<option></option>")
            .attr("value", '0')
            .text("--Select--")
    );
    for (var j = 5; j >= 1; j--) {
        var currentYearminusval = currentYearminus - j;
        $(selector).append(
            $("<option></option>")
                .attr("value", currentYearminusval)
                .text(currentYearminusval)
        );
    }
    for (var i = 1; i <= 5; i++) {
        $(selector).append(
            $("<option></option>")
                .attr("value", currentYearplus)
                .text(currentYearplus)
        );
        currentYearplus++;
    }
    if (selectedval != null && selectedval != '') { $(selector).val($(selectedval).val()); }
    else {
        $(selector).val(new Date().getFullYear().toString());
    }
};
var BindFiscalYearWithoutSelectDDls = function (selector, selectedval) {
    var currentYearplus = new Date().getFullYear();
    var currentYearminus = new Date().getFullYear();
    $(selector).append(
        $("<option></option>")
            .attr("value", '0')
            .text("--Select--")
    );
    for (var j = 5; j >= 1; j--) {
        var currentYearminusval = currentYearminus - j;
        $(selector).append(
            $("<option></option>")
                .attr("value", currentYearminusval)
                .text(currentYearminusval)
        );
    }
    for (var i = 1; i <= 5; i++) {
        $(selector).append(
            $("<option></option>")
                .attr("value", currentYearplus)
                .text(currentYearplus)
        );
        currentYearplus++;
    }

};
function BindDashboardFacilities(selector, selectedId) {
    //Bind Facilities
    /// <summary>
    /// Binds the facilities.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: homeUrl + "GetFacilitiesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--Corporate Level--</option>';

            $.each(data, function (i, facility) {
                items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
            });
            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

var BindIndicators = function (selector, selectedId) {
    $.ajax({
        type: "POST",
        url: "/DashboardIndicators/GetIndicators",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, selector, selectedId);
        },
        error: function (msg) {
        }
    });
}

var BindMonthsList = function (selector, selectedval) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    $(selector).append(
        $("<option></option>")
            .attr("value", '0')
            .text("--Select--")
    );
    for (var i = 1; i <= 12; i++) {
        $(selector).append(
            $("<option></option>")
                .attr("value", i)
                .text(month[i - 1])
        );
    }

    var currentMonth = parseInt(new Date().getMonth().toString(), 10) + 1;
    if (selectedval != null && selectedval != '') {
        $(selector).val(selectedval);
    } else {
        $(selector).val(currentMonth);
    }
};

var BindFiscalYearDDl = function (selector, selectedval) {
    var currentYear = new Date().getFullYear();
    $(selector).append(
        $("<option></option>")
            .attr("value", '0')
            .text("--Select--")
    );
    for (var i = 1; i <= 10; i++) {
        $(selector).append(
            $("<option></option>")
                .attr("value", currentYear)
                .text(currentYear)
        );
        currentYear++;
    }
    if (selectedval != '') {
        $(selector).val($(selectedval).val());
    } else {
        var currentdate = new Date();
        $(selector).val(currentdate.getFullYear().toString());
    }
};

function BindGlobalCodesWithValueCustom(selector, categoryIdval, hidValueSelector) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--All--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ($(hidValueSelector) != null && $(hidValueSelector).val() > 0)
                    $(selector).val($(hidValueSelector).val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

var BindMonthsListCustom = function (selector, selectedval) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    for (var i = 1; i <= 12; i++) {
        $(selector).append(
            $("<option></option>")
                .attr("value", i)
                .text(month[i - 1])
        );
    }
    if (selectedval != null && selectedval != '') {
        $(selector).val($(selectedval).val());
    } else {
        var currentmonth = new Date().getMonth() + 1;
        $(selector).val(currentmonth.toString());
    }
};

var BindMonthsListCustomPreviousMonth = function (selector, selectedval) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    for (var i = 1; i <= 12; i++) {
        $(selector).append(
            $("<option></option>")
                .attr("value", i)
                .text(month[i - 1])
        );
    }
    if (selectedval != null && selectedval != '') {
        $(selector).val($(selectedval).val());
    } else {
        var currentmonth = new Date().getMonth();
        currentmonth = currentmonth == 0 ? currentmonth + 1 : currentmonth;
        $(selector).val('6');
    }
};

function BindGlobalCodesWithValueSelection(selector, categoryIdval, hidValue) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                $(selector).html(items);

                if ((hidValue) != null && (hidValue != ""))
                    $(selector).val(hidValue);
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

//-------------------------Manual Dashboards Graphs Builder-------------------------------------//
//Here, chartLegendPosition could be vertical (1) or horizontal (2). If vertical, it will be set -90, otherwise 0.
function GraphsBuilderWith100(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M12) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });
        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else
        BuildThreeSeriesBarGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function GraphsBuilderWithoutPercentage(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseInt(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                monthsArray.push(parseInt(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                monthsArray.push(parseInt(dashboardData[i].M10));
                monthsArray.push(parseInt(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                monthsArray.push(parseInt(dashboardData[i].M10));
                monthsArray.push(parseInt(dashboardData[i].M11));
                monthsArray.push(parseInt(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 5)
        BuildThreeSeriseGraphWithOutDecimalLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 6)
        BuildThreeSeriseGraphWithLevel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 7)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month (000s)", categories);
}
function GraphsBuilderWithoutPercentageExecDashBoard(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphWithLegendsTooltipPercentageSWBExecDashBoard(containerid, dataArray, charttype, chartName, "By Month", categories);
}

var SubCategoryPieChartBuilder = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var datalength = dashboardData.length;
    var monthsArray = new Array();
    for (var i = 0; i < datalength; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M1) });
                break;
            case 2:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M2) });
                break;
            case 3:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M3) });
                break;
            case 4:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M4) });
                break;
            case 5:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M5) });
                break;
            case 6:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M6) });
                break;
            case 7:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M7) });
                break;
            case 8:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M8) });
                break;
            case 9:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M9) });
                break;
            case 10:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M10) });
                break;
            case 11:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M11) });
                break;
            default:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(dashboardData[i].M12) });
                break;
        }
    }
    ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'Year To Date');
}

var SubCategoryPieChartBuilderWithoutPercentage = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var datalength = dashboardData.length;
    var monthsArray = new Array();
    var value = 0;
    for (var i = 0; i < datalength; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                value = parseFloat(dashboardData[i].M1);
                break;
            case 2:
                value = parseFloat(dashboardData[i].M2);
                break;
            case 3:
                value = parseFloat(dashboardData[i].M3);
                break;
            case 4:
                value = parseFloat(dashboardData[i].M4);
                break;
            case 5:
                value = parseFloat(dashboardData[i].M5);
                break;
            case 6:
                value = parseFloat(dashboardData[i].M6);
                break;
            case 7:
                value = parseFloat(dashboardData[i].M7);
                break;
            case 8:
                value = parseFloat(dashboardData[i].M8);
                break;
            case 9:
                value = parseFloat(dashboardData[i].M9);
                break;
            case 10:
                value = parseFloat(dashboardData[i].M10);
                break;
            case 11:
                value = parseFloat(dashboardData[i].M11);
                break;
            default:
                value = parseFloat(dashboardData[i].M12);
                break;
        }

        if (value > 0) {
            SWBChartDataMonthly.push({ 'name': dashboardData[i].OtherDescription, 'y': value });
            //SWBChartDataMonthly.push({ 'name': dashboardData[i].OtherDescription.split('-')[1], 'y': value });
        }
    }
    if (chartFormattype == "1")
        ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'By Month');
    else if (chartFormattype == "3")
        ShowOnePieChartWithColorsWithOutPercentage(containerid, SWBChartDataMonthly, chartName, 'Current Month');
    else
        ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'By Month');
}

var SubCategoryBarChartBuilderWithPercentage = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var datalength = dashboardData.length;
    var monthsArray = new Array();
    var dataBuilder = new Array();
    for (var i = 0; i < datalength; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 2:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 3:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 4:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 5:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 6:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 7:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 8:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 9:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 10:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            case 11:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
            default:
                dataBuilder.push(new Array(dashboardData[i].Name, parseFloat(dashboardData[i].M1) * 100));
                break;
        }
    }
    ShowMultipleBarsGraph(containerid, dataBuilder, chartName, 'Current Month');
}

function EmptyGraphsBuilderWithoutPercentage(containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(0));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        dataArray.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 7)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month (000s)", categories);
    else
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "Current Month", categories);
}

function EmptyGraphsBuilderWithoutPercentageSubtitle(containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(0));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        dataArray.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, subtitle, categories);
    else
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function GraphsBuilderWith100Target(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();
    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                //monthsArray.push(parseFloat(Math.round(dashboardData[i].M1 * 100) / 100) * 100);
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M12) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriesBarGraphWithLegendsTooltipPercentageCustom(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseGraphCustomTargetColor(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphCustomTargetColorLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 5)
        BuildThreeSeriseGraphWithOutDecimalLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 6)
        BuildThreeSeriseGraphWithLevel(containerid, dataArray, charttype, chartName, "Total Emiratis", categories);
}

function GraphsBuilderWithoutPercentageTarget(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseGraphCustomTargetColor(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphCustomTargetColorLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function EmptyGraphsBuilderWithoutPercentageTarget(containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(0));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        dataArray.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function GraphsBuilderCustomSubTitleWithoutPercentage(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, subtitle, categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, subtitle, categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseBarGraphWithOutDecimals90Degree(containerid, dataArray, charttype, chartName, subtitle, categories);
    else if (chartLegendPosition == 5)
        BuildThreeSeriseBarGraphWithOutDecimals45Degree(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function GraphsBuilderWithPercentageCustom(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else
        BuildThreeSeriesBarGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
}

var SubCategoryPieChartBuilderYearToDate = function (dashboardData, containerid, charttype, chartName, chartFormattype, chartlegend1, chartlegend2) {
    var swbChartDataMonthly = new Array();
    if (dashboardData != null) {
        swbChartDataMonthly.push({ 'name': chartlegend1, 'y': 100 - parseFloat(dashboardData[0].CYTA) });
        swbChartDataMonthly.push({ 'name': chartlegend2, 'y': parseFloat(dashboardData[0].CYTA) });
        ShowOnePieChartWithColorsWithPercentage(containerid, swbChartDataMonthly, chartName, 'Year To Date');
    }
}

function GraphsTwoColumnBuilderWithoutPercentage(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 1; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 1 ? "Actual" : "Budget";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildTwoBarsChartWithLabelsOnBars(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildTwoBarsChartWithLabelsOnBars(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildTwoBarsChartWithLabelsOnBars(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function BuildFourBarGraphs(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 4; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }

        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        dataArray.push({ 'name': dashboardData[i].OtherDescription, 'data': monthsArray });
    }
    BuildFourSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function BuildActualFourBarGraphs(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        monthsArray = new Array();
        if (dashboardData[i].BudgetType == "2") {
            switch (parseInt(month)) {
                case 1:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    categories = ['Jan'];
                    break;
                case 2:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    categories = ['Jan', 'Feb'];
                    break;
                case 3:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    categories = ['Jan', 'Feb', 'Mar'];
                    break;
                case 4:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                    break;
                case 5:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    break;
                case 6:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    break;
                case 7:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    break;
                case 8:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    break;
                case 9:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                    break;
                case 10:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                    break;
                case 11:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                    break;
                default:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    monthsArray.push(parseFloat(dashboardData[i].M12));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    break;
            }
            //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
            dataArray.push({ 'name': dashboardData[i].SubCategoryValue1Str, 'data': monthsArray });
        }
    }
    BuildFourSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function BuildBudgetFourBarGraphs(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        monthsArray = new Array();
        if (dashboardData[i].BudgetType == "1") {
            switch (parseInt(month)) {
                case 1:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    categories = ['Jan'];
                    break;
                case 2:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    categories = ['Jan', 'Feb'];
                    break;
                case 3:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    categories = ['Jan', 'Feb', 'Mar'];
                    break;
                case 4:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                    break;
                case 5:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    break;
                case 6:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    break;
                case 7:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    break;
                case 8:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    break;
                case 9:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                    break;
                case 10:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                    break;
                case 11:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                    break;
                default:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    monthsArray.push(parseFloat(dashboardData[i].M12));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    break;
            }
            var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
            dataArray.push({ 'name': dashboardData[i].SubCategoryValue1Str, 'data': monthsArray });
        }
    }
    BuildFourSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function GraphsBuilderWithoutPercentageDefination(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        dataArray.push({ 'name': dashboardData[i].Defination, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseGraphCustomTargetColor(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphCustomTargetColorLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function BuildBudgetNineBarGraphs(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        monthsArray = new Array();
        if (dashboardData[i].BudgetType == "2") {
            switch (parseInt(month)) {
                case 1:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    categories = ['Jan'];
                    break;
                case 2:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    categories = ['Jan', 'Feb'];
                    break;
                case 3:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    categories = ['Jan', 'Feb', 'Mar'];
                    break;
                case 4:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                    break;
                case 5:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    break;
                case 6:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    break;
                case 7:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    break;
                case 8:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    break;
                case 9:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                    break;
                case 10:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                    break;
                case 11:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                    break;
                default:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    monthsArray.push(parseFloat(dashboardData[i].M12));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    break;
            }
            dataArray.push({ 'name': dashboardData[i].SubCategoryValue1Str, 'data': monthsArray });
        }
    }
    BuildNineSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function BuildBudgetTenBarGraphs(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        monthsArray = new Array();
        if (dashboardData[i].BudgetType == "2") {
            switch (parseInt(month)) {
                case 1:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    categories = ['Jan'];
                    break;
                case 2:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    categories = ['Jan', 'Feb'];
                    break;
                case 3:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    categories = ['Jan', 'Feb', 'Mar'];
                    break;
                case 4:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                    break;
                case 5:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    break;
                case 6:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    break;
                case 7:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    break;
                case 8:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    break;
                case 9:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                    break;
                case 10:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                    break;
                case 11:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                    break;
                default:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    monthsArray.push(parseFloat(dashboardData[i].M12));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    break;
            }
            dataArray.push({ 'name': dashboardData[i].SubCategoryValue1Str, 'data': monthsArray });
        }
    }
    BuildTenSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function GraphsBuilderWithLegends(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        dataArray.push({ 'name': dashboardData[i].IndicatorTypeStr, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 5)
        BuildThreeSeriseGraphWithLevel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 6)
        BuildTwoSerisePercentageGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function GraphsBuilderPercentageWithLegends(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M12) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        dataArray.push({ 'name': dashboardData[i].IndicatorTypeStr, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 5)
        BuildThreeSeriseGraphWithLevel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 6)
        BuildTwoSerisePercentageGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function GraphsBuilderPercentageWithLegends_Custom(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M2) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M3) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M4) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M5) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M6) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M7) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M8) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M9) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M10) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M11) * 100);
                monthsArray.push(parseFloat(dashboardData[i].M12) * 100);
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        dataArray.push({ 'name': dashboardData[i].IndicatorTypeStr, 'data': monthsArray });
    }
    if (chartLegendPosition == 6)
        BuildTwoSeriseGraphWithLegendsTooltip_Custom(containerid, dataArray, charttype, chartName, "Number of Leavers", categories);
    //BuildTwoSerisePercentageGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function GraphsBuilderTwoBarWithLegendsWithoutDecimal(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseInt(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                monthsArray.push(parseInt(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                monthsArray.push(parseInt(dashboardData[i].M10));
                monthsArray.push(parseInt(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseInt(dashboardData[i].M1));
                monthsArray.push(parseInt(dashboardData[i].M2));
                monthsArray.push(parseInt(dashboardData[i].M3));
                monthsArray.push(parseInt(dashboardData[i].M4));
                monthsArray.push(parseInt(dashboardData[i].M5));
                monthsArray.push(parseInt(dashboardData[i].M6));
                monthsArray.push(parseInt(dashboardData[i].M7));
                monthsArray.push(parseInt(dashboardData[i].M8));
                monthsArray.push(parseInt(dashboardData[i].M9));
                monthsArray.push(parseInt(dashboardData[i].M10));
                monthsArray.push(parseInt(dashboardData[i].M11));
                monthsArray.push(parseInt(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        dataArray.push({ 'name': dashboardData[i].IndicatorTypeStr, 'data': monthsArray });
    }
    if (chartLegendPosition == 5)
        BuildTwoSeriseGraphWithLegendsTooltip_Custom(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 6)
        BuildTwoSerisePercentageGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
}

function GraphWithSubCategoryLegendsWithoutDecimal(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();
    var monthsArray = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        monthsArray = new Array();
        if (dashboardData[i].BudgetType == "2") {
            switch (parseInt(month)) {
                case 1:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    categories = ['Jan'];
                    break;
                case 2:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    categories = ['Jan', 'Feb'];
                    break;
                case 3:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    categories = ['Jan', 'Feb', 'Mar'];
                    break;
                case 4:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                    break;
                case 5:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    break;
                case 6:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    break;
                case 7:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    monthsArray.push(parseInt(dashboardData[i].M7));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    break;
                case 8:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    monthsArray.push(parseInt(dashboardData[i].M7));
                    monthsArray.push(parseInt(dashboardData[i].M8));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    break;
                case 9:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    monthsArray.push(parseInt(dashboardData[i].M7));
                    monthsArray.push(parseInt(dashboardData[i].M8));
                    monthsArray.push(parseInt(dashboardData[i].M9));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                    break;
                case 10:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    monthsArray.push(parseInt(dashboardData[i].M7));
                    monthsArray.push(parseInt(dashboardData[i].M8));
                    monthsArray.push(parseInt(dashboardData[i].M9));
                    monthsArray.push(parseInt(dashboardData[i].M10));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                    break;
                case 11:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    monthsArray.push(parseInt(dashboardData[i].M7));
                    monthsArray.push(parseInt(dashboardData[i].M8));
                    monthsArray.push(parseInt(dashboardData[i].M9));
                    monthsArray.push(parseInt(dashboardData[i].M10));
                    monthsArray.push(parseInt(dashboardData[i].M11));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                    break;
                default:
                    monthsArray.push(parseInt(dashboardData[i].M1));
                    monthsArray.push(parseInt(dashboardData[i].M2));
                    monthsArray.push(parseInt(dashboardData[i].M3));
                    monthsArray.push(parseInt(dashboardData[i].M4));
                    monthsArray.push(parseInt(dashboardData[i].M5));
                    monthsArray.push(parseInt(dashboardData[i].M6));
                    monthsArray.push(parseInt(dashboardData[i].M7));
                    monthsArray.push(parseInt(dashboardData[i].M8));
                    monthsArray.push(parseInt(dashboardData[i].M9));
                    monthsArray.push(parseInt(dashboardData[i].M10));
                    monthsArray.push(parseInt(dashboardData[i].M11));
                    monthsArray.push(parseInt(dashboardData[i].M12));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    break;
            }
            dataArray.push({ 'name': dashboardData[i].SubCategoryValue1Str, 'data': monthsArray });
        }
    }
    if (chartLegendPosition == 5)
        BuildTwoSeriseGraphWithLegendsTooltip_Custom(containerid, dataArray, charttype, chartName, "By Month", categories);
    else
        BuildThreeSeriesBarGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
}

var SubCategoryPieChartBuilderYearToDate_CustomName = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var swbChartDataMonthly = new Array();
    if (dashboardData != null) {
        for (var i = 0; i < dashboardData.length; i++) {
            var name = dashboardData[i].DashBoard;//.replace("Admission by Referral Source", "");
            //var name = name.substring(0, 15) + '..';
            // swbChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].CYTA), 'tooltip': name });
            if (dashboardData[i].CYTA > 0) {
                swbChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].CYTA) });
            }
        }
        ShowOnePieChartWithColorsWithOutPercentage(containerid, swbChartDataMonthly, chartName, 'Year To Date');
    }
}


function BindMonthActualAndYtdGraph(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var chartData = new Array();
    var categories = new Array();
    switch (parseInt(month)) {
        //case 1:
        //    categories = ['Jan'];
        //    break;
        //case 2:
        //    categories = ['Jan', 'Feb'];
        //    break;
        //case 3:
        //    categories = ['Jan', 'Feb', 'Mar'];
        //    break;
        //case 4:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
        //    break;
        //case 5:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        //    break;
        //case 6:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        //    break;
        //case 7:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        //    break;
        //case 8:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
        //    break;
        //case 9:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        //    break;
        //case 10:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

        //    break;
        //case 11:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
        //    break;
        //default:
        //    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        //    break;
        case 1:
            categories = ['January'];
            break;
        case 2:
            categories = ['February'];
            break;
        case 3:
            categories = ['March'];
            break;
        case 4:
            categories = ['April'];
            break;
        case 5:
            categories = ['May'];
            break;
        case 6:
            categories = ['June'];
            break;
        case 7:
            categories = ['July'];
            break;
        case 8:
            categories = ['August'];
            break;
        case 9:
            categories = ['September'];
            break;
        case 10:
            categories = ['October'];
            break;
        case 11:
            categories = ['November'];
            break;
        default:
            categories = ['December'];
            break;
    }
    if (dashboardData != null) {
        for (var i = 0; i < dashboardData.length; i++) {
            chartData.push({ 'name': "Current Month", 'data': [parseInt(dashboardData[i].CMA)] });
            chartData.push({ 'name': "Year To Date", 'data': [parseInt(dashboardData[i].CYTA)] });
        }
        BuildTwoSeriseGraphWithLegendsTooltip(containerid, chartData, charttype, chartName, subtitle, categories);
    }
}

function BindMonthOnlyGraph(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var chartData = new Array();
    var categories = new Array();
    //var colorArray = new Array();
    if (dashboardData != null) {
        if (dashboardData.length == 8) {
            for (var i = 0; i < dashboardData.length; i++) {
                chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseInt(dashboardData[i].CMA)] });
                categories.push(dashboardData[i].DashBoard);
            }
            BuildEightSeriseBarGraphWithOutDecimals(containerid, chartData, charttype, chartName, subtitle, categories);
        }
        else
            if (dashboardData.length == 4) {
                for (var j = 0; j < dashboardData.length; j++) {
                    chartData.push({ 'name': dashboardData[j].DashBoard, 'data': [parseFloat(dashboardData[j].CMA)] });
                    categories.push(dashboardData[j].DashBoard);
                }
                BuildFourSeriseBarGraphWithDecimals(containerid, chartData, charttype, chartName, subtitle, categories, categories);
            }
    }
}

function BindYearToDateOnlyGraph(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var chartData = new Array();
    var categories = new Array();
    //var colorArray = new Array();
    if (dashboardData != null) {
        //switch (dashboardData.length) {
        //    case 1:
        //        colorArray = ["#87CEFF"];
        //        break;
        //    case 2:
        //        colorArray = ["#87CEFF", "#00FFFF"];
        //        break;
        //    case 3:
        //        colorArray = ["#87CEFF", "#00FFFF", "#00FF7F"];
        //        break;
        //    case 4:
        //        colorArray = ["#87CEFF", "#00FFFF", "#00FF7F", "#FF6A6A"];
        //        break;
        //    case 5:
        //        colorArray = ["#87CEFF", "#00FFFF", "#00FF7F", "#FF6A6A", "#7171C6"];
        //        break;
        //    case 6:
        //        colorArray = ["#87CEFF", "#00FFFF", "#00FF7F", "#FF6A6A", "#7171C6", "#FF7F00"];
        //        break;
        //    case 7:
        //        colorArray = ["#87CEFF", "#00FFFF", "#00FF7F", "#FF6A6A", "#7171C6", "#FF7F00", "#FFD700"];
        //        break;
        //    case 8:
        //        colorArray = ["#87CEFF", "#00FFFF", "#00FF7F", "#FF6A6A", "#7171C6", "#FF7F00", "#FFD700", "#00CD00"];
        //        break;
        //}

        if (dashboardData.length == 8) {
            for (var i = 0; i < dashboardData.length; i++) {
                chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseInt(dashboardData[i].CYTA)] });
                categories.push(dashboardData[i].DashBoard);
            }
            BuildEightSeriseBarGraphWithDecimals(containerid, chartData, charttype, chartName, subtitle, categories);
        }
        else
            if (dashboardData.length == 4) {
                for (var j = 0; j < dashboardData.length; j++) {
                    chartData.push({ 'name': dashboardData[j].DashBoard, 'data': [parseFloat(dashboardData[j].CYTA)] });
                    categories.push(dashboardData[j].DashBoard);
                }
                BuildFourSeriseBarGraphWithDecimals(containerid, chartData, charttype, chartName, subtitle, categories, categories);
            }
    }
}

function EmptyGraphsBuilderWithoutPercentageSubtitleTwoBar(containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var chartData = new Array();
    var categories = new Array();
    categories = ["Current Month", "Year To Date"];
    chartData.push({ 'name': 'Current Month', 'data': parseFloat(0) });
    chartData.push({ 'name': "Year To Date", 'data': parseFloat(0) });
    BuildTwoSeriseGraphWithLegendsTooltip(containerid, chartData, charttype, chartName, subtitle, categories);
}

function EmptyGraphMonthly(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var chartData = new Array();
    var categories = new Array();
    if (dashboardData.length == 8) {
        for (var i = 0; i < dashboardData.length; i++) {
            chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseInt(0)] });
            categories.push(dashboardData[i].DashBoard);
        }
        BuildEightSeriseBarGraphWithOutDecimals(containerid, chartData, charttype, chartName, subtitle, categories);
    }
    else
        if (dashboardData.length == 4) {
            for (var j = 0; j < dashboardData.length; j++) {
                chartData.push({ 'name': dashboardData[j].DashBoard, 'data': [parseFloat(0)] });
                categories.push(dashboardData[j].DashBoard);
            }
            BuildFourSeriseBarGraphWithDecimals(containerid, chartData, charttype, chartName, subtitle, categories, categories);
        }
}

function EmptyGraphYearToDate(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var chartData = new Array();
    if (dashboardData.length == 8) {
        for (var i = 0; i < dashboardData.length; i++) {
            chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseInt(0)] });
            categories.push(dashboardData[i].DashBoard);
        }
        BuildEightSeriseBarGraphWithOutDecimals(containerid, chartData, charttype, chartName, subtitle, categories);
    }
    else
        if (dashboardData.length == 4) {
            for (var j = 0; j < dashboardData.length; j++) {
                chartData.push({ 'name': dashboardData[j].DashBoard, 'data': [parseFloat(0)] });
                categories.push(dashboardData[j].DashBoard);
            }
            BuildFourSeriseBarGraphWithDecimals(containerid, chartData, charttype, chartName, subtitle, categories, categories);
        }
}

//-------------------------Manual Dashboards Graphs Builder-------------------------------------//

function BindFacilitiesWithoutCorporate(selector, selectedId) {
    //Bind Facilities
    /// <summary>
    /// Binds the facilities.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: homeUrl + "GetFacilitiesWithoutCorporateDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            $(selector).empty();

            var items = '<option value="0">--All--</option>';

            $.each(data, function (i, facility) {
                items += "<option value='" + facility.Value + "'>" + facility.Text + "</option>";
            });
            $(selector).html(items);

            if (selectedId != null && selectedId != '')
                $(selector).val(selectedId);
        },
        error: function (msg) {
        }
    });
}

function BindDropdownDataWithAllDefault(data, ddlSelector, hdSelector) {
    /// <summary>
    /// Binds the dropdown data.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    $(ddlSelector).empty();
    var items = '<option value="0">--All--</option>';
    $.each(data, function (i, obj) {
        var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";

        //If contains some ExternalValue
        //if (obj.ExternalValue1 != null) {
        //    var d = new Date();
        //    var endDate = new Date(obj.ExternalValue1);
        //    if (endDate != null && endDate < d) {
        //        newItem = "<option class='disabledOptions' id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
        //    }
        //}

        //if ($("option").hasClass("disabledOptions")) {
        //    $(ddlSelector).css("background-color", "#000");
        //}
        //else {
        //    $(ddlSelector).css("background-color", "#fff");
        //}

        //Filling the object to list
        items += newItem;
    });

    $(ddlSelector).html(items);

    var hdValue = "";
    if (hdSelector.indexOf('#') != -1) {
        hdValue = $(hdSelector).val();
    }
    else {
        hdValue = hdSelector;
    }

    if (hdValue != null && hdValue != '') {
        $(ddlSelector).val(hdValue);
        if ($(ddlSelector).val() == null || $(ddlSelector).val() == undefined) {
            //var selectedText = ddlSelector + " option:contains(" + theText + ")";
            //$(ddlSelector + " option:contains(" + hdValue + ")").attr("selected", "selected");
            //$(ddlSelector + " option:" + hdValue).attr("selected", "selected");
            //var myText = 'Diagnosis';
            //$('#ddlLHST option').map(function () {
            //    if ($(this).text() == myText) return this;
            //}).attr('selected', 'selected');
            $(ddlSelector + " option").filter(function (index) { return $(this).text() === "" + hdValue + ""; }).attr('selected', 'selected');
        }
    }
    else {
        if ($(ddlSelector).length > 0)
            $(ddlSelector)[0].selectedIndex = 0;
    }
}

var blockSelectedDiv = function (divId) {
    $('#' + divId).block({
        message: '<img src="/images/ajax-loader-bar.GIF"><p>Please wait...</p>',
        css: {
            border: 'none',
            padding: '15px',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
        }
    });
};

var blockSelectedClassObj = function (classname) {
    $('.' + classname).block({
        message: '<img src="/images/ajax-loader-bar.GIF"><p>Please wait...</p>',
        css: {
            border: 'none',
            padding: '15px',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
        }
    });
};

var UnblockSelectedClassObj = function (classname) {
    $('.' + classname).unblock();
};

var UnblockSelectedDiv = function (divId) {
    $('#' + divId).unblock();
};

var ShowModalPopup = function (divId) {
    $('#' + divId).block({
        css: {
            border: 'none',
            padding: '15px',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
        }
    });
};

function BindLinkUrlsForSuperPowers() {
    /*
    By: Amit Jain 
    On: 02 July, 2015
    Purpose: Super Powers: Add links dynamically based on the screen where user can see the Patient Related Information 
    such as Bills, Patient Info, EMR / EHR, Labs, Physician Tasks etc.
    */
    var patientId = $("#GlobalPatientId").val();
    var encounterId = $("#GlobalEncounterId").val();

    if ($("#GlobalPatientId").length > 0 && patientId != '' && patientId > 0) {
        $("#emrLink").attr("href", "/Summary/PatientSummary?pId=" + patientId);
        if ($("#GlobalEncounterId").length > 0 && encounterId != '' && encounterId > 0) {
            $("#billHeaderLink").attr("href", "/PreliminaryBill/Index?eId=" + encounterId + "&pId=" + patientId);
            //$("#DiagnosisLink").attr("href", "/Diagnosis/Index?eId=" + encounterId + "&pId=" + patientId);
        } else {
            //$("#billHeaderLink").attr("href", "#");
            $("#billHeaderLink").attr("href", "/PreliminaryBill/Index?eId=" + 0 + "&pId=" + patientId);
            //$("#DiagnosisLink").attr("href", "#");
        }

        $("#VitalsLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 5);
        $("#labsLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 6);
        $("#radiologyLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 7);
        $("#PharmacyLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 9);
        $("#PhysicianTasksLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 10);
        $("#NurseTasksLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 11);
        $("#DiagnosisLink").attr("href", "/Summary/PatientSummary?pId=" + patientId + "&sTab=" + 12);
        $("#ScheduleLink").attr("href", "/PatientScheduler/Index?pId=" + patientId);
        $("#authorizationLink").attr("onclick", "ShowAuthorizationPopupWindowGlobal();");
        $("#PhysicianEmLink").attr("onclick", "ViewNewEvaluationForm();");
    }
    else {
        $("#billHeaderLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#labsLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#radiologyLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#PharmacyLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#VitalsLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#emrLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#NurseTasksLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#PhysicianTasksLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#authorizationLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#DiagnosisLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#PhysicianEmLink").attr("href", "/PatientSearch/PatientSearch?messageid=99");
        $("#ScheduleLink").attr("href", "/PatientSearch/PatientSearch?messageid=12");
        //window.location.href = window.location.protocol + "//" + window.location.host + "/PatientSearch/PatientSearch?messageid=99";
    }
}

function BindGlobalCodeValuesToMultipleControls(selectors, categoryIdval) {
    var selectorArray = selectors.split(',');
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                if (items.length > 0 && selectorArray.length > 0) {
                    $(selectorArray).each(function () {
                        $(this).empty();
                        $(this).html(items);
                    });
                }
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindGlobalCodeValuesClasss(clsselectors, categoryIdval) {
    var jsonData = JSON.stringify({
        categoryId: categoryIdval
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetGlobalCodes",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, globalCode) {
                    items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
                });
                if (items.length > 0 && clsselectors.length > 0) {
                    $(clsselectors).empty();
                    $(clsselectors).html(items);
                }
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function BindAndSetDefaultMonth(category, fId, ddlYearSelector, ddlMonthSelector) {
    var jsonData = JSON.stringify({
        categoryId: category, facilityId: fId
    });
    $.ajax({
        type: "POST",
        url: homeUrl + "GetMonthsData",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            BindDropdownData(data.list, ddlMonthSelector, "");
            $(ddlMonthSelector).val(data.defaultMonth);

            if ($(ddlYearSelector).length > 0)
                $(ddlYearSelector).val(data.defaultYear);
        },
        error: function (msg) {
        }
    });
    //$.post(homeUrl + "GetMonthsData", { categoryId: category, facilityId: fId }, function (data) {
    //    BindDropdownData(data.list, ddlMonthSelector, "");
    //    $(ddlMonthSelector).val(data.defaultMonth);

    //    if ($(ddlYearSelector).length > 0)
    //        $(ddlYearSelector).val(data.defaultYear);
    //});
}

function BuildActualFiveBarGraphs(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        monthsArray = new Array();
        if (dashboardData[i].BudgetType == "2") {
            switch (parseInt(month)) {
                case 1:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    categories = ['Jan'];
                    break;
                case 2:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    categories = ['Jan', 'Feb'];
                    break;
                case 3:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    categories = ['Jan', 'Feb', 'Mar'];
                    break;
                case 4:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                    break;
                case 5:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                    break;
                case 6:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    break;
                case 7:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                    break;
                case 8:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                    break;
                case 9:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                    break;
                case 10:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                    break;
                case 11:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                    break;
                default:
                    monthsArray.push(parseFloat(dashboardData[i].M1));
                    monthsArray.push(parseFloat(dashboardData[i].M2));
                    monthsArray.push(parseFloat(dashboardData[i].M3));
                    monthsArray.push(parseFloat(dashboardData[i].M4));
                    monthsArray.push(parseFloat(dashboardData[i].M5));
                    monthsArray.push(parseFloat(dashboardData[i].M6));
                    monthsArray.push(parseFloat(dashboardData[i].M7));
                    monthsArray.push(parseFloat(dashboardData[i].M8));
                    monthsArray.push(parseFloat(dashboardData[i].M9));
                    monthsArray.push(parseFloat(dashboardData[i].M10));
                    monthsArray.push(parseFloat(dashboardData[i].M11));
                    monthsArray.push(parseFloat(dashboardData[i].M12));
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    break;
            }
            //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
            dataArray.push({ 'name': dashboardData[i].SubCategoryValue1Str, 'data': monthsArray });
        }
    }
    BuildFiveSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, subtitle, categories);
}

function isEmpty(selector) {
    return !$.trim($(selector).html());
}

function SetGridCheckBoxes() {
    var count = 1;
    $('.table_scroll thead tr th').each(function () {
        if (count == 1) {
            this.innerHTML = "<input type='checkbox' id='chkHeader' title='Select All' />";
            count++;
        }
    });

    setTimeout(CheckBoxIsSelectedEvent(), 500);
}

var ShowHideViewRecords = function () {
    if ($('#ddlCorporate').val() != '0') {
        if ($('#ddlFacility').val() != null && $('#ddlFacility').val() != '0')
            $('#btnViewALL').show();
        else
            $('#btnViewALL').hide();
    }
    else
        $('#btnViewALL').hide();
};

//var ViewRecords = function (typeid) {
//    var tbaleNumber = $("#ddlTableSet").val();
//    if ($("#ddlTableSet").length > 0 && $("#ddlTableSet").val() > 0) {
//        $("#hfCodeTableNumber").val(tbaleNumber);
//        var jsonData = JSON.stringify({
//            tableNumber: $("#ddlTableSet").val() == 100000 ? "0" : $("#ddlTableSet").val(),
//            type: typeid
//        });
//        $.ajax({
//            type: "POST",
//            url: '/Home/GetCodesByFacility',
//            async: false,
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            data: jsonData,
//            success: function (data) {
//                blockNumber = 2;
//                if (typeid == '8') {
//                    $("#ServiceCodeListDiv").empty();
//                    $("#ServiceCodeListDiv").html(data);
//                } else if (typeid == '3') {
//                    $("#CPTCodesListDiv").empty();
//                    $("#CPTCodesListDiv").html(data);
//                } else if (typeid == '4') {
//                    $("#HCPCSCodesListDiv").empty();
//                    $("#HCPCSCodesListDiv").html(data);
//                } else if (typeid == '5') {
//                    $("#DrugListDiv").empty();
//                    $("#DrugListDiv").html(data);
//                } else if (typeid == '9') {
//                    $("#DRGCodesListDiv").empty();
//                    $("#DRGCodesListDiv").html(data);
//                } else if (typeid == '16') {
//                    $("#DiagnosisCodeListDiv").empty();
//                    $("#DiagnosisCodeListDiv").html(data);
//                }
//                SetGridCheckBoxes();
//            },
//            error: function (msg) {
//                ShowMessage("Error while Coping the records!", "Warning", "warning", true);
//            }
//        });
//    }
//};


var ViewRecords = function (typeid) {
    var tbaleNumber = $("#ddlTableSet").val();
    $("#hfCodeTableNumber").val(tbaleNumber);
    var jsonData = JSON.stringify({
        tableNumber: $("#ddlTableSet").val() == 100000 ? "0" : $("#ddlTableSet").val(),
        type: typeid
    });
    $.ajax({
        type: "POST",
        url: '/Home/GetCodesByFacility',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            blockNumber = 2;
            if (typeid == '8') {
                $("#ServiceCodeListDiv").empty();
                $("#ServiceCodeListDiv").html(data);
            } else if (typeid == '3') {
                $("#CPTCodesListDiv").empty();
                $("#CPTCodesListDiv").html(data);
            } else if (typeid == '4') {
                $("#HCPCSCodesListDiv").empty();
                $("#HCPCSCodesListDiv").html(data);
            } else if (typeid == '5') {
                $("#DrugListDiv").empty();
                $("#DrugListDiv").html(data);
            } else if (typeid == '9') {
                $("#DRGCodesListDiv").empty();
                $("#DRGCodesListDiv").html(data);
            } else if (typeid == '16') {
                $("#DiagnosisCodeListDiv").empty();
                $("#DiagnosisCodeListDiv").html(data);
            }
            SetGridCheckBoxes();
        },
        error: function (msg) {
            ShowMessage("Error while Coping the records!", "Warning", "warning", true);
        }
    });
};


function BindFacilitiesDropdownDataWithFacilityNumbers(ddlSelector, hdSelector) {
    var corporateid = $("#ddlCorporate").val() == null ? '6' : $("#ddlCorporate").val();
    $.ajax({
        type: "POST",
        url: homeUrl + "GetFacilitiesDropdownDataWithFacilityNumber",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ corporateId: corporateid }),
        success: function (data) {
            BindDropdownData(data, ddlSelector, hdSelector);
        },
        error: function (errorResponse) {
        }
    });
}

function CopyBillingCodes(typeId, isAll) {
    var selectedids = [];
    if (!isAll) {
        $(".check-box:checked").each(function () {
            selectedids.push($(this)[0].value);
        });
    }
    var jsonData = JSON.stringify({
        corporateId: $('#ddlCorporate').val(),
        facilityNumber: $('#ddlFacility').val(),
        selectedCodes: selectedids,
        isAll: isAll,
        typeId: typeId,
    });
    $.ajax({
        type: "POST",
        url: '/Home/CopyBillingCodes',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            var msg = 'Codes Copied Successfully.';
            var msgType = "success";
            var caption = "Success";
            if (data != null) {
                if (data == '-2') {
                    msg = "Unable to Add records! No Table number defined for the Facility in Billing System Parameters Screen";
                    msgType = "warning";
                    caption = "Warning";
                }
                else if (data == '-1') {
                    msg = "No Code Table-Number defined to this Corporate. Please contact Admin or set at Billing Parameters!";
                    msgType = "error";
                    caption = "Alert";
                }
                else if (data == '-3') {
                    msg = "Select at least one Billing code and then try again!";
                    msgType = "warning";
                    caption = "Warning";
                }
            }
            else {
                msg = "Error while copying data. Please try again later!";
                msgType = "error";
                caption = "Alert";
            }
            ShowMessage(msg, caption, msgType, true);
        },
        error: function (msg) {

        }
    });
}

function BindTableSetList(typeId, ddlSelector, hdValue) {
    $.ajax({
        type: "POST",
        url: '/Home/GetTableNumbers',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ typeId: typeId }),
        success: function (data) {
            $(ddlSelector).empty();
            var items = '<option value="0">--Select--</option>';
            $.each(data, function (i, obj) {
                var newItem = "<option id='" + obj.TableNumber + "'  value='" + (obj.TableNumber == "0" ? "100000" : obj.TableNumber) + "'>" + (obj.TableNumber != "0" ? obj.TableNumber : "Default") + "</option>";
                items += newItem;
            });
            $(ddlSelector).html(items);

            $(ddlSelector).val((hdValue != null && hdValue > 0) ? hdValue : 0);
        },
        error: function (msg) {

        }
    });
}

function ShowTableSetPanel(selector, idSelected) {
    if ($(selector)[0].checked) {
        $("#tableSetPanel").show();
        if (idSelected == 1) {
            $("#rdCopyExisting").prop("checked", false);
            $("#divNewTableNumber").show();
        } else {
            $("#rdNewTableNumber").prop("checked", false);
            $("#divNewTableNumber").hide();
            $("#tableNumber").val('');
        }
    }
    else
        $("#tableSetPanel").hide();
}

//function ShowButtonsPanel(id) {

//    if ($(id)[0].checked) {
//        $("#btnSetPanel").show();
//        $("#rdNewTableNumber").prop("checked", false);
//        $("#tableSetPanel").hide();
//    } else {
//        $("#btnSetPanel").hide();
//    }
//}


function CheckDuplicateTableSet(typeId) {
    if ($("#tableNumber").val() > 0) {
        $.ajax({
            type: "POST",
            url: '/Home/CheckForDuplicateTableSet',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ typeId: typeId, tablNumber: $("#tableNumber").val() }),
            success: function (data) {
                if (data == true) {
                    var msg = "The table number already exists for this Billing Code";
                    if (typeId == 19) { //This applies to Bill Edit Rules 
                        msg = "The table number already exists for this Bill Edit Rule";
                    }
                    ShowMessage(msg, "Warning", "warning", true);
                    $("#tableNumber").focus();
                }
            },
            error: function (msg) {

            }
        });
    } else {
        ShowMessage("Table Number must not have a valid numeric value!", "Warning", "warning", true);
        $("#tableNumber").focus();
        return false;
    }
    return false;
}

function SaveTableSet(typeId, allSelected) {
    var forExistingTableNumber = $("#rdCopyExisting").length > 0 && $("#rdCopyExisting")[0].checked ? true : false;
    var tableNumberSelected = (forExistingTableNumber && $("#ddlTableSet").val() > 0) ? $("#ddlTableSet").val() : $("#tableNumber").val();
    if (tableNumberSelected > 0) {
        var selectedids = [];
        if (!allSelected) {
            $(".check-box:checked").each(function () {
                selectedids.push($(this)[0].value);
            });
            if (selectedids.length == 0) {
                ShowMessage("Select at least one record first from the list to copy !", "Warning", "warning", true);
                return;
            }
        }
        var jsonData = JSON.stringify({
            tableNumber: tableNumberSelected,
            selectedCodes: selectedids,
            isAll: allSelected,
            typeId: typeId,
            forExisting: (forExistingTableNumber && $("#ddlTableSet").val() > 0)
        });
        $.ajax({
            type: "POST",
            url: '/Home/CreateNewCodeSet',
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            success: function (data) {
                if (data != null) {
                    if (data == "-2") {
                        var msg1 = "The table number already exists for this Billing Code!";
                        if (typeId == 19) { //This code applies to Bill Edit Rules
                            msg1 = "The table number already exists for this Bill Edit Rule!";
                        }
                        ShowMessage(msg1, "Warning", "warning", true);
                        $("#tableNumber").focus();
                    }
                    else if (data == "-1") {
                        ShowMessage("Something went wrong while saving records. Please try again later!", "Error", "error", true);
                    }
                    else {
                        ShowMessage("New Table Set Created Successfully. ", "Success", "success", true);
                        BindTableSetList(typeId, "#ddlTableSet", "0");

                        $('input:checkbox').removeAttr('checked');
                    }
                    $("#tableNumber").val('');
                }
            },
            error: function () {

            }
        });
    } else {
        var msg = "";
        if (typeId == 19) { //This code applies to Bill Edit Rules
            msg = "You must enter the Table Number/Select table number first to copy Bill Edit Rule!";
            ShowMessage(msg, "Warning", "warning", true);

        }
        //else {
        //    msg = "You must enter the Table Number / make the selection first to copy the Codes!";
        //    ShowMessage(msg, "Warning", "warning", true);
        //    }
        //ShowMessage(msg, "Warning", "warning", true);
        $("#tableNumber").focus();
    }
}

function CheckBoxIsSelectedEvent() {
    $('#chkHeader').on('click', function (e) {
        $(".check-box").prop('checked', e.target.checked);
    });

    $('.check-box').on('click', function (e) {
        var checkedCount = $('.check-box:checked').length;
        var classCount = $('.check-box').length;
        $("#chkHeader").prop('checked', checkedCount == classCount);
    });
}
function Change12HrTo24HrFormat(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
}

function BindFacilityByCoporateId() {
    var coporateId = $('#ddlCorporate').val();
    var jsonData = JSON.stringify({
        Id: coporateId
    });
    $.ajax({
        type: "POST",
        url: '/Facility/GetCorporateFacilities',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            if (data) {
                $("#ddlFacility").empty();
                var items = '<option value="0">--Select--</option>';
                $.each(data, function (i, item) {
                    items += "<option value='" + item.FacilityId + "'>" + item.FacilityName + "</option>";
                });
                $("#ddlFacility").html(items);

                if ($("#hdFacilityId") != null && $("#hdFacilityId").val() > 0)
                    $("#ddlFacility").val($("#hdFacilityId").val());
            }
            else {
            }
        },
        error: function (msg) {
        }
    });
}

function datecompare(date1, sign, date2) {
    var day1 = date1.getDate();
    var mon1 = date1.getMonth();
    var year1 = date1.getFullYear();
    var day2 = date2.getDate();
    var mon2 = date2.getMonth();
    var year2 = date2.getFullYear();
    if (sign === '===') {
        if (day1 === day2 && mon1 === mon2 && year1 === year2) return true;
        else return false;
    }
    else if (sign === '>') {
        if (year1 > year2) return true;
        else if (year1 === year2 && mon1 > mon2) return true;
        else if (year1 === year2 && mon1 === mon2 && day1 > day2) return true;
        else return false;
    }
}

function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function checkIsNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (
        (charCode != 8) &&
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}



/**------------ View the Bill to Print---------------**/


function BillPrintPreview(billheaderid) {
    /// <summary>
    ///     Views the bill.
    /// </summary>
    /// <param name="billheaderid">The billheaderid.</param>
    /// <returns></returns>
    if (billheaderid > 0) {
        /*$.ajax({
            type: "POST",
            url: "/Reporting/GetBillWithDetailsFormat",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            data: JSON.stringify({ billHeaderId: billheaderid }),
            success: function (data) {
                var win = window.open('about:blank');
                with (win.document) {
                    open();
                    write(data);
                    close();
                    $('#hSortHeading').html('');
                }
                window.open("/Reporting/GetBillWithDetailsFormat?billHeaderId=" + billheaderid, "_blank", "width=700px,height=700px,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,directories=no,status=no");

            },
            error: function (msg) {
            }
        });*/
        var popupWidth = '1200px';
        var popupHeight = '670px';

        var left = (screen.width / 2) - (popupWidth / 2);
        var top = (screen.height / 2) - (popupHeight / 2);
        window.open("/Reporting/GetBillWithDetailsFormat?billHeaderId=" + billheaderid, "_blank", "width=" + popupWidth + ",height=" + popupHeight + ",toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,directories=no,status=no,top=" + top + ",left=" + left + ",");
    } else {
        ShowErrorMessage(msg, true);
    }
}


/**------------ View the Bill to Print---------------**/


/**------------ View the Evaluation and Management Form---------------**/

function ViewNewEvaluationForm() {
    if ($("#GlobalPatientId").length > 0 && $("#GlobalPatientId").val() > 0) {
        var jsonData = JSON.stringify({ pId: $("#GlobalPatientId").val() });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Evaluation/EvaluationData",
            data: jsonData,
            dataType: "html",
            success: function (data) {
                BindList("#EvaluationDiv", data);
                InitializeDateTimePicker();
                $('#divEvaluation').show();
            },
            error: function (msg) {

            }
        });
    }
}


function SortMedicalVital(event) {
    var url = "/Summary/SortMedicalVital";
    var patientId = $("#hdPatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?pId=" + patientId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#colCurrentVitalsMain").empty();
                $("#colCurrentVitalsMain").html(data);

                $('#MedicalVitalListDiv').empty().html(data);
            }
        },
        error: function (msg) {

        }
    });

}

function SortCurrentNotesbyPhysician(event) {
    var url = "/Summary/SortCurrentNotesbyPhysician";
    var patientId = $("#hdPatientId").val();
    var encounterId = $("#hdCurrentEncounterId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + patientId + "&encounterId=" + encounterId + "&" + event.data.msg;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        success: function (data) {
            if (data != null) {

                $("#gridContentNotesPatientSummary").empty();
                $("#gridContentNotesPatientSummary").html(data);

            }
        },
        error: function (msg) {

        }
    });

}

function SortAllergiesList(event) {

    var url = "/Summary/SortAllergiesList";
    var patientId = $("#hdPatientId").val();
    var encounterId = $("#hdCurrentEncounterId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + patientId + "&" + event.data.msg;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        success: function (data) {
            if (data != null) {

                $("#gridContentAllergy").empty();
                $("#gridContentAllergy").html(data);

            }
        },
        error: function (msg) {

        }
    });

}

function BindOrdersBySort(event) {

    var url = "/Summary/BindEncounterOrderListSorted";
    var encounterId = $("#hdCurrentEncounterId").val();
    var type = getcategoryByValue();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?encounterId=" + encounterId + "&type=" + type + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#NurseAdminOpenOrdersListDiv").empty();
            $("#NurseAdminOpenOrdersListDiv").html(data);

            $('#colCurrentOrdersMain').empty();
            $('#colCurrentOrdersMain').html(data);

            $('#NurseAdminOpenOrdersListDiv').empty();
            $('#NurseAdminOpenOrdersListDiv').html(data);

            $("#collapseOpenOrderAddEdit").removeClass("in");
            $("#collapseOpenOrderlist").addClass("in");

            //SetGridSorting(BindOrdersBySort, "#gridContentOpenOrder");
        },
        error: function (msg) {

        }

    });

    return false;
}

function SortOpenOrderActivitesByType(event) {

    var tabvalue = $('#hfTabValue').val();

    var selectedVal = "0";
    switch (tabvalue) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '10':
        case '11':
            selectedVal = "0";
            break;
        case '6':
            selectedVal = "11080"; // OrderCodeTypes.PathologyandLaboratory;
            break;
        case '7':
            selectedVal = "11070"; //OrderCodeTypes.Radiology;
            break;
        case '8':
            selectedVal = "11010"; //OrderCodeTypes.Surgery;
            break;
        case '9':
            selectedVal = "11100"; //OrderCodeTypes.Pharmacy;
            break;
        default:
            selectedVal = "0";
    }


    var url = "/Summary/BindEncounterOpenActivityList";
    var encounterId = $("#hdCurrentEncounterId").val();
    //var type = '11100';
    var type = selectedVal;
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?encounterId=" + encounterId + "&type=" + type + "&" + event.data.msg;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            BindList("#colActivityListDiv", data);
            //$('.openOrderActivity').addClass('in');
            ShowHideActionButton();
        },
        error: function (msg) {
        }
    });
    return false;
};

function SortCurrentOrderCloseActivites(event) {

    var tabvalue = $('#hfTabValue').val();

    var selectedVal = "0";
    switch (tabvalue) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '10':
        case '11':
            selectedVal = "0";
            break;
        case '6':
            selectedVal = "11080"; // OrderCodeTypes.PathologyandLaboratory;
            break;
        case '7':
            selectedVal = "11070"; //OrderCodeTypes.Radiology;
            break;
        case '8':
            selectedVal = "11010"; //OrderCodeTypes.Surgery;
            break;
        case '9':
            selectedVal = "11100"; //OrderCodeTypes.Pharmacy;
            break;
        default:
            selectedVal = "0";
    }


    var url = "/Summary/BindEncounterClosedActivityList";
    var encounterId = $("#hdCurrentEncounterId").val();
    var type = selectedVal;
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?encounterId=" + encounterId + "&type=" + type + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {
            BindList("#ClosedActivitiesDiv", data);
            ShowHideActionButton();
        },
        error: function (msg) {
        }
    });
    return false;

}

var SortClosedOpenOrderByType = function (event) {
    var tabvalue = $('#hfTabValue').val();

    var selectedVal = "0";
    switch (tabvalue) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '10':
        case '11':
            selectedVal = "0";
            break;
        case '6':
            selectedVal = "11080"; // OrderCodeTypes.PathologyandLaboratory;
            break;
        case '7':
            selectedVal = "11070"; //OrderCodeTypes.Radiology;
            break;
        case '8':
            selectedVal = "11010"; //OrderCodeTypes.Surgery;
            break;
        case '9':
            selectedVal = "11100"; //OrderCodeTypes.Pharmacy;
            break;
        default:
            selectedVal = "0";
    }
    var url = "/Summary/BindEncounterClosedOrdersByType";
    var encounterId = $("#hdCurrentEncounterId").val();
    var type = selectedVal;
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?encounterId=" + encounterId + "&type=" + type + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        beforeSend: function () { },
        success: function (data) {

            BindList("#ClosedOrdersDiv", data);
            ShowHideActionButton();
        },
        error: function (msg) {
        }
    });
    return false;
};

function OpenSignatureInENM() {
    $("#divSignatureInENM").css({ "display": "block" });
}

var PhysicianAllSearch = function (event) {
    var url = "/Summary/SortPhysicianAllSearch";
    var encounterId = $("#hdCurrentEncounterId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?encounterId=" + encounterId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: true,
        data: null,
        success: function (data) {
            $("#MostRecentOrdersGrid1").empty().html(data);
        },
        error: function (msg) {

        }
    });
    return false;
}

/**------------ View the Evaluation and Management Form---------------**/

























//--------------------------------------------------------------Newly Created Functions for Dashboards start here-----------------------------------------//


function GraphsBuilderWith100TargetWithoutDecimal(dashboardData, containerid, charttype, chartName) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();
    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                monthsArray.push(parseInt(dashboardData[i].M7 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                monthsArray.push(parseInt(dashboardData[i].M7 * 100));
                monthsArray.push(parseInt(dashboardData[i].M8 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                monthsArray.push(parseInt(dashboardData[i].M7 * 100));
                monthsArray.push(parseInt(dashboardData[i].M8 * 100));
                monthsArray.push(parseInt(dashboardData[i].M9 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                monthsArray.push(parseInt(dashboardData[i].M7 * 100));
                monthsArray.push(parseInt(dashboardData[i].M8 * 100));
                monthsArray.push(parseInt(dashboardData[i].M9 * 100));
                monthsArray.push(parseInt(dashboardData[i].M10 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                break;
            case 11:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                monthsArray.push(parseInt(dashboardData[i].M7 * 100));
                monthsArray.push(parseInt(dashboardData[i].M8 * 100));
                monthsArray.push(parseInt(dashboardData[i].M9 * 100));
                monthsArray.push(parseInt(dashboardData[i].M10 * 100));
                monthsArray.push(parseInt(dashboardData[i].M11 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseInt(dashboardData[i].M1 * 100));
                monthsArray.push(parseInt(dashboardData[i].M2 * 100));
                monthsArray.push(parseInt(dashboardData[i].M3 * 100));
                monthsArray.push(parseInt(dashboardData[i].M4 * 100));
                monthsArray.push(parseInt(dashboardData[i].M5 * 100));
                monthsArray.push(parseInt(dashboardData[i].M6 * 100));
                monthsArray.push(parseInt(dashboardData[i].M7 * 100));
                monthsArray.push(parseInt(dashboardData[i].M8 * 100));
                monthsArray.push(parseInt(dashboardData[i].M9 * 100));
                monthsArray.push(parseInt(dashboardData[i].M10 * 100));
                monthsArray.push(parseInt(dashboardData[i].M11 * 100));
                monthsArray.push(parseInt(dashboardData[i].M12 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    BuildThreeSeriseGraphWithOutDecimalLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
}


function GraphsBuilderWithoutPercentageWithOneDecimal(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 2)
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 3)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 4)
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 5)
        BuildThreeSeriseGraphWithOutDecimalLabel(containerid, dataArray, charttype, chartName, "By Month", categories);
    else if (chartLegendPosition == 6)
        BuildThreeSeriseGraphWithLevel(containerid, dataArray, charttype, chartName, "By Month", categories);

}

function GraphsBuilderWithoutPercentageWithTwoDecimal(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                monthsArray.push(parseFloat(dashboardData[i].M2));
                monthsArray.push(parseFloat(dashboardData[i].M3));
                monthsArray.push(parseFloat(dashboardData[i].M4));
                monthsArray.push(parseFloat(dashboardData[i].M5));
                monthsArray.push(parseFloat(dashboardData[i].M6));
                monthsArray.push(parseFloat(dashboardData[i].M7));
                monthsArray.push(parseFloat(dashboardData[i].M8));
                monthsArray.push(parseFloat(dashboardData[i].M9));
                monthsArray.push(parseFloat(dashboardData[i].M10));
                monthsArray.push(parseFloat(dashboardData[i].M11));
                monthsArray.push(parseFloat(dashboardData[i].M12));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1) {
        BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal(containerid, dataArray, charttype, chartName, "By Month (000s)", categories);
    }
    else if (chartLegendPosition == 7) {
        BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal(containerid, dataArray, charttype, chartName, "By Month", categories);
    }
    else if (chartLegendPosition == 8) {
        BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal45degrees(containerid, dataArray, charttype, chartName, "By Month (Ratio of Patients/1 Staff person)", categories);
    }
}
function EmptyGraphsBuilderWithoutPercentageTwoDecimal(containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();

    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(0));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

                break;
            case 11:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                monthsArray.push(parseFloat(0));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        dataArray.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartLegendPosition == 1)
        BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal(containerid, dataArray, charttype, chartName, "By Month", categories);
    else
        BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal(containerid, dataArray, charttype, chartName, "Current Month", categories);
}




//--------------------------------------------------------------Newly Created Functions for Dashboards end here-----------------------------------------//


var CommonAjaxCalls = function () {

    var asyncGetWithoutParams = function (url) {
        //if (withLoader == null)
        //    withLoader = 0;

        //var url = window.siteUrl + "/" + pageUrl;
        //var start = new Date();
        var returnObject = $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: true,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //var end = new Date();
                //var seconds = "True >" + url + " : " + start + " - " + end + " -> " + ((end - start) / 1000);
                //console.log(seconds);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var asyncGetWithParams = function (url, jsonData) {
        //var url = pageUrl;
        //var start = new Date();
        var returnObject = $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            async: true,
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //var end = new Date();
                //var seconds = "True >" + url + " : " + start + " - " + end + " -> " + ((end - start) / 1000);
                //console.log(seconds);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var getWithoutParameters = function (url, withCache) {
        if (withCache == null)
            withCache = false;
        //var url = window.siteUrl + "/" + pageUrl;// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";
        //var start = new Date();
        var returnObject = null;
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            async: false,
            cache: withCache,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                returnObject = data;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var getWithParams = function (url, jsonData) {

        //var url = window.siteUrl + "/" + pageUrl;// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";
        //var start = new Date();
        var returnObject = null;
        $.ajax({
            type: "POST",
            header: 'Content-Type: application/json',
            data: jsonData,//JSON.stringify(inputDataObject),
            dataType: "json",
            async: false,
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data) {
                    returnObject = data;
                    //var end = new Date();
                    //var seconds = "False >" + url + " : " + start + " - " + end + " -> " + ((end - start) / 1000);
                    //console.log(seconds);
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var getHtmlWithParams = function (url, jsonData) {
        //var url = window.siteUrl + "/" + pageUrl;// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";
        //var start = new Date();
        var returnObject = null;
        $.ajax({
            type: "POST",
            header: 'Content-Type: application/json',
            data: jsonData,//JSON.stringify(inputDataObject),
            dataType: "html",
            async: false,
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                returnObject = data;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var getHtmlWithoutParams = function (url) {
        //var url = window.siteUrl + "/" + pageUrl;// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";
        //var start = new Date();
        var returnObject = null;
        $.ajax({
            type: "POST",
            header: 'Content-Type: application/json',
            dataType: "html",
            async: false,
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                returnObject = data;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var asyncGetHtmlWithParams = function (url, jsonData) {
        //var url = window.siteUrl + "/" + pageUrl;// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";
        //var start = new Date();
        var returnObject = null;
        $.ajax({
            type: "POST",
            header: 'Content-Type: application/json',
            data: jsonData,//JSON.stringify(inputDataObject),
            dataType: "html",
            async: true,
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                returnObject = data;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }

    var asyncGetHtmlWithoutParams = function (url) {
        //var url = window.siteUrl + "/" + pageUrl;// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";
        //var start = new Date();
        var returnObject = null;
        $.ajax({
            type: "POST",
            header: 'Content-Type: application/json',
            dataType: "html",
            async: true,
            url: url,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                returnObject = data;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                errorLogging(xmlHttpRequest, textStatus, errorThrown);
            }
        });
        return returnObject;
    }


    var errorLogging = function (xmlHttpRequest, textStatus, errorThrown) {
        //  var pageUrl = "CommonAjaxCalls.aspx/" + "LogException";
        if (xmlHttpRequest.responseText != undefined) {
            var isSessionNull = (xmlHttpRequest.responseText.indexOf("SetWebMethodSession()") != -1)
            if (isSessionNull) {   // if isSessionNull true then error is raised from the session method 
                // show popup , here 

            }
        }
        var pageUrl = window.siteUrl + "/" + "CommonAjaxCalls.aspx/" + "LogException";// "CommonAjaxCalls.aspx/" + "GetSelectedUsersSession";

        var edata = { "message": textStatus, "exception": xmlHttpRequest };
        $.ajax({
            type: "POST",
            url: pageUrl,
            dataType: "json",
            async: false,
            data: JSON.stringify(edata),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
            },
            error: function (xmlHttpRequest1, textStatus1, errorThrown1) {

            }
        });
    }
    return {
        GetWithoutParams: getWithoutParameters,
        PosttWithParams: getWithParams,
        asyncAjaxCallGetWithoutParameter: asyncGetWithoutParams,
        asyncAjaxCallGetWithParameter: asyncGetWithParams,
        GetHtmlWithParams: getHtmlWithParams,
        GetHtmlWithoutParams: getHtmlWithoutParams,
        asyncGetHtmlWithParams: asyncGetHtmlWithParams,
        asyncGetHtmlWithoutParams: asyncGetHtmlWithoutParams,
        errorLogging: errorLogging
    };
}();

function GetFirstDayOfCurrentMonthFormated() {
    var date = new Date();
    var month_Start = date.getMonth().length > 1 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var date_start = "01";
    var year_start = date.getFullYear();
    return (month_Start + "/" + date_start + "/" + year_start);
}

function GetLastDateOfCurrentMonthFormated() {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var month_End = lastDay.getMonth().length > 1 ? lastDay.getMonth() + 1 : "0" + (lastDay.getMonth() + 1);
    var date_End = lastDay.getDate();
    var year_End = lastDay.getFullYear();
    return (month_End + "/" + date_End + "/" + year_End);
}

var ClaimsStatusRemittanceDiscrepancyReport = function (id) {
    window.location = window.location.protocol + "//" + window.location.host + "/findclaim/index?fileId=" + id;
}

function EmptyDropdown(selector) {
    $(selector).empty();
    var items = "<option value='0'>--Select--</option>";
    $(selector).html(items);
}


function BindSelectBox(fieldId, data) {
    var items = '<option value="0">--Select--</option>';
    $.each(data, function (i, globalCode) {
        items += "<option value='" + globalCode.GlobalCodeValue + "'>" + globalCode.GlobalCodeName + "</option>";
    });
    $("#" + fieldId).empty().html(items);
}

function BindSelectBoxWithGC(data, ddlSelector, hdSelector) {
    /// <summary>
    /// Binds the dropdown data.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>

    $(ddlSelector).empty();
    var items = '<option value="0">--Select--</option>';
    $.each(data, function (i, obj) {
        var newItem = "<option id='" + obj.GlobalCodeValue + "'  value='" + obj.GlobalCodeValue + "'>" + obj.GlobalCodeName + "</option>";
        items += newItem;
    });

    $(ddlSelector).html(items);
    var hdValue = "";
    if (hdSelector.indexOf('#') != -1) {
        hdValue = $(hdSelector).val();
    }
    else {
        hdValue = hdSelector;
    }
    //
    if (hdValue != null && hdValue != '') {
        $(ddlSelector).val(hdValue);
        if ($(ddlSelector).val() == null || $(ddlSelector).val() == undefined) {
            $(ddlSelector + " option").filter(function (index) { return $(this).text() === "" + hdValue + ""; }).attr('selected', 'selected');
        }
    }
    else {
        if ($(ddlSelector).length > 0)
            $(ddlSelector)[0].selectedIndex = 0;
    }
}

var getcategoryByValue = function () {
    var tabvalue = $('#hfTabValue').val();
    var selectedVal = "0";
    switch (tabvalue) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '10':
        case '11':
            selectedVal = "0";
            break;
        case '6':
            selectedVal = "11080"; // OrderCodeTypes.PathologyandLaboratory;
            break;
        case '7':
            selectedVal = "11070"; //OrderCodeTypes.Radiology;
            break;
        case '8':
            selectedVal = "11010"; //OrderCodeTypes.Surgery;
            break;
        case '9':
            selectedVal = "11100"; //OrderCodeTypes.Pharmacy;
            break;
        default:
            selectedVal = "0";
    }
    return selectedVal;
}

var GetDateFromDatetime = function (datetimestr) {
    var date = new Date(datetimestr);
    var day = date.getDate().toString(); //Date of the month: 
    var month = (date.getMonth() + 1).toString(); //Month of the Year: 0-based index,
    var year = date.getFullYear().toString(); //Year
    var monthstr = month.length == 1 ? "0" + (month) : (month);
    var daystr = day.length == 1 ? "0" + (day) : (day);
    var strToReturn = "" + monthstr + "/" + daystr + "/" + year;
    return strToReturn;
}


var GetTimeFromDatetime = function (datetimestr, type) {
    var date = new Date(datetimestr);
    var hours = date.getHours().toString();
    var mintues = date.getMinutes().toString();
    var strToReturn = "";
    if (type == 1)
        strToReturn = "" + hours.length == 1 ? "0" + (hours) : hours;
    else
        strToReturn = "" + mintues.length == 1 ? "0" + (mintues) : mintues;
    return strToReturn;
}





function SortMedicalHistoryList(event) {
    var url = "/Summary/SortMedicalHistoryList";
    var encounterId = $("#hdCurrentEncounterId").val();
    var pid = $("#hdPatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != "")) {
        url += "?encounterId=" + encounterId + "&patientid=" + pid + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "html",
        async: false,
        data: null,
        success: function (data) {
            BindList("#MedicalHistoryListDiv", data);
        },
        error: function (msg) {
        }
    });
}


function SortEHRAllergiesList(event) {
    var url = "/Summary/SortPatientAllergiesList";
    var patientId = $("#hdPatientId").val();
    var encounterId = $("#hdCurrentEncounterId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + patientId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: null,
        dataType: "html",
        success: function (data) {
            if (data != null) {
                $("#divPatientMedicalAllergies").empty();
                $("#divPatientMedicalAllergies").html(data);
            }
        },
        error: function (msg) {

        }
    });

}


function FilterDropdownListData(selector, categoryIdval, hidValueSelector, data) {
    var filteredData = $.grep(data, function (n) {
        return (n.GlobalCodeCategoryValue === categoryIdval);
    });
    if (filteredData.length > 0) {
        BindSelectBoxWithGC(filteredData, selector, hidValueSelector);
    }
}

function ClearAddEditForm(formIdToReset, selectorToRemoveCssClass, selectorToAddClass) {
    if (formIdToReset != '' && $('#' + formIdToReset).length > 0) {
        $("#" + formIdToReset).clearForm();
        $('#' + formIdToReset).validationEngine();
    }

    if (selectorToRemoveCssClass != '' && $('#' + selectorToRemoveCssClass).length > 0)
        $('#' + selectorToRemoveCssClass).removeClass('in');

    if (selectorToAddClass != '' && $('#' + selectorToAddClass).length > 0)
        $('#' + selectorToAddClass).addClass('in');

    $.validationEngine.closePrompt(".formError", true);
}



function ValidateFileBeforeUpload(sender, validaExtsArray, permissibleFileSize) {
    var isValid = true;
    var errorMessage = "";

    //var validExts = new Array(".xlsx", ".xls", ".doc", ".docx", ".pdf", ".rtf", ".xml", ".ppt", ".pptx");
    var inValidFiles = "<ul>";

    if ($(sender)[0].files.length > 0) {
        var fu = $(sender)[0];
        $.each(fu.files, function (i) {
            var currentFile = fu.files[i];
            var iSize = (currentFile.size / 1024);
            var fileExt = currentFile.name;
            fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
            if (validaExtsArray.indexOf(fileExt) < 0) {
                inValidFiles += "<li>" + currentFile.name + "</li>";
                errorMessage = "One or More file(s) selected are Invalid, Valid File types: " + validaExtsArray.toString() + ".\n Invalid Files are: ";
                isValid = false;
            }
            else if ((Math.round((iSize / 1024) * 100) / 100) > permissibleFileSize) {
                if (!isValid) {
                    errorMessage = "File Size exceeds the permissible limit (5 MB). Big Files are: ";
                    isValid = false;
                    inValidFiles += "<li>" + currentFile.name + "</li>";
                }
            }
        });
    }

    if (!isValid) {
        if (inValidFiles != "<ul>") inValidFiles += "</ul>"; else inValidFiles = "";
        ShowMessage(errorMessage + "\n" + inValidFiles, "Error", "error", true);
    }

    return isValid;
}

function BindOrderSubCategoriesWithCustomFields(data, ddlSelector, hdSelector) {
    /// <summary>
    /// Binds the dropdown data.
    /// </summary>
    /// <param name="data">The data.</param>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>

    $(ddlSelector).empty();
    var items = '<option value="0">--Select--</option>';
    $.each(data, function (i, obj) {
        var newItem = "<option id='" + obj.Value + "' value='" + obj.Value + "' gcc='" + obj.CategoryValue + "' oct='" + obj.ExternalValue1 + "' sr='" + obj.ExternalValue2 + "' er='" + obj.ExternalValue3 + "'>" + obj.Text + "</option>";
        items += newItem;
    });

    $(ddlSelector).html(items);
    var hdValue = "";
    if (hdSelector.indexOf('#') != -1) {
        hdValue = $(hdSelector).val();
    }
    else {
        hdValue = hdSelector;
    }
    if (hdValue != null && hdValue != '') {
        $(ddlSelector).val(hdValue);
        if ($(ddlSelector).val() == null || $(ddlSelector).val() == undefined) {
            $(ddlSelector + " option").filter(function (index) { return $(this).text() === "" + hdValue + ""; }).attr('selected', 'selected');
        }
    }
    else {
        if ($(ddlSelector).length > 0)
            $(ddlSelector)[0].selectedIndex = 0;
    }
}

function BindOrderTypeCategoriesinSummary(ddlSelector, hdSelector, externalV) {
    /// <summary>
    ///     Binds the categories.
    /// </summary>
    /// <param name="ddlSelector">The DDL selector.</param>
    /// <param name="hdSelector">The hd selector.</param>
    /// <returns></returns>
    var jsonData = JSON.stringify({
        externalValue: externalV
    });

    $.ajax({
        type: "POST",
        url: "/Summary/GetOrderTypeCategoriesInSummaryNew",           //GetGlobalCodeCategories
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            $(ddlSelector).empty();
            var items = '<option value="0">--Select--</option>';
            $.each(data,
                function (i, gcc) {
                    if (i == 0) {
                        items += "<option selected='selected' value='" +
                            gcc.GlobalCodeCategoryValue.trim() +
                            "'>" +
                            gcc.GlobalCodeCategoryName +
                            "</option>";
                    } else {
                        items += "<option value='" +
                            gcc.GlobalCodeCategoryValue.trim() +
                            "'>" +
                            gcc.GlobalCodeCategoryName +
                            "</option>";
                    }
                });
            $(ddlSelector).html(items);

            var hdValue = $(hdSelector).val();
            if (hdValue != null && hdValue != "" && hdValue > 0) {
                $(ddlSelector).val(hdValue);
                OnChangeCategory(ddlSelector, "#ddlOrderTypeSubCategory", "#hdOrderTypeSubCategoryID");
            } else {
                var tabvalue = $("#hfTabValue").val();
                var selectedVal = "0";
                switch (tabvalue) {
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "10":
                    case "11":
                        selectedVal = "0";
                        break;
                    case "6":
                        selectedVal = "11080"; // OrderCodeTypes.PathologyandLaboratory;
                        break;
                    case "7":
                        selectedVal = "11070"; //OrderCodeTypes.Radiology;
                        break;
                    case "8":
                        selectedVal = "11010"; //OrderCodeTypes.Surgery;
                        break;
                    case "9":
                        selectedVal = "11100"; //OrderCodeTypes.Pharmacy;
                        break;
                    default:
                        selectedVal = "0";
                }
                //if (selectedVal != "0") {
                //    $(ddlSelector).attr("disabled", "disabled");
                //}
                OnChangeCategory(ddlSelector, "#ddlOrderTypeSubCategory", "#hdOrderTypeSubCategoryID");
            }
        },
        error: function (msg) {
        }
    });
}


$(function () {
    // Create the preview image
    $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    });
});