import React, { useContext } from 'react';
import { uiContext } from '../States/UIStateProvider'

import {
  // fade,
  // ThemeProvider,
  withStyles,
  makeStyles,
  // createMuiTheme,
} from '@material-ui/core/styles';
import HoverImage from "react-hover-image";
import Button from '@material-ui/core/Button'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextField from '@material-ui/core/TextField';

import ChooseCountry from './ChooseCountry';
import TrendingHash from './TrendingHash';
import './Header.scss';
// import { Animated } from "react-animated-css";

const CssTextField = withStyles({
  root: {
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

  const { uiState } = useContext(uiContext);


  return (
    <nav>
      <div className='headerParent'>
        <HoverImage
          src="./images/logo.png"
          hoverSrc="./images/logohover.png"
          className="logo" />

        <span className='controller' >
          <CssTextField
            className={classes.margin}
            label=" Search"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#ffffffb4' },
            }}
            size="small"
          // id="custom-css-outlined-input"
          />

          <Button
            className="button start"
            disabled={uiState.disableStart}
            
          >
            <PlayCircleOutlineIcon />
          </Button>
          <Button
            className="button pause"
            disabled={uiState.disableStart}
          >
            <PauseCircleOutlineIcon />
          </Button>
          <Button
            className="button stop"
            disabled={uiState.disableStart}
          >
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