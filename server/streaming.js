// // Use the OAuth module
// var oauth = Meteor.npmRequire('oauth');

//             // Consumer Key:  inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV  
//             // Consumer Secret:  Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8  
//             // OAuth Token:  QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW  
//             // OAuth Token Secret: y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa  


// // Setup key/secret for authentication and API endpoint URL
// var configuration = {
//   api_url: "https://api.tradeking.com/v1",
//   consumer_key: "inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV",
//   consumer_secret: "Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8",
//   access_token: "QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW",
//   access_secret: "y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa"
// };

// // Setup the OAuth Consumer
// var tradeking_consumer = new oauth.OAuth(
//   "https://developers.tradeking.com/oauth/request_token",
//   "https://developers.tradeking.com/oauth/access_token",
//   configuration.consumer_key,
//   configuration.consumer_secret,
//   "1.0",
//   "http://mywebsite.com/tradeking/callback",
//   "HMAC-SHA1");

// // Make a request to the API endpoint
// // Manually update the access token/secret as parameters.  Typically this would be done through an OAuth callback when 
// // authenticating other users.
// tradeking_consumer.get(configuration.api_url+'/accounts.json', configuration.access_token, configuration.access_secret,
//   function(error, data, response) {
//     // Parse the JSON data
//     account_data = JSON.parse(data);
// //     // Display the response
// //     console.log(account_data.response);
// //   }
// // );


// // STREAMING

// // Use the OAuth module

// var OAuth = Meteor.npmRequire('oauth').OAuth;


// //             // Consumer Key:  inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV  
// //             // Consumer Secret:  Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8  
// //             // OAuth Token:  QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW  
// //             // OAuth Token Secret: y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa 

// var credentials = {
//     consumer_key: "inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV",
//     consumer_secret: "Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8",
//     access_token: "QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW",
//     access_secret: "y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa"
// };

// // var configuration = {
// //   api_url: "https://api.tradeking.com/v1",
// //   consumer_key: "inpVE8MyjzoBIXJggdJzQFUrxhF1chCuB3jKdmVV",
// //   consumer_secret: "Vu1hXwpw2bJYiVF0hEUrNqbNRkJPDXRm00ePV5E8",
// //   access_token: "QveHaer95pgNTlwG3kGxLVEZwAobPH3LbN06sUWW",
// //   access_secret: "y4KmDsJOWpYTOYk3xHT5YEfeevOOJxw6ui54DLUa"
// // };

// var oa = new OAuth(null, null, credentials.consumer_key, credentials.consumer_secret, "1.0", null, "HMAC-SHA1");

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

// var tradeking_consumer = new OAuth(
//   "https://developers.tradeking.com/oauth/request_token",
//   "https://developers.tradeking.com/oauth/access_token",
//   configuration.consumer_key,
//   configuration.consumer_secret,
//   "1.0",
//   "http://mywebsite.com/tradeking/callback",
//   "HMAC-SHA1");

// Make a request to the API endpoint
// Manually update the access token/secret as parameters.  Typically this would be done through an OAuth callback when 
// authenticating other users.

// tradeking_consumer.get(configuration.api_url+'/accounts.json', configuration.access_token, configuration.access_secret,
//   function(error, data, response) {
//     // Parse the JSON data
//     account_data = JSON.parse(data);
//     // Display the response
//     console.log('account data response', account_data.response);
//   }
// );


