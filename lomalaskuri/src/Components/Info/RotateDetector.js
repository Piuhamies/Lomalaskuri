import React, { useEffect, useState, useCallback } from "react";
import Hammer from "hammerjs";

export function useRotateDetector(ref) {
	const [rotateStatus, setRotateStatus] = useState(0); // 1 for up. -1 for down. 0 for no swipes detected.
	const [lastRotation, setLastRotation] = useState(0);
	const [initialDelta, setinitialDelta] = useState(0); //Stores the largest delta detect for a given series of wheel events caused by using a touchpad
	const rotateDelay = 250;
	const resetStatus = () => {
		setRotateStatus(0);
		setLastRotation(Date.now());
	};
	const setStatus = useCallback(
		(newValue) => {
			//We could combine this with the function above by giving the function parameter a default value, but we do not want to expose setSwipeStatus to outside
			if (
				(Date.now() > lastRotation + rotateDelay && rotateStatus === 0) ||
				(rotateStatus !== 0 && rotateStatus !== newValue) //We dont need delay, when rotating back and forward :D It's much more fun that way.
			) {
				setRotateStatus(newValue);
			}
		},
		[rotateStatus, lastRotation]
	);
	//When using the scrolling wheel, we don't get any more wheel events than one that would trigger the reset of initialDelta. Thus we have to do it ourselves
	const resetInitialDelta = useCallback(
		(deltaY) => {
			if (initialDelta === deltaY) {
				setinitialDelta(0);
			}
		},
		[initialDelta]
	);
	useEffect(() => {
		if (ref != null) {
			const hammertime = new Hammer(ref.current);
			hammertime.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });
			hammertime.on("swipeup", () => setStatus(1));
			hammertime.on("swipedown", () => setStatus(-1));
			let handleWheel = (e) => {
				//When using a touchpad to scroll, this function gets spammed with a massive amount of events with a small deltaY value.
				//We have to filter out these extra-events to avoid the cube from spinning over too many pages.
				//The filtering is extra complicated because the deltaY values dont follow a linear line. More like a parabola.
				//The exact length of this depends on the speed at which the scroll was executed.
				//Thats why the detection of these have to be scaled according to the highest delta recorded during a singular scroll gesture.
				if (
					(initialDelta === 0 ||
						Math.abs(e.deltaY) >= Math.abs(initialDelta)) &&
					(e.deltaY > 10 || e.deltaY < -10)
				) {
					setinitialDelta(e.deltaY);
					let deltaY = e.deltaY;
					setTimeout(() => resetInitialDelta(deltaY), 1000);
				}
				if (
					(e.deltaY > -10 && e.deltaY <= 0) ||
					(e.deltaY < 10 && e.deltaY >= 0)
				) {
					setinitialDelta(0);
				}
				//console.log("deltaY: " + e.deltaY + " initialDelta: " + initialDelta);
				if (e.deltaY > initialDelta - 5 && e.deltaY > 0 && initialDelta !== 0) {
					setStatus(1);
				} else if (
					e.deltaY < initialDelta + 5 &&
					e.deltaY < 0 &&
					initialDelta !== 0
				) {
					setStatus(-1);
				}
			};
			window.addEventListener("wheel", handleWheel);
			return () => {
				window.removeEventListener("wheel", handleWheel);
				hammertime.off("swipeup");
				hammertime.off("swipedown");
			};
		}
	}, [ref, lastRotation, initialDelta, setStatus]);
	return { rotateStatus, resetStatus };
}
