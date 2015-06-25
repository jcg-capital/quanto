/* ---------------------------------------------------- +/

## Server Router ##

Server-side Router.

/+ ---------------------------------------------------- */

// Config
// Router.use(Iron.Router.bodyParser.json({
//     limit: "100mb"
//   }));
Router.map(function() {
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