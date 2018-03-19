import React,{Component} from 'react' ;
import { Button, Input , Select } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import BarChart from './barChart';

export class graph extends React.Component {
         constructor(props) {
           super(props);
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
               <Input name='xVal' onChange={this.handleMessage.bind(this)} />
               <Input name='yVal' onChange={this.handleMessage.bind(this)} />
               <Button onClick={this.publish.bind(this)}>send</Button>
               <div>
                   <BarChart xVal={this.state.xVal} yVal={this.state.yVal}/>
               </div>
             </div>;
         }
       }

export default graph;