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

  'keyup': function(e, instance){
    e.preventDefault()
    var queryString = e.currentTarget.value;
    var query = {
                  data: {
                    query: queryString,
                    formatObject : { format: "json" } // csv, xml, json
                  } 
                };
    HTTP.call("POST", "quandlsearch", query,
      function (error, result) {
        if (!error) {
          console.log('SEARCH RESULTS',result);
          var r = JSON.parse(result.content);
          $('#search-results').html('');
          r.docs.forEach(function(c,i,a){
            var $result = $('<div style="background-color: #999;color: #EEE;margin: 3px;">')
            var $a = $('<div>').text(c.description);
            var $b = $('<div>').text(c.frequency);
            var $c = $('<div>').text(c.name);
            var $d = $('<div>').text(c.source_code);
            var $e = $('<div>').text(c.source_name);
            var $f = $('<div>').text(c.urlize_name);
            $result.append([$a,$b,$c,$d,$e,$f])
            $('#search-results').append($result);
          })
           // urlize_name: "C-Citigroup-Inc-Common-Stock"
           // description: "Exchange : . Key Statistics"
           // frequency: "daily"
           // name: "C: Citigroup Inc. Common Stock -"
           // source_code: "YAHOO"
           // source_name: "YFinance"
        }
      }
    );
  }

});

