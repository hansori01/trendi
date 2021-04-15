import React from "react";
import { GoogleMap, OverlayView } from "react-google-maps";
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import './Map.scss';
import './mapStyle';
import Header from '../Header/Header';
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import mapStyle from "./mapStyle";
/*global google*/
require('dotenv').config()



// {lat: 49.2827, lng: -123.1207},
//   {lat: 49.2927, lng: -123.1307},
//   {lat: 49.3027, lng: -123.1407},
//   {lat: 49.3127, lng: -123.1507},
//   {lat: 49.3227, lng: -123.1607},
//   {lat: 49.3327, lng: -123.1707},
// const google = window.google
// const p1 = new google.maps.LatLng(49.2827, -123.1207);
// const p2 = new google.maps.LatLng(49.2927, -123.1307);
// const p3 = new google.maps.LatLng(49.3027, -123.1407);
// const p4 = new google.maps.LatLng(49.3127, -123.1507);
// const p5 = new google.maps.LatLng(49.3227, -123.1607);
// const p6 = new google.maps.LatLng(49.3327, -123.1707);

// const points = [
//   p1,
//   p2,
//   p3,
//   p4,
//   p5,
//   p6,
// ];

const goodgradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
];

const gradient = [
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(255, 0, 0, 1)',
  'rgba(0, 255, 255, 0)',
]

const negativeGradient = ['rgba(255, 0, 0, 1)']

const ReactMap = withScriptjs(withGoogleMap((props) =>

<div className="map">
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
      data={props.tweets.map((tweet) => new google.maps.LatLng(tweet.user_location_coords.lat, tweet.user_location_coords.lng))}
      options={{
        opacity: 0.1,
        gradient: goodgradient,
        radius: 20
      }}
    />
  </GoogleMap>
</div>

));

export default ReactMap;