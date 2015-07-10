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




Template.charts.rendered = function() { 
  console.log('rendered');
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

