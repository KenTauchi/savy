import { locationsImportAction } from './actions.js';

export const searchLocationsByMaterial = (materialId) => {
    return async (dispatch, getState) => {

        // console.log("API data fetch rendered");

        const locations = await fetch(`http://localhost:3000/api/v1/search?materialId=${materialId}`)
            .then((response) => response.json())
            .then((result) => {
                // dispatch(locationsImportAction(result));
                return result;
            })
            .catch(() => null);

        // console.log("search results: ", locations);
        dispatch(locationsImportAction(locations));
    }
}