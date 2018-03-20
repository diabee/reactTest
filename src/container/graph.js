import React,{Component} from 'react' ;
import { Button, Input , Select } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import BarChart from './barChart';
import LineChart from './lineChart';
export class graph extends React.Component {
         constructor(props) {
           super(props);
           props = {xVal : 0 ,yVal : 0 };
           this.state = { xVal: "", yVal: "" };
         }
         handleMessage(e) {
           console.log(e.target.value);
           this.setState({ [e.target.name]: e.target.value });
           // this.setState({ [e.target.name]: e.target.value });
           /* store value here. */
         }
         publish(e) {
           console.log(this.state.xVal , this.state.yVal );
            
         }
         render() {
           return <div>
               <Input placehold='選擇月' name="xVal"  onChange={this.handleMessage.bind(this)} />
               <Input placehold='輸入金額(k TWD)' name="yVal" onChange={this.handleMessage.bind(this)} />
               
               <div>
                 <BarChart xVal={this.state.xVal} yVal={this.state.yVal} />
               </div>
               <div>
                 <LineChart xVal={this.state.xVal} yVal={this.state.yVal} />
               </div>
             </div>;
         }
       }

export default graph;