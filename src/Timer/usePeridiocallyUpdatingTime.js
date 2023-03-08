import { useEffect, useState, useRef } from "react";
export function usePeridiocallyUpdatingTime(frequency) {
    const [curTime, setCurtime] = useState(0);
    const requestRef = useRef();
    const timerRef = useRef();
    const animate = () => {
        setCurtime(Date.now());
        if (frequency < 1000) {
            requestRef.current = requestAnimationFrame(animate);
        }
        else {
            timerRef.current = setTimeout(animate, frequency);
        }
    };
    useEffect(() => { //Initialize counter animation 
        requestRef.current = requestAnimationFrame(animate);
        return () => { cancelAnimationFrame(requestRef.current); if (timerRef.current !== undefined) { clearTimeout(timerRef.current); } };
    }, [frequency]);
    return curTime;
}