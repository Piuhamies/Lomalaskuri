import themes from "../themes.json";
export default function getProcessedThemes() {
		/*Processes the theme file from a human readable form to a one that's easier understood by the machine */
		const defaultTheme = themes["Default"];
		const MergeThemes = (theme, defaultTheme) => {
			let mergedTheme = new Map(
				defaultTheme.properties.map((propertyObj) => [
					propertyObj.property,
					propertyObj,
				])
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
			defaultTheme.ThemeOverrides.map((elem) => {
				return [
					elem.page,
					elem.applyScheme === "Merge"
						? MergeThemes(elem.properties, defaultTheme)
						: elem.properties,
				];
			})
		);
		return { processedThemes, defaultTheme };
}