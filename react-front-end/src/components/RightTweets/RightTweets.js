import React, { useContext } from "react";
// import {tweetContext} from '../States/TweetStateProvider'

import Tweets from './Tweets'
import './RightTweets.scss';

export default function RightTweets(props) {
  
  // const {} = useContext(tweetContext)
  const loadTweets = props.tweets.map((tweet, i) =>
    <Tweets
      key={i}
      name={tweet.user.name}
      handle={tweet.user.screen_name}
      text={tweet.text}
      img={tweet.user.profile_image_url}
      date={tweet.created_at}
    />
  );
  return (
    <section className="righttweets">
      {loadTweets}
    </section>
  );
}