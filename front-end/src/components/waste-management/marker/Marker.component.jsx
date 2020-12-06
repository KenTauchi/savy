import React from "react";

import marker from "./green-pin-60px.svg";

import selectedMarker from "./dark-salmon-pin-60px.svg";


const Marker = (props) => {
    const {
        location,
        mapMarkerLocationDetailDisplayHandler,
        getSelectedLocation,
        selected
    } = props;

    return (
      <div
        className={selected ? "markerDiv selectedMarker" : "markerDiv"}
        onClick={() => {
          mapMarkerLocationDetailDisplayHandler();
          getSelectedLocation(location);
        }}
      >
        <div className="popupComment">
          <p>{props.text}</p>
        </div>
        { !selected ? (
          <img className="markerImage" src={marker} />
        ) : (
          <img className="markerImage" src={selectedMarker} />
        )}
      </div>
    );
}

export default Marker;