// For Chart search page.


// For Chart when User Search
$(function(){  
   fetch('http://localhost:3000/config/tokens.json')
   .then(response => response.json())
   .then(data => {
       console.log(data)
       var tokens = data.tokens;
       var base = data.base;
       var symbol = document.getElementById("symbolChart").value;

       Highcharts.getJSON(`https://${base}.iexapis.com/stable/stock/${symbol}/chart/1m?token=${tokens}`, function (data) {

        // split the data set into ohlc and volume
        var ohlc = [],
            volume = [],
            dataLength = data.length,
            i = 0;
    
        for (i; i < dataLength; i += 1) {
            ohlc.push([
                data[i].updated, // the date
                data[i].open, // open
                data[i].high, // high
                data[i].low, // low
                data[i].close // close
            ]);
    
            volume.push([
                data[i].updated, // the date
                data[i].volume // the volume
            ]);
            var symbolget = data[i].symbol ;
        }
    
        Highcharts.stockChart('containerChart', {
            chart: {
                type: 'columnrange',
                height: (9 / 16 * 120) + '%', // 16:9 ratio
            },
            yAxis: [{
                labels: {
                    align: 'left'
                },
                height: '80%',
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'left'
                },
                top: '80%',
                height: '20%',
                offset: 0
            }],
            tooltip: {
                shape: 'square',
                headerShape: 'callout',
                borderWidth: 0,
                shadow: false,
                positioner: function (width, height, point) {
                    var chart = this.chart,
                        position;
    
                    if (point.isHeader) {
                        position = {
                            x: Math.max(
                                // Left side limit
                                chart.plotLeft,
                                Math.min(
                                    point.plotX + chart.plotLeft - width / 2,
                                    // Right side limit
                                    chart.chartWidth - width - chart.marginRight
                                )
                            ),
                            y: point.plotY
                        };
                    } else {
                        position = {
                            x: point.series.chart.plotLeft,
                            y: point.series.yAxis.top - chart.plotTop
                        };
                    }
    
                    return position;
                }
            },
            series: [{
                type:'hollowcandlestick',
                id: 'aapl-ohlc',
                name: `${symbolget} Stock Price`,
                data: ohlc
            }, {
                type: 'column',
                id: 'aapl-volume',
                name: `${symbolget} Volume`,
                data: volume,
                yAxis: 1
            }],
            // For Export , Full Screen eg..
            exporting: {
                menuItemDefinitions: {
                    // Custom definition
                    label: {
                        onclick: function () {
                            this.renderer.label(
                                'You just clicked a custom menu item',
                                100,
                                100
                            )
                                .attr({
                                    fill: '#a4edba',
                                    r: 5,
                                    padding: 10,
                                    zIndex: 10
                                })
                                .css({
                                    fontSize: '1.5em'
                                })
                                .add();
                        },
                        text: 'Show label'
                    }
                },
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadSVG', 'separator', 'label', 'viewFullscreen']
                    }
                }
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 800
                    },
                    chartOptions: {
                        rangeSelector: {
                            inputEnabled: false
                        }
                    }
                }]
            }
        });
     });  

    });
    
 
});

// For Chart get with query Url
$(function(){  
    fetch('http://localhost:3000/config/tokens.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var tokens = data.tokens;
        var base = data.base;
        var symbol = document.getElementById("symbolwatch").value;
 
        Highcharts.getJSON(`https://${base}.iexapis.com/stable/stock/${symbol}/chart/1m?token=${tokens}`, function (data) {
 
         // split the data set into ohlc and volume
         var ohlc = [],
             volume = [],
             dataLength = data.length,
             i = 0;
     
         for (i; i < dataLength; i += 1) {
             ohlc.push([
                 data[i].updated, // the date
                 data[i].open, // open
                 data[i].high, // high
                 data[i].low, // low
                 data[i].close // close
             ]);
     
             volume.push([
                 data[i].updated, // the date
                 data[i].volume // the volume
             ]);
             var symbolget = data[i].symbol ;
         }
     
         Highcharts.stockChart('containerChart', {
             chart: {
                 height: (9 / 16 * 120) + '%' // 16:9 ratio
             },
             yAxis: [{
                 labels: {
                     align: 'left'
                 },
                 height: '80%',
                 resize: {
                     enabled: true
                 }
             }, {
                 labels: {
                     align: 'left'
                 },
                 top: '80%',
                 height: '20%',
                 offset: 0
             }],
             tooltip: {
                 shape: 'square',
                 headerShape: 'callout',
                 borderWidth: 0,
                 shadow: false,
                 positioner: function (width, height, point) {
                     var chart = this.chart,
                         position;
     
                     if (point.isHeader) {
                         position = {
                             x: Math.max(
                                 // Left side limit
                                 chart.plotLeft,
                                 Math.min(
                                     point.plotX + chart.plotLeft - width / 2,
                                     // Right side limit
                                     chart.chartWidth - width - chart.marginRight
                                 )
                             ),
                             y: point.plotY
                         };
                     } else {
                         position = {
                             x: point.series.chart.plotLeft,
                             y: point.series.yAxis.top - chart.plotTop
                         };
                     }
     
                     return position;
                 }
             },
             series: [{
                 type: 'ohlc',
                 id: 'aapl-ohlc',
                 name: `${symbolget} Stock Price`,
                 data: ohlc
             }, {
                 type: 'column',
                 id: 'aapl-volume',
                 name: `${symbolget} Volume`,
                 data: volume,
                 yAxis: 1
             }], 
             // For Export , Full Screen eg..
             exporting: {
                menuItemDefinitions: {
                    // Custom definition
                    label: {
                        onclick: function () {
                            this.renderer.label(
                                'You just clicked a custom menu item',
                                100,
                                100
                            )
                                .attr({
                                    fill: '#a4edba',
                                    r: 5,
                                    padding: 10,
                                    zIndex: 10
                                })
                                .css({
                                    fontSize: '1.5em'
                                })
                                .add();
                        },
                        text: 'Show label'
                    }
                },
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadSVG', 'separator', 'label', 'viewFullscreen']
                    }
                }
            },
             responsive: {
                 rules: [{
                     condition: {
                         maxWidth: 800
                     },
                     chartOptions: {
                         rangeSelector: {
                             inputEnabled: false
                         }
                     }
                 }]
             },
             
         });
      });  
 
     });
     
  
 });
 
