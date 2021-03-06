import React from 'react';


import nokaKuva1 from './Kuvat/1.jpg';
import nokaKuva2 from './Kuvat/2.jpg';
import nokaKuva3 from './Kuvat/3.jpg';
import nokaKuva4 from './Kuvat/4.jpg';
import nokaKuva5 from './Kuvat/5.jpg';
import nokaKuva6 from './Kuvat/6.jpg';
import nokaKuva1Res from './Kuvat/1_HighRes.jpg';
import nokaKuva2Res from './Kuvat/2_HighRes.JPG';
import nokaKuva3Res from './Kuvat/3_HighRes.JPG';
import nokaKuva4Res from './Kuvat/4_HighRes.JPG';
import nokaKuva5Res from './Kuvat/5_HighRes.jpg';
import nokaKuva6Res from './Kuvat/6_HighRes.jpg';


export default class Galleria extends React.Component {
    image(elem) {
            var modalElem = document.querySelector(".modal.image");
            var modalContentElem = document.querySelector(".modal-content img");
            modalElem.style.display = "flex";
            modalContentElem.setAttribute("src", elem);
    }
    closeModal(event) {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            console.log("close");
            var modalElem = document.querySelector(".modal.image"); 
            modalElem.style.display = "none";
            document.querySelector(".modal-content img").setAttribute("src", "");
        }
    }
    render() {
        console.log(this.props.kuvat);
        return (
        <>
        <div id="myModal" onClick={(e) => this.closeModal(e)}className="modal image">

            <div className="modal-content image">
              <span onClick={(e) => this.closeModal(e)} className="close">&times;</span>
              <img alt="Suurennos" id="image" src=""/>
            </div>
          
        </div>
        <div className="grid-container">
            <div className="item1"><img alt="Kaunis kuva" onClick={(e) => this.image(nokaKuva1Res)} className="pictures" id="picture1" src={nokaKuva1} /></div>
            <div className="item2"><img alt="Kaunis kuva"  onClick={(e) => this.image(nokaKuva2Res)} className="pictures" id="picture2" src= {nokaKuva2} /></div>
            <div className="item3"><img alt="Kaunis kuva" onClick={(e) => this.image(nokaKuva3Res)} className="pictures" id="picture3" src={nokaKuva3} /></div>
            <div className="bottom"><img alt="Kaunis kuva" onClick={(e) => this.image(nokaKuva4Res)} className="pictures" id="picture4" src={nokaKuva4} /></div>
            <div className="bottom"><img alt="Kaunis kuva" onClick={(e) => this.image(nokaKuva5Res)} className="pictures" id="picture5" src={nokaKuva5} /></div>
            <div className="bottom1"><img alt="Kaunis kuva" onClick={(e) => this.image(nokaKuva6Res)} className="pictures" id="picture6" src={nokaKuva6} /></div>
        </div>
        </>
        )
    }
}