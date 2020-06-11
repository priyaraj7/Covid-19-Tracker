import React, { useRef, useEffect, useState } from "react";
import { select, geoMercator, geoPath } from "d3";
import useResizeObserver from "./useResizeObserver";

//import { feature } from "topojson";

function WorldMap({ data, countrydata }) {
  const svgRef = useRef();
  const wrappedRef = useRef();
  const dimension = useResizeObserver(wrappedRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const mapApi = data.features.map((mapCountry) => {
    const countryCode = mapCountry.properties.iso_a3;
    const covid = countrydata.find((cd) => {
      return cd.countryInfo.iso3 === countryCode;
    });
    mapCountry.properties.covid = covid;
    return { ...mapCountry, properties: { ...mapCountry.properties, covid } };
  });
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
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .attr("fill", "white")
      .attr("stroke", "black")
      .transition()
      .attr("d", (feature) => pathGenerator(feature));
  }, [data, mapApi, dimension, selectedCountry]);
  return (
    <div ref={wrappedRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default WorldMap;
