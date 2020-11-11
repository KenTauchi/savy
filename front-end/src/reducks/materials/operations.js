import { materialsImportAction } from './actions.js';
import { API_URL } from '../../components/global_variables';

export const materialsImport = () => {
    return async (dispatch, getState) => {

        // console.log("API data fetch rendered");

        const materials = await fetch(`${API_URL}/materials`)
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