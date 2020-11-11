import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../marker/Marker.component";

// import './GoogleMap.style.scss';


const GoogleMap = (props) => {
  const {
    defaultProps,
    currentLocationProps,
    locations,
    displayStyle,
    mapMarkerLocationDetailDisplayHandler,
    getSelectedLocation,
    selectedLocation
  } = props;

  const [apikey, setApikey] = useState({
    apiKey: {
      development: "",
      product: "AIzaSyBeNxnshtVO9hcgIacX_gHmqtFEY2nm49o",
    },
  });
  
  const Markers = locations.map((location, index) => {
    let selected = false;

    if (
      location.latitude === selectedLocation.latitude &&
      location.longitude === selectedLocation.longitude
    ) {
      selected = true;
    }

      return (
        <Marker
          key={location.address + location.location + index}
          lat={location.latitude}
          lng={location.longitude}
          // any user props
          text={location.locationName}
          location={location}
          mapMarkerLocationDetailDisplayHandler={
            mapMarkerLocationDetailDisplayHandler
          }
          getSelectedLocation={getSelectedLocation}
          selected={selected}
        />
      );
    });

  return (
    // Important! Always set the container height explicitly
    <div className="google-map-section" style={displayStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apikey.apiKey.development }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={currentLocationProps.center}
        zoom={currentLocationProps.zoom}
      >
        {Markers}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;

        // <Marker lat={49.2246} lng={-123.1087} text="Langara College!!" />;
