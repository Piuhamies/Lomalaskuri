import React from "react";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";

export default class QuickSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.changeSchool = this.changeSchool.bind(this);
  }
  componentDidMount() {
    let deferredPrompt;
    const addBtn = document.getElementById("progressiveBtn");
    addBtn.style.display = "none";
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = "block";

      addBtn.addEventListener("click", (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = "none";
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    });
  }
  toggle = () => {
    console.log(this.props.theme);
    this.props.themes(this.props.theme);
  };
  changeSchool() {
    Cookie.set("site", null);
    this.setState({ redirect: true }, () => {
      this.setState({ redirect: false });
    });
  }
  render() {
    redirect = redirect.bind(this);
    function redirect() {
      this.setState({ redirect: true });
    }
    return this.state.redirect ? (
      <Redirect push to="/" />
    ) : (
      <div className="quickBox anim active">
        <div className="quickBoxLeft full">
          <h1 className="quickTitle">Asetukset:</h1>
          <div className="quickContent">
            <div className="quickImage">
              <button
                className="linkLookALike SettingBtn"
                onClick={this.toggle}
                id="dynaaminenNappi"
              >
                Vaihda teemaa
              </button>
              <button
                className="linkLookALike SettingBtn"
                onClick={this.changeSchool}
              >
                {" "}
                Vaihda koulua
              </button>
              <button id="progressiveBtn" className="linkLookALike SettingBtn">
                {" "}
                Lisää kotinäytölle{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
