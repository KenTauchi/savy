import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { materialsImport } from '../../reducks/materials/operations.js';
import { getMaterialsIdNameType } from '../../reducks/materials/selectors.js';

import { searchLocationsByMaterial } from '../../reducks/search/operations.js';
import {
  getLocationsSearchedLocations,
  getLoadingCondition,
  getNotFoundCondition
} from "../../reducks/search/selectors.js";
import { notFoundHandlerAction } from "../../reducks/search/actions";

import Filter from './filter/Filter.component';
import LocationList from './locationList/LocationList.component';
import LocationDetail from './location-detail/LocationDetail.component.js';
import GoogleMap from './google-map/GoogleMap.component';
import RecyclingFacts from './recycling-fact/RecyclingFacts.component.js';
import Explore from './explore/Explore.conponent';
import ExploreQuiz from './explore-quiz/ExploreQuiz.component.js';
import NotFound from './not-found/NotFound.component.js';
import Loader from './loader/Loader.component';


const WasteManagement = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

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
    startQuiz: false,
  });
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [notFoundDisplay, setNotFoundDisplay] = useState({
    contents: { display: "none" },
    notFound: { display: "none" },
  });
  const breakPoint = 768;

  const notFoundCondition = getNotFoundCondition(state);
  const [loadingCondition, setLoadingCondition] = useState(false);
  const loadingState = getLoadingCondition(state);

  const [directionsDisplay, setDirectionsDisplay] = useState(false);

  // Materials states *********************************************************************************************************************************************************************************************

  const [materials, setMaterilas] = useState({
    idNameType: [],
    searchedMaterial: "",
  });

  let stateMaterials = getMaterialsIdNameType(state);

  // State for locations *********************************************************************************************************************************************************************************************

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 49.2246,
      lng: -123.1087,
    },
    zoom: 11,
  });

  // This is used to zoom in facility
  const [currentLocationProps, setCurrentLocationProps] = useState({
    center: {
      lat: 49.2246,
      lng: -123.1087,
    },
    zoom: 11,
  });

  // This is used to define user's location
  const [usersLocationProps, setUsersLocationProps] = useState({
    center: {
      lat: 49.2246,
      lng: -123.1087,
    },
    zoom: 11,
  });

  // This is used to display facility detail
  const [selectedLocation, setSelectedLocation] = useState({
    locationId: "",
    locationTypeId: "",
    cityId: "",
    name: "",
    postalCode: "",
    address: "",
    phone: "",
    latitude: 49.188678,
    longitude: -122.951498,
    openingHour: "",
    website: "",
    imageUrl: "",
    locationNotes: "",
  });

  // This is used for directions search
  const [directionLatlng, setDirectionLatlng] = useState({
    lat: undefined,
    lng: undefined,
  });

  let stateLocations = getLocationsSearchedLocations(state);

  // Functions *********************************************************************************************************************************************************************************************

  const displaySizeListener = () => {
    const newWindowWidth = window.innerWidth;
    // console.log(newWindowWidth);
    setwindowWidth(newWindowWidth);
  };

  // Display Google Maps in mobile layout
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
      startQuiz: false,
    });
  };

  // Display material info in mobile layout
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
      startQuiz: true,
    });
  };

  // Toggle detail component
  const locationDetailDisplayHandler = () => {
    setWmComponentDisplay({
      ...wmComponentDisplay,
      detail: !wmComponentDisplay.detail,
    });
    if(wmComponentDisplay.detail) {
      setDirectionsDisplay(false);
      setDirectionLatlng({
        lat: undefined,
        lng: undefined,
      });
    }
  };

  // Display detail component when a pin is clicked
  const mapMarkerLocationDetailDisplayHandler = () => {
    setWmComponentDisplay({
      ...wmComponentDisplay,
      detail: true,
    });
  };

  // Get data of selected location
  const getSelectedLocation = (location) => {
    setSelectedLocation(location);
    setCurrentLocationProps({
      center: {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude),
      },
      zoom: 14,
    });
  };

  const resetSelectedLocation = () => {
    setSelectedLocation({
      ...selectedLocation,
      latitude: "",
      longitude: "",
    });
  };

  // Set coordinate to set a new center point to Google Maps
  const setCurrentPosition = (position) => {
    setCurrentLocationProps({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 12,
    });
  };

  // Set users coordinate
  const setUserPosition = (position) => {
    setUsersLocationProps({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 12,
    });
  };

  // Set users coordinate by postal code inputted by user
  const getlocationByPostalCode = (postalCode) => {
    fetch(
      `http://geogratis.gc.ca/services/geolocation/en/locate?q=${postalCode}`
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result[0].geometry.coordinates[1],result[0].geometry.coordinates[0])
        setUsersLocationProps({
          center: {
            lat: result[0].geometry.coordinates[1],
            lng: result[0].geometry.coordinates[0],
          },
          zoom: 12,
        });
        setCurrentLocationProps({
          center: {
            lat: result[0].geometry.coordinates[1],
            lng: result[0].geometry.coordinates[0],
          },
          zoom: 12,
        });
        return result;
      })
      .catch((error) => console.log(error));
  };

  // Set users coordinate by browser
  const getLocation = () => {
    if (navigator.geolocation) {
      // console.log("Get current location!!!");
      navigator.geolocation.getCurrentPosition(setCurrentPosition);
      navigator.geolocation.getCurrentPosition(setUserPosition);
    } else {
      // console.log("Geolocation is not supported by this browser.");
      setCurrentLocationProps({
        center: {
          lat: 49.2246,
          lng: -123.1087,
        },
        zoom: 11,
      });
    }
  };

  // Manage not-found component display condition
  const notFoundhandler = () => {
    if (notFoundCondition) {
      setNotFoundDisplay({
        ...notFoundDisplay,
        contents: { display: "none" },
        notFound: { display: "block" },
      });
    } else {
      if (windowWidth >= breakPoint) {
        setNotFoundDisplay({
          ...notFoundDisplay,
          contents: { display: "grid" },
          notFound: { display: "none" },
        });
      } else {
        setNotFoundDisplay({
          ...notFoundDisplay,
          contents: { display: "block" },
          notFound: { display: "none" },
        });
      }
    }
  };

  // Hide detail component
  const detailHide = () => {
    if (windowWidth < breakPoint && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
        map: true,
        detail: false,
      });
    }
  };

  // Display directions to a selected facility
  const directionsDisplayOn = (lat, lng) => {
    if (directionLatlng.lat == lat && directionLatlng.lng == lng) {
      setDirectionsDisplay(false);
      setDirectionLatlng({
        lat: undefined,
        lng: undefined,
      });
    } else {
      setDirectionLatlng({
        lat: lat,
        lng: lng,
      });
      setDirectionsDisplay(false);
    }
  };

  useEffect(() => {
      setDirectionsDisplay(true);
  }, [directionLatlng]);

  // Lifecycle *********************************************************************************************************************************************************************************************

  // Manage loading animation component ********************************************
  useEffect(() => {
    setLoadingCondition(loadingState);
    if (loadingState) {
      setWmComponentDisplay({
        tab: false,
        list: false,
        map: false,
        detail: false,
        material: false,
        startQuiz: false,
      });
      setNotFoundDisplay({
        ...notFoundDisplay,
        contents: { display: "none" },
        notFound: { display: "none" },
      });
    } else {
      if (windowWidth >= breakPoint) {
        setWmComponentDisplay({
          tab: true,
          list: true,
          map: true,
          detail: false,
          material: true,
          startQuiz: true,
        });
      } else {
        setWmComponentDisplay({
          tab: true,
          list: true,
          map: true,
          detail: false,
          material: false,
          startQuiz: false,
        });
      }
    }
  }, [loadingState]);

  // Manage detail component ********************************************
  useEffect(() => {
    if (windowWidth >= breakPoint && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: false,
        detail: true,
      });
    } else if (windowWidth < breakPoint && wmComponentDisplay.detail) {
      if (mapAndMaterialDisplay.map) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          tab: false,
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
    } else if (windowWidth >= breakPoint && !wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
      });
    } else if (windowWidth < breakPoint && !wmComponentDisplay.detail) {
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

  // Manage responsive behavior ********************************************
  useEffect(() => {
    if (windowWidth >= breakPoint) {
      setMapAndMaterialDisplay({
        map: true,
        material: true,
      });

      if (notFoundDisplay.notFound.display === "none") {
        setNotFoundDisplay({
          ...notFoundDisplay,
          contents: { display: "grid" },
        });
      }

      if (mapAndMaterialDisplay.map) {
        if (wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: false,
            material: true,
            startQuiz: true,
          });
        } else if (!wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: true,
            material: true,
            startQuiz: true,
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
            startQuiz: true,
          });
        } else if (!wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: false,
            map: true,
            list: true,
            material: true,
            startQuiz: true,
          });
        }
      }
    } else if (windowWidth < breakPoint) {
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
            startQuiz: false,
          });
        } else if (!wmComponentDisplay.detail) {
          setWmComponentDisplay({
            ...wmComponentDisplay,
            tab: true,
            map: true,
            list: true,
            material: false,
            startQuiz: false,
          });
        }
      } else if (mapAndMaterialDisplay.material) {
        setWmComponentDisplay({
          ...wmComponentDisplay,
          map: false,
          list: false,
          material: true,
          startQuiz: true,
        });
      }
    }
  }, [windowWidth]);

  // Listen window width ********************************************
  useEffect(() => {
    window.addEventListener("resize", displaySizeListener);

    getLocation();

    return () => {
      window.removeEventListener("resize", displaySizeListener);
    };
  }, []);

  // Retrieve material data from global state ********************************************
  useEffect(() => {
    dispatch(materialsImport());
  }, []);

  useEffect(() => {
    setMaterilas({
      ...materials,
      idNameType: stateMaterials,
    });
  }, [stateMaterials]);

  // Life cycle methods related to search functionaloty ********************************************

  // Set up seached data **************************
  useEffect(() => {
    dispatch(
      searchLocationsByMaterial(
        usersLocationProps.center.lat,
        usersLocationProps.center.lng,
        15,
        "",
        "",
        ""
      )
    );
    return () => {
      dispatch(notFoundHandlerAction(false));
    };
  }, []);

  // Retrieve searched results **************************
  useEffect(() => {
    if (stateLocations) {
      setFilteredLocations(stateLocations);
    } else {
      setFilteredLocations([]);
    }
    setDirectionLatlng({
      lat: undefined,
      lng: undefined,
    });
  }, [stateLocations]);

  // Manage not found component according to the search results **************************
  useEffect(() => {
    notFoundhandler(filteredLocations);
  }, [filteredLocations]);

  // This code is used for a development purpose
  // useEffect(()=>{
  //   console.log(state);
  // }, [state]);

  // Render components *********************************************

  return (
    <div className="waste-management-content main-content">
      <Filter
        detailHide={detailHide}
        usersLocationProps={usersLocationProps}
        getlocationByPostalCode={getlocationByPostalCode}
        resetSelectedLocation={resetSelectedLocation}
        mapDisplayHandler={mapDisplayHandler}
        setDirectionsDisplay={setDirectionsDisplay}
        getLocation={getLocation}
      />
      <div className="wm-main-contents" style={notFoundDisplay.contents}>
        {wmComponentDisplay.tab ? (
          <div className="mapAndMaterialTab">
            <button
              className="mapButton"
              onClick={mapDisplayHandler}
              style={mapAndMaterialDisplay.map ? { color: "#1E1E1E" } : null}
            >
              Map View
            </button>
            <button
              className="materialButton"
              onClick={materialDisplayHandler}
              style={
                mapAndMaterialDisplay.material ? { color: "#1E1E1E" } : null
              }
            >
              Material Info
            </button>
          </div>
        ) : null}

        {wmComponentDisplay.map ? (
          <GoogleMap
            defaultProps={defaultProps}
            currentLocationProps={currentLocationProps}
            locations={filteredLocations}
            mapMarkerLocationDetailDisplayHandler={
              mapMarkerLocationDetailDisplayHandler
            }
            getSelectedLocation={getSelectedLocation}
            selectedLocation={selectedLocation}
            directionsDisplay={directionsDisplay}
            usersLocationProps={usersLocationProps}
            directionLatlng={directionLatlng}
          />
        ) : null}

        {wmComponentDisplay.list ? (
          <LocationList
            locations={filteredLocations}
            windowWidth={windowWidth}
            locationDetailDisplayHandler={locationDetailDisplayHandler}
            getSelectedLocation={getSelectedLocation}
            directionsDisplayOn={directionsDisplayOn}
          />
        ) : null}

        {wmComponentDisplay.detail ? (
          <LocationDetail
            location={selectedLocation}
            locationDetailDisplayHandler={locationDetailDisplayHandler}
            resetSelectedLocation={resetSelectedLocation}
            directionsDisplayOn={directionsDisplayOn}
          />
        ) : null}

        {wmComponentDisplay.material ? (
          <React.Fragment>
            <RecyclingFacts />
            <Explore />
          </React.Fragment>
        ) : null}

        {wmComponentDisplay.startQuiz ? <ExploreQuiz /> : null}
      </div>
      <NotFound style={notFoundDisplay.notFound} />

      {loadingCondition ? <Loader /> : null}
    </div>
  );
}

export default WasteManagement;