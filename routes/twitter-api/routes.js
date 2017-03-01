var express = require('express');
var router = express.Router();
//var request = require('request');

var config = require('../../config');
var Twitter = require('twitter');
var client = new Twitter({
	consumer_key:config.twitter.consumer_key,
	consumer_secret:config.twitter.consumer_secret,
	access_token_key:config.twitter.access_token_key,
	access_token_secret:config.twitter.access_token_secret
});


router.get('/search', function(req, res, next){
  var requestParams = require('./twitterSearchParams'); 
  res.render('twitter-api/searchTweets', {title: 'keyword Search', params: requestParams});
});

router.post('/search', function(req, res, next){
	console.log(req.body);
	client.get('search/tweets',req.body,function(error,tweets,response){
		if(error) throw JSON.stringify(error);
		res.render('twitter-api/viewTweets',{'tweets':tweets.statuses});
	});
});

module.exports = router;
