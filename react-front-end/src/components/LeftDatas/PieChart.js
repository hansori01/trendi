import React, { useContext } from "react";
import {tweetContext} from '../States/TweetStateProvider'

import { PieChart, Pie, Cell } from 'recharts';

import './LeftData.scss';

const COLORS = ['#1DE9B6', '#e41956', '#FFBB28'];

export default function SentiPieChart() {
  const {
    positiveTweets,
    negativeTweets,
    neutralTweets
  } = useContext(tweetContext);

  const data = [
    { "name": "Positive", "value": positiveTweets.length },
    { "name": "Negative", "value": negativeTweets.length },
    { "name": "Neutral", "value": neutralTweets.length }
  ];

  return (
    <PieChart width={430} height={350} className='piechart'>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}