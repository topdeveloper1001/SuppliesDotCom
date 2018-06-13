$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');

    setTimeout(function () {
        BuildGraphs();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 500);

    $('#btnReBindGraphs').on('click', function () {
        BindExecutiveDashBoardlist();
        BuildGraphs();
    });
    AddEmptyLineinGrid();
});

/// <var>The add empty linein grid</var>
var AddEmptyLineinGrid = function () {
    var htmlrowvalue = '<tr class="gridRow"><td class="col1"><span>&nbsp;</span></td><td class="col2"><span>&nbsp;</span></td> <td class="col3"><span>&nbsp;</span></td><td class="col4">&nbsp; </td><td class="col5"> <span>&nbsp;</span></td><td class="col6"><span>&nbsp;</span></td><td class="col7">&nbsp;</td><td class="col8 align-center">&nbsp;</td><td class="col9"> <span>&nbsp;</span></td><td class="col10"><span>&nbsp;</span></td><td class="col11"><span>&nbsp;</span></td><td class="col12">&nbsp; </td><td class="col13"><span>&nbsp;</span></td><td class="col14"><span>&nbsp;</span></td><td class="col15">&nbsp; </td></tr>';
    if ($('#VolumeExecutiveDashboardSection tr').length > 0) {
        $("#VolumeExecutiveDashboardSection tbody tr").each(function (i, row) {
            var $actualRow = $(row);
            if ($actualRow.find('.align-center').html().indexOf('Net Income/Loss') != -1) {
                $actualRow.after(htmlrowvalue);
            } else if ($actualRow.find('.align-center').html().indexOf('Net Cash Change') != -1) {
                $actualRow.after(htmlrowvalue);
            }
        });
    }
};

/// <var>bind the accounts dropdown</var>
var BindDepartmentsDropdown = function () {
    $.post("/FacilityDepartment/BindAccountDropdowns", null, function (data) {
        $("#ddlDepartment").empty();
        var items = '<option value="0">--All--</option>';
        $.each(data.reveuneAccount, function (i, obj) {
            var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
            items += newItem;
        });
        $("#ddlDepartment").html(items);
        $("#ddlDepartment").val('0');
    });
};

/// <var>The bind manual dash boardlist</var>
var BindExecutiveDashBoardlist = function () {
    var facilityId = $('#ddlFacility').val();
    var month = $('#ddlMonth').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var department = $('#ddlDepartment').val();
    var dashBoardType = $('#hdDashboardType').val();
    var jsonData = JSON.stringify({
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: regionType,
        Department: department != null ? department : 0,
        type: dashBoardType
    });
    $.ajax({
        cache: false,
        type: "POST",
        url: '/ExternalDashboard/ExecutiveDashboardFilters',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#divExecutiveDashboard').empty();
                $('#divExecutiveDashboard').html(data);
                AddEmptyLineinGrid();
                setTimeout(function () {
                    BuildGraphs();
                }, 100);
            }
        },
        error: function (msg) {
        }
    });
};

/// <var>The build graphs</var>
var BuildGraphs = function () {
    var facilityId = $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0;// $('#ddlFacility').val();
    var month = $('#ddlMonth').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var department = $('#ddlDepartment').val();
    var dashBoardType = $('#hdDashboardType').val();

    ADCChart(facilityId, month, facilityType, regionType, department, '144');// Section 3 Graphs
    ADCServiceCodeChart(facilityId, month, facilityType, regionType, department, '156');// Section 3 Graphs

    BedOccupancyChart(facilityId, month, facilityType, regionType, department, '109');// Section 4 Graphs
    GetOPEncounterChart(facilityId, month, facilityType, regionType, department, '104');// Section 4 Graphs

    SWBChart(facilityId, month, facilityType, regionType, department, '120');// Section 7 Graphs
    NetRevenueChart(facilityId, month, facilityType, regionType, department, '110');// Section 7 Graphs

    IndirectNetRevenueChart(facilityId, month, facilityType, regionType, department, '121');// Section 8 Graphs
    EBITDAChart(facilityId, month, facilityType, regionType, department, '122');// Section 8 Graphs

    PayorMixChart(facilityId, month, facilityType, regionType, department, '159');// Section 9 Graphs
    ReferalPayorChart(facilityId, month, facilityType, regionType, department, '141');// Section 9 Graphs

    CashCollectionChart(facilityId, month, facilityType, regionType, department, '124');// Section 12 Graph
};

/// <var>The bind section narrative</var>
var BindSectionNarrative = function (id) {
    var facilityId = $('#ddlFacility').val();
    var month = $('#ddlMonth').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var department = $('#ddlDepartment').val();
    var dashBoardType = $('#hdDashboardType').val();
    var typeSection = id;
    var controlId = id == '2' ? '#chkShowAllSection2' : id == '6' ? "#chkShowAllSection6" : id == "11" ? "#chkShowAllSection10" : "";
    var checkedSection = $(controlId).prop('checked');
    var jsonData = JSON.stringify({
        facilityID: facilityId,
        month: month,
        facilityType: facilityType != null ? facilityType : 0,
        segment: regionType != null ? facilityType : 0,
        Department: department != null ? department : 0,
        type: dashBoardType != null ? dashBoardType : 0,
        viewAll: checkedSection != null ? checkedSection : false,
        sectionType: typeSection
    });
    $.ajax({
        cache: false,
        type: "POST",
        url: '/ExternalDashboard/ViewSectionNarratives',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                var controltobindId = id == '2' ? '#divSection2' : id == '6' ? "#divSection6" : id == "11" ? "#divSection11" : "";
                $(controltobindId).empty();
                $(controltobindId).html(data);
            }
        },
        error: function (msg) {
        }
    });
};

/// <var>The enableddls</var>
var Enableddls = function () {
    var facilityId = $('#ddlFacility').val();
    if (facilityId === "0") {
        $('.facDisabled').removeAttr('disabled');
    } else {
        $('.facDisabled').val('0');
        $('.facDisabled').attr('disabled', 'disabled');
    }

}

//-------------------------------------Section 3 Charts Starts------------------------------------//
var ADCChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = JSON.stringify({
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    });
    $.ajax({
        type: "POST",
        url: '/ExternalDashboard/GetManualDashboardData',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            //
            if (data != "" && data.length > 2) {
                ADCChartBuilder(data, 'myDashboardADCMonthly', "column", "Average Daily Census", "1");
            } else {
                //BindEmptyChart(data, 'myDashboardADCMonthly', "column", "Average Daily Census", "1");
            }
        },
        error: function (msg) {
        }
    });
}

function ADCChartBuilder(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartFormattype == "1") {
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, SWBChartDataMonthly, charttype, chartName, "By Month", categories);
    }
}

var ADCServiceCodeChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = JSON.stringify({
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    });
    $.ajax({
        type: "POST",
        url: '/ExternalDashboard/GetSubCategoryCharts',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsonData,
        success: function (data) {
            //
            if (data != "" && data.length > 2) {
                ADCServiceCodeChartBuilder(data, 'myDashboardADCYearly', "column", "Average Daily Census by Service Code", "1");
            } else {
                // BuildSubCategoryPieChartEmpty(data, 'myDashboardADCYearly', "column", "Average Daily Census by Service Code", "1");
                var buildImgTag = "<img src='/images/nodata.jpg'>";
                $('#myDashboardADCYearly').empty();
                $('#myDashboardADCYearly').html(buildImgTag);
            }
        },
        error: function (msg) {
        }
    });
}

var ADCServiceCodeChartBuilder = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
//-------------------------------------Section 3 Charts Ends------------------------------------//

//-------------------------------------Section 4 Charts Starts------------------------------------//
var BedOccupancyChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetYearToDateData", jsonData, function (data) {
        //
        if (data != "") {
            BedOccupancyChartBuilder(data, 'myDashboardBedOccupancy', 'na', "Bed Occupancy Rate", "3");
        } else {
            //YearTodateGraphdataEmpty(data, 'myDashboardEBITDAMarginTYD', "column", "EBITDA Margin", "2");
        }
    });
}

var BedOccupancyChartBuilder = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var SWBChartDataMonthly = new Array();
    if (dashboardData != null) {
        SWBChartDataMonthly.push({ 'name': 'Occupied', 'y': parseFloat(dashboardData.CYTA) });
        SWBChartDataMonthly.push({ 'name': 'UnOccupied', 'y': 100 - (parseFloat(dashboardData.CYTA)) });
        if (chartFormattype == "3") {
            ShowOnePieChartWithColorsWithPercentage('myDashboardBedOccupancy', SWBChartDataMonthly, "Bed Occupancy Rate", 'Year To Date');
        }
    }
}

var GetOPEncounterChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        //
        if (data != "" && data.length > 2) {
            GetOPEncounterChartBuilder(data, 'myDashboardOPEncountersYearly', "column", "OUTPATIENT ENCOUNTERS", "1");
        } else {
            //BindEmptyChart(data, 'myDashboardOPEncountersYearly', "column", "OUTPATIENT ENCOUNTERS", "1");
        }
    });
}

function GetOPEncounterChartBuilder(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartFormattype == "1") {
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, SWBChartDataMonthly, charttype, chartName, "By Month", categories);
    }
}
//-------------------------------------Section 4 Charts Ends------------------------------------//

//-------------------------------------Section 7 Charts Starts------------------------------------//
var SWBChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        //
        if (data != "" && data.length > 2) {
            // CustomChartBuilder(data, 'myDashboardSWBNetRevenue', "column", "SWB % of Net Revenue", "2");
            SWBChartChartBuilder(data, 'myDashboardSWBNetRevenue', "column", "SWB % of Net Revenue", "2");
        } else {
            //BindEmptyChart(data, 'myDashboardSWBNetRevenue', "column", "SWB % of Net Revenue", "2");
        }
    });
}

function SWBChartChartBuilder(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "By Month", categories);
}

var NetRevenueChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        //
        if (data != "" && data.length > 2) {
            NetRevenueChartBuilder(data, 'myDashboardNetRevenueTrend', "column", "Net Revenue Trend", "3");
        } else {
            // BindEmptyChart(data, 'myDashboardNetRevenueTrend', "column", "Net Revenue Trend", "1");
        }
    });
}

function NetRevenueChartBuilder(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartFormattype == "3") {
        //BuildThreeSeriseGraphWithLegendsTooltipForLines(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
        BuildThreeSeriseGraphWithLegendsTooltipCustom(containerid, SWBChartDataMonthly, charttype, chartName, "By Month", categories);
    }
}
//-------------------------------------Section 7 Charts Ends------------------------------------//

//-------------------------------------Section 8 Charts Starts------------------------------------//
var IndirectNetRevenueChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        //
        if (data != "" && data.length > 2) {
            IndirectNetRevenueChartBuilder(data, 'myDashboardIndirectCostNetRevenue', "column", "Indirect Costs as % of Net Revenue", "3");
        } else {
            //BindEmptyChart(data, 'myDashboardIndirectCostNetRevenue', "column", "Indirect Costs as % of Net Revenue", "1");
        }
    });
}

function IndirectNetRevenueChartBuilder(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartFormattype == "3") {
        //BuildThreeSeriseGraphWithLegendsTooltipForLines(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "By Month", categories);
    }
}

var EBITDAChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetYearToDateData", jsonData, function (data) {
        //
        if (data != "" && data.length > 1) {
            EBITDAChartBuilder(data, 'myDashboardEBITDAMarginTYD', "column", "EBITDA Margin", "2");
        } else {
            //YearTodateGraphdataEmpty(data, 'myDashboardEBITDAMarginTYD', "column", "EBITDA Margin", "2");
        }
    });
}

var EBITDAChartBuilder = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var SWBChartDataMonthly = new Array();
    var categories = ['YTD'];
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var budgetArray = new Array();
    var actualArray = new Array();
    if (dashboardData != null) {
        budgetArray.push(parseFloat(dashboardData.CYTB));
        SWBChartDataMonthly.push({ 'name': 'Budget', 'data': budgetArray });
        actualArray.push(parseFloat(dashboardData.CYTA));
        SWBChartDataMonthly.push({ 'name': 'Actual', 'data': actualArray });
        if (chartFormattype == "2") {
            BuildTwoSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "Year To Date", categories);
        }
    }
}
//-------------------------------------Section 8 Charts Ends------------------------------------//

//-------------------------------------Section 9 Charts Starts------------------------------------//
var PayorMixChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetSubCategoryCharts", jsonData, function (data) {
        //
        if (data != "" ) {
            PayorMixChartBuilder(data, 'myDashboardPayorMix', "column", "Payor Mix", "1");
        } else {
            var buildImgTag = "<img src='/images/nodata.jpg'>";
            $('#myDashboardADCYearly').empty();
            $('#myDashboardADCYearly').html(buildImgTag);
        }
    });
}

var PayorMixChartBuilder = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'Current Month');
}

var ReferalPayorChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetSubCategoryCharts", jsonData, function (data) {
        //
        if (data != "" && data.length >2) {
            ReferalPayorChartBuilder(data, 'myDashboardReferrals', "column", "Referrals", "1");
        } else {
            // BuildSubCategoryPieChartEmpty(data, 'myDashboardPayorMix', "column", "Payor Mix", "1");
        }
    });
}

var ReferalPayorChartBuilder = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'Current Month');
}
//-------------------------------------Section 9 Charts Ends------------------------------------//

//-------------------------------------Section 12 Charts Starts------------------------------------//
var CashCollectionChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            CashCollectionChartBuild(data);
        } else {
            //BindEmptyChart(4);
        }
    });
}

//ReferalPayorChart
function CashCollectionChartBuild(dashboardData) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
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
        var dashbaordName = i == 0 ? "Cash Collections" : i == 1 ? "Operations Cash Expend" : "Total Cash Expend w/Capital";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildThreeSeriseGraphWithLevel('myDashboardCashFlow', SWBChartDataMonthly, "column", "Cash Flow Analysis", " ", categories, "By Month");
}
//-------------------------------------Section 12 Charts Ends------------------------------------//

var BedOccupancyChartBuild = function (dashboardData) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var vacantArray = new Array();
    var occupiedArray = new Array();
    var dataLength = dashboardData.length;
    for (var i = 0; i < 2; i++) {
        var dashboardDataval = 0;
        occupiedArray = new Array();
        switch (parseInt(month)) {
            case 1:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M1)) : 100 - dashboardData[0].M1;
                break;
            case 2:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M2)) : 100 - dashboardData[0].M2;
                break;
            case 3:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M3)) : 100 - dashboardData[0].M3;
                break;
            case 4:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M4)) : 100 - dashboardData[0].M4;
                break;
            case 5:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M5)) : 100 - dashboardData[0].M5;
                break;
            case 6:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M6)) : 100 - dashboardData[0].M6;
                break;
            case 7:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M7)) : 100 - dashboardData[0].M7;
                break;
            case 8:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M8)) : 100 - dashboardData[0].M8;
                break;
            case 9:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M9)) : 100 - dashboardData[0].M9;
                break;
            case 10:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M10)) : 100 - dashboardData[0].M10;
                break;
            case 11:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M11)) : 100 - dashboardData[0].M11;
                break;
            default:
                dashboardDataval = i == 0 ? (parseFloat(dashboardData[i].M12)) : 100 - dashboardData[0].M12;
                break;
        }
        if (i == 0) {
            SWBChartDataMonthly.push({ 'name': 'Occupied', 'y': dashboardDataval });
        } else {
            SWBChartDataMonthly.push({ 'name': 'Unoccupied', 'y': dashboardDataval });
        }
    }
    ShowOnePieChartWithColorsWithPercentage('myDashboardBedOccupancy', SWBChartDataMonthly, "Bed Occupancy Rate");
}

function BindEmptyChart(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var emptyChartDataMonthly = new Array();
    var categories = new Array();
    for (var i = 0; i < 3; i++) {
        var monthsArray = new Array();
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
                monthsArray = new Array();
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        emptyChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartFormattype == "1") {
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, emptyChartDataMonthly, charttype, chartName, "Month wise", categories);
    } else if (chartFormattype == "2") {
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, emptyChartDataMonthly, charttype, chartName, "Month wise", categories);
    }
}

var ADCChartBuild = function (dashboardData) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    for (var i = 0; i < 2; i++) {
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
                monthsArray = new Array();
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
        var dashbaordName = i == 0 ? "Average Daily Census Budget" : "Average Daily Census Actual";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltip('myDashboardADCMonthly', SWBChartDataMonthly, "column", "Average Daily Census", "Month wise", categories);
}

function CustomChartBuilder(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Budget";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    if (chartFormattype == "1") {
        BuildThreeSeriseGraphWithLegendsTooltip(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
    } else if (chartFormattype == "2") {
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
    } else if (chartFormattype == "3") {
        //BuildThreeSeriseGraphWithLegendsTooltipForLines(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
        BuildThreeSeriseGraphWithLegendsTooltipCustom(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
    } else if (chartFormattype == "4") {
        BuildThreeSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
        //BuildThreeSeriseGraphWithLegendsTooltipForLines(containerid, SWBChartDataMonthly, charttype, chartName, "Month wise", categories);
    }
}

var YearTodateGraphdata = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var SWBChartDataMonthly = new Array();
    var categories = ['YTD'];
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var budgetArray = new Array();
    var actualArray = new Array();
    if (dashboardData != null) {
        if (chartFormattype == 3) {
            SWBChartDataMonthly.push({ 'name': 'Occupied', 'y': parseFloat(dashboardData.CMA) });
            SWBChartDataMonthly.push({ 'name': 'UnOccupied', 'y': 100 - (parseFloat(dashboardData.CMA)) });
            //SWBChartDataMonthly.push({ 'name': 'UnOccupied', 'y': parseFloat(dashboardData.CMB)*100 });
        } else {
            budgetArray.push(parseFloat(dashboardData.CYTB));
            SWBChartDataMonthly.push({ 'name': 'Budget', 'data': budgetArray });
            actualArray.push(parseFloat(dashboardData.CYTA));
            SWBChartDataMonthly.push({ 'name': 'Actual', 'data': actualArray });
        }
        if (chartFormattype == "1") {
            BuildThreeSeriseGraphWithLegendsTooltip(containerid, SWBChartDataMonthly, charttype, chartName, "YTD", categories);
        } else if (chartFormattype == "2") {
            BuildTwoSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "YTD", categories);
        }
        else if (chartFormattype == "3") {
            ShowOnePieChartWithColorsWithPercentage('myDashboardBedOccupancy', SWBChartDataMonthly, "Bed Occupancy Rate", 'Month Wise');
        }
    }
}

var YearTodateGraphdataEmpty = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var SWBChartDataMonthly = new Array();
    var categories = ['YTD'];
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var budgetArray = new Array();
    var actualArray = new Array();
    if (dashboardData != null) {
        if (chartFormattype == 3) {
            SWBChartDataMonthly.push({ 'name': 'Occupied', 'y': 0 });
            SWBChartDataMonthly.push({ 'name': 'UnOccupied', 'y': 0 });
            //SWBChartDataMonthly.push({ 'name': 'UnOccupied', 'y': parseFloat(dashboardData.CMB)*100 });
        } else {
            budgetArray.push(parseFloat(0));
            SWBChartDataMonthly.push({ 'name': 'Budget', 'data': budgetArray });
            actualArray.push(parseFloat(0));
            SWBChartDataMonthly.push({ 'name': 'Actual', 'data': actualArray });
        }
        if (chartFormattype == "1") {
            BuildThreeSeriseGraphWithLegendsTooltip(containerid, SWBChartDataMonthly, charttype, chartName, "YTD", categories);
        } else if (chartFormattype == "2") {
            BuildTwoSeriseGraphWithLegendsTooltipPercentage(containerid, SWBChartDataMonthly, charttype, chartName, "YTD", categories);
        } else if (chartFormattype == "3") {
            ShowOnePieChartWithColorsWithPercentage('myDashboardBedOccupancy', SWBChartDataMonthly, "Bed Occupancy Rate");
        }
    }
}

var BuildSubCategoryPieChart = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'Month Wise');
}

var BuildSubCategoryPieChartEmpty = function (dashboardData, containerid, charttype, chartName, chartFormattype) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    var datalength = dashboardData.length;
    for (var i = 0; i < datalength; i++) {
        switch (parseInt(month)) {
            case 1:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 2:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 3:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 4:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 5:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 6:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 7:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 8:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 9:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 10:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            case 11:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
            default:
                SWBChartDataMonthly.push({ 'name': dashboardData[i].Name, 'y': parseFloat(0) });
                break;
        }
    }
    ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'Month Wise');
}