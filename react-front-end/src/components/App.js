import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import LeftData from './LeftDatas/LeftData';
import RightTweets from './RightTweets/RightTweets';

import ReactMap from './Map/Map.js';
import mapStyle from './Map/mapStyle';
import Fab from "@material-ui/core/Fab";
// import toggleHeader from './helper/headerStatusHelper';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import io from "socket.io-client";

import './App.scss';
import { Animated } from "react-animated-css";
import Header from './Header/Header';

export default function App() {

  // keep track of state of left and right containers
  const [expandContainer, setExpandContainer] = useState({
    left: true,//is container open or closed
    right: true,
    disabled: true //disable FAB icons and side containers when header is expanded
  })

  // const [response, setResponse] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [hashtag, setHashtag] = useState('');
  const [tweetPositions, setTweetPositions] = useState([{lat: 49.2827, lng:-123.1217}]);
  const [socket, setSocket] = useState();
  const [streamKeyWord, setStreamKeyWord] = useState('');
  // const socket = io("http://localhost:8080/");

  //at the start of launching app, we want to run socket.io
  // within that socket function we update setTweets

  const appendTweets = async (tweet) => {
    console.log("before tweets length ", tweets.length);
    console.log(tweet.text);
    setTweets((prevTweets) => [tweet, ...prevTweets]);
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
      setTweetPositions([tweet.user_location_coords, ...tweetPositions]);
      await appendTweets(tweet)
    })
    return () => {
      console.log('Disconnecting from socket');
      socket.disconnect()
    };
  }, []);

  useEffect(() => {
    // should have socket.emit statements here to change stream
  }, [streamKeyWord])

  // useEffect(() => {
  //   console.log('Rerendering');
  //   console.log("tweet array size from useEffect2, ", tweets.length);
  //   // setTweets(tweets);
  // }, [tweets])

  const toggleLeft = () => {
    console.log('1st', expandContainer)
    setExpandContainer(prev => ({ ...prev, left: !expandContainer.left }))
  }
  const toggleRight = () => {
    console.log('1st', expandContainer)
    setExpandContainer(prev => ({ ...prev, right: !expandContainer.right }))
  }
  const activateContainer = () => {
    console.log('toggelHeader is turning off the containers', expandContainer)
    setExpandContainer(prev => ({ ...prev, disabled:false}))
  }
  const deactivateContainer = () => {
    console.log('toggelHeader is turning off the containers', expandContainer)
    setExpandContainer(prev => ({ ...prev, disabled:true}))
  }


  return (
    <div className="App">
            <Header
      activateContainer={activateContainer}
      deactivateContainer={deactivateContainer}
      />
      <div className="map">
      <ReactMap
          activateContainer={activateContainer} 
          deactivateContainer={deactivateContainer}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process. env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>

      {!expandContainer.left &&
        (<Fab className='data-icon' onClick={toggleLeft} disabled={expandContainer.disabled}>
          <EqualizerOutlinedIcon className='icon' />
        </Fab>)
      }
      {expandContainer.left &&
        (<Fab className='data-icon' onClick={toggleLeft}>
          <PlayCircleOutlineIcon className='icon rotate' />
        </Fab>)
      }
      <Animated
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={expandContainer.left}>
        <LeftData />
      </Animated>



      {!expandContainer.right &&
        (<Fab className='tweet-icon' onClick={toggleRight} disabled={expandContainer.disabled}>
          <ChatOutlinedIcon className='icon' />
        </Fab>)
      }
      {expandContainer.right &&
        (<Fab className='tweet-icon' onClick={toggleRight}>
          <PlayCircleOutlineIcon className='icon rotate' />
        </Fab>)
      }
      <Animated
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={expandContainer.right}>
        <RightTweets tweets={tweets} />
      </Animated>
    </div>
  );
}
