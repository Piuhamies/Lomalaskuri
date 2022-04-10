import React, { useEffect, useState } from "react";
import Hammer from "hammerjs";

export function useRotateDetector(ref) {
	const [swipeStatus, setSwipeStatus] = useState(0); // 1 for up. -1 for down. 0 for no swipes detected.
	const [lastRotation, setLastRotation] = useState(0);
	const rotateDelay = 250; //A rotation delay only for scrollwheel based rotation.
	const resetStatus = () => {
		setSwipeStatus(0);
};
	useEffect(() => {
		if (ref != null) {
			const hammertime = new Hammer(ref.current);
			hammertime.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });
			hammertime.on("swipeup", (e) => {
				setSwipeStatus(1);
			});
			hammertime.on("swipedown", (e) => {
				setSwipeStatus(-1);
			});
			let handleWheel = (e) => {
				if (e.deltaY > 0 && Date.now() > lastRotation + rotateDelay) {
					setSwipeStatus(1);
					setLastRotation(Date.now());
				} else if (e.deltaY < 0 && Date.now() > lastRotation + rotateDelay) {
					setSwipeStatus(-1);
					setLastRotation(Date.now());
				}
			};
			window.addEventListener("wheel", handleWheel);
			return () => {
				window.removeEventListener("wheel", handleWheel);
			};
		}
	}, [ref, lastRotation]);
	return { swipeStatus: swipeStatus, resetStatus: resetStatus };
}
