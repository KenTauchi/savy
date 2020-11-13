import React from "react";

import arrow from './directions-60px.svg';

// import "./LocationListItem.style.scss";

const LocationListItem = (props) => {
  const {
    location,
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
          {location.locationName}
        </p>
        <p className="listItemFacilityPhone">{location.phone}</p>
        <p className="listItemFacilityAddress1">{location.address}</p>
        <p className="listItemFacilityAddress2">
          {" "}
          {location.city}, {location.provinceCode}, {location.postalCode}
        </p>
        <a className="listItemFacilityLink" href={location.website}>
          {displayUrl}
        </a>
      </div>

      <div className="locationListItemDirection">
        <img className="directionArrow" src={arrow} alt="arrow image" />
        {location.distance ? <p className="directionDistance">{location.distance} km</p> : null}
      </div>
    </li>
  );
};

export default LocationListItem;

// {
//   windowWidth >= 768 ? (
//     <div className="locationListItemDirection">
//       <img className="directionArrow" src={arrow} alt="arrow image" />
//       <p className="directionDistance">{location.distance} miles</p>
//     </div>
//   ) : (
//     <div className="rightArrowDiv">
//       <img
//         className="rightArrow"
//         src={arrowRight}
//         alt="arrow image"
//         onClick={() => {
//           locationDetailDisplayHandler();
//           getSelectedLocation(location);
//         }}
//       />
//     </div>
//   )
// }
// *****************************************************************************************************************
// <li className="locationListItem">
//   <div className="locationListItemDescription">
//     <p
//       className="listItemFacilityName"
//       onClick={() => {
//         locationDetailDisplayHandler();
//         getSelectedLocation(location);
//       }}
//     >
//       {location.name}
//     </p>
//     <p className="listItemFacilityPhone">{location.phone}</p>
//     <p className="listItemFacilityAddress1">{location.address}</p>
//     <p className="listItemFacilityAddress2">
//       {" "}
//       {location.cityId}, {location.postalCode}
//     </p>
//     <a className="listItemFacilityLink" href={location.website}>
//       {displayUrl}
//     </a>
//   </div>

//   {windowWidth >= 768 ? (
//     <div className="locationListItemDirection">
//       <img className="directionArrow" src={arrow} alt="arrow image" />
//       <p className="directionDistance">{location.distance} miles</p>
//     </div>
//   ) : (
//       <div className="rightArrowDiv">
//         <img
//           className="rightArrow"
//           src={arrowRight}
//           alt="arrow image"
//           onClick={() => {
//             locationDetailDisplayHandler();
//             getSelectedLocation(location);
//           }}
//         />
//       </div>
//     )}
// </li>
