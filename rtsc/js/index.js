var day = 0;
//var firstDate = new Date();
//firstDate.setDate( firstDate.getDate() - 500 );
var chart;


function generateChartData() {
    var chartData = [];
    var newDate;
    for ( day = 0; day < 10; day++ ) {
        newDate = new Date();
        newDate.setDate( newDate.getDate() + day );

        var usage = Math.round( Math.random() * 40 );

        chartData.push( {
            "date": newDate,
            "usage": usage
        } );
    }
    return chartData;
}

function pushData(){
    chart.dataProvider.shift();
    day++;
    var newDate = new Date();

    newDate.setDate( newDate.getDate() + day );
    var usage = Math.round( Math.random() * 40 );
    chart.dataProvider.push({
        date: newDate,
        usage: usage
    });
    chart.validateData();
}

setInterval( function() {pushData();}, 2200);
  
$(document).ready(function() {
        chart = AmCharts.makeChart( "chartdiv", {
        "type": "serial",
        "theme": "light",
        "zoomOutButton": {
          "backgroundColor": '#000000',
          "backgroundAlpha": 0.15
        },
        //"dataProvider": generateChartData(),
        "dataProvider" : generateChartData(),
        "categoryField": "date",
        "categoryAxis": {
          "parseDates": true,
          "minPeriod": "mm",
          "dashLength": 1,
          "gridAlpha": 0.15,
          "axisColor": "#DADADA"
        },
        "graphs": 
        [ 
            {
              "id": "usage-graph",
              "valueField": "usage",
              "bullet": "round",
              "bulletBorderColor": "#FFFFFF",
              "bulletBorderThickness": 2,
              "lineThickness": 2,
              "lineColor": "#b5030d",
              "negativeLineColor": "#0352b5",
              "hideBulletsCount": 50
            }
        ],
        "chartCursor": {
          "cursorPosition": "mouse"
        },
        "chartScrollbar": {
          "graph": "usage-graph",
          "scrollbarHeight": 40,
          "color": "#FFFFFF",
          "autoGridCount": true
        }
    })
});