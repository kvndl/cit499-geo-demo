// require('dotenv').config();
import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

// Mapbox Viewport
// import ReactMapGL, {NavigationControl} from 'react-map-gl';

// Google Map React
import GoogleMapReact from 'google-map-react';
import Circle from './Circle';

function Map() {

    // holding X,Y coords
    const [position, setPosition] = React.useState({});
    // error handling
    const [error, setError] = React.useState(null);
    // hitbox color
    const [color, setColor] = React.useState("red");
    // map viewport
    const [viewport, setViewport] = React.useState({
        width: 300,
        height: 300,
        latitude: 39.802010,
        longitude: -86.203630,
        zoom: 15
    });
    // on arrival
    const [arrive, setArrive] = React.useState(false);

    let posXmin = -86.20392;
    let posXmax = -86.20339;
    let posYmin = 39.80170;
    let posYmax = 39.80206;

    // let posXmax = -86.2026
    // let posYmax = 39.807

    // watcher functions -- passing in params from coords object
    // https://www.w3schools.com/html/html5_geolocation.asp
    const onChange = ({coords}) => {
        setPosition({
            x: coords.longitude.toFixed(5),
            y: coords.latitude.toFixed(5),
            z: coords.altitude,
            accuracy: coords.accuracy
        });

        // change hitbox color based on location range
        if ((coords.longitude >= posXmin && coords.longitude <= posXmax) && (coords.latitude >= posYmin && coords.latitude <= posYmax)) {
            setColor("green");
            setArrive(true);
        } else {
            setColor("red");
            setArrive(false);
        }
    }

    const onError = (error) => {
        setError(error.message);
    };

    const options = {
        enableHighAccuracy: true
    }

    // constantly checking for location to use in location
    React.useEffect( () => {

        const geo = navigator.geolocation;

        if (!geo) {
            setError("Geolocation not working");
            // stop running if not working
            return;
        }

        // grab current geo position
        let watcher = geo.watchPosition(onChange, onError, options);

        // prevent memory leaks
        return () => geo.clearWatch(watcher);

        // depends
    }, []);

    const hitBox = {
        height: "100px",
        width: "100px",
        backgroundColor: color,
    }

    const center = {
        width: "50%",
        margin: "auto",
        padding: "20px",
    }

    return (
        <div style = {center}>
            <Container>
                <Row>
                    <Col>
                        <Card className = "text-center">
                            <Card.Header>Location Details</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>Longitude: {position.x}</p>
                                    <p>Latitude: {position.y}</p> 
                                    <p>Accuracy: {position.accuracy}</p>
                                    <p>Altitude: {position.z === null ? "No altitude info" : position.z}</p>

                                    {error}

                                    <div style={hitBox}>
                                        <div>
                                            {arrive ? "Arrived!" : "Not there yet."}
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Row>
                            <Col>
                                <div>
                                    <Button variant = "danger" size = "lg" block>Target</Button>
                                    <Button variant = "primary" size = "lg" block>Albany, New York</Button>
                                    <Button variant = "primary" size = "lg" block>Seattle, Washington</Button>
                                    <Button variant = "primary" size = "lg" block>Ann Arbor Michigan</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        {/* <div>
                            <ReactMapGL
                            {...viewport}
                            onViewportChange={setViewport}
                            mapboxApiAccessToken={process.env.REACT_APP_MBToken}
                            >
                                <div style={{position: 'absolute', right: 0}}>
                                <NavigationControl />
                                </div>
                            </ReactMapGL>
                        </div> */}

                        <div style={{height: "600px", width: "600px"}}>
                            <GoogleMapReact
                                bootstrapURLKeys = {{key: process.env.REACT_APP_GMToken}}
                                defaultCenter = {[29.9792, 31.1342]}
                                defaultZoom = {5}
                            >

                                <Circle lat={29.9792} lng={31.1342}/>

                            </GoogleMapReact>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Map;