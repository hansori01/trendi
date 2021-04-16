import React, { useContext, useState, useEffect } from 'react';
import { uiContext } from './States/UIStateProvider';
import { tweetContext } from './States/TweetStateProvider';

// import TweetStateProvider from './States/TweetStateProvider';
import LeftData from './LeftDatas/LeftData';
import RightTweets from './RightTweets/RightTweets';
import Header from './Header/Header';

import ReactMap from './Map/Map.js';
import Fab from "@material-ui/core/Fab";
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import io from "socket.io-client";
import { Animated } from "react-animated-css";

import './App.scss';

export default function App() {

  const {
    tweets,
    setTweets,
    neutralTweets,
    setNeutralTweets,
    positiveTweets,
    setPositiveTweets,
    negativeTweets,
    setNegativeTweets,
    socket,
    setSocket,
    getPositiveTweets,
  } = useContext(tweetContext)

  const {
    uiState,
    toggleLeft,
    toggleRight,
  } = useContext(uiContext);

  const appendTweets = async (tweet) => {
    console.log("before tweets length ", tweets.length);
    console.log(tweet.text);
    setTweets((prevTweets) => [tweet, ...prevTweets]);
    if (tweet.sentiment.score > 0) {
      console.log('positive tweets', tweet)
      setPositiveTweets((prevPositiveTweets) => [tweet, ...prevPositiveTweets]);
    } else if (tweet.sentiment.score < 0) {
      console.log('negative tweets', tweet)
      setNegativeTweets((prevNegativeTweets) => [tweet, ...prevNegativeTweets]);
    } else {
      console.log('neutral tweets', tweet)
      setNeutralTweets((prevNeutralTweets) => [tweet, ...prevNeutralTweets]);
    }
    console.log("New tweets length ", tweets.length);
  }

  useEffect(() => {
    // setSocket();
    let socket = io('http://localhost:8080/')
    setSocket(socket);
    socket.emit('start', '#apecave');
    socket.on('tweet', async (tweet) => {
      console.log("Inside Asynce useEffect2");
      console.log("Tweet length from useEffect2", tweets.length);
      await appendTweets(tweet)
    })
    return () => {
      console.log('Disconnecting from socket');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="map">
        <ReactMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places,visualization`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          tweets={tweets}
        />
      </div>

      {!uiState.left &&
        (<Fab className='data-icon'
          onClick={toggleLeft}
          disabled={uiState.disabled}>
          <EqualizerOutlinedIcon className='icon' />
        </Fab>)
      }
      {uiState.left &&
        (<Fab
          className='data-icon'
          onClick={toggleLeft}>
          <PlayCircleOutlineIcon className='icon rotate' />
        </Fab>)
      }
      <Animated
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={uiState.left}
      >
        <LeftData />
      </Animated>

      {!uiState.right &&
        (<Fab
          className='tweet-icon'
          onClick={toggleRight}
          disabled={uiState.disabled}
        >
          <ChatOutlinedIcon className='icon' />
        </Fab>)
      }
      {uiState.right &&
        (<Fab
          className='tweet-icon'
          onClick={toggleRight}
        >
          <PlayCircleOutlineIcon className='icon rotate' />
        </Fab>)
      }
      <Animated
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={uiState.right}
      >
        <RightTweets tweets={tweets} />
      </Animated>
    </div>
  );
}