import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import LeftData from './LeftDatas/LeftData'
import RightTweets from './RightTweets/RightTweets'

import MapContainer from './Map/Map.js'
import Fab from "@material-ui/core/Fab";

import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import io from "socket.io-client";

import './App.scss';
import { Animated } from "react-animated-css";

export default function App() {

  // keep track of state of left and right containers
  const [expandContainer, setExpandContainer] = useState({
    left: false,//is container open or closed
    right: false
  })

  const [response, setResponse] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [hashtag, setHashtag] = useState('');
  // const socket = io("http://localhost:8080/");

  //at the start of launching app, we want to run socket.io
  // within that socket function we update setTweets

  useEffect(() => {
    console.log('useEffect....running')
    const socket = io('http://localhost:8080/');
    socket.emit('start', '#apecave');
    socket.on('tweet', (tweet) => {
      setTweets([tweet, ...tweets]);
    })

    return () => socket.disconnect();
  }, [tweets]);

  const toggleLeft = () => {
    console.log('1st', expandContainer)
    setExpandContainer(prev => ({ ...prev, left: !expandContainer.left }))
  }
  const toggleRight = () => {
    console.log('1st', expandContainer)
    setExpandContainer(prev => ({ ...prev, right: !expandContainer.right }))

  }


  return (
    <div className="App">
      <MapContainer />

      {!expandContainer.left &&
        (<Fab className='data-icon' onClick={toggleLeft}>
          <EqualizerOutlinedIcon className='icon' />
        </Fab>)
      }
      {expandContainer.left &&
        (<Fab className='data-icon' onClick={toggleLeft}>
          <PlayCircleOutlineIcon className='icon rotate'/>
        </Fab>)
      }
      <Animated
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={expandContainer.left}>
        <LeftData />
      </Animated>



      {!expandContainer.right &&
        (<Fab className='tweet-icon' onClick={toggleRight}>
          <ChatOutlinedIcon className='icon' />
        </Fab>)
      }
      {expandContainer.right &&
        (<Fab className='tweet-icon' onClick={toggleRight}>
          <PlayCircleOutlineIcon className='icon rotate'/>
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
