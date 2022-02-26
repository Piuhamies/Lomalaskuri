import React from "react";
import { Redirect } from "react-router-dom";

export default class QuickCorona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      active: true,
      otsikko: null,
      weeks: <p id="glimpsewk"></p>,
      days: <p id="glimpsed"></p>,
      hours: <p id="glimpseh"></p>,
      minutes: <p id="glimpsemin"></p>,
      redirect: false,
    };
  }
  componentDidMount() {
    this.setState({ active: true, ready: false });
    var timers = [
      {
        nimi: "Aikaa koulujen sulkemiseen",
        start: new Date("Mar 1, 2021 00:00:00"),
        end: new Date("April 11, 2021 10:00:00"),
      },
    ]; //Kaikki nykyiset lomat
    var timeNames = [
      { nimi: "weeks", shortened: "wk" },
      { nimi: "days", shortened: "d" },
      { nimi: "hours", shortened: "h" },
      { nimi: "minutes", shortened: "min" },
    ];
    var nyt = Date.now();
    let start = timers[0].start.getTime();
    let end = timers[0].end.getTime();
    let distance = [
      Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
      Math.floor(
        ((start - nyt) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
      ), //päivät
      Math.floor(((start - nyt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // tunnit
      Math.floor(((start - nyt) % (1000 * 60 * 60)) / (1000 * 60)), //minuutit
      Math.floor(((start - nyt) % (1000 * 60)) / 1000), //sekunnit
      `000${Math.floor((start - nyt) % 1000)}`.substring(
        Math.floor(Math.log10(Math.floor((start - nyt) % 1000))) + 1,
        4 + Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))
      ),
    ];
    let updateElems = (distance, oldDistance) => {
      var stateToBeSet = { ready: true };
      nyt = Date.now();
      if (timers[0].start.getTime() < nyt) {
        stateToBeSet.otsikko = (
          <h2 className="alaotsikot corona">
            Aikaa lähiopetuksen jatkumiseen:
          </h2>
        );
      } else {
        stateToBeSet.otsikko = (
          <h2 className="alaotsikot corona">{timers[0].nimi + ":"}</h2>
        );
      }
      timeNames.forEach((data, i) => {
        if (oldDistance) {
          if (oldDistance[i] !== distance[i]) {
            stateToBeSet[timeNames[i].nimi] = (
              <p
                className={`glimpse${timeNames[i].shortened}`}
              >{`${distance[i]}${timeNames[i].shortened}`}</p>
            );
          }
        } else {
          stateToBeSet[timeNames[i].nimi] = (
            <p
              className={`glimpse${timeNames[i].shortened}`}
            >{`${distance[i]}${timeNames[i].shortened}`}</p>
          );
        }
      });
      this.setState(stateToBeSet);
    };
    MainLoop = MainLoop.bind(this);
    MainLoop();
    updateElems(distance);
    function MainLoop() {
      let oldDistance = distance;
      nyt = Date.now();
      if (timers[0].start.getTime() < nyt) {
        start = timers[0].end.getTime();
      } else {
        start = timers[0].start.getTime();
      }
      distance = [
        Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
        Math.floor(
          ((start - nyt) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
        ), //päivät
        Math.floor(((start - nyt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // tunnit
        Math.floor(((start - nyt) % (1000 * 60 * 60)) / (1000 * 60)), //minuutit
        Math.floor(((start - nyt) % (1000 * 60)) / 1000), //sekunnit
        `000${Math.floor((start - nyt) % 1000)}`.substring(
          Math.floor(Math.log10(Math.floor((start - nyt) % 1000))) + 1,
          4 + Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))
        ),
      ];
      updateElems(distance, oldDistance);
      if (this.state.active) {
        setTimeout(MainLoop, 30000);
      }
    }
  }
  componentWillUnmount() {
    this.setState({ active: false });
  }
  render() {
    redirect = redirect.bind(this);
    function redirect() {
      this.setState({ redirect: true });
    }
    return this.state.redirect ? (
      <Redirect push to={`${this.props.href}`} />
    ) : (
      <div className="quickBox corona anim active ">
        <div className="quickBoxLeft full">
          <h1 className="quickTitle">Erikoislaskuri:</h1>
          <div className="quickContent">
            {this.state.ready ? (
              <>
                {this.state.otsikko}
                <div className="ajat corona quickText">
                  {this.state.weeks}
                  {this.state.days}
                  {this.state.hours}
                  {this.state.minutes}
                </div>
              </>
            ) : (
              <div id="Loading" className="loader quickLoader">
                <div className="loader-inner square-spin">
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
