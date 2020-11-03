export const locationsAcationsTypes = {
    LOCATIONS_IMPORT: "LOCATIONS_IMPORT"
};

export const locationsImportAction = (locations) => {
    return {
        type: locationsAcationsTypes.LOCATIONS_IMPORT,
        payload: locations,
    };
};