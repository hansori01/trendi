# Trendi

## Summary
This is our final project for Lighthouse Labs. 
The intention of Trendi was to get a generalized view of the sentiment towards a particular topic. 
A user can select a trending or custom topic 
and get a live stream of tweets and locations with a visualized sentiment analysis on that topic.
The colourized overlay allows for quick consumption of data.

# Contributors
- [Isamu Ito](https://github.com/Isams01)
- [Sori Han](https://github.com/hansori01)
- [Josh Rully](https://github.com/JoshuaRully)

# Preview

### Select a country and a popular trend!
!["TrendDemo"](https://github.com/hansori01/trendi/blob/master/react-front-end/public/images/trendi-1.gif?raw=true)

### Watch North America react to the topic live!
!["RealtimeLoading"](https://github.com/hansori01/trendi/blob/master/react-front-end/public/images/trendi-2.gif?raw=true)

### Analytics can be viewed in real time!
!["AnalyticsFocus"](https://github.com/hansori01/trendi/blob/master/react-front-end/public/images/trendi-3.gif?raw=true)

# Dependencies

## Back-End
- Express
- Needle
- Sentiment
- socket.io
- Twit

## Front-End
- React
- Sass
- Axios
- Material-UI
- Recharts
- React-Wordcloud

## API's
- Twitter
- Google Maps JavaScript
- Google Maps Geocoding

# Running the project

Fork this repository, then clone it to your local machine.

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run 
```bash
npm install
``` 
Then run 
```bash 
npm start 
```
and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run 
```bash
npm install
``` 
then 
```bash
npm start
```
to launch the server.

For this project to work you will need API keys from Twitter and Google Maps. The `.example.env` file in both the front end and back end has the necessary fields that you will need to fill out for this to work.

**The steps to get a `Twitter API` key can be found** [here](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api)

**The steps to get a `Google API` key can be found** [here](https://developers.google.com/maps/documentation/javascript/get-api-key)