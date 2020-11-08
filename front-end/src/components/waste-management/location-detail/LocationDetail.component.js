import React, { useState, useEffect } from "react";

import x_mark from './closewindow-60px.svg';

// import "./LocationDetail.style.scss";

const LocationDetail = (props) => {
  const { location, displayStyle, locationDetailDisplayHandler } = props;

  const displayUrl = location.website.slice(0, 30) + "...";
  // console.log(location);

  return (
    <div style={displayStyle} className="locationDetailDiv">

      <div className="detailTop">
        <p className="listItemFacilityName">{location.locationName}</p>
  
        <img
          className="x_markImage"
          src={x_mark}
          alt="x_mark"
          onClick={locationDetailDisplayHandler}
        />
      </div>

      <p className="listItemFacilityPhone">{location.phone}</p>
      <p className="listItemFacilityAddress1">{location.address}</p>
      <p className="listItemFacilityAddress2">
        {" "}
        {location.city}, {location.provinceCode}, {location.postalCode}
      </p>
      <a className="listItemFacilityLink" href={location.website}>
        {displayUrl}
      </a>

      <p className="hoursOfOperation">Hours of Operation</p>
      <p className="openingHour">{location.openningHour}</p>

      <p className="materialAccepted">Material accepted</p>
      <ul className="acceptedMaterialsList">
        {location.materials.map((material) => (
          <li>{material}</li>
        ))}
      </ul>

      <p className="notes">Notes</p>
      <p className="locationNotes">{location.locationNotes}</p>
    </div>
  );
};

export default LocationDetail;