import { materialsAcationsTypes } from './actions'
import { initialState } from "../store/initialState";

export const materialsReducer = ( state = initialState.teamMembers, action ) => {
    switch (action.type) {
        case materialsAcationsTypes.MATERIALS_IMPORT:
            return {
                ...state,
                materialsIdNameType: action.payload,
            };

        default:
            return state;
    }
};