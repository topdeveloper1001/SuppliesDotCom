$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');
    setTimeout(function () {
        //HRGraphs();
        HRGraphs_New();
        $('#ddlFacility option[value="2"]').text('---All---');
    }, 100);

    $('#btnReBindGraphs').on('click', function () {
        HRGraphs_New();
    });
});

/// <var>The enableddls</var>
var Enableddls = function () {
    var facilityId = $('#ddlFacility').val();
    if (facilityId === "2") {
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
        var items = '<option value="2">--All--</option>';
        $.each(data.reveuneAccount, function (i, obj) {
            var newItem = "<option id='" + obj.Value + "'  value='" + obj.Value + "'>" + obj.Text + "</option>";
            items += newItem;
        });
        $("#ddlDepartment").html(items);
        $("#ddlDepartment").val('2');
    });
};

function BindRemarksList(id) {
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
        Department: department != null ? department : 2,
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

function HRGraphs() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 2;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/GetHRGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.FTEs != null && data.FTEs.length > 2) {
                GraphsBuilderWithoutPercentage(data.FTEs, 'myDashboardFTE', "column", "Physician Positions", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFTE', "column", "Physician Positions", 1);
            }
            if (data.headcount != null && data.headcount.length > 2) {
                GraphsBuilderWithoutPercentage(data.headcount, 'myDashboardHeadcount', "column", "Clinician Positions", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardHeadcount', "column", "Clinician Positions", 3);
            }
            if (data.overtimeHours != null && data.overtimeHours.length > 2) {
                GraphsBuilderWith100(data.overtimeHours, 'myDashboardTotalWorkedHours', "column", "Administrative Positions", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalWorkedHours', "column", "Administrative Positions", 1);
            }
            if (data.attritionRate != null && data.attritionRate.length > 2) {
                GraphsBuilderWith100Target(data.attritionRate, 'myDashboardAttritionRate', "line", "Total Positions", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAttritionRate', "line", "Total Positions", 3);
            }
            if (data.employeeEngagementScore != null && data.employeeEngagementScore.length > 2) {
                GraphsBuilderWith100(data.employeeEngagementScore, 'myDashboardEmployeeEngagementScore', "column", "Employee Engagement Score", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardEmployeeEngagementScore', "column", "Employee Engagement Score", 1);
            }
            if (data.administrationTotalStaff != null && data.administrationTotalStaff.length > 2) {
                GraphsBuilderWith100(data.administrationTotalStaff, 'myDashboardAdministrationTotalStaff', "column", "Administration as a % of Total Staff", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAdministrationTotalStaff', "column", "Administration as a % of Total Staff", 1);
            }
            if (data.timetakenToRecruitVacantPos != null && data.timetakenToRecruitVacantPos.length > 2) {
                GraphsBuilderWithoutPercentage(data.timetakenToRecruitVacantPos, 'myDashboardTimeTakenToRecruitVacantPos', "column", "Time taken to recruit for a vacant position ", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTimeTakenToRecruitVacantPos', "column", "Time taken to recruit for a vacant position ", 1);
            }
            if (data.productiveHours != null && data.productiveHours.length > 2) {
                GraphsBuilderWithoutPercentage(data.productiveHours, 'myDashboardProductiveHours', "column", "Productive Hours", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardProductiveHours', "column", "Productive Hours", 1);
            }
            if (data.unproductiveHours != null && data.unproductiveHours.length > 2) {
                GraphsBuilderWithoutPercentage(data.unproductiveHours, 'myDashboardNonProductiveHours', "column", "Non productive Hours", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNonProductiveHours', "column", "Non productive Hours", 1);
            }

            if (data.nursingHoursPPD != null && data.nursingHoursPPD.length > 2) {
                GraphsBuilderWithoutPercentage(data.nursingHoursPPD, 'myDashboardNursingHoursPPD', "column", "Emiratization Rate", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingHoursPPD', "column", "Emiratization Rate", 1);
            }
        }
    });
}

function HRGraphs_New() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 2;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0,// $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/GetHRGraphsData_New", jsonData, function (data) {
        if (data != null && data != "") {
            //--- Section 1 G1
            if (data.physicianPositions != null && data.physicianPositions.length > 2) {
                GraphsBuilderWithLegends(data.physicianPositions, 'myDashboardFTE', "column", "Physician Positions", 5);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFTE', "column", "Physician Positions", 3);
            }
            //--- Section 1 G2
            if (data.clinicianPositions != null && data.clinicianPositions.length > 2) {
                GraphsBuilderWithLegends(data.clinicianPositions, 'myDashboardHeadcount', "column", "Clinician Positions", 5);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardHeadcount', "column", "Clinician Positions", 3);
            }

            //--- Section 2 G1
            if (data.administrativePositions != null && data.administrativePositions.length > 2) {
                GraphsBuilderWithLegends(data.administrativePositions, 'myDashboardTotalWorkedHours', "column", "Administrative Positions", 5);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalWorkedHours', "column", "Administrative Positions", 1);
            }
            //--- Section 2 G2
            if (data.totalPositions != null && data.totalPositions.length > 2) {
                GraphsBuilderWithoutPercentageTotalPosition(data.totalPositions, 'myDashboardAttritionRate', "column", "Total Positions", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAttritionRate', "column", "Total Positions", 1);
            }

            //--- Section 3 G1
            if (data.administrationtotalStaff != null && data.administrationtotalStaff.length > 2) {
                GraphsBuilderWith100Target(data.administrationtotalStaff, 'myDashboardAdministrationTotalStaff', "column", " Administration as a % of Total Staff", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAdministrationTotalStaff', "column", " Administration as a % of Total Staff", 1);
            }
            //--- Section 3 G2
            if (data.emiratizationRate != null && data.emiratizationRate.length > 2) {
                GraphsBuilderWith100TargetER(data.emiratizationRate, 'myDashboardNursingHoursPPD', "column", "Emiratization Rate", 6);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNursingHoursPPD', "column", "Emiratization Rate", 1);
            }

            //--- Section 4 G1
            if (data.timeTakentoRecruitVacantPosition != null && data.timeTakentoRecruitVacantPosition.length > 2) {
                GraphsBuilderWithoutPercentage(data.timeTakentoRecruitVacantPosition, 'myDashboardTimeTakenToRecruitVacantPos', "column", "Time taken to recruit for a vacant position ", 6);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTimeTakenToRecruitVacantPos', "column", "Time taken to recruit for a vacant position ", 1);
            }
            //--- Section 4 G2
            if (data.attritionRate != null && data.attritionRate.length > 1) {
                GraphsBuilderPercentageWithLegends_CustomER(data.attritionRate, 'myDashboardEmployeeEngagementScore', "column", "Attrition Rate", 6);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardEmployeeEngagementScore', "column", "Attrition Rate", 1);
            }
            
            //--- Section 5 G1
            if (data.productiveHours != null && data.productiveHours.length > 2) {
                GraphsBuilderWithoutPercentage(data.productiveHours, 'myDashboardProductiveHours', "column", "Productive Hours", 6);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardProductiveHours', "column", "Productive Hours", 1);
            }
            //--- Section 5 G2
            if (data.unproductiveHours != null && data.unproductiveHours.length > 2) {
                GraphsBuilderWithoutPercentage(data.unproductiveHours, 'myDashboardNonProductiveHours', "column", "Non productive Hours", 6);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardNonProductiveHours', "column", "Non productive Hours", 1);
            }

            //--- Section 6 G1
            if (data.overtimeRate != null && data.overtimeRate.length > 2) {
                GraphsBuilderWithoutPercentage(data.overtimeRate, 'myDashboardOvertimeRate', "column", "Overtime Rate", 6);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardOvertimeRate', "column", "Overtime Rate", 1);
            }
            
        }
    });
}
function GraphsBuilderWith100TargetER(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();
    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1));
                //monthsArray.push(parseFloat(Math.round(dashboardData[i].M1 * 100) / 100) * 100);
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
function GraphsBuilderPercentageWithLegends_CustomER(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
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
    if (chartLegendPosition == 6)
        BuildTwoSeriseGraphWithLegendsTooltip_Custom(containerid, dataArray, charttype, chartName, "Number of Leavers", categories);
    //BuildTwoSerisePercentageGraphWithLegendsTooltip(containerid, dataArray, charttype, chartName, "By Month", categories);
}
function GraphsBuilderWithoutPercentageTotalPosition(dashboardData, containerid, charttype, chartName, chartLegendPosition) {
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