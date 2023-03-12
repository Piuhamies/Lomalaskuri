import { useCallback, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { ThemeContext } from "../ThemeContext";
import getProcessedThemes from "./getThemes";

export function ThemeHandler(props) {
	const location = useLocation();
	const [themeName, setThemeName] = useState("light");
	const themes = useRef();

	useEffect(() => {
		themes.current = getProcessedThemes();
	}, []);

	const updateTheme = useCallback(
		(newTheme = undefined) => {
			console.log(themes.current);
			const { processedThemes, defaultTheme } = themes.current;
			const theme = newTheme || themeName;
			setThemeName(theme);
			Cookie.set("themeName", theme, { expires: 200, sameSite: "Strict" });
			const curPage = location.pathname.split("/")[1];
			const themeToApply = processedThemes.get(curPage) || defaultTheme.properties;
			themeToApply.forEach((elem) => {
				document.documentElement.style.setProperty(elem.property, elem[theme]);
			});
		},
		[themeName, location]
	);
	useEffect(() => {
		updateTheme(); //everytime the page changes, load the theme for the new page.
	}, [location, updateTheme]);

	useEffect(() => {
		if (
			(window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches) ||
			Cookie.get("themeName") === "dark"
		) {
			setThemeName("dark");
		} else {
			setThemeName("light");
		}
	}, []);
	return (
		<>
			<ThemeContext.Provider
				value={{ themeName: themeName, updateTheme: updateTheme }}>
				{props.children}
			</ThemeContext.Provider>
		</>
	);
}
