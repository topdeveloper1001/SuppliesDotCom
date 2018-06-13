$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');

    setTimeout(function () {
        //BindCaseMGTGraphs();
        BindCaseMGTGraphs_New();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 100);

    $('#btnReBindGraphs').on('click', function () {
        //BindCaseMGTGraphs();
        BindCaseMGTGraphs_New();
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

function BindCaseMGTGraphs() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0, // $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/CaseManagementGraphsData", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.acuteOutDays != null && data.acuteOutDays.length > 2) {
                GraphsBuilderWithoutPercentage(data.acuteOutDays, 'myDashboardAcuteOutDays', "column", "Acute Out Days", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutDays', "column", "Acute Out Days", 3);
            }
            if (data.acuteOut != null && data.acuteOut.length > 2) {
                GraphsBuilderWithoutPercentage(data.acuteOut, 'myDashboardAcuteOut', "column", "Acute Out", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOut', "column", "Acute Out", 3);
            }
            if (data.therapueticLeaves != null && data.therapueticLeaves.length > 2) {
                GraphsBuilderWithoutPercentage(data.therapueticLeaves, 'myDashboardTherapueticLeaves', "column", "Therapuetic Leave Days", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTherapueticLeaves', "column", "Therapuetic Leave Days", 3);
            }
            if (data.presenceInitialAssessment != null && data.presenceInitialAssessment.length > 2) {
                GraphsBuilderWith100(data.presenceInitialAssessment, 'myDashboardInitialAccessment', "line", "Presence of initial assessment", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardInitialAccessment', "line", "Presence of initial assessment", 2);
            }
            if (data.presenceMDTdocumentation != null && data.presenceMDTdocumentation.length > 2) {
                GraphsBuilderWith100Target(data.presenceMDTdocumentation, 'myDashboardMDTDcoumentation', "line", "Presence of MDT documentation", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMDTDcoumentation', "line", "Presence of MDT documentation", 2);
            }
            if (data.presenceDischargedDocumentation != null && data.presenceDischargedDocumentation.length > 2) {
                GraphsBuilderWith100(data.presenceDischargedDocumentation, 'myDashboardDischargeddocumentation', "column", "Presence of discharged documentation", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeddocumentation', "column", "Presence of discharged documentation", 1);
            }
            if (data.dischargeDisposition != null && data.dischargeDisposition.length > 2) {
                GraphsBuilderWithoutPercentage(data.dischargeDisposition, 'myDashboardDischargeDisposition', "column", "Discharge Disposition", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeDisposition', "column", "Discharge Disposition", 1);
            }
            if (data.numberUnplannedDischarges != null && data.numberUnplannedDischarges.length > 2) {
                GraphsBuilderWithoutPercentage(data.numberUnplannedDischarges, 'myDashboardUnplannedDischarges', "column", "Number of unplanned discharges", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardUnplannedDischarges', "column", "Number of unplanned discharges", 1);
            }
            if (data.postDischargeFollowup != null && data.postDischargeFollowup.length > 2) {
                GraphsBuilderWith100Target(data.postDischargeFollowup, 'myDashboardPostDischargeFollowup', "column", "Post Discharge Follow-up Contact", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPostDischargeFollowup', "column", "Post Discharge Follow-up Contact", 1);
            }
            if (data.lostReferral != null && data.lostReferral.length > 2) {
                GraphsBuilderWith100(data.lostReferral, 'myDashboardLostRefrallsPercent', "column", "Lost Referral %", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostRefrallsPercent', "column", "Lost Referral %", 1);
            }
        }
    });
}

function BindCaseMGTGraphs_New() {
    var departmentNumber = $('#ddlDepartment').val() != null ? $('#ddlDepartment').val() : 0;
    var d = new Date();
    var monthVal = d.getMonth() + 1;
    var jsonData = {
        facilityId: $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0, // $('#ddlFacility').val(),
        month: $('#ddlMonth').val() != null ? $('#ddlMonth').val() : monthVal,
        facilityType: $('#ddlFacilityType').val(),
        segment: $('#ddlRegionType').val(),
        department: departmentNumber,
    };
    $.post("/ExternalDashboard/CaseManagementGraphsData_New", jsonData, function (data) {
        if (data != null && data != "") {
            // --- Section 1.1
            if (data.admissions != null && data.admissions.length > 2) {
                GraphsBuilderWithoutPercentage(data.admissions, 'myDashboardAcuteOut', "column", "Admissions", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOut', "column", "Admissions", 3);
            }
            // --- Section 1.2
            if (data.discharges != null && data.discharges.length > 2) {
                GraphsBuilderWithoutPercentage(data.discharges, 'myDashboardAcuteOutDays', "column", "Discharges", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutDays', "column", "Discharges", 3);
            }

            // --- Section 2.1
            if (data.adminssionbyReferalSource != null && data.adminssionbyReferalSource.length > 2) {
                PieChartToShowCategoriesOnly(data.adminssionbyReferalSource, 'myDashboardTherapueticLeaves', "column", "Admissions by Source", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTherapueticLeaves', "column", "Admissions by Source", 3);
            }
            // --- Section 2.2
            if (data.adminssionbyReferalSourceYtd != null && data.adminssionbyReferalSourceYtd.length > 2) {
                PieChartToShowCategoriesOnlyYearToDate(data.adminssionbyReferalSourceYtd, 'myDashboardInitialAccessment', "column", "Admissions by Source", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardInitialAccessment', "column", "Admissions by Source", 2, "Year To Date");
            }

            // --- Section 3.1
            if (data.dischargesbyDisposition != null && data.dischargesbyDisposition.length > 2) {
                PieChartToShowCategoriesOnly(data.dischargesbyDisposition, 'myDashboardMDTDcoumentation', "line", "Discharges by Disposition", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMDTDcoumentation', "line", "Discharges by Disposition", 3);
            }
            // --- Section 3.2
            if (data.dischargesbyDispositionYtd != null && data.dischargesbyDispositionYtd.length > 2) {
                PieChartToShowCategoriesOnlyYearToDateDischarges(data.dischargesbyDispositionYtd, 'myDashboardLostRefrallsPercent', "column", "Discharges by Disposition", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostRefrallsPercent', "column", "Discharges by Disposition", 1);
            }

            // --- Section 4.1
            if (data.outpatientEncounters != null && data.outpatientEncounters.length > 2) {
                GraphsBuilderWithoutPercentage(data.outpatientEncounters, 'myDashboardUnplannedDischarges', "column", "Outpatient Encounters", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardUnplannedDischarges', "column", "Outpatient Encounters", 3);
            }
            // --- Section 4.2
            if (data.oPEncountersbyType != null && data.oPEncountersbyType.length > 1) {
                GraphWithSubCategoryLegendsWithoutDecimal(data.oPEncountersbyType, 'myDashboardPostDischargeFollowup', "column", "OP Encounters by Type", 5);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPostDischargeFollowup', "column", "OP Encounters by Type", 5);
            }

            // --- Section 5.1
            if (data.totalOPAppointments != null && data.totalOPAppointments.length > 2) {
                GraphsBuilderWithoutPercentage(data.totalOPAppointments, 'myDashboardDischargeddocumentation', "column", "Total OP Appointments", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeddocumentation', "column", "Total OP Appointments", 3);
            }
            // --- Section 5.2
            if (data.oPSchedulingTypes != null && data.oPSchedulingTypes.length > 1) {
                GraphsBuilderTwoBarWithLegendsWithoutDecimal(data.oPSchedulingTypes, 'myDashboardDischargeDisposition', "column", "OP Scheduling Types", 5);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargeDisposition', "column", "OP Scheduling Types", 5);
            }
        }
    });
}


function PieChartToShowCategoriesOnly(dashboardData, containerid, charttype, chartName, chartFormattype) {
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
            var name = '';
            if (dashboardData[i].OtherDescription.indexOf('Re-Admission') != -1) {
                name = 'Re-Admission';
            } else {
                name = dashboardData[i].OtherDescription.indexOf('-') > 0
                ? dashboardData[i].OtherDescription.substr(dashboardData[i].OtherDescription.lastIndexOf('-') + 1, dashboardData[i].OtherDescription.length - 1) :
                dashboardData[i].OtherDescription.replace('Admission by Referral Source', '');
            }

            SWBChartDataMonthly.push({ 'name': name, 'y': value });
        }
    }
    if (chartFormattype == "1")
        ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'By Month');
    else if (chartFormattype == "3")
        ShowOnePieChartWithColorsWithOutPercentage(containerid, SWBChartDataMonthly, chartName, 'Current Month');
    else
        ShowOnePieChartWithColorsWithPercentage(containerid, SWBChartDataMonthly, chartName, 'By Month');
}


function PieChartToShowCategoriesOnlyYearToDate(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var swbChartDataMonthly = new Array();
    if (dashboardData != null) {
        for (var i = 0; i < dashboardData.length; i++) {
            //var name = dashboardData[i].DashBoard;//.replace("Admission by Referral Source", "");
            //var name = name.substring(dashboardData[i].DashBoard.lastIndexOf('-'), dashboardData[i].DashBoard.length-1) + '..';
            // swbChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].CYTA), 'tooltip': name });

            var name = '';
            if (dashboardData[i].DashBoard.indexOf('Re-Admission') != -1) {
                name = 'Re-Admission';
            } else {
                name = dashboardData[i].DashBoard.indexOf('-') > 0
                ? dashboardData[i].DashBoard.substr(dashboardData[i].DashBoard.lastIndexOf('-'), dashboardData[i].DashBoard.length - 1) :
                dashboardData[i].DashBoard.replace('Admission by Referral Source', '');
            }
            if (dashboardData[i].CYTA > 0) {
                swbChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].CYTA) });
            }
        }
        ShowOnePieChartWithColorsWithOutPercentage(containerid, swbChartDataMonthly, chartName, 'Year To Date');
    }
}

function PieChartToShowCategoriesOnlyYearToDateDischarges(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var swbChartDataMonthly = new Array();
    if (dashboardData != null) {
        for (var i = 0; i < dashboardData.length; i++) {
            //var name = dashboardData[i].DashBoard;//.replace("Admission by Referral Source", "");
            //var name = name.substring(dashboardData[i].DashBoard.lastIndexOf('-'), dashboardData[i].DashBoard.length-1) + '..';
            // swbChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].CYTA), 'tooltip': name });

            var name = dashboardData[i].DashBoard.indexOf('-') > 0
                ? dashboardData[i].DashBoard.substr(dashboardData[i].DashBoard.lastIndexOf('-'), dashboardData[i].DashBoard.length - 1) :
                dashboardData[i].DashBoard.replace('Discharges', '');
            if (dashboardData[i].CYTA > 0) {
                swbChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].CYTA) });
            }
        }
        ShowOnePieChartWithColorsWithOutPercentage(containerid, swbChartDataMonthly, chartName, 'Year To Date');
    }
}