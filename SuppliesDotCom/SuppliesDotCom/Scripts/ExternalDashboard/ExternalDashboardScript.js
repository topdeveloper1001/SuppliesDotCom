$(function() {
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');
    BindDepartmentsDropdown();
    setTimeout(function () { BuildGraphs(); }, 1000);

    $('#btnReBindGraphs').on('click', function () {
        BindManualDashBoardlist();
        BuildGraphs();
    });
});

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
var BindManualDashBoardlist = function () {
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
        Department: department,
        type: dashBoardType
    });
    $.ajax({
        type: "POST",
        url: '/ExternalDashboard/GetStatisticsData',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#divManualDashboardStats').empty();
                $('#divManualDashboardStats').html(data);
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
    if (dashBoardType == "2") {
        GetAddmissionChart(facilityId, month, facilityType, regionType, department, '101');
        GetDischargesChart(facilityId, month, facilityType, regionType, department, '102');
        GetInaptientChart(facilityId, month, facilityType, regionType, department, '103');
        GetOPEncounterChart(facilityId, month, facilityType, regionType, department, '104');
        GetNetRevuneChart(facilityId, month, facilityType, regionType, department, '110');
        GetOccupencyratechart(facilityId, month, facilityType, regionType, department, '109');
        SWBChart(facilityId, month, facilityType, regionType, department, '120');
        IndirectNetRevenueChart(facilityId, month, facilityType, regionType, department, '121');
        NetRevenueChart(facilityId, month, facilityType, regionType, department, '119');
        CashCollectionChart(facilityId, month, facilityType, regionType, department, '124');
    }
};

var SWBChart= function(facilityId, month,facilityType,segment,Department,type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}

var IndirectNetRevenueChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            IndirectNetRevenueChartBuild(data);
        } else {
            BindEmptyChart(2);
        }
    });
}

var NetRevenueChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            NetRevenueChartBuild(data);
        } else {
            BindEmptyChart(3);
        }
    });
}

var CashCollectionChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            CashCollectionChartBuild(data);
        }
        else {
            BindEmptyChart(4);
        }
    });
}

function SWBChartbuild(dashboardData) {
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
        var dashbaordName = i == 0 ? "SWB % of Net Revenue Budget" : "SWB % of Net Revenue Actual";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltip('myDashboardGrossRoomChargesMonthly', SWBChartDataMonthly, "column", "SWB % of Net Revenue", "Month wise", categories);
}

function IndirectNetRevenueChartBuild(dashboardData) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
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
                //monthsArray.push(dashboardData[i].M1);
                //monthsArray.push(dashboardData[i].M2);
                //monthsArray.push(dashboardData[i].M3);
                //monthsArray.push(dashboardData[i].M4);
                //monthsArray.push(dashboardData[i].M5);
                //monthsArray.push(dashboardData[i].M6);
                //monthsArray.push(dashboardData[i].M7);
                //monthsArray.push(dashboardData[i].M8);
                //monthsArray.push(dashboardData[i].M9);
                //monthsArray.push(dashboardData[i].M10);
                //monthsArray.push(dashboardData[i].M11);
                //monthsArray.push(dashboardData[i].M12);
                //categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        }
        var dashbaordName = i == 0 ? "Net Revenue Trend Budget" : "Net Revenue Trend Actual";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltip('divAncilliaryRoomChargesMonthly', SWBChartDataMonthly, "line", "Net Revenue Trend", "Month wise", categories);
}

function NetRevenueChartBuild(dashboardData) {
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var categories = new Array();
    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
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
                //monthsArray.push(dashboardData[i].M1);
                //monthsArray.push(dashboardData[i].M2);
                //monthsArray.push(dashboardData[i].M3);
                //monthsArray.push(dashboardData[i].M4);
                //monthsArray.push(dashboardData[i].M5);
                //monthsArray.push(dashboardData[i].M6);
                //monthsArray.push(dashboardData[i].M7);
                //monthsArray.push(dashboardData[i].M8);
                //monthsArray.push(dashboardData[i].M9);
                //monthsArray.push(dashboardData[i].M10);
                //monthsArray.push(dashboardData[i].M11);
                //monthsArray.push(dashboardData[i].M12);
                //categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        }
        var dashbaordName = i == 0 ? "Indirect Costs as % of Net Revenue Budget" : "Indirect Costs as % of Net Revenue Actual";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltip('divAncilliaryRoomChargesYearly', SWBChartDataMonthly, "line", "Indirect Costs as % of Net Revenue", "Month wise", categories);
}

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
        SWBChartDataMonthly.push({ 'name': dashboardData[i].Defination, 'data': monthsArray });
    }
    BuildThreeSeriseGraphWithLegendsTooltip('divOPRoomChargesMonthly', SWBChartDataMonthly, "column", "Cash Flow Analysis", " ", categories, "Month wise");
}

function BindEmptyChart(type) {
    var month = $('#ddlMonth').val();
    var emptyChartDataMonthly = new Array();
    var categories = new Array();
    var textName = type == 1 ? "SWB % of Net Revenue" : type == 2 ? "Net Revenue Trend" : type == 3 ? "Indirect Costs as % of Net Revenue" : "";
    var charttype = type == 1 ? "column" : type == 2 ? "line" : type == 3 ? "line" : "column";
    var divParent = type == 1 ? "myDashboardGrossRoomChargesMonthly" : type == 2 ? "divAncilliaryRoomChargesMonthly" : type == 3 ? "divAncilliaryRoomChargesYearly" : "divOPRoomChargesMonthly";
    var looplength = (type == 1 || type == 2 || type == 3) ? 2 : 3;
    for (var i = 0; i < looplength; i++) {
        var dashbaordName = i == 0 ? textName + " Budget" : textName + " Actual";
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
        emptyChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltip(divParent, emptyChartDataMonthly, charttype, textName, "Month wise", categories);
}

var GetAddmissionChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            //SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}

var GetDischargesChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
           // SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}

var GetInaptientChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            //SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}

var GetOPEncounterChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            //SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}

var GetNetRevuneChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
            //SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}

var GetOccupencyratechart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardData", jsonData, function (data) {
        if (data != "") {
           // SWBChartbuild(data);
        } else {
            BindEmptyChart(1);
        }
    });
}
