import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, HeatMap } from "google-maps-react";
import './Map.scss';
import mapStyle from './mapStyle';
import Header from '../Header/Header'
require('dotenv').config()

export class MapContainer extends Component {
  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle
    });
  }

  // state = { 
  //   positions: this.props.positions,
  // }
  
  // componentDidMount() {

  // }

  // componentDidUpdate() {
  //   this.setState({
  //     positions: this.props.positions
  //   });
  // };

  // componentWillUnmount() {
  //   console.log("Unmounted");
  // }
  // onMapClick({x, y, lat, lng, event}) {
  //   if (this._googleMap !== undefined) {
      // const point = new google.maps.LatLng(lat, lng)
      // this._googleMap.heatmap.data.push(point)
  //   }
  // }
  

  render() {
    const coords = { lat: 49.279793, lng: -123.115669 };

    const heatMapData = {
      positions: [
        {lat: 49.2827, lng:-123.1217},
        {lat: 49.2828, lng:-123.1227},
        {lat: 49.2829, lng:-123.1237},
        {lat: 49.2830, lng:-123.1247},
        {lat: 49.2927, lng:-123.157}
      ],
      options: {   
        radius: 20,   
        opacity: 0.6,
        weight: 20
      }
    }

    // console.log("positions: ", this.props.positions);

    const gradient = [
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
    return (
      <Map
        className="map"
        style={this.mapStyle}
        disableDefaultUI={true}
        google={this.props.google}
        zoom={10}
        initialCenter={coords}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
      >
        <Marker position={coords} />
      <Header
        activateContainer={this.props.activateContainer}
        deactivateContainer={this.props.deactivateContainer}
      />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY,
  libraries: ["visualization"]
})(MapContainer);