import React, { Component } from "react";
import { max, min } from "d3";
import { scaleLinear, scaleTime } from "d3-scale";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import Paper from "material-ui/Paper";
import { lightBlue500, orange500, green500 } from "material-ui/styles/colors";
import Line from "./Line";
import XAxis from "./XAxis";

const MARGIN = 10;
const PADDING = 20;
const VERTICAL_SPACING = 20;
const CLIPPING_BUFFER = 2;   // To cater for the <circle> elements in <Line>

const date = d => new Date(d.date);
const fat = d => d.fat;
const weight = d => d.weight;
const waist = d => d.waist;

const xScale = (data, accessor, range) => {
  return scaleTime()
    .domain([ min(data, accessor), max(data, accessor) ])
    .range(range);
};

const yScale = (data, accessor, range) => {
  return scaleLinear()
    .domain([ min(data, accessor), max(data, accessor) ])
    .range(range);
};


export default class CheckinChart extends Component {
  constructor(props) {
    super(props);

    const horizontalRange = [0, this.innerWidth()];
    const verticalRange = [this.innerHeight() - VERTICAL_SPACING, 0];

    this.state = {
      dateScale: xScale(props.checkins, date, horizontalRange),
      originalDateScale: xScale(props.checkins, date, horizontalRange),

      fatScale: yScale(props.checkins, fat, verticalRange),
      weightScale: yScale(props.checkins, weight, verticalRange),
      waistScale: yScale(props.checkins, waist, verticalRange),
    }
  }

  innerWidth() { return this.props.viewportWidth - PADDING*2 - MARGIN*2 }
  innerHeight() { return this.props.height - PADDING*2 }

  componentDidMount() { this.setupZoom(); }
  setupZoom() {
    const zoomed = () => {
      const e = require("d3-selection").event;
      this.setState({
        ...this.state,
        dateScale: e.transform.rescaleX(this.state.originalDateScale)
      });
    }
    select(this.refs.focus).call(
      zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [this.innerWidth(), this.innerHeight()]])
        .extent([[0, 0], [this.innerWidth(), this.innerHeight()]])
        .on("zoom", zoomed)
    );
  }

  render() {
    return (
      <Paper style={{ margin: MARGIN }} zDepth={1}>
        <svg
          width={this.props.viewportWidth - MARGIN * 2}
          height={this.props.height}
        >
          <defs>
            <clipPath id="clip">
              <rect
                transform={`translate(-${CLIPPING_BUFFER}, -${CLIPPING_BUFFER})`}
                width={this.innerWidth() + CLIPPING_BUFFER * 2}
                height={this.innerHeight() + CLIPPING_BUFFER * 2}
              />
            </clipPath>
          </defs>

          <g ref="focus" transform={`translate(${PADDING}, ${PADDING})`}>
            <XAxis
              position={this.innerHeight() }
              scale={this.state.dateScale}
            />
            <Line
              x={d => this.state.dateScale(date(d))}
              y={d => this.state.fatScale(fat(d))}
              data={this.props.checkins}
              color={green500}
            />
            <Line
              x={d => this.state.dateScale(date(d))}
              y={d => this.state.weightScale(weight(d))}
              data={this.props.checkins}
              color={orange500}
            />
            <Line
              x={d => this.state.dateScale(date(d))}
              y={d => this.state.waistScale(waist(d))}
              data={this.props.checkins}
              color={lightBlue500}
            />
            <rect
              height={this.innerHeight()}
              width={this.innerWidth()}
              style={{ cursor: "move", fill: "none", pointerEvents: "all" }}
            ></rect>
          </g>

        </svg>
      </Paper>
    );
  }
}
