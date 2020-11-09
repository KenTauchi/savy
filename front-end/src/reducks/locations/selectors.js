import { createSelector } from "reselect";

const locationsSelector = (state) => state.locations;

export const getLocations = createSelector(
    [locationsSelector],
    (state) => state
);

export const getLocationsSearchedLocations = createSelector(
    [locationsSelector],
    (state) => state.searchedLocations
);

export const getSearchedMaterialFact = createSelector(
  [locationsSelector],
  (state) => state.searchedMaterialFact
);

export const getLoadingCondition = createSelector(
  [locationsSelector],
  (state) => state.loading
);