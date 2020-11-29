import React from "react";

import marker from "./home-pin-60px.svg";


const UserMarker = () => {
    // const {
    //     location,
    //     mapMarkerLocationDetailDisplayHandler,
    //     getSelectedLocation,
    //     selected
    // } = props;

    return (
      <div
        className="markerDiv"
        // onClick={() => {
        //   mapMarkerLocationDetailDisplayHandler();
        //   getSelectedLocation(location);
        // }}
      >
        <div className="popupComment">
          <p>Your Location</p>
        </div>
          <img className="markerImage" src={marker} alt="userMarker" />
      </div>
    );
}

export default UserMarker;