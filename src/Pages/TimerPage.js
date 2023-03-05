import React from "react";
import { Counter } from "../Components/Counter";
import { usePeridiocallyUpdatingTime } from "../Components/usePeridiocallyUpdatingTime";
export function TimerPage(props) {
    let time = usePeridiocallyUpdatingTime(1);
    const timerComponents = props.holidays.map((holiday) => (
        <Counter time={holiday.start - time} units={[0, 1, 2, 3, 4]} key={holiday.name} timerName={holiday.name}></Counter>
    ));
    return ((
        <div id="timerArea">
            <div>
                <input id="wk" type="checkbox"></input>
                <label for="wk">Viikot</label>
                <input id="d" type="checkbox"></input>
                <label for="d">Päivät</label>
                <input id="h" type="checkbox"></input>
                <label for="h">Tunnit</label>
                <input id="min" type="checkbox"></input>
                <label for="min">Minuutit</label>
                <input name="s" type="checkbox"></input>
                <label for="s">Sekuntit</label>
                <input name="ms" type="checkbox"></input>
                <label for="ms">Millisekuntit</label>
            </div>
            {timerComponents}</div>)
    );
}