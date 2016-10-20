var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../../config');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter API Viewer' });
});



router.get('/search/tweets', function(req, res, next){
  var requestParams = require('./requestParams'); 
  res.render('twitter-api/searchTweets', {title: 'Search Tweets', params: requestParams});
});



function getAccessToken(callback){

  var authorization = {
    consumerKey : config.twitter.consumer_key,
    consumerSecret : config.twitter.consumer_secret,
    bearerTokenCredentials : config.twitter.consumer_key + ':' + config.twitter.consumer_secret,
  }

  var encoding = new Buffer(authorization.bearerTokenCredentials).toString('base64');


  var options = {
    method: 'POST',
    uri:'https://api.twitter.com/oauth2/token',
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
      "Authorization": 'Basic ' + encoding 
    },
    body: 'grant_type=client_credentials'
  };

  request(options, function(error, response, body){
    if(error) {
      console.log(error);
      callback(error);
    }

    if(response && response.statusCode == 200) {
      callback(response);
    } 
  });

}


function getTweets( accessToken, query, callback){
  var options = {
    method: 'GET',
    uri: 'https://api.twitter.com/1.1/search/tweets.json?',
    headers: {
      'Authorization': 'Bearer ' + accessToken 
    }
  };

  for( var key in query){
    if(query.hasOwnProperty(key) && query[key]){
      //check to see if we have to put & for additional parameters, kind've sloppy

      if(options.uri.indexOf('&') > -1){
        options.uri += "&" + key + "=" + encodeURIComponent(query[key]); 
      } else {
        options.uri +=  key + "=" + encodeURIComponent(query[key]); 
      }
    }
  }

  console.log(options);
  request(options, function(error, response, body){

    if(error) {
      console.log(error);
      callback(error);
    }
    
    if(response ) {
      callback(response); 
    }
  });


}


router.post('/search/tweets', function(req, res, next){

  getAccessToken(function(response){
    console.log(response);
    getTweets(JSON.parse(response.body).access_token, req.body, function(tweets){
      console.log(tweets);
      res.render('twitter-api/viewTweets', {'placeholder': JSON.parse(tweets.body).statuses});
    });
  });

});


module.exports = router;
