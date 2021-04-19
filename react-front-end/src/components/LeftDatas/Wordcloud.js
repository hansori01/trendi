import React from "react";

import ReactWordcloud from 'react-wordcloud';
import './LeftData.scss';

const callbacks = {
  getWordColor: word => word.sentiment ? '#1DE9B6' : "#BA3B61",
}
const options = {
  rotations: 2,
  rotationAngles: [0, 90],
  fontFamily: 'UniNeue',
  fontSizes: [14,40],
};
const size = [490, 400];


export default function Wordcloud(props) {
  
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      minSize={[380,400]}
      words={props.words}
      className='wordCloud'
    />
  )
}