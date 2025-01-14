import React, { useContext } from "react";
import { uiContext } from "../States/UIStateProvider";
import { tweetContext } from "../States/TweetStateProvider";

import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from "@material-ui/core/TextField";

import ChooseCountry from "./ChooseCountry";
import TrendingHash from "./TrendingHash";
import "./Header.scss";

const CssTextField = withStyles({
  root: {
    width: "20vw",
    "& input": {
      color: "#ffffffe3",
    },
    "& label.Mui-focused": {
      color: "#ffffffe3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1DE9B6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffffff38",
      },
      "&:hover fieldset": {
        borderColor: "#1DE9B6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
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
    activateTrendi,
    pauseStreamHandler,
  } = useContext(uiContext);

  const { socket, setTweets, setTweetScores } = useContext(tweetContext);

  const startStream = (event) => {
    activateTrendi(event);
    socket.emit("start", uiState.currentTrend);
  };

  const pauseStream = () => {
    socket.emit("please_stop", "pausing");
    pauseStreamHandler();
  };

  const stopStream = () => {
    socket.emit("please_stop", "pausing");
    reset();
    setTweets([]);
    setTweetScores({
      veryNeg: 0,
      neg: 0,
      slightNeg: 0,
      neutral: 0,
      slightPos: 0,
      pos: 0,
      veryPos: 0,
    });
  };

  return (
    <nav>
      <div className="headerParent">
        {!uiState.trendiActivated && (
          <img src="./images/logo.png" alt="" className="logo" />
        )}
        {uiState.trendiActivated && (
          <img src="./images/logoactivated.png" alt="" className="logo" />
        )}

        <span className="controller">
          {uiState.trendiActivated && (
            <img src="./images/icon.png" className="searchIcon" alt="" />
          )}

          {!uiState.disableSearch && (
            <>
              <form
                className={classes.root}
                onSubmit={(e) => startStream(e)}
                noValidate
              >
                <CssTextField
                  className={classes.margin}
                  label={!uiState.disableSearch && "Trendi Search"}
                  value={uiState.currentTrend}
                  disabled={uiState.disableSearch}
                  onChange={handleSearch}
                  InputLabelProps={{ style: { color: "#ffffffb4" } }}
                  inputProps={{ autoComplete: "off" }}
                  size="small"
                  id="custom-css-outlined-input"
                  onSubmit={(e) => startStream(e)}
                />
              </form>
            </>
          )}
          {uiState.trendiActivated && (
            <span className="greenText currentTrend">
              {uiState.currentTrend}
            </span>
          )}
          {uiState.showController && (
            <>
              <IconButton
                className={!uiState.disableStart && "activated-start"}
                disabled={uiState.disableStart}
                onClick={startStream}
              >
                <PlayCircleOutlineIcon className="controllerIcon" />
              </IconButton>
              <IconButton
                className={!uiState.disablePause && "activated-pause"}
                disabled={uiState.disablePause}
                onClick={pauseStream}
              >
                <PauseCircleOutlineIcon className="controllerIcon" />
              </IconButton>
              <IconButton
                className={!uiState.disableStop && "activated-stop"}
                disabled={uiState.disableStop}
                onClick={stopStream}
              >
                <HighlightOffIcon className="controllerIcon" />
              </IconButton>
            </>
          )}
        </span>

        <img src="./images/user.png" alt="" className="userAvatar"></img>
      </div>

      {uiState.loading && <LinearProgress color="secondary" />}
      {uiState.chooseCountry && <ChooseCountry />}

      {uiState.showTrends && <TrendingHash />}
    </nav>
  );
}
