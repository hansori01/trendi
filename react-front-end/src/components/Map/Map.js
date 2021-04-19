import React, { useContext } from "react";
import { tweetContext } from "../States/TweetStateProvider";
import { GoogleMap } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
// import data from "../../temp-data/seedData-location-added"

import mapStyle from "./mapStyle";
import "./mapStyle";

import "./Map.scss";
/* global google */

require("dotenv").config();

const negative = [
  "rgba(228,25,86,0)",
  "rgba(228,25,86,0.1)",
  "rgba(228,25,86,0.2)",
  "rgba(228,25,86,0.25)",
  "rgba(228,25,86,0.3)",
  "rgba(228,25,86,0.35)",
  "rgba(228,25,86,0.4)",
  "rgba(228,25,86,0.45)",
  "rgba(228,25,86,0.5)",
  "rgba(228,25,86,0.65)",
  "rgba(228,25,86,0.7)",
  "rgba(228,25,86,0.8)",
  "rgba(228,25,86,0.9)",
  "rgba(228,25,86,1)",
];

const positive = [
  "rgba(29,233,182,0)",
  "rgba(29,233,182,0.1)",
  "rgba(29,233,182,0.2)",
  "rgba(29,233,182,0.3)",
  "rgba(29,233,182,0.4)",
  "rgba(29,233,182,0.45)",
  "rgba(29,233,182,0.5)",
  "rgba(29,233,182,0.55)",
  "rgba(29,233,182,0.6)",
  "rgba(29,233,182,0.65)",
  "rgba(29,233,182,0.7)",
  "rgba(29,233,182,0.75)",
  "rgba(29,233,182,0.8)",
  "rgba(29,233,182,0.9)",
];

const neutral = [
  "rgba(255,165,0,0)",
  "rgba(255,165,0,0.1)",
  "rgba(255,165,0,0.2)",
  "rgba(255,165,0,0.3)",
  "rgba(255,165,0,0.4)",
  "rgba(255,165,0,0.45)",
  "rgba(255,165,0,0.5)",
  "rgba(255,165,0,0.55)",
  "rgba(255,165,0,0.6)",
  "rgba(255,165,0,0.65)",
  "rgba(255,165,0,0.7)",
  "rgba(255,165,0,0.75)",
  "rgba(255,165,0,0.8)",
  "rgba(255,165,0,0.9)",
]


const ReactMap = withScriptjs(
  withGoogleMap((props) => {
    const {
      neutralTweets,
      positiveTweets,
      negativeTweets,
    } = useContext(tweetContext);

    const usedCoords = [];
//check if the coordinates already exist in current stream
    const isInUsedCoords = function(coords) {
      for(const item of usedCoords){
        if (coords.lat === item.lat && coords.lng === item.lng) {
          return true
        }
      }
      return false;
    }

    let negativeData;
    let positiveData;
    let neutralData;
    //offset incoming heatmap to avoid overlap
    const makeUniqueCoord = function(coords) {
      for(const item of usedCoords){
        if (coords.lat === item.lat && coords.lng === item.lng) {
          const updatedCoord = {
            lat: coords.lat + 0.01,
            lng: coords.lng
          }
          while(isInUsedCoords(updatedCoord)){
            updatedCoord.lat += 0.01;
          }
          usedCoords.push(updatedCoord);
          return updatedCoord;
        }
      }
      usedCoords.push(coords);
      return coords;
    }

    if(negativeTweets.length > 0){
      negativeData = negativeTweets.map((tweet) => {
        const lat = tweet.user_location_coords.lat;
        const lng = tweet.user_location_coords.lng
        const coord = makeUniqueCoord({lat, lng});
        return new google.maps.LatLng(coord.lat, coord.lng);
      })
    }

    if (positiveTweets.length > 0) {
      positiveData = positiveTweets.map((tweet) => {
        const lat = tweet.user_location_coords.lat;
        const lng = tweet.user_location_coords.lng
        const coord = makeUniqueCoord({lat, lng});
        return new google.maps.LatLng(coord.lat, coord.lng);
      })
    }

    if (neutralTweets.length > 0) {
      neutralData = neutralTweets.map((tweet) => {
        const lat = tweet.user_location_coords.lat;
        const lng = tweet.user_location_coords.lng
        const coord = makeUniqueCoord({lat, lng});
        return new google.maps.LatLng(coord.lat, coord.lng);
      })
    }


    return (
      <GoogleMap
        defaultOptions={{
          styles: mapStyle,
          disableDefaultUI: true,
        }}
        zoom={4.18}
        defaultCenter={{ lat: 45.2895931, lng: -94.3827119 }}
        clickableIcons={false}
      >
        <HeatmapLayer
          data={negativeData ? negativeData : []}
          options={{
            opacity: 0.75,
            gradient: negative,
            radius: 20,
          }}
        />
        <HeatmapLayer
          data={positiveData ? positiveData : []}
          options={{
            opacity: 0.75,
            gradient: positive,
            radius: 20,
          }}
        />
        <HeatmapLayer
          data={neutralData ? neutralData : []}
          options={{
            opacity: 0.75,
            gradient: neutral,
            radius: 20,
          }}
        />
      </GoogleMap>
    );
  })
);

export default ReactMap;