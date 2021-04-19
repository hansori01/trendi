const Twit = require('twit');
const Sentiment = require('sentiment');
const needle = require('needle');
const _ = require('lodash');
const { identity } = require('lodash');
const fs = require('fs');
const util = require('util');
const { getLatLngFromLocation } = require('./google-maps-search')
require('dotenv').config()

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.AUTH_ACCESS,
  access_token_secret: process.env.AUTH_SECRET,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});

let tweetCount = 0;
let tweetsData = []

const pushToTweetsData = function (tweet) {
  let sentiment = new Sentiment();
  let sentimentResult = sentiment.analyze(tweet.text);
  try {
    let tweetData = {
      created_at: tweet.created_at,
      id: tweet.id,
      text: tweet.text,
      user: tweet.user || {},
      geo: tweet.geo,
      coordinates: tweet.coordinates,
      extended_tweet: tweet.extended_tweet.full_text,
      place: tweet.place,
      user_location_coords: tweet.user_location_coords,
      sentiment: {
        score: sentimentResult.score,
        positive: util.inspect(sentimentResult.positive),
        negative: util.inspect(sentimentResult.negative)
      }
    }
    tweetsData.push(tweetData);
  } catch (error) {
    console.log('no extended tweet');
    let tweetData = {
      created_at: tweet.created_at,
      id: tweet.id,
      text: tweet.text,
      user: tweet.user || {},
      geo: tweet.geo,
      coordinates: tweet.coordinates,
      extended_tweet: null,
      place: tweet.place,
      user_location_coords: tweet.user_location_coords,
      sentiment: {
        score: sentimentResult.score,
        positive: util.inspect(sentimentResult.positive),
        negative: util.inspect(sentimentResult.negative)
      }
    }
    tweetsData.push(tweetData);
  }
  console.log("Match Count", tweetCount);
  tweetCount++;

}

const streamCanadaBorderBox = function (searchWord) {
  const canada = ['-140.99778', '41.6751050889', '-52.6480987209', '83.23324'];
  // const regexpression = /(?i)#RemoveThePM(?-i).*/gi
  const regexpression = searchWord
  const regex = new RegExp(regexpression, "gi");


  const stream = T.stream('statuses/filter', {
    track: searchWord,
    language: 'en'
  });

  let count = 0;
  stream.on('tweet', async tweet => {
    if (tweet.text.match(regex)) {
      getLatLngFromLocation(tweet.user.location).then((location) => {
        tweet['user_location_coords'] = location
        pushToTweetsData(tweet);
      })
    } else {
      try {
        if (tweet.extended_tweet.full_text.match(regex)) {
          const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
          const user_location = tweet.user.location.replace(regex, '')
          getLatLngFromLocation(user_location).then((location) => {
            tweet['user_location_coords'] = location
            pushToTweetsData(tweet);
          })
        }
      } catch (error) {
        console.log('No extended tweet');
      }
    }

    if (tweetsData.length === 25) {
      const data = util.inspect(tweetsData)
      fs.writeFile('./seedData-location-added.js', data, function (err, result) {
        if (err) console.log('error', err);
        stream.stop()
        console.log('Finished writing')
      })
    }
    console.log(tweet);
    console.log("Total Count: ", count);
    count++;
  });
}

const streamUSBorderBox = function (searchWord) {
  const USA = ['-171.791110603', '18.91619', '-66.96466', '71.3577635769'];

  const regexpression = searchWord
  const regex = new RegExp(regexpression, "gi");

  const stream = T.stream('statuses/filter', {
    locations: USA,
    language: 'en'
  });

  let count = 0;
  stream.on('tweet', async tweet => {
    if (tweet.text.match(regex)) {
      pushToTweetsData(tweet);
    } else {
      try {
        if (tweet.extended_tweet.full_text.match(regex)) {
          pushToTweetsData(tweet);
        }
      } catch (error) {
        console.log('No extended tweet');
      }
    }

    if (tweetsData.length === 50) {
      const data = util.inspect(tweetsData)
      fs.writeFile('./seedDataUSA-with-locations.js', data, function (err, result) {
        if (err) console.log('error', err);
        stream.stop()
        console.log('Finished writing')
      })
    }
    console.log("Total Count: ", count);
    count++;
  });
}

const getTweetsFromPointRadius = function (pointRadius) {
  T.get('search/tweets', { q: `#RemoveThePM geocode:${pointRadius}`, count: 10 }, function (err, data, response) {
    console.log(data)

    console.log('######################################################################');
    data.statuses.forEach(tweet => {
      console.log(tweet.user);
    })
  })
}

const senti = new Sentiment();
const calgaryPointRadius = '51.0447,-114.0719,100mi'
const runSingleQuery = function (hashtag) {
  const headers = {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
  }
  needle.get(`https://api.twitter.com/1.1/search/tweets.json?q=%23${hashtag}%20-filter%3Aretweets%20AND%20-filter%3Areplies&geocode=${calgaryPointRadius}`, { headers: headers }, function (error, response) {
    if (!error && response.statusCode == 200)
      console.log(response.body);
    console.log('##############################################################################')
    response.body.statuses.forEach(status => {
      // console.log(status.user);
      console.log(senti.analyze(status.text));
    })
  });
}


// runSingleQuery('NDPConvention2021');
streamCanadaBorderBox('#DogecoinToTheMoon')
// streamCanadaBorderBox('#NDPConvention2021');
// streamUSBorderBox('Stallone');

