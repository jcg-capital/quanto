/* ---------------------------------------------------- +/

## Server Router ##

Server-side Router.

/+ ---------------------------------------------------- */

  var TKrequestObject;

  Streamy.on('stop live feed', function(data) {         
     console.log('ending live feed');
     TKrequestObject.destroy();                            
  });

  Streamy.on('setCurrentTickerSymbol', function(d){
    console.log('server received currentTickerSymbol');
    currentTickerSymbol = d.data;
  });

Router.map(function() {
    //*****************************************//
    // Used to pull stock meta-data from Quandl  
    //*****************************************//
    this.route('quandlmetadata', {
        where: 'server',
        action: function() {
          // GET, POST, PUT, DELETE
          var requestMethod = this.request.method;
          // Data from a POST request
          var requestData = this.request.body;
          var response = this.response;
          // Setup Quandl api connection
          var Quandl = Meteor.npmRequire('quandl');
          var quandl = new Quandl({
              auth_token: 'vtyjDff63Y15eQuxnSGK',
              api_version: 1,
          });
          //*****************************************//
          // FIXME: pass parameters along? possibly useful for 
          // chart formatting?
          //*****************************************//
          quandl.metadata("ZILLOW", "ZIP_ALLHOMES_15235", function(err, data){
            if(err){
              console.log('quandlStock : ERROR',err);
              response.end(JSON.stringify(error));
            }
            response.end(data);
          });
        }
    });

    //*****************************************//
    //
    //*****************************************//
    this.route('quandlquery', {
        where: 'server',
        action: function() {
          // GET, POST, PUT, DELETE
          var requestMethod = this.request.method;
          // Data from a POST request
          var requestData = this.request.body;
          var response = this.response;
          // Setup Quandl api connection
          var Quandl = Meteor.npmRequire('quandl');
          var quandl = new Quandl({
              auth_token: 'vtyjDff63Y15eQuxnSGK',
              api_version: 1,
          });
          quandl.dataset(requestData.code, requestData.options, function(err, data){
            if(err){
              console.log('quandlStock : ERROR',err);
            }
            response.end(data);
          });
        }
    });


    //*****************************************//
    // Used to pull stock meta-data from Quandl  
    //*****************************************//
    this.route('yahooQuery', {
      where: 'server',
      action: function() {
          var requestMethod = this.request.method;
          // Data from a POST request
          var requestData = this.request.body;
          var response = this.response;
          var symbolLookup = 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=' + '' + requestData.query + '' + '&callback=YAHOO.Finance.SymbolSuggest.ssCallback';
        HTTP.call("POST", symbolLookup, null, function (error, result) {
          if (error) {
            console.log('ERROR', error);
            response.end(JSON.stringify(error));
          }
          response.end(JSON.stringify(result.content));
        });
      }
    });
    
    //*****************************************//
    // Used to pull 10 most recent stock twits 
    // related to a ticker symbol
    //*****************************************//
    this.route('stockTwitsquery', {
        where: 'server',
        action: function() {
          var requestMethod = this.request.method;
          // Data from a POST request
          var requestData = this.request.body;
          var response = this.response;
          var symbolLookup = 'https://api.stocktwits.com/api/2/streams/symbol/' + requestData.stockTwit + '.json?limit=10';
          HTTP.call("GET", symbolLookup, null, function (error, result) {
            if (error) {
              console.log('error from stockTwit query', error);
            }
            if (!error) {
              response.end(JSON.stringify(result));
            }
          });
        }
    });


var OAuth = Meteor.npmRequire('oauth').OAuth;

  this.route('liveQuery', {
    where: 'server',
    action: function() {
      var credentials = {
            consumer_key: "inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV",
            consumer_secret: "Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8",
            access_token: "QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW",
            access_secret: "y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa"
      };

      var oa = new OAuth(null, null, credentials.consumer_key, credentials.consumer_secret, "1.0", null, "HMAC-SHA1");
      var clientRequestMethod = this.request.method;
      // Data from a POST request
      var clientRequestData = this.request.body;
      var clientResponse = this.response;
      var symbolRequested;
      console.log('Current ticker symbol is:', currentTickerSymbol);
      TKrequestObject = oa.get("https://stream.tradeking.com/v1/market/quotes.json?symbols=" + "" + currentTickerSymbol + "",
          credentials.access_token, 
          credentials.access_secret);

      TKrequestObject.on('response', function (response) {
        console.log('streaming has begun');
        response.setEncoding('utf8');
        response.on('data', function(data) {
        // socketConnection.pipe(data)
          Streamy.broadcast('liveDataInitiated', {'data' : data} );
          console.log(data);
        });
      });
      TKrequestObject.end();
    }
  });
});


  
