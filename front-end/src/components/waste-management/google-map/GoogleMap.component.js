import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

import Marker from "../marker/Marker.component";
import UserMarker from "../user-marker/UserMarker.component";


// Import Google Maps API key from .env.local file in front-end directory
const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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

  // console.log(process.env.NODE_ENV);

  const [apikey, setApikey] = useState({
    apiKey: {
      development: "",
      production: api_key,
    },
  });
  
  // Make facilities markers components *************************
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

  // Make user's marker components *************************
  const UsersLocationMarker = (
    <UserMarker
      key={usersLocationProps.center.lat + usersLocationProps.center.lng + "usersLocationPin"}
      lat={usersLocationProps.center.lat}
      lng={usersLocationProps.center.lng}
/>
  )

  // Directions search function *************************
  const handleDirectionsApiLoaded = (map, maps) => {

    if(directionLatlng.lat === undefined || usersLocationProps.center.lng === undefined) {
      return;
    };

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
      },
      (response, status) => {
        if (status === "OK") {
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
          bootstrapURLKeys={{ key: apikey.apiKey[process.env.NODE_ENV] }}
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
          {UsersLocationMarker}
        </GoogleMapReact>
      ) : null}
      {!directionsDisplay ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: apikey.apiKey[process.env.NODE_ENV] }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={currentLocationProps.center}
          zoom={currentLocationProps.zoom}
        >
        {Markers}
        {UsersLocationMarker}
      </GoogleMapReact>
      ) : null}
    </div>
  );
}

export default GoogleMap;