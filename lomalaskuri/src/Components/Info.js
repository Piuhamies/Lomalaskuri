import React, { useState, useEffect } from "react";

export function Info(props) {
    const [onSide, setOnSide] = useState("onSide1");
    useEffect(() => {
        let visibleFace = 0
        const faceAmount = 2;
        let rotateCube = (e) => {
            console.log(e.deltaY);
            if (e.deltaY > 0  && visibleFace + 1 <= faceAmount) {
                visibleFace += 1;
                console.log(visibleFace)
                setOnSide(`onSide${visibleFace}`)
            }
            if (e.deltaY < 0 && visibleFace - 1 >= 0) {
                visibleFace += -1;
                console.log(visibleFace)
                setOnSide(`onSide${visibleFace}`)
            }
        };
        window.onwheel = rotateCube;
    });
    return (
        <div className="infoPage">
            <div className={`cube ${onSide}`}>
                <div className={`cubeSide cubeSide1`}>
                    <h1>L</h1>
                    <h2>Lomalaskuri</h2>
                    <p>2022</p>
                </div>
                <div className={`cubeSide cubeSide2`}>
                    <h1>Lomalaskuri</h1>
                    <p> Luotu</p>
                </div>
            </div>
        </div>
    );
}
