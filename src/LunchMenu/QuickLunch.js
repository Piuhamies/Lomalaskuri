import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function QuickLunch({ url, href }) {
	const [fetchReady, setFetchReady] = useState(false);
	const [foodText, setFoodText] = useState("Tänään ei ole kouluruokailua");
	useEffect(() => {
		(async () => {
			const response = await fetch(url);
			const data = await response.json();
			//Javascript considers sunday as the first day of the week, we need to do a quick math operation to get it to match our backend.
			const curDay = ((new Date()).getDay()+6)%7; 
			if (curDay < 5) {
				const food = data[curDay].food;
				const veganFood = data[curDay].veganFood;
				setFoodText(
					<>
						<span className="highlight">Lounas:</span> {food}
						<br />
						<span className="highlight">Kasvislounas:</span> {veganFood}
					</>
				);
			}
			setFetchReady(true);
		})();
	}, [url]);

	return (
		<div className="quickBox anim active">
			<div className="quickBoxLeft">
				<h1 className="quickTitle">Päivän ruokalista:</h1>
				{fetchReady === true ? (
					<>
						<div id="firstFood" className="quickContent">
							<div className="quickText quickRuokalista">
								<p>{foodText}</p>
							</div>
						</div>
					</>
				) : (
					<div id="Loading" className="loader quickLoader">
						<div className="loader-inner square-spin">
							<div></div>
						</div>
					</div>
				)}
			</div>
			<Link to={href} className="quickBoxRight">
				<div className="quickWhite arrow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="50"
						viewBox="0 0 24 24">
						<path
							strokeWidth="1px"
							stroke="white"
							d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
						/>
						<path fill="none" d="M0 0h24v24H0z" />
					</svg>
				</div>
			</Link>
		</div>
	);
}
