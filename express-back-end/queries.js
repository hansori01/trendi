const Twit = require('twit');
const Sentiment = require('sentiment');
const needle = require('needle');
const _ = require('lodash');
const { identity } = require('lodash');
const fs = require('fs');
const util = require('util');
const { response } = require('express');
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


// This works, basic search for word
const streamKeyword = function(searchWord) {
  const stream = T.stream('statuses/filter', {
    track: searchWord,
    language: 'en'
  });
  stream.on('tweet', async tweet => {
      console.log(tweet);
  });
}

const streamCanadaBorderBox = function(searchWord) {
  const canada = ['-140.99778', '41.6751050889', '-52.6480987209', '83.23324'];
  
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

module.exports = { streamCanadaBorderBox, getCurrentCanadaTrends, getCurrentUSATrends }
