import React from "react";

import marker from "./map-pin.png";

import './Marker.styles.scss';

const Marker = (props) => {
    return (
        <div className="markerDiv">
            <div className="popupComment">
                <p>{props.text}</p>
            </div>
            <img className="markerImage" src={marker} />
        </div>
    )
}

export default Marker;