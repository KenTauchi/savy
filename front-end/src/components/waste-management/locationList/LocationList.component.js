import React, { useState, useEffect } from 'react';

import LocationListItem from '../locationListItem/LocationListItem.component';

import './LocationList.style.scss';

const LocationList = (props) => {

    const { locations, windowWidth } = props;

    // console.log(locations);

    return (
      <div className="location-section">
        <ul className="locationsList">
          {locations.map((location) => (
            <LocationListItem
              key={location.locationId}
              location={location}
              windowWidth={windowWidth}
            />
          ))}
        </ul>
      </div>
    );
}

export default LocationList;