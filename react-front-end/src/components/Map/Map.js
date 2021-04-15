import React, { useContext } from "react";
// import {tweetContext} from '../States/TweetStateProvider'
import { GoogleMap, OverlayView, HeatmapLayer } from "react-google-maps";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import mapStyle from "./mapStyle";
import './Map.scss';
import './mapStyle';

require('dotenv').config()

// const {} = useContext(tweetContext)

const ReactMap = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultOptions={{
      styles: mapStyle,
      disableDefaultUI: true,
    }}
    zoom={10}
    defaultCenter={{ lat: 49.279793, lng: -123.115669 }}
    clickableIcons={false}
  >
  </GoogleMap>

));

export default ReactMap;