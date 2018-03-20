import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class lineChart extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { xVal: "", yVal: "" };
    }

    render() {
        return (
            <div>
                <div>

                    <Button onClick={this.linechartDraw.bind(this)}>refresh</Button>
                    <div>
                        <canvas id="lineCanvas" width="500" height="300">
                            The canvas element is not supported by your browser!
                        </canvas>
                    </div>
                </div>
            </div>
        );
    }


    clearDraw() {
        var canvas = document.getElementById("lineCanvas");
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, 1000);
    }

    componentDidMount() {
        
        var Data = (this.Data={data : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]});
        this.linechartDraw();
    }

    linechartDraw() {
        this.clearDraw();
        var Elem = document.getElementById('lineCanvas');

        var context = Elem.getContext('2d');
        // 長度和寬度
        const WIDTH = Elem.width;
        const HEIGHT = Elem.height;
        // 3. 定義坐標轴相對canvas的内邊距
        var padding = 20;//初始化内邊距
        var paddingLeft = 60;//至少大於redraw文字的宽度
        var paddingBottom = 30;//至少大於redraw文字的高度
        // 4. 定義繪製坐標轴的關鍵點的坐標值
        var axisY = {// y軸的起點坐標值
            x: paddingLeft,
            y: padding
        };
        var origin = {// 原点坐标值(x轴与y轴相交点)
            x: paddingLeft,
            y: HEIGHT - paddingBottom
        };
        var axisX = {
            x: WIDTH - padding,
            y: HEIGHT - paddingBottom
        };
        // 5. redraw坐標轴
        context.beginPath();
        context.moveTo(axisY.x, axisY.y);
        context.lineTo(origin.x, origin.y);
        context.lineTo(axisX.x, axisX.y);
        context.stroke();
        // 6. redraw坐標軸的
        context.beginPath();
        context.moveTo(axisY.x - 5, axisY.y + 10);
        context.lineTo(axisY.x, axisY.y);
        context.lineTo(axisY.x + 5, axisY.y + 10);
        context.stroke();

        context.beginPath();
        context.moveTo(axisX.x - 10, axisX.y - 5);
        context.lineTo(axisX.x, axisX.y);
        context.lineTo(axisX.x - 10, axisX.y + 5);
        context.stroke();

        // 定差折點的x軸值
        var pointsX = [];

        // 坐標軸的刻度(x軸的月份和y軸的金額)
        // 月份
        var month = {
            x: paddingLeft,
            y: HEIGHT - paddingBottom
        }
         
        context.font = "14px 微軟雅黑";
        context.textBaseline = "top";
        for (var i = 1; i <= 12; i++) {
            pointsX[pointsX.length] = month.x;
            // 绘制月份信息
            context.fillText(i + "月", month.x, month.y);
            // 改变每次绘制的x坐标轴的值
            month.x += (axisX.x - origin.x) / 12;
        }

        // get the most money
        /*
        var datas = [];
        for(index in Data){
            datas[datas.length] = Data[index];
        }
        function sortNumber(a,b){
            return a - b;
        }
        var max = datas.sort(sortNumber)[datas.length-1];
        */
        var max = Math.max.apply(Math, this.Data);

        var moneyY = (origin.y - axisY.y) / (max / 500 + 1);

        // 定义绘制的坐标值
        var money = {
            x: axisY.x - 5,
            y: axisY.y + moneyY,
            jin: max
        }
        // 设置水品对齐
        context.textAlign = "right";
        // 遍历"最高值/间隔"次
        for (var i = 0; i < max / 500; i++) {
            // 绘制金额
            context.fillText(money.jin + "元", money.x, money.y);
            // y轴向下移动(增加)
            money.y += moneyY;
            // 金额每次减500
            money.jin -= 500;
        }

        /*
          绘制折线
          * 12个折点的x轴值，对应12个月文字的x轴值
          * 折点的y轴值等于原点的y轴值-折点到原点的距离
            * 折点到原点的距离 = (3000点的y到原点的y的长度)*当前金额/3000
         */
        context.beginPath();
        for (var i = 0; i < Data.length; i++) {
            // 获取折点的x和y值
            var pointY = origin.y - (origin.y - (axisY.y + moneyY)) * Data[i] / max;
            var pointX = pointsX[i];
            // 绘制折线
            if (i == 0) {
                context.textAlign = "left";
                //context.textBaseline = "bottom";
                context.moveTo(pointX, pointY);
            } else {
                context.textAlign = "center";
                context.textBaseline = "bottom";
                context.lineTo(pointX, pointY);
            }
            // 绘制折点的金额
            context.fillText(Data[i], pointX, pointY);
        }
        context.stroke();
        // 绘制12个折点的圆
        for (var i = 0; i < Data.length; i++) {
            // 获取折点的x和y值
            var pointY = origin.y - (origin.y - (axisY.y + moneyY)) * Data[i] / max;
            var pointX = pointsX[i];
            // 绘制圆
            context.fillStyle = "red";
            context.beginPath();
            context.arc(pointX, pointY, 3, 0, Math.PI * 2);
            context.fill();
        }

    }

}
export default lineChart;
