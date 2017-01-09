import React from "react";
import { axisLeft, axisBottom } from "d3-axis";
import { select } from "d3-selection";

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  axisType(type) {
    if (type === "left")
      return axisLeft;
    else if (type === "bottom")
      return axisBottom;
  }

  renderAxis() {
    var node  = this.refs.axis;
    var axis = this.axisType(this.props.orient)(this.props.scale).ticks(5);
    select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>;
  }
}
