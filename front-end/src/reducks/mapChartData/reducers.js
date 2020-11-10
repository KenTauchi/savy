import * as Actions from "./action";
import { initialState } from "../store/initialState";
import { createTableData, createPieData } from "./utils";

export const DataSetReducer = (state = initialState.dataSet, action) => {
  switch (action.type) {
    case Actions.DATA_IMPORT:
      return {
        ...state,
        data: action.payload,
      };
    case Actions.CLICK_GET:
      return {
        ...state,
        mapDataTable: createTableData(state.data, action.payload),
        pieChartData: createPieData(state.data, action.payload),
      };
    default:
      return state;
  }
};
