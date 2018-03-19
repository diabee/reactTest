import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class barChart extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { xVal: "", yVal: "" };
  }

  render() {
    return (
      <div>
        {this.props.xVal}
        {this.props.yVal}
        <div>
          <canvas id="canvas" width="500" height="300">
            The canvas element is not supported by your browser!
          </canvas>

          <legend htmlFor="canvas" />
          <Button onClick={this.barchartDraw.bind(this)}>refresh</Button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    var options = (this.options = {
      seriesName: "月營收",
      padding: 20,
      gridScale: 5,
      gridColor: "#eeeeee",
      data: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0
      },
      colors: [
        "red",
        "yellow",
        "pink",
        "blue",
        "#a55ca5",
        "#67b6c7",
        "#bccd7a",
        "#eb9743",
        "#a55ca5",
        "#67b6c7",
        "#bccd7a",
        "#eb9743"
      ]
    });
    this.barchartDraw();
    this.drewLegend();
  }

  drawLine(startX, startY, endX, endY, color) {
    var myCanvas = document.getElementById("canvas");
    var ctx = myCanvas.getContext("2d");
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }

  drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
  }
  clearDraw() {
    debugger;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, 1000);
  }
  barchartDraw(e) {
    debugger;
    this.clearDraw();

    this.options.data[this.props.xVal] = this.props.yVal;
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.colors = this.options.colors;

    var maxValue = 0;
    for (var categ in this.options.data) {
      maxValue = Math.max(maxValue, this.options.data[categ]);
    }
    var canvasActualHeight = this.canvas.height - this.options.padding * 2;
    var canvasActualWidth = this.canvas.width - this.options.padding * 2;

    //drawing the grid lines
    var gridValue = 0;
    while (gridValue <= maxValue) {
      var gridY =
        canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
      this.drawLine(0, gridY, this.canvas.width, gridY, this.options.gridColor);

      //writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.textBaseline = "bottom";
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 10, gridY - 2);
      this.ctx.restore();

      gridValue += this.options.gridScale;
    }

    //drawing the bars
    var barIndex = 0;
    var numberOfBars = Object.keys(this.options.data).length;
    var barSize = canvasActualWidth / numberOfBars;

    for (categ in this.options.data) {
      var val = this.options.data[categ];
      var barHeight = Math.round(canvasActualHeight * val / maxValue);
      this.drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex % this.colors.length]
      );

      barIndex++;
    }

    //drawing series name
    this.ctx.save();
    this.ctx.textBaseline = "bottom";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "bold 14px Arial";
    this.ctx.fillText(
      this.options.seriesName,
      this.canvas.width / 2,
      this.canvas.height
    );
    this.ctx.restore();
  }
  drewLegend() {
    //draw legend
    let barIndex = 0;
    let legend = document.querySelector("legend[for='canvas']");
    let ul = document.createElement("ul");
    legend.append(ul);
    for (let categ in this.options.data) {
      let li = document.createElement("li");
      li.style.listStyle = "none";
      li.style.borderLeft =
        "20px solid " + this.colors[barIndex % this.colors.length];
      li.style.padding = "5px";
      li.textContent = categ;
      ul.append(li);
      barIndex++;
    }
  }
}
export default barChart;
