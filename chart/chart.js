var oChart; 


$(document).ready(function(){
	oChart= AmCharts.makeChart("chart",{
		"type": "serial",
		"categoryField": "date",
		"dataProvider": initializeChartData(),
		"columnSpacing": 4,
		"autoDisplay": true,
		"dataDateFormat": "HH:NN",
		"plotAreaFillAlphas": 0.23,
		"colors": [
			"#88E537",
			"#70A5BF"
		],
		"precision": 2,
		"categoryAxis": {
			"minPeriod": "mm",
			"parseDates": true,
			"boldLabels": true,
		},
		"graphs": [
			{
				"bullet": "round",
				"bulletSize": 10,
				"id": "usage-graph",
				"lineThickness": 2,
				"title": "Usage",
				"valueAxis": "usage-axis",
				"valueField": "usage",
				"yAxis": "usage-axis"
			},
			{
				"bullet": "round",
				"bulletSize": 10,
				"id": "awaiting-time-graph",
				"lineThickness": 2,
				"title": "Awaiting time",
				"valueAxis": "awaiting-time-axis",
				"valueField": "awaiting-time",
				"yAxis": "awaiting-time-axis"
			}
		],
		"valueAxes": [
			{
				"id": "usage-axis",
				"autoGridCount": false,
				"tickLength": 3,
				"title": "Usage",
				"titleFontSize": 13,
				"strictMinMax": true,
				"integersOnly": true,
				"unit":"%",
				"labelFrequency": 2,
				"gridCount": 10
			},
			{
				"id": "awaiting-time-axis",
				"position": "right",
				"title": "Awaiting time (ms)",
				"titleFontSize": 13
			}
			],
			"balloon": {
				"animationDuration": 0
			},
			"legend": {
				"enabled": true,
				"useGraphSettings": true,
				"switchable": false
			},
			"titles": [
			{
				"id": "hom15-performance",
				"size": 15,
				"text": "home15 performance"
			}
		]	
	})
})

function initializeChartData(){
	var chartData = [];

	
}