import { createSelector } from "reselect";

const materialsSelector = (state) => state.materials;

export const getMaterials = createSelector(
    [materialsSelector],
    (state) => state
);

export const getMaterialsIdNameType = createSelector(
    [materialsSelector],
    (state) => state.idNameType
);

export const getSearchedMaterial = createSelector(
    [materialsSelector],
    (state) => state.searchedMaterial
);