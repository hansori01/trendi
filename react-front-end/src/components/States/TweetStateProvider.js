import { createContext, useState } from 'react';


export default function TweetStateProvider(props) {

  const [tweets, setTweets] = useState([]);
  const [socket, setSocket] = useState();

  const [tweetScores, setTweetScores] = useState({
    veryNeg: 0,
    neg: 0,
    slightNeg: 0,
    neutral: 0,
    slightPos: 0,
    pos: 0,
    veryPos: 0
  })

  let positiveTweets = tweets.filter(tweet => tweet.sentiment.score > 0);
  let negativeTweets = tweets.filter(tweet => tweet.sentiment.score < 0);
  let neutralTweets = tweets.filter(tweet => tweet.sentiment.score === 0);
  // console.log("positive twerts", positiveTweets);

  
  const tweetData = {
    tweets,
    setTweets,
    positiveTweets,
    negativeTweets,
    neutralTweets,
    socket,
    setSocket,
    tweetScores,
    setTweetScores
  };

  return (
    <tweetContext.Provider value={tweetData}>
      {props.children}
    </tweetContext.Provider>
  );
};
export const tweetContext = createContext();