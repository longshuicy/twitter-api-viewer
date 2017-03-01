require('dotenv').config();
var FB=require('fb');
FB.options({version:'v2.8'});

// get extended token
short_lived_token = 'EAAFciGEoKykBAKP1wmCZCkZCC3r5n6WKq1bn\
Kohb12B6F2v1jid8AvZBpKIXoJZASI68qaDy2R8F6ECNZAjigebqbeytDT\
870ZA47sYnQAxX3G5GM5SWqIaMCqtVB2ALJXlgMuZAiCndMp0j48i81v\
kpSaZAe57yi4RN93A0NeZA4IZAOWZAocYh7tIj0OBBHqgCPIZD'

console.log(process.env.FACEBOOK_APP_ID);

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
});
