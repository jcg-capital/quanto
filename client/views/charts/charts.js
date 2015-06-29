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


renderChart = function() {
            $(function () {
           

         var dataObject = Session.get('dataStore');

         if (!dataObject) {
            dataObject = {};
            dataObject.data = 0;
         }

         var data = dataObject.data;
         console.log('Data Object:', data);
         var columnNames = dataObject.column_names;

        
            // split the data set into ohlc and volume
            var ohlc = [],
                volume = [],
                dataLength = data.length,
                // set the allowed units for data grouping
                groupingUnits = [[
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

  
      
            // create the chart
            $('div#container-area').highcharts('StockChart', {


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
                // name: 'AAPL',
                data: ohlc,
                // pointStart: pointStartTime,
                // pointInterval: 86400000,
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                // dataGrouping: {
                //     units: groupingUnits
                // }
                }]
        });
    });
}



/*
 * Call the function to built the chart when the template is rendered
 */

Template.charts.events({
    'click p.symbol': function (event) {
        console.log('triggered Built Area');
        // if old Session datastore
    }
});

Template.charts.created = function () {
  //

};

Template.charts.rendered = function() { 
    renderChart();
};



Template.charts.helpers({
  
  myHelper: function () {
    //
  }

});

