// // import { dataImportAction } from "./action";
// import { API_URL } from '../../components/global_variables';


// export const dataFetch = () => {
//   // return (dispatch, getState) => {
//     const provs = fetch(
//       // "https://cors-anywhere.herokuapp.com/" +
//       //   "https://api.covid19tracker.ca/provinces"
//       `${API_URL}/provinces`
//     )
//       .then((response) => response.json())
//       .catch(() => null);

//     let provDataArr = [];

//     provs.forEach((prov) => {
//       let provId = "CA-" + prov.code;
//       let provVal = prov.population;
//       let provObj = {
//         id: provId,
//         value: provVal,
//       };

//       provDataArr.push(provObj);
//     });
//     console.log(provDataArr)

//     return provDataArr
//     // dispatch(
//     //   dataImportAction(provDataArr)
//     // );
//   // };
// };
