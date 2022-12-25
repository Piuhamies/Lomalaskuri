import React from "react";
import { Suspense } from "react";

export default class QuickFront extends React.Component {
	constructor() {
		super();
		let prevScrollY = 0;
	}
	laukaiseAnimaatio() {
		var elems = document.querySelectorAll(".quickBox");
		elems.forEach((elem) => {
			var Top =
				elem.getBoundingClientRect().top -
				window.outerHeight +
				elem.getBoundingClientRect().height / 2;
			var scrollY = window.scrollY;
			if (scrollY > Top) {
				elem.classList.add("anim");
				elem.classList.add("active");
			} else if (this.prevScrollY > document.documentElement.scrollTop) {
				//katsotaan scrollauksen suunta
				elem.classList.remove("anim");
			}
		});
		this.prevScrollY = document.documentElement.scrollTop;
	}
	componentDidMount() {
		window.addEventListener("scroll", this.laukaiseAnimaatio);
		window.addEventListener("resize", this.laukaiseAnimaatio);
	}

	render() {
		return (
			<div className="quickContainerContainer">
				<div className="quickContainer">{this.props.quickItems} </div>
			</div>
		);
	}
}
