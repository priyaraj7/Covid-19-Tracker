import axios from "axios";

const loadData = () => {
  return axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort"),
      axios.get("https://corona.lmao.ninja/v2/states?sort&yesterday"),
    ])
    .then((response) => {
      return {
        globalData: response[0].data,
        countryData: response[1].data,
        usaData: response[2].data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
};

export default loadData;
