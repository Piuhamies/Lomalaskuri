import React from "react";
import { Suspense } from "react";
import "../App.css";
import Cookie from "js-cookie";
import { DefaultMenu } from "../Components/defaultMenu.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { NewSchoolSelector } from "../Components/NewSchoolSelector";
import { Info } from "../Components/Info";
import { Helmet } from "react-helmet";

class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.redirecter = this.redirecter.bind(this);
    this.state = { shouldRedirect: false };
  }
  redirecter() {
    this.setState({ shouldRedirect: true });
  }
  render() {
    return this.state.shouldRedirect ? (
      <Redirect to="/" />
    ) : (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: " center",
          verticalAlign: "center",
        }}
      >
        <div style={{ width: "15em" }}>
          <h1 style={{ fontFamily: "Roboto", color: "red" }}>404</h1>
          <p>
            Eli yksinkertaistetusti olet tehnyt jotakin pahasti väärin, tai
            sitten vaan käytit vanhentunutta linkkiä, mutta anyways käytä tätä
            nappia päästäksesi takaisin etusivulle
          </p>
          <button onClick={this.redirecter}>Tämä nappi</button>
        </div>
      </div>
    );
  }
}
export class CookieNotification extends React.Component {
  hide(target) {
    var El = target.parentElement;
    var checkBox = document.getElementById("NotEverAgain");
    El.style.display = "none";
    if (checkBox.checked) {
      Cookie.set("NotAgain", true);
    }
  }
  render() {
    console.log(this.props.visible);
    if (this.props.visible === "false") {
      return (
        <div className="cookie">
          <p> Tämä nettisivu käyttää evästeitä</p>
          <button onClick={(e) => this.hide(e.target)}>Ok</button>
          <input
            type="checkbox"
            title="Huom! Tämän valitsemalla, evästeistä ei ilmoiteta enää uudestaan"
            id="NotEverAgain"
          />
          Muista valintani
        </div>
      );
    } else {
      return null;
    }
  }
}
export class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curSchool: null, darkMode: false, redirect: null };
    this.toHome = this.toHome.bind(this);
  }
  componentDidMount() {
    if (
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      Cookie.get("dark") === "true"
    ) {
      this.props.darkFunction(this.props.themes.login, false);
    }
  }
  toHome() {
    this.setState({ redirect: <Redirect to="Etusivu" /> }, () =>
      this.setState({ redirect: null })
    );
    console.log(this.state.redirect);
  }
  routes() {
    let routeArray = [];
    for (let i = 0; i < this.props.schools.length; i++) {
      routeArray.push(
        this.props.schools[i].menuItems.map((x) => (
          <Route exact path={`/${this.props.schools[i].href}/${x.nimi}`}>
            <>
              <Helmet>
                <title>Lomalaskuri | {x.nimi} </title>
              </Helmet>
              <Suspense
                fallback={
                  <div id="Loading" className="loader">
                    {" "}
                    <div className="loader-inner square-spin">
                      {" "}
                      <div></div>{" "}
                    </div>{" "}
                  </div>
                }
              >
                {x.class}
              </Suspense>
            </>
          </Route>
        ))
      );
    }
    return routeArray;
  }
  render() {
    let curSchoolCookie =
      this.props.schools[
        this.props.schools.findIndex((i) => i.href === Cookie.get("site"))
      ];
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Helmet>
              <title>Lomalaskuri | Kouluvalitsin</title>
            </Helmet>
            <NewSchoolSelector
              toggleTheme={this.props.darkFunction}
              themes={this.props.themes}
              schools={this.props.schools}
            >
              {" "}
            </NewSchoolSelector>
          </Route>
          <Route exact path="/info">
            <Info />
          </Route>
          {this.props.schools.map((x) => (
            <Route key={x.href + "key"} path={`/${x.href}`}>
              {" "}
              {/*Mapataan jokainen koulu Routerille, eli jos url on määritellyt koulun älä avaa kouluvalintaa*/}
              <div id="menuContainer">
                <Switch>
                  {this.props.schools.map((x, index) => {
                    return (
                      <Route
                        key={index + "key"}
                        exact
                        path={`/${x.href}/${x.menuItems[0].nimi}`}
                      >
                        {" "}
                        <div id="menu">
                          <h1 id="logo">Lomalaskuri</h1>
                        </div>
                      </Route>
                    );
                  })}
                  <Route>
                    <div id="menu">
                      {this.state.redirect}
                      <div onClick={this.toHome} className="menuBtn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                      </div>
                      <h1 className="offCenter" id="logo">
                        Lomalaskuri
                      </h1>
                    </div>
                  </Route>
                </Switch>

                <div id="places">
                  <DefaultMenu
                    updateDarkMode={this.props.darkFunction}
                    schools={this.props.schools}
                  />
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
              <CookieNotification visible={Cookie.get("NotAgain")} />
            </Route>
          ))}
        </Switch>
      </Router>
    );
  }
}
