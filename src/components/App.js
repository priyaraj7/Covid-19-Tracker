import React from "react";
import "./App.css";
import WorldMap from "./World";

import data from "./GeoChart.world.geo.json";
//import Apis from "./Api";

const App = () => {
  //const [property]
  return (
    <>
      <h2>World Map with d3-geo</h2>
      {console.log(data)}
      <WorldMap data={data} />
    </>
  );
};

export default App;
