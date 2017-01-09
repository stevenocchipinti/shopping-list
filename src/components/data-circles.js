import React from "react";

const renderCircles = (props) => {
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
    <g>{ props.checkins.map(renderCircles(props)) }</g>
  );
};
