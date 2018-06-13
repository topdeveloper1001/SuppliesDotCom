$(function () {

    BindAllPatientAcquisitionData($("#hdFacilityId").val());

    $('#btnReBindGraphs').on('click', function () {
        //BindPatientAcquisitionGraphs();
        RebindPatientAcquisitionGraphData();
    });
});

function BindAllPatientAcquisitionData(facilityId) {
    facilityId = facilityId == 14 ? 17 : facilityId;
    $.getJSON("/ExternalDashboard/BindPatientAcquisitionData", { facilityId: facilityId }, function (data) {
        if (data != null && data != "") {
            BindDropdownDataV2(data.ftList, "#ddlFacilityType", "", "All");
            BindDropdownDataV2(data.rList, "#ddlRegionType", "", "All");
            BindDropdownDataV2(data.fList, "#ddlFacility", data.facilityid, "---All---");

            if ($("#ddlMonth").length > 0)
                BindDropdownDataV2(data.mList, "#ddlMonth", data.defaultMonth, "--Select--");

            BindDropdownDataV2(data.dList, "#ddlDepartment", "", "All");


            //Graphs Binding starts here
            BindGraphsInPA(data);
        }
    });
}

function BindGraphsInPA(data) {
    if (data.conversionRate != null && data.conversionRate.length > 2) {
        GraphsBuilderWith100TargetPatAcq(data.conversionRate, 'myDashboardFallRisk', "column", "Conversion Rate", 5);
    } else {
        EmptyGraphsBuilderWithoutPercentage('myDashboardFallRisk', "column", "Conversion Rate", 2);
    }
    if (data.patientinFunnel != null && data.patientinFunnel.length > 2) {
        GraphsBuilderWithoutPercentage(data.patientinFunnel, 'myDashboardPainManagementComplianceRate', "column", "Patient in Funnel (Active Refferals)", 3);
    } else {
        EmptyGraphsBuilderWithoutPercentage('myDashboardPainManagementComplianceRate', "column", "Patient in Funnel (Active Refferals)", 3);
    }
    if (data.timefromFunneltoBed != null && data.timefromFunneltoBed.length > 2) {
        GraphsBuilderWithoutPercentagePatAcq(data.timefromFunneltoBed, 'myDashboardNursingStaffCompetency', "column", "Time from Funnel to Bed", 1);
    } else {
        EmptyGraphsBuilderWithoutPercentage('myDashboardNursingStaffCompetency', "column", "Time from Funnel to Bed", 1);
    }
    if (data.lostfromFunnel != null && data.lostfromFunnel.length > 2) {
        GraphsBuilderWithoutPercentage(data.lostfromFunnel, 'myDashboardNursingDepartmentOrientation', "column", "Lost from Funnel  ", 3);
    } else {
        EmptyGraphsBuilderWithoutPercentage('myDashboardNursingDepartmentOrientation', "column", "Lost from Funnel  ", 3);
    }
}

function RebindPatientAcquisitionGraphData() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.getJSON("/ExternalDashboard/RebindPatientAcquisitionData", jsonData, function (data) {
        if (data != null && data != "") {
            BindGraphsInPA(data);
        }
    });
}

function GraphsBuilderWith100TargetPatAcq(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
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

function GraphsBuilderWithoutPercentagePatAcq(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
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
    else if (chartLegendPosition == 7)
        BuildThreeSeriseBarGraphWithOutDecimals(containerid, dataArray, charttype, chartName, "By Month (000s)", categories);
}







//-------------$$$$$$$$$$$$$$$$$--Below Methods NOT-IN-USE--$$$$$$$$$$$$$$$$$$$$$$$$$

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

function BindRemarksList(id) {
    /// <summary>
    /// Binds the remarks list.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    var facilityId = $('#ddlFacility').val();
    var month = $('#ddlMonth').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var department = $('#ddlDepartment').val();
    var dashBoardType = $('#hdDashboardType').val();
    var typeSection = id;
    var viewAll = $('#chkShowAllSection' + id).prop('checked');
    var jsonData = JSON.stringify({
        facilityId: facilityId,
        month: month,
        facilityType: facilityType,
        segment: regionType,
        Department: department != null ? department : 0,
        type: dashBoardType,
        viewAll: viewAll,
        sectionType: typeSection
    });

    $.ajax({
        cache: false,
        type: "POST",
        url: '/ExternalDashboard/ViewRemarkdsListByDashboardSection',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            BindList("#divSection" + id, data);
        },
        error: function (msg) {
        }
    });
};

function BindAllClinicalComplianceGraphs() {
    /// <summary>
    /// Binds all clinical quality graphs.
    /// </summary>
    /// <returns></returns>
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/ClinicalGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.fallRiskList != null && data.fallRiskList.length > 2) {
                GraphsBuilderWith100Target(data.fallRiskList, 'myDashboardFallRisk', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFallRisk', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
            }
            if (data.painManagementList != null && data.painManagementList.length > 2) {
                GraphsBuilderWith100Target(data.painManagementList, 'myDashboardPainManagementComplianceRate', "column", "Pain Management Compliance  Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPainManagementComplianceRate', "column", "Pain Management Compliance  Rate", 1);
            }
            if (data.nursingStaffCompetency != null && data.nursingStaffCompetency.length > 2) {
                GraphsBuilderWith100Target(data.nursingStaffCompetency, 'myDashboardNursingStaffCompetency', "column", "Nursing Staff Competency", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingStaffCompetency', "column", "Nursing Staff Competency", 1);
            }
            if (data.nursingDepartmentOrientation != null && data.nursingDepartmentOrientation.length > 2) {
                GraphsBuilderWith100Target(data.nursingDepartmentOrientation, 'myDashboardNursingDepartmentOrientation', "column", "Nursing Department Orientation", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingDepartmentOrientation', "column", "Nursing Department Orientation", 1);
            }
            if (data.patientIdentification != null && data.patientIdentification.length > 2) {
                GraphsBuilderWith100Target(data.patientIdentification, 'myDashboardPatientIdentification', "column", "Patient Identification", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientIdentification', "column", "Patient Identification", 1);
            }
            if (data.compliancetoPressureUlcerPreventionProtocol != null && data.compliancetoPressureUlcerPreventionProtocol.length > 2) {
                GraphsBuilderWith100Target(data.compliancetoPressureUlcerPreventionProtocol, 'myDashboardCompliancetoPressureUlcerPreventionProtocol', "column", "Compliance to Pressure Ulcer Prevention Protocol", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardCompliancetoPressureUlcerPreventionProtocol', "column", "Compliance to Pressure Ulcer Prevention Protocol", 1);
            }
            if (data.sbarProtocolComplianceRate != null && data.sbarProtocolComplianceRate.length > 2) {
                GraphsBuilderWith100Target(data.sbarProtocolComplianceRate, 'myDashboardSBARProtocolComplianceRate', "column", "SBAR Protocol Compliance Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardSBARProtocolComplianceRate', "column", "SBAR Protocol Compliance Rate", 1);
            }
            if (data.handHygineComplainceRate != null && data.handHygineComplainceRate.length > 2) {
                GraphsBuilderWith100Target(data.handHygineComplainceRate, 'myDashboardHandHygineComplainceRate', "column", "Hand Hygine Complaince Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardHandHygineComplainceRate', "column", "Hand Hygine Complaince Rate", 1);
            }
            if (data.staffVaccinationRate != null && data.staffVaccinationRate.length > 2) {
                GraphsBuilderWith100Target(data.staffVaccinationRate, 'myDashboardStaffVaccinationRate', "column", "Staff Vaccination Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardStaffVaccinationRate', "column", "Staff Vaccination Rate", 1);
            }
            if (data.therapyInitialAssessmentProtocolCompliance != null && data.therapyInitialAssessmentProtocolCompliance.length > 2) {
                GraphsBuilderWith100Target(data.therapyInitialAssessmentProtocolCompliance, 'myDashboardTherapyInitialAssessmentProtocolCompliance', "column", "Therapy Initial Assessment Protocol Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTherapyInitialAssessmentProtocolCompliance', "column", "Therapy Initial Assessment Protocol Compliance", 1);
            }
            if (data.manualHandlingRiskAssessmentProtocolCompliance != null && data.manualHandlingRiskAssessmentProtocolCompliance.length > 2) {
                GraphsBuilderWith100Target(data.manualHandlingRiskAssessmentProtocolCompliance, 'myDashboardManualHandlingRiskAssessmentProtocolCompliance', "column", "Manual Handling Risk Assessment Protocol Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardManualHandlingRiskAssessmentProtocolCompliance', "column", "Manual Handling Risk Assessment Protocol Compliance", 1);
            }
            if (data.standardizedOutcomeMeasureProtocol != null && data.standardizedOutcomeMeasureProtocol.length > 2) {
                GraphsBuilderWith100Target(data.standardizedOutcomeMeasureProtocol, 'myDashboardStandardizedOutcomeMeasureProtocolAdmissionCompliance', "column", "Standardized Outcome Measure Protocol within 7 days of Admission Compliance", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardStandardizedOutcomeMeasureProtocolAdmissionCompliance', "column", "Standardized Outcome Measure Protocol within 7 days of Admission Compliance", 1);
            }
        }
    });
}

function BindPatientAcquisitionGraphs() {
    /// <summary>
    /// Binds all clinical quality graphs.
    /// </summary>
    /// <returns></returns>
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/ClinicalComplianceGraphsDataV1", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.conversionRate != null && data.conversionRate.length > 2) {
                GraphsBuilderWith100TargetPatAcq(data.conversionRate, 'myDashboardFallRisk', "column", "Conversion Rate", 5);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFallRisk', "column", "Conversion Rate", 2);
            }
            if (data.patientinFunnel != null && data.patientinFunnel.length > 2) {
                GraphsBuilderWithoutPercentage(data.patientinFunnel, 'myDashboardPainManagementComplianceRate', "column", "Patient in Funnel (Active Refferals)", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPainManagementComplianceRate', "column", "Patient in Funnel (Active Refferals)", 3);
            }
            if (data.timefromFunneltoBed != null && data.timefromFunneltoBed.length > 2) {
                GraphsBuilderWithoutPercentagePatAcq(data.timefromFunneltoBed, 'myDashboardNursingStaffCompetency', "column", "Time from Funnel to Bed", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingStaffCompetency', "column", "Time from Funnel to Bed", 1);
            }
            if (data.lostfromFunnel != null && data.lostfromFunnel.length > 2) {
                GraphsBuilderWithoutPercentage(data.lostfromFunnel, 'myDashboardNursingDepartmentOrientation', "column", "Lost from Funnel  ", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingDepartmentOrientation', "column", "Lost from Funnel  ", 3);
            }
        }
    });
}

//-------------$$$$$$$$$$$$$$$$$--Above Methods NOT-IN-USE--$$$$$$$$$$$$$$$$$$$$$$$$$