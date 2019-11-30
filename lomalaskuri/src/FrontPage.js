import React from 'react';
import './App.css';
import Cookie from 'js-cookie';
import { DefaultMenu } from "./defaultMenu.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import ReactGA from 'react-ga';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


ReactGA.initialize('UA-137016636-1');
history.listen((location) => {
  console.log("update");
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname)
}
);

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
export class CookieNotification extends React.Component {
  hide(target) {
    var El= target.parentElement;
    var checkBox = document.getElementById("NotEverAgain");
    El.style.display = "none";
    if(checkBox.checked) {
      Cookie.set('NotAgain', true);
    }
}
render() {
  console.log(this.props.visible);
  if(this.props.visible === "false") {
    return (<div className="cookie">

    <p> Tämä nettisivu käyttää evästeitä</p>
    <button onClick={(e) => this.hide(e.target)}>Ok</button>
    <input type="checkbox" title="Huom! Tämän valitsemalla, evästeistä ei ilmoiteta enää uudestaan"
      id="NotEverAgain" />Muista valintani
  
  </div>)
  }
  else {
    return null;
  }
}
}
export class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {curSchool: null, darkMode: false};
    this.darkMode = this.darkMode.bind(this);
  }
  componentDidMount() {
    let menuBtn = document.getElementById("menuBtn");
    let placesElem = document.getElementById("places");
    menuBtn.addEventListener("click", animate);
    placesElem.addEventListener("click", animate);
    const $ = window.$;
    function animate() {
      if(window.outerWidth < 960) {
      let x = document.getElementById("menuBtn");
      x.classList.toggle("change");

      $("#places").animate({
        opacity: 1,
        width: "toggle"
      }, 100, function () {
      });
    }
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
                    <DefaultMenu  updateDarkMode={this.darkMode} isDarkMode={this.state.darkMode} schools={this.props.schools} curSchool={this.getCurSchool} />
                  </Route>
                </Switch>
              </div>
        </div>
        <div id="SchoolModal" className="modal">
          <Route exact path="/">

    {curSchoolCookie === null || curSchoolCookie === undefined ? <SchoolSelectorModal click={this.getCurSchool} schools={this.props.schools} /> : () => {return (<Redirect to={"/" + curSchoolCookie.href + "/" + curSchoolCookie.menuItems[0].nimi}></Redirect>) } } 
          </Route>
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
        <CookieNotification visible={Cookie.get('NotAgain')}/>

      </Router>

    );
  }
}


