import React from "react";
import { line } from "d3";

export default (props) => {
  const points = props.data.map((dataPoint, index) => {
    return (
      <circle
        cx={props.x(dataPoint)}
        cy={props.y(dataPoint)}
        r={2}
        key={index}
        fill={props.color}
        style={{clipPath: "url(#clip)"}}
      />
    );
  });

  const lineGenerator = line().x(props.x).y(props.y);
  const linePath = lineGenerator(props.data);

  return (
    <g>
      { points }
      <path
        className="line"
        style={{fill: "none", stroke: props.color, clipPath: "url(#clip)"}}
        d={linePath}
      />
    </g>
  );
};
