import { createSelector } from "reselect";

const dataSetSelector = (state) => state.dataSet;

export const getDataSet = createSelector([dataSetSelector], (state) => state);
