import React, { useState, useEffect, useRef, useCallback } from "react";
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
	const { rotateStatus, resetStatus } = useRotateDetector(infoEl);

	const faceAmount = 3; //The amount of faces the infocube has.
	const rotateCube = (newSide) => {
		if (newSide > 0 && newSide <= faceAmount) {
			setShowScrollSign(false); //When the user has understood that you can rotate the cube, hide the hint.
			setVisibleSide(newSide);
		}
	};
	useEffect(() => {
		//Handles rotating the cube
		if (rotateStatus != 0) {
			rotateCube(rotateStatus + visibleSide);
			resetStatus();
		}
	}, [rotateStatus, visibleSide]);

	const indicatorBtns = [];
	for (let i = 1; i <= faceAmount; i++) {
		indicatorBtns.push(
			<div onClick={() => rotateCube(i)} key={"indicatorBtn" + i}></div>
		);
	}
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
			<div className={`pageIndicator onSide${visibleSide}`}>
				{indicatorBtns}
			</div>
			{showScrollSign && (
				<img className="scrollSign" onClick={() => rotateCube(2)} src={arrow} />
			)}
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
