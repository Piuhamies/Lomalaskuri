import React from "react";
import { Redirect } from "react-router-dom";
import openSocket from "socket.io-client";
import onlineIconi from "./perm_identity-24px.svg";
import writingIconi from "./menu_book-24px.svg";

export default class QuickChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      redirect: false,
      online: 0,
      writingAmount: 0,
      latestMessage: null,
    };
  }
  componentDidMount() {
    this.setState({ socket: openSocket("https://espoochat.tk") });
    let socket = this.state.socket;
    socket.connect();
    let roomName = "LomainenHuone";
    socket.emit("subscribe", { room: roomName, addToOnline: false });
    socket.emit("getRecentMessages");
    var typers = [];
    var writingAmount = 0;
    socket.on("typing", (username, room) => {
      if (typers.indexOf(username) === -1) {
        typers.push(username);
      }
      writingAmount = typers.length;
      this.setState({ ready: true, writingAmount: writingAmount });
    });
    socket.on("stop-typing", (username, room) => {
      if (room === roomName) {
        typers.pop();
        writingAmount = typers.length;
        this.setState({ writingAmount: writingAmount });
      }
    });
    socket.on("onlineInRoom", (usernames) => {
      console.log("users:" + usernames);
      let userAmount = usernames;
      this.setState({ ready: true, online: userAmount });
    });
    socket.on("sendRecentMsg", (messageList) => {
      console.log(messageList[messageList.length - 1]);
      let latest = {};
      if (messageList.length !== 0) {
        latest = messageList[messageList.length - 1];
      } else {
        latest.text = "Ei viestejä";
        latest.time = Date.now();
      }
      let latestDate = new Date(latest.time).toLocaleTimeString("fi-FI", {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.setState({
        latestMessage: (
          <p>
            <strong>{latest.sender}</strong> ({latestDate}): {latest.text}
          </p>
        ),
        ready: true,
      });
    });
    socket.on("chat message", (msg, username, time) => {
      this.setState({
        latestMessage: (
          <p>
            <strong>{username}</strong> (
            {new Date(time).toLocaleTimeString("fi-FI", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            ): {msg}
          </p>
        ),
      });
    });
  }
  componentWillUnmount() {
    this.state.socket.emit("unsubscribe", {
      room: "LomainenHuone",
      addToOnline: false,
    });
    this.state.socket.disconnect();
  }
  render() {
    redirect = redirect.bind(this);
    function redirect() {
      this.setState({ redirect: true });
    }
    return this.state.redirect ? (
      <Redirect push to={`${this.props.href}`} />
    ) : (
      <div className="quickBox">
        <div className="quickBoxLeft">
          <h1 className="quickTitle">Chat: </h1>
          <div className="quickContent">
            {this.state.ready ? (
              <>
                <h2 className="alaotsikot">Chatin tilastoja:</h2>
                <div className="quickText quickChat">
                  <div>
                    <p>{this.state.online}</p>
                    <img src={onlineIconi} />
                  </div>
                  <div className="miniChat">
                    <h3>Viimeisin viesti:</h3>
                    {this.state.latestMessage}
                  </div>
                  <div>
                    <p>{this.state.writingAmount}</p>
                    <img src={writingIconi} />
                  </div>{" "}
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
        <div onClick={redirect} className="quickBoxRight">
          <div className="quickWhite arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24">
              <path
                strokeWidth="1px"
                stroke="white"
                d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
              />
              <path fill="none" d="M0 0h24v24H0z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
