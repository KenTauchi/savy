import React from "react";

import arrow from './arrow-direction.png';

import "./LocationListItem.style.scss";

const LocationListItem = (props) => {
    const { location } = props;

    // console.log(location);
  return (
    <li className="locationListItem">
      <div className="locationListItemDescription">
        <p className="listItemFacilityName">{location.name}</p>
        <p className="listItemFacilityPhone">{location.phone}</p>
        <p className="listItemFacilityAddress1">{location.address1}</p>
        <p className="listItemFacilityAddress2">{location.address2}</p>
        <a className="listItemFacilityLink" href="https://{location.linkUrl}">
          {location.linkUrl}
        </a>
      </div>
      <div className="locationListItemDirection">
        <img className="directionArrow" src={arrow} alt="arrow image" />
        <p className="directionDistance">{location.distance} miles</p>
      </div>
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
