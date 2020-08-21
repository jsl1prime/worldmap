$(document).ready(function(){

    var arr0 = [[1,52.51]];

    var arr1 = [[1,16.84],[2,15.43]];

    var arr2 = [[1,25.07],[2,29.19]];

    var arr_3g0 = [[1,3.71],[2,15.43]];

    var arr_3g1 = [[1,1.95],[2,29.19]];

  // === Make chart === //
    var plot = $.plot($("#lte"),
           [

            { data: arr0, label: "", color: "#BA1E20"}
            ,
            { data: arr1, label: "", color: "#459D1C"}
            ,
            { data: arr2, label: "", color: "#e8b32d"}

           ], {
               series: {
                   lines: { show: true },
                   points: { show: true }
               },
               grid: { hoverable: true, clickable: true},
               xaxis: {
               min:1,max:12,tickDecimals:0
               ,tickFormatter: function(val, axis) { return val+"월"; }
               },
               yaxis: {min: 0,
               tickFormatter: function(val, axis) { return val.toFixed(2); }
               }
               ,legend: {
                noColumns:0,
                labelBoxBorderColor:"#000000",
                position:"nw"
               }
       });

    // === Make chart === //
    var plot2 = $.plot($("#3g"),
           [

            { data: arr_3g0, label: "Bouygues Telecom", color: "#BA1E20"}
            ,
            { data: arr_3g1, label: "Orange S.A.", color: "#459D1C"}

           ], {
               series: {
                   lines: { show: true },
                   points: { show: true }
               },
               grid: { hoverable: true, clickable: true},
               xaxis: {min:1,max:12,tickDecimals:0
               ,tickFormatter: function(val, axis) { return val+"일"; }
               }
               ,yaxis :{min:0,tickFormatter: function(val, axis) { return val.toFixed(2); }}
               ,legend: {
                noColumns:0,
                labelBoxBorderColor:"#000000",
                position:"nw"
               }
       });


  // === Point hover in chart === //
    var previousPoint = null;
    $(".chart").bind("plothover", function (event, pos, item) {

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $('#tooltip').fadeOut(200,function(){
          $(this).remove();
        });
                var x = item.datapoint[0].toFixed(0)+"월",
          y = item.datapoint[1].toFixed(2)+" Mbps";

                unicorn.flot_tooltip(item.pageX, item.pageY,item.series.label + " " + x + " = " + y);
            }

        } else {
      $('#tooltip').fadeOut(200,function(){
          $(this).remove();
        });
            previousPoint = null;
        }
    });
});

unicorn = {
    // === Tooltip for flot charts === //
    flot_tooltip: function(x, y, contents) {

      $('<div id="tooltip">' + contents + '</div>').css( {
        top: y + 5,
        left: x + 5
      }).appendTo("body").fadeIn(200);
    }
}
