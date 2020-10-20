const createJointData = (state, action) => {
    let dataJoint = [];
    state.forEach(prov => {
      action.map(data => {
        if (data.id === prov.id){
          let joint = {
            ...prov,
            ...data
          }
          dataJoint.push(joint)
        }
      })
    })
    return dataJoint
}

export default createJointData