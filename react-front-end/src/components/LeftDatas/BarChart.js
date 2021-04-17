import React, { useContext, useEffect, useState } from "react";
import {tweetContext} from '../States/TweetStateProvider'

import { BarChart, XAxis, Bar } from 'recharts';

import './LeftData.scss';

export default function SentiBarChart() {
  const { tweets } = useContext(tweetContext)

  
  
  const [tweetScores, setTweetScores] = useState({
    veryNeg: 0,
    neg: 0,
    slightNeg: 0,
    neutral: 0,
    slightPos: 0,
    pos: 0,
    veryPos: 0
  })

  // access previous state scores
  // spread then increment values depending on sentiment
  useEffect(() => {

    setTweetScores(prevScores => {
      // logs below for debugging
      console.log('these are the tweets for the scores below!', tweets)
      tweets.map(e => console.log('incoming score! =>', e.sentiment.score));

      const newData = {
        ...prevScores
      };

      if (tweets.length > 0) {
        const sentiScore = tweets[0].sentiment.score;
        console.log(sentiScore);
        if (sentiScore === 0) {
          newData.pos = prevScores.pos + 1;
        }
        if (sentiScore < 0) {
          newData.neg = prevScores.neg + 1;
        }
      }

      // prev sentiment score states
      const prevVeryNeg = prevScores.veryNeg // 3-
      const prevNeg = prevScores.neg // 2-
      const prevSlightNeg = prevScores.slightNeg // 1-
      const prevNeutral = prevScores.neutral; // 0
      const prevSlightPos = prevScores.slightPos // 1
      const prevPos = prevScores.pos // 2
      const prevVeryPos = prevScores.veryPos; // 3
      
      console.log(newData);

      return(
        // {
        //   ...prevScores,
        //   neutral: prevNeutral + 1, 
        // }
        newData // this will contain the prevScores and any new updated data
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