import React, { useState, useEffect } from "react";

import x_mark from './x-mark.png';

import "./LocationDetail.style.scss";

const LocationDetail = (props) => {
  const { location, displayStyle, locationDetailDisplayHandler } = props;

  const displayUrl = location.website.slice(0, 30) + "...";
  // console.log(location);

  return (
    <div style={displayStyle} className="locationDetailDiv">
      <p className="listItemFacilityName">{location.name}</p>
      <p className="listItemFacilityPhone">{location.phone}</p>
      <p className="listItemFacilityAddress1">{location.address}</p>
      <p className="listItemFacilityAddress2">
        {" "}
        {location.cityId}, {location.postalCode}
      </p>
      <a className="listItemFacilityLink" href={location.website}>
        {displayUrl}
      </a>

      <p className="hoursOfOperation">Hours of Operation</p>
      <p className="openingHour">{location.openingHour}</p>

      <p className="materialAccepted">Material accepted</p>
      <ul>
        <li></li>
      </ul>

      <p className="notes">Notes</p>
      <p className="locationNotes">{location.locationNotes}</p>

      <img
        className="x_markImage"
        src={x_mark}
        alt="x_mark"
        onClick={locationDetailDisplayHandler}
      />
    </div>
  );
};

export default LocationDetail;