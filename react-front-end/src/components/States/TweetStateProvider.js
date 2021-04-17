import { createContext, useState, useEffect } from 'react';


export default function TweetStateProvider(props) {

  const [tweets, setTweets] = useState([]);
  const [socket, setSocket] = useState();



  let positiveTweets = tweets.filter(tweet => tweet.sentiment.score > 0);
  let negativeTweets = tweets.filter(tweet => tweet.sentiment.score < 0);
  let neutralTweets = tweets.filter(tweet => tweet.sentiment.score === 0);
  console.log("positive twerts", positiveTweets);

  
  const tweetData = {
    tweets,
    setTweets,
    positiveTweets,
    negativeTweets,
    neutralTweets,
    socket,
    setSocket,
  };

  return (
    <tweetContext.Provider value={tweetData}>
      {props.children}
    </tweetContext.Provider>
  );
};
export const tweetContext = createContext();