import React, { useEffect, useState } from "react";
import oldLoma from "../../Kuvat/2019 laskuri.webp";
import lomaLight from "../../Kuvat/2020 laskuri light.webp";
import lomaDark from "../../Kuvat/2020 laskuri dark.webp";

export default function Side2(props) {
    const [oldImg, setOldImg] = useState(lomaLight);
    useEffect(() => {
		//Handles changing a picture of Lomalaskuri to the one corresponding to the current theme.
		let changeImg = (event) => {
			setOldImg(event.detail.getTheme() ? lomaDark : lomaLight);
		};
		document.addEventListener("themeChange", changeImg);
		props.toggleTheme(props.themes.login, true); //Updates the theme to get the 'themeChange' event fired
		return () => {
			//Similar to componentWillUnmount()
			document.removeEventListener("themeChange", changeImg);
		};
	}, [props]);
	return (
		<div className="infoGrid">
			<h1>
				Mikä on <br />
				<span className="highlight">Lomalaskuri?</span>
			</h1>
			<div className="infoText half">
				<p>
					{" "}
					Lomalaskuri on monipuolinen työkalu jokaiselle Espoolaiselle
					oppilaalle ja opiskelijalle. Sivu luotiin alunperin vuonna 2019 ja
					siitä lähtien sitä on paranneltu tasaiseen tahtiin.{" "}
				</p>
				<p>
					Luonut / Kehittäjä: <span className="highlight">Severi Lybeck</span>
				</p>
				<p>
					Mukana ylläpidossa:<span className="highlight"> Avery</span>
				</p>
			</div>
			<figure className="infoImg">
				<img src={oldLoma} />
				<figcaption>Lomalaskuri vuonna 2019</figcaption>
			</figure>
			<figure className="infoImg">
				<img src={oldImg} />
				<figcaption>Lomalaskuri vuonna 2020</figcaption>
			</figure>
		</div>
	);
}
