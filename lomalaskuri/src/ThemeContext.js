import React from "react";
export const ThemeContext = React.createContext({
	themeName: "light",
	updateTheme: () => {},
});