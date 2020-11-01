import * as Actions from "./action";
import { initialState } from "../store/initialState";
import createTableData from "./utils";

export const DataSetReducer = (state = initialState.dataSet, action) => {
  switch (action.type) {
    case Actions.DATA_IMPORT:
      return {
        ...state,
        data: action.payload,
        // data: createJointData(state.data, action.payload)
      };
    case Actions.CLICK_GET:
      return {
        ...state,
        mapDataTable: createTableData(state, action.payload),
      };
    default:
      return state;
  }
};

// export const DataTableReducer = (
//   state = initialState.mapChartDataTable,
//   action
// ) => {
//   switch (action.type) {
//     case Actions.CLICK_GET:
//       return {
//         ...state,

//       };

//     default:
//       return state;
//   }
// };

// get data from action and decide how to change data in store.
// -> manager for the state in Store

// According to the action type, reducer decides how to change the state.
