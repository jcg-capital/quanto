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


//  function sendData(session, data) {
    
// }

function builtArea() {
            $(function () {
           

         var dataObject = Session.get('dataStore');

     
         var data = dataObject['data'];
         var columnNames = dataObject['column_names'];

        
            // split the data set into ohlc and volume
            var ohlc = [],
                volume = [],
                dataLength = data.length,
                // set the allowed units for data grouping
                groupingUnits = [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]],

                i = 0;

            for (i; i < dataLength; i += 1) {
                ohlc.push([
                    data[i][0], // the date
                    data[i][1], // open
                    data[i][2], // high
                    data[i][3], // low
                    data[i][4] // close
                ]);

              
              console.log('ohlc', ohlc)

                volume.push([
                    data[i][0], // the date
                    data[i][5] // the volume
                ]);

            }

        console.log('volume', volume)
            // create the chart
            $('div#container-area').highcharts('StockChart', {


                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'AAPL Historical'
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
                    name: 'AAPL',
                    data: ohlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }]
            });
        });
 console.log('inside stock build function');
}



/*
 * Call the function to built the chart when the template is rendered
 */

Template.charts.events({
    'click p': function (event) {
        builtArea();
    }
});

Template.charts.created = function () {
  //

};

Template.charts.rendered = function() { 
    builtArea();
};



Template.charts.helpers({
  
  myHelper: function () {
    //
  }

});


// Template.charts.events({

//   'submit': function(e, instance){
//     e.preventDefault()
//     var chartSettings = {
        
//         chart: {
//             type: 'area'
//         },
        
//         title: {
//             text: '' // title
//         },
        
//         credits: {
//             enabled: false
//         },

//         subtitle: {
//             text: '' // Source information
//         },
        
//         xAxis: {
//             labels: {
//                 formatter: function () {
//                   // Convert UTC epoch seconds to local time
//                   //var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
//                   //console.log(d.setUTCSeconds(this.value))
//                   console.log(new Date(this.value))
//                   return new Date(this.value)
//                 }
//             },
//             // dateTimeLabelFormats: {
//             //               month: '%b \'%y',
//             //               year: '%Y'
//             //             }
//         },
        
//         yAxis: {
//             type: 'datetime',
//             title: {
//                 text: ''
//             },
//             labels: {
//                 formatter: function () {
//                     return this.value;
//                 }
//             }
//         },
        
//         tooltip: {
//             pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
//         },
        
//         plotOptions: {
//             area: {
//                 pointStart: 1940,
//                 pointInterval: 24 * 3600 * 1000, // one day
//                 marker: {
//                     enabled: false,
//                     symbol: 'circle',
//                     radius: 2,
//                     states: {
//                         hover: {
//                             enabled: true
//                         }
//                     }
//                 }
//             }
//         },        
//         series: []
        // {
        //     name: 'USA',
        //     data: [] // null or integer
        // }, {
        //     name: 'USSR/Russia',
        //     data: [] // null or integer
        // }
    
    // console.log('Inside the function');
    // var tickerSymbol = e.target.searchText.value;
    // var query = {
    //               data: {
    //                 code : {
    //                   'source': 'WIKI',
    //                   'table': tickerSymbol
    //                 },
    //                 options : { 
    //                   column:'4',
    //                   sort_order:'asc',
    //                   collapse:'quarterly',
    //                   trim_start:'2012-01-01',
    //                   trim_end:'2013-12-31'
    //                 }
    //               } 
    //             };
    // HTTP.call("POST", "quandlquery", query,
    //   function (error, result) {
    //     if (!error) {
    //       console.log('WE GOT SOMETHiNG HEREsfsfsafee3',result);
    //         var r = JSON.parse(result.content);
    //         //debugger;
    //         chartSettings.title.text = r.source_name;
    //         chartSettings.subtitle.text = r.display_url;
    //         chartSettings.yAxis.title.text = r.column_names[1] + ' Price';
    //         // chartSettings.xAxis.title.text = r.column_names[1] // ["Date", "Close"]
    //         // for each push to chartSettings.series {name:String, data: Array} 
    //         chartSettings.series.push({
    //                                     name: r.code,
    //                                     data: r.data.map(function(c,i,a){
    //                                       return c[1]; //example: 0: "2012-03-31" 1: 599.55
    //                                     })
    //                                   });
    //         chartSettings.plotOptions.area.pointInterval = 2628000; // one month approx
    //         var splitDate = query.data.options.trim_start.split('-');
    //         var parseDate = {
    //                           year: parseInt(splitDate[0]),
    //                           month: parseInt(splitDate[1]),
    //                           day: parseInt(splitDate[2])
    //                         };
    //         chartSettings.plotOptions.area.pointStart = Date.UTC(parseDate.year, parseDate.month, parseDate.day); // Y, M, d
    //         $('#container-area').highcharts(chartSettings);
//         }
//       }
//     );
//   }

// });

// r.code
// "AAPL"
// r.column_names
// ["Date", "Close"]
// r.code
// "AAPL"
// r.from_date
// "1980-12-12"
// r.frequency
// "daily"
// r.display_url
// "http://www.quandl.com/WIKI/AAPL"
// r.source_name
// "Wiki EOD Stock Prices"
// r.source_code
// "WIKI"
// r.private
// false
// r.type
// null
// r.data
// [Array[2]0: "2012-03-31"1: 599.55