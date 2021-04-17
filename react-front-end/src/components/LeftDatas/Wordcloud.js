import React, { useContext } from "react";
// import {tweetContext} from '../States/TweetStateProvider'

import ReactWordcloud from 'react-wordcloud';
import './LeftData.scss';

const callbacks = {
  getWordColor: word => word.sentiment ? '#1DE9B6' : "#BA3B61",
  getWordTooltip: word => `${word.text} (${word.value}) [${word.sentiment ? "good" : "bad"}]`,
}
const options = {
  rotations: 2,
  rotationAngles: [0, 90],
  fontFamily: 'UniNeue'
  
};
const size = [380, 400];


export default function Wordcloud(props) {
  
  // const {} = useContext(tweetContext)
  
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={props.words}
      className='wordCloud'
    />
  )
}