import React from "react";

export default class Kysely extends React.Component {
	render() {
		return (
			<div className="kysely">
				<iframe
					title="kysely"
					id="kysely"
					src={this.props.src}
					width="640"
					height="589"
					frameBorder="0"
					marginHeight="0"
					marginWidth="0">
					Ladataan...
				</iframe>
			</div>
		);
	}
}
