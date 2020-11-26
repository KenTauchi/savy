import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AutocompleteInput from '../autocompleteInput/AutocompleteInput.component';
import DefaultButton from '../button/Button.component';
import Dropdown from '../dropdown/Dropdown.component';

import serchButtonIcon from './search-65px.svg';

import { materialsImport } from "../../../reducks/materials/operations.js";
import {
  getMaterialsIdNameType,
  getSearchedMaterial,
} from "../../../reducks/materials/selectors.js";
import { materialsSearchFieldUpdate } from "../../../reducks/materials/actions";

import { searchLocationsByMaterial } from "../../../reducks/locations/operations.js";

// import './Filter.style.scss';

const Filter = (props) => {
  const dispatch = useDispatch();
  const {
    usersLocationProps,
    detailHide,
    getlocationByPostalCode,
    // getLocation,
    resetSelectedLocation,
    mapDisplayHandler,
    // setUserLocationAsCenter,
    setDirectionsDisplay
  } = props;

  const [materialsSearchField, setMaterialsSearchField] = useState(
    ""
  );
  const [postalCodeSearchField, setPostalCodeSearchField] = useState("");
  const [distanceSearchField, setDistanceSearchField] = useState(15);

  const state = useSelector((state) => state);
  let stateMaterials = getMaterialsIdNameType(state);
  let stateSearchedMaterial = getSearchedMaterial(state);

  // console.log(stateMaterials);

  const materialsInputClear = () => {
    setMaterialsSearchField("");
    dispatch(materialsSearchFieldUpdate(""));
  };

  const postalCodeInputClear = () => {
    setPostalCodeSearchField("");
  };

  const postalCodeChangeHandler = (event) => {
    // if (windowWidth < 768 && wmComponentDisplay.detail) {
    //   setWmComponentDisplay({
    //     ...wmComponentDisplay,
    //     list: true,
    //     map: true,
    //     detail: false,
    //   });
    // }

    // materialsInputClear();

    // console.log("event: ", event)
    // console.log("handler: ", event.target.value);
    setPostalCodeSearchField(event.target.value);
  };

  const materialsChangeHandler = (event, value) => {
    setMaterialsSearchField(event.target.value);
  };

  const materialsClickHandler = (event) => {
    setMaterialsSearchField(event.target.textContent);
  };

  const postalCodeClickHandler = (event) => {
    setPostalCodeSearchField(event.target.textContent);
  };

  const distanceChangeHandler = (event) => {
    setDistanceSearchField(event.target.value);
  };

  const [materials, setMaterilas] = useState({
    idNameType: [],
    searchedMaterial: "",
  });

	const searchButtonClickHandler = () => {
    // console.log(materialsSearchField);
    // console.log(postalCodeSearchField);
    // console.log(distanceSearchField);
    // console.log(materials);
    detailHide();
    resetSelectedLocation();
    mapDisplayHandler();
    setDirectionsDisplay(false)

    if (postalCodeSearchField != "") {
      getlocationByPostalCode(postalCodeSearchField);
    } else {
      // getLocation();
      // setUserLocationAsCenter();
    }

    let lat = usersLocationProps.center.lat;
    let lng = usersLocationProps.center.lng;
    let range = distanceSearchField;
    let zip = postalCodeSearchField;

    let materialId, familiyId;

    let selectedMaterial;
    if (materialsSearchField !== "") {
      selectedMaterial = materials.idNameType.find((material) => {
        const searchresult = material.materialName
          .toLowerCase()
          .indexOf(materialsSearchField.toLowerCase());
        if (searchresult > -1) {
          return true;
        }
      });
    }

    // console.log(selectedMaterial);

    if (selectedMaterial) {
      selectedMaterial.type === "family"
        ? (familiyId = selectedMaterial.id)
        : (materialId = selectedMaterial.id);
    } else {
      materialId = 99999;
    }

    // console.log(familiyId, materialId);

    if (zip) {
      dispatch(
        searchLocationsByMaterial("", "", range, zip, materialId, familiyId)
      );
    } else {
      dispatch(
        searchLocationsByMaterial(lat, lng, range, "", materialId, familiyId)
      );
    }
  };


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

  // This code is necessary to update search field when user chooses filter option by enter key. **********************************************************************************************************
  useEffect(() => {
    // console.log(materials);
    // console.log(stateSearchedMaterial);
    setMaterialsSearchField(stateSearchedMaterial);
  }, [stateSearchedMaterial]);

  return (
    <div className="filter-section">
      <h2 className="WMpageH2">Welcome to savy recycling search!</h2>
      <p className="searchInstructionText">
        Search recycling solutions near you and get to know more about materials
      </p>
      <div className="WMpageInputsDiv">
        <div className="searchInput">
          <AutocompleteInput
            options={materials.idNameType.map(
              (material) => material.materialName
            )}
            placeholder="Item / Material name"
            change={materialsChangeHandler}
            click={materialsClickHandler}
            value={materialsSearchField}
            clear={materialsInputClear}
          />
        </div>

        <div className="searchInput">
          <AutocompleteInput
            options={[]}
            placeholder="Postal code"
            change={postalCodeChangeHandler}
            click={postalCodeClickHandler}
            value={postalCodeSearchField}
            clear={postalCodeInputClear}
          />
        </div>

        <div className="searchInput">
          <Dropdown
            change={distanceChangeHandler}
            value={distanceSearchField}
          />
        </div>

        <div className="searchButtonMobile">
          <button onClick={searchButtonClickHandler} className="button savy-green-button filter-search-btn">Search</button>
          {/* <DefaultButton text="Search" click={searchButtonClickHandler} /> */}
        </div>

        <div className="searchButtonLaptop">
          <img
            onClick={searchButtonClickHandler}
            src={serchButtonIcon}
            alt="search button"
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;

// <div className="searchInput">
//   <AutocompleteInput
//     options={locations.map((location) => location.postalCode)}
//     placeholder="zip code"
//     change={postalCodeChangeHandler}
//     click={postalCodeClickHandler}
//     value={postalCodeValue}
//     clear={postalCodeInputClear}
//   />
// </div>


          // <div className="searchInput">
          //   <Autocomplete
          //     id="materialInput"
          //     options={materials.idNameType.map(
          //       (material) => material.materialName
          //     )}
          //     renderInput={(params) => (
          //       <div ref={params.InputProps.ref}>
          //         <input
          //           id="materialSearch"
          //           type="text"
          //           placeholder="Item / Material name"
          //           {...params.inputProps}
          //         />
          //       </div>
          //     )}
          //   />
          // </div>;


          // <div className="searchInput">
          //   <input
          //     id="zipSearch"
          //     type="text"
          //     onChange={postalCodeChangeHandler}
          //     value={postalCodeValue}
          //     placeholder="Postal Code"
          //   />
          // </div>;

        // <div className="searchInput">
        //   <Autocomplete
        //     id="postalCodeInput"
        //     options={locations.map(
        //       (location) => location.postalCode
        //     )}
        //     onInputChange={(event, value) => {
        //       postalCodeChangeHandler(event, value);
        //     }}
        //     // style={{ width: 300 }}
        //     renderInput={(params) => (
        //       <div ref={params.InputProps.ref}>
        //         <input
        //           id="postalCodeSearch"
        //           type="text"
        //           onChange={postalCodeChangeHandler}
        //           value={postalCodeValue}
        //           placeholder="Postal Code"
        //           {...params.inputProps}
        //         />
        //       </div>
        //     )}
        //   />
        // </div>;

