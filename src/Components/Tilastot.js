import React from "react";

export default class Tilastot extends React.Component {
	createStats() {
		var negativeStats = () => {
			return this.props.tiedot.negative.map((x, index) => (
				<>
					{" "}
					<h2>{x}</h2>
					<p className="result">Ei</p>
				</>
			));
		};
		var positiveStats = () => {
			return this.props.tiedot.positive.map((x, index) => (
				<>
					<h2>{x}</h2>
					<p className="positiveResult">On</p>
				</>
			));
		};
		return (
			<>
				{negativeStats()}
				{positiveStats()}
			</>
		);
	}
	render() {
		return <div id="tilastot">{this.createStats()}</div>;
	}
}
