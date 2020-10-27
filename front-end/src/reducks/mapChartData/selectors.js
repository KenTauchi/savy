import { createSelector } from "reselect";

const dataSetSelector = (state) => state.dataSet;
const dataTableSelector = (state) => state.dataTable;

export const getDataSet = createSelector([dataSetSelector], (state) => state);
export const getDataTable = createSelector([dataTableSelector], (state) => state);