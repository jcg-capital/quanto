Template.landingPage.created = function () {
  //
};

// Here is the positioning data for the node in the landingPage template



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
      transition: { duration: 3500, curve: 'inOutSine' }
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
