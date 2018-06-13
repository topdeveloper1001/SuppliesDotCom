$(function () {
    BindDashboardFacilities("#ddlFacility", $("#hdCurrentFacilityId").val());
    BindFiscalYearDDls('#ddlYear', '');

    ColorizeGrids();

    var facilityId = $("#ddlFacility").val();
    var fiscalYear = $('#ddlYear').val();
    BuildGraphs(facilityId, fiscalYear);
    //AdjustedPatientDaysChart(facilityId, fiscalYear);
    //IPEncountersChart(facilityId, fiscalYear);
    //OPEncountersChart(facilityId, fiscalYear);
    //EREncountersChart(facilityId, fiscalYear);
    //AdmissionsChart(facilityId, fiscalYear);
    //DischargesChart(facilityId, fiscalYear);
    //IPADCChart(facilityId, fiscalYear);

    $('#ddlFacility').on('change', function () {
        var facilityIdval = $("#ddlFacility").val();
        var fiscalYearval = $('#ddlYear').val();
        fiscalYearval = fiscalYearval != '0' ? fiscalYearval : '2015';
        if (facilityIdval != null && facilityIdval != '') {
            GetFacilityDashboardData(facilityIdval, fiscalYearval);
        }
    });

    $('#ddlYear').on('change', function () {
        var facilityIdval = $("#ddlFacility").val();
        var fiscalYearval = $('#ddlYear').val();
        fiscalYearval = fiscalYearval != '0' ? fiscalYearval : '2015';
        if (facilityIdval != null && facilityIdval != '') {
            GetFacilityDashboardData(facilityIdval, fiscalYearval);
        }
    });
});

/// <var>The adjusted patient days chart</var>
var AdjustedPatientDaysChart = function (facilityId, fiscalYear) {
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1030'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowAdjustedPatientDaysDashboard(data);
        }
    });
};

function IPEncountersChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ips the encounters chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1001'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowIPEncountersDashboard(data);
        }
    });
}

function OPEncountersChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ops the encounters chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1002'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowOPEncountersDashboard(data);
        }
    });
}

function EREncountersChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ers the encounters chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1004'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowEREncountersChartDashboard(data);
        }
    });
}

function AdmissionsChart(facilityId, fiscalYear) {
    /// <summary>
    /// Admissionses the chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1015'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowAdmissionsChartDashboard(data);
        }
    });
}

function DischargesChart(facilityId, fiscalYear) {
    /// <summary>
    /// Dischargeses the chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1014'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDischargesChartDashboard(data);
        }
    });
}

function IPADCChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ipadcs the chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1023'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowIPADCChartDashboard(data);
        }
    });
}

function ShowAdjustedPatientDaysDashboard(dashboardData) {
    /// <summary>
    /// Shows the adjusted patient days dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var dataLength = dashboardData.length;
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardAdjustedPatientDaysMonthly', roomChargesDataMonthly, "column", "Adjusted Patient Days", "By Month", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardAdjustedPatientDaysYearly', roomChargesDataYearly, "column", "Adjusted Patient Days", "Year To Date", monthsArray);
}

function ShowIPEncountersDashboard(dashboardData) {
    /// <summary>
    /// Shows the ip encounters dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var dataLength = dashboardData.length;
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardIPEncountersMonthly', roomChargesDataMonthly, "column", "Patient Days", "By Month", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardIPEncountersYearly', roomChargesDataYearly, "column", "Patient Days", "Year To Date", monthsArray);
}

function ShowOPEncountersDashboard(dashboardData) {
    /// <summary>
    /// Shows the op encounters dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardOPEncountersMonthly', roomChargesDataMonthly, "column", "Outpatient Encounters", "By Month", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardOPEncountersYearly', roomChargesDataYearly, "column", "Outpatient Encounters", "Year To Date", monthsArray);
}

function ShowEREncountersChartDashboard(dashboardData) {
    /// <summary>
    /// Shows the er encounters chart dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardEREncountersMonthly', roomChargesDataMonthly, "column", "ER Encounters", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardEREncountersYearly', roomChargesDataYearly, "column", "ER Encounters", "Year To Date", monthsArray);
}

function ShowAdmissionsChartDashboard(dashboardData) {
    /// <summary>
    /// Shows the admissions chart dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }

    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardAdmissionMonthly', roomChargesDataMonthly, "column", "Admissions", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardAdmissionYearly', roomChargesDataYearly, "column", "Admissions", "Year To Date", monthsArray);
}

function ShowDischargesChartDashboard(dashboardData) {
    /// <summary>
    /// Shows the discharges chart dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardDischargesMonthly', roomChargesDataMonthly, "column", "Discharges", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardDischargesYearly', roomChargesDataYearly, "column", "Discharges", "Year To Date", monthsArray);
}

function ShowDischargesChartDashboard(dashboardData) {
    /// <summary>
    /// Shows the discharges chart dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthsArray = new Array();
    var dataLength = dashboardData.length;
    for (var i = 0; i < 2; i++) {
        monthsArray = new Array();
        monthsArray.push(dashboardData[i].M1);
        monthsArray.push(dashboardData[i].M2);
        monthsArray.push(dashboardData[i].M3);
        monthsArray.push(dashboardData[i].M4);
        monthsArray.push(dashboardData[i].M5);
        monthsArray.push(dashboardData[i].M6);
        monthsArray.push(dashboardData[i].M7);
        monthsArray.push(dashboardData[i].M8);
        monthsArray.push(dashboardData[i].M9);
        monthsArray.push(dashboardData[i].M10);
        monthsArray.push(dashboardData[i].M11);
        monthsArray.push(dashboardData[i].M12);
        roomChargesDataMonthly.push({ 'name': dashboardData[i].BudgetDescription, 'data': monthsArray });
    }
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('myDashboardDischargesMonthly', roomChargesDataMonthly, "column", "Discharges", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardDischargesYearly', roomChargesDataYearly, "column", "Discharges", "Year To Date", monthsArray);
}

function ShowIPADCChartDashboard(dashboardData) {
    /// <summary>
    /// Shows the ipadc chart dashboard.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var dataLength = dashboardData.length;
    var monthsArray = new Array();
    if (dataLength >= 10) {
        for (var j = 6; j < 11; j++) {
            if (j == 6 || j == 7 || j == 8 || j == 9) {
                monthsArray = new Array();
                if (j == 9) {
                    monthsArray.push(dashboardData[8].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[8].BudgetDescription, 'data': monthsArray });
                } else if (j == 8) {
                    monthsArray.push(dashboardData[9].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[9].BudgetDescription, 'data': monthsArray });
                } else {
                    monthsArray.push(dashboardData[j].M12);
                    roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
                }
            }
        }
    }
    else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowFourBarsChartWithLabelsOnBars('myDashboardADCYearly', roomChargesDataYearly, "column", "Average Daily Census (ADC)", "Year To Date", monthsArray);
}

/// <var>The colorize grids</var>
var ColorizeGrids = function () {
    RowColumnColorGrid("InpatientEncountersgrid");
    RowColumnColorGrid("OutpatientEncountersgrid");
    RowColumnColorGrid("EREncountersgrid");
    RowColumnColorGrid("Admissionsgrid");
    RowColumnColorGrid("Dischargesgrid");
    RowColumnColorGrid("ALOSgrid");
    RowColumnColorGrid("InpatientsADCgrid");//PatientDaysGrid
    RowColumnColorGrid("PatientDaysGrid");
};

/// <var>The get facility dashboard data</var>
var GetFacilityDashboardData = function(facilityId, fiscalYear) {
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear
    };
    $.post("/Dashboard/GetPatientVolumeDashboardData", jsonData, function (data) {
        $('#PatinetVolumeStats').empty();
        $('#PatinetVolumeStats').html(data);
        ColorizeGrids();
    });
    facilityId = facilityId == '0' ? '-1' : facilityId;
    BuildGraphs(facilityId, fiscalYear);
};

/// <var>The build graphs</var>
var BuildGraphs = function (facilityId, fiscalYear) {
    AdjustedPatientDaysChart(facilityId, fiscalYear);
    IPEncountersChart(facilityId, fiscalYear);
    OPEncountersChart(facilityId, fiscalYear);
    EREncountersChart(facilityId, fiscalYear);
    AdmissionsChart(facilityId, fiscalYear);
    DischargesChart(facilityId, fiscalYear);
    IPADCChart(facilityId, fiscalYear);
};