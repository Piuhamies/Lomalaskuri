import { lazy } from "react";
import { TimerPage } from "./Pages/TimerPage";
import getHolidays from "./Components/getHolidays";
import QuickLaskuri from "./Timer/QuickLaskuri.js";
const QuickFront = lazy(() => import("./QuickFront"));
const QuickRuokalista = lazy(() => import("./LunchMenu/QuickRuokalista"));
const QuickForm = lazy(() => import("./Form/QuickForm"));
const QuickGallery = lazy(() => import("./Gallery/QuickGallery"));
const QuickTilastot = lazy(() => import("./Statistics/QuickTilastot"));
const QuickSettings = lazy(() => import("./QuickSettings"));

const RuokalistaSivu = lazy(() => import("./LunchMenu/RuokalistaSivu"));
const Kysely = lazy(() => import("./Form/Kysely"));
const Galleria = lazy(() => import("./Gallery/Gallery"));
const Tilastot = lazy(() => import("./Statistics/Tilastot"));
export function SchoolData() {
	const espooHolidays = getHolidays("Espoo");
	return [
		{
			schoolName: "Nöykkiön koulu",
			href: "NoykkionKoulu",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays} />,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays} /> },
				//{ name: "Chat", 'class': <Chat />},
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				{
					name: "Kysely",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" />
					),
				},
				{ name: "Galleria", class: <Galleria /> },
				// { name: "Pelit", 'class': <Pelit /> },
				{
					name: "Tilastot",
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
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Haukilahden koulu",
			href: "HaukilahdenKoulu",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Kysely",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" />
					),
				},
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				//{ name: "Chat", 'class': <Chat />},
				//{ name: "Pelit", 'class': <Pelit />  },
				{
					name: "Tilastot",
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
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Laurinlahden koulu",
			href: "LaurinlahdenKoulu",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				// name: "Chat", 'class': <Chat />},
				//{ name: "Pelit", 'class': <Pelit />  },
				{
					name: "Tilastot",
					class: (
						<Tilastot
							tiedot={{ positive: [], negative: ["Keksinkö mitään tilastoja"] }}
						/>
					),
				},
				{
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},

		{
			schoolName: "Vanttilan koulu",
			href: "VanttilanKoulu",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				// { name: "Chat", 'class': <Chat />},
				// { name: "Pelit", 'class':  <Pelit /> },
				{
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Otaniemen lukio",
			href: "OtaniemenLukio",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/otaniemiData" />
					),
				},
				{
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Juvanpuiston Koulu",
			href: "JuvanPuisto",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				//{ name: "Chat", 'class': <Chat />},
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				{
					name: "Kysely",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLSfj_JGrXaJ2qEMmXcaLw7ymbE9SO2-gqT9I5vSC-mN4KC5Hdw/viewform?embedded=true" />
					),
				},
				//{ name: "Galleria", 'class': <Galleria /> },
				// { name: "Pelit", 'class': <Pelit /> },
				{
					name: "Tilastot",
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
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Viherlaakson lukio",
			href: "ViherlaaksonLukio",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				//{ name: "Chat", 'class': <Chat />},
				//{ name: "Pelit", 'class': <Pelit /> },
				{
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Tapiolan lukio",
			href: "TapiolanLukio",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				//{ name: "Chat", 'class': <Chat />},
				//{ name: "Pelit", 'class': <Pelit /> },
				{
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
		{
			schoolName: "Jokin muu Espoon yläkoulu",
			href: "None",
			menuItems: [
				{
					name: "Etusivu",
					class: (
						<QuickFront
							quickItems={[
								<QuickLaskuri key="QuickLaskuri" href="Laskuri" holidays={espooHolidays}/>,
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
								<QuickSettings key="QuickSettings" />,
							]}
						/>
					),
				},
				{ name: "Laskuri", class: <TimerPage holidays={espooHolidays}/> },
				{
					name: "Ruokalista",
					class: (
						<RuokalistaSivu url="https://lomalaskuribackend.herokuapp.com/aromidata" />
					),
				},
				//{ name: "Chat", 'class': <Chat />},
				//{ name: "Pelit", 'class': <Pelit /> },
				{
					name: "Palaute",
					class: (
						<Kysely src="https://docs.google.com/forms/d/e/1FAIpQLScDKaDx8NfuXFqhVJYBhdimrqr2AoAbsCFEroy8W0EcFD8ABQ/viewform?embedded=true" />
					),
				},
			],
		},
	];
}
