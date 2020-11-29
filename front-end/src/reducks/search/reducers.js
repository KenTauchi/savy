import { searchAcationsTypes } from './actions'
import { initialState } from "../store/initialState";

export const searchReducer = ( state = initialState.search, action ) => {
    switch (action.type) {
        case searchAcationsTypes.LOCATIONS_IMPORT:
            return {
                ...state,
                searchedLocations: action.payload,
            };
        case searchAcationsTypes.SEARCHED_MATERIAL_FACT_IMPORT:
            return {
              ...state,
              searchedMaterialFact: action.payload,
            };
        case searchAcationsTypes.LOADING_CONDITION_HANDLER:
            return {
              ...state,
              loading: action.payload,
            };
        case searchAcationsTypes.NOTFOUND_HANDLER:
            return {
              ...state,
              notFound: action.payload,
            };

        default:
            return state;
    }
};