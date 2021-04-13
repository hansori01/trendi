// let dbParams = {};
// if (process.env.DATABASE_URL) {
//   dbParams.connectionString = process.env.DATABASE_URL;
// } else {
//   dbParams = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   };
// }

// module.exports = dbParams;

require('dotenv').config();

// example queries below

// queries all tweets with specific id NOT SURE IF USEFUL YET
// db.tweets.find( { id: 1380993859224797200 } ).pretty()

// queries all tweets with location: 'Canada'
// db.tweets.find( { "user.location": "Canada" } ).pretty()

// queries all tweets with sentiment score greater than or equal to a score of 5
// db.tweets.find( { "sentiment.score": { $gte: 5 } } ).pretty()

// create a index text search for tweets: text then query for matching hashtag in all tweets: text fields
// db.tweets.createIndex( { text: "text" } )
// db.tweets.find( { $text: { $search: "\"NDPConvention2021\"" }  } ).pretty()

  // finds tweets with sentiment score >= specified value
  // returns average sentiment score
const findSentiment = function(collection, callback) {
  collection.find({ "sentiment.score": { $gte: 1 } }).toArray(function(err, result) {
    if (result) {
      // console.log('Found the following tweets:\n', result);
      console.log(`Found ${result.length} matching results.`);
      let total = 0;
      result.map(e => {
        total += e.sentiment.score
      });
      console.log(total / result.length);
    }
    callback(result);
  });
};

const findHashtag = function(collection, callback) {
  collection.find({ $text: { $search: "\"#NDPConvention2021\"" } }).toArray(function (err, result) {
    if(result) {
      console.log(`Found ${result.length} matching results.`);
    }
    callback(result);
  });
};

const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const uri = ;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(`${chalk.green('Successfully Connected to the server')}`);
  const collection = client.db('trendi').collection('tweets');
  // perform actions on the collection object

  // findSentiment(collection, function() {
  //   client.close();
  // })

  findHashtag(collection, function() {
    client.close();
  })

});