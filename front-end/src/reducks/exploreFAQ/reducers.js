import * as Actions from "./action";
import { initialState } from "../store/initialState";

export const DataFaqReducer = (
    state = initialState.exploreFAQ,
    action
) => {
    switch (action.type) {
        case Actions.FAQ_IMPORT:
            return {
                ...state,
                data: action.payload,
            };

        default:
            return state;
    }
};