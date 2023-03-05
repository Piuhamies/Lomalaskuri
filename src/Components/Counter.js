import React from "react";

export function Counter({ time, units, timerName }) {
	//this React component sorts time to smaller Time Units and returns an counter component
	const filteredUnits = units.filter((x) => x !== null);
	const timeObjects = filteredUnits.map((x, index) => {
		return {
			value:
				Math.floor(index !== 0
					? ((time) % (filteredUnits[index - 1].divider)) /
					x.divider
					: time / x.divider),
			name: x.name,
			short: x.short,
		};
	});
	const timeComps = timeObjects.map((x) => (
		<p key={x.name} className={x.name}>{Math.floor(x.value)}{x.short}</p>
	));
	return (
		<div className="timerBox">
			<h2 className="timerTitle">{timerName}</h2>
			<div className="timerTimes">
				{timeComps}
			</div>
		</div>
	);
}
