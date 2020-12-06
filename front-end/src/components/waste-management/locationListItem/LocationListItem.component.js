import React from "react";

import arrow from './directions-60px.svg';


const LocationListItem = (props) => {
  const {
    location,
    locationDetailDisplayHandler,
    getSelectedLocation,
    directionsDisplayOn,
    windowWidth,
  } = props;

  const displayUrl = location.website.slice(0, 30) + "..."

  return (
    <li className="locationListItem">
      <div className="locationListItemDescription">
        <p
          className="listItemFacilityName"
          onClick={() => {
            locationDetailDisplayHandler();
            getSelectedLocation(location);
          }}
        >
          {location.locationName}
        </p>
        <p className="listItemFacilityPhone">{location.phone}</p>
        <p className="listItemFacilityAddress1">{location.address}</p>
        <p className="listItemFacilityAddress2">
          {" "}
          {location.city}, {location.provinceCode}, {location.postalCode}
        </p>
        <a
          className="listItemFacilityLink"
          href={location.website}
          target="_blank"
        >
          {displayUrl}
        </a>
      </div>

      <div className="locationListItemDirection">
        <img
          className="directionArrow"
          src={arrow}
          alt="arrow image"
          onClick={()=>{
            if(windowWidth >= 768){
              locationDetailDisplayHandler();
              getSelectedLocation(location);
              }
            directionsDisplayOn(
              parseFloat(location.latitude),
              parseFloat(location.longitude)
            );
          }}
        />
        {location.distance ? (
          <p className="directionDistance">{location.distance} km</p>
        ) : null}
      </div>
    </li>
  );
};

export default LocationListItem;