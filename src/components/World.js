import React, { useRef, useEffect, useState } from "react";
import { select, geoMercator, geoPath } from "d3";
import useResizeObserver from "./useResizeObserver";

//import { feature } from "topojson";

function WorldMap({ data }) {
  const svgRef = useRef();
  const wrappedRef = useRef();
  const dimension = useResizeObserver(wrappedRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    //use resize dimension
    //but fall back to getBoundingClientRect, if no dimension yet.
    const { width, height } =
      dimension || wrappedRef.current.getBoundingClientRect();

    // project geo-co-ordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);
    // render each country
    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", (feature) => {
        debugger;
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .attr("fill", "white")
      .attr("stroke", "black")
      .transition()
      .attr("d", (feature) => pathGenerator(feature));
  }, [data, dimension, selectedCountry]);
  return (
    <div ref={wrappedRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default WorldMap;
