import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

export function NewSchoolSelector(props) {
  let history = useHistory();
  const [additionalClass, setAdditionalClass] = useState(""); 
  function toggle() {
    props.toggleTheme(props.themes.login);
  }
  useEffect(() => {
    props.toggleTheme(props.themes.login, true);
  })
  function changePage(url) {
    setAdditionalClass("closing");
    setTimeout(()=> {
      history.push(url);
    }, 500)
  }
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href="icons8-moon-symbol.svg" />{" "}
        {/*joutuu uhrautumaan tekemään purkkavirityksiä jos meinaa saada lighthouse testistä hyvän tuloksen. */}
      </Helmet>
      <div className={`loginSite ${additionalClass}`}>
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
                {props.schools.map((x, index) => (
                  <button
                    key={"kouluValinta" + index}
                    className="schoolSelection"
                    onClick={() => {changePage(x.href + "/" + x.menuItems[0].nimi)} }
                  >
                    {x.schoolName}
                  </button>
                ))}
              </div>
              <button id="infoLink" onClick={() => {changePage("/info")}}>Mikä on Lomalaskuri?</button>
            </div>
            <img
              className="darkIcon"
              alt="vaihda dark themeen"
              onClick={toggle}
              src="icons8-moon-symbol.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
