var oCaeAdm1FreeNodesGm;
var oCaeNas1UsageGm;
var oCaeNas1AwaitingTimeGm;

var _green = "#a9d70b";
var _yellow="#f9c802";
var _red= "#ff0000";

var dflt ={
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

try{

    $(document).ready(function(){
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
            defaults: dflt
        });

        oCaeNas1UsageGm = new JustGage({
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
              defaults: dflt
        });

        oCaeNas1AwaitingTimeGm = new JustGage({
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
              defaults: dflt
          });


        updateGm();
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

                    case "oCaeNas1UsageGm":
                            _logData =_logData.match(/[0-9]+\.[0-9]{2}/g);
                            window[_Gm].refresh(parseFloat(_logData[1]));
                    break;

                    case "oCaeNas1AwaitingTimeGm":
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
            loadData("oCaeNas1UsageGm", "cae_nas1_check_home15.htm");
            loadData("oCaeNas1AwaitingTimeGm", "cae_nas1_check_home15.htm");
        }
        catch(ex){console.log(ex.message);}
    }

    setInterval(function(){updateGm();}, 3000);

}
catch(ex){console.log(ex.message);}