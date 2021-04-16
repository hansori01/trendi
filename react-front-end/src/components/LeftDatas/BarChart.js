import React, { useContext, useEffect, useState } from "react";
import {tweetContext} from '../States/TweetStateProvider'

import { BarChart, XAxis, Bar } from 'recharts';

import './LeftData.scss';

export default function SentiBarChart() {
  const { tweets } = useContext(tweetContext)

  // tweets.map(e => console.log('incoming socre! =>', e.sentiment.score));
  
  const [tweetScores, setTweetScores] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0
  })

  useEffect(() => {
    // if tweets[0].sentiment.score === 0
    //   score = d;
    setTweetScores(prevScores => ({...prevScores, score: +1}))
  }, [tweets])

  const barData = [
    { name: "3-", 0: tweetScores.a },
    { name: "2-", 0: tweetScores.b },
    { name: "1-", 0: tweetScores.c },
    { name: "0", 0: tweetScores.d },
    { name: "1", 0: tweetScores.e },
    { name: "2", 0: tweetScores.f },
    { name: "3", 0: tweetScores.g },
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
      {/* <Bar dataKey={4} fill="#1ad6a7" />
      <Bar dataKey={3} fill="#1c9fc7" barSize={20}/> */}
      {/* <Bar dataKey={2} fill="#128f70" /> */}
      {/* <Bar dataKey={1} fill="#4687db" barSize={20}/> */}
      {/* <Bar dataKey={0} fill="#697471" barSize={20}/> */}
      {/* <Bar dataKey={11} fill="#BA3B61" /> */}
      {/* <Bar dataKey={12} fill="#BA3B61" barSize={20}/> */}
      {/* <Bar dataKey={13} fill="#ec336b" /> */}
      {/* <Bar dataKey={14} fill="#fa044e" barSize={20}/> */}
      {/* <Bar dataKey={15} fill="#911030" barSize={20}/> */}
      <XAxis dataKey="name" />

    </BarChart>
  );
}