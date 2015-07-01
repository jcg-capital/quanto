/* ---------------------------------------------------- +/

## Charts ##

Code related to the charts template

/+ ---------------------------------------------------- */
  /*
 * Function to draw the area chart
 */

//  function builtStockLocal() {

Streamy.on('hello', function(d) {
    console.log('data');
  console.log(d.data); // Will print 'world!'

  // On the server side only, the parameter 's' is the socket which sends the message, you can use it to reply to the client, see below
});

Template.charts.rendered = function() { 
  var dataObject = Session.get('dataStore');
  // ticker of initial data to query
  var tickerSymbol = 'GOOG';
  if (!dataObject) {    
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
};

var makeCallRequest = function(ticker, cb) {
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
}



/* 
 * Call the function to built the chart when the template is rendered
 */

Template.charts.events({
    'click p.symbol': function (event) {
        // console.log('triggered renderChart()');
        
        // if old Session datastore
    },
    'click button.btn-xlarge': function (event) {
        console.log('triggered Live Data');

    },
});

Template.charts.created = function () {
  //
  console.log('ran created')
};

Template.charts.rendered = function() { 
    console.log('ran rendered')
    renderChart();
};



Template.charts.helpers({
  
  myHelper: function () {
    //
  }

});

