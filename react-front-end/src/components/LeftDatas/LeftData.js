import React from 'react';

import words from './tempWords';

import './LeftData.scss';
import Wordcloud from './Wordcloud';
import SentiBarChart from './BarChart';

export default function LeftData() {

  return (
    <section className="leftData">

      <span>Sentiment Analysis</span>
      <div className='dataContainer'>
        <SentiBarChart />
      </ div>

      <span>Common words</span>
      <div className='dataContainer'>
        <Wordcloud words={words} />
      </ div>
    </section>
  );
}