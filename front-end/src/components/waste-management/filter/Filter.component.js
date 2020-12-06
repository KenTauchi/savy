import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AutocompleteInput from '../autocompleteInput/AutocompleteInput.component';
import Dropdown from '../dropdown/Dropdown.component';

import serchButtonIcon from './search-65px.svg';

import { materialsImport } from "../../../reducks/materials/operations.js";
import {
  getMaterialsIdNameType,
  getSearchedMaterial,
} from "../../../reducks/materials/selectors.js";
import { materialsSearchFieldUpdate } from "../../../reducks/materials/actions";

import { searchLocationsByMaterial } from "../../../reducks/search/operations.js";


const Filter = (props) => {
  const dispatch = useDispatch();
  const {
    usersLocationProps,
    detailHide,
    getlocationByPostalCode,
    resetSelectedLocation,
    mapDisplayHandler,
    setDirectionsDisplay,
    getLocation
  } = props;

  const [materialsSearchField, setMaterialsSearchField] = useState(
    ""
  );
  const [postalCodeSearchField, setPostalCodeSearchField] = useState("");
  const [distanceSearchField, setDistanceSearchField] = useState(15);

  const [materials, setMaterilas] = useState({
    idNameType: [],
    searchedMaterial: "",
  });

  const state = useSelector((state) => state);
  let stateMaterials = getMaterialsIdNameType(state);
  let stateSearchedMaterial = getSearchedMaterial(state);

  // console.log(stateMaterials);

  // Functions ******************************************
  // ****************************************************
  const materialsInputClear = () => {
    setMaterialsSearchField("");
    dispatch(materialsSearchFieldUpdate(""));
  };

  const postalCodeInputClear = () => {
    setPostalCodeSearchField("");
  };

  const postalCodeChangeHandler = (event) => {
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

  // Search button function ***************************
  // **************************************************
	const searchButtonClickHandler = () => {
    // Reset display and states
    detailHide();
    resetSelectedLocation();
    mapDisplayHandler();
    setDirectionsDisplay(false)

    if (postalCodeSearchField !== "") {
      getlocationByPostalCode(postalCodeSearchField);
    } else {
      getLocation();
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
        return material.materialName.toLowerCase() === materialsSearchField.toLowerCase();
      });

      // console.log(selectedMaterial);

      if (selectedMaterial) {
        selectedMaterial.type === "family"
          ? (familiyId = selectedMaterial.id)
          : (materialId = selectedMaterial.id);
      } else {
        materialId = 99999; // Not found
      }

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

  // Lifecycle methods ********************************
  // **************************************************
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

  // This code is necessary to update search field when user chooses filter option by enter key. **********************************************************************************************
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