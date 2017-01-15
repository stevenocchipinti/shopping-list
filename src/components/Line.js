import React from "react";
import { line } from "d3";

const renderPath = (props) => {
  var valueLine = line()
    .x(function(d) { return props.xScale(new Date(d.date)); })
    .y(function(d) { return props.yScale(d.fat); });
  return valueLine(props.checkins);
};

export default (props) => {
  return (
    <path
      className="line"
      style={{fill: "none", stroke: "#000"}}
      d={renderPath(props)}
    />
  );
};
