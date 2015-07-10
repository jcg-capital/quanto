/* ---------------------------------------------------- +/

## Server Router ##

Server-side Router.

/+ ---------------------------------------------------- */

// Config
// Router.use(Iron.Router.bodyParser.json({
//     limit: "100mb"
//   }));

var TKrequestObject;

          Streamy.on('goodbye', function(data) {         
             console.log('saying goodbye');
             // console.log('tk request', TKrequestObject);
             TKrequestObject.destroy();                            
          });


Router.map(function() {



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
            }
            response.end(data);
          });
        }
    });


this.route('yahooQuery', {
  where: 'server',
  action: function() {
      var requestMethod = this.request.method;
      // Data from a POST request
      var requestData = this.request.body;
      var response = this.response;
      var symbolLookup = 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=' + '' + requestData.query + '' + '&callback=YAHOO.Finance.SymbolSuggest.ssCallback';
    HTTP.call("POST", symbolLookup, null,
          function (error, result) {
            if (error) {
              console.log('ERROR', error);
            }
            if (!error) {
              console.log('Yahoo SYMBOL LookUp RESULTS', result);
              response.end(JSON.stringify(result.content));
            }
          }
      );
  }
});

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

var OAuth = Meteor.npmRequire('oauth').OAuth;


//             // Consumer Key:  inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV  
//             // Consumer Secret:  Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8  
//             // OAuth Token:  QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW  
//             // OAuth Token Secret: y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa 

// var credentials = {
//     consumer_key: "inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV",
//     consumer_secret: "Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8",
//     access_token: "QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW",
//     access_secret: "y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa"
// };

// var request = oa.get("https://stream.tradeking.com/v1/market/quotes?symbols=AAPL", 
// credentials.access_token, 
// credentials.access_secret);

// request.on('response', function (response) {
//   console.log('streaming has begun');
//     response.setEncoding('utf8');
//     response.on('data', function(data) {
//         console.log(data);
//     });
// });
// request.end();




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
              console.log('clientrequestdata', clientRequestData);
              var clientResponse = this.response;
              // var liveDataURI = 'https://stream.tradeking.com/v1/market/quotes.json??symbols=AAPL';
              var symbolRequested;
              TKrequestObject = oa.get("https://stream.tradeking.com/v1/market/quotes.json?symbols=AAPL",
                  credentials.access_token, 
                  credentials.access_secret);


                      TKrequestObject.on('response', function (response) {

                          console.log('streaming has begun');
                          response.setEncoding('utf8');
                          response.on('data', function(data) {
                            // socketConnection.pipe(data)
                            Streamy.broadcast('hello', {'data' : data} );
                            console.log(data);

                            });

                    
                          });



                      TKrequestObject.end();

                        
                      


       
    }
  });


            // HTTP.call("GET", TKrequestObject, null,
            //       function (error, result, TKrequestObject) {
            //          console.log('tk', TKrequestObject);
            //         if (error) {
            //           console.log('ERROR - server/router', error);
            //         }
            //         if (!error) {

            //           console.log('liveQueryResult', result);



            //           response.end(JSON.stringify(result.content));
            //         }
            //       }
            //   );
            // clientResponse.end();
    

});


  
