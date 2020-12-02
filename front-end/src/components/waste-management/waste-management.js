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

// import { LOCATION_DATA } from './TEST_locations.data.js';

// import "./waste-management.style.scss";

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

  useEffect(() => {
    setLoadingCondition(loadingState);
    //   console.log(loadingState);
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

  // Get materials *********************************************************************************************************************************************************************************************

  const [materials, setMaterilas] = useState({
    idNameType: [],
    searchedMaterial: "",
  });

  let stateMaterials = getMaterialsIdNameType(state);

  useEffect(() => {
    dispatch(materialsImport());
  }, []);

  useEffect(() => {
    setMaterilas({
      ...materials,
      idNameType: stateMaterials,
    });
    // console.log(stateMaterials)
  }, [stateMaterials]);

  // **********************************************************************************************************

  // useEffect(()=>{
  //   console.log(materials);
  //   console.log(state);
  // }, [materials]);

  // State for locations *********************************************************************************************************************************************************************************************

  // const [locations, setLocations] = useState(LOCATION_DATA);
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

  const [directionsDisplay, setDirectionsDisplay] = useState(false);

  const [directionLatlng, setDirectionLatlng] = useState({
    lat: undefined,
    lng: undefined,
  });

  // const [filteredLocations, setFilteredLocations] = useState(locations.selectedLocations);

  let stateLocations = getLocationsSearchedLocations(state);

  useEffect(() => {
    dispatch(
      searchLocationsByMaterial(
        // 49.188678,
        // -122.951498,
        usersLocationProps.center.lat,
        usersLocationProps.center.lng,
        15,
        "",
        "", // 49 cat, 26 dog, 29 mixed paper
        ""
      )
    );
    return () => {
      dispatch(notFoundHandlerAction(false));
    };
  }, []);

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
    // console.log(stateLocations)
    // notFoundhandler(stateLocations);
  }, [stateLocations]);

  useEffect(() => {
    // console.log(loadingCondition);
    notFoundhandler(filteredLocations);
  }, [filteredLocations]);

  // useEffect(() => {
  //       if (notFoundCondition) {
  //         setNotFoundDisplay({
  //           ...notFoundDisplay,
  //           contents: { display: "none" },
  //           notFound: { display: "block" },
  //         });
  //       } else {
  //         if (windowWidth >= breakPoint) {
  //           setNotFoundDisplay({
  //             ...notFoundDisplay,
  //             contents: { display: "grid" },
  //             notFound: { display: "none" },
  //           });
  //         } else {
  //           setNotFoundDisplay({
  //             ...notFoundDisplay,
  //             contents: { display: "block" },
  //             notFound: { display: "none" },
  //           });
  //         }
  //       }
  // }, [notFoundCondition]);

  // useEffect(()=>{
  //   console.log(locations);
  // }, [locations]);

  // useEffect(()=>{
  //   console.log(state);
  // }, [state]);

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
      startQuiz: false,
    });
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
      startQuiz: true,
    });
  };

  const locationDetailDisplayHandler = () => {
    setWmComponentDisplay({
      ...wmComponentDisplay,
      detail: !wmComponentDisplay.detail,
    });
    // console.log(wmComponentDisplay.detail)
    if(wmComponentDisplay.detail) {
      setDirectionsDisplay(false);
      setDirectionLatlng({
        lat: undefined,
        lng: undefined,
      });
    }
  };

  const mapMarkerLocationDetailDisplayHandler = () => {
    setWmComponentDisplay({
      ...wmComponentDisplay,
      detail: true,
    });
  };

  // useEffect(() => {
  //   console.log(selectedLocation);
  // }, [selectedLocation]);

  const getSelectedLocation = (location) => {
    setSelectedLocation(location);
    setCurrentLocationProps({
      center: {
        // lat: location.latitude,
        // lng: location.longitude,
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

  const setCurrentPosition = (position) => {
    setCurrentLocationProps({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 12,
    });
  };

  const setUserPosition = (position) => {
    setUsersLocationProps({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 12,
    });
  };

  // const setUserLocationAsCenter = () => {
  //   setCurrentLocationProps(usersLocationProps);
  // };

  const getlocationByPostalCode = (postalCode) => {
    fetch(
      `http://geogratis.gc.ca/services/geolocation/en/locate?q=${postalCode}`
    )
      .then((response) => response.json())
      .then((result) => {
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

  const notFoundhandler = (searchResult) => {
    // console.log(searchResult);

    // if (notFoundDisplay.loader.display === "block") {
    // 	return;
    // }

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

  const directionsDisplayOn = (lat, lng) => {
    // console.log(directionLatlng.lat);
    // console.log(directionLatlng.lng);
    // console.log(lat)
    // console.log(lng)
    if (directionLatlng.lat == lat && directionLatlng.lng == lng) {
      setDirectionsDisplay(false);
      setDirectionLatlng({
        lat: undefined,
        lng: undefined,
      });
      // console.log(false)
    } else {
      setDirectionLatlng({
        lat: lat,
        lng: lng,
      });
      setDirectionsDisplay(false);
      // console.log(true);
    }
  };

  useEffect(() => {
      setDirectionsDisplay(true);
  }, [directionLatlng]);

  // const getDirectionLatlng = (lat, lng) => {
  //   setDirectionLatlng({
  //     lat: lat,
  //     lng: lng
  //   })
  // }

  // Lifecycle *********************************************************************************************************************************************************************************************

  // useEffect(() => {
  // 	// console.log(materialsSearchField);
  // 	// console.log(materials);
  // 	const selectedMaterial = materials.idNameType.find(material => {
  // 		const searchresult = material.materialName.toLowerCase().indexOf(materialsSearchField.toLowerCase())
  // 		if (searchresult > -1) {
  // 			return true;
  // 		}
  // 	});

  // 	// console.log("test: ", selectedMaterial)

  // 	if (selectedMaterial !== undefined) {
  // 		dispatch(searchLocationsByMaterial(selectedMaterial.id));
  // 	}

  // 	if (materialsSearchField !== "") {
  // 		notFoundhandler(selectedMaterial);
  // 	}
  // }, [materialsSearchField])

  // useEffect(() => {

  // console.log("filter: ", postalCodeSearchField)
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

  /*
	
		const filteredLocationsByPostalCode = locations.filter(location =>
		  location.postalCode.toLowerCase().includes(postalCodeSearchField.toLocaleLowerCase())
		)
	
		setFilteredLocations(filteredLocationsByPostalCode);
	
		if (filteredLocationsByPostalCode.length === 0) {
		  setNotFoundDisplay({
			contents: { display: "none" },
			notFound: { display: "block" }
		  })
		} else {
		  if (windowWidth >= breakPoint) {
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
	
		*/

  // }, [postalCodeSearchField])

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

  useEffect(() => {
    window.addEventListener("resize", displaySizeListener);

    getLocation();

    return () => {
      window.removeEventListener("resize", displaySizeListener);
    };
  }, []);

  // Render components *********************************************************************************************************************************************************************************************

  return (
    <div className="waste-management-content main-content">
      <Filter
        detailHide={detailHide}
        // currentLocation={defaultProps}
        usersLocationProps={usersLocationProps}
        getlocationByPostalCode={getlocationByPostalCode}
        // getLocation={getLocation}
        resetSelectedLocation={resetSelectedLocation}
        mapDisplayHandler={mapDisplayHandler}
        // setUserLocationAsCenter={setUserLocationAsCenter}
        setDirectionsDisplay={setDirectionsDisplay}
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
            // getDirectionLatlng={getDirectionLatlng}
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

    //   {
    //     loadingCondition ? <Loader /> : null;
    //   }
