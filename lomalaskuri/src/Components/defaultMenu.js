import React, { useContext } from "react";
import Cookie from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

export function DefaultMenu(props) {
	let history = useHistory();
	let theme = useContext(ThemeContext);
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
			<button
				className="linkLookALike"
				onClick={() => theme.updateTheme(true)}
				id="dynaaminenNappi">
				Vaihda teemaa
			</button>
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
