//test fb library
require('dotenv').config();
var FB=require('fb');
FB.options({version:'v2.8'});
FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);

// get extended token
/*short_lived_token = 'EAAFciGEoKykBADvUGE79xV5r7yzQebNJGhXOtDe7Esm1ok0rFy83fcM1jXOoXjkuAeRsoSJQUWlbT3lIEO41usum9c8PkxfSIZAZBfgQhNgvv5WofFstPBKXCZBxCcfeZAIzNRSe2ZBOPxq1xfFEF2s0sXu2xiKZA1X84k3Gv3rqkKVYHCqE9wtxgFXRLZBF5MZD';
FB.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    grant_type: 'fb_exchange_token',
    fb_exchange_token: short_lived_token
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
 
    var accessToken = res.access_token;
    var expires = res.expires ? res.expires : 0;
	//process.env['FACEBOOK_ACCESS_TOKEN'] = accessToken;
	console.log(accessToken);
});*/

// post
/*var body = 'testing NODE JS FB library';
FB.api('me/feed', 'post', { message: body }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});*/

// delete
/*var postId = '1069211163225315_1069216149891483';
FB.api(postId, 'delete', function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post was deleted');
});*/

// get
/*FB.api('4', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  console.log(res.id);
  console.log(res.name);
});*/

FB.api('fql', { q: 'SELECT uid FROM user WHERE uid=me()' }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log(res.data);
});