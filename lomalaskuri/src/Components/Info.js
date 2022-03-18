import React, { useState, useEffect } from "react";
import arrow from "../Icons/arrow_forward_ios-24px.svg";
import oldLoma from "../Kuvat/2019 laskuri.webp";
import lomaLight from "../Kuvat/2020 laskuri light.webp";
import lomaDark from "../Kuvat/2020 laskuri dark.webp"

export function Info(props) {
    const [onSide, setOnSide] = useState(1);
    useEffect(() => {
        const faceAmount = 2;
        let rotateCube = (e) => {
            console.log(e.deltaY);
            if (e.deltaY > 0) {
                setOnSide(onSide + 1);
                console.log("alas", onSide);
            }
            else if (e.deltaY < 0) {
                setOnSide(onSide - 1);
                console.log("ylös", onSide);
            }
        };
        window.onwheel = rotateCube;
    });
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
                    <h1>Mikä on lomalaskuri?</h1>
                    <div>
                        <p> Lomalaskuri on alunperin Severi Lybeckin yläkoulussa vuonna 2019 aloittama nettisivuprojekti, jonka tarkoitus oli laskea aikaa kesälomaan.
                        Myöhemmin projekti laajeni huomattavasti sisältämään muun muassa ruokalistat, gallerian ja yhdessä vaiheessa sivulla oli jopa pelejä.
                        Nykyisin projektissa on mukana myös Leevi Saastamoinen, joka toimii projektin maintainerina.
                    </p>
                        <div className="infoImg">
                            <img src={oldLoma} />
                            <p>Lomalaskuri vuonna 2019</p>
                        </div>
                        <div className="infoImg">
                            <img src={lomaLight} />
                            <p>Lomalaskuri vuonna 2020</p>
                        </div>
                    </div>
                </div>
            </div>
            <image className="scollSign" src={arrow}> </image>
        </div>
    );
}
