import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FrontPage } from './FrontPage.js';
import { Placeholder } from './Pages.js';
import { RuokalistaSivu } from './RuokalistaSivu.js';
import { Kysely } from './Kysely.js';
import { Galleria } from './Galleria.js';
import { Chat } from './Chat.js';
//import { Pelit } from './Pelit.js'; 
import { Tilastot } from './Tilastot.js';
import * as serviceWorker from './serviceWorker';
import { TimerClass } from './timerClass.js';

let allSchools = [
  {
    schoolName: "Nöykkiön koulu",
    href: "NoykkionKoulu",
    menuItems: [
      { nimi: "Laskuri", 'class': <TimerClass /> },
      { nimi: "Kysely", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScbBqHMZxKEnVhL62blzCY2ZEx4MtHyvDR3641dTFqeLw4YtQ/viewform?embedded=true"/> },
      { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
      { nimi: "Galleria", 'class': <Galleria /> },
     // { nimi: "Pelit", 'class': <Pelit /> },
      { nimi: "Tilastot", 'class': <Tilastot tiedot={{positive:["Onko auditorio valmistunut", "Onko kahvikone saapunut", "Onko koulussa hometta"], negative:["Onko nöykkiön koulu korjattu"]}} /> },
      { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/> }
     // { nimi: "Chat", 'class': <Chat />}
    ],
    theme: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
    { nimi: "--places-color", light: "white", dark: "#272727" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
    { nimi: "--background-image", light: "var(--noka-light-bg-img)", dark: "var(--noka-dark-bg-img)" }]
  },
  {
    schoolName: "Haukilahden koulu",
    href: "HaukilahdenKoulu",
    menuItems: [{ nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Kysely", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScbBqHMZxKEnVhL62blzCY2ZEx4MtHyvDR3641dTFqeLw4YtQ/viewform?embedded=true" /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
    //{ nimi: "Pelit", 'class': <Pelit />  },
    { nimi: "Tilastot", 'class': <Tilastot tiedot={{positive:[ "Onko koulussa hometta?"], negative:["Onko Haukilahden koulu korjattu", "Onko limukone korjattu?", "Onko kolmannen kerroksen sohva vaihdettu"] }} /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" /> }], 
    theme: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
    { nimi: "--places-color", light: "white", dark: "#272727" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
    { nimi: "--background-image", light: "var(--hauki-light-bg-img)", dark: "var(--hauki-dark-bg-img)" }]
  },
  {
    schoolName: "Laurinlahden koulu",
    href: "LaurinlahdenKoulu",
    menuItems: [{ nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
    //{ nimi: "Pelit", 'class': <Pelit />  },
    { nimi: "Tilastot", 'class': <Tilastot tiedot={{positive:[], negative:["Keksinkö mitään tilastoja"] }} /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/> }],
    theme: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
    { nimi: "--places-color", light: "white", dark: "#272727" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
    { nimi: "--background-image", light: "var(--lauri-light-bg-img)", dark: "var(--lauri-dark-bg-img)" }]
  },
  
  {
    schoolName: "Vanttilan koulu",
    href: "VanttilanKoulu",
    menuItems: [{ nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
   // { nimi: "Pelit", 'class':  <Pelit /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/>  }],
    theme: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
    { nimi: "--places-color", light: "white", dark: "#272727" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
    { nimi: "--background-image", light: "var(--vantti-light-bg-img)", dark: "var(--vantti-dark-bg-img)" }]
  },
  {
    schoolName: "Ei mikään yllä mainittu",
    href: "None",
    menuItems: [{ nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
    //{ nimi: "Pelit", 'class': <Pelit /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/>  }],
    theme: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
    { nimi: "--places-color", light: "white", dark: "#272727" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
    { nimi: "--background-image", light: "var(--none-light-bg-img)", dark: "var(--none-dark-bg-img)" }]
  }
];


ReactDOM.render(<FrontPage schools={allSchools} />, document.getElementById("site"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
