function ShowOneBarChart(container, seriesName, data, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Shows the one bar chart.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="seriesName">Name of the series.</param>
    /// <param name="data">The data.</param>
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        legend: {
            align: 'left',
            verticalAlign: 'bottom',

            padding: 3,
            itemMarginTop: 5,
            itemMarginBottom: 5,
            itemStyle: {
                lineHeight: '14px'
            }
        },
        tooltip: {
            //headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        plotOptions: {
            column: {
                //stacking: 'normal',
                depth: 40
            },
            floating: true,
        },
        exporting: {
            filename: widgetTitle,
            sourceWidth: 1000,
            sourceHeight: 800,
        },
        series: [{
            name: seriesName,
            data: data,
            color: '#48CCCD'
        }]
    });
}

function ShowTwoBarsChart(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Shows the two bars chart.
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
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            },//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            floating: true,
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            floating: true,
            title: {
                text: null
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
            //headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.0f}'
        },
        exporting: {
            filename: widgetTitle,
            sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                //stacking: 'normal',
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    style: {
                        fontWeight: 'bold',
                        y: -5
                    },
                    format: '{y:,.0f}',
                    dataLabels: {
                        rotation: 270,
                        enabled: true,
                        format: '{point.y:,.0f}'
                    }
                }
            },
            floating: true
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function ShowTwoBarsChartWithLabelsOnBars(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    rotation: 270,
                    format: '{y:,.0f}',
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
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,//[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function ShowThreeBarsChart(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
    /// <summary>
    /// Shows the three bars chart.
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },

        plotOptions: {
            column: {
                //stacking: 'normal',
                depth: 40
            }
        },
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#F7FE2E'
        }]
    });
}

function ShowOnePieChart(container, data, widgetTitle) {
    /// <summary>
    /// Shows the one pie chart.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="data">The data.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <returns></returns>
    $("#" + container).highcharts({
        chart: {
            type: 'pie',
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
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }

        },
        //plotOptions: {
        //    pie: {
        //        allowPointSelect: true,
        //        cursor: 'pointer',
        //        dataLabels: {
        //            enabled: true,
        //            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        //            style: {
        //                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        //            }
        //        }
        //    }
        //},
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        series: [{
            type: 'pie',
            name: 'Percentage',
            data: data,
        }]
    });
}

function ShowFourBarsChartWithLabelsOnBars(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Shows the four bars chart with labels on bars.
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
            allowDecimals: false,
            floating: true,
            min: 0,
            title: {
                text: ''
            }
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
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
            ////headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.0f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    style: {
                        fontWeight: 'bold',
                        y: -5
                    },
                    format: '{y:,.0f}',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:,.0f}'
                    }
                }
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,
            color: '#48CCCD',
            allowDecimals: false
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,
            color: '#7FE817',
            allowDecimals: false
        },
        {
            name: twoDimDataArray[2].name,
            data: twoDimDataArray[2].data,
            color: '#FFFF00',
            allowDecimals: false
        },
        {
            name: twoDimDataArray[3].name,
            data: twoDimDataArray[3].data,
            color: '#FF0000',
            allowDecimals: false
        }]
    });
}

function ShowSolidGaugeChart(container, data, widgetTitle) {
    /// <summary>
    /// Shows the solid gauge chart.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="data">The data.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <returns></returns>
    $('#' + container).highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Speedometer'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [
                {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background

                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }
            ]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [
                {
                    from: 0,
                    to: 120,
                    color: '#55BF3B' // green
                }, {
                    from: 120,
                    to: 160,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 160,
                    to: 200,
                    color: '#DF5353' // red
                }
            ]
        },

        series: [
            {
                name: 'Claims Acceptance Percentage',
                data: [80],
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }
        ]

    });
}

function TestChart(container) {
    /// <summary>
    /// Tests the chart.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <returns></returns>
    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    //$('#container-speed').highcharts(Highcharts.merge(gaugeOptions, {
    //    yAxis: {
    //        min: 0,
    //        max: 200,
    //        title: {
    //            text: 'Speed'
    //        }
    //    },

    //    credits: {
    //        enabled: false
    //    },

    //    series: [{
    //        name: 'Speed',
    //        data: [80],
    //        dataLabels: {
    //            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
    //                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
    //                   '<span style="font-size:12px;color:silver">km/h</span></div>'
    //        },
    //        tooltip: {
    //            valueSuffix: ' km/h'
    //        }
    //    }]

    //}));

    // The RPM gauge
    $('#' + container).highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 5,
            title: {
                text: 'RPM'
            }
        },

        series: [{
            name: 'RPM',
            data: [1],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                       '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
            },
            tooltip: {
                valueSuffix: ' revolutions/min'
            }
        }]

    }));

    // Bring life to the dials
    setInterval(function () {
        // RPM
        var chart = $('#' + container).highcharts();
        if (chart) {
            var point = chart.series[0].points[0];
            var inc = Math.random() - 0.5;
            var newVal = point.y + inc;

            if (newVal < 0 || newVal > 5) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }
    }, 2000);
}

function SolidLineGraph(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
    /// <summary>
    /// Solids the line graph.
    /// </summary>
    /// <param name="container">The container.</param>
    /// <param name="twoDimDataArray">The two dim data array.</param>
    /// <param name="widgetType">Type of the widget.</param>
    /// <param name="widgetTitle">The widget title.</param>
    /// <param name="widgetSubTitle">The widget sub title.</param>
    /// <param name="categoriesArray">The categories array.</param>
    /// <returns></returns>
    $(container).highcharts({
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
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        xAxis: {
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: true,
            min: 0,
            title: {
                text: ''
            }
        },
        //legend: {
        //    align: 'right',
        //    verticalAlign: 'top',
        //    layout: 'vertical',
        //    x: 0,
        //    y: 100
        //},
        tooltip: {
            //headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },

        plotOptions: {
            column: {
                //stacking: 'normal',
                depth: 40
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,
            color: '#48CCCD'
        }]
    });
}

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    },
});

Highcharts.getOptions().plotOptions.pie.colors = (function () {
    var colors = ['#FF9655', '#64E572', '#6AF9C4', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#FFF263'];
    return colors;
}());

function ShowOnePieChartWithColors(container, data, widgetTitle) {
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
        tooltip: {
            pointFormat: '<b>{point.name}</b>: {point.y:.1f}.'//'{series.name}: <b>{point.name:.1f}</b>'//'<b>{point.name}</b>: {point.percentage:.1f} %','<b>{point.name}</b>: {point.y:.1f} Rs.',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.1f}',
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

function ShowThreeBarsChartWithColors(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },

        plotOptions: {
            column: {
                //stacking: 'normal',
                depth: 40
            }
        },
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#FF0000'
        }]
    });
}

function BuildOneSeriesGraphWithLegendsTooltip(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    overflow: 'none',
                    rotation: 360,
                    x: -12,
                    y: -3,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        }]
    });
}

function BuildTwoSeriseGraphWithLegendsTooltip(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    overflow: 'none',
                    rotation: 360,
                    x: -12,
                    y: -3,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,//[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseGraphWithLegendsTooltip(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    format: '{point.y}',
                    overflow: 'none',
                    rotation: 360,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseGraphWithLegendsTooltipPercentage(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            //min: 0,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    format: '{point.y:.1f} %',
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
function BuildThreeSeriseGraphWithLegendsTooltipPercentageSWBExecDashBoard(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
                //viewDistance: 25,
                depth: 40
            },
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
            floating: true,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            //floating: true,
            allowDecimals: false,
            floor: 0,
            ceiling: 100,
            //min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    format: '{point.y:.1f} %',
                    rotation: -90,
                    color: '#00000',
                    align: 'top',
                    inside: true,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    },
                },
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
function BuildTwoSeriseGraphWithLegendsTooltipPercentage(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            //min: 0,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    format: '{point.y:.1f} %',
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    overflow: 'none',
                    rotation: 360,
                    x: -12,
                    y: -3,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,//[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function ShowOnePieChartWithColorsWithPercentage(container, data, widgetTitle, subtitleval) {
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

function BuildThreeSeriseGraphWithLegendsTooltipForLines(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        plotOptions: {
            column: {
                depth: 40
            },
            //series: {
            //    dataLabels: {
            //        align: 'top',
            //        enabled: true,
            //        floating: true,
            //        crop: false,
            //        overflow: 'none',
            //        rotation: 360,
            //        style: {
            //            fontWeight: 'normal',
            //            y: -5
            //        }
            //    }
            //}
        },
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
            dataLabels: {
                enabled: true,
                rotation: -45,
                color: '#00000',
                align: 'right',
                y: 10, // 10 pixels down from the top
                x: 10,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#7FE817',
            dataLabels: {
                enabled: true,
                rotation: -45,
                color: '#00000',
                align: 'right',
                y: -15, // 10 pixels down from the top
                x: -15,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#48CCCD',
            dataLabels: {
                enabled: true,
                rotation: -45,
                color: '#00000',
                align: 'right',
                y: 25, // 10 pixels down from the top
                x: 25,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function BuildThreeSeriseGraphWithLegendsTooltipCustom(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            //min: 0,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    rotation: -90,
                    color: '#00000',
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

function BuildThreeSeriseGraphWithLevel(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    //overflow: 'none',
                    rotation: 360,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriesBarGraphWithLegendsTooltipPercentage(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            floor: 0,
            ceiling: 100,
            //min: 0,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 25
            },
            pointPadding: 0.1,
            groupPadding: 0,
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f} %',
                    rotation: 0,
                    color: '#00000',
                    align: 'top',
                    inside: false,
                    floating: true,
                    crop: false,
                    overflow: 'none',
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }
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

function BuildThreeSeriseBarGraphWithLegendsTooltip(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:.1f} '
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    /*enabled: true,
                    format: '{point.y:.1f}',
                    rotation: -90,
                    color: '#00000',
                    align: 'top',
                    inside: false,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }*/
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    format: '{point.y:.1f}',
                    overflow: 'none',
                    rotation: 360,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function ShowMultipleBarsGraph(container, data, widgetTitle, subtitleval) {
    $("#" + container).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: widgetTitle
        },
        subtitle: {
            text: subtitleval
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: widgetTitle
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.name}</b>: {point.y:.2f} %.'
        },
        plotOptions: {
            column: {
                depth: 25
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f} %',
                    rotation: 0,
                    color: '#00000',
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
            name: 'Incidents',
            data: data
        }]
    });
}

function BuildThreeSeriesBarGraphWithLegendsTooltipPercentageCustom(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            //min: 0,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 25
            },
            pointPadding: 0.1,
            groupPadding: 0,
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f} %',
                    rotation: 0,
                    color: '#00000',
                    align: 'top',
                    inside: false,
                    floating: true,
                    crop: false,
                    overflow: 'none',
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }
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
            color: '#7FE817',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#00000',
                align: 'right',
                y: 10, // 10 pixels down from the top
                x: 10,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function BuildThreeSeriseBarGraphWithOutDecimals(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.0f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}',
                    rotation: -45,
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseGraphCustomTargetColor(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%',
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseGraphCustomTargetColorLabel(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%',
                    rotation: 0,
                    color: '#00000',
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#00000',
                align: 'right',
                y: 0, // 10 pixels down from the top
                x: 0,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#FF0000',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#00000',
                align: 'top',
                y: 0, // 10 pixels down from the top
                x: 0,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#00000',
                align: 'left',
                y: -5,
                x: -5,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function BuildTwoBarsChartWithLabelsOnBars(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.1f}'
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
                    format: '{y:,.1f}',
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

function BuildFourSeriseBarGraphWithOutDecimals(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            } //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.1f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.1f}',
                    rotation: -90,
                    color: '#00000',
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#0000FF',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#FF0000',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#7FE817'
        },
        {
            name: threeDimDataArray[3].name,
            data: threeDimDataArray[3].data,
            color: '#FF6600'
        }]
    });
}

function BuildNineSeriseBarGraphWithOutDecimals(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            } //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.1f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.1f}',
                    rotation: -90,
                    color: '#00000',
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
        series: [
            {
                name: threeDimDataArray[0].name,
                data: threeDimDataArray[0].data,
            },
            {
                name: threeDimDataArray[1].name,
                data: threeDimDataArray[1].data,
            },
            {
                name: threeDimDataArray[2].name,
                data: threeDimDataArray[2].data,
            },
            {
                name: threeDimDataArray[3].name,
                data: threeDimDataArray[3].data,
            }, {
                name: threeDimDataArray[4].name,
                data: threeDimDataArray[4].data,
            },
            {
                name: threeDimDataArray[5].name,
                data: threeDimDataArray[5].data,
            },
            {
                name: threeDimDataArray[6].name,
                data: threeDimDataArray[6].data,
            },
            {
                name: threeDimDataArray[7].name,
                data: threeDimDataArray[7].data,
            }, {
                name: threeDimDataArray[8].name,
                data: threeDimDataArray[8].data,
            }
        ]
    });
}
function BuildTenSeriseBarGraphWithOutDecimals(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            } //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.1f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.1f}',
                    rotation: -90,
                    color: '#00000',
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
        series: [
            {
                name: threeDimDataArray[0].name,
                data: threeDimDataArray[0].data,
            },
            {
                name: threeDimDataArray[1].name,
                data: threeDimDataArray[1].data,
            },
            {
                name: threeDimDataArray[2].name,
                data: threeDimDataArray[2].data,
            },
            {
                name: threeDimDataArray[3].name,
                data: threeDimDataArray[3].data,
            }, {
                name: threeDimDataArray[4].name,
                data: threeDimDataArray[4].data,
            },
            {
                name: threeDimDataArray[5].name,
                data: threeDimDataArray[5].data,
            },
            {
                name: threeDimDataArray[6].name,
                data: threeDimDataArray[6].data,
            },
            {
                name: threeDimDataArray[7].name,
                data: threeDimDataArray[7].data,
            }, {
                name: threeDimDataArray[8].name,
                data: threeDimDataArray[8].data,
            }, {
                name: threeDimDataArray[9].name,
                data: threeDimDataArray[9].data,
            }
        ]
    });
}
function BuildFiveSeriseBarGraphWithOutDecimals(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            } //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.1f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.1f}',
                    rotation: -90,
                    color: '#00000',
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#0000FF',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#FF0000',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#7FE817'
        },
        {
            name: threeDimDataArray[3].name,
            data: threeDimDataArray[3].data,
            color: '#FF6600'
        },
        {
            name: threeDimDataArray[4].name,
            data: threeDimDataArray[4].data,
            color: '#333333'
        }]
    });
}
function BuildThreeSeriseGraphWithOutDecimalLabel(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            floating: true,
            allowDecimals: false,
            //min: 0,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    /*enabled: true,
                    format: '{point.y} %',
                    rotation: -90,
                    color: '#00000',
                    align: 'top',
                    inside: false,
                    style: {
                        fontSize: '9px',
                        fontWeight: 'normal',
                        fontFamily: 'Verdana, sans-serif'
                    }*/
                    align: 'top',
                    enabled: true,
                    floating: true,
                    crop: false,
                    format: '{point.y}%',
                    overflow: 'none',
                    rotation: 360,
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
function BuildTwoSerisePercentageGraphWithLegendsTooltip(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.percentage:.1f}%</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    format: '{point.y:.1f} %',
                    crop: false,
                    overflow: 'none',
                    rotation: 360,
                    x: -12,
                    y: -3,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,//[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}
function BuildTwoSeriseGraphWithLegendsTooltip_Custom(container, twoDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {
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
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b> '//'{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {
            filename: widgetTitle, sourceWidth: 1000,
            sourceHeight: 800,
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    align: 'top',
                    enabled: true,
                    floating: true,
                    format: '{point.y}',
                    crop: false,
                    overflow: 'none',
                    rotation: 360,
                    x: -12,
                    y: -3,
                    style: {
                        fontWeight: 'normal',
                        y: -5
                    }
                }
            }
        },
        series: [{
            name: twoDimDataArray[0].name,
            data: twoDimDataArray[0].data,//[34.7, 34.8, 34.6,36.4,40.0],//twoDimDataArray[0].data,
            color: '#48CCCD'
        },
        {
            name: twoDimDataArray[1].name,
            data: twoDimDataArray[1].data,//[10.7, 10.8, 10.6, 10.4, 10.0],//twoDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function ShowOnePieChartWithColorsWithOutPercentage(container, data, widgetTitle, subtitleval) {
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
            pointFormat: '<b>{point.name}</b>: {point.y}.'//'{series.name}: <b>{point.name:.1f}</b>'//'<b>{point.name}</b>: {point.percentage:.1f} %','<b>{point.name}</b>: {point.y:.1f} Rs.',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
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




function BuildAnySeriseBarGraphWithOutDecimals(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, nameArray, colorArray) {

    Highcharts.setOptions({
        colors: colorArray
    });
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
            categories: categoriesArray,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
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
                    color: '#00000',
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
        series: [{
            name: nameArray,
            data: dataArray
        }
        ]
    });
}

function BuildEightSeriseBarGraphWithOutDecimals(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {

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
            /*categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            },*/ //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            labels: {
                enabled: false
            },
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
            formatter: function () {
                var toolTip = '<span style="color:' + this.series.color + '">\u25CF</span> ' + this.series.name + ':' + this.point.y + '';
                return toolTip;
            }
            //headerFormat: '<b>{point.key}</b><br>',
            //pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
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
                    color: '#00000',
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
        series: [{
            name: dataArray[0].name,
            data: dataArray[0].data,
        },
        {
            name: dataArray[1].name,
            data: dataArray[1].data,
        },
        {
            name: dataArray[2].name,
            data: dataArray[2].data,
        },
        {
            name: dataArray[3].name,
            data: dataArray[3].data,
        },
        {
            name: dataArray[4].name,
            data: dataArray[4].data,
        },
        {
            name: dataArray[5].name,
            data: dataArray[5].data,
        },
        {
            name: dataArray[6].name,
            data: dataArray[6].data,
        },
        {
            name: dataArray[7].name,
            data: dataArray[7].data,
        }
        ]
    });
}

function BuildEightSeriseBarGraphWithDecimals(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {

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
            /*categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }*/ //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            labels: {
                enabled: false
            },
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
            formatter: function () {
                var toolTip = '<span style="color:' + this.series.color + '">\u25CF</span> ' + this.series.name + ':' + this.point.y + '';
                return toolTip;
            }
            //headerFormat: '<b>{point.key}</b><br>',
            //pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
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
                    color: '#00000',
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
        series: [{
            name: dataArray[0].name,
            data: dataArray[0].data,
        },
        {
            name: dataArray[1].name,
            data: dataArray[1].data,
        },
        {
            name: dataArray[2].name,
            data: dataArray[2].data,
        },
        {
            name: dataArray[3].name,
            data: dataArray[3].data,
        },
        {
            name: dataArray[4].name,
            data: dataArray[4].data,
        },
        {
            name: dataArray[5].name,
            data: dataArray[5].data,
        },
        {
            name: dataArray[6].name,
            data: dataArray[6].data,
        },
        {
            name: dataArray[7].name,
            data: dataArray[7].data,
        }
        ]
    });
}

function BuildFourSeriseBarGraphWithOutDecimals(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {

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
            categories: categoriesArray,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
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
                    color: '#00000',
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
        series: [{
            name: dataArray[0].name,
            data: dataArray[0].data,
        },
        {
            name: dataArray[1].name,
            data: dataArray[1].data,
        },
        {
            name: dataArray[2].name,
            data: dataArray[2].data,
        },
        {
            name: dataArray[3].name,
            data: dataArray[3].data,
        }
        ]
    });
}

function BuildFourSeriseBarGraphWithDecimals(container, dataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray) {

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
            categories: categoriesArray,
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.2f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.2f}',
                    rotation: -90,
                    color: '#00000',
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
        series: [{
            name: dataArray[0].name,
            data: dataArray[0].data,
        },
        {
            name: dataArray[1].name,
            data: dataArray[1].data,
        },
        {
            name: dataArray[2].name,
            data: dataArray[2].data,
        },
        {
            name: dataArray[3].name,
            data: dataArray[3].data,
        }
        ]
    });
}


function ShowOnePieChartWithColorsWithPercentageButNoDecimalValue(container, data, widgetTitle, subtitleval) {
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
            pointFormat: '<b>{point.name}</b>: {point.y:.0f} %.'//'{series.name}: <b>{point.name:.1f}</b>'//'<b>{point.name}</b>: {point.percentage:.1f} %','<b>{point.name}</b>: {point.y:.1f} Rs.',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.0f}  %',
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


function ShowOnePieChartWithColorsWithPercentageOneDecimal(container, data, widgetTitle, subtitleval) {
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
            pointFormat: '<b>{point.name}</b>: {point.y:.1f} %.'//'{series.name}: <b>{point.name:.1f}</b>'//'<b>{point.name}</b>: {point.percentage:.1f} %','<b>{point.name}</b>: {point.y:.1f} Rs.',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.1f}  %',
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

function BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseBarGraphWithOutDecimals90Degree(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.0f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}',
                    rotation: -90,
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseBarGraphWithLegendsTooltipTwoDecimal45degrees(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
                    rotation: -45,
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}

function BuildThreeSeriseBarGraphWithOutDecimals45Degree(container, threeDimDataArray, widgetType, widgetTitle, widgetSubTitle, categoriesArray, yaxisTitle) {
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
            categories: categoriesArray,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }//['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxisTitle
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
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y:,.0f}'
        },
        plotOptions: {
            column: {
                depth: 40
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}',
                    rotation: -45,
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
        series: [{
            name: threeDimDataArray[0].name,
            data: threeDimDataArray[0].data,
            color: '#FFFF00',
        },
        {
            name: threeDimDataArray[2].name,
            data: threeDimDataArray[2].data,
            color: '#48CCCD',
        },
        {
            name: threeDimDataArray[1].name,
            data: threeDimDataArray[1].data,
            color: '#7FE817'
        }]
    });
}