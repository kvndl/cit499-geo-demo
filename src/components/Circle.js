import React from 'react';

function Circle(props) {

    const style = {
        backgroundColor: "red",
        height: "40px",
        width: "40px",
        borderRadius: "40px"
    }

    return(
        <div style={style}></div>
    )

}

export default Circle;