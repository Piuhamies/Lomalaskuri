import React, { Suspense } from "react";
import Cookie from "js-cookie";
import { DefaultMenu } from "../Components/defaultMenu";
import { ErrorPage } from "../Pages/ErrorPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NewSchoolSelector } from "../Components/NewSchoolSelector";
import { Info } from "../Components/Info/Info";
import { Helmet } from "react-helmet";
import { ThemeHandler } from "../Components/ThemeHandler";

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
					<Route exact path="/Info">
						<Info />
					</Route>
					{props.schools.map((school) =>
						school.menuItems.map((menuItem) => (
							<Route
								key={school.toString()}
								exact
								path={`/${school.href}/${menuItem.name}`}>
								<div id="menuContainer">
									<DefaultMenu showBackBtn={menuItem.name === "Etusivu" ? false : true} school={school} />
								</div>
								<div id="content">
									<Helmet>
										<title>Lomalaskuri | {menuItem.name} </title>
									</Helmet>
									<Suspense
										fallback={
											<div id="Loading" className="loader">
												<div className="loader-inner square-spin">
													<div></div>
												</div>
											</div>
										}>
										{menuItem.class}
									</Suspense>
								</div>
							</Route>
						))
					)}
					<Route>
						<ErrorPage />
					</Route>
				</Switch>
				<CookieNotification visible={Cookie.get("NotAgain")} />
			</ThemeHandler>
		</Router>
	);
}
