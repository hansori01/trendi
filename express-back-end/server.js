const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const PORT = 8080;
<<<<<<< HEAD
const cors = require('cors');
const { streamKeyWord, getCurrentCanadaTrends, getCurrentUSATrends } = require('./queries');
const Sentiment = require('sentiment');
=======
const cors = require("cors");
const {
  streamKeyWord,
  getCurrentCanadaTrends,
  getCurrentUSATrends,
} = require("./queries");
const Sentiment = require("sentiment");
>>>>>>> ce5c253d8c122ca3be367a99dfecd5d2f570b1b2

const http = require("http");
const socketIo = require("socket.io");
const { getLatLngFromLocation } = require("./google-maps-search");
// const index = require("./routes/index");

// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
<<<<<<< HEAD
app.use(express.static('public'));
=======
app.use(express.static("public"));
>>>>>>> ce5c253d8c122ca3be367a99dfecd5d2f570b1b2
app.use(cors());

const sentiment = new Sentiment();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("client connected");
  let tweetStream;
  socket.on("start", (hashtag) => {
    console.log("starting stream ", hashtag);
    // Regex checks if keyword is in tweet when it comes back
    const regexpression = hashtag;
    const regex = new RegExp(regexpression, "gi");
    tweetStream = streamKeyWord(hashtag);
    console.log("tweetStream Created");
    tweetStream.on("tweet", async (tweet) => {
      console.log(tweet);
      // check tweet against regex
      if (tweet.text.match(regex)) {
        // query google maps api for user location
        getLatLngFromLocation(tweet.user.location).then((location) => {
          // add sentiment analysis to tweet object
<<<<<<< HEAD
          tweet['sentiment'] = sentiment.analyze(tweet.text);
          // add location to tweet object
          if (!tweet.user.location) {
            location = { lat: -82.8628, lng: 135.0000 };
          }
          if (location) {
            tweet['user_location_coords'] = location;
          } else {
            // put them in antartica where they belong
            tweet['user_location_coords'] = { lat: -82.8628, lng: 135.0000 };
          }
          io.emit('tweet', tweet);
=======
          tweet["sentiment"] = sentiment.analyze(tweet.text);
          // add location to tweet object
          if (!tweet.user.location) {
            location = { lat: -82.8628, lng: 135.0 };
          }
          if (location) {
            tweet["user_location_coords"] = location;
          } else {
            // put them in antartica where they belong
            tweet["user_location_coords"] = { lat: -82.8628, lng: 135.0 };
          }
          io.emit("tweet", tweet);
>>>>>>> ce5c253d8c122ca3be367a99dfecd5d2f570b1b2
        });
      }
    });
  });

  socket.on("please_stop", (arg) => {
    if (tweetStream) {
      tweetStream.stop();
      console.log("the tweetStream has stopped");
    } else {
      console.log("No tweet stream to disconnect");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    if (tweetStream) {
      tweetStream.stop();
<<<<<<< HEAD
      console.log('the tweetStream has stopped');
=======
      console.log("the tweetStream has stopped");
>>>>>>> ce5c253d8c122ca3be367a99dfecd5d2f570b1b2
    } else {
      console.log("No tweet stream to disconnect");
    }
  });
});

<<<<<<< HEAD
app.get('/api/trending-canada', (req, res) => {
  getCurrentCanadaTrends().then(trends => {
    res.json(trends);
  })
    .catch((error) => {
      console.log('Something went wrong', error);
    });
});

app.get('/api/trending-USA', (req, res) => {
  getCurrentUSATrends().then(trends => {
    res.json(trends);
  })
    .catch((error) => {
      console.log('Something went wrong', error);
=======
app.get("/api/trending-canada", (req, res) => {
  getCurrentCanadaTrends()
    .then((trends) => {
      res.json(trends);
    })
    .catch((error) => {
      console.log("Something went wrong", error);
    });
});

app.get("/api/trending-USA", (req, res) => {
  getCurrentUSATrends()
    .then((trends) => {
      res.json(trends);
    })
    .catch((error) => {
      console.log("Something went wrong", error);
>>>>>>> ce5c253d8c122ca3be367a99dfecd5d2f570b1b2
    });
});

server.listen(PORT, () => {
  console.log("Listen on port: ", PORT);
});
<<<<<<< HEAD

=======
>>>>>>> ce5c253d8c122ca3be367a99dfecd5d2f570b1b2
