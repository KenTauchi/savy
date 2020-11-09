import { locationsImportAction, searchedMaterialFactImportAction, loadingConditionHandlerAction, notFoundHandlerAction } from './actions.js';

export const searchLocationsByMaterial = (
  latitude,
  longitude,
  filterRange,
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
    let sfilterRange =
      filterRange === "" || filterRange === undefined
        ? ""
        : "filterRange=" + filterRange;
    let szipCode =
      zipCode === "" || zipCode === undefined ? "" : "zipCode=" + zipCode;
    let smaterialId =
      materialId === "" || materialId === undefined
        ? ""
        : "materialId=" + materialId;
    let sfamiliyId =
      familiyId === "" || familiyId === undefined
        ? ""
        : "familiyId=" + familiyId;

    let queries = [
      slatitude,
      slongitude,
      sfilterRange,
      szipCode,
      smaterialId,
      sfamiliyId,
    ];

    let apiUrl = "http://localhost:3000/api/v1/search?";

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
    
    // console.log(searchResult);

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

    locations = locations.map(location => {
        location.locationInfo.materials.unshift(material.materialName);
        return location.locationInfo;
    })

    dispatch(loadingConditionHandlerAction(false)); 
    // console.log("search results: ", searchResult);
    // console.log("search results L: ", locations);
    // console.log("search results M: ", material);
    dispatch(locationsImportAction(locations));
    dispatch(searchedMaterialFactImportAction(material));

    };
};

    // const locations = await fetch(`http://localhost:3000/api/v1/search?materialId=${materialId}`)
    //     .then((response) => response.json())
    //     .then((result) => {
    //         // dispatch(locationsImportAction(result));
    //         return result;
    //     })
    //     .catch(() => null);
