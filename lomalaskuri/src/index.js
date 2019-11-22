import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  { SchoolSelectorModal } from './FrontPage.js';
import  { Content } from './FrontPage.js';
import * as serviceWorker from './serviceWorker';
import Cookie from 'js-cookie';
import { MenuContent } from './MenuContent.js';

let allSchools = [
    {schoolName:"Nöykkiön koulu", href:"", menuItems: ["Laskuri", "Kysely", "Ruokalista", "Galleria", "Pelit", "Tilastot", "Palaute"]},
    {schoolName:"Haukilahden koulu", href:""}, 
    {schoolName:"Laurinlahden koulu", href:""},
    {schoolName:"Vanttilan koulu", href:""}, 
    {schoolName:"Ei mikään yllä mainittu", href:""}
  ];
    

let selectedSchool = "Nöykkiön koulu";
let selectedSchoolNumber = allSchools.findIndex(x => x.schoolName === selectedSchool);
console.log(selectedSchoolNumber);
const allSites = [];
if(Cookie.get('site') == 'none') {	
}
else if (Cookie.get('site') == 'Lauri') {
}
else if (Cookie.get('site') == 'Hauki') {	
}
else if (Cookie.get('site') == 'Noka') {
}
ReactDOM.render(<SchoolSelectorModal selected={selectedSchool} schools={allSchools} visible={!selectedSchool && !Cookie.get('site')} />, document.getElementById('SchoolModal'));


ReactDOM.render(<MenuContent selectedSchool={selectedSchoolNumber} schools={allSchools} />, document.getElementById('places'));
ReactDOM.render(<Content />, document.getElementById('content'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
