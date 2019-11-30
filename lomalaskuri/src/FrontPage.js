import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Cookie from 'js-cookie';
import { DefaultMenu } from "./defaultMenu.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();



class SchoolSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this)
    this.state = {
      selectedSchool: "", content: (
        <div className="modal-content">
            <h1> Valitse koulusi: </h1>
            {this.props.schools.map((x, index) => (<Link onChange={() => console.log("change")} onClick={(e) => this.close(e.target)}  key={"kouluValinta" + index} className="schoolSelection" to={x.href + "/" + x.menuItems[0].nimi}>{x.schoolName}</Link>))}
        </div>
      )
    };
  }
  close(targetti) {
    this.setState({ content: null });

  }
  render() {
    return this.state.content;
  }
};



class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.redirecter = this.redirecter.bind(this);
    this.state = { shouldRedirect: false }
  }
  redirecter() {
    this.setState({ shouldRedirect: true });
  }
  render() {
    return this.state.shouldRedirect ? <Redirect to="/" /> : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: ' center', verticalAlign: 'center' }}>
        <div style={{ width: '15em' }}>
          <h1 style={{ fontFamily: 'Roboto', color: 'red' }}>404</h1>
          <p>Eli yksinkertaistetusti olet tehnyt jotakin pahasti väärin, tai sitten vaan käytit vanhentunutta linkkiä, mutta anyways käytä tätä nappia päästäksesi takaisin etusivulle</p>
          <button onClick={this.redirecter}>Tämä nappi</button>
        </div>
      </div>);
  }
}
export class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {curSchool: null, darkMode: false};
    this.darkMode = this.darkMode.bind(this);
  }
  componentDidMount() {
    console.log("this happened");
    let menuBtn = document.getElementById("menuBtn");
    menuBtn.addEventListener("click", animate);
    const $ = window.$;
    function animate() {
      let x = document.getElementById("menuBtn");
      x.classList.toggle("change");

      $("#places").animate({
        opacity: 1,
        width: "toggle"
      }, 100, function () {
      });
    }
  }
  darkMode = (value) => {
    this.setState({darkMode: value})
  }
  routes() {
    let routeArray = [];
    for (let i = 0; i < this.props.schools.length; i++) {
    routeArray.push(this.props.schools[i].menuItems.map((x) => (<Route exact path={`/${this.props.schools[i].href}/${x.nimi}`}>{x.class}</Route>)));
    }
    return routeArray;
  }
  render() {
    let curSchoolCookie = this.props.schools[this.props.schools.findIndex(i => i.href === Cookie.get('site'))] ;
    return (
      <Router>
        <div id="menuContainer">
          <div id="menu">
            <div id="menuBtn" onClick={this.openMenu}>
              <div className="rows" id="row1"></div>
              <div className="rows" id="row2"></div>
              <div className="rows" id="row3"></div>
            </div>
            <h1 id="logo">Espoon l<a id="salainen" href="Salainen.html">o</a>malaskuri</h1>
          </div>
              <div id="places">
                <Switch>
                  <Route exact path="/">
                    <DefaultMenu schools={this.props.schools} curSchool={this.getCurSchool} />
                  </Route>
                  <Route>
                    <DefaultMenu updateDarkMode={this.darkMode} isDarkMode={this.state.darkMode} schools={this.props.schools} curSchool={this.getCurSchool} />
                  </Route>
                </Switch>
              </div>
        </div>
        <div id="SchoolModal" className="modal">
          <Route exact path="/">

    {curSchoolCookie === null || curSchoolCookie === undefined ? <SchoolSelectorModal click={this.getCurSchool} schools={this.props.schools} /> : () => {return (<Redirect to={"/" + curSchoolCookie.href + "/" + curSchoolCookie.menuItems[0].nimi}></Redirect>) } } 
          </Route>
        </div>
        <div id="anotherPage">
          <div id="addedTimers">
            <img onclick="addTimers()" src="add.png" />
            <h2 className="alaotsikot"> Aikaa kesälomaan:</h2>
            <div className="ajat">
              <p id="bonusW"></p>
              <p id="bonusD"></p>
              <p id="bonusH"></p>
              <p id="bonusMin"></p>
              <p id="bonusS"></p>
              <p className="noShake" id="bonusMs"></p>
            </div>

            <div id="addedTimer2">
              <h2 className="alaotsikot"> Aikaa Pääsiäislomaan:</h2>
              <div className="ajat">
                <p id="bonusW1"></p>
                <p id="bonusD1"></p>
                <p id="bonusH1"></p>
                <p id="bonusMin1"></p>
                <p id="bonusS1"></p>
                <p className="noShake" id="bonusMs1"></p>
              </div>
            </div>
          </div>
          <div id="properties">
          </div>
        </div>
        <div id="content">
          <Switch>
            <Route exact path="/">
              {this.props.schools[0].menuItems[0].class}
            </Route>
            {this.routes()}
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
        <div className="cookie">

          <p> Tämä nettisivu käyttää evästeitä</p>
          <button onclick="button()">Ok</button>
          <input type="checkbox" title="Huom! Tämän valitsemalla, evästeistä ei ilmoiteta enää uudestaan"
            id="NotEverAgain" />Muista valintani

    </div>

      </Router>

    );
  }
}


