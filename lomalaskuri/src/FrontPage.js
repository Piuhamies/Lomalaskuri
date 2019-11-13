import React from 'react';
import './App.css';

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
const allSites = [
  
];
export class Content extends React.Component {
  render() {
    return <h1>This is content</h1>;
  }
}


