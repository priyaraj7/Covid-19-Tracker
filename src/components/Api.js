import React, { useEffect, useState } from "react";
import "./Api.css";
import axios from "axios";

export default function Apis() {
  const [globaldata, setGlobaladata] = useState("some string");
  useEffect(() => {
    axios
      .get("https://corona.lmao.ninja/v2/all")
      .then((Response) => {
        setGlobaladata(Response.data);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const date = new Date(parseInt(globaldata.updated));
  // const lastupdated = date.toString();
  let date = new Date(globaldata.updated);
  let lastupdated =
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "-" +
    date.getFullYear();

  return (
    <>
      <div className="sidenav">
        <div>Total Cases: {globaldata.cases}</div>
        <div>Recovered: {globaldata.recovered}</div>
        <div>Deaths: {globaldata.deaths}</div>
        <div>Critical: {globaldata.critical}</div>
        <div>Active Cases: {globaldata.active}</div>
        <div>Today Cases: {globaldata.todayCases}</div>
        <div>Total Deaths: {globaldata.todayDeaths}</div>
        <div>Last updated:{lastupdated}</div>
      </div>
      <div className="main">...</div>
    </>
  );
}

//https://www.w3schools.com/howto/howto_css_fixed_sidebar.asp
