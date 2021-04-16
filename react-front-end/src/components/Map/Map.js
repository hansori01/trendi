import React, { useContext } from "react";
// import {tweetContext} from '../States/TweetStateProvider'
import { GoogleMap, OverlayView } from "react-google-maps";
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import './Map.scss';
import './mapStyle';
import Header from '../Header/Header';
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import mapStyle from "./mapStyle";

/* global google */
require('dotenv').config()



const negative = [
  'rgba(228,25,86,0)',
  'rgba(228,25,86,0.1)',
  'rgba(228,25,86,0.2)',
  'rgba(228,25,86,0.25)',
  'rgba(228,25,86,0.3)',
  'rgba(228,25,86,0.35)',
  'rgba(228,25,86,0.4)',
  'rgba(228,25,86,0.45)',
  'rgba(228,25,86,0.5)',
  'rgba(228,25,86,0.65)',
  'rgba(228,25,86,0.7)',
  'rgba(228,25,86,0.8)',
  'rgba(228,25,86,0.9)',
  'rgba(228,25,86,1)',
]

const positive = [
  'rgba(29,233,182,0)',
  'rgba(29,233,182,0.1)',
  'rgba(29,233,182,0.2)',
  'rgba(29,233,182,0.3)',
  'rgba(29,233,182,0.4)',
  'rgba(29,233,182,0.45)',
  'rgba(29,233,182,0.5)',
  'rgba(29,233,182,0.55)',
  'rgba(29,233,182,0.6)',
  'rgba(29,233,182,0.65)',
  'rgba(29,233,182,0.7)',
  'rgba(29,233,182,0.75)',
  'rgba(29,233,182,0.8)',
  'rgba(29,233,182,0.9)',
]

const ReactMap = withScriptjs(withGoogleMap((props) =>

// const {} = useContext(tweetContext)

  <GoogleMap
    defaultOptions={{
      styles: mapStyle,
      disableDefaultUI: true,
    }}
    zoom={10}
    defaultCenter={{ lat: 49.279793, lng: -123.115669 }}
    clickableIcons={false}
  >
    <HeatmapLayer
      // data={props.tweets.map((tweet) => new google.maps.LatLng(tweet.user_location_coords.lat, tweet.user_location_coords.lng))}
      data={[new google.maps.LatLng(49.279793, -123.115669)]}
      options={{
        opacity: 0.5,
        gradient: negative,
        radius: 20
      }}
    />
    <HeatmapLayer
      // data={props.tweets.map((tweet) => new google.maps.LatLng(tweet.user_location_coords.lat, tweet.user_location_coords.lng))}
      data={[new google.maps.LatLng(49.720692, -123.156624)]}
      options={{
        opacity: 1,
        gradient: positive,
        radius: 50
      }}
    />
    
  </GoogleMap>

));

export default ReactMap;