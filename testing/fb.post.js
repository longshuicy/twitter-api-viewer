require('dotenv').config();
var FB=require('fb');
FB.options({version:'v2.8'});
FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);

// post
var body = 'testing NODE JS FB library EXTENDED ACCESS TOKEN';
FB.api('me/feed', 'post', { message: body }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});