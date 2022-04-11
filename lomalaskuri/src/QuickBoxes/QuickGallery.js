import React from "react";
import { Redirect } from "react-router-dom";
import nokaKuva2 from "../Kuvat/2.webp";
import nokaKuva3 from "../Kuvat/3.webp";
import nokaKuva4 from "../Kuvat/4.webp";
import nokaKuva5 from "../Kuvat/5.webp";
import nokaKuva6 from "../Kuvat/6.webp";

export default class QuickGallery extends React.Component {
	constructor(props) {
		super(props);
		this.changeImage = this.changeImage.bind(this);
		this.state = { redirect: false, img1: nokaKuva2, active: false };
	}
	changeImage() {
		let images = [nokaKuva2, nokaKuva3, nokaKuva4, nokaKuva5, nokaKuva6];
		let prevImg = 0;
		image1 = image1.bind(this);
		setTimeout(image1, 10000);
		function image1() {
			let random = Math.floor(Math.random() * 4);
			while (random === prevImg) {
				random = Math.floor(Math.random() * 4);
			}
			prevImg = random;
			this.setState({ img1: images[random] });
			if (this.state.active) {
				setTimeout(image1, 10000);
			}
		}
	}
	componentDidMount() {
		this.setState({ active: true });
		this.changeImage();
	}
	componentWillUnmount() {
		this.setState({ active: false });
	}
	render() {
		redirect = redirect.bind(this);
		function redirect() {
			this.setState({ redirect: true });
		}

		return this.state.redirect ? (
			<Redirect push to={this.props.href} />
		) : (
			<div className="quickBox anim active">
				<div className="quickBoxLeft">
					<h1 className="quickTitle">{this.props.href}:</h1>
					<div className="quickContent">
						<div className="quickImage">
							<img src={nokaKuva2} />{" "}
							{/*preloadataan kaikki kuvat nykyisen kuvan alle */}
							<img loading="lazy" src={nokaKuva3} />
							<img loading="lazy" src={nokaKuva4} />
							<img loading="lazy" src={nokaKuva5} />
							<img loading="lazy" src={nokaKuva6} />
							<img loading="lazy" src={this.state.img1}></img>
						</div>
					</div>
				</div>
				<div onClick={redirect} className="quickBoxRight">
					<div className="quickWhite arrow">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="50"
							height="50"
							viewBox="0 0 24 24">
							<path
								strokeWidth="1px"
								stroke="white"
								d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
							/>
							<path fill="none" d="M0 0h24v24H0z" />
						</svg>
					</div>
				</div>
			</div>
		);
	}
}
