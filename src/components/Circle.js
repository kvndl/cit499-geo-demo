import React from 'react';

function Circle(props) {

    const style = {
        // backgroundColor: "red",
        height: "40px",
        width: "40px",
        position: "relative",
        margin: "auto",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0"
        // borderRadius: "40px"
    }

    return(
        <img src="https://i.ya-webdesign.com/images/transparent-live-animated-gif-3.gif" style={style} alt="map marker"></img>
    )

}

export default Circle;