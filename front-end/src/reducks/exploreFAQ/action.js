export const FAQ_IMPORT = "FAQ_IMPORT";

export const faqImportAction = (dataResult) => {
    return {
        type: "FAQ_IMPORT",
        payload: dataResult,
    };
};