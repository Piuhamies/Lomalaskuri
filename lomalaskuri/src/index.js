import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  { SchoolSelectorModal } from './FrontPage.js';
import  { Content } from './FrontPage.js';
import * as serviceWorker from './serviceWorker';

const allSites = [];

ReactDOM.render(<SchoolSelectorModal />, document.getElementById('SchoolModal'));
ReactDOM.render(<Content />, document.getElementById('content'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
