require('dotenv').config();
var graph = require('fbgraph');
graph.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
console.log(process.env.FACEBOOK_ACCESS_TOKEN);

/*var searchOptions = {
    q:     "nifty"
  , type:  "post"
};

graph.search(searchOptions, function(err, res) {
  console.log(res); 
});*/

var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};

graph
  .setOptions(options)
  .get("zuck", function(err, res) {
    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
  });
