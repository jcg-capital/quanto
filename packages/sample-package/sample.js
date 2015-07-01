// var OAuth = require('oauth').OAuth;

// var credentials = {
//     consumer_key: "inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV",
//     consumer_secret: "Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8",
//     access_token: "QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW",
//     access_secret: "y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa"
// };

// var oa = new OAuth(null, null, credentials.consumer_key, credentials.consumer_secret, "1.0", null, "HMAC-SHA1");
// var request = oa.get("https://stream.tradeking.com/v1/market/quotes?symbols=AAPL", 
// credentials.access_token, 
// credentials.access_secret);

// request.on('response', function (response) {
//     response.setEncoding('utf8');
//     response.on('data', function(data) {
//         console.log(data);
//     });
// });
// request.end();

// Use the OAuth module
var oauth = require('oauth');

// Setup key/secret for authentication and API endpoint URL
var configuration = {
  api_url: "https://api.tradeking.com/v1",
  consumer_key: "0cc175b9c0f1b6a831c399e269772661",
  consumer_secret: "ff2513194e75315625628304c9eb66e8",
  access_token: "150a96573adf12b21dab621e85497e6e",
  access_secret: "5c7b57d450a71d378a5eda991f809e56"
}

// Setup the OAuth Consumer
var tradeking_consumer = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  configuration.consumer_key,
  configuration.consumer_secret,
  "1.0",
  "http://mywebsite.com/tradeking/callback",
  "HMAC-SHA1");

// Make a request to the API endpoint
// Manually update the access token/secret as parameters.  Typically this would be done through an OAuth callback when 
// authenticating other users.
tradeking_consumer.get(configuration.api_url+'/accounts.json', configuration.access_token, configuration.access_secret,
  function(error, data, response) {
    // Parse the JSON data
    account_data = JSON.parse(data);
    // Display the response
    console.log(account_data.response);
  }
);