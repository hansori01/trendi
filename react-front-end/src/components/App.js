import React from 'react';
// import axios from 'axios';

// import Buttons from './Buttons'
// import CustomizedSwitches from './Switches'
// import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Header from './Header.js'
import LeftSearch from './LeftSearch'
import RightTweets from './RightTweets/RightTweets'
import MapContainer from './Map/Map.js'
// import Paper from '@material-ui/core/Paper';
// import DeleteIcon from '@material-ui/icons/Delete';

import './App.scss';






export default function App() {


  return (
    <div className="App">
      {/* {Map} */}
      <MapContainer />
      {/* <Header /> */}
      <LeftSearch />
      <RightTweets />
    </div>
  );

  // return (
  //   <div>
  //     <Paper variant="outlined" square />
  //     <Buttons />
  //     <CustomizedSwitches />
  //     <CircularProgress />
  //     <CircularProgress color="secondary" />
  //     <LinearProgress />
  //     <LinearProgress color="secondary" />
  //   </div>

  // );
}
