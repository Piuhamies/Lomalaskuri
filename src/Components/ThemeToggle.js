import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function ThemeToggle(props) {
	const themeContext = useContext(ThemeContext);

	function toggleTheme() {
		let themeName = themeContext.themeName;
		let newTheme;
		switch (themeName) {
			case "light":
				newTheme = "dark";
				break;
			case "dark":
				newTheme = "light";
				break;
		}
		themeContext.updateTheme(newTheme);
	}

	return React.cloneElement(props.children, { onClick: toggleTheme });
}
