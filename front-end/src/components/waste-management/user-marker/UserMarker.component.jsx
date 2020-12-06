import React from "react";

import marker from "./home-pin-60px.svg";


const UserMarker = () => {

    return (
      <div
        className="markerDiv"
      >
        <div className="popupComment">
          <p>Your Location</p>
        </div>
          <img className="markerImage" src={marker} alt="userMarker" />
      </div>
    );
}

export default UserMarker;