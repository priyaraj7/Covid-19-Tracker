import React, { useRef, useEffect, useState } from "react";
import { select, geoMercator, geoPath, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";

function WorldMap({ data, countrydata }) {
  const svgRef = useRef();
  const wrappedRef = useRef();
  const dimension = useResizeObserver(wrappedRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  // combining worldMap data with Covid 19 API
  const mapApi = data.features.map((mapCountry) => {
    const countryCode = mapCountry.properties.iso_a3;
    const covid = countrydata.find((cd) => {
      return cd.countryInfo.iso3 === countryCode;
    });
    mapCountry.properties.covid = covid;
    return { ...mapCountry, properties: { ...mapCountry.properties, covid } };
  });
  //console.log(mapApi);
  // console.log(data.features);

  useEffect(() => {
    const svg = select(svgRef.current);

    const minInfection = min(mapApi, (feature) => {
      if (!feature.properties.covid) return undefined;
      return feature.properties.covid.active;
    });
    const maxInfection = max(mapApi, (feature) => {
      if (!feature.properties.covid) return undefined;
      return feature.properties.covid.active;
    });
    console.log(minInfection);
    console.log(maxInfection);

    const colorScale = scaleLinear()
      .domain([minInfection, maxInfection])
      .range(["#ffe6e6", "#FF0000"]);
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
      // for zooming map
      .on("click", (feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .attr("fill", (feature) =>
        colorScale(
          (feature.properties.covid && feature.properties.covid.active) || 0
        )
      )
      .attr("stroke", "black")
      .transition()
      .attr("d", (feature) => pathGenerator(feature));

    // render text
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text((feature) => {
        if (feature && feature.properties && feature.properties.covid)
          return (
            `active cases: ${feature.properties.covid.active}`,
            `active cases: ${feature.properties.covid.active}`
          );
        return "";
      })
      .attr("x", 10)
      .attr("y", 25);
  }, [data, mapApi, dimension, selectedCountry]);

  return (
    <div ref={wrappedRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default WorldMap;
