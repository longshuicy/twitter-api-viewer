//fbgraph test
require('dotenv').config();
var graph = require('fbgraph');
//graph.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
short_lived_token = 'EAAFciGEoKykBAKP1wmCZCkZCC3r5n6WKq1bn\
Kohb12B6F2v1jid8AvZBpKIXoJZASI68qaDy2R8F6ECNZAjigebqbeytDT\
870ZA47sYnQAxX3G5GM5SWqIaMCqtVB2ALJXlgMuZAiCndMp0j48i81v\
kpSaZAe57yi4RN93A0NeZA4IZAOWZAocYh7tIj0OBBHqgCPIZD'


// extending static access token
/*    graph.extendAccessToken({
        "client_id":      process.env.FACEBOOK_API_ID
      , "client_secret":  process.env.FACEBOOK_API_SECRET
    }, function (err, facebookRes) {
       console.log(facebookRes);
    });*/

    // extending specific access token
console.log(process.env.FACEBOOK_API_ID);
graph.extendAccessToken({
	"access_token":   short_lived_token,
	"client_id":      process.env.FACEBOOK_APP_ID,
	"client_secret":  process.env.FACEBOOK_APP_SECRET
    }, function (err, facebookRes) {
       console.log(facebookRes);
});

/*var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};

graph
  .setOptions(options)
  .get("zuck", function(err, res) {
    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
  });*/