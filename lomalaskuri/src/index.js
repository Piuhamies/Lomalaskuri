import React from "react";
import { lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FrontPage } from "./Pages/FrontPage.js";
import * as serviceWorker from "./serviceWorker";
import Cookie from "js-cookie";
import ReactGA from "react-ga";
const QuickFront = lazy(() => import("./QuickFront"));
const QuickLaskuri = lazy(() => import("./QuickBoxes/QuickLaskuri"));
const QuickRuokalista = lazy(() => import("./QuickBoxes/QuickRuokalista"));
const QuickForm = lazy(() => import("./QuickBoxes/QuickForm"));
const QuickGallery = lazy(() => import("./QuickBoxes/QuickGallery"));
const QuickTilastot = lazy(() => import("./QuickBoxes/QuickTilastot"));
const QuickSettings = lazy(() => import("./QuickBoxes/QuickSettings"));
//import { QuickChat } from './QuickFront.js';
const QuickCorona = lazy(() => import("./QuickBoxes/QuickCorona"));
//import { Placeholder } from './Pages.js';

const RuokalistaSivu = lazy(() => import("./Pages/RuokalistaSivu"));
const Kysely = lazy(() => import("./Components/Kysely"));
const Galleria = lazy(() => import("./Pages/Galleria"));
//import { Chat } from './Chat.js';
//import { Pelit } from './Pelit.js';
const Tilastot = lazy(() => import("./Components/Tilastot"));
const TimerClass = lazy(() => import("./Components/timerClass"));

ReactGA.initialize("UA-137016636-1");
ReactGA.pageview(window.location.pathname + window.location.search);

var darkmode = false;

let toggleTheme = (theme, dontToggle) => {
  console.log("theme1");
  darkmode = dontToggle ? darkmode : !darkmode;
  var properties = theme;
  properties.forEach((elem, index) => {
    document.documentElement.style.setProperty(
      elem.nimi,
      darkmode ? elem.dark : elem.light
    );
    if (!dontToggle) {
      Cookie.set("dark", darkmode, { expires: 200, sameSite: "Strict" });
    }
  });
};

let themes = {
  NoykkionKoulu: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f0" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f0" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.5)",
      dark: "rgba(39,39,39,0.7)",
    },
    { nimi: "--seperator-color", light: "#4389f9", dark: "#4389f9" },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  HaukilahdenKoulu: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.7)",
      dark: "rgba(39,39,39,0.7)",
    },
    { nimi: "--seperator-color", light: "#C8C87D", dark: "#C8C87D" },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  LaurinlahdenKoulu: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.7)",
      dark: "rgba(39,39,39,0.7)",
    },
    { nimi: "--seperator-color", light: "#9E6F3F", dark: "#9E6F3F" },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  VanttilanKoulu: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.7)",
      dark: "rgba(39,39,39,0.7)",
    },
    { nimi: "--seperator-color", light: "#6BD046", dark: "#6BD046" },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  OtaniemenLukio: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.5)",
      dark: "rgba(39,39,39,0.7)",
    },
    { nimi: "--seperator-color", light: "#7f281a", dark: "#7f281a" },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  JuvanPuisto: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    { nimi: "--seperator-color", light: "#FFFD76", dark: "#FFFD76" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.5)",
      dark: "rgba(39,39,39,0.7)",
    },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  None: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.7)",
      dark: "rgba(39,39,39,0.7)",
    },
    { nimi: "--seperator-color", light: "#A84AD2", dark: "#A84AD2" },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
  login: [
    { nimi: "--menu-color", light: "transparent", dark: "#0f0f0f" },
    { nimi: "--places-color", light: "white", dark: "#0f0f0f" },
    { nimi: "--border-color", light: "#ddd", dark: "black" },
    { nimi: "--text-color", light: "black", dark: "white" },
    { nimi: "--invert-amount", light: "0%", dark: "100%" },
    { nimi: "--mobile-menu-color", light: "white", dark: "#202020" },
    {
      nimi: "--background-image",
      light: "var(--light-bg-img)",
      dark: "var(--dark-bg-img)",
    },
    {
      nimi: "--bg-fallback-image",
      light: "var(--light-bg-img-fallback)",
      dark: "var( --light-bg-img-fallback)",
    },
    {
      nimi: "--bg-fallback",
      light:
        "linear-gradient(336deg, rgba(255,255,255,1) 0%, rgba(67,137,249,1) 30%, rgba(118,169,251,1) 70%, rgba(255,255,255,1) 100%)",
      dark: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(56,90,154,1) 63%, rgba(18,34,62,1) 100%)",
    },
    {
      nimi: "--quick-color",
      light: "rgba(255,255,255,0.5)",
      dark: "rgba(39,39,39,0.7)",
    },
    {
      nimi: "--quick-invert-color",
      light: "rgba(0,0,0,0.5)",
      dark: "rgba(255,255,255,0.1)",
    },
    { nimi: "--seperator-color", light: "#4389f9", dark: "#4389f9" },
    {
      nimi: "--login-bg",
      light: "var(--login-gradient-white)",
      dark: "var(--login-gradient)",
    },
    { nimi: "--header-color", light: "black", dark: "rgb(223, 239, 255)" },
    { nimi: "--background-color", light: "#a9d3ff", dark: "#0f0f0f" },
    { nimi: "--shadow-color", light: "rgba(0,0,0,0.5)", dark: "rgba(0,0,0,1)" },
  ],
};

let allSchools = [
  {
    schoolName: "Nöykkiön koulu",
    href: "NoykkionKoulu",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickForm"
                kysymys="Vastaa kyselyyn:"
                teksti="Mikä on eniten käyttämäsi ominaisuus lomalaskurissa?"
                href="Kysely"
              />,
              <QuickGallery href="Galleria" />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickTilastot
                key="quickTilastot"
                href="Tilastot"
                tiedot={{
                  positive: [
                    "Onko auditorio valmistunut",
                    "Onko kahvikone saapunut",
                    "Onko koulussa hometta",
                  ],
                  negative: ["Onko nöykkiön koulu korjattu"],
                }}
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.NoykkionKoulu}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      //{ nimi: "Chat", 'class': <Chat />},
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      {
        nimi: "Kysely",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" />
        ),
      },
      { nimi: "Galleria", class: <Galleria /> },
      // { nimi: "Pelit", 'class': <Pelit /> },
      {
        nimi: "Tilastot",
        class: (
          <Tilastot
            tiedot={{
              positive: [
                "Onko auditorio valmistunut",
                "Onko kahvikone saapunut",
                "Onko koulussa hometta",
              ],
              negative: ["Onko nöykkiön koulu korjattu"],
            }}
          />
        ),
      },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.NoykkionKoulu,
  },
  {
    schoolName: "Haukilahden koulu",
    href: "HaukilahdenKoulu",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickForm"
                kysymys="Vastaa kyselyyn:"
                teksti="Mikä on eniten käyttämäsi ominaisuus lomalaskurissa?"
                href="Kysely"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickTilastot
                key="quickTilastot"
                href="Tilastot"
                tiedot={{
                  positive: ["Onko koulussa hometta?"],
                  negative: [
                    "Onko Haukilahden koulu korjattu",
                    "Onko limukone korjattu?",
                    "Onko kolmannen kerroksen sohva vaihdettu",
                  ],
                }}
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.HaukilahdenKoulu}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Kysely",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" />
        ),
      },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      //{ nimi: "Chat", 'class': <Chat />},
      //{ nimi: "Pelit", 'class': <Pelit />  },
      {
        nimi: "Tilastot",
        class: (
          <Tilastot
            tiedot={{
              positive: ["Onko koulussa hometta?"],
              negative: [
                "Onko Haukilahden koulu korjattu",
                "Onko limukone korjattu?",
                "Onko kolmannen kerroksen sohva vaihdettu",
              ],
            }}
          />
        ),
      },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.HaukilahdenKoulu,
  },
  {
    schoolName: "Laurinlahden koulu",
    href: "LaurinlahdenKoulu",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.LaurinlahdenKoulu}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      // nimi: "Chat", 'class': <Chat />},
      //{ nimi: "Pelit", 'class': <Pelit />  },
      {
        nimi: "Tilastot",
        class: (
          <Tilastot
            tiedot={{ positive: [], negative: ["Keksinkö mitään tilastoja"] }}
          />
        ),
      },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.LaurinlahdenKoulu,
  },

  {
    schoolName: "Vanttilan koulu",
    href: "VanttilanKoulu",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.VanttilanKoulu}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      // { nimi: "Chat", 'class': <Chat />},
      // { nimi: "Pelit", 'class':  <Pelit /> },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.VanttilanKoulu,
  },
  {
    schoolName: "Otaniemen lukio",
    href: "OtaniemenLukio",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/otaniemiData"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.OtaniemenLukio}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/otaniemiData" />
        ),
      },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.OtaniemenLukio,
  },
  {
    schoolName: "Juvanpuiston Koulu",
    href: "JuvanPuisto",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickForm"
                kysymys="Vastaa kyselyyn:"
                teksti="Mikä on eniten käyttämäsi ominaisuus lomalaskurissa?"
                href="Kysely"
              />,
              /*<QuickGallery href="Galleria" />,*/ <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickTilastot
                key="quickTilastot"
                href="Tilastot"
                tiedot={{
                  positive: [
                    "Onko koulussa jonneja",
                    "Onko kahvikone saapunut",
                  ],
                  negative: ["Onko Kahvila avattu"],
                }}
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.JuvanPuisto}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      //{ nimi: "Chat", 'class': <Chat />},
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      {
        nimi: "Kysely",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" />
        ),
      },
      //{ nimi: "Galleria", 'class': <Galleria /> },
      // { nimi: "Pelit", 'class': <Pelit /> },
      {
        nimi: "Tilastot",
        class: (
          <Tilastot
            tiedot={{
              positive: ["Onko koulussa jonneja", "Onko kahvikone saapunut"],
              negative: ["Onko Kahvila avattu"],
            }}
          />
        ),
      },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.JuvanPuisto,
  },
  {
    schoolName: "Viherlaakson lukio",
    href: "ViherlaaksonLukio",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.none}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      //{ nimi: "Chat", 'class': <Chat />},
      //{ nimi: "Pelit", 'class': <Pelit /> },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.None,
  },
  {
    schoolName: "Tapiolan lukio",
    href: "TapiolanLukio",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.none}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      //{ nimi: "Chat", 'class': <Chat />},
      //{ nimi: "Pelit", 'class': <Pelit /> },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.None,
  },
  {
    schoolName: "Jokin muu Espoon yläkoulu",
    href: "None",
    menuItems: [
      {
        nimi: "Etusivu",
        class: (
          <QuickFront
            quickItems={[
              <QuickLaskuri key="QuickLaskuri" href="Laskuri" />,
              <QuickRuokalista
                key="QuickRuoka"
                url="https://lomalaskuribackend.herokuapp.com/aromidata"
                href="Ruokalista"
              />,
              <QuickForm
                key="QuickPalaute"
                kysymys="Anna palautetta: "
                teksti="Mitä pidit Espoon lomalaskurista?"
                href="Palaute"
              />,
              <QuickSettings
                key="QuickSettings"
                theme={themes.none}
                themes={toggleTheme}
              />,
            ]}
          />
        ),
      },
      { nimi: "Laskuri", class: <TimerClass /> },
      {
        nimi: "Ruokalista",
        class: (
          <RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
        ),
      },
      //{ nimi: "Chat", 'class': <Chat />},
      //{ nimi: "Pelit", 'class': <Pelit /> },
      {
        nimi: "Palaute",
        class: (
          <Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
        ),
      },
    ],
    theme: themes.None,
  },
];

ReactDOM.render(
  <FrontPage darkFunction={toggleTheme} schools={allSchools} themes={themes} />,
  document.getElementById("site")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
