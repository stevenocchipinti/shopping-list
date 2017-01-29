import React from "react";
import { max, min } from "d3";
import { scaleLinear, scaleTime } from "d3-scale";
import Line from "./Line";
import XAxis from "./XAxis";

import { lightBlue500, orange500, green500 } from "material-ui/styles/colors";

const verticalPadding = 20;
const horizontalPadding = 10;

export default props => {
  const xScale = (data, accessor) => {
    return scaleTime()
      .domain([ min(data, accessor), max(data, accessor) ])
      .range([ horizontalPadding, props.width - horizontalPadding ]);
  };

  const yScale = (data, accessor) => {
    return scaleLinear()
      .domain([ min(data, accessor), max(data, accessor) ])
      .range([ props.height - verticalPadding * 2, verticalPadding ]);
  };

  const date = d => new Date(d.date);
  const dateScale = xScale(props.checkins, date);

  const fat = d => d.fat;
  const fatScale = yScale(props.checkins, fat);

  const weight = d => d.weight;
  const weightScale = yScale(props.checkins, weight);

  const waist = d => d.waist;
  const waistScale = yScale(props.checkins, waist);

  return (
    <svg width={props.width} height={props.height}>
      <Line
        x={d => dateScale(date(d))}
        y={d => fatScale(fat(d))}
        data={props.checkins}
        color={lightBlue500}
      />
      <Line
        x={d => dateScale(date(d))}
        y={d => weightScale(weight(d))}
        data={props.checkins}
        color={green500}
      />
      <Line
        x={d => dateScale(date(d))}
        y={d => waistScale(waist(d))}
        data={props.checkins}
        color={orange500}
      />
      <XAxis position={props.height - verticalPadding} scale={dateScale} />
    </svg>
  );
};

