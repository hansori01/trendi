import React from "react";
import { GoogleMap } from "react-google-maps";
import './Map.scss';
import Header from '../Header/Header'
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
require('dotenv').config()

const ReactMap = withScriptjs(withGoogleMap((props) => 
  <GoogleMap
    className="map"
    defaultOptions={{style: props.styles}}
    zoom={10}
    defaultCenter={{ lat: 49.279793, lng: -123.115669 }}
    styles={props.styles}
  >
  </GoogleMap>
));

export default ReactMap;