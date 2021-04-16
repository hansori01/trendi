import React, { useState, useContext } from 'react';
import { uiContext } from '../States/UIStateProvider'
import HoverImage from "react-hover-image";
import Button from '@material-ui/core/Button'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ChooseCountry from './ChooseCountry';
import TrendingHash from './TrendingHash';
import './Header.scss';
import { Animated } from "react-animated-css";


export default function Header(props) {

  const { uiState } = useContext(uiContext);

  //TODO on picking a chip, update this state for currentTrend
  //TODO on picking a chip, showTrends / chooseCountry = false
  //TODO Show currentTrend on the Header bar when shrunk
  //TODO back button in showTrends

  return (
    <nav>
      <div className='headerParent'>
        <HoverImage
          src="./images/logo.png"
          hoverSrc="./images/logohover.png"
          className="logo" />
        <span className='controllerButtons' >
          <Button className="button start">
            <PlayCircleOutlineIcon />
          </Button>
          <Button className="button pause">
            <PauseCircleOutlineIcon />
          </Button>
          <Button className="button stop">
            <HighlightOffIcon />
          </Button>
        </span>

        <img
          src='./images/user.png'
          alt=''
          className="userAvatar">
        </img>
      </div>

      {uiState.chooseCountry && (
        <ChooseCountry />
      )}

      {uiState.showTrends && (
        <TrendingHash />
      )}
    </nav>

  );
}