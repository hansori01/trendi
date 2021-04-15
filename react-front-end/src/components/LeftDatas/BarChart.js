import React from 'react';
import { BarChart, XAxis, Bar } from 'recharts';


import './LeftData.scss';

//TODO store const data into useState
//TODO feed real-time data to example...[1:{dataStream}]

const data = [
  //negative numbers are 11-15 because im lazy rn
  { name: "🤬", 15: 11 },
  { name: "😤", 14: 14 },
  // { name: "😥", 13: 4 },
  { name: "😕", 12: 22 },
  // { name: "🥲", 11: 2 },
  { name: "🤡", 0: 12 },
  { name: "😌", 1: 12 },
  // { name: "😁", 2: 1 },
  { name: "🤗", 3: 20 },
  // { name: "😘", 4: 22 },
  { name: "🥰", 5: 32 },
]

export default function SentiBarChart() {
  return (
    <BarChart
      width={420}
      height={280}
      data={data}
      margin={{
        top: 20,
        right: 10,
        left: 10,
        bottom: 5,
      }}
      className="barChart"
      >

      <Bar dataKey={5} fill="#1DE9B6" barSize={20}/>
      {/* <Bar dataKey={4} fill="#1ad6a7" /> */}
      <Bar dataKey={3} fill="#1c9fc7" barSize={20}/>
      {/* <Bar dataKey={2} fill="#128f70" /> */}
      <Bar dataKey={1} fill="#4687db" barSize={20}/>
      <Bar dataKey={0} fill="#697471" barSize={20}/>
      {/* <Bar dataKey={11} fill="#BA3B61" /> */}
      <Bar dataKey={12} fill="#BA3B61" barSize={20}/>
      {/* <Bar dataKey={13} fill="#ec336b" /> */}
      <Bar dataKey={14} fill="#fa044e" barSize={20}/>
      <Bar dataKey={15} fill="#911030" barSize={20}/>
      <XAxis dataKey="name" />

    </BarChart>
  );
}