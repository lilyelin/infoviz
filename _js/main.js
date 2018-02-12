"use strict";
// PART 1: SET UP CHART OPTIONS & GENERATE USING INLINE DATA
// Options for Chart 1: top chart Hospital Errors

var options_top = {
    chart: {
        renderTo: 'top',
        type: 'bar'
        },

    title: {
        text:'Monthly Average Temperature in Four Cities'

    },

    subtitle: {
        text:'Source: WorldClimate.com'

    },

    xAxis: {
            categories: []
    },

    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },

    tooltip: {
        valueSuffix: '°C'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: []
};

var options_middle = {
    chart: {
        renderTo: 'middle',
        type: 'bar'
        },

    title: {
        text:'Monthly Average Temperature in Four Cities'

    },

    subtitle: {
        text:'Source: WorldClimate.com'

    },

    xAxis: {
            categories: []
    },

    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },

    tooltip: {
        valueSuffix: '°C'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: []
};

var options_bottom = {
    chart: {
        renderTo: 'bottom',
        type: 'bar'
        },

    title: {
        text:'Monthly Average Temperature in Four Cities'

    },

    subtitle: {
        text:'Source: WorldClimate.com'

    },

    xAxis: {
            categories: []
    },

    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },

    tooltip: {
        valueSuffix: '°C'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: []
};
// GETTING DATA and Populating all charts


$.get("_data/data.csv", function (data) {
    // ***Add code here*** to create a variable "lines" that splits the csv by line using ("\n")
    // Need a hint? The JavaScript string split method is the same as in python

    var lines =data.split('\n')

    //loop through each line of the csv file using $.each
    //Remember: the first argument to the each function is the index iterator
    $.each(lines, function ( lineNo, line ) {

        // ***Add code here*** to set var items equal to an array of the current line's values
        // Make sure to turn each line into an array by splitting on ","

        var items =line.split(',')

        // For first line of data (header) populate xAxis categories with months
        if (lineNo == 0) {
            // Loop through each item in the array items
            $.each(items, function (itemNo, item) {
                // Skip the first item in line 0 because it is the City label
                // For the rest of the first row of data add to the categories variable for the xAxis using push method within the if statement
                if (itemNo != 0) {
                    options.xAxis.categories.push(item)
                }
            })

        } else {
            var seriesData = {
                name: "",
                data: []
            };

            // Grab the seriesData obect and populate with data from items
            // ***Add code here*** to set seriesData.name to the first value in items

            seriesData.name = items[0]

            // Loop through each item in the array items for current line and add to data array
            $.each(items, function (itemNo, item) {
                // Skip the first value in items since you already set it as name
                if (itemNo != 0) {
                    // ***Add code here*** to push values to seriesData.data
                    // Note: you will need to use Number() to change the values from the csv file from strings to floats
                    seriesData.data.push(Number(item))
                };
            })
            // Now you have your var seriesData populated with the cities in name and the temperatures in data
            // ***Add code here*** to push seriesData to series in chart options

            options_top.series.push(seriesData)
            options_middle.series.push(seriesData)
            options_bottom.series.push(seriesData)

        };
    });
    // ***Add code here***
    // Now you can draw the chart by creating a new Highcharts object with the settings defined in options
    // var chart1 = $('#top').highcharts(options_top);
    // var chart2 = $('#middle').highcharts(options_middle);
    // var chart2 = $('#bottom').highcharts(options_bottom);
    var chart1 = new Highcharts.Chart(options_top);
    var chart2 = new Highcharts.Chart(options_middle);
    var chart3 = new Highcharts.Chart(options_bottom);
});


