import React, {lazy, Suspense} from 'react';


import nokaKuva1 from './Kuvat/1.jpg';
import nokaKuva2 from './Kuvat/2.JPG';
import nokaKuva3 from './Kuvat/3.JPG';
import nokaKuva4 from './Kuvat/4.JPG';
import nokaKuva5 from './Kuvat/5.jpg';
import nokaKuva6 from './Kuvat/6.jpg';

export class Galleria extends React.Component {
    image(elem) {
            var modalElem = document.querySelector(".modal.image");
            var modalContentElem = document.querySelector(".modal-content img");
            modalElem.style.display = "flex";
            modalContentElem.setAttribute("src", elem.getAttribute('src'));
    }
    closeModal(event) {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            console.log("close");
            var modalElem = document.querySelector(".modal.image"); 
            modalElem.style.display = "none";
        }
    }
    render() {
        console.log(this.props.kuvat);
        return (
        <>
        <div id="myModal" onClick={(e) => this.closeModal(e)}className="modal image">

            <div className="modal-content image">
              <span onClick={(e) => this.closeModal(e)} className="close">&times;</span>
              <img id="image" src=""/>
            </div>
          
        </div>
        <div className="grid-container">
            <div className="item1"><img onClick={(e) => this.image(e.target)} className="pictures" id="picture1" src={nokaKuva1} /></div>
            <div className="item2"><img onClick={(e) => this.image(e.target)} className="pictures" id="picture2" src= {nokaKuva2} /></div>
            <div className="item3"><img onClick={(e) => this.image(e.target)} className="pictures" id="picture3" src={nokaKuva3} /></div>
            <div className="bottom"><img onClick={(e) => this.image(e.target)} className="pictures" id="picture4" src={nokaKuva4} /></div>
            <div className="bottom"><img onClick={(e) => this.image(e.target)} className="pictures" id="picture5" src={nokaKuva5} /></div>
            <div className="bottom1"><img onClick={(e) => this.image(e.target)} className="pictures" id="picture6" src={nokaKuva6} /></div>
        </div>
        </>
        )
    }
}