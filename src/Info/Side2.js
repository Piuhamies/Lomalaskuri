import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import oldLoma from "../Images/2019 laskuri.webp";
import lomaLight from "../Images/2020 laskuri light.webp";
import lomaDark from "../Images/2020 laskuri dark.webp";

export default function Side2(props) {
	const [oldImg, setOldImg] = useState(lomaLight);
	const theme = useContext(ThemeContext)
	useEffect(() => {
		setOldImg(theme.themeName === "dark" ? lomaDark : lomaLight);
	}, [ThemeContext]);
	return (
		<div className="infoContent infoGrid">
			<h1>
				Mikä on <br />
				<span className="highlight">Lomalaskuri?</span>
			</h1>
			<div className="infoText half">
				<p>
					Lomalaskuri on monipuolinen työkalu jokaiselle espoolaiselle
					oppilaalle ja opiskelijalle. Sivu luotiin alunperin vuonna 2019 ja
					siitä lähtien sitä on paranneltu tasaiseen tahtiin.
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
