try{
    var oCaeAdm1FreeNodesGm;
    var oCaeNas1Home15UsageGm;
    var oCaeNas1Home15AwaitingTimeGm;

    var oCaeNas1Home15PerformanceChart;

    var _green = "#a9d70b";
    var _yellow ="#f9c802";
    var _red = "#ff0000";

    var dfltOpts ={
        min: 0,
        pointer: true,
        pointerOptions: {
            value: 0,
            toplength: -15,
            bottomlength: 10,
            bottomwidth: 12,
            color: '#8e8e93',
            stroke: '#ffffff',
            stroke_width: 3,
            stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.8,
        counter: false
    }

    $(document).ready(function(){
        try{
            oCaeAdm1FreeNodesGm = new JustGage({
                id: 'cae-adm1-check-free-nodes',
                name :'oCaeAdm1freeNodesGm',
                title: 'free nodes',
                max: 90,
                decimals: 0,
                customSectors: [{
                    color : _red,
                    lo : 0,
                    hi : 5
                },{
                    color : _yellow,
                    lo : 6,
                    hi : 10
                },{
                    color : _green,
                    lo : 11,
                    hi : 200
                }],
                defaults: dfltOpts
            });

            oCaeNas1Home15UsageGm = new JustGage({
                id: 'cae-nas1-check-home15-usage',
                title: 'home15 usage',
                max: 100,
                symbol: '%',
                decimals: 2,
                customSectors: [{
                    color : _green,
                    lo : 0.00,
                    hi : 98.99
                  },{
                    color : _yellow,
                    lo : 99.00,
                    hi : 99.99
                  },{
                    color : _red,
                    lo : 100.00,
                    hi : 100.00
                  }],
                  defaults: dfltOpts
            });

            oCaeNas1Home15AwaitingTimeGm = new JustGage({
                id: 'cae-nas1-check-home15-awaiting-time',
                title: 'home15 awaiting time',
                max: 10,
                symbol: ' ms',
                decimals: 2,
                customSectors: [{
                    color : _green,
                    lo : 0.00,
                    hi : 5.99
                  },{
                    color : _red,
                    lo : 5.99,
                    hi : 10.00
                  }], 
                  defaults: dfltOpts
              });

            AmCharts.makeChart("cae-nas1-home15-performance",{
                "type": "serial",
                "categoryField": "date",
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
                        "valueField": "column-1",
                        "yAxis": "usage-axis"
                    },
                    {
                        "bullet": "round",
                        "bulletSize": 10,
                        "id": "awaiting-time-graph",
                        "lineThickness": 2,
                        "title": "Awaiting time",
                        "valueAxis": "awaiting-time-axis",
                        "valueField": "column-2",
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
                ],
                "dataProvider": [
                    {
                        "column-1": "2.79",
                        "column-2": "93.50",
                        "date": "14:58"
                    },
                    {
                        "column-1": "20.73",
                        "column-2": "99.70",
                        "date": "14:59"
                    },
                    {
                        "column-1": "2.93",
                        "column-2": "98.60",
                        "date": "15:00"
                    },
                    {
                        "column-1": "5.98",
                        "column-2": "99.30",
                        "date": "15:01"
                    },
                    {
                        "column-1": "2.63",
                        "column-2": "99.50",
                        "date": "15:02"
                    },
                    {
                        "column-1": "3.53",
                        "column-2": "99.90",
                        "date": "15:03"
                    },
                    {
                        "column-1": "2.42",
                        "column-2": "100.00",
                        "date": "15:04"
                    },
                    {
                        "column-1": "5.82",
                        "column-2": "99.50",
                        "date": "15:05"
                    },
                    {
                        "column-1": "14.39",
                        "column-2": "100.00",
                        "date": "15:06"
                    },
                    {
                        "column-1": "3.88",
                        "column-2": "100.00",
                        "date": "15:07"
                    }
                ]
            });

            updateGm();

            $("a[title='JavaScript charts']").hide();
        }
        catch(ex){console.log(ex.message);}
    });

    function setValue(_Gm, _logData){
        try
        {
            if (_logData.match(/Error|Unknown|not defined/i)===null)
            {
                switch(_Gm)
                {
                    case "oCaeAdm1FreeNodesGm":
                        _logData = _logData.match(/[0-9]+/g);
                    
                        iFreeNodes = _logData[0];
                        iTotalNodes = _logData[1];
                        
                            window[_Gm].refresh(iFreeNodes, iTotalNodes);
                        break;

                        case "oCaeNas1Home15UsageGm":
                                _logData =_logData.match(/[0-9]+\.[0-9]{2}/g);
                                window[_Gm].refresh(parseFloat(_logData[1]));
                        break;

                        case "oCaeNas1Home15AwaitingTimeGm":
                                _logData =_logData.match(/[0-9]+\.[0-9]{2}/g);
                                if(parseFloat(_logData)>10){
                                    window[_Gm].refresh(parseFloat(_logData[0]), Math.floor(parseFloat(_logData)+1));
                                }
                                else{
                                    window[_Gm].refresh(parseFloat(_logData[0]), 10);
                                }
                        break;
                    }
                }
                else{
                    window[_Gm].refresh("NaN");
                }
            }
        catch(ex){console.log(ex.message);}
    }

    function loadData(_Gm, _logName){
        try{
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var _logData = this.responseText;
                    setValue(_Gm, _logData);
                }
            }
            xhttp.open("GET", "logs/"+ _logName, true);
            xhttp.send();
        }
        catch(ex){console.log(ex.message);}
    }

    function updateGm(){
        try{
            loadData("oCaeAdm1FreeNodesGm", "cae_adm1_check_free_nodes.htm");
            loadData("oCaeNas1Home15UsageGm", "cae_nas1_check_home15.htm");
            loadData("oCaeNas1Home15AwaitingTimeGm", "cae_nas1_check_home15.htm");
        }
        catch(ex){console.log(ex.message);}
    }

    setInterval(function(){updateGm();}, 3000);
}


catch(ex){console.log(ex.message);}