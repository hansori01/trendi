import React from "react";

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