$(function () {

    $('#ankPatientInfo').on('click', function () {
        var patientId = $('#hdPatientId').val();
        if (patientId != null && patientId != '') {
            GetPatinetInfo(patientId);
        }
    });

    $('#ankPatientBillingInfo').on('click', function () {
        var patientId = $('#hdPatientId').val();
        if (patientId != null && patientId != '') {
            GetPatientBillingInfo(patientId);
        }
    });

    $('#ankResults').on('click', function () {
        var patientId = $('#hdPatientId').val();
        if (patientId != null && patientId != '') {
            GetPatientResults(patientId);
        }
    });

    $('#ankSchedular').on('click', function () {
        var patientId = $('#hdPatientId').val();
        if (patientId != null && patientId != '') {
            GetPatientSchedular(patientId);
        }
    });

    $('.hitmepp').click(function () {
        if ($('.summery-tabspp').removeClass('moveRightpp')) {
            $('.col-lg-12').removeClass('col-lg-12').addClass('col-lg-10').removeClass('pull-right');
            $('.hitmepp').hide();
        } else {
            $('.col-lg-10').removeClass('col-lg-10').addClass('pull-right').addClass('col-lg-12');

        }
    });

    $('.summery-tabspp li a').click(function () {
        //$('.summery-tabs').removeClass('moveRight');
        $.validationEngine.closePrompt(".formError", true);
    });

    $('.searchHitMe').click(function () {
        $('.searchSlide').toggleClass('moveLeft');
    });

    $('.menuHitmepp').click(function () {
        $('.summery-tabspp').addClass('moveRightpp');
        $('.col-lg-10').removeClass('col-lg-10').addClass('col-lg-12').removeClass('pull-right');
        $('.hitmepp').show();
    });

});

/// <var>The get patinet information</var>
var GetPatinetInfo = function (patientId) {
    var jsonData = {
        PatientId: patientId,
    };
    $.post("/PatientPortal/GetPatientInfo", jsonData, function (data) {
        $('#divPatientInfo').empty();
        $('#divPatientInfo').html(data);
    });
};

/// <var>
/// The get patient biiling information
/// </var>
var GetPatientBillingInfo = function (patientId) {
    var jsonData = {
        PatientId: patientId,
    };
    $.post("/PatientPortal/GetPatientBillingInfo", jsonData, function (data) {


        $('#divPatientBiilingInfo').empty();
        $('#divPatientBiilingInfo').html(data);
        SetGridPaging('?', '?PatientId=' + patientId + '&');

    });
};

/// <var>The get patient results</var>
var GetPatientResults = function (patientId) {
    var jsonData = {
        PatientId: patientId,
    };
    $.post("/PatientPortal/GetPatientResults", jsonData, function (data) {
        $('#divResults').empty();
        $('#divResults').html(data);
    });
};

var GetPatientSchedular = function (pid) {
    var jsonData = {
        PatientId: pid,
    };
    $.ajax({
        cache: false,
        type: "POST",
        url: "/PatientPortal/GetPatientSchedular",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $('#divSchedular').empty();
            $('#divSchedular').html(data);
            SchedulerInit(null);
        },
        error: function (msg) {
        }
    });
}
var html = function (id) { return document.getElementById(id); }; //just a helper
function SchedulerInit(jsonData) {
    /// <summary>
    /// Schedulers the initialize.
    /// </summary>
    /// <param name="jsonData">The json data.</param>
    /// <param name="physicianData">The physician data.</param>
    /// <returns></returns>
    scheduler.config.xml_date = "%m-%d-%Y %H:%i";
    scheduler.xy.editor_width = 0; //disable editor's auto-size

    var format = scheduler.date.date_to_str("%H:%i");
    var step = 15;

    scheduler.templates.hour_scale = function (date) {
        html = "";
        for (var k = 0; k < 60 / step; k++) {
            html += "<div style='height:21px;line-height:10px;'>" + format(date) + "</div>";
            date = scheduler.date.add(date, step, "minute");
        }
        return html;
    };
    scheduler.config.prevent_cache = true;
    scheduler.config.details_on_dblclick = true;
    scheduler.config.details_on_create = true;
    scheduler.config.scroll_hour = (new Date).getHours();
    scheduler.config.show_loading = true;
    scheduler.config.start_on_monday = false;
    scheduler.config.dblclick_create = false;
    scheduler.locale.labels.section_parent = "Availability";

    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('scheduler_here', new Date(2015, 0, 10), "week");


}



//**** Sorting

function SortEncounterGrid(event) {

    var url = "/Summary/SortEncounterGrid";
    var patientId = $("#hdPatientId").val();
    if (event.data != null && (event.data.msg != null || event.data.msg != undefined || event.data.msg != '')) {
        url += "?patientId=" + patientId + "&" + event.data.msg;
    }
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: null,
        success: function (data) {
            $("#divEncounterListSummary").empty();
            $("#divEncounterListSummary").html(data);

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