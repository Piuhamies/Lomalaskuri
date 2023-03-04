import React, { useEffect, useState} from "react";
import holidays from "../holidays.json";
import { Counter } from "../Components/Counter";

export function TimerPage() {
    let [curTime, setCurtime] = useState(0);
    useEffect(()=> {
        requestAnimationFrame(()=> {
            setCurtime(Date.now());
        });
    }, [curTime]);
    let holidayTimes = JSON.parse(holidays);
    let timerElems = holidayTimes.map((x)=> (
        <Counter time={x.start - curTime} units={[0,1,2,3,4]}></Counter>
    ));
    return (
        <div id="timerArea">{timerElems}</div>
    )
}