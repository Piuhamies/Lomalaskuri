import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { TimerClass } from './timerClass.js';

export class SchoolSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      remove: false, content: (
        <div className="modal-content">
          <h1> Valitse koulusi: </h1>
          <a id="SameSchool" onClick={this.close}> Nöykkiön koulu </a>
          <a href="Haukilahden_koulu/index.html">Haukilahden koulu</a>
          <a href="Laurinlahden_koulu/index.html">Laurinlahden Koulu</a>
          <a href="vanttila/index.html">Vanttilan Koulu</a>
          <a href="None/index.html"> Ei Mikään yllä mainittu </a>
        </div>
      )
    };
  }
  close() {
    this.setState({ removed: true, content: null });

  }

  render() {
    return this.state.content;
  }
};
export class Content extends React.Component {
  render() {
    return (<Router>
      <Switch>
        <Route exact path="/kakke">
          <p>Kakke</p>
        </Route>
        <Route exact path="/">
          <TimerClass />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>);
  }
}
class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.redirecter = this.redirecter.bind(this);
    this.state = {shouldRedirect: false }
  }
  redirecter() {
    this.setState({shouldRedirect: true});
  }
  render() {
    return this.state.shouldRedirect ? <Redirect to="/" />:(<div style={{ display: 'flex', flexWrap: 'wrap', width: '10em', justifyContent: 'center', alignItems: ' center', verticalAlign: 'center' }}>
    <h1 style={{ fontFamily: 'Roboto', color: 'red' }}>404</h1>;
  <p>Eli yksinkertaistetusti olet tehnyt jotakin pahasti väärin, tai sitten vaan käytit vanhentunutta linkkiä, mutta anyways käytä tätä nappia päästäksesi takaisin etusivulle</p>
    <button onClick={this.redirecter()}>Tämä nappi</button>
  </div>);
  }
}


