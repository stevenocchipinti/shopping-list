import React from "react";
import { max, min } from "d3";
import { scaleLinear, scaleTime } from "d3-scale";
import Line from "./Line";
import XYAxis from "./XYAxis";

// Returns the largest X coordinate from the data set
const xMin = (data) => min(data, (d) => new Date(d.date));
const xMax = (data) => max(data, (d) => new Date(d.date));

// Returns the higest Y coordinate from the data set
const yMin = (data) => min(data, (d) => d.fat);
const yMax = (data) => max(data, (d) => d.fat);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  return scaleTime()
    .domain([xMin(props.checkins), xMax(props.checkins)])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return scaleLinear()
    .domain([yMin(props.checkins), yMax(props.checkins)])
    .range([props.height - props.padding, props.padding]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return (
    <svg width={props.width} height={props.height}>
      <Line {...props} {...scales} />
      <XYAxis {...props} {...scales} />
    </svg>
  );
};
