import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export class NewSchoolSelector extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.props.toggleTheme(this.props.themes.login);
  }
  componentDidMount() {
    this.props.toggleTheme(this.props.themes.login, true);
  }
  render() {
    return (
      <>
        <Helmet>
          <link rel="preload" as="image" href="icons8-moon-symbol.svg" />{" "}
          {/*joutuu uhrautumaan tekemään purkkavirityksiä jos meinaa saada lighthouse testistä hyvän tuloksen. */}
        </Helmet>
        <div className="loginSite">
          <div className="lomaEsittely">
            <div>
              <div id="terveDiv">
                <h1 id="terveText">Tervetuloa</h1>
              </div>
              <div id="lomaDiv">
                <h1 id="lomaText">Lomalaskuriin!</h1>
              </div>
            </div>
          </div>
          <div className="login">
            <h2> Valitse koulusi: </h2>
            <div id="loginContainer">
                <div className="loginBox">
                  <div className="loginOptions">
                  {this.props.schools.map((x, index) => (
                    <Link
                      onChange={() => console.log("change")}
                      key={"kouluValinta" + index}
                      className="schoolSelection"
                      to={x.href + "/" + x.menuItems[0].nimi}
                    >
                      {x.schoolName}
                    </Link>
                  ))}
                  </div>
                  <Link id="infoLink" to={"/Info"}>Mikä on lomalaskuri?</Link>
                </div>
              <img
                className="darkIcon"
                alt="vaihda dark themeen"
                onClick={this.toggle}
                src="icons8-moon-symbol.svg"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
