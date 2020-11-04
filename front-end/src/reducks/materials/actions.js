export const materialsAcationsTypes = {
    MATERIALS_IMPORT: "MATERIALS_IMPORT",
    MATERIALS_SEARCHFIELD_UPDATE: "MATERIALS_SEARCHFIELD_UPDATE",
};

export const materialsImportAction = (material) => {
    return {
        type: materialsAcationsTypes.MATERIALS_IMPORT,
        payload: material,
    };
};

export const materialsSearchFieldUpdate = (material) => {
    return {
        type: materialsAcationsTypes.MATERIALS_SEARCHFIELD_UPDATE,
        payload: material,
    };
};