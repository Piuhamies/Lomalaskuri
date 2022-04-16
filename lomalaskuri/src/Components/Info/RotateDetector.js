import React, { useEffect, useState } from "react";
import Hammer from "hammerjs";

export function useRotateDetector(ref) {
	const [rotateStatus, setRotateStatus] = useState(0); // 1 for up. -1 for down. 0 for no swipes detected.
	const [lastRotation, setLastRotation] = useState(0);
	const rotateDelay = 250;
	const resetStatus = () => {
		setRotateStatus(0);
	};
	const setStatus = (newValue) => {
		//We could combine this with the function above by giving the function parameter a default value, but we do not want to expose setSwipeStatus to outside
		if (Date.now() > lastRotation + rotateDelay && rotateStatus === 0) {
			setLastRotation(Date.now());
			setRotateStatus(newValue);
		}
	};
	useEffect(() => {
		if (ref != null) {
			const hammertime = new Hammer(ref.current);
			hammertime.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });
			hammertime.on("swipeup", () => setStatus(1));
			hammertime.on("swipedown", () => setStatus(-1));
			let handleWheel = (e) => {
				if (e.deltaY > 0) {
					setStatus(1);
				} else if (e.deltaY < 0) {
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
	}, [ref, lastRotation]);
	return { rotateStatus, resetStatus };
}
