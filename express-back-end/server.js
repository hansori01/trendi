const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const PORT = 8080;
const cors = require('cors')
const { streamKeyWord, getCurrentCanadaTrends, getCurrentUSATrends } = require('./queries');
const Sentiment = require('sentiment');

const http = require("http");
const socketIo = require("socket.io");
const { getLatLngFromLocation } = require('./google-maps-search');
// const index = require("./routes/index");

// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));
app.use(cors())

const sentiment = new Sentiment();
const server = http.createServer(app);
const io = socketIo(server,
  {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  }
);

io.on('connection', (socket) => {
  console.log('client connected');
  let tweetStream;
  socket.on('start', (hashtag) => {
    console.log('starting stream ', hashtag);
    const regexpression = hashtag
    const regex = new RegExp(regexpression, "gi");
    tweetStream = streamKeyWord(hashtag);
    console.log('tweetStream Created');
    tweetStream.on('tweet', async tweet => {
      console.log('Streaming')
      console.log(tweet);
      if (tweet.text.match(regex)) {
        getLatLngFromLocation(tweet.user.location).then((location) => {
          console.log(location)
          tweet['sentiment'] = sentiment.analyze(tweet.text)
          console.log(tweet.sentiment)
          if (location) {
            tweet['user_location_coords'] = location
          } else {
            // put them in antartica where they belong
            tweet['user_location_coords'] = { lat: -82.8628, lng: 135.0000 }
          }
          io.emit('tweet', tweet)
        })
      }
    });
  });

  socket.on('please_stop',(arg) => {
    console.log('arg arg arg arg arg', arg);
    if (tweetStream) {
      tweetStream.stop();
      console.log('the tweetStream has stopped');
    } else {
      console.log('No tweet stream to disconnect');
    }

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    if (tweetStream) {
      tweetStream.stop()
      console.log('the tweetStream has stopped');
    } else {
      console.log('No tweet stream to disconnect');
    }
  });
})

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.get('/api/trending-canada', (req, res) => {
  getCurrentCanadaTrends().then(trends => {
    res.json(trends)
  })
    .catch((error) => { console.log('Something went wrong', error) })
})

app.get('/api/trending-USA', (req, res) => {
  getCurrentUSATrends().then(trends => {
    res.json(trends)
  })
    .catch((error) => { console.log('Something went wrong', error) })
})

server.listen(PORT, () => {
  console.log("Listen on port: ", PORT);
})

