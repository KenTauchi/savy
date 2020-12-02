import React from 'react';

import LocationListItem from '../locationListItem/LocationListItem.component';

// import './LocationList.style.scss';

const LocationList = (props) => {

    const {
      locations,
      windowWidth,
      displayStyle,
      locationDetailDisplayHandler,
      getSelectedLocation,
      directionsDisplayOn,
      // getDirectionLatlng
    } = props;

    // console.log(locations);

    return (
      <div className="location-section" style={displayStyle}>
        <ul className="locationsList">
          {locations.map((location, index) => (
            <LocationListItem
              key={location.address + location.location + index}
              location={location}
              windowWidth={windowWidth}
              locationDetailDisplayHandler={locationDetailDisplayHandler}
              getSelectedLocation={getSelectedLocation}
              directionsDisplayOn={directionsDisplayOn}
              // getDirectionLatlng={getDirectionLatlng}
            />
          ))}
        </ul>
      </div>
    );
}

export default LocationList;