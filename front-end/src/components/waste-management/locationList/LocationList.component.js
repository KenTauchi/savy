import React, { useState, useEffect } from 'react';

import LocationListItem from '../locationListItem/LocationListItem.component';

import './LocationList.style.scss';

const LocationList = (props) => {

    const { locations } = props;

    // console.log(locations);

    return (
      <div className="location-section">
        <ul className="facilityList">
          {locations.map((location) => (
            <LocationListItem key={location.id} location={location} />
          ))}
        </ul>
      </div>
    );
}

export default LocationList;