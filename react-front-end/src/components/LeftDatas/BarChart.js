import React, { useContext, useEffect, useState } from "react";
import {tweetContext} from '../States/TweetStateProvider'

import { BarChart, XAxis, Bar } from 'recharts';

import './LeftData.scss';

export default function SentiBarChart() {
  const { tweets } = useContext(tweetContext)

  
  
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
      const newData = {
        ...prevScores
      };
      console.log('these are the tweets for the scores below!', tweets)
      tweets.map(e => console.log('incoming score! =>', e.sentiment.score));

      // prev sentiment score states
      const prevVeryNeg = prevScores.veryNeg // 3-
      const prevNeg = prevScores.neg // 2-
      const prevSlightNeg = prevScores.slightNeg // 1-
      const prevNeutral = prevScores.neutral; // 0
      const prevSlightPos = prevScores.slightPos // 1
      const prevPos = prevScores.pos // 2
      const prevVeryPos = prevScores.veryPos; // 3
      
      return(
        {
          ...prevScores,
          neutral: prevNeutral + 1, 
          veryPos: prevVeryPos +  1
        }
        // newData; this will contain the prevScores and any new updated data
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