$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());
    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');
    setTimeout(function () { BuildGraphsV1(); }, 800);

    $('#btnReBindGraphs').on('click', function () {
        BindKPIDashBoardlist();
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
var BindKPIDashBoardlist = function () {
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
        url: '/ExternalDashboard/GetKpiDashboardFiltered',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        data: jsonData,
        success: function (data) {
            if (data != null) {
                $('#divKPIDashboard').empty();
                $('#divKPIDashboard').html(data);
                BuildGraphsV1();
            }
        },
        error: function (msg) {
        }
    });
};

/// <var>The build graphs</var>
var BuildGraphsV1 = function () {
    var facilityId = $('#ddlFacility').val() != null ? $('#ddlFacility').val() : 0;// $('#ddlFacility').val();
    var month = $('#ddlMonth').val();
    var facilityType = $('#ddlFacilityType').val();
    var regionType = $('#ddlRegionType').val();
    var department = $('#ddlDepartment').val();
    var dashBoardType = $('#hdDashboardType').val();
    HighAlertMedicationChart(facilityId, month, facilityType, regionType, department, '172');
    PainMGTComplainceChart(facilityId, month, facilityType, regionType, department, '153');
    PatientFallRateGraph(facilityId, month, facilityType, regionType, department, '174');

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
    $.post("/ExternalDashboard/GetKPIGraphsDataV1", jsonData, function (data) {
        if (data != null && data != "") {
            if (data.FTEs != null && data.FTEs.length > 2) {
                GraphsBuilderWithoutPercentage(data.FTEs, 'myDashboardFTE', "column", "FTEs", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardFTE', "column", "FTEs", 1);
            }
            if (data.headcount != null && data.headcount.length > 2) {
                GraphsBuilderWithoutPercentage(data.headcount, 'myDashboardHeadcount', "column", "Headcount", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardHeadcount', "column", "Headcount", 3);
            }
            if (data.overtimeHours != null && data.overtimeHours.length > 2) {
                GraphsBuilderWith100(data.overtimeHours, 'myDashboardTotalWorkedHours', "column", "Overtime Hours % of Total Worked Hours", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardTotalWorkedHours', "column", "Overtime Hours % of Total Worked Hours", 1);
            }
            if (data.attritionRate != null && data.attritionRate.length > 2) {
                GraphsBuilderWith100Target(data.attritionRate, 'myDashboardAttritionRate', "line", "Attrition rate", 3);
            }
            else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAttritionRate', "line", "Attrition rate", 3);
            }
            if (data.lostReferral != null && data.lostReferral.length > 2) {
                GraphsBuilderWith100(data.lostReferral, 'myDashboardLostRefrallsPercent', "column", "Lost Referral %", 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardLostRefrallsPercent', "column", "Lost Referral %", 1);
            }
            if (data.presenceMDTdocumentation != null && data.presenceMDTdocumentation.length > 2) {
                GraphsBuilderWithoutPercentageTarget(data.presenceMDTdocumentation, 'myDashboardMDTDcoumentation', "line", "Presence of MDT documentation", 4);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardMDTDcoumentation', "line", "Presence of MDT documentation", 4);
            }
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
            //----------------------------------------------------------------------------------------------------------------------------------//
            if (data.typeOfIncidents != null && data.typeOfIncidents.length > 2) {
                BuildActualFourBarGraphs(data.typeOfIncidents, 'myDashboardGraph1', "column", "TYPES OF INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardGraph1', "column", "TYPES OF INCIDENTS", 1);
            }
            if (data.categoryofIncidents != null && data.categoryofIncidents.length > 2) {
                GraphsBuilderWithoutPercentageDefination(data.categoryofIncidents, 'myDashboardGraph2', "column", "CATEGORY OF THE INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardGraph2', "column", "CATEGORY OF THE INCIDENTS", 1);
            }
            //if (data.medicationErrors != null && data.medicationErrors.length == 18) {
            //    BuildBudgetNineBarGraphs(data.medicationErrors, 'myDashboardMedicationError', "column", "MEDICATION ERRORS", 1, "");
            //} else {
            //    EmptyGraphsBuilderWithoutPercentageTarget('myDashboardMedicationError', "column", "MEDICATION ERRORS", 1);
            //}
            if (data.medicationErrors != null && data.medicationErrors.length == 20) {
                BuildBudgetTenBarGraphs(data.medicationErrors, 'myDashboardMedicationError', "column", "MEDICATION ERRORS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardMedicationError', "column", "MEDICATION ERRORS", 1);
            }
            if (data.nonMedicationRelatedIncidents != null && data.nonMedicationRelatedIncidents.length > 2) {
                BuildActualFiveBarGraphs(data.nonMedicationRelatedIncidents, 'myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1, "");
            } else {
                EmptyGraphsBuilderWithoutPercentageTarget('myDashboardIncidents', "column", "NON MEDICATION RELATED INCIDENTS", 1);
            }
        }
    });
};

var HighAlertMedicationChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardDataV1", jsonData, function (data) {
        if (data != "" && data.length > 2) {
            GraphsBuilderWith100Target(data, 'myDashboardHighAlertMedication', "column", "Management of High Alert Medication", 1);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardHighAlertMedication', "column", "Management of High Alert Medication", 1);
        }
    });
}

var PatientFallRateChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardDataV1", jsonData, function (data) {
        if (data != "" && data.length > 2) {
            PatientFallRateChartbuild(data);
            //GraphsBuilderWith100(data, 'myDashboardRiskAccessment', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
        } else {
            EmptyGraphsBuilderWithoutPercentage('myDashboardRiskAccessment', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
        }
    });
}

var PainMGTComplainceChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardDataV1", jsonData, function (data) {
        if (data != "" && data.length > 2) {
            PainMGTComplainceChartbuild(data);
        } else {
            EmptyGraphsBuilderWithoutPercentage('divPainMGTComppalinceRate', "column", "Pain Management Compliance  Rate", 2);
        }
    });
}

var IndirectNetRevenueChart = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardDataV1", jsonData, function (data) {
        if (data != "" && data.length > 2) {
            IndirectNetRevenueChartBuild(data);
        } else {
            //EmptyGraphsBuilderWithoutPercentage('divPainMGTComppalinceRate', "column", "Pain Management Compliance  Rate", 2);
        }
    });
}

var PatientFallRateGraph = function (facilityId, month, facilityType, segment, Department, type) {
    var jsonData = {
        facilityID: facilityId,
        month: month,
        facilityType: facilityType,
        segment: segment,
        Department: Department != null ? Department : 0,
        type: type
    };
    $.post("/ExternalDashboard/GetManualDashboardDataV1", jsonData, function (data) {
        if (data != "" && data.length > 2) {
            //GraphsBuilderWith100(data, 'myDashboardRiskAccessment', "bar", "Fall Risk Assessment Protocol Compliance Rate", 2);
            GraphsBuilderWithoutPercentage(data, 'myDashboardRiskAccessment', "column", "Patient Fall Rate with Injury", 1);
        }
    });
}

function HighAlertMedicationChartbuild(dashboardData) {
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
        var dashbaordName = i == 0 ? "Budget/Target" : "Actual";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    //
    BuildTwoSeriseGraphWithLegendsTooltipPercentage('myDashboardHighAlertMedication', SWBChartDataMonthly, "column", "Management of High Alert Medication", "Month wise", categories);
}

function PatientFallRateChartbuild(dashboardData) {
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
        var dashbaordName = i == 0 ? "Budget/Target" : "Actual";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltipPercentage('myDashboardRiskAccessment', SWBChartDataMonthly, "bar", "Fall Risk Assessment Protocol Compliance Rate", "Month wise", categories);
}

function PainMGTComplainceChartbuild(dashboardData) {
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
        var dashbaordName = i == 0 ? "Budget/Target" : "Compliance Rate";
        SWBChartDataMonthly.push({ 'name': dashbaordName, 'data': monthsArray });
    }
    BuildTwoSeriseGraphWithLegendsTooltipPercentage('divPainMGTComppalinceRate', SWBChartDataMonthly, "column", "Pain Management Compliance  Rate", "Month wise", categories);
}