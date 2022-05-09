import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function ThemeToggle(props) {
	const themeContext = useContext(ThemeContext);

	function toggleTheme() {
		themeContext.updateTheme(true);
	}

	return React.cloneElement(props.children, { onClick: toggleTheme }); 
}
