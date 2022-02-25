import React from "react";
export default class RuokalistaSivu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todaysRuokalista: null, ruokalista: null };
  }
  componentDidMount() {
    nextStep(this.props.url);
    onloadDocumentFromContent = onloadDocumentFromContent.bind(this);
    function nextStep(requesturl) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", requesturl);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send();
      xhr.onload = function () {
        if (this.status === 200) {
          console.log(this.response);
          onloadDocumentFromContent(this.response);
        } else {
          console.log(this.error);
        }
      };
    }
    function onloadDocumentFromContent(data) {
      this.setState({ ruokalista: null, todaysRuokalista: null });
      try {
        console.log(data);
        var menuJson = JSON.parse(data);
      } catch {
        console.log("Unable to fetch food data");
        var loading = document.getElementById("Loading");
        loading.remove();
        this.setState({ todaysRuokalista: "Tänään ei ole kouluruokailua" }); //luotetaan siihen, ettei ruokailua ole jos ruokalistojen haku epäonnistuu
        return;
      }
      var listEl = [];
      let now = new Date().getDay() - 1;
      let todaysFood = menuJson[now];
      let tempFood = (
        <p key={todaysFood.food + "today"} id="FoodGlimpse">
          Päivän ruoka: {todaysFood.food}
        </p>
      );
      this.setState({ todaysRuokalista: tempFood });
      menuJson.forEach((element, index) => {
        let textHeader = <h1>{element.day}</h1>;
        let textElem = <p key={element.food}> Lounas: {element.food}</p>;
        let veganTextElem = (
          <p key={element.veganFood}>Kasvislounas: {element.veganFood}</p>
        );
        listEl.push(textHeader);
        listEl.push(textElem);
        listEl.push(veganTextElem);
      });
      this.setState({ ruokalista: listEl });
      var loading = document.getElementById("Loading");
      loading.remove();
      document.getElementById("foodList").style.display = "block";
    }
  }
  componentDidCatch() {
    console.log(
      "sinä joka luet tätä, älä rämputä niitä välilehtiä niin nopeasti"
    );
  }
  render() {
    return (
      <div id="show">
        <h1>Ruokalistat</h1>
        <div id="Loading" className="loader">
          <div className="loader-inner square-spin">
            <div></div>
          </div>
        </div>
        <div id="firstFood">{this.state.todaysRuokalista}</div>
        <div id="foodListPos">
          <div id="foodList">{this.state.ruokalista}</div>
        </div>
        <div id="the-canvas"></div>
      </div>
    );
  }
}
