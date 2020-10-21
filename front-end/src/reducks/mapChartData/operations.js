// import { dataImportAction } from "./action";

export const dataFetch = () => {
  // return (dispatch, getState) => {
    const provs = fetch(
      "https://cors-anywhere.herokuapp.com/" +
        "https://api.covid19tracker.ca/provinces"
    )
      .then((response) => response.json())
      .catch(() => null);

    let provDataArr = [];

    provs.forEach((prov) => {
      let provId = "CA-" + prov.code;
      let provVal = prov.population;
      let provObj = {
        id: provId,
        value: provVal,
      };

      provDataArr.push(provObj);
    });
    console.log(provDataArr)

    return provDataArr
    // dispatch(
    //   dataImportAction(provDataArr)
    // );
  // };
};