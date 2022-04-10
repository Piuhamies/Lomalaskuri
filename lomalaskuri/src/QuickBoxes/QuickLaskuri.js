import React from "react";
import { Redirect } from "react-router-dom";

export default class QuickLaskuri extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			active: true,
			otsikko: null,
			weeks: <p id="glimpsewk"></p>,
			days: <p id="glimpsed"></p>,
			hours: <p id="glimpseh"></p>,
			minutes: <p id="glimpsemin"></p>,
			redirect: false,
		};
	}
	componentDidMount() {
		this.setState({ active: true, ready: false });
		var timers = [
			{
				nimi: "Aikaa kesälomaan ",
				start: new Date("Jun 5, 2019 12:00:00"),
				end: new Date("Aug 11, 2019 10:00:00"),
			},
			{
				nimi: "Aikaa Syyslomaan",
				start: new Date("Oct 18, 2019 00:00:00"),
				end: new Date("Oct 22, 2019 00:00:00"),
			},
			{
				nimi: "Aikaa Joululomaan",
				start: new Date("Dec 23, 2019 00:00:00"),
				end: new Date("Jan 9, 2020 00:00:00"),
			},
			{
				nimi: "Aikaa Hiihtolomaan",
				start: new Date("Feb 22, 2019 00:00:00"),
				end: new Date("Feb 26, 2019 00:00:00"),
			},
			{
				nimi: "Aikaa Pääsiäislomaan",
				start: new Date("Apr 1 2019 16:00:00"),
				end: new Date("Apr 6 2019 8:30:00"),
			},
		]; //Kaikki nykyiset lomat
		var timeNames = [
			{ nimi: "weeks", shortened: "wk" },
			{ nimi: "days", shortened: "d" },
			{ nimi: "hours", shortened: "h" },
			{ nimi: "minutes", shortened: "min" },
		];
		var currentYear = new Date().getFullYear(); //säilytetään nykyinen vuosi muuttujassa, koska sitä käytetään monessa paikkaa
		var nyt = Date.now();
		timers.forEach(function (element, index) {
			if (
				element.start.getTime() - nyt < 0 &&
				element.end.getTime() - nyt < 0 &&
				element.start.getFullYear() < currentYear &&
				element.start.getMonth() <= element.end.getMonth()
			) {
				element.start.setFullYear(currentYear);
				element.end.setFullYear(currentYear);
			}
			if (
				element.start.getTime() - nyt < 0 &&
				element.end.getTime() - nyt < 0 &&
				element.start.getFullYear() === currentYear &&
				element.start.getMonth() <= element.end.getMonth()
			) {
				element.start.setFullYear(currentYear + 1);
				element.end.setFullYear(currentYear + 1);
			}
			if (element.start.getMonth() > element.end.getMonth()) {
				element.start.setFullYear(currentYear);
				element.end.setFullYear(currentYear + 1);
			}
		});
		timers.sort(function (a, b) {
			//käytetään sort funktiota joka vertailee arvoja toisiinsa ja järjestelee lomat
			return a.end.getTime() - b.end.getTime(); //lasketaan arvo on pienempi ja pienin arvo järjestyy ylemmäksi. Ei tarvitse suhteuttaa nykyiseen aikaan koska edellisessä promisessa arvojen on varmistettu olevan nykyisen päivämäärän jälkeen.
			//jos sorttaisi nykyajan mukaan pitäisi varmistaa ettei nykyaika muuttuisi sorttauksen aikana, koska muuten sorttaus menee rikki.
		});
		let start = timers[0].start.getTime();
		let end = timers[0].end.getTime();
		let distance = [
			Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
			Math.floor(
				((start - nyt) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
			), //päivät
			Math.floor(((start - nyt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // tunnit
			Math.floor(((start - nyt) % (1000 * 60 * 60)) / (1000 * 60)), //minuutit
			Math.floor(((start - nyt) % (1000 * 60)) / 1000), //sekunnit
			`000${Math.floor((start - nyt) % 1000)}`.substring(
				Math.floor(Math.log10(Math.floor((start - nyt) % 1000))) + 1,
				4 + Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))
			),
		];
		let updateElems = (distance, oldDistance) => {
			var stateToBeSet = { ready: true };
			nyt = Date.now();
			if (timers[0].start.getTime() < nyt) {
				stateToBeSet.otsikko = (
					<h2 className="alaotsikot">Aikaa loman loppuun 😢:</h2>
				);
			} else {
				stateToBeSet.otsikko = (
					<h2 className="alaotsikot">{timers[0].nimi + ":"}</h2>
				);
			}
			timeNames.forEach((data, i) => {
				if (oldDistance) {
					if (oldDistance[i] !== distance[i]) {
						stateToBeSet[timeNames[i].nimi] = (
							<p
								className={`glimpse${timeNames[i].shortened}`}>{`${distance[i]}${timeNames[i].shortened}`}</p>
						);
					}
				} else {
					stateToBeSet[timeNames[i].nimi] = (
						<p
							className={`glimpse${timeNames[i].shortened}`}>{`${distance[i]}${timeNames[i].shortened}`}</p>
					);
				}
			});
			this.setState(stateToBeSet);
		};
		MainLoop = MainLoop.bind(this);
		MainLoop();
		updateElems(distance);
		function MainLoop() {
			let oldDistance = distance;
			nyt = Date.now();
			if (timers[0].start.getTime() < nyt) {
				start = timers[0].end.getTime();
			} else {
				start = timers[0].start.getTime();
			}
			distance = [
				Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
				Math.floor(
					((start - nyt) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
				), //päivät
				Math.floor(((start - nyt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // tunnit
				Math.floor(((start - nyt) % (1000 * 60 * 60)) / (1000 * 60)), //minuutit
				Math.floor(((start - nyt) % (1000 * 60)) / 1000), //sekunnit
				`000${Math.floor((start - nyt) % 1000)}`.substring(
					Math.floor(Math.log10(Math.floor((start - nyt) % 1000))) + 1,
					4 + Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))
				),
			];
			updateElems(distance, oldDistance);
			if (this.state.active) {
				setTimeout(MainLoop, 30000);
			}
		}
	}
	componentWillUnmount() {
		this.setState({ active: false });
	}
	render() {
		redirect = redirect.bind(this);
		function redirect() {
			this.setState({ redirect: true });
		}
		return this.state.redirect ? (
			<Redirect push to={`${this.props.href}`} />
		) : (
			<div className="quickBox anim active">
				<div className="quickBoxLeft">
					<h1 className="quickTitle">Laskuri:</h1>
					<div className="quickContent">
						{this.state.ready ? (
							<>
								{this.state.otsikko}
								<div className="ajat quickText">
									{this.state.weeks}
									{this.state.days}
									{this.state.hours}
									{this.state.minutes}
								</div>
							</>
						) : (
							<div id="Loading" className="loader quickLoader">
								<div className="loader-inner square-spin">
									<div></div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div onClick={redirect} className="quickBoxRight">
					<div className="quickWhite arrow">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							viewBox="0 0 24 24">
							<path
								strokeWidth="1px"
								stroke="white"
								d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
							/>
							<path fill="none" d="M0 0h24v24H0z" />
						</svg>
					</div>
				</div>
			</div>
		);
	}
}
