const createTableData = (state, provName) => {
  let found = state.find((prov) => prov.mapData.provinceCode === provName);

  return found.mapData;
};

const createPieData = (state, provName) => {
  let found = state.find((prov) => prov.mapData.provinceCode === provName);

  return found.pieData;
};

export { createTableData, createPieData };
