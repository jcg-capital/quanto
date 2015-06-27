Template.landingPage.created = function () {
  //
};

// Here is the positioning data for the node in the landingPage template



Template.landingPage.rendered = function () {
  //
};

  Template.landingPage.events({

    'click ': function(e){

    },

    'keyup': function(e, instance){
      e.preventDefault()
      var queryString = e.currentTarget.value;
      console.log(queryString);


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
            r = JSON.parse(r)
            debugger

            // exch: "NYQ"exchDisp: "NYSE"name: "Agilent Technologies Inc."symbol: "A"type: "S"typeDisp: "Equity"


            $('#search-results').html('');
            r.ResultSet.Result.forEach(function(c,i,a){
              console.log(c)
              var $result = $('<div style="background-color: #999;color: #EEE;margin: 3px;">')
               var $c = $('<div>').text(c.name);
              var $a = $('<div>').text(c.symbol);
              $result.append([$c, $a])
              $('#search-results').append($result);
            });
          }
        }
      )
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
]

Session.setDefault('rotation', 0);

Template.landingPage.helpers({
  reactiveRotation: function() {
    return {
      value: ROTATIONS[Session.get('rotation')],
      // value1: ROTATIONS[0],
      // value2: ROTATIONS[1],
      transition: { duration: 3500, curve: 'inOutElastic' }
    }
  },
  nodeSize: "P:0.5; P:0.5; P:0.5",
  nodeAlign: [0.5, 0.5],
  nodeMountPoint: [0.5, 0.5],
  nodeOrigin: [0.55, 0.5]
})

Template.inner.events({
  'click': function(event, tpl) {
    console.log("CLICKED")
    var current = Session.get('rotation');
    // logic to alternate between first and second position in ROTATIONS array
    Session.set('rotation', (current+1) % 2 );
  }
})
