Template.landingPage.created = function () {
  //
};

Template.landingPage.helpers({
  
  myHelper: function () {
    //
  }

});

Template.landingPage.rendered = function () {
  //
};

Template.landingPage.events({

  'submit': function(e, instance){
    e.preventDefault()

    var tickerSymbol = e.target.searchQuery.value;

    HTTP.call("POST", "quandlquery", query,
      function (error, result) {
        if (!error) {
          console.log('WE GOT SOMETHiNG HEREsfsfsafee3',result);
            var r = JSON.parse(result.content);
        }
      }
    );
  }

});