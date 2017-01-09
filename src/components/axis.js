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

  axis(type) {
    if (type === "left") {
      return axisLeft(this.props.scale).ticks(10);
    } else if (type === "bottom") {
      return axisBottom(this.props.scale).ticks(10);
    }
  }

  renderAxis() {
    select(this.refs.axis).call(this.axis(this.props.orient));
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>;
  }
}
