const createTableData = (state, provName) => {
  console.log("state", state.data);
  let found = state.find((prov) => prov.mapData.provinceCode === provName);

  return found.mapData;
};

const createPieData = (state, provName) => {
  // console.log("state", state.data);
  let found = state.find((prov) => prov.mapData.provinceCode === provName);

  return found.pieData;
};

export { createTableData, createPieData };
