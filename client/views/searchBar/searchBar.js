Template.searchBar.created = function () {
  //
};

// Here is the positioning data for the node in the searchBar template



Template.searchBar.rendered = function () {
  //
};

  Template.searchBar.events({

    'click .search-result': function(e){

      // click must render layout
      // make quandl query, store it in session variable
      // pass it to graph

      console.log('event', e);

    var tickerSymbol = e.target.innerText;
    console.log(tickerSymbol);

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
                  //var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                  //console.log(d.setUTCSeconds(this.value))
                  console.log(new Date(this.value));
                  return new Date(this.value);
                }
            },
            // dateTimeLabelFormats: {
            //               month: '%b \'%y',
            //               year: '%Y'
            //             }
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
        // {
        //     name: 'USA',
        //     data: [] // null or integer
        // }, {
        //     name: 'USSR/Russia',
        //     data: [] // null or integer
        // }
    };

         HTTP.call("POST", "quandlquery", query,
      function (error, result) {
        if (error) { 
          console.log(error);
        } else if (!error) {
          console.log('WE GOT SOMETHiNG HEREsfsfsafee3',result);
            var r = JSON.parse(result.content);
            console.log(r);
            chartSettings.title.text = r.source_name;
            chartSettings.subtitle.text = r.display_url;
            chartSettings.yAxis.title.text = r.column_names[1] + ' Price';
            // chartSettings.xAxis.title.text = r.column_names[1] // ["Date", "Close"]
            // for each push to chartSettings.series {name:String, data: Array} 
            chartSettings.series.push({
                                        name: r.code,
                                        data: r.data.map(function(c,i,a){
                                          return c[1]; //example: 0: "2012-03-31" 1: 599.55
                                        })
                                      });
                Session.set('dataStore', r);
                renderChart();

            // chartSettings.plotOptions.area.pointInterval = 2628000; // one month approx
            // // var splitDate = query.data.options.trim_start.split('-');
            // // var parseDate = {
            // //                   year: parseInt(splitDate[0]),
            // //                   month: parseInt(splitDate[1]),
            // //                   day: parseInt(splitDate[2])
            // //                 }
            // chartSettings.plotOptions.area.pointStart = Date.UTC(parseDate.year, parseDate.month, parseDate.day); // Y, M, d
            // // $('#container-area').highcharts(chartSettings);
               
       
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

      HTTP.call("POST", 'yahooQuery', query,
        function (error, result) {
          if (!error) {
            var r = JSON.parse(result.content.replace('YAHOO.Finance.SymbolSuggest.ssCallback(','').replace(')',''));
            r = JSON.parse(r);
            // exch: "NYQ"exchDisp: "NYSE"name: "Agilent Technologies Inc."symbol: "A"type: "S"typeDisp: "Equity"
            $('#search-results').html('');
            r.ResultSet.Result.forEach(function(c,i,a){
              console.log('results from Yahoo', c);
              var $result = $('<div class="search-result" style="background-color: #999;color: #EEE;margin: 3px">');
              //  var $c = $('<div>').text(c.name);
              // var $a = $('<div>').text(c.symbol);
              var $c = $('<div>').text(c.name).append("<p class=" + "symbol" +">" + c.symbol + "</p>");
              $result.append([$c]);
              $('#search-results').append($result);
            });
          }
        }
      );
    }
  });

    // HTTP.call("POST", "quandlsearch", query,
    //   function (error, result) {
    //     if (!error) {
    //       console.log('SEARCH RESULTS',result);
    //       var r = JSON.parse(result.content);
    //       $('#search-results').html('');
    //       r.docs.forEach(function(c,i,a){
    //         console.log(c)
    //         var $result = $('<div style="background-color: #999;color: #EEE;margin: 3px;">')
    //          var $c = $('<div>').text(c.name);
    //         var $a = $('<div>').text(c.description);
    //         $result.append([$c, $a])
    //         $('#search-results').append($result);
    //       })
           // urlize_name: "C-Citigroup-Inc-Common-Stock"
           // description: "Exchange : . Key Statistics"
           // frequency: "daily"
           // name: "C: Citigroup Inc. Common Stock -"
           // source_code: "YAHOO"
           // source_name: "YFinance"
  //       }
  //     }
  //   );
  // }


var ROTATIONS = [
  [ Math.PI/8 , Math.PI/4 ],
  [ -1 * Math.PI/10 , 7 * Math.PI + Math.PI/4]
];

Session.setDefault('rotation', 0);

Template.searchBar.helpers({
  reactiveRotation: function() {
    return {
      value: ROTATIONS[Session.get('rotation')],
      // value1: ROTATIONS[0],
      // value2: ROTATIONS[1],
      transition: { duration: 3500, curve: 'inOutElastic' }
    };
  },
  nodeSize: "P:0.5; P:0.5; P:0.5",
  nodeAlign: [0.5, 0.5],
  nodeMountPoint: [0.5, 0.5],
  nodeOrigin: [0.55, 0.5]
});

Template.inner.events({
  'click': function(event, tpl) {
    console.log("CLICKED");
    var current = Session.get('rotation');
    // logic to alternate between first and second position in ROTATIONS array
    Session.set('rotation', (current+1) % 2 );
  }
});
