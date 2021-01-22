import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FrontPage } from './FrontPage.js';
import { QuickFront } from './QuickFront.js';
import { QuickLaskuri } from './QuickFront.js';
import { QuickRuokalista } from './QuickFront.js';
import { QuickChat } from './QuickFront.js';
import { QuickForm } from './QuickFront.js';
import { QuickGallery } from './QuickFront.js';
import { QuickTilastot } from './QuickFront.js';
import { QuickSettings } from './QuickFront.js';
import { QuickCorona } from './QuickFront.js';
import { Placeholder } from './Pages.js';
import { RuokalistaSivu } from './RuokalistaSivu.js';
import { Kysely } from './Kysely.js';
import { Galleria } from './Galleria.js';
import { Chat } from './Chat.js';
//import { Pelit } from './Pelit.js'; 
import { Tilastot } from './Tilastot.js';
import * as serviceWorker from './serviceWorker';
import { TimerClass } from './timerClass.js';

var darkmode = false;

let toggleTheme = (theme, dontToggle) =>  {
  darkmode = dontToggle ? darkmode : !darkmode;
  var properties = theme
  properties.forEach((elem, index) => {
   document.documentElement.style.setProperty(elem.nimi, darkmode ? elem.dark : elem.light);
  });
}
let themes = {
  NoykkionKoulu: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
  { nimi: "--places-color", light: "white", dark: "#272727" },
  { nimi: "--border-color", light: "#ddd", dark: "black" },
  { nimi: "--text-color", light: "black", dark: "white" },
  { nimi: "--invert-amount", light: "0%", dark: "100%" },
  { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
  { nimi: "--background-image", light: "var(--noka-light-bg-img)", dark: "var(--noka-dark-bg-img)" },
  { nimi: "--bg-fallback-image", light: "var(--noka-light-bg-img-fallback)", dark: "var( --noka-light-bg-img-fallback)" },
  { nimi: "--bg-fallback", light: "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)", dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)"},
 { nimi: "--quick-color", light: "rgba(255,255,255,0.5)", dark: "rgba(39,39,39,0.7)"},
{ nimi:"--quick-invert-color", light: "rgba(0,0,0,0.5)", dark: "rgba(255,255,255,0.1)" }],
HaukilahdenKoulu: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
{ nimi: "--places-color", light: "white", dark: "#272727" },
{ nimi: "--border-color", light: "#ddd", dark: "black" },
{ nimi: "--text-color", light: "black", dark: "white" },
{ nimi: "--invert-amount", light: "0%", dark: "100%" },
{ nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
{ nimi: "--background-image", light: "var(--hauki-light-bg-img)", dark: "var(--hauki-dark-bg-img)" },
{ nimi: "--bg-fallback-image", light: "var(--noka-light-bg-img-fallback)", dark: "var( --noka-light-bg-img-fallback)" },
{ nimi: "--bg-fallback", light: "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)", dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)"},
{ nimi: "--quick-color", light: "rgba(255,255,255,0.7)", dark: "rgba(39,39,39,0.7)"},
{ nimi:"--quick-invert-color", light: "rgba(0,0,0,0.5)", dark: "rgba(255,255,255,0.1)" }],
LaurinlahdenKoulu:  [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
{ nimi: "--places-color", light: "white", dark: "#272727" },
{ nimi: "--border-color", light: "#ddd", dark: "black" },
{ nimi: "--text-color", light: "black", dark: "white" },
{ nimi: "--invert-amount", light: "0%", dark: "100%" },
{ nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
{ nimi: "--background-image", light: "var(--lauri-light-bg-img)", dark: "var(--lauri-dark-bg-img)" },
{ nimi: "--bg-fallback-image", light: "var(--noka-light-bg-img-fallback)", dark: "var( --noka-light-bg-img-fallback)" },
{ nimi: "--bg-fallback", light: "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)", dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)"},
{ nimi: "--quick-color", light: "rgba(255,255,255,0.7)", dark: "rgba(39,39,39,0.7)"},
{ nimi:"--quick-invert-color", light: "rgba(0,0,0,0.5)", dark: "rgba(255,255,255,0.1)" }],
VanttilanKoulu: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
{ nimi: "--places-color", light: "white", dark: "#272727" },
{ nimi: "--border-color", light: "#ddd", dark: "black" },
{ nimi: "--text-color", light: "black", dark: "white" },
{ nimi: "--invert-amount", light: "0%", dark: "100%" },
{ nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
{ nimi: "--background-image", light: "var(--vantti-light-bg-img)", dark: "var(--vantti-dark-bg-img)" },
{ nimi: "--bg-fallback-image", light: "var(--noka-light-bg-img-fallback)", dark: "var( --noka-light-bg-img-fallback)" },
{ nimi: "--bg-fallback", light: "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)", dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)"},
{ nimi: "--quick-color", light: "rgba(255,255,255,0.7)", dark: "rgba(39,39,39,0.7)"},
{ nimi:"--quick-invert-color", light: "rgba(0,0,0,0.5)", dark: "rgba(255,255,255,0.1)" },],
None: 
[{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
    { nimi: "--places-color", light: "white", dark: "#272727" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
    { nimi: "--background-image", light: "var(--none-light-bg-img)", dark: "var(--none-dark-bg-img)" },
    { nimi: "--bg-fallback-image", light: "var(--noka-light-bg-img-fallback)", dark: "var( --noka-light-bg-img-fallback)" },
    { nimi: "--bg-fallback", light: "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)", dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)"},
    { nimi: "--quick-color", light: "rgba(255,255,255,0.7)", dark: "rgba(39,39,39,0.7)"},
   { nimi:"--quick-invert-color", light: "rgba(0,0,0,0.5)", dark: "rgba(255,255,255,0.1)" }],
login: [{ nimi: "--menu-color", light: "transparent", dark: "#272727" },
{ nimi: "--places-color", light: "white", dark: "#272727" },
{ nimi: "--border-color", light: "#ddd", dark: "black" },
{ nimi: "--text-color", light: "black", dark: "white" },
{ nimi: "--invert-amount", light: "0%", dark: "100%" },
{ nimi: "--mobile-menu-color", light: "white", dark: "#272727" },
{ nimi: "--background-image", light: "var(--noka-light-bg-img)", dark: "var(--noka-dark-bg-img)" },
{ nimi: "--bg-fallback-image", light: "var(--noka-light-bg-img-fallback)", dark: "var( --noka-light-bg-img-fallback)" },
{ nimi: "--bg-fallback", light: "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)", dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)"},
{ nimi: "--quick-color", light: "rgba(255,255,255,0.5)", dark: "rgba(39,39,39,0.7)"},
{ nimi:"--quick-invert-color", light: "rgba(0,0,0,0.5)", dark: "rgba(255,255,255,0.1)" },
{nimi: "--login-bg", light: "rgba(255,255,255,0.3)", dark: "rgba(0,0,0,0.8)"}
]

}

let allSchools = [
  {
    schoolName: "Nöykkiön koulu",
    href: "NoykkionKoulu",
    menuItems: [

      { nimi: "Etusivu", 'class': <QuickFront quickItems={[<QuickLaskuri key="QuickLaskuri" href="Laskuri" />, <QuickRuokalista key="QuickRuoka" href="Ruokalista" />, <QuickForm key="QuickForm" kysymys="Vastaa kyselyyn:" teksti="Mikä on eniten käyttämäsi ominaisuus lomalaskurissa?" href="Kysely" />, <QuickGallery href="Galleria"/>, <QuickForm key="QuickPalaute" kysymys="Anna palautetta: " teksti="Mitä pidit Espoon lomalaskurista?" href="Palaute" />, <QuickTilastot key="quickTilastot" href="Tilastot" tiedot={{positive:["Onko auditorio valmistunut", "Onko kahvikone saapunut", "Onko koulussa hometta"], negative:["Onko nöykkiön koulu korjattu"] }} />, <QuickSettings key="QuickSettings" theme={themes.NoykkionKoulu} themes={toggleTheme}  />]}/>  },
      { nimi: "Laskuri", 'class': <TimerClass /> },
      //{ nimi: "Chat", 'class': <Chat />},
      { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
      { nimi: "Kysely", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true"/> },
      { nimi: "Galleria", 'class': <Galleria /> },
     // { nimi: "Pelit", 'class': <Pelit /> },
      { nimi: "Tilastot", 'class': <Tilastot tiedot={{positive:["Onko auditorio valmistunut", "Onko kahvikone saapunut", "Onko koulussa hometta"], negative:["Onko nöykkiön koulu korjattu"]}} /> },
      { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/> },
    ],
    theme: themes.NoykkionKoulu
  },
  {
    schoolName: "Haukilahden koulu",
    href: "HaukilahdenKoulu",
    menuItems: [
      { nimi: "Etusivu", 'class': <QuickFront quickItems={[<QuickLaskuri key="QuickLaskuri" href="Laskuri" />, <QuickRuokalista key="QuickRuoka" href="Ruokalista" />, <QuickForm key="QuickForm" kysymys="Vastaa kyselyyn:" teksti="Mikä on eniten käyttämäsi ominaisuus lomalaskurissa?" href="Kysely" />, <QuickForm key="QuickPalaute" kysymys="Anna palautetta: " teksti="Mitä pidit Espoon lomalaskurista?" href="Palaute" />, <QuickTilastot key="quickTilastot" href="Tilastot"  tiedot={{positive:[ "Onko koulussa hometta?"], negative:["Onko Haukilahden koulu korjattu", "Onko limukone korjattu?", "Onko kolmannen kerroksen sohva vaihdettu"] }}  />,  <QuickSettings key="QuickSettings" theme={themes.HaukilahdenKoulu} themes={toggleTheme}  />]}/>  },
    { nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Kysely", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
    //{ nimi: "Chat", 'class': <Chat />},
    //{ nimi: "Pelit", 'class': <Pelit />  },
    { nimi: "Tilastot", 'class': <Tilastot tiedot={{positive:[ "Onko koulussa hometta?"], negative:["Onko Haukilahden koulu korjattu", "Onko limukone korjattu?", "Onko kolmannen kerroksen sohva vaihdettu"] }} /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" /> }], 
    theme: themes.HaukilahdenKoulu
  },
  {
    schoolName: "Laurinlahden koulu",
    href: "LaurinlahdenKoulu",
    menuItems: [
    { nimi: "Etusivu", 'class': <QuickFront quickItems={[<QuickLaskuri key="QuickLaskuri" href="Laskuri" />, <QuickRuokalista key="QuickRuoka" href="Ruokalista" />, <QuickForm key="QuickPalaute" kysymys="Anna palautetta: " teksti="Mitä pidit Espoon lomalaskurista?" href="Palaute" />, <QuickSettings key="QuickSettings" theme={themes.LaurinlahdenKoulu} themes={toggleTheme}  />]}/>  },
    { nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
    // nimi: "Chat", 'class': <Chat />},
    //{ nimi: "Pelit", 'class': <Pelit />  },
    { nimi: "Tilastot", 'class': <Tilastot tiedot={{positive:[], negative:["Keksinkö mitään tilastoja"] }} /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/> }],
    theme: themes.LaurinlahdenKoulu
  },
  
  {
    schoolName: "Vanttilan koulu",
    href: "VanttilanKoulu",
    menuItems: [
      { nimi: "Etusivu", 'class': <QuickFront quickItems={[<QuickLaskuri key="QuickLaskuri" href="Laskuri" />, <QuickRuokalista key="QuickRuoka" href="Ruokalista" />,  <QuickForm key="QuickPalaute" kysymys="Anna palautetta: " teksti="Mitä pidit Espoon lomalaskurista?" href="Palaute" />, <QuickSettings key="QuickSettings" theme={themes.VanttilanKoulu} themes={toggleTheme}  />]}/>  },
    { nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
   // { nimi: "Chat", 'class': <Chat />},
   // { nimi: "Pelit", 'class':  <Pelit /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/>  }],
    theme: themes.VanttilanKoulu
  },
  {
    schoolName: "Ei mikään yllä mainittu",
    href: "None",
    menuItems: [
    { nimi: "Etusivu", 'class': <QuickFront quickItems={[<QuickLaskuri key="QuickLaskuri" href="Laskuri" />, <QuickRuokalista key="QuickRuoka" href="Ruokalista" />, <QuickForm key="QuickPalaute" kysymys="Anna palautetta: " teksti="Mitä pidit Espoon lomalaskurista?" href="Palaute" />, <QuickSettings key="QuickSettings" theme={themes.None} themes={toggleTheme}  />]}/>  },
    { nimi: "Laskuri", 'class': <TimerClass /> },
    { nimi: "Ruokalista", 'class': <RuokalistaSivu /> },
    //{ nimi: "Chat", 'class': <Chat />},
    //{ nimi: "Pelit", 'class': <Pelit /> },
    { nimi: "Palaute", 'class': <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true"/>  }],
    theme: themes.None
  }
];


ReactDOM.render(<FrontPage darkFunction={toggleTheme} schools={allSchools} themes={themes}/>, document.getElementById("site"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
