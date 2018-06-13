$(function () {
    BindDepartmentsDropdown();
    BindGlobalCodesWithValueCustom("#ddlFacilityType", 4242, "");
    BindGlobalCodesWithValueCustom("#ddlRegionType", 4141, "");
    BindFacilitiesWithoutCorporate('#ddlFacility', $('#hdFacilityId').val());

    BindAndSetDefaultMonth(903, $('#hdFacilityId').val(), "", "#ddlMonth");
    //BindMonthsListCustomPreviousMonth('#ddlMonth', '');

    setTimeout(function () {
        //BindRCMGraphs();
        BindRCMGraphsUpdated();
        $('#ddlFacility option[value="0"]').text('---All---');
    }, 500);

    $('#btnReBindGraphs').on('click', function () {
        //BindRCMGraphs();
        BindRCMGraphsUpdated();
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

/*Created with new changes*/
function BindRCMGraphsUpdated() {
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
    $.post("/ExternalDashboard/RCMGraphsDataUpdated", jsonData, function (data) {
        if (data != null && data != "") {
            //--------------Section 1 Graphs Start here------------------------------------------/////
            if (data.idgReveune != null && data.idgReveune.length > 0) {
                BindMonthActualAndYtdGraph(data.idgReveune, 'myDashboardIPRevenue', "column", "Inpatient Days - Gross", 3, 'By Month');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitleTwoBar('myDashboardIPRevenue', "column", "Inpatient Days - Gross", 3, 'By Month');
            }
            if (data.idnRevenue != null && data.idnRevenue.length > 0) {
                BindMonthActualAndYtdGraph(data.idnRevenue, 'myDashboardRevenuePPD', "column", "Inpatient Days - Net", 3, 'By Month');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitleTwoBar('myDashboardRevenuePPD', "column", "Inpatient Days - Net", 3, 'By Month');
            }
            //--------------Section 1 Graphs end here------------------------------------------/////


            //--------------Section 2 Graphs Start here------------------------------------------/////
            if (data.outOnPassDays != null && data.outOnPassDays.length > 0) {
                BindMonthActualAndYtdGraph(data.outOnPassDays, 'myDashboardRevenueDaman', "column", "Out On Pass Days", 3, 'By Month');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitleTwoBar('myDashboardRevenueDaman', "column", "Out On Pass Days", 3, 'By Month');
            }
            if (data.dischargePatientDays != null && data.dischargePatientDays.length > 0) {
                BindMonthActualAndYtdGraph(data.dischargePatientDays, 'myDashboardRevenueRoyalFamily', "column", "Discharge Patient Days", 3, 'By Month');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitleTwoBar('myDashboardRevenueRoyalFamily', "column", "Discharge Patient Days", 3, 'By Month');
            }
            //--------------Section 2 Graphs End here------------------------------------------/////


            //--------------Section 3 and 4 Graphs Start here------------------------------------------/////
            if (data.pdServiceCodeRevenue != null && data.pdServiceCodeRevenue.length > 0) {
                BuildCustomGraphInRCMWithoutDecimals(data.pdServiceCodeRevenue, 'myDashboardRevenueInpatientOther', "column", "Patient Days by Service Code Current Month", 3, 'Current Month', 0);
                BuildCustomGraphInRCMWithoutDecimals(data.pdServiceCodeRevenue, 'myDashboardARDays', "column", "Patient Days by Service Code YTD", 3, 'Year To Date', 'Year To Date', 1);
            } else {
                EmptyGraphMonthly(data.pdServiceCodeRevenue, 'myDashboardRevenueInpatientOther', "column", "Patient Days by Service Code Current Month", 3, 'Current Month');
                EmptyGraphYearToDate(data.pdServiceCodeRevenue, 'myDashboardARDays', "column", "Patient Days by Service Code YTD", 3, 'Year To Date', 'Year To Date');
            }
            //--------------Section 3 and 4 Graphs End here------------------------------------------/////



            //--------------Section 5 Graphs Start here------------------------------------------/////
            if (data.averageLengthOfStay != null && data.averageLengthOfStay.length > 0) {
                //BuildCustomGraphInRCMWithDecimals(data.averageLengthOfStay, 'myDashboardDischargesPlanned', "column", "Average Length of Stay (ALOS)", 1, 'Current Month', 0);
                BuildCustomGraphInRCMWithDecimals(data.averageLengthOfStay, 'myDashboardDischargesUnplannedAndExp', "column", "Average Length of Stay (ALOS)", 1, 'Year To Date', 'Year To Date', 1);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardDischargesPlanned', "column", "Average Length of Stay (ALOS)", 1);
            }
            //--------------Section 5 Graphs End here------------------------------------------/////

            //--------------Section 6 Graphs Start here------------------------------------------/////
            if (data.totalOperatingBedsRevenue != null && data.totalOperatingBedsRevenue.length > 0) {
                GraphsBuilderWithoutPercentage(data.totalOperatingBedsRevenue, 'myDashboardAcuteOutsPatients', "line", "Total Operating Beds", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutsPatients', "line", "Total Operating Beds", 3);
            }

            if (data.netarbalanceRevenue != null && data.netarbalanceRevenue.length > 0) {
                GraphsBuilderWithoutPercentage(data.netarbalanceRevenue, 'myDashboardAcuteOutDays', "column", "Net A/R Balance (Abu Dhabi + Al Ain)", 3);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardAcuteOutDays', "column", "Net A/R Balance (Abu Dhabi + Al Ain)", 3);
            }
            //--------------Section 6 Graphs End here------------------------------------------/////


            //--------------Section 7 Graphs Start here------------------------------------------/////
            if (data.opRevenue != null && data.opRevenue.length > 0) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.opRevenue, 'myDashboardOPRevenue', "column", "Outpatient Revenue", 5, "By Month");
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardOPRevenue', "column", "Outpatient Revenue", 3, "By Month");
            }

            if (data.ipRevenue != null && data.ipRevenue.length > 0) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.ipRevenue, 'myDashboardPatientDays', "column", "Inpatient Revenue", 5, "By Month");
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardPatientDays', "column", "Inpatient Revenue", 3);
            }
            //--------------Section 7 Graphs End here------------------------------------------/////



            //--------------Section 8 Graphs Start here------------------------------------------/////
            if (data.payorMix != null) {
                //SubCategoryPieChartBuilderInRcm(data.payorMix, 'myDashboardServiceCodeDistribution', "column", "% Revenue not Billable", 1);
                GraphsBuilderWith100Target(data.payorMix, 'myDashboardServiceCodeDistribution', "column", "% Revenue not Billable", 3, "");
                $('#myDashboardServiceCodeDistribution').show();
                $('#myDashboardServiceCodeDistributionNoRecords').hide();
            }
            else {
                $('#myDashboardServiceCodeDistribution').hide();
                $('#myDashboardServiceCodeDistributionNoRecords').show();
            }

            if (data.percentagebilledReveune != null && data.percentagebilledReveune.length > 2) {
                BilliableLineGraphInRCM(data.percentagebilledReveune, 'myDashboardBilledRevenuebyMonthEnd', "line", "% Billed Revenue by Month End", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentage('myDashboardBilledRevenuebyMonthEnd', "line", "% Billed Revenue by Month End", 2);
            }
            //--------------Section 8 Graphs End here------------------------------------------/////

            //--------------Section 9 Graphs Start here------------------------------------------/////
            if (data.accountSubmittedClaims != null && data.accountSubmittedClaims.length > 2) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.accountSubmittedClaims, 'myDashboardAmountSubmittedClaims', "column", "Total Cash Collected (Abu Dhabi + Al Ain)", 5, 'By Month');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardAmountSubmittedClaims', "column", "Total Cash Collected (Abu Dhabi + Al Ain)", 4, 'By Month');
            }
            if (data.claimsResubmissionPercentage != null && data.claimsResubmissionPercentage.length > 0) {
                GraphsBuilderCustomSubTitleWithoutPercentage(data.claimsResubmissionPercentage, 'myDashboardNumberSubmittedClaims', "column", "Revenue Per Patient Day", 5, 'By Month', 'Claims Resubmission %');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('myDashboardNumberSubmittedClaims', "column", "Revenue Per Patient Day", 3, "By Month");
            }
            //--------------Section 9 Graphs End here------------------------------------------/////


            //--------------Section 10 Graphs Start here------------------------------------------/////

            /*
            WHO: Amit Jain
            What: Change the Revenue By Service Code to % Revenue by Category and vice-versa. 
            To do this, give the Chart binding of % Revenue by Service Code to Revenue by Category and vice-versa.
            When: 11 April, 2016
            WHY: As per the Change Request by Client i.e. TO switch the Indicators for each graph and the Titles.
            */
            //###############################--Changes As of 11-March, 2016 start here--##########################

            //if (data.revenueByCategory != null && data.revenueByCategory.length > 2) {
            //    BuildBarGraphsRevenueByCategory(data.revenueByCategory, 'divRevenueByCategory', "column", "Revenue by Category", 2, 'Year To Date');
            //} else {
            //    EmptyGraphsBuilderWithoutPercentageSubtitle('divRevenueByCategory', "column", "Revenue by Category", 2, 'Year To Date');
            //}

            //if (data.revenueByServiceCode != null && data.revenueByServiceCode.length > 2) {
            //    SubCategoryPieChartBuilderYearToDateInRcm(data.revenueByServiceCode, 'divRevenueByServiceCode', "column", "% Revenue by Service Code", 2);
            //} else {
            //    EmptyGraphsBuilderWithoutPercentageSubtitle('divRevenueByServiceCode', "column", "% Revenue by Service Code", 2, 'Year To Date');
            //}


            if (data.revenueByCategory != null && data.revenueByCategory.length > 2) {
                SubCategoryPieChartBuilderYearToDateInRcm(data.revenueByCategory, 'divRevenueByCategory', "column", "Revenue by Category", 2, 'Year To Date');
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('divRevenueByCategory', "column", "Revenue by Category", 2, 'Year To Date');
            }

            if (data.revenueByServiceCode != null && data.revenueByServiceCode.length > 2) {
                BuildBarGraphsPercentageRevenueByServiceCode(data.revenueByServiceCode, 'divRevenueByServiceCode', "column", "% Revenue by Service Code", 2, "Year To Date");
                //SubCategoryPieChartBuilderYearToDateInRcm(data.revenueByServiceCode, 'divRevenueByServiceCode', "column", "% Revenue by Service Code", 2);
            } else {
                EmptyGraphsBuilderWithoutPercentageSubtitle('divRevenueByServiceCode', "column", "Revenue by Service Code", 2, 'Year To Date');
            }

            //###############################--Changes As of 11-March, 2016 end here--##########################


            //--------------Section 10 Graphs End here------------------------------------------/////
        }
    });
}

function SubCategoryPieChartBuilderInRcm(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var currentYear = new Date().getFullYear();
    var month = $('#ddlMonth').val();
    var SWBChartDataMonthly = new Array();
    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        var name = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        switch (parseInt(month)) {
            case 1:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M1) });
                break;
            case 2:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M2) });
                break;
            case 3:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M3) });
                break;
            case 4:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M4) });
                break;
            case 5:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M5) });
                break;
            case 6:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M6) });
                break;
            case 7:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M7) });
                break;
            case 8:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M8) });
                break;
            case 9:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M9) });
                break;
            case 10:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M10) });
                break;
            case 11:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M11) });
                break;
            default:
                SWBChartDataMonthly.push({ 'name': name, 'y': parseFloat(dashboardData[i].M12) });
                break;
        }
    }
    ShowOnePieChartWithColorsWithPercentageButNoDecimalValue(containerid, SWBChartDataMonthly, chartName, 'By Month');
}

function SubCategoryPieChartBuilderYearToDateInRcm(dashboardData, containerid, charttype, chartName, chartFormattype) {
    var swbChartDataMonthly = new Array();
    if (dashboardData != null) {
        for (var i = 0; i < dashboardData.length; i++) {
            var value = parseFloat(dashboardData[i].CYTA);
            if (value > 0) {
                var name = dashboardData[i].DashBoard.replace('IP Revenue', '');
                swbChartDataMonthly.push({ 'name': name, 'y': value });
            }
        }
        ShowOnePieChartWithColorsWithPercentageOneDecimal(containerid, swbChartDataMonthly, chartName, 'Year To Date');
    }
}

function BuildBarGraphsPercentageRevenueByServiceCode(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle) {
    var dataArray = new Array();
    var categories = new Array();
    var budgets = new Array();
    var actuals = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        budgets.push(parseFloat(dashboardData[i].CYTB));
        actuals.push(parseFloat(dashboardData[i].CYTA));
        var name = dashboardData[i].DashBoard.replace('Service Code Distribution by Billed Claims', '');
        categories.push(name);
    }
    dataArray.push({ 'name': "Actual", 'data': actuals });
    dataArray.push({ 'name': "Target", 'data': budgets });

    BuildTwoBarsChartWithLabelsOnBarsInRCM(containerid, dataArray, charttype, chartName, subtitle, categories);
}


function BuildTwoBarsChartWithLabelsOnBarsInRCM(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Shows the two bars chart with labels on bars.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="twoDimDataArray">The two dim data array.</param>
    /// <param name="widgetType">Type of the widget.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <param name="widgetSubTitle">The widget sub title.</param>
    /// <param name="categoriesArray">The categories array.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: widgetType,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 10,
                viewDistance: 25,
                depth: 40
            },
            marginTop: 80,
            marginRight: 40
        },

        title: {
            text: widgetTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        subtitle: {
            text: widgetSubTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        xAxis: {
            categories: categoriesArray,
            floating: true,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            } //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            itemWidth: 250,
            padding: 3,
            itemMarginTop: 5,
            itemMarginBottom: 5,
            itemStyle: {
                lineHeight: '14px'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.1f} %'
        },
        exporting: {
            filename: widgetTitle,
            sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    rotation: 270,
                    //format: '{y}',
                    format: '{point.y:,.1f} %',
                    align: 'top',
                    enabled: true,
                    floating: true,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [
            {
                name: twoDimDataArray[1].name,
                data: twoDimDataArray[1].data, //[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
                color: '#48CCCD'
            }, {
                name: twoDimDataArray[0].name,
                data: twoDimDataArray[0].data, //[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
                color: '#7FE817'
            }
        ]
    });
}

function ShowOnePieChartWithColorsWithPercentageWithOneDecimalInRCM(container, data, widgetTitle, subtitleval) {
    /// <summary>
    /// Shows the one pie chart with colors.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="data">The data.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: widgetTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        subtitle: {
            text: subtitleval
        },
        tooltip: {
            pointFormat: '<b>{point.name}</b>: {point.y:.2f} %.'//'{series.name}: <b>{point.name:.1f}</b>'//'<b>{point.name}</b>: {point.percentage:.1f} %','<b>{point.name}</b>: {point.y:.1f} Rs.',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.2f}  %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        exporting: {
            filename: widgetTitle,
            sourceWidth: 1000,
            sourceHeight: 800
        },
        series: [{
            type: 'pie',
            name: 'Percentage',
            data: data,
        }]
    });
}


function BuildCustomGraphInRCMWithoutDecimals(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle, ytd) {
    var chartData = new Array();
    var categories = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        if (ytd == 0) {
            chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseFloat(dashboardData[i].CMA)] });
        } else {
            chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseFloat(dashboardData[i].CYTA)] });
        }
        categories.push(dashboardData[i].DashBoard);
    }
    BuildBarGraphsWithoutDecimalsInRCM(containerid, chartData, charttype, chartName, subtitle, categories);
}

function BuildCustomGraphInRCMWithDecimals(dashboardData, containerid, charttype, chartName, chartLegendPosition, subtitle, ytd) {
    var chartData = new Array();
    var categories = new Array();
    for (var i = 0; i < dashboardData.length; i++) {
        if (ytd == 0) {
            chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseFloat(dashboardData[i].CMA)] });
        } else {
            chartData.push({ 'name': dashboardData[i].DashBoard, 'data': [parseFloat(dashboardData[i].CYTA)] });
        }
        categories.push(dashboardData[i].DashBoard);
    }
    BuildBarGraphsWithDecimalsInRCM(containerid, chartData, charttype, chartName, subtitle, categories);
}


function BuildBarGraphsWithoutDecimalsInRCM(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {

    /// <summary>
    /// Shows the three bars chart with colors.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="threeDimDataArray">The three dim data array.</param>
    /// <param name="widgetType">Type of the widget.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <param name="widgetSubTitle">The widget sub title.</param>
    /// <param name="categoriesArray">The categories array.</param>
    /// <param name="yaxisTitle">The yaxis title.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: widgetType,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 10,
                viewDistance: 25,
                depth: 40
            },
            marginTop: 80,
            marginRight: 40
        },

        title: {
            text: widgetTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        subtitle: {
            text: widgetSubTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },
        exporting: {
            filename: widgetTitle,
            sourceWidth: 1000,
            sourceHeight: 800
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            itemWidth: 250,
            padding: 3,
            itemMarginTop: 5,
            itemMarginBottom: 5,
            itemStyle: {
                lineHeight: '14px'
            }
        },
        tooltip: {
            //headerFormat: '<b>{point.key}</b><br>',
            //pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.2f}'
            formatter: function () {
                var toolTip = '<span style="color:' + this.series.color + '">\u25CF</span> ' + this.series.name + ':' + this.point.y + '';
                return toolTip;
            }
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y}',
                    rotation: -90,
                    //color: '#00000',
                    align: 'top',
                    inside: false,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }
        },
        series: dataArray
    });
}



function BilliableLineGraphInRCM(dashboardData, containerid, charttype, chartName) {
    var month = $('#ddlMonth').val();
    var dataArray = new Array();
    var categories = new Array();
    var monthsArray = new Array();
    for (var i = 0; i < 3; i++) {
        monthsArray = new Array();
        switch (parseInt(month)) {
            case 1:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                categories = ['Jan'];
                break;
            case 2:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                categories = ['Jan', 'Feb'];
                break;
            case 3:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                categories = ['Jan', 'Feb', 'Mar'];
                break;
            case 4:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr'];
                break;
            case 5:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                break;
            case 6:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                break;
            case 7:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M7 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
                break;
            case 8:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M7 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M8 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                break;
            case 9:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M7 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M8 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M9 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                break;
            case 10:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M7 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M8 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M9 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M10 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                break;
            case 11:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M7 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M8 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M9 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M10 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M11 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

                break;
            default:
                monthsArray.push(parseFloat(dashboardData[i].M1 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M2 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M3 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M4 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M5 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M6 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M7 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M8 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M9 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M10 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M11 * 100));
                monthsArray.push(parseFloat(dashboardData[i].M12 * 100));
                categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }
        //var dashbaordName = i == 0 ? "Prior Year" : i == 1 ? "Actual" : "Target";
        //dataArray.push({ 'name': dashbaordName, 'data': monthsArray });

        var currentYear = new Date().getFullYear();
        var dashboardName = dashboardData[i].BudgetType == 2 && dashboardData[i].Year == currentYear - 1 ? "Prior Year" : (dashboardData[i].BudgetType == 2 ? "Actual" : "Target");
        dataArray.push({ 'name': dashboardName, 'data': monthsArray });
    }
    BuildBillableLineGraph(containerid, dataArray, charttype, chartName, "By Month", categories);
}


function BuildBillableLineGraph(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Shows the two bars chart with labels on bars.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="twoDimDataArray">The two dim data array.</param>
    /// <param name="widgetType">Type of the widget.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <param name="widgetSubTitle">The widget sub title.</param>
    /// <param name="categoriesArray">The categories array.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: widgetType,
            //options3d: {
            //    enabled: true,
            //    alpha: 10,
            //    beta: 10,
            //    viewDistance: 25,
            //    depth: 40
            //},
            //marginTop: 80,
            //marginRight: 40
        },

        title: {
            text: widgetTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        subtitle: {
            text: widgetSubTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        xAxis: {
            categories: categoriesArray,
            //floating: true,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            //floating: false,
            allowDecimals: false,
            min:60, max: 100,
            title: {
                text: ''
            }, plotLines: [{
                value: 0,
                width: 1
            }]
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            itemWidth: 250,
            padding: 3,
            itemMarginTop: 5,
            itemMarginBottom: 5,
            itemStyle: {
                lineHeight: '14px'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:,.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 25
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.1f} %',
                    //rotation: -90,
                    //color: '#00000',
                    align: 'top',
                    inside: false,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }
            //series: {
            //    dataLabels: {
            //        format: '{point.y:.1f} %',
            //        align: 'top',
            //        enabled: true,
            //        floating: true,
            //        crop: false,
            //        overflow: 'none',
            //        rotation: 360,
            //        x: -12,
            //        y: -3,
            //        style: {
            //            fontWeight: 'normal',
            //            y: -5
            //        }
            //    }
            //}
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#FFFF00'
        },
        {
            name: twoDimDataArray[2].name,
            data: twoDimDataArray[2].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,//[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

/////////-------------------------------------------------Below ones not in use---------------------------------------------------------------------

function BuildBarGraphInRCM(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Shows the two bars chart with labels on bars.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="twoDimDataArray">The two dim data array.</param>
    /// <param name="widgetType">Type of the widget.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <param name="widgetSubTitle">The widget sub title.</param>
    /// <param name="categoriesArray">The categories array.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: widgetType,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 10,
                viewDistance: 25,
                depth: 40
            },
            marginTop: 80,
            marginRight: 40
        },

        title: {
            text: widgetTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        subtitle: {
            text: widgetSubTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        xAxis: {
            categories: categoriesArray,
            floating: true,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            itemWidth: 250,
            padding: 3,
            itemMarginTop: 5,
            itemMarginBottom: 5,
            itemStyle: {
                lineHeight: '14px'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
        },
        exporting: {
            filename: widgetTitle,
            sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    rotation: 270,
                    format: '{y}',
                    align: 'top',
                    enabled: true,
                    floating: true,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [
            {
                data: dataArray
            }
        ]
    });
}


function BuildBarGraphsWithDecimalsInRCM(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {

    /// <summary>
    /// Shows the three bars chart with colors.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="threeDimDataArray">The three dim data array.</param>
    /// <param name="widgetType">Type of the widget.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <param name="widgetSubTitle">The widget sub title.</param>
    /// <param name="categoriesArray">The categories array.</param>
    /// <param name="yaxisTitle">The yaxis title.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: widgetType,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 10,
                viewDistance: 25,
                depth: 40
            },
            marginTop: 80,
            marginRight: 40
        },
        title: {
            text: widgetTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        subtitle: {
            text: widgetSubTitle,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal'
            }
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',
            itemWidth: 250,
            padding: 3,
            itemMarginTop: 5,
            itemMarginBottom: 5,
            itemStyle: {
                lineHeight: '14px'
            }
        },
        tooltip: {
            //headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:.2f} '
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}',
                    rotation: -90,
                    //color: '#00000',
                    align: 'top',
                    inside: false,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }
        },
        series: dataArray
    });
}