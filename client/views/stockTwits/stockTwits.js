Template.stockTwits.rendered = function() {
// Set default symbol to NFLX if dataStore does not exist
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
// Make stockTwit API call
    HTTP.call('POST', "stockTwitsquery", stockTwitSymbol, function(error, result) {
      if (error) {
        console.log(error);
      }
      else if (!error) {
// Set appropriate session variables for use in reactive template
        var counter = 1;
        var array = JSON.parse(result.content);
        var messages = array.data.messages;
        var authorName = messages[counter].user.username;
        var twitBody = messages[counter].body;
        var timePosted = moment(messages[counter].created_at).fromNow();
// For now, we are simply looping through an array of latest twits
        var k = setInterval(function(){
          Session.set('authorName', messages[counter].user.username);
          Session.set('authorName', messages[counter].user.username);
          Session.set('twitBody', messages[counter].body);
          Session.set('timePosted', timePosted);
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
