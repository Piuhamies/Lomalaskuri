import React, { useState, useEffect, useRef } from "react";
import arrow from "../../Icons/arrow_forward_ios-24px.svg";
import { useHistory } from "react-router-dom";
import { useRotateDetector } from "./RotateDetector";

import Side1 from "./Side1";
import Side2 from "./Side2";
import Side3 from "./Side3";

//Info page should be as fancy as possible without sacrificing usability or performance
export function Info(props) {
	const [visibleSide, setVisibleSide] = useState(1);
	const [showScrollSign, setShowScrollSign] = useState(true);
	const history = useHistory();
	const infoEl = useRef(null);
	const RotateDetector = useRotateDetector(infoEl);
	useEffect(() => {
		//Handles rotating the cube
		const faceAmount = 3;
		let rotateCube = (swipeStatus) => {
			setShowScrollSign(false); //When the user has understood that you can rotate the cube, hide the hint.
			if (swipeStatus === 1 && visibleSide + 1 <= faceAmount) {
				setVisibleSide(visibleSide + 1);
			} else if (swipeStatus === -1 && visibleSide - 1 > 0) {
				setVisibleSide(visibleSide - 1);
			}
		};
		let swipeStatus = RotateDetector.swipeStatus;
		if (swipeStatus != 0) {
			rotateCube(swipeStatus);
			RotateDetector.resetStatus();
		}
	}, [visibleSide, RotateDetector]);

	function toggle() {
		props.toggleTheme(props.themes.login);
	}
	function goBack() {
		history.goBack();
	}
	return (
		<div ref={infoEl} id="infoPage">
			<div className={`cube onSide${visibleSide}`}>
				<section className={`cubeSide cubeSide1`}>
					<Side1 />
				</section>
				<section className={`cubeSide cubeSide2 cubeGrid`}>
					<Side2 toggleTheme={props.toggleTheme} themes={props.themes} />
				</section>
				<section className="cubeSide cubeSide3 cubeGrid">
					<Side3 />
				</section>
			</div>
			{showScrollSign && <img className="scrollSign" src={arrow} />}
			<img
				className="darkIcon"
				alt="vaihda dark themeen"
				onClick={toggle}
				src="icons8-moon-symbol.svg"
			/>
			<button className="backArrow linkLookALike" onClick={goBack}>
				<img alt="close" src={arrow}></img>
			</button>
		</div>
	);
}
