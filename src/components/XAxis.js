import React from "react";
import Axis from "./axis";

export default (props) => {
  return (
    <g className="xy-axis">
      <Axis
        translate={`translate(0, ${props.position})`}
        scale={props.scale}
        orient="bottom"
      />
    </g>
  );
};
