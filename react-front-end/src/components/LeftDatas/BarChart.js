import React, { useContext, useEffect, useState } from "react";
import {tweetContext} from '../States/TweetStateProvider'

import { BarChart, XAxis, Bar } from 'recharts';

import './LeftData.scss';

export default function SentiBarChart() {
  const { tweets } = useContext(tweetContext)

  tweets.map(e => console.log('incoming score! =>', e.sentiment.score));
  
  const [tweetScores, setTweetScores] = useState({
    veryNeg: 1,
    neg: 0,
    slightNeg: 0,
    neutral: 0,
    slightPos: 0,
    pos: 0,
    veryPos: 1
  })

  // access previous state scores
  // spread then increment values depending on sentiment
  useEffect(() => {

    setTweetScores(prevScores => {
      
      // prev neutral state
      const prevNeutral = prevScores.neutral;
      const prevVeryPos = prevScores.veryPos;
      
      return(
        {...prevScores, neutral: prevNeutral + 1, veryPos: prevVeryPos +  1}
      )
    })
  }, [tweets])

  const barData = [
    { name: "3-", 0: tweetScores.veryNeg },
    { name: "2-", 0: tweetScores.neg },
    { name: "1-", 0: tweetScores.slightNeg },
    { name: "0", 0: tweetScores.neutral },
    { name: "1", 0: tweetScores.slightPos },
    { name: "2", 0: tweetScores.pos },
    { name: "3", 0: tweetScores.veryPos },
  ];

  return (
    <BarChart
      width={420}
      height={280}
      data={barData}
      margin={{
        top: 20,
        right: 10,
        left: 10,
        bottom: 5,
      }}
      className="barChart"
    >

      <Bar dataKey={0} fill="#FFA500" barSize={20}/>

      <XAxis dataKey="name" />

    </BarChart>
  );
}