import React, { useState, useEffect } from "react";
import arrow from "../../Icons/arrow_forward_ios-24px.svg";
import { useHistory } from "react-router-dom";

import Side1 from "./Side1";
import Side2 from "./Side2";
import Side3 from "./Side3";

//Info page should be as fancy as possible without sacrificing usability or performance
export function Info(props) {
	const [onSide, setOnSide] = useState(1);
	const [lastScroll, setLastScroll] = useState(0);
	const [showScrollSign, setShowScrollSign] = useState(true);
	const history = useHistory();

	useEffect(() => {
		//Handles rotating the cube
		const faceAmount = 3;
		const scrollDelay = 250;
		let rotateCube = (e) => {
			setShowScrollSign(false); //When the user has understood that you can rotate the cube, hide the hint.
			if (
				e.deltaY > 0 &&
				Date.now() > lastScroll + scrollDelay &&
				onSide + 1 <= faceAmount
			) {
				setLastScroll(Date.now());
				setOnSide(onSide + 1);
			} else if (
				e.deltaY < 0 &&
				Date.now() > lastScroll + scrollDelay &&
				onSide - 1 > 0
			) {
				setLastScroll(Date.now());
				setOnSide(onSide - 1);
			}
		};
		window.addEventListener("wheel", rotateCube);
		return () => {
			window.removeEventListener("wheel", rotateCube);
		};
	}, [lastScroll, onSide]);

	function toggle() {
		props.toggleTheme(props.themes.login);
	}
	function goBack() {
		history.goBack();
	}
	return (
		<div className="infoPage">
			<div className={`cube onSide${onSide}`}>
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
