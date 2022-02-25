import React from "react";
import openSocket from "socket.io-client";
import onlineIconi from "./perm_identity-24px.svg";
import writingIconi from "./menu_book-24px.svg";
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      typersInterval: null,
      paikalla: <h6 className="Stat">X henkilöä paikalla</h6>,
      writing: <h6></h6>,
      socket: openSocket("https://espoochat.tk"),
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  async componentDidMount() {
    let socket = this.state.socket;
    await socket.connect();
    const $ = window.$;
    let userAmount;
    let writingAmount = 0;
    let writer;
    let userModal = async () => {
      var modalForm = document.getElementById("selectUsername");
      modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var inputti = document.getElementById("signNameField");
        socket.emit("approval", inputti.value);
        console.log("emit");
        this.setState({ userName: inputti.value });
      });
    };
    socket.on("noDuplicates", (username) => {
      if (username === this.state.userName) {
        this.setState({ userName: null });
      }
    });
    socket.on("approved", (username) => {
      if (username === this.state.userName) {
        var modal = document.getElementById("signUpModal");
        modal.style.display = "none";
        activateChat();
      }
    });
    var getRecentMessages = new Promise((resolve, reject) => {
      socket.emit("getRecentMessages");
      console.log("request sent");
      socket.on("sendRecentMsg", (messageList) => {
        console.log(messageList);
        resolve(messageList);
      });
    }).then((msglist) => {
      msglist.forEach((element) => {
        if (element.room == roomName) {
          $("#messages").append(
            `<li class="chatMessage">  <b>${element.sender}</b>  (${new Date(
              element.time
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}): ${element.text}`
          );
        }
      });
      var msgDiv = document.getElementById("messages");
      msgDiv.scrollTop = msgDiv.scrollHeight;
    });
    userModal();
    let roomName = "LomainenHuone";
    socket.emit("subscribe", { room: roomName, addToOnline: true });
    socket.on("chat message", (msg, username, time) => {
      $("#messages").append(
        `<li class="chatMessage">  <b>${username}</b>  (${new Date(
          time
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}): ${msg}`
      );
      var msgDiv = document.getElementById("messages");
      if (msgDiv.getElementsByTagName("li").length > 100) {
        msgDiv.getElementsByTagName("li")[0].remove();
      }
      msgDiv.scrollTop = msgDiv.scrollHeight;
    });
    let activateChat = async () => {
      let userName = this.state.userName;
      let testMsg = "chat message";
      socket.emit("roomchange", userName, "LomainenHuone");
      function toRealLuku(luku) {
        var TheRealLuku;
        switch (luku) {
          case 2:
            TheRealLuku = "Kaksi";
            break;
          case 3:
            TheRealLuku = "Kolme";
            break;
          case 4:
            TheRealLuku = "Neljä";
            break;
          case 5:
            TheRealLuku = "Viisi";
            break;
          case 6:
            TheRealLuku = "Kuusi";
            break;
          case 7:
            TheRealLuku = "Seitsemän";
            break;
          case 8:
            TheRealLuku = "Kahdeksan";
            break;
          case 9:
            TheRealLuku = "Yhdeksän";
            break;
          default:
            TheRealLuku = luku;
        }
        return TheRealLuku;
      }
      var typers = [];
      var sent = false;
      let displayPeopleAmount = () => {
        var width = window.outerWidth;
        let writingValue = <h6></h6>;
        if (width > 960) {
          console.log("odd");
          switch (writingAmount) {
            case 0:
              writingValue = <h6 className="Stat">Kukaan ei kirjoita</h6>;
              break;
            case 1:
              writingValue = <h6 className="Stat">{writer} kirjoittaa</h6>;
              break;
            case writingAmount < 10:
              writingValue = (
                <h6 className="Stat">
                  {toRealLuku(writingAmount)} henkilöä kirjoittaa
                </h6>
              );
              break;
            default:
              writingValue = (
                <h6 className="Stat">{writingAmount} henkilöä kirjoittaa</h6>
              );
              break;
          }
        } else {
          writingValue = (
            <h6 className="Stat">
              <img src={writingIconi} />
              {writingAmount}
            </h6>
          );
        }
        this.setState({ writing: writingValue });
      };
      let displayAmount = () => {
        var width = window.outerWidth;
        this.setState({
          paikalla:
            width > 960 ? (
              <h6 className="Stat">
                {toRealLuku(userAmount)} henkilöä paikalla
              </h6>
            ) : (
              <h6 className="Stat">
                <img src={onlineIconi} alt="icon" />
                {userAmount}
              </h6>
            ),
        });
      };
      window.addEventListener("resize", displayAmount);
      window.addEventListener("resize", displayPeopleAmount);
      var a = setInterval(() => {
        if ($("#m").val().split("")[0] != undefined) {
          console.log("stuff");
          sent = false;
          socket.emit("typing", userName, roomName);
        } else {
          if (!sent) {
            socket.emit("stop-typing", userName, roomName);
            sent = true;
          }
        }
      }, 100);
      this.setState({ typersInterval: a });
      var visible = false;
      socket.on("typing", (username, room) => {
        if (username != userName) {
          displayPeopleAmount();
          if (typers.length == 1) {
            writer = typers[0];
            writingAmount = 1;
          } else {
            writingAmount = typers.length;
          }
          if (typers.indexOf(username) == -1) {
            typers.push(username);
            console.log("push");
          }
        }
      });
      socket.on("stop-typing", (username, room) => {
        if (username != userName) {
          typers.splice(typers.indexOf(username), 1);
          if (typers.length == 1) {
            writer = typers[0];
            writingAmount = 1;
          } else {
            writingAmount = typers.length;
          }
          displayPeopleAmount();
        }
      });

      socket.on("onlineInRoom", (usernames) => {
        console.log(usernames);
        userAmount = usernames - 1;
        displayAmount();
        displayPeopleAmount();
      });
      $("#messageForm").submit(function (e) {
        e.preventDefault(); // prevents page reloading
        if ($("#m").val() != "") {
          socket.emit(
            "chat message",
            $("#m").val().substring(0, 500),
            userName,
            roomName,
            new Date().getTime()
          );
        }
        $("#m").val("");
        return false;
      });
    };
  }
  componentWillUnmount() {
    let socket = this.state.socket;
    clearInterval(this.state.typersInterval);
    socket.emit("unsubscribe", { room: "LomainenHuone", addToOnline: true });
    socket.disconnect();
  }
  render() {
    return (
      <div className="kysely">
        <div className="chatContainer">
          <div id="signUpModal" className="chatModal">
            <div className="chatModal-content modal-content">
              <h1>Valitse käyttäjänimi:</h1>
              <form id="selectUsername">
                <input
                  type="text"
                  id="signNameField"
                  required
                  placeholder="Nimimerkkisi"
                />
                <br />
                <br />
                <input
                  type="submit"
                  value="Luo käyttäjä"
                  id="signUpconfirm"
                  class="btn btn-primary"
                />
              </form>
            </div>
          </div>

          <div id="StatDiv">
            <div id="typingDiv">
              {this.state.writing}
              <p style={{ color: "white" }}>
                Chattia ollut mukana tekemässä Aapo H
              </p>
              {this.state.paikalla}
            </div>
          </div>
          <div id="messages"></div>

          <div id="send">
            <form id="messageForm" action="">
              <div id="tekstiAlue">
                <input
                  id="m"
                  autoComplete="off"
                  type="text"
                  className="textInput"
                  placeholder="kirjoita viesti"
                  aria-label="kirjoita viesti"
                />
                <div className="chatButtonContainer">
                  <button className="chatButton">Lähetä</button>
                  <br />
                </div>
              </div>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
