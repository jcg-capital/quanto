
Template.textEditor.rendered = function () {
  // Gets clonedAlgo or sets default
  var algo = Session.get('clonedAlgo') || '/* Below is an example algorithm that uses a simple moving average\nto generate a buy signal and then sell once a twelve percent\nreturn has been detected. */\n\n/* Click graph to see the visualization of this algorithm and generate an\nequity analysis graph to see how well the algorithm performed. */\n \n\nvar sma = function(days) {\n    return function(arr){\n        var transformed = arr.map(function(c,i,a){\n            if (i < days -1 ){\n                return null\n            } else {\n                var s = a.slice(i, i + days)\n                var sum = s.reduce(function(p,c){\n                    return p + c\n                })\n                return sum / days             \n            }\n        })\n        return transformed\n    }\n}\n\nvar drawBuy = function(i, count, x){\n    $chart.xAxis[0].addPlotLine({\n        value: x,\n        color: "red",\n        width: 2,\n        id: count\n    });    \n}\nvar drawSell = function(i, count, x){\n    $chart.xAxis[0].addPlotLine({\n        value: x,\n        color: "green",\n        width: 2,\n        id: count\n    });\n}\n\nvar buySignal = function(price, account, stocksymbol, movingAvg){\n    if (account.buyPower >= price && price < movingAvg){\n        return true\n    } else {\n        return false\n    }\n}\n\nvar sellSignal = function(currentPrice, account, stocksymbol){\n    if (!account.assets[stocksymbol]) return false\n    console.log((currentPrice * 1.12), "is great than", (account.assets[stocksymbol].price),(currentPrice * 1.12) > (account.assets[stocksymbol].price))\n    if ((currentPrice * 1.12) > (account.assets[stocksymbol].price)) {\n        return true\n    } else {\n        return false\n    }\n}\n\nvar buy = function(currentPrice, account, stocksymbol){\n    var qty = account.buyPower / currentPrice\n    var prevBuyPower =  account.buyPower\n    account.buyPower = prevBuyPower - ( qty * currentPrice )\n    account.assets[stocksymbol] = {\n        stockSymbol: stockSymbol,\n        qty: qty,\n        price: currentPrice\n    }\n    //console.log("BUY: ", account, "buyPrice: ", currentPrice)\n    return account\n}\n\nvar sell = function(currentPrice, account, stocksymbol){\n    // given the current price\n    var asset = account.assets[stockSymbol]\n    // find the current amount of stock on hand\n    var qty = asset.qty\n    var originalPrice = asset.price\n    // adjust the buypower of the account\n    account.buyPower = account.buyPower + ( account.assets[stockSymbol].qty * currentPrice )\n    delete account.assets[stocksymbol]\n    //console.log("SELL: ", account, "sellPrice: ", currentPrice, "originalPrice: ", originalPrice, "SOLDFOR: ",( qty * currentPrice ))\n    return account\n}\n\nvar $chart = $("div#container-area").highcharts()\n\nvar count = 0\nvar account = {\n    //balance: 0,\n    buyPower: 100000,\n    assets: {}\n}\n\n\n// // return the nearest range selector values\n// var $chart = $("div#container-area").highcharts(),\n//     max = $chart.xAxis[0].getExtremes().max,\n//     min = $chart.xAxis[0].getExtremes().min,\n//     xData = $chart.series[0].xData\n// var ids = xData.map(function(c,i,a){\n//     debugger\n//     if (c <= max && c >= min){\n//         return i\n//     } \n// })\n// ids[0]\n// ids[ids.length - 1]\nvar fromPoint = 210\nvar toPoint = 300\n\nvar xData = $chart.series[0].xData.slice(fromPoint, toPoint)\nvar stockSymbol = Session.get("dataStore").code\nvar sma = sma(28)\nvar movingAvg = sma($chart.series[0].yData.slice(fromPoint, toPoint).map(function(c,i,a){return c[3]}))\n\nvar options = {\n    title: {\n        text: "Equity",\n    },\n    subtitle: {\n        text: "Overtime",\n    },\n    xAxis: {\n        title: {\n            text: "Sell Point",\n        }\n    },\n    yAxis: {\n        title: {\n            text: "Equity"\n        },\n        plotLines: [{\n            value: 0,\n            width: 1,\n            color: "#808080"\n        }]\n    },\n    tooltip: {\n        valueSuffix: "$"\n    },\n    legend: {\n        layout: "vertical",\n        align: "right",\n        verticalAlign: "middle",\n        borderWidth: 0\n    },\n    series: [{}]\n}\n$("#results-area").highcharts(options)\n$chart.series[0].yData.forEach(function(c,i,a){\n    var x = xData[i]\n    var price = c[3]\n    if (buySignal(price, account, stockSymbol, movingAvg[i])){\n        drawBuy(i, ++count, x)\n        account = buy(price, account, stockSymbol)\n        console.log("After BUY: ", account)\n    } else if (sellSignal(price, account, stockSymbol)){\n        drawSell(i, ++count, x)\n        account = sell(price, account, stockSymbol)\n        console.log("After SELL: ", account)\n        $("#results-area").highcharts().series[0].addPoint(account.buyPower)\n    }\n})\n\n\nalert(JSON.stringify(account))';
  var options = {
      theme:"monokai",
      mode:"javascript",
  };
  var ace = AceEditor.instance("text-editor-id", options, function(editor){
    console.log(editor);
    editor.insert(algo);
  });
};

Template.textEditor.events({
  'click #algo-tab': function(e, instance){
    // render the algo tab
    e.preventDefault();
    Template.textEditor.rendered()
  },
  'click #graph-data': function(e, instance){
    e.preventDefault();
    var t = AceEditor.instance('#text-editor-id')
    // Run code client side in webworker. TODO: #82
    var code = t.getSession().getValue().replace(/\'/g, '\"')
    eval(code);
  },
  'click #save-algo': function(e, instance){
    e.preventDefault();
    var title = prompt('Name of new algo')
    var t = AceEditor.instance('#text-editor-id')
    var code = t.getSession().getValue().replace(/\'/g, '\"')
    Algorithms.insert({title: title, body: code })
    alert('Saved code: '+code)
  }
});

