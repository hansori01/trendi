import React, { useContext, useState, useEffect } from 'react';
import { uiContext } from './States/UIStateProvider';

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

  const { ui } = useContext(uiContext);

  const [tweets, setTweets] = useState([]);
  const [hashtag, setHashtag] = useState('');
  const [tweetPositions, setTweetPositions] = useState([{ lat: 49.2827, lng: -123.1217 }]);
  const [socket, setSocket] = useState();

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


  return (
    <div className="App">

        <Header />
        <div className="map">
          <ReactMap
            // activateContainer={ui.activateContainer}
            // deactivateContainer={ui.deactivateContainer}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>

        {/* {!ui.uiState.left &&
          (<Fab className='data-icon'
            onClick={ui.toggleLeft}
            disabled={ui.uiState.disabled}>
            <EqualizerOutlinedIcon className='icon' />
          </Fab>)
        }
        {ui.uiState.left &&
          (<Fab
            className='data-icon'
            onClick={ui.toggleLeft}>
            <PlayCircleOutlineIcon className='icon rotate' />
          </Fab>)
        }
        <Animated
          animationInDuration={500}
          animationOutDuration={500}
        isVisible={ui.uiState.left}
        >
          <LeftData />
        </Animated>

        {!ui.uiState.right &&
          (<Fab
            className='tweet-icon'
          onClick={ui.toggleRight}
          disabled={ui.uiState.disabled}
          >
            <ChatOutlinedIcon className='icon' />
          </Fab>)
        }
        {ui.uiState.right &&
          (<Fab
            className='tweet-icon'
          onClick={ui.toggleRight}
          >
            <PlayCircleOutlineIcon className='icon rotate' />
          </Fab>)
        }
        <Animated
          animationInDuration={500}
          animationOutDuration={500}
        isVisible={ui.uiState.right}
        >
          <RightTweets tweets={tweets} />
        </Animated> */}

    </div>
  );
}
