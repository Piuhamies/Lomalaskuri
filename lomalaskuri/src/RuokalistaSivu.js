import React from 'react';
import loading from './loading.gif';
import 'loaders.css/loaders.min.css'
export class RuokalistaSivu extends React.Component {
	componentDidMount() {

nextStep();
 async function nextStep() {
    var requesturl = `https://lomalaskuribackend.herokuapp.com/aromidata`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', requesturl);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200) {
            onloadDocumentFromContent(this.response);
        }
        else {
            console.log(this.error);
        }
    };
}

function onloadDocumentFromContent(data) {
    var menuJson = JSON.parse(data);
    var nyt = new Date();
    var curDate = nyt.getDate();
    var days = ["maanantai", "tiistai", "keskiviikko", "torstai", "perjantai","lauantai", "sunnuntai"];
    document.getElementById("firstFood").innerHTML = "";
    document.getElementById("foodList").innerHTML = "";
    menuJson.Days.forEach((element, index) => {
        var menuDate = new Date(element.Date);
        var tempTitle = document.createElement("h1");
        tempTitle.textContent = days[menuDate.getDay()-1] +  "  " +menuDate.toLocaleDateString("fi-FI");
        if(curDate === menuDate.getDate()) {
            let firstElem = document.getElementById("firstFood");
            let textElem = document.createElement("p");
            textElem.textContent = `Päivän ruoka: ${element.Meals[0].Name} `;
            textElem.setAttribute("id", "FoodGlimpse")
            firstElem.appendChild(textElem);
        }
           
            let listEl = document.getElementById("foodList");
            listEl.appendChild(tempTitle);
            for(let i= 0; i<element.Meals.length; i++ ) {
                let textElem = document.createElement("p");
                textElem.textContent = `${element.Meals[i].MealType}:    ${element.Meals[i].Name} `;
				listEl.appendChild(textElem);
				
			}
	});
    var loading = document.getElementById("Loading");
    loading.remove();
    document.getElementById("foodList").style.display = "block";    
}
	}
	componentDidCatch () {
		console.log("sinä joka luet tätä, älä rämputä niitä välilehtiä niin nopeasti")
	}
	render() {
		return (
			<div id="show">
				<h1>Ruokalistat</h1>
                <div id="Loading" class="loader">
        <div class="loader-inner square-spin">
          <div></div>
        </div>
      </div>
				<div id="firstFood"></div>
				<div id="foodListPos">
				<div id="foodList"></div>
				</div>
				<div id="the-canvas"></div>
			</div>
			)
	}
}