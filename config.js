var config = {};

config.twitter = {};

config.twitter.consumer_key    =  process.env.TWITTER_CONSUMER_KEY    || 'key';
config.twitter.consumer_secret =  process.env.TWITTER_CONSUMER_SECRET || 'password';
config.twitter.access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY;
config.twitter.access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
//console.log(config.twitter.consumer_key)
//write environment variables in .env file

module.exports = config;
