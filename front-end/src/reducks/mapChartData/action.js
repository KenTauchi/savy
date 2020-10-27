export const DATA_IMPORT = "DATA_IMPORT";

export const dataImportAction = (dataResult) => {
  return {
    type: "DATA_IMPORT",
    payload: dataResult,
  };
};

export const CLICK_GET = "CLICK_GET";
export const clickGet = (contr, waste, prov) => {
    return {
      type: "CLICK_GET",
      payload: {
        contribution: contr,
        wasteRecycled: waste,
        provinceRank: prov,
      }
    };
  };

