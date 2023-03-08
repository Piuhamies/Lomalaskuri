import React, { useState } from "react";
import { Counter } from "../Components/Counter";
import { usePeridiocallyUpdatingTime } from "../Components/usePeridiocallyUpdatingTime";
export function TimerPage(props) {
    const unitDefinitions = [
        { name: "Viikot", short: "wk", divider: 1000 * 60 * 60 * 24 * 7 },
        { name: "Päivät", short: "d", divider: 1000 * 60 * 60 * 24 },
        { name: "Tunnit", short: "h", divider: 1000 * 60 * 60 },
        { name: "Minuutit", short: "min", divider: 1000 * 60 },
        { name: "Sekuntit", short: "s", divider: 1000 },
        { name: "Millisekuntit", short: "ms", divider: 1 },
    ];
    const [units, setUnits] = useState(unitDefinitions.slice(0, 5));
    const [updateFrequency, setUpdateFrequency] = useState(1000);
    const [amountOfUnits, setAmountOfUnits] = useState(5);
    const time = usePeridiocallyUpdatingTime(updateFrequency);
    const unitChange = (unitIndex, value) => {
        let newUnits = Array.from(units);
        if (!value.target.checked) {
            if (amountOfUnits === 1) {
                value.target.checked = true;
                return;
            }
            newUnits.splice(unitIndex, 1, null);
            setAmountOfUnits(amountOfUnits - 1);
        }
        else {
            newUnits.splice(unitIndex, 1, unitDefinitions[unitIndex]);
            setAmountOfUnits(amountOfUnits + 1);
        }
        setUpdateFrequency(newUnits[5] === null ? 1000 : 1);
        setUnits(newUnits);
    }
    const unitCheckboxes = unitDefinitions.map((definition, unitIndex) => (
        (<div className="checkbox" key={definition.name}>
            <input defaultChecked={definition.short !== "ms"} onChange={(val) => unitChange(unitIndex, val)} id={definition.short} type="checkbox" />
            <label htmlFor={definition.short}>{definition.name}</label>
        </div>)
    ));
    const timerComponents = props.holidays.map((holiday) => (
        <Counter time={time} units={units} key={holiday.name} holidayObject={holiday}></Counter>
    ));
    return ((
        <div id="timerArea" className={units[5] !== null ? "millis" : ""}>
            <div id="timerSettings">
                <h3>Näytettävät yksiköt:</h3>
                <div id="checkboxes">
                    {unitCheckboxes}
                </div>
                 {/* To be done <button> Palauta </button> */}
            </div>
            {timerComponents}</div>)
    );
}