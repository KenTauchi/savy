export const TEAM_IMPORT = "TEAM_IMPORT";

export const teamImportAction = (dataResult) => {
    return {
        type: "TEAM_IMPORT",
        payload: dataResult,
    };
};