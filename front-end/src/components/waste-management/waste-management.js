import React, { useState, useEffect } from "react";
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from './filter/Filter.component';
import LocationList from './locationList/LocationList.component';
import GoogleMap from './google-map/GoogleMap.component';
import RecyclingFacts from './recycling-fact/recycling-fact';
import ExploreQuiz from './explore-quiz/explore-quiz';

import { LOCATION_DATA } from './TEST_locations.data.js';

import "./waste-management.style.scss";

const WasteManagement = () => {
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 49.2246,
      lng: -123.1087,
    },
    zoom: 11,
  });
  const [locations, setLocations] = useState(LOCATION_DATA);
  const [mapAndMaterialDisplay, setmapAndMaterialDisplay] = useState({
    map: true,
    material: false
  });
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  const displaySizeListener = () => {
    const newWindowWidth = window.innerWidth;
    // console.log(newWindowWidth);
    setwindowWidth(newWindowWidth);
  };

  useEffect(()=>{
    const unsbscribeWindow = window.addEventListener("resize", displaySizeListener);
    return () => {
      unsbscribeWindow();
    }
  }, [])


  const mapDisplayHandler = () => {
    setmapAndMaterialDisplay({
      map: true,
      material: false,
    });
  };

  const materialDisplayHandler = () => {
    setmapAndMaterialDisplay({
      map: false,
      material: true,
    });
  };

  useEffect(() => {
    if (windowWidth >= 768) {
      setmapAndMaterialDisplay({
        map: true,
        material: true,
      })
    } else {
        if (mapAndMaterialDisplay.map && mapAndMaterialDisplay.material) {
          setmapAndMaterialDisplay({
                  map: true,
                  material: false,
                })
        };
      }
  }, [windowWidth]);

  return (
    <div>
      <Header />
      <div className="content">
        <Filter />
        <div className="mapAndMaterialTab">
          <button onClick={mapDisplayHandler}>Map</button>
          <button onClick={materialDisplayHandler}>Material Info</button>
        </div>
        {mapAndMaterialDisplay.map ? (
          <React.Fragment>
            <GoogleMap
              className="googleMap"
              defaultProps={defaultProps}
              locations={locations}
            />
            <LocationList locations={locations} windowWidth={windowWidth} />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        {mapAndMaterialDisplay.material ? (
          <React.Fragment>
            <RecyclingFacts />
            <ExploreQuiz />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default WasteManagement;