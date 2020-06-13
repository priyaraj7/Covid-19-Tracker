import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Home";
import "./Control.css";
import data from "./GeoChart.world.geo.json";
import WorldMap from "./World";

export default function Control() {
  const [globaldata, setGlobaladata] = useState([]);
  const [countrydata, setContrydata] = useState([]);
  const [usadata, setUsadata] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort"),
        axios.get("https://corona.lmao.ninja/v2/states?sort&yesterday"),
        // axios.get("https://corona.lmao.ninja/v2/states?sort&yesterday"),
      ])
      .then((response) => {
        setGlobaladata(response[0].data);
        setContrydata(response[1].data);
        setUsadata(response[2].data);
        //console.log(response[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (
    countrydata.length === 0 ||
    globaldata.length === 0 ||
    usadata.length === 0
  ) {
    return <h1> Loading </h1>;
  }
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage
            countrydata={countrydata}
            globaldata={globaldata}
            usadata={usadata}
          />
        </Route>
        <Route path="/map">
          <WorldMap countrydata={countrydata} data={data} />
        </Route>
      </Switch>
    </>
  );
}
