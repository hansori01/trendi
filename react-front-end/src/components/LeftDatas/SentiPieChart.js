import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';


import './LeftData.scss';

//TODO store const data into useState
//TODO feed real-time data to example...[1:{dataStream}]

const data = [
  { "name": "Positive", "value": 45 },
  { "name": "Negative", "value": 25 },
  { "name": "Neutral", "value": 30 }
]

const COLORS = ['#1DE9B6', '#e41956', '#FFBB28'];
export default function SentiPieChart() {
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