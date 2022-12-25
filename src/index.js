import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FrontPage } from "./Pages/FrontPage.js";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import { SchoolData } from './SchoolData';
ReactGA.initialize("UA-137016636-1");
ReactGA.pageview(window.location.pathname + window.location.search);



ReactDOM.render(
	<FrontPage schools={SchoolData} />,
	document.getElementById("site")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
