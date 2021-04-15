import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


import './LeftData.scss';

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
        // cx={150}
        // cy={150}
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
      {/* <Pie
        data={data}
        cx={600}
        cy={200}
        startAngle={0}
        endAngle={360}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie> */}
    </PieChart>
  );
}