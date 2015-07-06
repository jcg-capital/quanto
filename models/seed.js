/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
if (Algorithms.find().count() === 0) {

  Algorithms.insert({
    title: "Example Affect Graph",
    body: 'console.log(Session.get("dataStore"))\nvar data = [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,\n                1005, 5, 2063, 3057, 1, 6444, 9822, 15468, 20434, 24126,\n                4, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,\n                26956, 3, 28999, 28965, 27826, 25579, 25722, 24826, 24605,\n                1, 23464, 1, 24099, 24357, 24237, 24401, 24344, 23586,\n                22380, 21004, 17287, 14747, 5676, 12555, 12144, 11009, 10950,\n                10871, 10824, 105477, 10527, 10475, 10421, 10358, 10295, 10104]\nvar multiplier = multiplier || .1\nvar callback = function(c, i, a) {\n    multiplier *= 3\n    return c*multiplier\n}\n\n$("#container-area").highcharts().addSeries({\n            name: "WOOHOO",\n            data: data.map(function(c,i,a){\n                return callback(c,i,a)\n            })\n        })'
  });  

  Algorithms.insert({
    title: "Working Example",
    body: 'var $chart = $("div#container-area").highcharts()\n\nvar sma = function(days) {\n    return function(arr){\n        var transformed = arr.map(function(c,i,a){\n            if (i < days -1 ){\n                return null\n            } else {\n                var s = a.slice(i, i + days)\n                var sum = s.reduce(function(p,c){\n                    return p + c\n                })\n                return sum / days             \n            }\n        })\n        return transformed\n    }\n}\n\nvar sma3 = sma(3),\nsma5 = sma(5),\nxData = $chart.series[0].xData\nyData = $chart.series[0].yData\nvar transformed = sma5(yData)\nvar translated = yData.map(function(c,i,a){\n    return [xData[i], c[3]]\n})\n\nvar sma_line = {\n    type: "spline",\n    name: "sma5",\n    data: translated,\n    marker: {\n        lineWidth: 2,\n        lineColor: Highcharts.getOptions().colors[3],\n        fillColor: "white"\n    }\n}\nconsole.log("WHAT")\n$chart.addSeries(sma_line, true)'
  });

}


