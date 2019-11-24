import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  { SchoolSelectorModal } from './FrontPage.js';
import  { Content } from './FrontPage.js';
import  { FrontPage } from './FrontPage.js';
import { Placeholder } from './Pages.js';
import * as serviceWorker from './serviceWorker';
import Cookie from 'js-cookie';
import { TimerClass } from './timerClass.js';
import { MenuContent } from './MenuContent.js';

let allSchools = [
    {schoolName:"Nöykkiön koulu", href:"NoykkiönKoulu",  menuItems: [{nimi: "Laskuri", class: <TimerClass />}, {nimi:"Kysely", class: <Placeholder />}, {nimi:"Ruokalista", 'class': <Placeholder />}, { nimi: "Galleria", 'class': <Placeholder />}, {nimi: "Pelit", 'class': <Placeholder />}, {nimi: "Tilastot", 'class': <Placeholder />}, {nimi: "Palaute", 'class': <Placeholder />}]},
    {schoolName:"Haukilahden koulu", href:"HaukilahdenKoulu",  menuItems: [{nimi: "Laskuri", class: <TimerClass />}, {nimi:"Kysely", class: <Placeholder />}, {nimi:"Ruokalista", 'class': <Placeholder />}, { nimi: "Galleria", 'class': <Placeholder />}, {nimi: "Pelit", 'class': <Placeholder />}, {nimi: "Tilastot", 'class': <Placeholder />}, {nimi: "Palaute", 'class': <Placeholder />}]}, 
    {schoolName:"Laurinlahden koulu", href:"LaurinlahdenKoulu",  menuItems: [{nimi: "Laskuri", class: <TimerClass />}, {nimi:"Kysely", class: <Placeholder />}, {nimi:"Ruokalista", 'class': <Placeholder />}, { nimi: "Galleria", 'class': <Placeholder />}, {nimi: "Pelit", 'class': <Placeholder />}, {nimi: "Tilastot", 'class': <Placeholder />}, {nimi: "Palaute", 'class': <Placeholder />}]},
    {schoolName:"Vanttilan koulu", href:"VanttilanKoulu", menuItems: [{nimi: "Laskuri", class: <TimerClass />}, {nimi:"Kysely", class: <Placeholder />}, {nimi:"Ruokalista", 'class': <Placeholder />}, { nimi: "Galleria", 'class': <Placeholder />}, {nimi: "Pelit", 'class': <Placeholder />}, {nimi: "Tilastot", 'class': <Placeholder />}, {nimi: "Palaute", 'class': <Placeholder />}]}, 
    {schoolName:"Ei mikään yllä mainittu", href:"None", menuItems: [{name: "Laskuri", 'class': <TimerClass />}, {name: "Ruokalista", 'class': <Placeholder />}, {name: "Pelit", 'class': <Placeholder />},  {name: "Palaute", 'class': <Placeholder />}]}
  ];
    
const allSites = [];
if(Cookie.get('site') == 'none') {	
}
else if (Cookie.get('site') == 'Lauri') {
}
else if (Cookie.get('site') == 'Hauki') {	
}
else if (Cookie.get('site') == 'Noka') {
}
//ReactDOM.render(<SchoolSelectorModal selected={selectedSchool} schools={allSchools} visible={!selectedSchool && !Cookie.get('site')} />, document.getElementById('SchoolModal'));
var schoolDataElem = document.querySelectorAll(".selectedSchoolData")[0];
selectedSchool = schoolDataElem != null ?  schoolDataElem.hasAttribute("data"): null ? schoolDataElem.getAttribute("data") : selectedSchool;

//ReactDOM.render(<MenuContent selectedSchool={selectedSchoolNumber} schools={allSchools} />, document.getElementById('places'));
//ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<FrontPage schools={allSchools} />, document.getElementById("site"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
