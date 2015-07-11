Template.equityView.created = function () {
  //
};

Template.equityView.helpers({
  myHelper: function () {
  //
  }
});

Template.equityView.rendered = function () {
  var options = {
    title: {
      text: "Equity",
    },
    subtitle: {
      text: "Overtime",
    },
    xAxis: {
      title: {
        text: "Sell Point",
      }
    },
    yAxis: {
      title: {
        text: "Equity"
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: "#808080"
      }]
    },
    tooltip: {
      valueSuffix: "$"
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      borderWidth: 0
    },
    series: [{}]
  };
  $("#results-area").highcharts(options);
};

Template.equityView.events({
  'click': function(e, instance){
  }
});