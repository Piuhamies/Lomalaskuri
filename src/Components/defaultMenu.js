import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function DefaultMenu(props) {
	const history = useHistory();
	const curSchool = props.school;
	const menuItems = curSchool.menuItems.map((x) => (
		<Link key={`menuItem${x.name}`} to={"/" + curSchool.href + "/" + x.name}>
			{x.name}
		</Link>
	));
	const changeSchool = () => {
		history.push("/");
	};
	return (
		<div id="menu">
			{props.showBackBtn ? (
				<Link className="backLink" to="Etusivu">
						<svg className="menuBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
						</svg>
				</Link>
			) : null}
			<h1 id="logo">Lomalaskuri</h1>

			<div id="places">
				{menuItems}
				<ThemeToggle>
					<button className="linkLookALike" id="dynaaminenNappi">
						Vaihda teemaa
					</button>
				</ThemeToggle>
				<button className="linkLookALike" onClick={changeSchool}>
					Vaihda koulua
				</button>
				<Link to="/Info" className="linkLookALike">
					Tietoa Lomalaskurista
				</Link>
			</div>
		</div>
	);
}
