var config = {};

config.twitter = {};

config.twitter.consumer_key    =  process.env.TWITTER_CONSUMER_KEY    || 'key';
config.twitter.consumer_secret =  process.env.TWITTER_CONSUMER_SECRET || 'password';


module.exports = config;
