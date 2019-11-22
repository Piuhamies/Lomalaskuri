import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
  Link
} from "react-router-dom";
import { TimerClass } from './timerClass.js';



export class SchoolSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this)
    this.state = {
      selectedSchool: "", content: (
        <div className="modal-content">
          <Router>
          <h1> Valitse koulusi: </h1>
          {this.props.schools.map((x, index) => (<Link onClick={(e) => this.close(e)} key={"kouluValinta" + index} className="schoolSelection" to={x.href}>{x.schoolName}</Link>))}
          </Router>
        </div>
      )
    };
  }
  close() {
    console.log(this.refs.innerHTML);
  this.setState({ content: <div data={"Mo"}>{this}</div>  });

  }
   listSchools() {
      this.props.schools.map((x) => (<Link></Link>) )
   }
  render() {
    return this.props.visible ? null : this.state.content;
  }
};



export class Content extends React.Component {
  render() {
    return (
    <Router>
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
    return this.state.shouldRedirect ? <Redirect to="/" />:(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: ' center', verticalAlign: 'center' }}>
      <div style={{width: '15em'}}>
    <h1 style={{ fontFamily: 'Roboto', color: 'red' }}>404</h1>
  <p>Eli yksinkertaistetusti olet tehnyt jotakin pahasti väärin, tai sitten vaan käytit vanhentunutta linkkiä, mutta anyways käytä tätä nappia päästäksesi takaisin etusivulle</p>
    <button onClick={this.redirecter}>Tämä nappi</button>
    </div>
  </div>);
  }
}


