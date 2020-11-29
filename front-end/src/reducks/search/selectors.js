import { createSelector } from "reselect";

const searchSelector = (state) => state.search;

export const getSearch = createSelector(
    [searchSelector],
    (state) => state
);

export const getLocationsSearchedLocations = createSelector(
    [searchSelector],
    (state) => state.searchedLocations
);

export const getSearchedMaterialFact = createSelector(
  [searchSelector],
  (state) => state.searchedMaterialFact
);

export const getLoadingCondition = createSelector(
  [searchSelector],
  (state) => state.loading
);

export const getNotFoundCondition = createSelector(
  [searchSelector],
  (state) => state.notFound
);