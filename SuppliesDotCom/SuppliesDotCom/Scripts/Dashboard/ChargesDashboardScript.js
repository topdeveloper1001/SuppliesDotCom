$(function () {

    BindCorporateDataInChargesDashboard();
    BindFiscalYearDDls('#ddlYear', '');

    var facilityId = $("#hdCurrentFacilityId").val();
    var fiscalYear = $('#ddlYear').val();
    if (facilityId != '0')
        BuildGraphs(facilityId, fiscalYear);

    ColorizeGrids();
    //GrossRoomChargesChart();
    //AncilliaryRoomChargesChart();
    //OPChargesChart();
    //ERChargesChart();
    //IPChargesPerPatientChart();
    //OPChargesPerEncounterChart();
    //ERChargesPerEncounterChart();

    $('#ddlCorporate').on('change', function () {
        var selected = $(this).val();
        $("#hdCorporateId").val(selected);
        BindFacilityDropdownFilterInChargesDashboard(selected);
    });

    $('#ddlFacilityFilter').on('change', function () {
        var facilityIdval = $("#ddlFacilityFilter").val();
        var fiscalYearval = $('#ddlYear').val();

        $("#hdCurrentFacilityId").val(fiscalYearval);

        fiscalYearval = fiscalYearval != '0' ? fiscalYearval : '2015';
        if (facilityIdval != null && facilityIdval != '') {
            GetFacilityDashboardData(facilityIdval, fiscalYearval);
        }
    });

    $('#ddlYear').on('change', function () {
        var facilityIdval = $("#ddlFacilityFilter").val();
        var fiscalYearval = $('#ddlYear').val();
        fiscalYearval = fiscalYearval != '0' ? fiscalYearval : '2015';
        if (facilityIdval != null && facilityIdval != '') {
            GetFacilityDashboardData(facilityIdval, fiscalYearval);
        }
    });
});

function GrossRoomChargesChart(facilityId, fiscalYear) {
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '10'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboard(data);
        }
    });
}

function AncilliaryRoomChargesChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ancilliaries the room charges chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1018'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboardAncilliaryRoomCharges(data);
        }
    });
}

function OPChargesChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ops the charges chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1019'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboardOPCharges(data);
        }
    });
}

function ERChargesChart(facilityId, fiscalYear) {
    /// <summary>
    /// Ers the charges chart.
    /// </summary>
    /// <returns></returns>
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '1020'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboardERCharges(data);
        }
    });
}

/// <var>
/// The ip charges per patient chart
/// </var>
var IPChargesPerPatientChart = function (facilityId, fiscalYear) {
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '14'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboardIPChargesPerPatienChart(data);
        }
    });
};

/// <var>
/// The op charges per encounter chart
/// </var>
var OPChargesPerEncounterChart = function (facilityId, fiscalYear) {
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '15'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboardOPChargesPerEncounterChart(data);
        }
    });
};

/// <var>
/// The er charges per encounter chart
/// </var>
var ERChargesPerEncounterChart = function (facilityId, fiscalYear) {
    fiscalYear = fiscalYear != '0' ? fiscalYear : '2015';
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear,
        budgetFor: '16'
    };
    $.post("/Dashboard/GetChargesDashboardData", jsonData, function (data) {
        if (data != "") {
            ShowDashboardERChargesPerEncounterChart(data);
        }
    });
};

function ShowDashboard(dashboardData) {
    /// <summary>
    /// Shows the dashboard.
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
    ShowTwoBarsChartWithLabelsOnBars('myDashboardGrossRoomChargesMonthly', roomChargesDataMonthly, "column", "Gross Room Charges", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('myDashboardGrossRoomChargesYearly', roomChargesDataYearly, "column", "Gross Room Charges", "Year To Date", '');
}

function ShowDashboardAncilliaryRoomCharges(dashboardData) {
    /// <summary>
    /// Shows the dashboard ancilliary room charges.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dataLength = dashboardData.length;
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
    ShowTwoBarsChartWithLabelsOnBars('divAncilliaryRoomChargesMonthly', roomChargesDataMonthly, "column", "Ancillary Gross Charges", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('divAncilliaryRoomChargesYearly', roomChargesDataYearly, "column", "Ancillary Gross Charges", "Year To Date", monthsArray);
}

function ShowDashboardOPCharges(dashboardData) {
    /// <summary>
    /// Shows the dashboard op charges.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dataLength = dashboardData.length;
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
    } else {
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
    ShowTwoBarsChartWithLabelsOnBars('divOPRoomChargesMonthly', roomChargesDataMonthly, "column", "Outpatient Gross Charges", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('divOPRoomChargesYearly', roomChargesDataYearly, "column", "Outpatient Gross Charges", "Year To Date", monthsArray);
}

function ShowDashboardERCharges(dashboardData) {
    /// <summary>
    /// Shows the dashboard er charges.
    /// </summary>
    /// <param name="dashboardData">The dashboard data.</param>
    /// <returns></returns>
    var roomChargesDataMonthly = new Array();
    var roomChargesDataYearly = new Array();
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dataLength = dashboardData.length;
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
    } else {
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
    ShowTwoBarsChartWithLabelsOnBars('divERRoomChargesMonthly', roomChargesDataMonthly, "column", "Emergency Room Gross Charges", "Month wise", categories);
    ShowFourBarsChartWithLabelsOnBars('divERRoomChargesYearly', roomChargesDataYearly, "column", "Emergency Room Gross Charges", "Year To Date", monthsArray);
}

/// <var>
/// The show dashboard ip charges per patien chart
/// </var>
var ShowDashboardIPChargesPerPatienChart = function (dashboardData) {
    var roomChargesDataYearly = new Array();
    var dataLength = dashboardData.length;
    var monthsArray = new Array();
    //for (var j = 6; j < 11; j++) {
    //if (j == 6 || j == 7 || j == 8 || j == 9) {
    if (dataLength >= 10) {
        for (var j = 6; j < 8; j++) {
            if (j == 6 || j == 7) {
                monthsArray = new Array();
                monthsArray.push(dashboardData[j].M12);
                roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
            }
        }
    } else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('divIPChargesPerPatientDay', roomChargesDataYearly, "column", "Inpatient Gross Charges per Patient Day", "Year To Date", monthsArray);
};

/// <var>
/// The show dashboard op charges per encounter chart
/// </var>
var ShowDashboardOPChargesPerEncounterChart = function (dashboardData) {
    var roomChargesDataYearly = new Array();
    var dataLength = dashboardData.length;
    var monthsArray = new Array();
    //for (var j = 6; j < 11; j++) {
    //if (j == 6 || j == 7 || j == 8 || j == 9) {
    if (dataLength >= 10) {
        for (var j = 6; j < 8; j++) {
            if (j == 6 || j == 7) {
                monthsArray = new Array();
                monthsArray.push(dashboardData[j].M12);
                roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
            }
        }
    } else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('divOPChargesPerEncounter', roomChargesDataYearly, "column", "Outpatient Gross Charges per Encounter", "Year To Date", monthsArray);
};

/// <var>
/// The show dashboard er charges per encounter chart
/// </var>
var ShowDashboardERChargesPerEncounterChart = function (dashboardData) {
    var roomChargesDataYearly = new Array();
    var dataLength = dashboardData.length;
    var monthsArray = new Array();
    if (dataLength >= 10) {
        for (var j = 6; j < 8; j++) {
            //if (j == 6 || j == 7 || j == 8 || j == 9) {
            if (j == 6 || j == 7) {
                monthsArray = new Array();
                monthsArray.push(dashboardData[j].M12);
                roomChargesDataYearly.push({ 'name': dashboardData[j].BudgetDescription, 'data': monthsArray });
            }
        }
    } else {
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
        monthsArray = new Array();
        monthsArray.push('0');
        roomChargesDataYearly.push({ 'name': '', 'data': monthsArray });
    }
    monthsArray = new Array();
    monthsArray.push('');
    ShowTwoBarsChartWithLabelsOnBars('divERChargesPerEncounter', roomChargesDataYearly, "column", "Emergency Room Gross Charges per Encounter", "Year To Date", monthsArray);
};

/// <var>The get facility dashboard data</var>
var GetFacilityDashboardData = function (facilityId, fiscalYear) {
    var jsonData = {
        facilityID: facilityId,
        fiscalyear: fiscalYear
    };
    $.post("/Dashboard/GetFacilityDashboardData", jsonData, function (data) {
        $('#divChargesStats').empty();
        $('#divChargesStats').html(data);
        ColorizeGrids();
    });
    facilityId = facilityId == '0' ? '-1' : facilityId;
    BuildGraphs(facilityId, fiscalYear);
};

/// <var>The colorize grids</var>
var ColorizeGrids = function () {
    RowColumnColorGrid("ERGrossChargesgrid");
    RowColumnColorGrid("IPGrossChargesGrid");
    RowColumnColorGrid("RoomGrossChargesgrid");
    RowColumnColorGrid("OPGrossChargesgrid");
    RowColumnColorGrid("IPRevenueChargesgrid");
    RowColumnColorGrid("OPRevenueChargesgrid");
    RowColumnColorGrid("ERRevenueChargesgrid");
};

/// <var>The build graphs</var>
var BuildGraphs = function (facilityId, fiscalYear) {
    GrossRoomChargesChart(facilityId, fiscalYear);
    AncilliaryRoomChargesChart(facilityId, fiscalYear);
    OPChargesChart(facilityId, fiscalYear);
    ERChargesChart(facilityId, fiscalYear);
    IPChargesPerPatientChart(facilityId, fiscalYear);
    OPChargesPerEncounterChart(facilityId, fiscalYear);
    ERChargesPerEncounterChart(facilityId, fiscalYear);
};


function BindCorporateDataInChargesDashboard() {
    //Bind Corporates
    /// <summary>
    /// Binds the corporates.
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <param name="selectedId">The selected identifier.</param>
    /// <returns></returns>
    $.ajax({
        type: "POST",
        url: "/Home/GetCorporatesDropdownData",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: null,
        success: function (data) {
            BindDropdownData(data, "#ddlCorporate", $("#hdCorporateId").val());
            var corporaeIdFilter = $("#ddlCorporate").val();
            if (corporaeIdFilter > 0) {
                BindFacilityDropdownFilterInChargesDashboard(corporaeIdFilter);
            }
        },
        error: function (msg) {
        }
    });
}

function BindFacilityDropdownFilterInChargesDashboard(cId) {
    if (cId > 0) {
        $.ajax({
            type: "POST",
            url: "/Home/GetFacilitiesbyCorporate",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ corporateid: cId }),
            success: function (data) {
                BindDropdownData(data, "#ddlFacilityFilter", "#hdCurrentFacilityId");

                if ($("#ddlFacilityFilter").val() == null)
                    $("#ddlFacilityFilter")[0].selectedIndex = 0;

            },
            error: function (msg) {
                console.log(msg);
            }
        });
    } else {
        BindDropdownData('', "#ddlFacilityFilter", "");
        $("#ddlFacilityFilter")[0].selectedIndex = 0;
    }
}