import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../ThemeContext";

export function NewSchoolSelector(props) {
	let history = useHistory();
	const theme = useContext(ThemeContext);
	const [additionalClass, setAdditionalClass] = useState("");
	function toggle() {
		theme.updateTheme(true);
	}
	async function changePage(url, animate = true) {
		if (animate) {
			setAdditionalClass("closing");
			await new Promise((res) => setTimeout(res, 500)); // We get a much shorter code by using the await syntax. 
		}
		history.push(url);
	}
	return (
		<>
			<Helmet>
				{/*This code is kinda ugly but it yields in a much better lighthouse score*/}
				<link rel="preload" as="image" href="icons8-moon-symbol.svg" />{" "}
			</Helmet>
			<div className={`loginSite ${additionalClass}`}>
				<div className="lomaEsittely">
					<div>
						<div id="terveDiv">
							<h1 id="terveText">Tervetuloa</h1>
						</div>
						<div id="lomaDiv">
							<h1 id="lomaText">Lomalaskuriin!</h1>
						</div>
					</div>
				</div>
				<div className="login">
					<h2> Valitse koulusi: </h2>
					<div id="loginContainer">
						<div className="loginBox">
							<div className="loginOptions">
								{props.schools.map((x, index) => (
									<button
										key={"kouluValinta" + index}
										className="schoolSelection"
										onClick={() => {
											changePage(x.href + "/" + x.menuItems[0].nimi, false);
										}}>
										{x.schoolName}
									</button>
								))}
							</div>
						</div>
						<img
							className="darkIcon selectorDarkIcon"
							alt="vaihda dark themeen"
							onClick={toggle}
							src="icons8-moon-symbol.svg"
						/>
					</div>
					<button
						id="infoLink"
						onClick={() => {
							changePage("/info", true);
						}}>
						Mikä on Lomalaskuri?
					</button>
				</div>
			</div>
		</>
	);
}
