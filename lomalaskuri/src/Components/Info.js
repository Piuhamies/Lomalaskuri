import React, { useState, useEffect} from "react";
import arrow from "../Icons/arrow_forward_ios-24px.svg";
import oldLoma from "../Kuvat/2019 laskuri.webp";
import lomaLight from "../Kuvat/2020 laskuri light.webp";
import lomaDark from "../Kuvat/2020 laskuri dark.webp"

export function Info(props) {
    const [onSide, setOnSide] = useState(1);
    const [lastScroll, setLastScroll] = useState(0)
    const [oldImg, setOldImg] = useState(lomaLight);
    const [showScrollSign, setShowScrollSign] = useState(true);
    useEffect(() => {
        const faceAmount = 2;
        const scrollDelay = 250;
        let rotateCube = (e) => {
            setShowScrollSign(false);
            if (e.deltaY > 0 && Date.now() > lastScroll + scrollDelay && onSide + 1 <= faceAmount) {
                setLastScroll(Date.now())
                setOnSide(onSide + 1);
            }
            else if (e.deltaY < 0 && Date.now() > lastScroll + scrollDelay && onSide - 1 > 0) {
                setLastScroll(Date.now())
                setOnSide(onSide - 1);
            }
        };
        window.onwheel = rotateCube;
        document.addEventListener('themeChange', (event) => {
            setOldImg(event.detail.getTheme() ? lomaLight : lomaDark);
        });
    });
    function toggle() {
        props.toggleTheme(props.themes.login);
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
                    <h1>Mikä on <br /><span className="highlight">Lomalaskuri?</span></h1>
                    <div>
                        <div className="infoText">
                            <p> Lomalaskuri on monipuolinen työkalu jokaiselle Espoolaiselle oppilaalle ja opiskelijalle. 
                                Sivu luotiin alunperin vuonna 2019 ja siitä lähtien sitä on paranneltu tasaiseen tahtiin. </p>
                            <p>Luonut / Kehittäjä: Severi Lybeck</p>
                            <p>Ylläpitäjä: Avery</p>
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
            </div>
            {showScrollSign ? <img className="scrollSign" src={arrow} /> : null }
            <img
              className="darkIcon"
              alt="vaihda dark themeen"
              onClick={toggle}
              src="icons8-moon-symbol.svg"
            />
        </div>
    );
}
