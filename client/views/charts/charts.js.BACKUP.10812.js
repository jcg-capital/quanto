/* ---------------------------------------------------- +/

## Charts ##

Code related to the charts template

/+ ---------------------------------------------------- */
  /*
 * Function to draw the area chart
 */

//  function builtStockLocal() {



//     $('div#container-area').highcharts('StockChart', {


//         rangeSelector: {
//             selected: 1
//         },

//         title: {
//             text: 'AAPL Stock Price'
//         },

//         series: [{
//             name: 'AAPL',
//             data: data,
//             tooltip: {
//                 valueDecimals: 2
//             }
//             }]
//     });

// }



// Streamy.on('hello', function(d) {
//     console.log('data');
//   var data = JSON.parse(d.data); // Will print 'world!'
  
//   if (data.trade) {
//     console.log('trade occured');
//      var trade = data.trade;
//      var lastPrice = data.trade.last;
//      var volume = data.trade.cvol;
//      var timestamp = data.trade.timestamp;

//      var tradeData = {
//           'lastPrice': lastPrice,
//           'timestamp': timestamp
//      };

//      Session.set('tradeData', tradeData);
//      console.log('this is tradeData session:', Session.get('tradeData'));
      
//   }
 
//     if (data.quote) {
//     console.log('quote occured');
//        var quote = data.quote;
//        var bid = data.quote.bid;
//        var ask = data.quote.ask;
//        var timestamp1 = data.quote.timestamp;

//     }
 
 

//     //call rendered charts

// });

// setInterval(function() {
//   console.log('interval running')
//   live = true;
//   Template.charts.rendered();
// }, 4000);

live = false;

Streamy.on('hello', function(data){
  console.log('received hello', data);
});

<<<<<<< HEAD



Template.charts.rendered = function() { 
  console.log('rendered');
=======
Template.charts.rendered = function() {
/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

  // Load the fonts
  Highcharts.createElement('link', {
     href: '//fonts.googleapis.com/css?family=Unica+One',
     rel: 'stylesheet',
     type: 'text/css'
  }, null, document.getElementsByTagName('head')[0]);

  Highcharts.theme = {
     colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
     chart: {
        backgroundColor: {
           linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
           stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40']
           ]
        },
        style: {
           fontFamily: "'Unica One', sans-serif"
        },
        plotBorderColor: '#606063'
     },
     title: {
        style: {
           color: '#E0E0E3',
           textTransform: 'uppercase',
           fontSize: '20px'
        }
     },
     subtitle: {
        style: {
           color: '#E0E0E3',
           textTransform: 'uppercase'
        }
     },
     xAxis: {
        gridLineColor: '#707073',
        labels: {
           style: {
              color: '#E0E0E3'
           }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
           style: {
              color: '#A0A0A3'

           }
        }
     },
     yAxis: {
        gridLineColor: '#707073',
        labels: {
           style: {
              color: '#E0E0E3'
           }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
           style: {
              color: '#A0A0A3'
           }
        }
     },
     tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
           color: '#F0F0F0'
        }
     },
     plotOptions: {
        series: {
           dataLabels: {
              color: '#B0B0B3'
           },
           marker: {
              lineColor: '#333'
           }
        },
        boxplot: {
           fillColor: '#505053'
        },
        candlestick: {
           lineColor: 'white'
        },
        errorbar: {
           color: 'white'
        }
     },
     legend: {
        itemStyle: {
           color: '#E0E0E3'
        },
        itemHoverStyle: {
           color: '#FFF'
        },
        itemHiddenStyle: {
           color: '#606063'
        }
     },
     credits: {
        style: {
           color: '#666'
        }
     },
     labels: {
        style: {
           color: '#707073'
        }
     },

     drilldown: {
        activeAxisLabelStyle: {
           color: '#F0F0F3'
        },
        activeDataLabelStyle: {
           color: '#F0F0F3'
        }
     },

     navigation: {
        buttonOptions: {
           symbolStroke: '#DDDDDD',
           theme: {
              fill: '#505053'
           }
        }
     },

     // scroll charts
     rangeSelector: {
        buttonTheme: {
           fill: '#505053',
           stroke: '#000000',
           style: {
              color: '#CCC'
           },
           states: {
              hover: {
                 fill: '#707073',
                 stroke: '#000000',
                 style: {
                    color: 'white'
                 }
              },
              select: {
                 fill: '#000003',
                 stroke: '#000000',
                 style: {
                    color: 'white'
                 }
              }
           }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
           backgroundColor: '#333',
           color: 'silver'
        },
        labelStyle: {
           color: 'silver'
        }
     },

     navigator: {
        handles: {
           backgroundColor: '#666',
           borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
           color: '#7798BF',
           lineColor: '#A6C7ED'
        },
        xAxis: {
           gridLineColor: '#505053'
        }
     },

     scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
     },

     // special colors for some of the
     legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
     background2: '#505053',
     dataLabelsColor: '#B0B0B3',
     textColor: '#C0C0C0',
     contrastTextColor: '#F0F0F3',
     maskColor: 'rgba(255,255,255,0.3)'
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);






>>>>>>> ced1b9a65ef0e537551ec4a3b548d7e33c3474a7
  var dataObject = Session.get('dataStore');
  // ticker of initial data to query
  var tickerSymbol = 'GOOG';

  // If no data object, load default chart
  // If live, load symbol and stream
  // If not live and data object, load dataobject

 
  if (!dataObject && !live) {    
    makeCallRequest(tickerSymbol, function(){
      dataObject = Session.get('dataStore');
      var data = dataObject.data;
      var columnNames = dataObject.column_names;
      var ohlc = [];
      var volume = [];
      var dataLength = data.length;
        // set the allowed units for data grouping
      var groupingUnits = [[
          'millisecond', // unit name
          [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
        ], [
          'second',
          [1, 2, 5, 10, 15, 30]
        ], [
          'minute',
          [1, 2, 5, 10, 15, 30]
        ], [
          'hour',
          [1, 2, 3, 4, 6, 8, 12]
        ], [
          'day',
          [1]
        ], [
          'week',
          [1]
        ], [
          'month',
          [1, 3, 6]
        ], [
          'year',
          null
        ]];

      for (var i = 0; i < dataLength; i += 1) {
        // start of data in milliseconds
        var newDate = new Date(data[i][0]); // the date
        var dateInMil = newDate.getTime();
        ohlc.push([
          dateInMil,
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4] // close
        ]);
        volume.push([
          dateInMil, // the date
          data[i][5] // the volume
        ]);
      }

      // frequency of data - daily, monthly, 
      var frequency = data.frequency;
      if (frequency === 'daily') {
        // ?
      }

      var options = {
        rangeSelector: {
          allButtonsEnabled: true,
          selected: 2
        },
        title: {
          text: data.name
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2
        }, { 
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        series: [{
          type: 'candlestick',
          data: ohlc,
          dataGrouping: {
            units: groupingUnits
          }
        }, {
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
        }]
      };

      // create the chart
      $('div#container-area').highcharts('StockChart', options);
    }); 
  } 
  else if (live) {
        $(function () {
          console.log('rendering live chart');
         

        Highcharts.setOptions({
            global : {
                useUTC : false
            }
        });

        // Create the chart
         console.log('entered load function');
            // need to pass in if symbol is currently choosen
            var historicalData = Session.get('dataStore').data;
            // console.log('dataStore retrieved:', historicalData);
        liveResults = [];
        var volume = [];
               for (var i = historicalData.length-5; i < historicalData.length; i++) {
                  var newDate = new Date(historicalData[i][0]); // the date
                  var dateInMil = newDate.getTime();
                  liveResults.push([
                    dateInMil,
                    historicalData[i][4] // close
                  ]);
                  volume.push([
                    dateInMil, // the date
                    historicalData[i][5] // the volume
                  ]);
                   
                }

        $('div#container-area').highcharts('StockChart', {
            
            chart : {
                events : {
                    load : function () {

                     
                    //         var series = this.series[0];
                    // setInterval(function () {
                    //     var x = (new Date()).getTime(), // current time
                    //         y = Math.round(Math.random() * 100);
                    //     series.addPoint([x, y], true, true);
                    // }, 1000);
                      
                        var series = this.series[0];

                          Streamy.on('hello', function(d) {
                          // console.log('streamy triggered');
                          var data = JSON.parse(d.data); // Will print 'world!'
                            if (data.trade) {
                              console.log('trade occured');
                               var trade = data.trade;
                               var lastPrice = data.trade.last;
                               console.log('lastPrice', parseFloat(lastPrice));
                               var volume = data.trade.cvol;
                               var timestamp = data.trade.timestamp;
                               var tradeData = {
                                    'lastPrice': lastPrice,
                                    'timestamp': timestamp
                                };
                               
                              // var $chart = $('div#container-area').highcharts();
                              var x = (new Date()).getTime(); // current time
                              // y = Math.round(Math.random() * 100);
                              // console.log('this is Y', y);
                              series.addPoint([x, parseFloat(lastPrice)], true, true);
                            }
                          });


                            //    Session.set('tradeData', tradeData);
                            //    console.log('this is tradeData session:', Session.get('tradeData'));
                            // }
                            //   if (data.quote) {
                            //   console.log('quote occured');
                            //      var quote = data.quote;
                            //      var bid = data.quote.bid;
                            //      var ask = data.quote.ask;
                            //      var timestamp1 = data.quote.timestamp;

                            //   }

                       
                     
                    }
                }
            },

            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1M'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5M'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            title : {
                text : 'Live random data'
            },

            exporting: {
                enabled: false
            },

            series : [{

                data : liveResults,
                }] 
              });
            });
        }

  else {

        console.log('rendering default chart');
        var data = dataObject.data;
        
        var columnNames = dataObject.column_names;
        var ohlc = [];
        var volume = [];
        var dataLength = data.length;
          // set the allowed units for data grouping
        var groupingUnits = [[
            'millisecond', // unit name
            [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
          ], [
            'second',
            [1, 2, 5, 10, 15, 30]
          ], [
            'minute',
            [1, 2, 5, 10, 15, 30]
          ], [
            'hour',
            [1, 2, 3, 4, 6, 8, 12]
          ], [
            'day',
            [1]
          ], [
            'week',
            [1]
          ], [
            'month',
            [1, 3, 6]
          ], [
            'year',
            null
          ]];

        i = 0;

        for (i; i < dataLength; i += 1) {
          // start of data in milliseconds
          var newDate = new Date(data[i][0]); // the date
          var dateInMil = newDate.getTime();
          ohlc.push([
            dateInMil,
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
          ]);
          volume.push([
            dateInMil, // the date
            data[i][5] // the volume
          ]);
        }

        // frequency of data - daily, monthly, 
        var frequency = dataObject.frequency;
        if (frequency === 'daily') {
        }

        var options = {
          rangeSelector: {
            allButtonsEnabled: true,
            selected: 2
          },
          title: {
            text: dataObject.name
          },
          yAxis: [{
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2
          }, { 
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
          }],
          series: [{
            type: 'candlestick',
            data: ohlc,
            dataGrouping: {
              units: groupingUnits
            }
          }, {
            type: 'column',
            name: 'Volume',
            data: volume,
            yAxis: 1,
          }]
        };

        // create the chart
        $('div#container-area').highcharts('StockChart', options);
  }

};

makeCallRequest = function(ticker, cb) {
  var query = {
      data: {
        code : {
          'source': 'WIKI',
          'table': ticker
        },
        options : {
          columns: '4',
          sort_order:'asc',
          // collapse:'quarterly',
        }
      } 
    };
    HTTP.call("POST", "quandlquery", query, function (error, result) {
      if (error) { 
        console.log(error);
      } 
      else if (!error) {
        var r = JSON.parse(result.content);
        Session.set('dataStore', r);
        cb();
      }
    });
};



/* 
 * Call the function to built the chart when the template is rendered
 */

Template.charts.events({
    'click button.off.btn-xlarge': function (event) {
      live = false;
         Streamy.emit('goodbye', { data: 'goodbye for realz' } );
      
      Template.charts.rendered();

   
  
    },
});

Template.charts.created = function () {
  //
  console.log('ran created');
};

Template.charts.helpers({
  
  myHelper: function () {
    //
  }

});

