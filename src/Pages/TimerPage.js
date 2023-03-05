import React, { useState } from "react";
import { Counter } from "../Components/Counter";
import { usePeridiocallyUpdatingTime } from "../Components/usePeridiocallyUpdatingTime";
export function TimerPage(props) {
    const unitDefinitions = [
        { name: "weeks", short: "wk", divider: 1000 * 60 * 60 * 24 * 7 },
        { name: "days", short: "d", divider: 1000 * 60 * 60 * 24 },
        { name: "hours", short: "h", divider: 1000 * 60 * 60 },
        { name: "minutes", short: "min", divider: 1000 * 60 },
        { name: "seconds", short: "s", divider: 1000 },
        { name: "milliseconds", short: "ms", divider: 1 },
    ];
    let [units, setUnits] = useState(unitDefinitions.slice(0, 5));
    let [updateFrequency, setUpdateFrequency] = useState(1000);
    let [amountOfUnits, setAmountOfUnits] = useState(5);
    let time = usePeridiocallyUpdatingTime(updateFrequency);
    const unitChange = (unitIndex, value) => {
        if (amountOfUnits === 1 && !value.target.checked) {
            console.log(amountOfUnits);
            value.target.checked = true;
            return;
        }
        let newUnits = Array.from(units);
        if (!value.target.checked) {
            newUnits.splice(unitIndex, 1, null);
            setAmountOfUnits(amountOfUnits - 1);
        }
        else {
            newUnits.splice(unitIndex, 1, unitDefinitions[unitIndex]);
            setAmountOfUnits(amountOfUnits + 1);
        }
        setUpdateFrequency(newUnits[5] === null ? 1000 : 1);
        console.log(amountOfUnits);
        setUnits(newUnits);
    }
    const unitCheckboxes = unitDefinitions.map((definition, unitIndex) => (
        (<div className="checkbox" key={definition.name}>
            <input defaultChecked={definition.short !== "ms"} onChange={(val) => unitChange(unitIndex, val)} id={definition.short} type="checkbox" />
            <label htmlFor={definition.short}>{definition.name}</label>
        </div>)
    ));
    const timerComponents = props.holidays.map((holiday) => (
        <Counter time={holiday.start - time} units={units} key={holiday.name} timerName={holiday.name}></Counter>
    ));
    return ((
        <div id="timerArea" className={units[5] !== null ? "millis" : "" }>
            <div id="checkboxes">
                {unitCheckboxes}
            </div>
            {timerComponents}</div>)
    );
}