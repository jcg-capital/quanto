/* ---------------------------------------------------- +/

## Server Router ##

Server-side Router.

/+ ---------------------------------------------------- */

// Config
// Router.use(Iron.Router.bodyParser.json({
//     limit: "100mb"
//   }));



Router.map(function() {
    this.route('quandlmetadata', {
        where: 'server',
        action: function() {
          // GET, POST, PUT, DELETE
          var requestMethod = this.request.method;
          // Data from a POST request
          var requestData = this.request.body;
          var response = this.response
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
      var symbolLookup = 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=' + '' + requestData.query + '' + '&callback=YAHOO.Finance.SymbolSuggest.ssCallback'
    HTTP.call("POST", symbolLookup, null,
          function (error, result) {
            if (error) {
              console.log('ERROR', error);
            }
            if (!error) {
              console.log('SEARCH RESULTS', result);
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
          var response = this.response
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
});

