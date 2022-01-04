import "./chart.scss";
import React, { Component } from "react";

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
    const style = {
      transform: `scaleY(${firstLoad ? 0 : fillValue})`,
    };
    return (
      <div className="chart__bar">
        <div className="chart__bar--outline">
          <div className="chart__bar--fill" style={style}></div>
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
