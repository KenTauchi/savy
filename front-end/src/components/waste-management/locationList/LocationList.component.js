import React, { useState, useEffect } from 'react';

import LocationListItem from '../locationListItem/LocationListItem.component';

import './LocationList.style.scss';

const LocationList = (props) => {

    const {
      locations,
      windowWidth,
      displayStyle,
      locationDetailDisplayHandler,
      getSelectedLocation,
    } = props;

    // console.log(locations);

    return (
      <div className="location-section" style={displayStyle}>
        <ul className="locationsList">
          {locations.map((location) => (
            <LocationListItem
              key={location.address + location.location}
              location={location}
              windowWidth={windowWidth}
              locationDetailDisplayHandler={locationDetailDisplayHandler}
              getSelectedLocation={getSelectedLocation}
            />
          ))}
        </ul>
      </div>
    );
}

export default LocationList;