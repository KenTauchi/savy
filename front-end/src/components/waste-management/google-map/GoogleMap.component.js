import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../marker/Marker.component";

import './GoogleMap.style.scss';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = (props) => {
  const [apikey, setApikey] = useState({
    apiKey: {
      development: "",
      product: "AIzaSyBeNxnshtVO9hcgIacX_gHmqtFEY2nm49o",
    },
  });

  const {
    defaultProps,
    locations,
    displayStyle,
    mapMarkerLocationDetailDisplayHandler,
    getSelectedLocation,
  } = props;
  
  const Markers = locations.map((location, index) => (
    <Marker
      key={location.locationId}
      lat={location.latitude}
      lng={location.longitude}
      // any user props
      text={location.name}
      location={location}
      mapMarkerLocationDetailDisplayHandler={mapMarkerLocationDetailDisplayHandler}
      getSelectedLocation={getSelectedLocation}
    />
  ));

  // console.log(Markers);

  return (
    // Important! Always set the container height explicitly
    <div className="google-map-section" style={displayStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apikey.apiKey.development }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {Markers}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;

        // <Marker lat={49.2246} lng={-123.1087} text="Langara College!!" />;
