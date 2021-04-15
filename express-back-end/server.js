const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const PORT = 8080;
const cors = require('cors')
const { streamCanadaBorderBox, getCurrentCanadaTrends, getCurrentUSATrends } = require('./queries');
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
    tweetStream = streamCanadaBorderBox(hashtag);
    tweetStream.on('tweet', async tweet => {
      console.log('Streaming')
      console.log(tweet);
      if(tweet.text.match(regex)){
        getLatLngFromLocation(tweet.user.location).then((location) => {
          console.log(location)
          tweet['sentiment'] = sentiment.analyze(tweet.text)
          console.log(tweet.sentiment)
          tweet['user_location_coords'] = location
          io.emit('tweet', tweet)
        })
      }
    });
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
    tweetStream.stop()
    console.log('the tweetStream has stopped');
  });
})

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.get('/api/trending-canada', (req,res) => {
  getCurrentCanadaTrends().then(trends => {
    res.json(trends)
  })
  .catch((error)=>{console.log('Something went wrong', error)})
})

app.get('/api/trending-USA', (req,res) => {
  getCurrentUSATrends().then(trends => {
    res.json(trends)
  })
  .catch((error)=>{console.log('Something went wrong', error)})
})

server.listen(PORT, () => {
  console.log("Listen on port: ", PORT);
})

