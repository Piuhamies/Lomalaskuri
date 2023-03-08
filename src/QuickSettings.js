import React from "react";
import Cookie from "js-cookie";
import { Redirect, Link } from "react-router-dom";
import { ThemeToggle } from "./Components/ThemeToggle";

export default class QuickSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = { redirect: false };
		this.changeSchool = this.changeSchool.bind(this);
	}
	componentDidMount() {
		let prompt;
		const addBtn = document.getElementById("progressiveBtn");
		addBtn.style.display = "none";
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			prompt = e;
			addBtn.style.display = "block";

			addBtn.addEventListener("click", (e) => {
				addBtn.style.display = "none";
				prompt.prompt();
			});
		});
	}
	changeSchool() {
		this.setState({ redirect: true }, () => {
			this.setState({ redirect: false });
		});
	}
	render() {
		redirect = redirect.bind(this);
		function redirect() {
			this.setState({ redirect: true });
		}
		return this.state.redirect ? (
			<Redirect push to="/" />
		) : (
			<div className="quickBox anim active">
				<div className="quickBoxLeft full">
					<h1 className="quickTitle">Asetukset:</h1>
					<div className="quickContent">
						<div className="quickImage">
							<ThemeToggle>
								<button
									className="linkLookALike SettingBtn"
									id="dynaaminenNappi">
									Vaihda teemaa
								</button>
							</ThemeToggle>
							<button
								className="linkLookALike SettingBtn"
								onClick={this.changeSchool}>
								{" "}
								Vaihda koulua
							</button>
							<Link className="linkLookALike SettingBtn" to={"/info"}>
								{" "}
								{/*Lol pränk tää onki oikeesti linkki, mut silti class on linkLookALike :DD*/}
								Tietoa lomalaskurista
							</Link>
							<button id="progressiveBtn" className="linkLookALike SettingBtn">
								{" "}
								Lisää kotinäytölle{" "}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
