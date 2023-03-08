import React from "react";

export function Counter({ time, units, holidayObject }) {
	//this React component sorts time to smaller Time Units and returns an counter component
	const filteredUnits = units.filter((x) => x !== null);
	console.log(holidayObject);
	const isEndTimer = (time - holidayObject.start) > 0;
	const holidayTime = isEndTimer ? holidayObject.end - time : holidayObject.start - time;
	const timeObjects = filteredUnits.map((x, index) => {
		return {
			value:
				Math.floor(index !== 0
					? ((holidayTime) % (filteredUnits[index - 1].divider)) /
					x.divider
					: holidayTime / x.divider),
			name: x.name,
			short: x.short,
		};
	});
	const timeComps = timeObjects.map((x) => (
		<p key={x.name} className={x.name}>{Math.floor(x.value)}{x.short}</p>
	));
	return (
		<div className="timerBox">
			<h2 className="timerTitle">{isEndTimer ? holidayObject.endName : holidayObject.startName}</h2>
			<div className="timerTimes">
				{timeComps}
			</div>
		</div>
	);
}
