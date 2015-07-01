var chartSettings = {      
  chart: {
      type: 'area'
  },
  title: {
      text: '' // title
  },
  credits: {
      enabled: false
  },
  subtitle: {
      text: '' // Source information
  },
  xAxis: {
      labels: {
          formatter: function () {
            // Convert UTC epoch seconds to local time
            return new Date(this.value);
          }
      },
  },
  yAxis: {
      type: 'datetime',
      title: {
          text: ''
      },
      labels: {
          formatter: function () {
              return this.value;
          }
      }
  },
  tooltip: {
      pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
  },
  plotOptions: {
    area: {
      pointStart: 1940,
      pointInterval: 24 * 3600 * 1000, // one day
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            enabled: true
          }
        }
      }
    }
  },        
  series: []
};


Template.searchBar.created = function () {
  //
};

// Here is the positioning data for the node in the searchBar template



Template.searchBar.rendered = function () {
  //
};

Template.searchBar.events({

  'click .search-result': function(e){
    var tickerSymbol = e.target.innerText;
    console.log("LOL THISIS THETHING", tickerSymbol);
    var query = {
      data: {
        code : {
          'source': 'WIKI',
          'table': tickerSymbol
        },
        options : {
          columns: '4',
          sort_order:'asc',
          collapse:'quarterly',
        }
      } 
    };
    HTTP.call("POST", "quandlquery", query, function (error, result) {
      if (error) { 
        console.log(error);
      } 
      else if (!error) {
        console.log('WE GOT SOMETHiNG HEREsfsfsafee3',result);
        var r = JSON.parse(result.content);
        console.log(r);
        chartSettings.title.text = r.source_name;
        chartSettings.subtitle.text = r.display_url;
        chartSettings.yAxis.title.text = r.column_names[1] + ' Price';
        chartSettings.series.push({
          name: r.code,
          data: r.data.map(function(c,i,a){
            return c[1]; //example: 0: "2012-03-31" 1: 599.55
          })
        });
        Session.set('dataStore', r); 
      }
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
          console.log('results from Yahoo', c);
          var $result = $('<div class="search-result" style="background-color: #999;color: #EEE;margin: 3px">');
          var $c = $('<div>').text(c.name).append("<p class=" + "symbol" +">" + c.symbol + "</p>");
          $result.append([$c]);
          $('#search-results').append($result);
        });
      }
    });
  }

});

Template.searchBar.helpers({});

Template.inner.events({
  'click': function(event, tpl) {
  }
});
