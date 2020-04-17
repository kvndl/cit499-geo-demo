// require('dotenv').config();
import React from 'react';
import { Button, Container, Row, Col, Card, Form, FormControl} from 'react-bootstrap';

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

    // handle form data
    const [formData, setFormData] = React.useState({
        long: '',
        lat: ''
    })

    // map teleport
    const [teleport, setTeleport] = React.useState({
        x: 39.773309,
        y: -86.174698, 
    });

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        })
    }

    const updateFormData = (event) => {
        event.preventDefault();
        setTeleport({
            x: formData.long,
            y: formData.lat
        })
    }

    // mapbox viewport
    // const [viewport, setViewport] = React.useState({
    //     width: 300,
    //     height: 300,
    //     latitude: 39.802010,
    //     longitude: -86.203630,
    //     zoom: 15
    // });

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
            setColor("success");
            setArrive(true);
        } else {
            setColor("danger");
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
        // eslint-disable-next-line
    }, []);

    const center = {
        width: "50%",
        margin: "auto",
        padding: "20px",
    }

    return (
        <div style = {center}>
            <Container fluid>
                <Row>
                    <Col>
                        <Card className = "text-center">
                            <Card.Header>Location Details</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>Longitude: {position.x === null ? "Unable to locate" : position.x}</p>
                                    <p>Latitude: {position.y === null ? "Unable to locate" : position.y}</p> 
                                    <p>Accuracy: {position.accuracy === null ? "No accuracy info" : position.accuracy}</p>
                                    <p>Altitude: {position.altitude === null ? "No altitude info" : position.altitude}</p>

                                    {error}

                                    <Button variant = {color}>{arrive ? "Arrived!" : "Not there yet."}</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br/>
                        <Row>
                            <Col>
                                <div>
                                    <h4 className="text-center">Teleportation Devices</h4>
                                    <Button variant = "danger" size = "lg" onClick = { () => setTeleport({x: 39.773285, y: -86.174703})} block>IUPUI Campus</Button>
                                    <Button variant = "primary" size = "lg" onClick = { () => setTeleport({x: 42.652289, y: -73.756066})} block>Albany, New York</Button>
                                    <Button variant = "primary" size = "lg" onClick = { () => setTeleport({x: 47.605057, y: -122.331554})} block>Seattle, Washington</Button>
                                    <Button variant = "primary" size = "lg" onClick = { () => setTeleport({x: 42.279873, y: -83.742800})} block>Ann Arbor, Michigan</Button>
                                    <br/>
                                    <Form block>
                                            <FormControl type="text" name="long" placeholder="Longitude" onChange={handleFormChange} required/>
                                            <FormControl type="text" name="lat" placeholder="Latitude" onChange={handleFormChange} required/>
                                            <br/>
                                            <Button variant="outline-success" onClick={updateFormData}>Teleport</Button>
                                            <br/>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <div style={{height: "600px", width: "600px", margin: "auto"}}>
                            <GoogleMapReact
                                bootstrapURLKeys = {{key: process.env.REACT_APP_GMToken}}
                                // defaultCenter = {[teleport.x, teleport.y]}
                                defaultZoom = {13}
                                center = {[teleport.x, teleport.y]}
                            >

                                <Circle lat={teleport.x} lng={teleport.y}/>

                            </GoogleMapReact>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Map;