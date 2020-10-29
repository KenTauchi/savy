import React, { useState, useEffect } from "react";
import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from './filter/Filter.component';
import LocationList from './locationList/LocationList.component';
import LocationDetail from './location-detail/LocationDetail.component.js';
import GoogleMap from './google-map/GoogleMap.component';
import RecyclingFacts from './recycling-fact/RecyclingFacts.component.js';
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
  const [mapAndMaterialDisplay, setMapAndMaterialDisplay] = useState({
    map: true,
    material: false,
  });
  const [locationDetailDisplay, setLocationDetailDisplay] = useState(false);
  const [tabListMapDetailDisplayStyle, setTabListMapDetailDisplay] = useState({
    tab: { display: "block" },
    list: { display: "block" },
    map: { display: "block" },
    detail: { display: "none" },
  });
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [selectedLocation, setSelectedLocation] = useState({
    locationId: 1,
    locationTypeId: "Private",
    cityId: "New Westminister",
    name: "Lowe´s",
    postalCode: "V3M 0G2",
    address: "1085 ﻿Tanaka Ct",
    phone: "604-527-7239",
    latitude: 49.188678,
    longitude: -122.951498,
    openingHour: "Call for hours of operation",
    website: "https://www.lowes.ca/services/recycling-centre",
    imageUrl: "",
    locationNotes:
      "Minimize your impact on the environment by bringing your paint, batteries, lightbulbs, and fluorescent tubes to one of Lowe's Recycling Centres for safe disposal.",
  });

  const displaySizeListener = () => {
    const newWindowWidth = window.innerWidth;
    // console.log(newWindowWidth);
    setwindowWidth(newWindowWidth);
  };

  const mapDisplayHandler = () => {
    setMapAndMaterialDisplay({
      map: true,
      material: false,
    });
  };

  const materialDisplayHandler = () => {
    setMapAndMaterialDisplay({
      map: false,
      material: true,
    });
  };

  const locationDetailDisplayHandler = () => {
    setLocationDetailDisplay(!locationDetailDisplay);
  };

  const mapMarkerLocationDetailDisplayHandler = () => {
    setLocationDetailDisplay(true);
  };

  // useEffect(() => {
  //   console.log(selectedLocation);
  // }, [selectedLocation]);

  const getSelectedLocation = (location) => {
    setSelectedLocation(location);
    setDefaultProps({
      center: {
        lat: location.latitude,
        lng: location.longitude,
      },
      zoom: 15,
    });
  };

  useEffect(() => {
    if (windowWidth >= 768 && locationDetailDisplay) {
      // only list should be display none.
      setTabListMapDetailDisplay({
        tab: { display: "none" },
        list: { display: "none" },
        map: { display: "block" },
        detail: { display: "block" },
      });
    } else if (windowWidth < 768 && locationDetailDisplay) {
      // tab, map, list should be display none.
      setTabListMapDetailDisplay({
        tab: { display: "none" },
        list: { display: "none" },
        map: { display: "none" },
        detail: { display: "block" },
      });
      if (windowWidth <= 767) {
        window.scrollTo(0, 0);
      }
    } else {
      // only detail should be display none.
      setTabListMapDetailDisplay({
        tab: { display: "block" },
        list: { display: "block" },
        map: { display: "block" },
        detail: { display: "none" },
      });
    }
  }, [locationDetailDisplay]);

  useEffect(() => {
    if (windowWidth >= 768) {
      setMapAndMaterialDisplay({
        map: true,
        material: true,
      });
      setTabListMapDetailDisplay({
        ...tabListMapDetailDisplayStyle,
        tab: { display: "none" },
        map: { display: "block" },
      });
    } else if (windowWidth <= 767) {
      if (mapAndMaterialDisplay.map && mapAndMaterialDisplay.material) {
        setMapAndMaterialDisplay({
          map: true,
          material: false,
        });
      }
      if (locationDetailDisplay) {
        setTabListMapDetailDisplay({
          ...tabListMapDetailDisplayStyle,
          tab: { display: "none" },
          map: { display: "none" },
        });
      } else if (!locationDetailDisplay) {
        setTabListMapDetailDisplay({
          ...tabListMapDetailDisplayStyle,
          tab: { display: "block" },
          map: { display: "block" },
        });
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", displaySizeListener);

    return () => {
      window.removeEventListener("resize", displaySizeListener);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="waste-management-content">
        <Filter />

        <div
          className="mapAndMaterialTab"
          style={tabListMapDetailDisplayStyle.tab}
        >
          <button
            className="mapButton"
            onClick={mapDisplayHandler}
            style={mapAndMaterialDisplay.map ? { color: "black" } : null}
          >
            Map
          </button>
          <button
            className="materialButton"
            onClick={materialDisplayHandler}
            style={mapAndMaterialDisplay.material ? { color: "black" } : null}
          >
            Material Info
          </button>
        </div>

        {mapAndMaterialDisplay.map ? (
          <React.Fragment>
            <GoogleMap
              defaultProps={defaultProps}
              locations={locations}
              displayStyle={tabListMapDetailDisplayStyle.map}
              mapMarkerLocationDetailDisplayHandler={
                mapMarkerLocationDetailDisplayHandler
              }
              getSelectedLocation={getSelectedLocation}
            />
            <LocationList
              locations={locations}
              windowWidth={windowWidth}
              displayStyle={tabListMapDetailDisplayStyle.list}
              locationDetailDisplayHandler={locationDetailDisplayHandler}
              getSelectedLocation={getSelectedLocation}
            />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <LocationDetail
          displayStyle={tabListMapDetailDisplayStyle.detail}
          location={selectedLocation}
          locationDetailDisplayHandler={locationDetailDisplayHandler}
        />

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