import React from 'react';
import './App.css';

function App() {

  // holding X,Y coords
  const [position, setPosition] = React.useState({});
  // error handling
  const [error, setError] = React.useState(null);
  // hitbox color
  const [color, setColor] = React.useState("red");

  // watcher functions -- passing in params from coords object
  // https://www.w3schools.com/html/html5_geolocation.asp
  const onChange = ({coords}) => {
    setPosition({
      x: coords.longitude,
      y: coords.latitude,
      z: coords.altitude,
      accuracy: coords.accuracy
    });

    console.log("minimum long " + posXmin)
    console.log("maximum long " + posXmax)
    console.log("coords.long " + coords.longitude)
    console.log("minimum lat " + posYmin)
    console.log("maximum lat " + posYmax)
    console.log("coords.lat " + coords.latitude)

    // change hitbox color based on location range
    if ((coords.longitude >= posXmin || coords.longitude <= posXmax) || (coords.latitude >= posYmin || coords.latitude <= posYmax)) {
      setColor("green");
    } else {
      setColor("red");
    }
  }

  const onError = (error) => {
    setError(error.message);
  };

  const locationOptions = {
    // timeout: 1000,
    enableHighAccuracy: true
  }

  let posXmin = -86.202;
  let posXmax = -86.204;
  let posYmin = 39.801;
  let posYmax = 39.803;

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

    </div>
  );
}

export default App;