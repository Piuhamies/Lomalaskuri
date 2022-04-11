import React from "react";

export default function Side3() {
	return (
		<>
			<h1>
				Miten <span className="highlight">Lomalaskuri</span> toimii?
			</h1>
			<div className="infoText full">
				<p>
					Lomalaskuri on kokonaisuudessaan yli 5000 rivistä koodia muodostunut
					(backendia ei laskettu mukaan) Reactilla luotu nettisivu, joka
					hyödyntää Node.js pohjaista backendia ruokatietojen hakuun.
				</p>
				<p>
					Sivujen tyyli on pyritty tekemään mahdollisimman reponsiiviseksi. Ota
					siis yhteyttä sähköpostiin:{" "}
					<a href="mailto:severi.lybeck@gmail.com">severi.lybeck@gmail.com</a>{" "}
					jos jokin ei toimi mobiililaitteella kuten pitäisi!
				</p>
				<p>
					Lähdekoodi: <span className="highlight">Tulossa pian </span>
				</p>
			</div>
		</>
	);
}
