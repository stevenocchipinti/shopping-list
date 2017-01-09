import React from "react";
import { max } from "d3";
import { scaleLinear } from "d3-scale";
import DataCircles from "./data-circles";

// Returns the largest X coordinate from the data set
const xMax = (data) => max(data, (d) => d[0]);

// Returns the higest Y coordinate from the data set
const yMax = (data) => max(data, (d) => d[1]);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  return scaleLinear()
    .domain([0, xMax(props.checkins)])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return scaleLinear()
    .domain([0, yMax(props.checkins)])
    .range([props.height - props.padding, props.padding]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return (
    <svg width={props.width} height={props.height}>
      <DataCircles {...props} {...scales} />
    </svg>
  );
};
