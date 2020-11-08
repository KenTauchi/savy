export const locationsAcationsTypes = {
  LOCATIONS_IMPORT: "LOCATIONS_IMPORT",
  SEARCHED_MATERIAL_FACT_IMPORT: "SEARCHED_MATERIAL_FACT_IMPORT",
};

export const locationsImportAction = (locations) => {
    return {
        type: locationsAcationsTypes.LOCATIONS_IMPORT,
        payload: locations,
    };
};

export const searchedMaterialFactImportAction = (materialFact) => {
    return {
        type: locationsAcationsTypes.SEARCHED_MATERIAL_FACT_IMPORT,
        payload: materialFact,
    };
};