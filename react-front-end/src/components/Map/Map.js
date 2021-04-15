import React from "react";
import { GoogleMap, OverlayView, HeatmapLayer } from "react-google-maps";
import './Map.scss';
import './mapStyle';
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import mapStyle from "./mapStyle";
require('dotenv').config()

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