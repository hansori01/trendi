import React, { useContext } from "react";
// import {tweetContext} from '../States/TweetStateProvider'

import words from './tempWords';
import Wordcloud from './Wordcloud';
import SentiBarChart from './BarChart';
import SentiPieChart from './PieChart';

import './LeftData.scss';

export default function LeftData() {
  
  // const {} = useContext(tweetContext)

  return (
    <section className="leftData">

      <span>Sentiment Analysis</span>
      <div className='dataContainer'>
        <SentiBarChart />
      </ div>

      <span>Pie Chart</span>
      <div className='dataContainer'>
        <SentiPieChart />
      </ div>

      <span>Common words</span>
      <div className='dataContainer'>
        <Wordcloud words={words} />
      </ div>
    </section>
  );
}
