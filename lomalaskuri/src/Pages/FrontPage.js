import React, {
	Suspense,
} from "react";
import "../App.css";
import Cookie from "js-cookie";
import { DefaultMenu } from "../Components/defaultMenu";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
	useParams,
} from "react-router-dom";
import { NewSchoolSelector } from "../Components/NewSchoolSelector";
import { Info } from "../Components/Info/Info";
import { Helmet } from "react-helmet";
import { ThemeHandler } from '../Components/ThemeHandler';

class PageNotFound extends React.Component {
	constructor(props) {
		super(props);
		this.redirecter = this.redirecter.bind(this);
		this.state = { shouldRedirect: false };
	}
	redirecter() {
		this.setState({ shouldRedirect: true });
	}
	render() {
		return this.state.shouldRedirect ? (
			<Redirect to="/" />
		) : (
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					alignItems: " center",
					verticalAlign: "center",
				}}>
				<div style={{ width: "15em" }}>
					<h1 style={{ fontFamily: "Roboto", color: "red" }}>404</h1>
					<p>
						Eli yksinkertaistetusti olet tehnyt jotakin pahasti väärin, tai
						sitten vaan käytit vanhentunutta linkkiä, mutta anyways käytä tätä
						nappia päästäksesi takaisin etusivulle
					</p>
					<button onClick={this.redirecter}>Tämä nappi</button>
				</div>
			</div>
		);
	}
}
export class CookieNotification extends React.Component {
	hide(target) {
		var El = target.parentElement;
		var checkBox = document.getElementById("NotEverAgain");
		El.style.display = "none";
		if (checkBox.checked) {
			Cookie.set("NotAgain", true);
		}
	}
	render() {
		console.log(this.props.visible);
		if (this.props.visible === "false") {
			return (
				<div className="cookie">
					<p> Tämä nettisivu käyttää evästeitä</p>
					<button onClick={(e) => this.hide(e.target)}>Ok</button>
					<input
						type="checkbox"
						title="Huom! Tämän valitsemalla, evästeistä ei ilmoiteta enää uudestaan"
						id="NotEverAgain"
					/>
					Muista valintani
				</div>
			);
		} else {
			return null;
		}
	}
}
export function FrontPage(props) {
	let history = useHistory();
	const toHome = () => {
		history.push("Etusivu");
	};
	const routes = () => {
		let routeArray = [];
		for (let i = 0; i < props.schools.length; i++) {
			routeArray.push(
				props.schools[i].menuItems.map((x) => (
					<Route exact path={`/${props.schools[i].href}/${x.nimi}`}>
						<>
							<Helmet>
								<title>Lomalaskuri | {x.nimi} </title>
							</Helmet>
							<Suspense
								fallback={
									<div id="Loading" className="loader">
										<div className="loader-inner square-spin">
											<div></div>
										</div>
									</div>
								}>
								{x.class}
							</Suspense>
						</>
					</Route>
				))
			);
		}
		return routeArray;
	};
	return (
			<Router>
				<ThemeHandler>
				<Switch>
					<Route exact path="/">
						<Helmet>
							<title>Lomalaskuri | Kouluvalitsin</title>
						</Helmet>
						<NewSchoolSelector schools={props.schools}> </NewSchoolSelector>
					</Route>
					<Route exact path="/info">
						<Info />
					</Route>
					{props.schools.map((x) => (
						<Route key={x.href + "key"} path={`/${x.href}`}>
							<div id="menuContainer">
								<Switch>
									{props.schools.map((x, index) => {
										return (
											<Route
												key={index + "key"}
												exact
												path={`/${x.href}/${x.menuItems[0].nimi}`}>
												{" "}
												<div id="menu">
													<h1 id="logo">Lomalaskuri</h1>
												</div>
											</Route>
										);
									})}
									<Route>
										<div id="menu">
											<div onClick={toHome} className="menuBtn">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24">
													<path d="M0 0h24v24H0z" fill="none" />
													<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
												</svg>
											</div>
											<h1 className="offCenter" id="logo">
												Lomalaskuri
											</h1>
										</div>
									</Route>
								</Switch>

								<div id="places">
									<DefaultMenu schools={props.schools} />
								</div>
							</div>
							<div id="content">
								<Switch>
									<Route exact path="/">
										{props.schools[0].menuItems[0].class}
									</Route>
									{routes()}
									<Route>
										<PageNotFound />
									</Route>
								</Switch>
							</div>
							<CookieNotification visible={Cookie.get("NotAgain")} />
						</Route>
					))}
				</Switch>
				</ThemeHandler>
			</Router>
	);
}
