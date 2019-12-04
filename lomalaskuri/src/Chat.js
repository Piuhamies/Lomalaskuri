import React from 'react';
import openSocket from 'socket.io-client';
let socket = openSocket("https://espoochat.tk/");
console.log(socket);
export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'userName': null, typersInterval: null };
  }
  componentDidMount() {
    socket.connect();
    const $ = window.$;
    let userModal = async () => {
      var modalForm = document.getElementById("selectUsername")
      modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var inputti = document.getElementById("signNameField");
        socket.emit('approval', inputti.value);
        console.log("emit");
        this.setState({'userName': inputti.value});
      });
    }
    socket.on('noDuplicates', (username) => {
      if(username === this.state.userName) {
        this.setState({userName: null});
      }
    });
    socket.on('approved', (username) => {
      if(username === this.state.userName) {
        var modal = document.getElementById("signUpModal");
        modal.style.display = "none";
        activateChat();
      }
    });
    var getRecentMessages = new Promise((resolve, reject) => {
      socket.emit('getRecentMessages')
      console.log('request sent')
      socket.on('sendRecentMsg', messageList => {
        console.log(messageList)
        resolve(messageList)
      })
    }).then(msglist => {
      msglist.forEach(element => {
        if (element.room == roomName) {
          $('#messages').append(`<li class="chatMessage">  <b>${element.sender}</b>  (${new Date(element.time).toLocaleTimeString()}): ${element.text}`);

        }

      })
      var msgDiv = document.getElementById("messages");
      msgDiv.scrollTop = msgDiv.scrollHeight;
    })    
    userModal();
    let roomName = 'LomainenHuone';
    socket.emit('subscribe', { room: roomName })
    socket.on('chat message', (msg, username, time) => {
      $('#messages').append(`<li class="chatMessage">  <b>${username}</b>  (${new Date(time).toLocaleTimeString()}): ${msg}`);
      var msgDiv = document.getElementById("messages");
      if (msgDiv.getElementsByTagName("li").length > 100) {
        msgDiv.getElementsByTagName("li")[0].remove()
      }
      msgDiv.scrollTop = msgDiv.scrollHeight;
    });
    let activateChat = async () => {
      let userName = this.state.userName;
      let testMsg = 'chat message';
      socket.emit('roomchange', userName, 'Global')
      socket.emit('unsubscribe', { room: 'Global' });
      function toRealLuku(luku) {
        var TheRealLuku;
        switch (typers.length) {
          case (2):
            TheRealLuku = "Kaksi";
            break;
          case (3):
            TheRealLuku = "Kolme";
            break;
          case (4):
            TheRealLuku = "Neljä";
            break;
          case (5):
            TheRealLuku = "Viisi";
            break;
          case (6):
            TheRealLuku = "Kuusi";
            break;
          case (7):
            TheRealLuku = "Seitsemän";
            break;
          case (8):
            TheRealLuku = "Kahdeksan";
            break;
          case (9):
            TheRealLuku = "Yhdeksän";
            break;
          default:
            TheRealLuku = luku;
        }
        return TheRealLuku;
      }
      var typers = []
      var sent = false
      var a = setInterval(() => {
        if ($("#m").val().split("")[0] != undefined) {
          sent = false
          socket.emit('typing', userName, roomName);
        } else {
          if (!sent) {
            socket.emit('stop-typing', userName, roomName);
            sent = true
          }

        }




      }, 100)
      this.setState({ typersInterval: a });
      var visible = false
      socket.on('typing', (username, room) => {

        if (username != userName) {

          if (typers.length >= 2) {
            var TheRealLuku = toRealLuku();
            $("#typing").text(`${TheRealLuku} henkilöä kirjoittaa`)
          } else {
            $("#typing").text(`${username} kirjoittaa`)
          }

          if (typers.indexOf(username) == -1) {
            typers.push(username)
          }

        }

      })
      socket.on('stop-typing', (username, room) => {
        if (username != userName) {


          typers.splice(typers.indexOf(username), 1);

        }
        if (typers.length == 0) {
          $("#typing").text(`Kukaan ei kirjoita tällä hetkellä`)


        }
      })
      socket.on('onlineInRoom', (usernames) => {
        console.log(usernames);
        var onlineElem = document.getElementById("onlineAmount");
        var realLuku = toRealLuku(usernames-1);
        onlineElem.textContent = `${realLuku} henkilöä paikalla`;
      });
      $('#messageForm').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        if ($('#m').val() != '') {
          socket.emit('chat message', $('#m').val(), userName, roomName, new Date().getTime());
        }
        $('#m').val('');
        return false;
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.typersInterval);
    socket.emit('stopTyping', this.state.userName);
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
      <input type="text" id="signNameField" required placeholder="Nimimerkkisi" />
      <br />
      <br />
      <input type="submit" value="Luo käyttäjä" id="signUpconfirm" class="btn btn-primary" />
</form>
</div>
</div>

        <div id="StatDiv" >
          <div id="typingDiv"> <h6 className="Stat" id="typing"></h6><h6 className="Stat" id="onlineAmount">0 henkilöä paikalla</h6></div>
        </div>
        <div id="chatArea" >
          <div id="messages">
          </div>
        </div>

        <div id="send">

          <form id="messageForm" action="">

            <div id="tekstiAlue">

              <input id="m" autoComplete="off" type="text" className="textInput" placeholder="kirjoita viesti" aria-label="kirjoita viesti" />
              <div className="chatButtonContainer">
                <button className="chatButton" >Lähetä</button>
                <br />

              </div>

            </div>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
    )
  }
}