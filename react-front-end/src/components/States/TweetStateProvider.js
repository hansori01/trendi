import { createContext, useState, useEffect } from 'react';


export default function TweetStateProvider(props) {

  const [tweets, setTweets] = useState([]);
  const [socket, setSocket] = useState();
  const [positiveTweets, setPositiveTweets] = useState([]);
  const [negativeTweets, setNegativeTweets] = useState([]);
  const [neutralTweets, setNeutralTweets] = useState([]);

  // const getPositiveTweets = (tweetArray) => {
  //   let positiveTweets = [];
  //   tweetArray.forEach(tweet => {
  //     if (tweet.sentiment.score > 0) {
  //       positiveTweets.push(tweet)
  //     }
  //   });
  //   return positiveTweets;
  // };

  // const getNegativeTweets = (tweetArray) => {
  //   let getNegativeTweets = [];
  //   tweetArray.forEach(tweet => {
  //     if (tweet.sentiment.score > 0) {
  //       getNegativeTweets.push(tweet)
  //     }
  //   });
  //   return positiveTweets;
  // };


  
  const tweetData = {
    tweets,
    setTweets,
    positiveTweets,
    setPositiveTweets,
    negativeTweets,
    setNegativeTweets,
    neutralTweets,
    setNeutralTweets,
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