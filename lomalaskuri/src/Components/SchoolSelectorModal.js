import React from "react";

export class SchoolSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      selectedSchool: "",
      content: (
        <div className="modal-content">
          <h1> Valitse koulusi: </h1>
          {this.props.schools.map((x, index) => (
            <Link
              onChange={() => console.log("change")}
              onClick={(e) => this.close(e.target)}
              key={"kouluValinta" + index}
              className="schoolSelection"
              to={x.href + "/" + x.menuItems[0].nimi}
            >
              {x.schoolName}
            </Link>
          ))}
        </div>
      ),
    };
  }
  close(targetti) {
    this.setState({ content: null });
  }
  render() {
    return this.state.content;
  }
}
