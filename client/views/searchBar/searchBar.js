
Template.searchBar.events({
  
  'click .search-result': function(e){
    var tickerSymbol = e.target.innerText;
    var chart = $('div#container-area').highcharts();
    if (tickerSymbol.length >= 5) {
      tickerSymbol = e.target.childNodes[1].innerText;
    }
    chart.showLoading();
    $('#search-results').html('');
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
        // 
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
      chart.hideLoading();
    }); 
  },

  'keyup': function(e, instance){
    e.preventDefault();
    var queryString = e.currentTarget.value;
    var query = {
      data: {
        query: queryString,
        // formatObject : { format: "json" } // csv, xml, json
      } 
    };
    HTTP.call("POST", 'yahooQuery', query, function (error, result) {
      if (!error) {
        var r = JSON.parse(result.content.replace('YAHOO.Finance.SymbolSuggest.ssCallback(','').replace(')',''));
        r = JSON.parse(r);
        $('#search-results').html('');
        r.ResultSet.Result.forEach(function(c,i,a){
          // console.log('results from Yahoo', c);
          var $result = $('<div class="search-result">');
          var $c = $('<div class="search-res-inner">').text(c.name).append('<p class="symbol">' + c.symbol + '</p>');
          $result.append([$c]);
          $('#search-results').append($result);
        });
      }
    });
  },
  'click .glyphicon-th': function (event) {
    console.log('triggered Live Data');
    live = true;
    HTTP.call("GET", "liveQuery", null, function (error, result) {
      if (error) {
       console.log('ERROR client/searchBar', error);
      }
      if (!error) {
       console.log('Live Query Result', result);
      }
    });

    Template.charts.rendered();
  }
});
