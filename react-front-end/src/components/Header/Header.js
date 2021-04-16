import React, { useState, useContext } from 'react';
import { uiContext } from '../States/UIStateProvider'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import HoverImage from "react-hover-image";
import IconButton from '@material-ui/core/IconButton'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextField from '@material-ui/core/TextField';

import ChooseCountry from './ChooseCountry';
import TrendingHash from './TrendingHash';
import './Header.scss';

const CssTextField = withStyles({
  root: {
    '& input': {
      color: '#ffffffe3',
    },
    '& label.Mui-focused': {
      color: '#ffffffe3',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#1DE9B6',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff38',
      },
      '&:hover fieldset': {
        borderColor: '#1DE9B6',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },

})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Header() {
  const classes = useStyles();

  const {
    uiState,
    handleSearch
  } = useContext(uiContext);

  return (
    <nav>
      <div className='headerParent'>
        <HoverImage
          src="./images/logo.png"
          hoverSrc="./images/logohover.png"
          className="logo" />

        <span className='controller' >
          <img src='./images/icon.png' className='searchIcon' alt='' />
          <form className={classes.root} noValidate>
            <CssTextField
              className={classes.margin}
              label=" Search"
              value={uiState.currentTrends}
              onChange={handleSearch}
              variant="outlined"
              InputLabelProps={{ style: { color: '#ffffffb4' } }}
              size="small"
              id="custom-css-outlined-input"
            />
          </form>
          <IconButton
            // className="button start"
            className={!uiState.disableStart && 'activated-start'}
            disabled={uiState.disableStart}
            color="white"
          >
            <PlayCircleOutlineIcon />
          </IconButton>
          <IconButton
            className={!uiState.disablePause && 'activated-pause'}
            disabled={uiState.disablePause}
          >
            <PauseCircleOutlineIcon />
          </IconButton>
          <IconButton
            className={!uiState.disableStop && 'activated-stop'}
          >
            <HighlightOffIcon />
          </IconButton>
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