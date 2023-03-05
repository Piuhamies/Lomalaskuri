import React from "react";

export function Counter({ time, units, timerName }) {
	//this React component sorts time to smaller Time Units and returns an counter component
	const unitDefinitions = [
		{ name: "weeks", short: "wk", divider: 1000 * 60 * 60 * 24 * 7 },
		{ name: "days", short: "d", divider: 1000 * 60 * 60 * 24 },
		{ name: "hours", short: "h", divider: 1000 * 60 * 60 },
		{ name: "minutes", short: "min", divider: 1000 * 60 },
		{ name: "seconds", short: "s", divider: 1000 },
		{ name: "milliseconds", short: "ms", divider: 1 },
	];
	const timeObjects = units.map((x, index) => {
		const curUnitDef = unitDefinitions[x];
		return {
			value:
				index !== 0
					? ((time) % (unitDefinitions[units[index - 1]].divider)) /
					  curUnitDef.divider
					: time / curUnitDef.divider,
			name: curUnitDef.name,
			short: curUnitDef.short,
		};
	});
	return (
		<div class="timerBox">
			<h2 className="timerTitle">{timerName}</h2>
			<div className="timerTimes">
				{timeObjects.map((x) => (
					<p key={x.name} className={x.name}>{Math.floor(x.value)}{x.short}</p>
				))}
			</div>
		</div>
	);
}
