import { createContext, useState, useEffect } from 'react';


export default function TweetStateProvider(props) {

  const [tweets, setTweets] = useState([]);
  const [socket, setSocket] = useState();





  const tweetData = {
    tweets,
    setTweets,
    socket,
    setSocket
  };

  return (
    <tweetContext.Provider value={tweetData}>
      {props.children}
    </tweetContext.Provider>
  );
};
export const tweetContext = createContext();