import React from 'react';
import 'loaders.css/loaders.min.css'
export class RuokalistaSivu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todaysRuokalista: null, ruokalista: null};
    }
	componentDidMount() {

nextStep();
onloadDocumentFromContent = onloadDocumentFromContent.bind(this);
function nextStep() {
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
    this.setState({ruokalista:null, todaysRuokalista: null, foodlistStyle: {}});
    var menuJson = JSON.parse(data);
    var nyt = new Date();
    var curDate = nyt.getDate();
    var days = ["maanantai", "tiistai", "keskiviikko", "torstai", "perjantai","lauantai", "sunnuntai"];
    let listEl = [];
    menuJson.Days.forEach((element, index) => {
        var menuDate = new Date(element.Date);
        var tempTitle = <h1 key="otsikko">{days[menuDate.getDay()-1] +  "  " +menuDate.toLocaleDateString("fi-FI")}</h1>
        if(curDate === menuDate.getDate()) {
            let textElem = <p key={element.Meals[0].Name + "Key"} id="FoodGlimpse">Päivän ruoka: {element.Meals[0].Name} </p>;
            this.setState({todaysRuokalista: textElem });
        }
        listEl.push(tempTitle);           
            for(let i= 0; i<element.Meals.length; i++ ) {
                let textElem = <p key={element.Meals[i].MealType+   element.Meals[i].Name +"key"} > {element.Meals[i].MealType}:    {element.Meals[i].Name} </p>
                listEl.push(textElem);
                console.log(listEl);
				
            }
            this.setState({ruokalista: listEl});
            
	});
    var loading = document.getElementById("Loading");
    loading.remove();
    this.setState({foodlistStyle: {"display" : "block"}})
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
        <div id="firstFood">{this.state.todaysRuokalista}</div>
				<div id="foodListPos">
				<div id="foodList" style={this.state.foodlistStyle}>{this.state.ruokalista}</div>
				</div>
				<div id="the-canvas"></div>
			</div>
			)
	}
}