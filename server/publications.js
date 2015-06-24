/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */

// Publish all algorithms

Meteor.publish('allAlgorithms', function() {
  return Algorithms.find();
});

// Publish a single algorithm

Meteor.publish('singleAlgorithm', function(id) {
  return Algorithms.find(id);
});



Meteor.publish('quandlStock', function(){
	// ***********************************//
	// Example API call to retrieve stock history
	// by a sorted and ranged search query 
	//
	// See https://www.quandl.com/help/api#A-Simple-Example
	// AND https://www.quandl.com/help/api
	// ***********************************//
	var Quandl = require('quandl');
	var quandl = new Quandl({
	    auth_token: config.QUANDL_TOKEN,
	    api_version: 1,
	});
	var code = {
	'source': 'WIKI',
	'table': 'AAPL'
	};
	var options = { 
		column:'4',
		sort_order:'asc',
		collapse:'quarterly',
		trim_start:'2012-01-01',
		trim_end:'2013-12-31'
	};
	quandl.dataset(code, options, function(err, response){
	  if(err){
	    console.log('quandlStock : ERROR',err);
	  }
	  return response
	});
});
