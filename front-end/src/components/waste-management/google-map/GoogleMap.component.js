import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../marker/Marker.component";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = (props) => {
  const [apikey, setApikey] = useState({
    apiKey: {
      development: "",
      product: "AIzaSyBeNxnshtVO9hcgIacX_gHmqtFEY2nm49o",
    },
  });

  const { defaultProps, locations } = props;
  
  const Markers = locations.map((location, index) => (
    <Marker
      key={location.id}
      lat={location.lat}
      lng={location.lng}
      // any user props
      text={location.name}
    />
  ));

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apikey.apiKey.development }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={49.2246} lng={-123.1087} text="Langara College!!" />
        {Markers}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;