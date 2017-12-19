var day = 0;
var firstDate = new Date();
//firstDate.setDate( firstDate.getDate() - 500 );
var chart;


function generateChartData() {
    debugger;
    var chartData = [];
    for ( day = 0; day < 10; day++ ) {
        var newDate = new Date( firstDate );
        newDate.setDate( newDate.getDate() + day );

        var visits = Math.round( Math.random() * 40 ) - 20;

        chartData.push( {
            "date": newDate,
            "visits": visits
        } );
    }
    return chartData;
}


function pushData(){
    chart.dataProvider.shift();
    day++;
    var newDate = new Date( firstDate );
    newDate.setDate( newDate.getDate() + day );
    var visits = Math.round( Math.random() * 40 ) - 20;
    chart.dataProvider.push( {
    date: newDate,
    visits: visits
    } );
    chart.validateData();
}

setInterval( function() {pushData();}, 1000);
  
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
          "minPeriod": "DD",
          "dashLength": 1,
          "gridAlpha": 0.15,
          "axisColor": "#DADADA"
        },
        "graphs": [ {
          "id": "g1",
          "valueField": "visits",
          "bullet": "round",
          "bulletBorderColor": "#FFFFFF",
          "bulletBorderThickness": 2,
          "lineThickness": 2,
          "lineColor": "#b5030d",
          "negativeLineColor": "#0352b5",
          "hideBulletsCount": 50
        } ],
        "chartCursor": {
          "cursorPosition": "mouse"
        },
        "chartScrollbar": {
          "graph": "g1",
          "scrollbarHeight": 40,
          "color": "#FFFFFF",
          "autoGridCount": true
        }
    })
});