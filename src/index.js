import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Graph from './container/graph';
import registerServiceWorker from './registerServiceWorker';
const element = <div>
    <App />
    <Graph />
</div> ;
ReactDOM.render(
element, 
document.getElementById('root'));
registerServiceWorker();
