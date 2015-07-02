/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
if (Algorithms.find().count() === 0) {
 
  Algorithms.insert({
    title: "GOGOGO",
    body: 'console.log(Session.get("dataStore"))\nvar multiplier = multiplier || .1\nvar callback = function(c, i, a) {\n    multiplier *= 3\n    return c*multiplier\n}\n\nvar $chart = $("div#container-area").highcharts()\nconsole.log($chart.series)\nvar translated = $chart.series[0].yData.map(function(c,i,a){\n    var result = c.map(function(c2,i,a){\n        return callback(c2)\n    })\n    return result\n})\n$chart.series[0].yData = translated\n$chart.redraw()'
  });

  Algorithms.insert({
    title: "Example Affect Graph",
    body: 'console.log(Session.get("dataStore"))\nvar data = [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,\n                1005, 5, 2063, 3057, 1, 6444, 9822, 15468, 20434, 24126,\n                4, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,\n                26956, 3, 28999, 28965, 27826, 25579, 25722, 24826, 24605,\n                1, 23464, 1, 24099, 24357, 24237, 24401, 24344, 23586,\n                22380, 21004, 17287, 14747, 5676, 12555, 12144, 11009, 10950,\n                10871, 10824, 105477, 10527, 10475, 10421, 10358, 10295, 10104]\nvar multiplier = multiplier || .1\nvar callback = function(c, i, a) {\n    multiplier *= 3\n    return c*multiplier\n}\n\n$("#container-area").highcharts().addSeries({\n            name: "WOOHOO",\n            data: data.map(function(c,i,a){\n                return callback(c,i,a)\n            })\n        })'
  });  

  Algorithms.insert({
    title: "K Means Cluster",
    body: 'var POINT_COUNT = 500;\nvar COLORS = new Array("rgb(255,0,0)", "rgb(255,69,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,0,255)");\nvar MAX_LOOP_COUNT = 15;\n\nvar points = new Array();\nvar means = new Array();\nvar distances = {}; \n\nfunction computeDistance(a, b) {\n    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));\n}\n\nfunction cluster() {\n    var converged = false;\n    var dirty = false;\n    var distance = 0.0;\n    var curMinDistance = 0.0;\n    var sumX = new Array();\n    var sumY = new Array();\n    var clusterSizes = new Array();\n    var cluster = new Array();\n    var loopCount = 0;\n\n    while (!converged) {\n        dirty = false;\n        for (var i = 0; i < points.length; i = i + 1) {\n            point = points[i];\n            curMinDistance = distances[hash(point)];\n            for (var j = 0; j < means.length; j = j + 1) {\n                mean = means[j];\n                distance = computeDistance(point, mean);\n                if (distance < curMinDistance) {\n                    dirty = true;\n                    curMinDistance = distance;\n                    point.cluster = j;\n                }\n            }\n        }\n        if (!dirty) {\n            converged = true;\n            break;\n        }\n        for (var i = 0; i < means.length; i = i + 1) {\n            sumX[i] = 0;\n            sumY[i] = 0;\n            clusterSizes[i] = 0;\n        }\n        for (var i = 0; i < points.length; i = i + 1) {\n            sumX[points.cluster] = sumX[points.cluster] + points.x;\n            sumY[points.cluster] = sumY[points.cluster] + points.y;\n            clusterSizes[points.cluster] = clusterSizes[points.cluster] + 1;\n        }\n        for (var i = 0; i < means.length; i = i + 1) {\n            if (clusterSizes != 0) {\n                means[i].x = sumX[i] / clusterSizes[i];\n                means[i].y = sumY[i] / clusterSizes[i];\n            } else {\n                means.x = Math.floor(Math.random() * 320);\n                means.y = Math.floor(Math.random() * 480);\n            }\n        }\n        loopCount = loopCount + 1;\n        if (loopCount > MAX_LOOP_COUNT) {\n            converged = true;\n        }\n    }\n}\n\nfunction hash(booga) {\n    if (booga == undefined) return undefined;\n    return "point" + booga.x + "_" + booga.y;\n}\n\nfunction reset() {\n    means = new Array();\n    points = new Array();\n    distances = {};\n    clusterContents = new Array();\n    for (var i = 0; i < COLORS.length; i = i + 1) {\n        mean = {};\n        mean.x = Math.floor(Math.random() * 320);\n        mean.y = Math.floor(Math.random() * 480);\n        means[i] = mean;\n        clusterContents[i] = new Array();\n    }\n    for (var i = 0; i < POINT_COUNT; i = i + 1) {\n        point = {};\n        point.x = Math.floor(Math.random() * 320);\n        point.y = Math.floor(Math.random() * 480);\n        points[i] = point;\n        distances[hash(point)] = 999999999999999999;\n    }\n}\n\nfunction draw() {\n    reset();\n    var clusterStart = (new Date()).getTime();\n    cluster();\n    var clusterDuration = (new Date()).getTime() - clusterStart;\n\n    var canvas = document.getElementById("kmeans");\n    if (!canvas.getContext) return;\n    var ctx = canvas.getContext("2d");\n    \n    var mean;\n    var curPoints;\n    var point;\n    var numCurPoints = 0;\n    var i = 0;\n    var j = 0;\n    var start = (new Date()).getTime();\n    ctx.fillStyle = "rgb(0,0,0)";\n    ctx.fillRect(0, 0, 320, 480);\n    for (j = 0; j < points.length; j = j + 1) {\n        point = points[j];\n        ctx.fillStyle = COLORS[point.cluster];\n        ctx.fillRect(point.x, point.y, 1, 1);\n    }\n    var duration = (new Date()).getTime() - start;\n\n    var div = document.getElementById("times");\n    div.appendChild(document.createTextNode("" + duration + " " + clusterDuration));\n}'
  });

  Algorithms.insert({
    title: "SMA example",
    body: "function simple_moving_averager(period) {\n    var nums = [];\n    return function(num) {\n        nums.push(num);\n        if (nums.length > period)\n            nums.splice(0,1);  // remove the first element of the array\n        var sum = 0;\n        for (var i in nums)\n            sum += nums[i];\n        var n = period;\n        if (nums.length < period)\n            n = nums.length;\n        return(sum/n);\n    }\n}"
  });

}


