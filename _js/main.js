"use strict";
// PART 1: SET UP CHART OPTIONS & GENERATE USING INLINE DATA
// Options for Chart 1: top chart Hospital Errors

var options_errors = {
    chart: {
        renderTo: 'errors',
        type: 'column'
        },

    title: {
        text:'Impact of Training on Hospital Outcomes in Hospital Errors and Mortality'

    },

    subtitle: {
        text:'Source: Springfield Hospital (2012-2015)'

    },

    xAxis: {
            categories: [],
            // opposite:true
            // reversed: false,
            // gridLineWidth: 1,
    },

    yAxis: {
        title: {
            text: 'Number of Errors'
        }
    },

    tooltip: {
        valueSuffix: ' Errors'
    },

    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'mortality',
    //     borderWidth: 0
    // },
    legend: {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 200,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    plotOptions: {
        series: {
            colorByPoint: true
        }
    },
    series: [],
    credits: {
        enabled: false
    }
};

var options_mortality = {
    chart: {
        renderTo: 'mortality',
        type: 'column',
        height: 200,
        },

    title: {
        text:'Percentage Mortality'

    },

    xAxis: {
            categories: []
    },

    yAxis: {
        title: {
            text: 'Percentage Mortality'
        }
    },

    tooltip: {
        valueSuffix: '%'
    },

    legend: {
        enabled: false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 30,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    plotOptions: {
        series: {
            colorByPoint: true
        }
    },
    series: [],
    credits: {
        enabled: false
    }
};

var options_trained = {
    chart: {
        renderTo: 'trained',
        type: 'column',
        height: 200,
        },

    title: {
        text:'Average Number of Days Trained'

    },

    subtitle: {
        // text:'Source: WorldClimate.com'

    },

    xAxis: {
            categories: []
    },

    yAxis: {
        title: {
            text: 'Number of Days'
        }
    },

    tooltip: {
        valueSuffix: ' Days'
    },

    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            colorByPoint: true
        }
    },
    series: []
};

// GETTING DATA and Populating all charts


$.get("_data/HospitalErrors.csv", function (data) {
    var lines = data.split('\r')
    // var dataSeriesName = []
    var problemTypes = []
    var years = []
    var data = {}

    // Loop through lines and construct our data object
    $.each(lines, function (lineNo, line){
        var items = line.split(',')
        if (lineNo==0){
            // Is this line useful?
        } else {
            var problem = items[0];
            var year = items[2];
            if (problemTypes.indexOf(problem) < 0){
                problemTypes.push(problem);
            }
            // If year not already in array, add
            if (years.indexOf(year) < 0){
                years.push(year);
            }
        }
    });


    $.each(years, function(lineNo, year){
        data[year]={
            errors: [],
            mortality: [],
            trained: []
        };
    });
    // Look through each line and fill out data object
    $.each(lines, function ( lineNo, line ) {
         var items =line.split(',')

         if (lineNo == 0) {
        } else {
            var year = items[2];
            // console.log(year);
            data[year].errors.push(Number(items[1]));            
            data[year].mortality.push(Number(items[4]));
            // console.log(items[4]);
            data[year].trained.push(Number(items[3]));
        };
    });
    // Construct data series out of data object
    // Including reversing data to be in chronological order
    var xAxisCategories = problemTypes
    // name of each series is year

    var errorData = [];
    var mortalityData = [];
    var trainedData = [];
    var emphasisColors = ['lightgray', 'lightgray','skyblue','lightgray',
        'lightcoral', 'lightgray', 'skyblue','lightgray'];

    $.each(data, function ( key, obj ) {
        errorData.push({
            name: key,
            data: obj.errors,
            colors: emphasisColors
        });
        mortalityData.push({
            name: key,
            data: obj.mortality,
            colors: emphasisColors
        });
        trainedData.push({
            name: key,
            data: obj.trained,
            colors: emphasisColors
        })
    });

    options_errors.series = errorData;
    options_mortality.series = mortalityData;
    var shortTrained = trainedData[0];
    shortTrained.name='Training'
    options_trained.series = [shortTrained];

    options_errors.xAxis.categories = xAxisCategories;
    options_mortality.xAxis.categories = xAxisCategories;
    options_trained.xAxis.categories = xAxisCategories;

    // modify errors into percent errors


    var chartt = new Highcharts.Chart(options_errors);
    var chartm = new Highcharts.Chart(options_mortality);
    var chartb = new Highcharts.Chart(options_trained);
});


