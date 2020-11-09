import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { materialsImport } from '../../reducks/materials/operations.js';
import { getMaterialsIdNameType } from '../../reducks/materials/selectors.js';

import { searchLocationsByMaterial } from '../../reducks/locations/operations.js';
import { getLocationsSearchedLocations } from '../../reducks/locations/selectors.js';

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
    loader: { display: "block" },
  });

  // Get materials *********************************************************************************************************************************************************************************************

  const [materials, setMaterilas] = useState({
    idNameType: [],
    searchedMaterial: "",
  });

  const state = useSelector((state) => state);
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

  const [currentLocationProps, setCurrentLocationProps] = useState({
    center: {
      lat: 49.2246,
      lng: -123.1087,
    },
    zoom: 11,
  });

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

  // const [filteredLocations, setFilteredLocations] = useState(locations.selectedLocations);

  let stateLocations = getLocationsSearchedLocations(state);

  useEffect(() => {
    dispatch(searchLocationsByMaterial(49.188678, -122.951498, 20, "", "", ""));
  }, []);

  useEffect(() => {
    if (stateLocations) {
      setFilteredLocations(stateLocations);
    } else {
      setFilteredLocations([]);
    }
    // console.log(stateLocations)
    // notFoundhandler(stateLocations);
  }, [stateLocations]);

  useEffect(() => {
    notFoundhandler(filteredLocations);
  }, [filteredLocations]);

  // useEffect(()=>{
  //   console.log(locations);
  // }, [locations]);

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
      zoom: 13,
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

    if (searchResult.length === 0) {
      setNotFoundDisplay({
        contents: { display: "none" },
        notFound: { display: "block" },
        loader: { display: "none" }
      });
    } else {
      if (windowWidth >= 768) {
        setNotFoundDisplay({
          contents: { display: "grid" },
          notFound: { display: "none" },
          loader: { display: "none" },
        });
      } else {
        setNotFoundDisplay({
          contents: { display: "block" },
          notFound: { display: "none" },
          loader: { display: "none" },
        });
      }
    }
  };

  const detailHide = () => {
    if (windowWidth < 768 && wmComponentDisplay.detail) {
      setWmComponentDisplay({
        ...wmComponentDisplay,
        list: true,
        map: true,
        detail: false,
      });
    }
  };

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
	
		*/

  // }, [postalCodeSearchField])

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
      });
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
    <div className="waste-management-content">
      <Filter
        detailHide={detailHide}
        currentLocation={defaultProps}
        getlocationByPostalCode={getlocationByPostalCode}
      />
      <div className="wm-main-contents" style={notFoundDisplay.contents}>
        <div className="mapAndMaterialTab">
          <button
            className="mapButton"
            onClick={mapDisplayHandler}
            style={mapAndMaterialDisplay.map ? { color: "black" } : null}
          >
            Map View
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
            currentLocationProps={currentLocationProps}
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

        {wmComponentDisplay.material ? (
          <React.Fragment>
            <RecyclingFacts />
            <Explore />
          </React.Fragment>
        ) : null}

        {wmComponentDisplay.startQuiz ? <ExploreQuiz /> : null}
      </div>
      <NotFound style={notFoundDisplay.notFound} />;
    </div>
  );
}

export default WasteManagement;

    //   <Loader style={notFoundDisplay.loader} />;
