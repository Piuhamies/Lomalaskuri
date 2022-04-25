import React, {lazy} from "react";
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
								theme={themes.None}
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
