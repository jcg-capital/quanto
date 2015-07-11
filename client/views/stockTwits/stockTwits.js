Template.stockTwits.rendered = function() {
    var k;
	  var messages = [];
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
        messages = array.data.messages;

      loop = function() {
        for (var i = 0; i < messages.length; i++) {

          setTimeout( function() {
            console.log('in timeout');
            var authorName = messages[i].user.username;
            var twitBody = messages[i].body;
            var timePosted = moment(messages[i].created_at).fromNow();
            Session.set('authorName', messages[i].user.username);
            Session.set('authorName', messages[i].user.username);
            Session.set('twitBody', messages[i].body);
            Session.set('timePosted', timePosted);
          }, 2000);
        }
      };
         
          var $twit = $('<li class="list-group-item">').text(messages[counter].body + "" + timePosted);
          $('.list-group').append($twit);
          counter++;
          if(counter === 30) {
            clearInterval(k);
          }
        
      }
    }
  );
};


Template.stockTwits.events({
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
	  },
	rerender: function () {
		Template.stockTwits.rendered();
		return Session.get('dataStore');
	
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
