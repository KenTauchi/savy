import { locationsAcationsTypes } from './actions'
import { initialState } from "../store/initialState";

export const locationsReducer = ( state = initialState.locations, action ) => {
    switch (action.type) {
        case locationsAcationsTypes.LOCATIONS_IMPORT:
            return {
                ...state,
                searchedLocations: action.payload,
            };
        case locationsAcationsTypes.SEARCHED_MATERIAL_FACT_IMPORT:
            return {
              ...state,
              searchedMaterialFact: action.payload,
            };
        case locationsAcationsTypes.LOADING_CONDITION_HANDLER:
            return {
              ...state,
              loading: action.payload,
            };
        case locationsAcationsTypes.NOTFOUND_HANDLER:
            return {
              ...state,
              notFound: action.payload,
            };

        default:
            return state;
    }
};