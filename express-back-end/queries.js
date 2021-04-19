const Twit = require('twit');
const needle = require('needle');
require('dotenv').config()

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.AUTH_ACCESS,
  access_token_secret: process.env.AUTH_SECRET,
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});

const headers = {
  Authorization: `Bearer ${process.env.BEARER_TOKEN}`
}

const streamKeyWord = function(searchWord) {
  
  const stream = T.stream('statuses/filter', {
    track: searchWord,
    language: 'en'
  });

  return stream;
}


// Canada: 23424775 United States: 23424977 
const getCurrentCanadaTrends = function() {
  //https://api.twitter.com/1.1/trends/place.json
  return new Promise((resolve, reject) => {
    needle.get('https://api.twitter.com/1.1/trends/place.json?id=23424775', {headers: headers}, function(error, response) {
      if(error) reject(error);
      if(!error && response.statusCode === 200){
        resolve(response.body[0].trends);
      }
    });
  })
}

const getCurrentUSATrends = function() {
  //https://api.twitter.com/1.1/trends/place.json
  return new Promise((resolve, reject) => {
    needle.get('https://api.twitter.com/1.1/trends/place.json?id=23424977', {headers: headers}, function(error, response) {
      if (error) reject(error);
      if (!error && response.statusCode === 200) {
        resolve(response.body[0].trends);
      }
    });
  })
}

module.exports = { streamKeyWord, getCurrentCanadaTrends, getCurrentUSATrends }
