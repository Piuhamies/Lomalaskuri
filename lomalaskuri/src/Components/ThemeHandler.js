import themes from "../themes.json";
import { useCallback, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { ThemeContext } from "../ThemeContext";

export function ThemeHandler(props) {
	const location = useLocation();
	const [activePage, setActivePage] = useState("");
	const [themeName, setThemeName] = useState("light");

	useEffect(() => {
		setActivePage(location.pathname.split("/")[1]);
	}, [location]);
	useEffect(() => {
		updateTheme(); //everytime the page changes, load the theme for the new page.
	}, [activePage]);
	const getProcessedThemes = useMemo(() => {
		/*Processes the theme file from a human readable form to a one that's easier understood by the machine */
		const defaultTheme = themes["Default"];
		const MergeThemes = (theme, defaultTheme) => {
			let mergedTheme = new Map(
				defaultTheme.map((propertyObj) => [propertyObj.property, propertyObj])
			);
			theme.forEach((elem) => {
				if (mergedTheme.has(elem.property)) {
					mergedTheme[elem.property] = elem;
				} else {
					mergedTheme.set(elem.property, elem);
				}
			});
			return mergedTheme;
		};
		const processedThemes = new Map(
			themes["ThemeOverrides"].map((elem) => {
				return [
					elem.page,
					elem.applyScheme === "Merge"
						? MergeThemes(elem.properties, defaultTheme)
						: elem.properties,
				];
			})
		);
		return { processedThemes, defaultTheme };
	}, [themes]);
	const updateTheme = useCallback(
		(newTheme = undefined) => {
			const { processedThemes, defaultTheme } = getProcessedThemes;
			let theme = newTheme || themeName;
			setThemeName(theme);
			console.log(newTheme);
			Cookie.set("themeName", theme, { expires: 200, sameSite: "Strict" });
			const themeToApply = processedThemes.get(activePage) || defaultTheme;
			themeToApply.forEach((elem) => {
				document.documentElement.style.setProperty(elem.property, elem[theme]);
			});
		},
		[themeName, activePage]
	);
	useEffect(() => {
		if (
			(window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches) ||
			Cookie.get("themeName") === "dark"
		) {
			updateTheme("dark");
		} else {
			updateTheme("light");
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
