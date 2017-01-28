import React from "react";
import { line } from "d3";

const renderPath = (props) => {
  var valueLine = line()
    .x(function(d) { return props.xScale(new Date(d.date)); })
    .y(function(d) { return props.yScale(d.fat); });
  return valueLine(props.checkins);
};

const renderPoints = (props) => {
  return (checkin, index) => {
    const circleProps = {
      cx: props.xScale(new Date(checkin.date)),
      cy: props.yScale(checkin.fat),
      r: 2,
      key: index
    };
    return <circle {...circleProps} />;
  };
};

export default (props) => {
  return (
    <g>
      { props.checkins.map(renderPoints(props)) }
      <path
        className="line"
        style={{fill: "none", stroke: "#000"}}
        d={renderPath(props)}
      />
    </g>
  );
};
