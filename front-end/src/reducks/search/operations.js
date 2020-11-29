import { locationsImportAction, searchedMaterialFactImportAction, loadingConditionHandlerAction, notFoundHandlerAction } from './actions.js';
import { API_URL } from '../../components/global_variables';

export const searchLocationsByMaterial = (
  latitude,
  longitude,
  range,
  zipCode,
  materialId,
  familiyId,
) => {
  return async (dispatch, getState) => {

    dispatch(loadingConditionHandlerAction(true));

    let slatitude =
      latitude === "" || latitude === undefined ? "" : "latitude=" + latitude;
    let slongitude =
      longitude === "" || longitude === undefined
        ? ""
        : "longitude=" + longitude;
    let srange =
      range === "" || range === undefined
        ? ""
        : "range=" + range;
    let sfilterRange =
      range === "" || range === undefined
        ? "filterRange=" + false
        : "filterRange=" + true;
    let szipCode =
      zipCode === "" || zipCode === undefined ? "" : "zipCode=" + zipCode;
    let smaterialId =
      materialId === "" || materialId === undefined
        ? ""
        : "materialId=" + materialId;
    let sfamiliyId =
      familiyId === "" || familiyId === undefined
        ? ""
        : "familyId=" + familiyId;

    let queries = [
      slatitude,
      slongitude,
      srange,
      sfilterRange,
      szipCode,
      smaterialId,
      sfamiliyId,
    ];


    let apiUrl = `${API_URL}/search?`;


    queries.forEach((query, index) => {
      if (index === 0) {
        apiUrl += query;
      } else if (query != "") {
        apiUrl += "&" + query;
      }
    });

    // console.log(apiUrl);

    const searchResult = await fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        // dispatch(locationsImportAction(result));
        dispatch(notFoundHandlerAction(false));
        return result;
      })
      .catch((error) => {
        dispatch(notFoundHandlerAction(true));
        console.log(error);
      });
    
    // console.log(searchResult[0]);

    if (!searchResult) {
        dispatch(locationsImportAction([]));
        dispatch(loadingConditionHandlerAction(false));
        return;
    }

    let {locations, material} = searchResult[0];

    locations.map((location) => {
      return (location.locationInfo.materials = location.otherMaterials.map(
        (material) => {
          return material.materialName;
        }
      ));
    });

    // locations = locations.map(location => {
    //     location.locationInfo.materials.unshift(material.materialName);
    //     return location.locationInfo;
    // })

    locations = locations.map(location => {
        return location.locationInfo;
    })

    // console.log(locations);

    dispatch(loadingConditionHandlerAction(false)); 
    // console.log("search results: ", searchResult);
    // console.log("search results L: ", locations);
    // console.log("search results M: ", material);
    dispatch(locationsImportAction(locations));
    dispatch(searchedMaterialFactImportAction(material));

    };
};

    // const locations = await fetch(`${API_URL}/search?materialId=${materialId}`)
    //     .then((response) => response.json())
    //     .then((result) => {
    //         // dispatch(locationsImportAction(result));
    //         return result;
    //     })
    //     .catch(() => null);
