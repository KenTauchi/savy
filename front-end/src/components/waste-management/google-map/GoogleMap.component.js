import React, { useState, useEffect, PropTypes } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../marker/Marker.component";

// import './GoogleMap.style.scss';


const GoogleMap = (props) => {
  const {
    defaultProps,
    locations,
    displayStyle,
    mapMarkerLocationDetailDisplayHandler,
    getSelectedLocation,
  } = props;

  const [apikey, setApikey] = useState({
    apiKey: {
      development: "",
      product: "AIzaSyBeNxnshtVO9hcgIacX_gHmqtFEY2nm49o",
    },
  });
  
  const Markers = locations.map((location, index) => (
    <Marker
      key={location.address + location.location + index}
      lat={location.latitude}
      lng={location.longitude}
      // any user props
      text={location.locationName}
      location={location}
      mapMarkerLocationDetailDisplayHandler={mapMarkerLocationDetailDisplayHandler}
      getSelectedLocation={getSelectedLocation}
    />
  ));

  return (
    // Important! Always set the container height explicitly
    <div className="google-map-section" style={displayStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apikey.apiKey.development }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
        {Markers}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;

        // <Marker lat={49.2246} lng={-123.1087} text="Langara College!!" />;
