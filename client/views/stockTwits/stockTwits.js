Template.stockTwits.rendered = function() {

};


Template.stockTwits.events({
    	'click button.twits.btn.btn-primary': function (event) {
        		console.log('triggered getTwits');
        		//Set default symbol - we may wish to get this from current data store
		        		var symbol = 'AAPL';
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

				        	var counter = 1;
				        	var time = moment(messages[counter].created_at).fromNow();
				        	

									var k = setInterval(function(){
										
									    var $twit = $('<li class="list-group-item">').text(messages[counter].body + "" + time);
									    $('.list-group').append($twit);
									    counter++;
									    if(counter === 6) {
									        clearInterval(k);
									    }
									}, 3000);

					        		console.log('last twit id', lastTwitId);					        		
					        		console.log('message', messages[counter]);
					        		console.log('message body', messages[counter].body);
					        		console.log('name', messages[counter].user.username);
		        			}
		      			}
					);
				}
			});				
    

      		// (function(index, $twit) {
			        		// setTimeout(function($twit) { 	 }, 3000*i);
			        		// })(i, $twit);

					        // var $result = $('<div class="search-result" style="background-color: #999;color: #EEE;margin: 3px">');
					        // var $c = $('<div>').text(c.name).append("<p class=" + "symbol" +">" + c.symbol + "</p>");
					        // $result.append([$c]);
					        // $('#search-results').append($result);