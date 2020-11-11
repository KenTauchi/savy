import { materialsImportAction } from './actions.js';

export const materialsImport = () => {
    return async (dispatch, getState) => {

        // console.log("API data fetch rendered");

        const materials = await fetch("http://34.212.131.115/api/v1/materials/")
          .then((response) => response.json())
          .then((result) => {
            // dispatch(materialsImportAction(result));
            return result;
          })
          .catch(() => null);


        // console.log("test: ", materials);
        dispatch(materialsImportAction(materials));
    }
}