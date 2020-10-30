import * as Actions from "./action";
import { initialState } from "../store/initialState";

export const TeamDataReducer = (
    state = initialState.teamMembers,
    action
) => {
    switch (action.type) {
        case Actions.TEAM_IMPORT:
            return {
                ...state,
                data: action.payload,
            };

        default:
            return state;
    }
};