       						var lastPrice1;
                            var timestamp1;
                            var dateTime;
                            var bid;
                            var ask;


   Streamy.on('hello', function(d) {
                            console.log('streamy triggered');
                            var data = JSON.parse(d.data); // Will print 'world!'
                            
                       

                            if (data.trade) {
                              console.log('trade occured');
                               var trade = data.trade;
                               lastPrice1 = data.trade.last;
                               var volume = data.trade.cvol;
                               timestamp1 = data.trade.timestamp;
                               dateTime = data.trade.datatime;

                               var tradeData = {
                                    'lastPrice': lastPrice1,
                                    'timestamp': timestamp1
                               };
                            }
                     
                            Session.set('lastPrice', lastPrice1);
   						   
                           
                               if (data.quote) {
                              console.log('quote occured');
                                 var quote = data.quote;
                                 bid = data.quote.bid;
                                 ask = data.quote.ask;
                                 timestamp1 = data.quote.timestamp;

                              	}

                            Session.set('lastBid', bid);
                            Session.set('lastAsk', ask);

                     	});
                   

// var getPrice = function () {
//   return Session.get('lastPrice');
// };

// Tracker.autorun(function () {
//   var count = Session.get('lastPrice');
//   console.log('Autorun is auto-running!');
//   console.log(count);
// });

Template.lastPrices.helpers({
	lastPrice: function () {
	    console.log('getting lastPrice:');

	    return Session.get('lastPrice');
	  },
	lastAsk: function () {
	    console.log('getting kastAsk:');
	    return Session.get('lastAsk');
	  },
	lastBid: function () {
	    console.log('getting lastBid:');
	    return Session.get('lastBid');
	  }
});
                    
