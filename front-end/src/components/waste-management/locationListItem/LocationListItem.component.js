import React, { useState, useEffect } from "react";

import arrow from './arrow-direction.png';
import arrowRight from './arrow-right.png';

import "./LocationListItem.style.scss";

const LocationListItem = (props) => {
  const {
    location,
    windowWidth,
    locationDetailDisplayHandler,
    getSelectedLocation,
  } = props;

  const displayUrl = location.website.slice(0, 30) + "..."
  // console.log(location);

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
          {location.name}
        </p>
        <p className="listItemFacilityPhone">{location.phone}</p>
        <p className="listItemFacilityAddress1">{location.address}</p>
        <p className="listItemFacilityAddress2">
          {" "}
          {location.cityId}, {location.postalCode}
        </p>
        <a className="listItemFacilityLink" href={location.website}>
          {displayUrl}
        </a>
      </div>

      {windowWidth >= 768 ? (
        <div className="locationListItemDirection">
          <img className="directionArrow" src={arrow} alt="arrow image" />
          <p className="directionDistance">{location.distance} miles</p>
        </div>
      ) : (
        <div className="rightArrowDiv">
          <img
            className="rightArrow"
            src={arrowRight}
            alt="arrow image"
            onClick={() => {
              locationDetailDisplayHandler();
              getSelectedLocation(location);
            }}
          />
        </div>
      )}
    </li>
  );
};

export default LocationListItem;

    // <li className="locationListItem">
    //   <div className="locationListItemDescription">
    //     <p className="listItemFacilityName">Facility Name</p>
    //     <p className="listItemFacilityTel">(236)402-9393 / (236)402-9393</p>
    //     <p className="listItemFacilityAddress1">1387 Richards Street</p>
    //     <p className="listItemFacilityAddress2">Vancouver, BC V6G 0B6</p>
    //     <a
    //       className="listItemFacilityLink"
    //       href="https://recyclinglocationname.com"
    //     >
    //       recyclinglocationname.com
    //     </a>
    //   </div>
    //   <div className="locationListItemDirection">
    //     <img className="directionArrow" src={arrow} alt="arrow image" />
    //     <p className="directionDistance">12.5 miles</p>
    //   </div>
    // </li>;
