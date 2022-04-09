import React, { useState, useEffect } from "react";
import arrow from "../Icons/arrow_forward_ios-24px.svg";
import oldLoma from "../Kuvat/2019 laskuri.webp";
import lomaLight from "../Kuvat/2020 laskuri light.webp";
import lomaDark from "../Kuvat/2020 laskuri dark.webp";
import { useHistory } from "react-router-dom";

//Info page should be as fancy as possible without sacrificing usability and performance
export function Info(props) {
  const [onSide, setOnSide] = useState(1);
  const [lastScroll, setLastScroll] = useState(0);
  const [oldImg, setOldImg] = useState(lomaLight);
  const [showScrollSign, setShowScrollSign] = useState(true);
  const history = useHistory();

  useEffect(() => {
    //Handles rotating the cube
    const faceAmount = 3;
    const scrollDelay = 250;
    let rotateCube = (e) => {
      setShowScrollSign(false); //When the user has understood that you can rotate the cube, hide the hint.
      if (
        e.deltaY > 0 &&
        Date.now() > lastScroll + scrollDelay &&
        onSide + 1 <= faceAmount
      ) {
        setLastScroll(Date.now());
        setOnSide(onSide + 1);
      } else if (
        e.deltaY < 0 &&
        Date.now() > lastScroll + scrollDelay &&
        onSide - 1 > 0
      ) {
        setLastScroll(Date.now());
        setOnSide(onSide - 1);
      }
    };
    window.addEventListener("wheel", rotateCube);
    return () => {
      window.removeEventListener("wheel", rotateCube);
    };
  }, [lastScroll, onSide]);

  useEffect(() => {
    //Handles changing a picture of Lomalaskuri to the one corresponding to the current theme.
    let setOldImg = (event) => {
      setOldImg(event.detail.getTheme() ? lomaDark : lomaLight);
    };
    let themeListener = document.addEventListener("themeChange", setOldImg);
    props.toggleTheme(props.themes.login, true); //Updates the theme to get the 'themeChange' event fired
    return () => {
      //Similar to componentWillUnmount()
      document.removeEventListener("themeChange", setOldImg);
    };
  }, [props]);
  function toggle() {
    props.toggleTheme(props.themes.login);
  }
  function goBack() {
    history.goBack();
  }
  return (
    <div className="infoPage">
      <div className={`cube onSide${onSide}`}>
        <div className={`cubeSide cubeSide1`}>
          <div>
            <h1>L</h1>
            <h2>Lomalaskuri</h2>
            <p>2022</p>
          </div>
        </div>
        <div className={`cubeSide cubeSide2`}>
          <h1>
            Mikä on <br />
            <span className="highlight">Lomalaskuri?</span>
          </h1>
          <div>
            <div className="infoText">
              <p>
                {" "}
                Lomalaskuri on monipuolinen työkalu jokaiselle Espoolaiselle
                oppilaalle ja opiskelijalle. Sivu luotiin alunperin vuonna 2019
                ja siitä lähtien sitä on paranneltu tasaiseen tahtiin.{" "}
              </p>
              <p>
                Luonut / Kehittäjä:{" "}
                <span className="highlight">Severi Lybeck</span>
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
        </div>
        <div className="cubeSide cubeSide3">
          <h1>
            Miten <span className="highlight">Lomalaskuri</span> toimii?
          </h1>
        </div>
      </div>
      {showScrollSign ? <img className="scrollSign" src={arrow} /> : null}
      <img
        className="darkIcon"
        alt="vaihda dark themeen"
        onClick={toggle}
        src="icons8-moon-symbol.svg"
      />
      <button className="backArrow linkLookALike" onClick={goBack}>
        <img alt="close" src={arrow}></img>
      </button>
    </div>
  );
}
