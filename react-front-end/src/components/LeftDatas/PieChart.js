import React, { useContext } from "react";
import { tweetContext } from "../States/TweetStateProvider";

import { PieChart, Pie, Cell, Legend } from "recharts";

import "./LeftData.scss";

const COLORS = ["#1DE9B6", "#e41956", "#FFA500"];

export default function SentiPieChart() {
  const { positiveTweets, negativeTweets, neutralTweets } = useContext(
    tweetContext
  );

  // uses the length of tweet sentiment arrays to pass values to pie chart
  const data = [
    { name: "Positive", value: positiveTweets.length },
    { name: "Negative", value: negativeTweets.length },
    { name: "Neutral", value: neutralTweets.length },
  ];

  return (
    <PieChart
      margin={{ top: 30 }}
      width={window.innerWidth < 1550 ? 350 : 380}
      height={350}
      className="piechart"
    >
      <Legend iconSize={0} verticalAlign="top" align="left" />
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
