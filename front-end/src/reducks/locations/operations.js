import { locationsImportAction, searchedMaterialFactImportAction } from './actions.js';

export const searchLocationsByMaterial = (
  latitude,
  longitude,
  filterRange,
  zipCode,
  materialId,
  familiyId
) => {
  return async (dispatch, getState) => {
    let slatitude = latitude === "" ? "" : "latitude=" + latitude;
    let slongitude = longitude === "" ? "" : "longitude=" + longitude;
    let sfilterRange = filterRange === "" ? "" : "filterRange=" + filterRange;
    let szipCode = zipCode === "" ? "" : "zipCode=" + zipCode;
    let smaterialId = materialId === "" ? "" : "materialId=" + materialId;
    let sfamiliyId = familiyId === "" ? "" : "familiyId=" + familiyId;

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

    console.log(apiUrl);

    const searchResult = await fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        // dispatch(locationsImportAction(result));
        return result;
      })
      .catch((error) => console.log(error));

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

    console.log("search results: ", searchResult);
    console.log("search results L: ", locations);
    console.log("search results M: ", material);
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
