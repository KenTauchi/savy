import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../marker/Marker.component";

// import './GoogleMap.style.scss';

const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// const api_key = "";

const GoogleMap = (props) => {
  const {
    defaultProps,
    currentLocationProps,
    locations,
    displayStyle,
    mapMarkerLocationDetailDisplayHandler,
    getSelectedLocation,
    selectedLocation,
    directionsDisplay,
    usersLocationProps,
    directionLatlng
  } = props;

  const [apikey, setApikey] = useState({
    apiKey: {
      development: "",
      product: api_key,
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

  const handleDirectionsApiLoaded = (map, maps) => {
    let directionsService = new maps.DirectionsService();
    let directionsRenderer = new maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // console.log(usersLocationProps);
    // console.log(selectedLocation);

    directionsService.route(
      {
        travelMode: maps.TravelMode.DRIVING,
        origin: new maps.LatLng(
          usersLocationProps.center.lat,
          usersLocationProps.center.lng
        ),
        destination: new maps.LatLng(
          directionLatlng.lat,
          directionLatlng.lng
        ),
        // origin: new maps.LatLng(49.2246, -123.1087),
        // destination: new maps.LatLng(49.2206, -123.1107),
      },
      (response, status) => {
        if (status === "OK") {
          // console.log("OK");
          // console.log("response", response);
          // console.log("status", status);
          directionsRenderer.setDirections(response);
        } else {
          console.log("Directions request failed due to " + status);
        }
      }
    );
  };

  return (
    // Important! Always set the container height explicitly
    <div className="google-map-section" style={displayStyle}>
      {directionsDisplay ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: apikey.apiKey.development }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={currentLocationProps.center}
          zoom={currentLocationProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            handleDirectionsApiLoaded(map, maps);
          }}
        >
          {Markers}
        </GoogleMapReact>
      ) : null}
      {!directionsDisplay ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: apikey.apiKey.development }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={currentLocationProps.center}
          zoom={currentLocationProps.zoom}
        >
          {Markers}
        </GoogleMapReact>
      ) : null}
    </div>
  );
}

export default GoogleMap;

        // <Marker lat={49.2246} lng={-123.1087} text="Langara College!!" />;
