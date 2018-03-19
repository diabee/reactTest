import React, { Component } from "react";
import { Button, Input, Select } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class barChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { xVal: "", yVal: "" };
  }

  render() {
    return <div>
        {this.props.xVal} 
        {this.props.yVal}
      </div>;
  }
}

export default barChart;
