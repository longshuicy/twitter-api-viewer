//combined fb + twitter keywordSearch routes
var express = require('express');
var router = express.Router();
var config = require('../../config');
var storeJson = require('../../connectDB');

router.get('/search', function(req, res, next){
  var requestParams = require('./SearchParams'); 
  res.render('combined-api/keywordSearch', {title: 'keyword Search', params: requestParams});
});

router.post('/search', function(req, res, next){
	//console.log(req.body);
	//twitter
	if ('twitter' in req.body){
		//console.log('twitter');
		twtClient(req);
	}
	
	//facebook
	if('facebook' in req.body){
		//console.log('facebook');
		fbClient(req);	
	}
	
});

//twitter
var twtClient = function(req){
	var Twitter = require('twitter');
		var client = new Twitter({
			consumer_key:config.twitter.consumer_key,
			consumer_secret:config.twitter.consumer_secret,
			access_token_key:config.twitter.access_token_key,
			access_token_secret:config.twitter.access_token_secret
		})
		// construct twitter query
		var query = {};
		for (var key in req.body){
			//console.log(key);
			if (['q','geocode','lang','count','until'].includes(key)){
				query[key] = req.body[key];
			}
		}
		//console.log(query);
		client.get('search/tweets',query,function(error,tweets,response){
			if(error) throw JSON.stringify(error);
			//console.log(tweets.statuses);
			storeJson('twitter',tweets.statuses);
			// connect to a mongo db a dump the return json into it;
			//res.render('twitter-api/viewTweets',{'tweets':tweets.statuses});
		});
}

//facebook
var fbClient = function(req){
	var base = 'search?q='+req.body['q']+'&type=';
	for (var key in req.body) {
		if (['user','page','group','event','place','placetopic'].includes(key)){
			var query=base + key
			//console.log(query);
			
			// fire a Fb query
			var FB = require('fb');
			FB.options({version:'v2.8'});
			FB.setAccessToken(config.fb.access_token); //token need to renew every 60 days!
			FB.api(query,function(res) {
				if(!res || res.error) {
					console.log(!res ? 'error occurred' : res.error);
					return;
				}else{
					//console.log(res.data);
					storeJson('facebook',res.data);
					//connect to a mongo db and dump the return json into it
				}
			});
		}
	}
}
	
module.exports = router;
