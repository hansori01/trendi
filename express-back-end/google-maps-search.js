const needle = require("needle");
require("dotenv").config();
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

const getLatLngFromLocation = function(location) {
  return new Promise((resolve, reject) => {
    const searchUrl = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_MAPS_GEOCODE_API_KEY}`);
    needle.get(searchUrl, (error, response) => {
      if (error) reject(error);
      if (response.body.results && response.body.results.length > 0) {
        resolve(response.body.results[0].geometry.location);
      } else {
        resolve(null);
      }
    });
  });
};
module.exports = { getLatLngFromLocation };
