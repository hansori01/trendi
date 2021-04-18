import React, { useContext } from "react";

import {tweetContext} from '../States/TweetStateProvider'

// import words from './tempWords';
import Wordcloud from './Wordcloud';
import SentiBarChart from './BarChart';
import SentiPieChart from './PieChart';
import data from "../../temp-data/seedData-location-added"

import './LeftData.scss';

export default function LeftData() {
  
  const {
    tweets
  } = useContext(tweetContext)
  // const positiveTweets = data.filter((tweet) => tweet.sentiment.score > 0);
  // const negativeTweets = data.filter((tweet) => tweet.sentiment.score < 0);
  // const neutralTweets = data.filter((tweet) => tweet.sentiment.score === 0);
  // const tweets = data;
  
  const words = [];
  const getWord = function(wordText) {
    return words.findIndex((word) => word.text===wordText);
  }

  const pushToWordsArray = function(array, isPositive) {
    array.forEach(word => {
      // if the object already exists, update the value of the word
      let wordIndex = getWord(word)
      if (wordIndex > -1) {
        words[wordIndex].value += 1;
      } else {
        //if the object does not exist push to words'
        if(word !== ''){
          words.push({ text: word, value: 1, sentiment: isPositive})
        }
      }
    });
  }
  
  tweets.forEach(tweet => {
    console.log(tweet);
    // the .split is regex to parse an array for our test data
    let negativeWordsArr = tweet.sentiment.negative // .split(/(?:,|\[|\])/gm).slice(1,-1);
    let positiveWordsArr = tweet.sentiment.positive // .split(/(?:,|\[|\])/gm).slice(1,-1);
    pushToWordsArray(negativeWordsArr, false);
    pushToWordsArray(positiveWordsArr, true);
  })

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
