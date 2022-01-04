import "./chart.scss";
import React, { Component } from "react";
import styled from "styled-components";
const ChartFill = styled.div`
  transform: scaleY(${(props) => props.fillValue});
`;
class ChartBar extends Component {
  constructor(props) {
    super(props);
    this.state = { firstLoad: true };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ firstLoad: false });
    }, 0);
  }
  render() {
    const { label, value } = this.props;
    const fillValue = value / 100;
    const { firstLoad } = this.state;
    return (
      <div className="chart__bar">
        <div className="chart__bar--outline">
          <ChartFill
            className="chart__bar--fill"
            fillValue={firstLoad ? 0 : fillValue}
          />
        </div>
        <p className="chart__bar__title">{label}</p>
      </div>
    );
  }
}

const Chart = (props) => {
  const { data, maxValue } = props;
  return (
    <div className="chart">
      {data.map((item) => {
        const { value, title } = item;
        return (
          <ChartBar
            value={maxValue && (value / maxValue) * 100}
            label={title}
            key={title}
          />
        );
      })}
    </div>
  );
};

export default Chart;
