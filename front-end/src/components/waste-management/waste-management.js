import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { materialsImport } from '../../reducks/materials/operations.js';
import { getMaterials, getMaterialsIdNameType } from '../../reducks/materials/selectors.js';

import Header from '../header/header';
import Footer from '../footer/footer';
import Filter from './filter/Filter.component';
import LocationList from './locationList/LocationList.component';
import LocationDetail from './location-detail/LocationDetail.component.js';
import GoogleMap from './google-map/GoogleMap.component';
import RecyclingFacts from './recycling-fact/RecyclingFacts.component.js';
import ExploreQuiz from './explore-quiz/ExploreQuiz.component.js';
import NotFound from './not-found/NotFound.component.js';

import { LOCATION_DATA } from './TEST_locations.data.js';

import "./waste-management.style.scss";

const WasteManagement = () => {

  const dispatch = useDispatch();

  // Get materials *********************************************************************************************************************************************************************************************

  const [materials, setMaterilas] = useState({
    idNameType: [],
  });
  const [filteredMaterials, setFilteredMaterials] = useState(materials.idNameType);

  const state = useSelector((state) => state);
  let stateMaterials = getMaterialsIdNameType(state);

  useEffect(()=>{
    dispatch(materialsImport());
  }, []);

  useEffect(()=>{
    setMaterilas({
      ...materials,
      idNameType: stateMaterials
    });
    // console.log(stateMaterials)
  }, [stateMaterials]);

  // useEffect(()=>{
  //   console.log(materials);
  //   console.log(state);
  // }, [materials]);

  // States for locations *********************************************************************************************************************************************************************************************
  
  const [locations, setLocations] = useState(LOCATION_DATA);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 49.2246,
      lng: -123.1087,
    },
    zoom: 11,
  });
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

  // States for filter *********************************************************************************************************************************************************************************************

  const [postalCodeSearchField, setPostalCodeSearchField] = useState("");
  const [materialsSearchField, setMaterialsSearchField] = useState("");

  // States for components display *********************************************************************************************************************************************************************************************

  const [mapAndMaterialDisplay, setMapAndMaterialDisplay] = useState({
    map: true,
    material: false,
  });
  const [wmComponentDisplay, setWmComponentDisplay] = useState({
    tab: true,
    list: true,
    map: true,
    detail: false,
    material: false,
    startQuiz: false
  });
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [notFoundDisplay, setNotFoundDisplay] = useState({
    contents: {display: "block"},
    notFound: {display: "none"}
  });

  // Functions *********************************************************************************************************************************************************************************************

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
    setWmComponentDisplay({
      ...wmComponentDisplay,
      list: true,
      map: true,
      detail: false,
      material: false,
      startQuiz: false
    })
  };

  const materialDisplayHandler = () => {
    setMapAndMaterialDisplay({
      map: false,
      material: true,
    });
    setWmComponentDisplay({
      ...wmComponentDisplay,
      list: false,
      map: false,
      detail: false,
      material: true,
      startQuiz: true
    })

  };

  const locationDetailDisplayHandler = () => {
    setWmComponentDisplay({
      ...wmComponentDisplay,
      detail: !wmComponentDisplay.detail
    });
  };

  const mapMarkerLocationDetailDisplayHandler = () => {
    setWmComponentDisplay({
      ...wmComponentDisplay,
      detail: true
    });
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

  const setCurrentPosition = (position) => {
    setDefaultProps({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 12,
    });
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      // console.log("Get current location!!!");
      navigator.geolocation.getCurrentPosition(setCurrentPosition);
    } else {
      // console.log("Geolocation is not supported by this browser.");
      setDefaultProps({
        center: {
          lat: 49.2246,
          lng: -123.1087,
        },
        zoom: 11,
      })
    }
  }

  const postalCodeInputClear = () => {
    setPostalCodeSearchField("");
  };

  const materialsInputClear = () => {
    setMaterialsSearchField("");
  };

  const postalCodeChangeHandler = (event) => {
    if (windowWidth < 768 && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
        map: true,
        detail: false,
      });
    }

    materialsInputClear();

    // console.log("event: ", event)
    // console.log("handler: ", event.target.value);
    setPostalCodeSearchField(event.target.value);
  }

  const postalCodeClickHandler = (event) => {
    if (windowWidth < 768 && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
        map: true,
        detail: false,
      });
    }

    materialsInputClear();

    // console.log("event: ", event.target.textContent)
    // console.log("handler: ", event.target.value);
    setPostalCodeSearchField(event.target.textContent);
  }

  const materialsChangeHandler = (event) => {
    if (windowWidth < 768 && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
        map: true,
        detail: false,
      });
    }

    postalCodeInputClear();

    // console.log("event: ", event)
    // console.log("handler: ", event.target.value);
    setMaterialsSearchField(event.target.value);
  }

  const materialsClickHandler = (event) => {
    if (windowWidth < 768 && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
        map: true,
        detail: false,
      });
    }

    postalCodeInputClear();

    // console.log("event: ", event.target.textContent)
    // console.log("handler: ", event.target.value);
    setMaterialsSearchField(event.target.textContent);
  }


  // Lifecycle *********************************************************************************************************************************************************************************************

  useEffect(()=>{

    // console.log("filter: ", postalCodeSearchField)

    const filteredLocationsByPostalCode = locations.filter(location =>
      location.postalCode.toLowerCase().includes(postalCodeSearchField.toLocaleLowerCase())
    )

    // const searchChars = postalCodeSearchField.split('');
    // const filteredLocationsByPostalCode = locations.filter(location => {
    //   if (searchChars.length === 0) {
    //     return location.postalCode.toLowerCase().includes(postalCodeSearchField.toLocaleLowerCase())
    //   } else {

    //     let founds = [];
    //     searchChars.forEach(char => {
    //       if (location.postalCode.toLowerCase().includes(char.toLocaleLowerCase())) {
    //         founds.push(true);
    //       } else {
    //         founds.push(false);
    //       }
    //     });
    //     let searchResult = !founds.includes(false)
    //     return searchResult;
    //   }
    // });

    // console.log("filtered locations: ", filteredLocationsByPostalCode)

    setFilteredLocations(filteredLocationsByPostalCode);

    if (filteredLocationsByPostalCode.length === 0) {
      setNotFoundDisplay({
        contents: { display: "none" },
        notFound: { display: "block" }
      })
    } else {
      if (windowWidth >= 768) {
        setNotFoundDisplay({
          contents: { display: "grid" },
          notFound: { display: "none" }
        })
      } else {
        setNotFoundDisplay({
          contents: { display: "block" },
          notFound: { display: "none" }
        })
      }
    }

  }, [postalCodeSearchField])

  useEffect(() => {

    if (windowWidth >= 768 && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: false,
        detail: true,
      });
    } else if (windowWidth < 768 && wmComponentDisplay.detail) {
      if (mapAndMaterialDisplay.map) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          list: false,
          map: false,
          detail: true,
        });
      } else if (mapAndMaterialDisplay.material) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          list: false,
          map: false,
          detail: false,
        });
      }
    } else if (windowWidth >= 768 && !wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
      })
    } else if (windowWidth < 768 && !wmComponentDisplay.detail) {
      if (mapAndMaterialDisplay.map) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          tab: true,
          map: true,
          list: true,
        });
      } else if (mapAndMaterialDisplay.material) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          tab: true,
          map: false,
          list: false,
        });
      }

    }

  }, [wmComponentDisplay.detail]);

  useEffect(() => {
    if (windowWidth >= 768) {

      setMapAndMaterialDisplay({
        map: true,
        material: true,
      });

      if (notFoundDisplay.notFound.display === "none") {
        setNotFoundDisplay({
          ...notFoundDisplay,
          contents: { display: "grid" },
        })
      }


      if (mapAndMaterialDisplay.map) {

        if (wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: false,
            material: true,
            startQuiz: true
          });
        } else if (!wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: true,
            material: true,
            startQuiz: true
          });
        }

      } else if (mapAndMaterialDisplay.material) {

        if (wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: false,
            detail: true,
            material: true,
            startQuiz: true
          });
        } else if (!wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: true,
            material: true,
            startQuiz: true
          });
        }

      }
    } else if (windowWidth <= 767) {

      if (mapAndMaterialDisplay.map && mapAndMaterialDisplay.material) {
        setMapAndMaterialDisplay({
          map: true,
          material: false,
        });
      }

      if (mapAndMaterialDisplay.map) {
        if (wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: false,
            list: false,
            material: false,
            startQuiz: false
          });
        } else if (!wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: true,
            map: true,
            list: true,
            material: false,
            startQuiz: false
          });
        }
      } else if (mapAndMaterialDisplay.material) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          map: false,
          list: false,
          material: true,
          startQuiz: true
        });
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", displaySizeListener);

    getLocation();

    return () => {
      window.removeEventListener("resize", displaySizeListener);
    };
  }, []);

  // Render components *********************************************************************************************************************************************************************************************

  return (
    <div>
      <Header />
      <div className="waste-management-content">
        <Filter
          postalCodeChangeHandler={postalCodeChangeHandler}
          postalCodeClickHandler={postalCodeClickHandler}
          postalCodeValue={postalCodeSearchField}
          postalCodeInputClear={postalCodeInputClear}
          materialsChangeHandler={materialsChangeHandler}
          materialsClickHandler={materialsClickHandler}
          materialsValue={materialsSearchField}
          materialsInputClear={materialsInputClear}
        />

        <div className="wm-main-contens" style={notFoundDisplay.contents}>
          <div className="mapAndMaterialTab">
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

          {wmComponentDisplay.map ? (
            <GoogleMap
              defaultProps={defaultProps}
              locations={filteredLocations}
              mapMarkerLocationDetailDisplayHandler={
                mapMarkerLocationDetailDisplayHandler
              }
              getSelectedLocation={getSelectedLocation}
            />
          ) : null}

          {wmComponentDisplay.list ? (
            <LocationList
              locations={filteredLocations}
              windowWidth={windowWidth}
              locationDetailDisplayHandler={locationDetailDisplayHandler}
              getSelectedLocation={getSelectedLocation}
            />
          ) : null}

          {wmComponentDisplay.detail ? (
            <LocationDetail
              location={selectedLocation}
              locationDetailDisplayHandler={locationDetailDisplayHandler}
            />
          ) : null}

          {wmComponentDisplay.material ? <RecyclingFacts /> : null}

          {wmComponentDisplay.startQuiz ? <ExploreQuiz /> : null}
        </div>

        <NotFound style={notFoundDisplay.notFound} />
      </div>
      <Footer />
    </div>
  );
}

export default WasteManagement;