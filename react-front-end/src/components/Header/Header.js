import React, { useContext } from 'react';
import { uiContext } from '../States/UIStateProvider'
// import UIStateProvider from '..'
import ChooseCountry from './ChooseCountry';
import TrendingHash from './TrendingHash';
import HoverImage from "react-hover-image";
import { Animated } from "react-animated-css";

import './Header.scss';

export default function Header(props) {

  const {
    uiState,
    // toggleChooseCanada,
    // toggleChooseUsa,
    // onBackHandler,
    // activateTrendi
  } = useContext(uiContext);

  //TODO on picking a chip, update this state for currentTrend
  //TODO on picking a chip, showTrends / chooseCountry = false
  //TODO Show currentTrend on the Header bar when shrunk
  //TODO back button in showTrends


  return (
    <nav>
      <div className='headerParent'>
        <HoverImage src="./images/logo.png" hoverSrc="./images/logohover.png" className="logo" />
        <img src='./images/user.png' alt='' className="userAvatar"></img>
      </div>

      {uiState.chooseCountry && (
        <ChooseCountry
          // chooseCanada={toggleChooseCanada}
          // chooseUsa={toggleChooseUsa}
        />
      )}

      {uiState.showTrends && (
        <TrendingHash
          currentCountry={uiState.currentCountry}
          // onBack={onBackHandler}
          // activateTrendi={activateTrendi}
        />
      )}
    </nav>

  );
}