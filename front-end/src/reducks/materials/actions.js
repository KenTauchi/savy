export const materialsAcationsTypes = {
    MATERIALS_IMPORT: "MATERIALS_IMPORT"
};

export const materialsImportAction = (material) => {
    return {
        type: materialsAcationsTypes.MATERIALS_IMPORT,
        payload: material,
    };
};