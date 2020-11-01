const createTableData = (state, provName) => {
  state.find((prov) => prov.mapData.provinceCode === provName);

  // return found.mapData;
};

export default createTableData;
