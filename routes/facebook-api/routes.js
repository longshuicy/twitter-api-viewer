var express = require('express');
var router = express.Router();
//var request = require('request');

var config = require('../../config');
var FB = require('fb');
FB.options({version:'v2.8'});
FB.setAccessToken(config.fb.access_token); //token need to renew every 60 days!


router.get('/search', function(req, res, next){
  var requestParams = require('./fbSearchParams'); 
  res.render('facebook-api/keywordSearch', {title: 'keyword Search', params: requestParams});
});

router.post('/search', function(req, res, next){
	//console.log(req.body);
	//sloppy solution of query
	var base = 'search?q='+req.body.q+'&type=';
	var query = new Array(null,null,null,null,null,null);
	var i = 0;
	var fbData = new Array();
	
	for (var key in req.body) {
		if (key != 'q'){
			query[i] = base + key;
			i = i+1;
			//console.log(query);
		}
	}
	FB.api('','post',{batch: [{method:'get',relative_url:query[0]},
							  {method:'get',relative_url:query[1]},
							  {method:'get',relative_url:query[2]},
							  {method:'get',relative_url:query[3]},
							  {method:'get',relative_url:query[4]},
							  {method:'get',relative_url:query[5]}]},
						 function(fb) {
											    if(!fb || fb.error) {
        //console.log(!fb ? 'error occurred' : fb.error);
        return;
    }
	else{
		for (var j in fb){
			if (!(JSON.parse(fb[j].body).hasOwnProperty("error"))){
				for (var k in JSON.parse(fb[j].body).data){
					fbData.push(JSON.parse(fb[j].body).data[k]); 
				// pack all the return in a array of {name:..., id:...}
				// kinda sloppy but better to render? need more attention later
				}
			}
			i = i+1;
		}
		//console.log(fbData);
		res.render('facebook-api/viewResults',{'fbData':fbData});									}
		});
});

module.exports = router;
