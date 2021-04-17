import React, { useContext, useEffect, useState } from "react";
import { tweetContext } from '../States/TweetStateProvider'

import { BarChart, XAxis, Bar } from 'recharts';

import './LeftData.scss';

export default function SentiBarChart() {
  const {
    tweets,
    tweetScores,
    setTweetScores
  } = useContext(tweetContext)

  // const [tweetScores, setTweetScores] = useState({
  //   veryNeg: 0,
  //   neg: 0,
  //   slightNeg: 0,
  //   neutral: 0,
  //   slightPos: 0,
  //   pos: 0,
  //   veryPos: 0
  // })

  // access previous state scores
  // spread, then increment values depending on sentiment value
  // this hurt my brain beyond comprhension ~ monke no good w/ numbies
  useEffect(() => {

    setTweetScores(prevScores => {
      const newData = {
        ...prevScores
      };

      if (tweets.length > 0) {
        const sentiScore = tweets[0].sentiment.score;
        console.log(sentiScore);
        if ((sentiScore > -1 && sentiScore < 1) || sentiScore === 0) {
          newData.neutral = prevScores.neutral + 1;         //  0
        } else if (sentiScore >= 1 && sentiScore < 2) {
          newData.slightPos = prevScores.slightPos + 1;     //  3
        } else if (sentiScore >= 2 && sentiScore < 3) {
          newData.pos = prevScores.pos + 1;                 //  2
        } else if (sentiScore >= 3) {
          newData.veryPos = prevScores.veryPos + 1;         //  1
        } else if (sentiScore <= -1 && sentiScore > -2) {
          newData.slightNeg = prevScores.slightNeg + 1;     // -1
        } else if (sentiScore <= -2 && sentiScore > -3) {
          newData.neg = prevScores.neg + 1;                 // -2
        } else if (sentiScore <= -3) {
          newData.veryNeg = prevScores.veryNeg + 1;         // -3
        } else {
          console.log("This score doesn't have a home: ", sentiScore)
        }
      }

      return (
        // this will contain the prevScores and any new updated data
        newData
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

      <Bar dataKey={0} fill="#FFA500" barSize={20} />

      <XAxis dataKey="name" />

    </BarChart>
  );
}