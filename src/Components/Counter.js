import React from "react";

export function Counter({ time, units }, props) {
	//this React component formats time and returns it as a jsx div.
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
					? (time % (units[index - 1].divider - curUnitDef.divider)) /
					  curUnitDef.divider
					: time / curUnitDef.divider,
			name: curUnitDef.name,
			short: curUnitDef.short,
		};
	});
	return (
		<div key={props.key}>
			<h2 className="timerTitle">{this.props.children}</h2>
			<div className="timerTimes">
				{timeObjects.map((x) => (
					<p key={x} className={x.name}></p>
				))}
			</div>
		</div>
	);
}
