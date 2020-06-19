import React, { useRef, useEffect, useState } from "react";
import "./Map.css";
import { select, geoMercator, geoPath, max, event, color } from "d3";

import useResizeObserver from "./useResizeObserver";

function WorldMap({ data, countrydata }) {
  const svgRef = useRef();
  const wrappedRef = useRef();
  const dimension = useResizeObserver(wrappedRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltip, setToolTip] = useState(null);

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
    // tooltip
    let tooltip = select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    setToolTip(tooltip);
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);

    // const minInfection = min(mapApi, (feature) => {
    //   if (!feature.properties.covid) return null;
    //   return feature.properties.covid.active;
    // });
    const maxInfection = max(mapApi, (feature) => {
      if (!feature.properties.covid) return null;
      return feature.properties.covid.active;
    });

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
      .on("mousemove", function (d) {
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseover", (d, i) => {
        console.log(d);
        const covid = d.properties.covid;
        if (covid) {
          tooltip.transition().duration(250).style("opacity", 1);
          tooltip
            .html(
              `<div>
          <h3>${covid.country}</h3>
          <ul>
          <li>Cases: ${covid.cases}</li>
            <li>Active: ${covid.active}</li>
            <li>Critical: ${covid.critical}</li>
            <li>Death: ${covid.deaths}</li>
          </ul>
          </div>`
            )
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 28 + "px");
        } else {
          tooltip.transition().duration(250).style("opacity", 0);
        }
      })
      .on("mouseout", function (d) {
        tooltip.transition().duration(250).style("opacity", 0);
      })
      .attr("class", "country")
      .attr("fill", (feature) => {
        const activeCases =
          (feature.properties.covid && feature.properties.covid.active) || 0;
        const colorBucket = Math.log10(Math.max(activeCases, 1));
        const c = color("red");
        c.opacity = colorBucket / Math.log10(maxInfection);
        // console.log(`country ${feature.properties.name} opacity, ${c.opacity}`);
        return c;
      })
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
          return `active cases: ${feature.properties.covid.active}`;
        return "";
      })
      .attr("x", 10)
      .attr("y", 25);
  }, [data, mapApi, dimension, selectedCountry, tooltip]);

  return (
    <div ref={wrappedRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default WorldMap;
