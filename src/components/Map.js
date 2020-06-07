import React, { useRef, useEffect } from "react";
import "./New.css";
import { select, geoPath, geoMercator } from "d3";
import data from "./GeoChart.world.geo.json";
const { features } = data;

function GeoChart({ property }) {
  console.log(data);
  const svgRef = useRef();

  //const wrapperRef = useRef();
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);
    const projection = geoMercator().fitSize([600, 400], data);

    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(features)
      .join("path")
      .attr("class", "country")
      .attr("d", (feature) => pathGenerator(feature));
  }, [property]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default GeoChart;
