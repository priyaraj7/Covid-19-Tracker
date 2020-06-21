import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import loadData from "./Api";
import data from "./World.geo.json";
import HomePage from "../Home";
import WorldMap from "../Map";

export default function Control() {
  const [globaldata, setGlobaladata] = useState([]);
  const [countrydata, setContrydata] = useState([]);
  const [usadata, setUsadata] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchUsaState, setSearchUsaState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      const apiResult = await loadData();
      if (apiResult) {
        setContrydata(apiResult.countryData);
        setUsadata(apiResult.usaData);
        setGlobaladata(apiResult.globalData);
        setIsLoading(false);
      } else {
        setLoadingError(true);
        console.log("Error loading data");
      }
    })();
  }, []);

  if (loadingError) {
    return <h1> Error when loading data</h1>;
  }
  if (isLoading) {
    return <h1> Loading... </h1>;
  }
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage
            countrydata={countrydata}
            globaldata={globaldata}
            usadata={usadata}
            searchCountry={searchCountry}
            setSearchCountry={setSearchCountry}
            searchUsaState={searchUsaState}
            setSearchUsaState={setSearchUsaState}
          />
        </Route>
        <Route path="/map">
          <WorldMap countrydata={countrydata} data={data} />
        </Route>
      </Switch>
    </>
  );
}
