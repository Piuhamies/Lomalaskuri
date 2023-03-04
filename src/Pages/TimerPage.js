import React, { useEffect, useState, useRef } from "react";
import { Counter } from "../Components/Counter";

export function TimerPage(props) {
    let [curTime, setCurtime] = useState(0);
    let requestRef = useRef();

    const animate = () => {
        setCurtime(Date.now());
        requestRef.current = requestAnimationFrame(animate);
    };
    useEffect(() => { //Initialize counter animation 
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
    const timerComponents = props.holidays.map((holiday) => (
        <Counter time={holiday.start - curTime} units={[0, 1, 2, 3, 4]} key={holiday.name} name={holiday.name}></Counter>
    ));

    return (
        <div id="timerArea">{timerComponents}</div>
    );
}