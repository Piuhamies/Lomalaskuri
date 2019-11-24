import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Cookie from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from "react-router-dom";




class SchoolSelectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this)
    this.state = {
      selectedSchool: "", content: (
        <div className="modal-content">
          <Router>
            <h1> Valitse koulusi: </h1>
            {this.props.schools.map((x, index) => (<Link onClick={(e) => this.close(e.target)} key={"kouluValinta" + index} className="schoolSelection" to={x.href}>{x.schoolName}</Link>))}
          </Router>
        </div>
      )
    };
  }
  close(targetti) {
    console.log(targetti);
    this.setState({ content: <div>{this}</div> });

  }
  listSchools() {
    this.props.schools.map((x) => (<Link></Link>))
  }
  render() {
    return this.props.visible ? null : this.state.content;
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
  componentDidMount() {
    let menuBtn = document.getElementById("menuBtn");
    menuBtn.addEventListener("click", animate);
  const $ = window.$;
  function animate() {
    let x = document.getElementById("menuBtn");
    x.classList.toggle("change");
    
    $( "#places" ).animate({
      opacity: 1,
      width: "toggle"
      }, 100, function() {
      });
    }
  }
  routes() {
    let routeArray = [];
    for(let i = 0; i<this.props.schools.length; i++) {
      routeArray.push(this.props.schools[i].menuItems.map((x) =>  (<Route exact path={`/${this.props.schools[i].href}/${x.nimi}`}>{x.class} </Route>)));
    }
return routeArray;
  }
  render() {
    return (
<Router>
  {console.log(this.props.location.pathname.substring(0, this.props.location.pathname.indexOf("/")))}
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
            <Link to={`/${this.props.selectedSchool}`}>Laskuri</Link>
            <Link to="/Kysely">Kysely</Link>
            <Link to="/Ruokalista">Ruokalista</Link>
            <Link to="/Galleria">Galleria</Link>
            <Link to="/Pelit">Pelit</Link>
            <Link to="/Tilastot">Tilastot</Link>
            <Link to="/Palaute">Palaute</Link>
            <a id="dynaaminenNappi" onclick="darkFunction()"></a>
            <a onclick="SchoolChanger()"> Vaihda koulua</a>
          </div>
        </div>
        <div id="SchoolModal" className="modal">
          {this.props.selectedSchool=== "" ? <SchoolSelectorModal selected={this.props.location.pathname.substring(0, this.props.location.pathname.indexOf("/"))} schools={this.props.schools} visible={!this.props.selectedSchool && !Cookie.get('site')} /> : null}
        
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
                                {this.routes()}
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
                          
                          
