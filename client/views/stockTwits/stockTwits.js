Template.stockTwits.rendered = function() {
    var symbol;
    if (Session.get('dataStore')) {
      symbol = Session.get('dataStore').code;
    }
    else {
      symbol = 'NFLX';
    }
    Session.set('stockTwitSymbol', symbol);
    var stockTwitSymbol = {
        data: {
          'stockTwit': symbol,
      }
    };
    var lastTwitId = 0;
    HTTP.call('POST', "stockTwitsquery", stockTwitSymbol, function(error, result) {
      if (error) {
        console.log(error);
      }
      else if (!error) {
        var counter = 1;
        var array = JSON.parse(result.content);
        var messages = array.data.messages;
        var authorName = messages[counter].user.username;
        var twitBody = messages[counter].body;
        var timePosted = moment(messages[counter].created_at).fromNow();
        var k = setInterval(function(){
          Session.set('authorName', messages[counter].user.username);
          Session.set('authorName', messages[counter].user.username);
          Session.set('twitBody', messages[counter].body);
          Session.set('timePosted', timePosted);
          var $twit = $('<li class="list-group-item">').text(messages[counter].body + "" + timePosted);
          $('.list-group').append($twit);
          counter++;
          if(counter === 30) {
            clearInterval(k);
          }
        }, 4000);
      }
    }
  );
};


Template.stockTwits.events({
  'click a#algo-tab.inner-tab': function (event) {
    var symbol = Session.get('dataStore').code;
    Session.set('stockTwitSymbol', symbol);
    var stockTwitSymbol = {
      data: {
        'stockTwit': symbol,
        // formatObject : { format: "json" } // csv, xml, json
      }
  	};
    var lastTwitId = 0;
    HTTP.call('POST', "stockTwitsquery", stockTwitSymbol, function(error, result) {
      if (error) {
        console.log(error);
      }
      else if (!error) {
        var array = JSON.parse(result.content);
        var messages = array.data.messages;
        var authorName = messages[counter].user.username;
        var twitBody = messages[counter].body;
        var counter = 1;
        var timePosted = moment(messages[counter].created_at).fromNow();
        var k = setInterval(function(){
          Session.set('authorName', messages[counter].user.username);
          Session.set('twitBody', messages[counter].body);
          Session.set('timePosted', timePosted);
        	var $twit = $('<li class="list-group-item">').text(messages[counter].body + "" + timePosted);
          $('.list-group').append($twit);
          counter++;
          if(counter === 6) {
            clearInterval(k);
          }
        }, 3000);
      }
    });
	}
});


Template.stockTwits.helpers({
  authorName: function () {
      return Session.get('authorName');
    },
  twitBody: function () {
      return Session.get('twitBody');
    },
  timePosted: function () {
      return Session.get('timePosted');
    }
});