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
      x: coords.longitude.toFixed(5),
      y: coords.latitude.toFixed(5),
      z: coords.altitude,
      accuracy: coords.accuracy
    })
  }

  const onError = (error) => {
    setError(error.message);
  };

  const locationOptions = {
    timeout: 1000,
    enableHighAccuracy: true
  }

  const posXmin = -86.2;
  const posXmax = -86.3;
  const posYmin = 39.8;
  const posYmax = 39.9;

  // constantly checking for location to use in location
  React.useEffect( () => {

    const geo = navigator.geolocation;

    if (!geo) {
      setError("Geolocation not working");
      // stop running if not working
      return;
    }

    // console.log(minX)

    // grab current geo position
    let watcher = geo.watchPosition(onChange, onError, locationOptions);

    // console.log(watcher)

    if ((geo.longitude >= posXmin && geo.longitude <= posXmax) && (geo.latitude >= posYmin && geo.latitude <= posYmax)) {
      setColor("green");
    } else {
      setColor("red");
    }

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

  // const colorBox = (posX, posY) => {
  //   if (posX >= posXmin && posX <= posXmax && posY >= posYmin && posY <= posYmax) {
  //     setColor("green")
  //   } else {
  //     setColor("red")
  //   }
  // }

  return (
    <div style={center}>
      <h3>Longitude: {position.x}</h3>
      <h3>Latitude: {position.y}</h3> 
      <h3>Accuracy: {position.accuracy}</h3>
      <h3>Altitude: {position.z === null ? "No altitude info" : position.z}</h3>

      {error}

      <div style={hitBox}>
      </div>
    </div>
  );
}

export default App;
