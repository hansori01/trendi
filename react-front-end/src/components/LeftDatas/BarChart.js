import React, { useContext } from "react";
import {tweetContext} from '../States/TweetStateProvider'

import { BarChart, XAxis, Bar } from 'recharts';

import './LeftData.scss';

export default function SentiBarChart() {
  const { tweets } = useContext(tweetContext)

  // tweets.map(e => console.log('incoming socre! =>', e.sentiment.score));
  
  const tweetScores = [
    //negative numbers are 11-15 because im lazy rn
    { name: "3-", 0: 0 },
    { name: "2-", 0: 0 },
    { name: "1-", 0: 0 },
    { name: "0", 0: 0 },
    { name: "1", 0: 0 },
    { name: "2", 0: 0 },
    { name: "3", 0: 0 },
  ]

  tweetScores[3][0] = tweets[0].sentiment.score;

  return (
    <BarChart
      width={420}
      height={280}
      data={tweetScores}
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