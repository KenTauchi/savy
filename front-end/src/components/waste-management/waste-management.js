import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { materialsImport } from '../../reducks/materials/operations.js';
import { getMaterials, getMaterialsIdNameType, getSearchedMaterial } from '../../reducks/materials/selectors.js';
import { materialsSearchFieldUpdate } from '../../reducks/materials/actions';

import { searchLocationsByMaterial } from '../../reducks/locations/operations.js';
import { getLocations, getLocationsSearchedLocations } from '../../reducks/locations/selectors.js';

import Filter from './filter/Filter.component';
import LocationList from './locationList/LocationList.component';
import LocationDetail from './location-detail/LocationDetail.component.js';
import GoogleMap from './google-map/GoogleMap.component';
import RecyclingFacts from './recycling-fact/RecyclingFacts.component.js';
import ExploreQuiz from './explore-quiz/ExploreQuiz.component.js';
import NotFound from './not-found/NotFound.component.js';

import { LOCATION_DATA } from './TEST_locations.data.js';

// import "./waste-management.style.scss";

const WasteManagement = () => {

	const dispatch = useDispatch();

	// Get materials *********************************************************************************************************************************************************************************************

	const [materials, setMaterilas] = useState({
		idNameType: [],
		searchedMaterial: ""
	});
	const [filteredMaterials, setFilteredMaterials] = useState(materials.idNameType);
	const [materialsSearchField, setMaterialsSearchField] = useState("");

	const state = useSelector((state) => state);
	let stateMaterials = getMaterialsIdNameType(state);
	let stateSearchedMaterial = getSearchedMaterial(state);

	useEffect(() => {
		dispatch(materialsImport());
	}, []);

	useEffect(() => {
		setMaterilas({
			...materials,
			idNameType: stateMaterials
		});
		// console.log(stateMaterials)
	}, [stateMaterials]);

	// This code is necessary to update search field when user chooses filter option by enter key. **********************************************************************************************************
	useEffect(() => {
		// console.log(materials);
		// console.log(stateSearchedMaterial);
		setMaterialsSearchField(stateSearchedMaterial);

	}, [stateSearchedMaterial]);

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
		dispatch(searchLocationsByMaterial(43));
	}, []);

	useEffect(() => {
		if (stateLocations) {
			setFilteredLocations(stateLocations);
		} else {
			setFilteredLocations([]);
		}
		// console.log(stateLocations)
		// notFoundhandler(stateLocations);;
	}, [stateLocations]);

	useEffect(()=>{
		notFoundhandler(filteredLocations);;
	}, [filteredLocations]);

	// useEffect(()=>{
	//   console.log(locations);
	// console.log(state);
	// }, [locations]);


	// States for filter *********************************************************************************************************************************************************************************************

	const [postalCodeSearchField, setPostalCodeSearchField] = useState("");

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
		contents: { display: "block" },
		notFound: { display: "none" }
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
				// lat: location.latitude,
				// lng: location.longitude,
				lat: parseFloat(location.latitude),
				lng: parseFloat(location.longitude),
			},
			zoom: 13,
		});
	};

	const setCurrentPosition = (position) => {
		setDefaultProps({
			center: {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			},
			zoom: 11,
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
		// dispatch(materialsSearchFieldUpdate(""));
	};

	const materialsInputClear = () => {
		setMaterialsSearchField("");
		dispatch(materialsSearchFieldUpdate(""));
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

		// materialsInputClear();

		// console.log("event: ", event.target.textContent)
		// console.log("handler: ", event.target.value);
		setPostalCodeSearchField(event.target.textContent);
	}

	const materialsChangeHandler = (event, value) => {
		if (windowWidth < 768 && wmComponentDisplay.detail) {
			setWmComponentDisplay({
				...wmComponentDisplay,
				list: true,
				map: true,
				detail: false,
			});
		}

		// postalCodeInputClear();

		// console.log("event: ", event)
		// console.log("value: ", value)
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

		// postalCodeInputClear();

		// console.log("event: ", event.target.textContent)
		// console.log("handler: ", event.target.value);
		setMaterialsSearchField(event.target.textContent);
	}

	const notFoundhandler = (searchResult) => {

		// console.log(searchResult);

		if (searchResult.length === 0) {
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
	}
	// const notFoundhandler = (selectedItem) => {

	// 	if (selectedItem === undefined) {
	// 		setNotFoundDisplay({
	// 			contents: { display: "none" },
	// 			notFound: { display: "block" }
	// 		})
	// 	} else {
	// 		if (windowWidth >= 768) {
	// 			setNotFoundDisplay({
	// 				contents: { display: "grid" },
	// 				notFound: { display: "none" }
	// 			})
	// 		} else {
	// 			setNotFoundDisplay({
	// 				contents: { display: "block" },
	// 				notFound: { display: "none" }
	// 			})
	// 		}
	// 	}
	// }

	const searchButtonClickHandler = () => {
		// console.log(materialsSearchField);
		// console.log(materials);

		let selectedMaterial;

		if (materialsSearchField === "") {
			dispatch(searchLocationsByMaterial(43));
			return;
		} else {
			selectedMaterial = materials.idNameType.find(material => {
				const searchresult = material.materialName.toLowerCase().indexOf(materialsSearchField.toLowerCase())
				if (searchresult > -1) {
					return true;
				}
			});
		}

		// console.log("test: ", selectedMaterial)

		// dispatch(searchLocationsByMaterial(selectedMaterial.id));

		if (selectedMaterial !== undefined) {
			dispatch(searchLocationsByMaterial(selectedMaterial.id));
		} else {
			dispatch(searchLocationsByMaterial(0));
		}

		// if (materialsSearchField !== "") {
		// 	notFoundhandler(selectedMaterial);
		// }

	}

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

	useEffect(() => {

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
				searchButtonClickHandler={searchButtonClickHandler}
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

	);
}

export default WasteManagement;