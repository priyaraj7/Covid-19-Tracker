import loadData from "../components/Api";
import axios from "axios";

jest.mock("axios");

describe("API call", () => {
  it("should make XHR request", async () => {
    axios.all.mockResolvedValue([
      {
        data: "globalData",
      },
      {
        data: "countryData",
      },
      {
        data: "usaData",
      },
    ]);
    const data = await loadData();
    expect(data.globalData).toEqual("globalData");
    expect(data.countryData).toEqual("countryData");
    expect(data.usaData).toEqual("usaData");
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      "https://corona.lmao.ninja/v2/all"
    );
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      "https://corona.lmao.ninja/v2/countries?yesterday&sort"
    );
    expect(axios.get).toHaveBeenNthCalledWith(
      3,
      "https://corona.lmao.ninja/v2/states?sort&yesterday"
    );
  });

  it("should return empty object when XHR fails", async () => {
    axios.all.mockRejectedValue("Error");
    const data = await loadData();
    expect(data).toEqual({});
  });
});
