import React, { useState } from 'react';
import HoverImage from "react-hover-image";

import './Header.scss';
import ChooseCountry from './Start';
import TrendingHash from './TrendingHash';
import { Animated } from "react-animated-css";


export default function Header() {

  //controls which header component is shown
  const [headerState, setHeaderState] = useState({
    chooseCountry: true,
    showTrends: false,
    currentCountry: '',
    currentTrend: '',
  })
  //TODO on picking a chip, update this state for currentTrend
  //TODO on picking a chip, showTrends / chooseCountry = false
  //TODO Show currentTrend on the Header bar when shrunk
  //TODO back button in showTrends

  const toggleChooseCanada = () => {
    console.log('choosing canada')
    setHeaderState(prev => ({ ...prev, chooseCountry: !headerState.chooseCountry, showTrends: !headerState.showTrends, currentCountry: 'Canada' }));
  }
  const toggleChooseUsa = () => {
    console.log('choosing usa')
    setHeaderState(prev => ({ ...prev, chooseCountry: !headerState.chooseCountry, showTrends: !headerState.showTrends, currentCountry: 'USA' }));
  }

const onBackHandler = () => {
  setHeaderState(prev => ({...prev, chooseCountry: true, showTrends: false}))
}


  return (
    <nav>
      <div className='headerParent'>
        <HoverImage src="./images/logo.png" hoverSrc="./images/logohover.png" className="logo" />
        <img src='./images/user.png' alt='' className="userAvatar"></img>
      </div>

      {headerState.chooseCountry && (
        <ChooseCountry chooseCanada={toggleChooseCanada} chooseUsa={toggleChooseUsa} />
      )}

      {headerState.showTrends && (
        <TrendingHash currentCountry={headerState.currentCountry} onBack={onBackHandler}  />
      )}

    </nav>

  );
}