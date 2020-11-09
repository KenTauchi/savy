export const locationsAcationsTypes = {
  LOCATIONS_IMPORT: "LOCATIONS_IMPORT",
  SEARCHED_MATERIAL_FACT_IMPORT: "SEARCHED_MATERIAL_FACT_IMPORT",
  LOADING_CONDITION_HANDLER: "LOADING_CONDITION_HANDLER",
  NOTFOUND_HANDLER: "NOTFOUND_HANDLER"
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

export const loadingConditionHandlerAction = (status) => {
    return {
        type: locationsAcationsTypes.LOADING_CONDITION_HANDLER,
        payload: status,
    };
};

export const notFoundHandlerAction = (status) => {
    return {
        type: locationsAcationsTypes.NOTFOUND_HANDLER,
        payload: status,
    };
};