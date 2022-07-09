import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function DefaultMenu(props) {
	let history = useHistory();
	let curSchool = props.school;
	let menuItems = curSchool.menuItems.map((x) => (
		<Link key={`menuItem${x.nimi}`} to={"/" + curSchool.href + "/" + x.nimi}>
			{x.nimi}
		</Link>
	));
	const changeSchool = () => {
		history.push("/");
	};
	return (
		<div id="places">
			{menuItems}
			<ThemeToggle>
				<button className="linkLookALike" id="dynaaminenNappi">
					Vaihda teemaa
				</button>
			</ThemeToggle>
			<button className="linkLookALike" onClick={changeSchool}>
				{" "}
				Vaihda koulua
			</button>
			<Link to="/Info" className="linkLookALike">
				Tietoa Lomalaskurista
			</Link>
		</div>
	);
}
