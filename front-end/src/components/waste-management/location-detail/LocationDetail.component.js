import React from "react";

import x_mark from './closewindow-60px.svg';
import arrow from './directions-60px.svg';

// import "./LocationDetail.style.scss";

const LocationDetail = (props) => {
  const {
    location,
    displayStyle,
    locationDetailDisplayHandler,
    resetSelectedLocation,
    directionsDisplayOn,
  } = props;

  // const displayUrl = location.website;
  const displayUrl = location.website.slice(0, 25) + "...";

  // console.log(location.latitude);
  // console.log(location.longitude);

  // console.log(location.materials);

  // const displayMaterials = [...new Set(location.materials)];

  // displayMaterials.shift();

  // console.log(displayMaterials);

  return (
    <div style={displayStyle} className="locationDetailDiv">
      <div className="detailTop">
        <p className="locationDetailFacilityName">{location.locationName}</p>

        <img
          className="x_markImage"
          src={x_mark}
          alt="x_mark"
          onClick={() => {
            resetSelectedLocation();
            locationDetailDisplayHandler();
          }}
        />
      </div>

      <div className="locationDetailAndDirections">
        <div>
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
        <div className="locationDetailDirection">
          <img
            className="directionArrow"
            src={arrow}
            alt="arrow image"
            onClick={()=>{
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
      </div>

      <p className="hoursOfOperation">Hours of Operation</p>
      <p className="openingHour">{location.openningHour}</p>

      <p className="materialAccepted">Material accepted</p>
      <ul className="acceptedMaterialsList">
        {location.materials.map((material, index) => (
          material != undefined ? <li key={material + index}>{material}</li> : ""
          // <li key={material + index}>{material}</li>
        ))}
      </ul>

      <p className="notes">Notes</p>
      <p className="locationNotes">{location.locationNotes}</p>
    </div>
  );
};

export default LocationDetail;

      // {
      //   location.materials.length < 20 ? (
      //     <React.Fragment>
      //       <p className="materialAccepted">Material accepted</p>
      //       <ul className="acceptedMaterialsList">
      //         {location.materials.map((material, index) => (
      //           <li key={material + index}>{material}</li>
      //         ))}
      //       </ul>
      //     </React.Fragment>
      //   ) : null;
      // }
