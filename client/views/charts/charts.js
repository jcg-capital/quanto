/* ---------------------------------------------------- +/

## Charts ##

Code related to the charts template

/+ ---------------------------------------------------- */
  /*
 * Function to draw the area chart
 */
function builtArea() {

    $('#container-area').highcharts({
        
        chart: {
            type: 'area'
        },
        
        title: {
            text: 'US and USSR nuclear stockpiles'
        },
        
        credits: {
            enabled: false
        },
        
        subtitle: {
            text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
                'thebulletin.metapress.com</a>'
        },
        
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        
        yAxis: {
            title: {
                text: 'Nuclear weapon states'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        
        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        
        plotOptions: {
            area: {
                pointStart: 1940,
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
        
        series: [{
            name: 'USA',
            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: 'USSR/Russia',
            data: [null, null, null, null, null, null, null, null, null, null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */

Template.charts.created = function () {
  //
};

Template.charts.rendered = function() {    
    builtArea();
}

Template.charts.helpers({
  
  myHelper: function () {
    //
  }

});


Template.charts.events({

  'submit': function(e, instance){
    e.preventDefault()
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
                  console.log(new Date(this.value))
                  return new Date(this.value)
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
    console.log('Inside the function');
    var tickerSymbol = e.target.searchText.value;
    var query = {
                  data: {
                    code : {
                      'source': 'WIKI',
                      'table': tickerSymbol
                    },
                    options : { 
                      column:'4',
                      sort_order:'asc',
                      collapse:'quarterly',
                      trim_start:'2012-01-01',
                      trim_end:'2013-12-31'
                    }
                  } 
                };
    HTTP.call("POST", "quandlquery", query,
      function (error, result) {
        if (!error) {
          console.log('WE GOT SOMETHiNG HEREsfsfsafee3',result);
            var r = JSON.parse(result.content);
            //debugger;
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
            chartSettings.plotOptions.area.pointInterval = 2628000; // one month approx
            var splitDate = query.data.options.trim_start.split('-');
            var parseDate = {
                              year: parseInt(splitDate[0]),
                              month: parseInt(splitDate[1]),
                              day: parseInt(splitDate[2])
                            }
            chartSettings.plotOptions.area.pointStart = Date.UTC(parseDate.year, parseDate.month, parseDate.day); // Y, M, d
            $('#container-area').highcharts(chartSettings);
        }
      }
    );
  }

});

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