import React from 'react';
import './App.css';
// Mapping Viewport
import ReactMapGL from 'react-map-gl';
require('dotenv').config()

function App() {

  // holding X,Y coords
  const [position, setPosition] = React.useState({});
  // error handling
  const [error, setError] = React.useState(null);
  // hitbox color
  const [color, setColor] = React.useState("red");
  // map viewport
  const [viewport, setViewport] = React.useState({
    width: 400,
    height: 400,
    latitude: 39.802010,
    longitude: -86.203630,
    zoom: 8
  });

  // watcher functions -- passing in params from coords object
  // https://www.w3schools.com/html/html5_geolocation.asp
  const onChange = ({coords}) => {
    setPosition({
      x: coords.longitude,
      y: coords.latitude,
      z: coords.altitude,
      accuracy: coords.accuracy
    });

    // change hitbox color based on location range
    if ((coords.longitude <= posXmin && coords.longitude >= posXmax) && (coords.latitude >= posYmin && coords.latitude <= posYmax)) {
      setColor("green");
    } else {
      setColor("red");
    }
  }

  const onError = (error) => {
    setError(error.message);
  };

  // const locationOptions = {
  //   // timeout: 1000,
  //   // enableHighAccuracy: true
  // }

  let posXmin = -86.20392;
  let posXmax = -86.20339;
  let posYmin = 39.80190;
  let posYmax = 39.80206;

  // let homeX = -86.203630;
  // let homeY = 39.802010;

  // constantly checking for location to use in location
  React.useEffect( () => {

    const geo = navigator.geolocation;

    if (!geo) {
      setError("Geolocation not working");
      // stop running if not working
      return;
    }

    // grab current geo position
    let watcher = geo.watchPosition(onChange, onError);

    // prevent memory leaks
    return () => geo.clearWatch(watcher);

    // depends
  }, []);

  const hitBox = {
    height: "100px",
    width: "100px",
    backgroundColor: color
  }

  const center = {
    width: "50%",
    margin: "auto",
    padding: "20px"
  }

  return (
    <div style={center}>
      <h3>Longitude: {position.x}</h3>
      <h3>Latitude: {position.y}</h3> 
      <h3>Accuracy: {position.accuracy}</h3>
      <h3>Altitude: {position.z === null ? "No altitude info" : position.z}</h3>

      {error}

      <div style={hitBox}/>

      <div>
        {/* {mapper(position.y, position.x)} */}
        <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.MapboxAccessToken}
        />
      </div>

    </div>
  );
}

export default App;