import React, { useContext, useEffect, useState } from "react";
import { uiContext } from "../States/UIStateProvider";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.7),
      marginTop: theme.spacing(1.5),
    },
    margin: theme.spacing(0.7),
    marginBottom: theme.spacing(3),
  },
  chip: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "white",
    fontSize: "1.1rem",
    fontWeight: 600,
    textTransform: "uppercase",
    opacity: 0.65,
    "&:hover": {
      opacity: 0.8,
      borderColor: "transparent",
      background: "linear-gradient(145deg, #0B8692 20%, #00AD82 80%)",
    },
    "&:focus": {
      borderColor: "transparent",
      background: "linear-gradient(145deg, #0B8692 20%, #00AD82 80%)",
      opacity: 1,
    },
  },
}));

export default function TrendingHash(props) {
  const classes = useStyles();

  const { uiState, setUIState, onBackHandler, updateCurrentTrend } = useContext(
    uiContext
  );

  const [trendingHashtags, setTrendingHashtags] = useState([]);

  // request for trending hashtag based on selected location
  useEffect(() => {
    const getTrending = async () => {
      setUIState((prev) => ({ ...prev, loading: true }));

      const trending = await axios.get(
        `http://localhost:8080/api/trending-${uiState.currentCountry}`
      );
      setTrendingHashtags(trending.data);

      setUIState((prev) => ({ ...prev, loading: false }));
    };

    getTrending();
  }, [uiState.currentCountry]);

  // generate chip for each trend
  const trendingList = trendingHashtags.map((hashtag, i) => {
    const clickHandler = () => {
      updateCurrentTrend(hashtag.name);
    };

    return (
      <Chip
        variant="outlined"
        size="large"
        label={hashtag.name}
        key={i}
        className={classes.chip}
        onClick={clickHandler}
      />
    );
  });

  return (
    <>
      <div className="choose">
        Trending in{" "}
        <span className="redText">&nbsp;{uiState.currentCountry}...</span>
      </div>
      <div className="choose">
        Choose a trending topic to activate{" "}
        <span className="greenText">&nbsp;trendi&nbsp;</span>
      </div>
      <div className={classes.root}>{trendingList}</div>
      <Button
        className="backButton"
        variant="contained"
        size="large"
        onClick={onBackHandler}
      >
        Back
      </Button>
    </>
  );
}
