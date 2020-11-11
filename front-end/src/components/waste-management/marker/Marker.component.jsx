import React from "react";

import marker from "./map-pin-60px.svg";

// import './Marker.styles.scss';

const Marker = (props) => {
    const {
        location,
        mapMarkerLocationDetailDisplayHandler,
        getSelectedLocation,
        selected
    } = props;

    return (
        <div 
            className={ selected ? "markerDiv selectedMarker" : "markerDiv" }
            onClick={()=>{
                mapMarkerLocationDetailDisplayHandler();
                getSelectedLocation(location);
            }}
            >
            <div className="popupComment">
                <p>{props.text}</p>
            </div>
            <img className="markerImage" src={marker} />
        </div>
    )
}

export default Marker;