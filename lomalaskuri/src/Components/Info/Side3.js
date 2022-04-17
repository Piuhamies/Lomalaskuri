import React from "react";

export default function Side3() {
	return (
		<div className="infoContent infoGrid">
			<h1>
				Miten <span className="highlight">Lomalaskuri</span> toimii?
			</h1>
			<div className="infoText full">
				<p>
					Lomalaskuri on yli 30 React komponentista muodostunut React:lla luotu 
					verkkosivu, joka hyödyntää Node.js pohjaista backendia ruokatietojen
					hakuun.
				</p>
				<p>
					Ota yhteyttä{" "}
					<a href="mailto:severi.lybeck@gmail.com">severi.lybeck@gmail.com</a>,{" "}
					jos jokin ei toimi mobiililaitteella kuten pitäisi!
				</p>
				<p>
					Lähdekoodi: <span className="highlight">Tulossa pian </span>
				</p>
			</div>
		</div>
	);
}
