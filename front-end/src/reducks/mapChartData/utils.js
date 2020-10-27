const createJointData = (state, action) => {
  let dataJoint = [];
  state.forEach((prov) => {
    action.map((data) => {
      if (data.mapData.provinceName === prov.name) {
        let joint = {
          ...prov,
          ...data,
          // value: data.prov_TotalWaste,
        };
        dataJoint.push(joint);
      }

      return dataJoint;
    });
  });
  return dataJoint;
};

export default createJointData;
