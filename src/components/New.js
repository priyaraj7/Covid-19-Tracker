import React, { Component } from "react";
import * as topojson from "topojson";
import * as d3 from "d3";
import styles from "./new.module.css";

class CongressionalDistricts extends Component {
  state = {
    usData: null,
    // usCongress: null
  };
  componentWillMount() {
    // load data
    d3.json("map.json", (error, usData) => {
      this.setState({
        usData,
        // usCongress
      });
    });
  }
  componentDidUpdate() {
    // render example D3
    const svg = d3.select(this.refs.anchor),
      // const svg = d3.select("body").append("svg");
      { width, height } = this.props;
    const projection = d3
      .geoAlbers()
      .scale(1280)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);
    //const path =  d3.geoPath().projection(d3.geoMercator());
    const us = this.state.usData;

    //copy paste data
    svg
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path);
  }
  render() {
    const { usData } = this.state;
    if (!usData) {
      return null;
    }
    return <g ref="anchor" />;
  }
}
export default CongressionalDistricts;

// https://blockbuilder.org/piwodlaiwo/3734a1357696dcff203a94012646e932
