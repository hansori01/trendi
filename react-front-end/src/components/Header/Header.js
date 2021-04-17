import React, { useState, useContext } from 'react';
import { uiContext } from '../States/UIStateProvider'
import { tweetContext } from '../States/TweetStateProvider'

import { withStyles, makeStyles } from '@material-ui/core/styles';
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
    width: '20vw',
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
    handleSearch,
    reset,
    activateTrendi
  } = useContext(uiContext);

  const {
    socket
  } = useContext(tweetContext);

  //new socket logic when clicking on start, or pressing enter
  const startStream = (event) => {
    // console.log('click handler strat stream', uiState.currentTrend)
    activateTrendi(event);
    socket.emit('start', uiState.currentTrend);
  }

  const pauseStream = () => {
    socket.emit('stop');
  }


  return (
    <nav>
      <div className='headerParent'>
        {!uiState.trendiActivated && (
          <img src='./images/logo.png' alt='' className='logo' />
        )}
        {uiState.trendiActivated && (
          <img src='./images/logoactivated.png' alt='' className='logo' />
        )}

        <span className='controller' >
          {uiState.trendiActivated && (
            <img src='./images/icon.png' className='searchIcon' alt='' />
          )}

          {!uiState.disableSearch && (
            <>
              <form className={classes.root} onSubmit={activateTrendi} noValidate>
                <CssTextField
                  className={classes.margin}
                  label={!uiState.disableSearch && "Trendi Search"}
                  value={uiState.currentTrend}
                  disabled={uiState.disableSearch}
                  onChange={handleSearch}
                  InputLabelProps={{ style: { color: '#ffffffb4' } }}
                  size="small"
                  id="custom-css-outlined-input"
                  onSubmit={e=>startStream(e)}
                />
              </form>

            </>
          )}
          {uiState.trendiActivated && (
            <span className="greenText currentTrend">{uiState.currentTrend}</span>
          )}
          {uiState.showController && (
            <>
              <IconButton
                className={!uiState.disableStart && 'activated-start'}
                disabled={uiState.disableStart}
                onClick={startStream}>
                <PlayCircleOutlineIcon className='controllerIcon' />
              </IconButton>
              <IconButton
                className={!uiState.disablePause && 'activated-pause'}
                disabled={uiState.disablePause}
                onClick={pauseStream}>
                <PauseCircleOutlineIcon className='controllerIcon' />
              </IconButton>
              <IconButton
                className={!uiState.disableStop && 'activated-stop'}
                disabled={uiState.disableStop}
                onClick={reset}>
                <HighlightOffIcon className='controllerIcon' />
              </IconButton>
            </>
          )}
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