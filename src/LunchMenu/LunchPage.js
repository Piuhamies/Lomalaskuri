import React, { useState, useEffect } from "react";
export default function LunchPage({ url }) {
	const [fetchReady, setFetchReady] = useState(false);
	const [quickLunch, setQuickLunch] = useState("Tänään ei ole kouluruokailua");
	const [lunchMenu, setLunchMenu] = useState("Virhe ruokalistojen haussa.");
	useEffect(() => {
		(async () => {
			const response = await fetch(url);
			const data = await response.json();
			//Javascript considers sunday as the first day of the week, we need to do a quick math operation to get it to match our backend.
			const curDay = (new Date().getDay() + 6) % 7;
			if (curDay < 5) {
				const food = data[curDay].food;
				const veganFood = data[curDay].veganFood;
				setQuickLunch(
					<>
						<span className="highlight">Lounas:</span> {food}
						<br />
						<span className="highlight">Kasvislounas:</span> {veganFood}
					</>
				);
			}
			setLunchMenu(
				data.map((lunchObj) => (
					<div className="food" key={lunchObj.day}>
						<h1>{lunchObj.day}</h1>
						<p>
							<span className="highlight">Lounas: </span>
							{lunchObj.food}
						</p>
						<p>
							<span className="highlight">Kasvislounas: </span>
							{lunchObj.veganFood}
						</p>
					</div>
				))
			);
			setFetchReady(true);
		})();
	}, [url]);
	return (
		<main>
			{fetchReady ? (
				<>
					<p id="firstFood" className="quickRuokalista contentBox">
						{quickLunch}
					</p>
					<div id="foodListPos">
						<div className="contentBox" id="foodList">
							{lunchMenu}
						</div>
					</div>
				</>
			) : (
				<div id="Loading" className="loader">
					<div className="loader-inner square-spin">
						<div></div>
					</div>
				</div>
			)}
		</main>
	);
}
