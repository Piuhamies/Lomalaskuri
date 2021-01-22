import React from 'react';
import Cookie from 'js-cookie';
import {Redirect} from 'react-router-dom';
import openSocket from 'socket.io-client';
import onlineIconi from './perm_identity-24px.svg';
import writingIconi from './menu_book-24px.svg';
import nokaKuva1 from './Kuvat/1.webp';
import nokaKuva2 from './Kuvat/2.webp';
import nokaKuva3 from './Kuvat/3.webp';
import nokaKuva4 from './Kuvat/4.webp';
import nokaKuva5 from './Kuvat/5.webp';
import nokaKuva6 from './Kuvat/6.webp';
let socket = openSocket("https://espoochat.tk");

export class QuickCorona extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ready: false, active: true, otsikko: null, weeks: <p id="glimpsewk"></p>, days: <p id="glimpsed"></p>, hours: <p id="glimpseh"></p>, minutes: <p id="glimpsemin"></p>, redirect: false};
    }
    componentDidMount () {
        this.setState({active: true, ready: false});
        var timers = [
            { nimi: "Aikaa koulujen sulkemiseen" , start: new Date("Mar 18, 2020 00:00:00"), end: new Date("May 14, 2020 10:00:00") }
        ];  //Kaikki nykyiset lomat
        var timeNames = [{ nimi: "weeks", shortened: "wk" },
        { nimi: "days", shortened: "d" },
        { nimi: "hours", shortened: "h" },
        { nimi: "minutes", shortened: "min" }
        ];        var nyt = Date.now();        
        let start = timers[0].start.getTime();
        let end = timers[0].end.getTime();
        let distance = [
            Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
            Math.floor((start - nyt) % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24)), //päivät
            Math.floor((start - nyt) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)), // tunnit
            Math.floor((start - nyt) % (1000 * 60 * 60) / (1000 * 60)), //minuutit
            Math.floor((start - nyt) % (1000 * 60) / 1000), //sekunnit
            `000${Math.floor((start - nyt) % 1000)}`.substring((Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))) + 1, 4 + (Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))))
        ];
        let updateElems = (distance, oldDistance) => {
            var stateToBeSet = {ready: true};
            nyt = Date.now();
            if(timers[0].start.getTime() < nyt ) {
                stateToBeSet.otsikko = (<h2  className="alaotsikot corona">Aikaa koulurakennusten aukeamiseen:</h2>); 
            }
            else {
                stateToBeSet.otsikko = (<h2 className="alaotsikot corona">{timers[0].nimi + ":"}</h2>); 
            }
            timeNames.forEach((data, i) => {
                if(oldDistance) {
                    if(oldDistance[i] !== distance[i]) {
                        stateToBeSet[timeNames[i].nimi] = (<p className={`glimpse${timeNames[i].shortened}`}>{`${distance[i]}${timeNames[i].shortened}`}</p>);
                   }
            }
            else {
                stateToBeSet[timeNames[i].nimi] = (<p className={`glimpse${timeNames[i].shortened}`}>{`${distance[i]}${timeNames[i].shortened}`}</p>);
            }
            });
            this.setState(stateToBeSet);
        }
        MainLoop = MainLoop.bind(this);
        MainLoop();
        updateElems(distance);
        function MainLoop () {
            let oldDistance = distance;
            nyt = Date.now();
            if(timers[0].start.getTime() < nyt ) {
                start = timers[0].end.getTime();
            }
            else {
                start = timers[0].start.getTime();
            }
            distance = [
                Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
                Math.floor((start - nyt) % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24)), //päivät
                Math.floor((start - nyt) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)), // tunnit
                Math.floor((start - nyt) % (1000 * 60 * 60) / (1000 * 60)), //minuutit
                Math.floor((start - nyt) % (1000 * 60) / 1000), //sekunnit
                `000${Math.floor((start - nyt) % 1000)}`.substring((Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))) + 1, 4 + (Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))))
            ];
            updateElems(distance, oldDistance);
            if(this.state.active) {
                setTimeout(MainLoop, 30000);
            }
        }
    }
    componentWillUnmount () {
        this.setState({active:false});
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to={`${this.props.href}`} />  : (
            <div className="quickBox corona ">
            <div className="quickBoxLeft full">
                <h1 className="quickTitle">Erikoislaskuri:</h1>
                <div className="quickContent">
                    {this.state.ready ? ( <>
                    {this.state.otsikko}
                    <div className="ajat corona quickText">
                        {this.state.weeks}
                        {this.state.days}
                        {this.state.hours}
                        {this.state.minutes}
                    </div>
                    
                    </>) : (<div id="Loading" className="loader quickLoader">
                    <div className="loader-inner square-spin">
                    <div></div>
                   </div>
                    </div>)}
                </div>
                </div>
            </div>
        );
    }
}
export class QuickLaskuri extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ready: false, active: true, otsikko: null, weeks: <p id="glimpsewk"></p>, days: <p id="glimpsed"></p>, hours: <p id="glimpseh"></p>, minutes: <p id="glimpsemin"></p>, redirect: false};
    }
    componentDidMount () {
        this.setState({active: true, ready: false});
        var timers = [
            { nimi: "Aikaa kesälomaan ", start: new Date("May 30, 2019 12:00:00"), end: new Date("Aug 13, 2019 10:00:00") },
            { nimi: "Aikaa Syyslomaan", start: new Date("Oct 12, 2019 00:00:00"), end: new Date("Oct 16, 2019 00:00:00") },
            { nimi: "Aikaa Joululomaan", start: new Date("Dec 23, 2019 00:00:00"), end: new Date("Jan 6, 2020 00:00:00") },
            { nimi: "Aikaa Hiihtolomaan", start: new Date("Feb 17, 2019 00:00:00"), end: new Date("Feb 24, 2019 00:00:00") },
            { nimi: "Aikaa Pääsiäislomaan", start: new Date("Apr 9 2019 16:00:00"), end: new Date("Apr 13 2019 8:30:00") }
        ];  //Kaikki nykyiset lomat
        var timeNames = [{ nimi: "weeks", shortened: "wk" },
        { nimi: "days", shortened: "d" },
        { nimi: "hours", shortened: "h" },
        { nimi: "minutes", shortened: "min" }
        ];
        var currentYear = new Date().getFullYear(); //säilytetään nykyinen vuosi muuttujassa, koska sitä käytetään monessa paikkaa
        var nyt = Date.now();        
        timers.forEach(function (element, index) {
            if (element.start.getTime() - nyt < 0 && element.end.getTime() - nyt < 0 && element.start.getFullYear() < currentYear && element.start.getMonth() <= element.end.getMonth()) {
                element.start.setFullYear(currentYear);
                element.end.setFullYear(currentYear);
            }
            if (element.start.getTime() - nyt < 0 && element.end.getTime() - nyt < 0 && element.start.getFullYear() === currentYear && element.start.getMonth() <= element.end.getMonth()) {
                element.start.setFullYear(currentYear + 1);
                element.end.setFullYear(currentYear + 1);
            }
            if (element.start.getMonth() > element.end.getMonth()) {
                element.start.setFullYear(currentYear);
                element.end.setFullYear(currentYear + 1);
            }
        });
        timers.sort(function (a, b) { //käytetään sort funktiota joka vertailee arvoja toisiinsa ja järjestelee lomat
            return a.end.getTime() - b.end.getTime();  //lasketaan arvo on pienempi ja pienin arvo järjestyy ylemmäksi. Ei tarvitse suhteuttaa nykyiseen aikaan koska edellisessä promisessa arvojen on varmistettu olevan nykyisen päivämäärän jälkeen. 
            //jos sorttaisi nykyajan mukaan pitäisi varmistaa ettei nykyaika muuttuisi sorttauksen aikana, koska muuten sorttaus menee rikki.
        });
        let start = timers[0].start.getTime();
        let end = timers[0].end.getTime();
        let distance = [
            Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
            Math.floor((start - nyt) % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24)), //päivät
            Math.floor((start - nyt) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)), // tunnit
            Math.floor((start - nyt) % (1000 * 60 * 60) / (1000 * 60)), //minuutit
            Math.floor((start - nyt) % (1000 * 60) / 1000), //sekunnit
            `000${Math.floor((start - nyt) % 1000)}`.substring((Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))) + 1, 4 + (Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))))
        ];
        let updateElems = (distance, oldDistance) => {
            var stateToBeSet = {ready: true};
            nyt = Date.now();
            if(timers[0].start.getTime() < nyt ) {
                stateToBeSet.otsikko = (<h2  className="alaotsikot">Aikaa loman loppuun 😢:</h2>); 
            }
            else {
                stateToBeSet.otsikko = (<h2 className="alaotsikot">{timers[0].nimi + ":"}</h2>); 
            }
            timeNames.forEach((data, i) => {
                if(oldDistance) {
                    if(oldDistance[i] !== distance[i]) {
                        stateToBeSet[timeNames[i].nimi] = (<p className={`glimpse${timeNames[i].shortened}`}>{`${distance[i]}${timeNames[i].shortened}`}</p>);
                   }
            }
            else {
                stateToBeSet[timeNames[i].nimi] = (<p className={`glimpse${timeNames[i].shortened}`}>{`${distance[i]}${timeNames[i].shortened}`}</p>);
            }
            });
            this.setState(stateToBeSet);
        }
        MainLoop = MainLoop.bind(this);
        MainLoop();
        updateElems(distance);
        function MainLoop () {
            let oldDistance = distance;
            nyt = Date.now();
            if(timers[0].start.getTime() < nyt ) {
                start = timers[0].end.getTime();
            }
            else {
                start = timers[0].start.getTime();
            }
            distance = [
                Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
                Math.floor((start - nyt) % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24)), //päivät
                Math.floor((start - nyt) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)), // tunnit
                Math.floor((start - nyt) % (1000 * 60 * 60) / (1000 * 60)), //minuutit
                Math.floor((start - nyt) % (1000 * 60) / 1000), //sekunnit
                `000${Math.floor((start - nyt) % 1000)}`.substring((Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))) + 1, 4 + (Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))))
            ];
            updateElems(distance, oldDistance);
            if(this.state.active) {
                setTimeout(MainLoop, 30000);
            }
        }
    }
    componentWillUnmount () {
        this.setState({active:false});
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to={`${this.props.href}`} />  : (
            <div className="quickBox ">
            <div className="quickBoxLeft">
                <h1 className="quickTitle">Laskuri:</h1>
                <div className="quickContent">
                    {this.state.ready ? ( <>
                    {this.state.otsikko}
                    <div className="ajat quickText">
                        {this.state.weeks}
                        {this.state.days}
                        {this.state.hours}
                        {this.state.minutes}
                    </div>
                    
                    </>) : (<div id="Loading" className="loader quickLoader">
                    <div className="loader-inner square-spin">
                    <div></div>
                   </div>
                    </div>)}
                </div>
                </div>
                <div onClick={redirect} className="quickBoxRight">
                    <div className="quickWhite arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>
                </div>
            </div>
        );
    }
}
export class QuickRuokalista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false, ready: false, todaysRuokalista: null, ruokalista: null};
    }
    componentDidMount() {
        nextStep();
        onloadDocumentFromContent = onloadDocumentFromContent.bind(this);
         async function nextStep() {
            var requesturl = `https://lomalaskuribackend.herokuapp.com/aromidata`;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', requesturl);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            xhr.onload = function () {
                if (this.status === 200) {
                    onloadDocumentFromContent(this.response);
                }
                else {
                    console.log(this.error);
                }
            };
        }
        function onloadDocumentFromContent(data) {
            var menuJson = JSON.parse(data);
            var nyt = new Date();
            var curDate = nyt.getDate();
            var days = ["sunnuntai","maanantai", "tiistai", "keskiviikko", "torstai", "perjantai","lauantai"];
            var paivanNimi = <h1 className="alaotsikot" >{days[nyt.getDay()] +  "  " +nyt.toLocaleDateString("fi-FI")}:</h1>
            this.setState({ready: true, todaysRuokalista: (<>{paivanNimi} <div className="quickText quickRuokalista"><p>Tänään ei ole kouluruokailua</p> </div> </> )});
            menuJson.Days.forEach((element, index) => {
                var menuDate = new Date(element.Date);
                var tempTitle = <h1 className="alaotsikot">{days[menuDate.getDay()-1] +  "  " +menuDate.toLocaleDateString("fi-FI")}</h1>
                if(curDate === menuDate.getDate()) {
                    let textElem = (<div className="quickText quickRuokalista"><p key={element.Meals[0].Name + "Key"} id="FoodGlimpse">Päivän ruoka: {element.Meals[0].Name} </p> </div>);
                    console.log(textElem);
                    this.setState({ready: true, todaysRuokalista: textElem });
                }
                    
            });
        }
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to={`${this.props.href}`} />: (
            <div className="quickBox ">
                <div className="quickBoxLeft">
                    
                    <h1 className="quickTitle" >Päivän ruokalista:</h1>
                {this.state.ready === true ? (<>
                <div id="firstFood" class="quickContent">
                    {this.state.todaysRuokalista}
                </div>
            </>) : (<div id="Loading" class="loader quickLoader">
        <div class="loader-inner square-spin">
        <div></div>
       </div>
        </div>)  }
        </div>
        <div onClick={redirect} className="quickBoxRight">
            <div className="quickWhite arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>
            </div>
        </div>
        );
    }
}
export class QuickChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ready: false, redirect: false, online: 0, writingAmount: 0, latestMessage: null};
    }
    componentDidMount() {
        socket.connect();
        let roomName = 'LomainenHuone';
        socket.emit('subscribe', { room: roomName , addToOnline: false});
        socket.emit('getRecentMessages');
        var typers = []
        var writingAmount = 0;
        socket.on('typing', (username, room) => {
            if (typers.indexOf(username) === -1) {
                typers.push(username)
              }
                writingAmount = typers.length;
                this.setState({ready: true, 'writingAmount': writingAmount })
          })
        socket.on('stop-typing', (username, room) => {
            if(room === roomName) {
                typers.pop();
                writingAmount = typers.length;
                this.setState({ 'writingAmount': writingAmount })
            }
        });
        socket.on('onlineInRoom', (usernames) => {
            console.log("users:" + usernames);
            let userAmount = usernames;
            this.setState({ready: true, online: userAmount })
          });
        socket.on('sendRecentMsg', messageList => {
            console.log(messageList[messageList.length-1]);
            let latest = {};
            if(messageList.length !== 0 )
            { latest = messageList[messageList.length-1] 
            }
            else {
                latest.text= "Ei viestejä";
                latest.time = Date.now();
            }
            let latestDate =  new Date(latest.time).toLocaleTimeString("fi-FI", {hour: '2-digit', minute:'2-digit'});
            this.setState({latestMessage:<p><strong>{latest.sender}</strong> ({latestDate}): {latest.text}</p>, ready: true});
          });
          socket.on('chat message', (msg, username, time) => {
            this.setState({latestMessage:<p><strong>{username}</strong> ({new Date(time).toLocaleTimeString("fi-FI", {hour: '2-digit', minute:'2-digit'})}): {msg}</p>});
          });
        
    }
    componentWillUnmount() {
        socket.emit('unsubscribe', {room:'LomainenHuone', addToOnline: false});
        socket.disconnect();
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to={`${this.props.href}`} /> : (
            <div className="quickBox">
                <div className="quickBoxLeft">
                    <h1 className="quickTitle">Chat: </h1>
                    <div className="quickContent">
                    { this.state.ready ? ( 
                        <>
            <h2 className="alaotsikot">Chatin tilastoja:</h2>
                    <div className="quickText quickChat"><div><p>{this.state.online}</p><img src={onlineIconi} /></div><div className="miniChat"><h3>Viimeisin viesti:</h3>{this.state.latestMessage}</div><div><p>{this.state.writingAmount}</p><img src={writingIconi} /></div> </div>
             </>
                    ) : (<div id="Loading" class="loader quickLoader">
        <div class="loader-inner square-spin">
        <div></div>
       </div>
        </div>)}
                    </div>
                </div>
                <div onClick={redirect} className="quickBoxRight">
                <div className="quickWhite arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>
                </div>
            </div>
        )
    }
}
export class QuickForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false};
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to={this.props.href} /> : (
            <div className="quickBox">
                <div className="quickBoxLeft" >
                    <h1 className="quickTitle">{this.props.href}:</h1>
                    <div className="quickContent">
                        <h2 className="alaotsikot">{this.props.kysymys} </h2>
                        <div className="quickText"><p>{this.props.teksti}</p></div>
                     </div>
                </div>
                <div onClick={redirect} className="quickBoxRight">
                <div className="quickWhite arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>
                </div>
            </div>
        );
    }
}
export class QuickTilastot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false, tilastoTitle: null, vastaus:null , lastProps: null};
        this.updateTilastot = this.updateTilastot.bind(this);
    }
    updateTilastot() {
        let random = Math.floor(Math.random() * (this.props.tiedot.positive.length+ this.props.tiedot.negative.length));
        console.log(random);
        if(random >= this.props.tiedot.positive.length) {
            let kysymys = this.props.tiedot.negative[random - this.props.tiedot.positive.length];
            this.setState({tilastoTitle: <h3>{kysymys}</h3> , vastaus: <p className="result"> Ei </p>});
        }
        else {
            let kysymys = this.props.tiedot.positive[random];
            this.setState({tilastoTitle: <h3>{kysymys}</h3> , vastaus: <p className="positiveResult"> On </p>});
        }
    }
    componentDidMount() {
        this.setState({lastProps: this.props});
        this.updateTilastot();
    }
    componentDidUpdate() {
        if(this.state.lastProps !== this.props ) {
            this.setState({lastProps: this.props});
            this.updateTilastot();
        }
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to={this.props.href} /> : (
            <div className="quickBox">
                <div className="quickBoxLeft" >
                    <h1 className="quickTitle">{this.props.href}:</h1>
                    <div className="quickContent">
                        <h2 className="alaotsikot">Satunnainen tilasto:</h2>
                        <div className="quickText quickTilastot">{this.state.tilastoTitle} {this.state.vastaus} </div>
                     </div>
                </div>
                <div onClick={redirect} className="quickBoxRight">
                <div className="quickWhite arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>
                </div>
            </div>
        );
    }
}
export class QuickGallery extends React.Component {
    constructor(props) {
        super(props);
        this.changeImage = this.changeImage.bind(this);
        this.state = {redirect: false, 'img1': nokaKuva2, active: false };
    }
    changeImage() {
        let images = [nokaKuva2, nokaKuva3, nokaKuva4, nokaKuva5, nokaKuva6];
        let prevImg = 0;
        image1 = image1.bind(this);
        setTimeout(image1, 10000);
        function image1() {
            let random = Math.floor(Math.random() * 4);
            while(random === prevImg) {
                random = Math.floor(Math.random() * 4);
            }
            prevImg = random;
            this.setState({'img1': images[random]});
            if(this.state.active) {
                setTimeout(image1, 10000);
            }
        }
    }
    componentDidMount() {
        this.setState({active: true});
        this.changeImage();
    }
    componentWillUnmount() {
        this.setState({active: false});
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }  

        return this.state.redirect ? <Redirect to={this.props.href} /> : (
            <div className="quickBox">
            <div className="quickBoxLeft" >
                <h1 className="quickTitle">{this.props.href}:</h1>
                <div className="quickContent">
                    <div className="quickImage">
                        <img src={nokaKuva2} /> {/*preloadataan kaikki kuvat nykyisen kuvan alle */}
                        <img src={nokaKuva3} />
                        <img src={nokaKuva4} />
                        <img src={nokaKuva5} />
                        <img src={nokaKuva6} />
                        <img src={this.state.img1} ></img>
                    </div>
                 </div>
            </div>
            <div onClick={redirect} className="quickBoxRight">
            <div className="quickWhite arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path strokeWidth="1px" stroke="white" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
            </div>
            </div>
        </div>
        )
    }
}
export class QuickSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false};
        this.changeSchool = this.changeSchool.bind(this);
    }
    componentDidMount() {
        let deferredPrompt;
        const addBtn = document.getElementById("progressiveBtn")
        addBtn.style.display = 'none';
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
            addBtn.style.display = 'block';
          
            addBtn.addEventListener('click', (e) => {
              // hide our user interface that shows our A2HS button
              addBtn.style.display = 'none';
              // Show the prompt
              deferredPrompt.prompt();
              // Wait for the user to respond to the prompt
              deferredPrompt.userChoice.then((choiceResult) => {
                  if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                  } else {
                    console.log('User dismissed the A2HS prompt');
                  }
                  deferredPrompt = null;
                });
            });
          });
    }
    toggle = () =>  {
        console.log(this.props.theme)
        this.props.themes(this.props.theme);
    }
    changeSchool() {
        Cookie.set('site', null);
        this.setState({redirect:true}, () => {
            this.setState({redirect:false})
        });
    }
    render() {
        redirect = redirect.bind(this);
        function redirect() {
            this.setState({redirect: true});
        }
        return this.state.redirect ? <Redirect to="/" /> : (
            <div className="quickBox">
                <div className="quickBoxLeft full" >
                    <h1 className="quickTitle">Asetukset:</h1>
                    <div className="quickContent">
                        <div className="quickImage"> 
                        <button class="linkLookALike SettingBtn" onClick={this.toggle}id="dynaaminenNappi">Vaihda teemaa</button>
                        <button class="linkLookALike SettingBtn"  onClick={this.changeSchool}> Vaihda koulua</button>
                        <button id="progressiveBtn" class="linkLookALike SettingBtn"> Lisää kotinäytölle </button>
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}
export class QuickFront extends React.Component {

    laukaiseAnimaatio() {
        var elems = document.querySelectorAll(".quickBox");
        elems.forEach((elem) => {
        var Top = elem.getBoundingClientRect().top - window.outerHeight + elem.getBoundingClientRect().height/2 ;
        var scrollY = window.scrollY;
        if (scrollY > Top) {
            elem.classList.add("anim");
            elem.classList.add("active");
        }
        else {
            elem.classList.remove("anim");
        }
    });
    }
    componentDidMount() {
        this.laukaiseAnimaatio();
        window.addEventListener("scroll", this.laukaiseAnimaatio);
        window.addEventListener("resize", this.laukaiseAnimaatio);
    }
    
    render() {
        return (    
            <div class="quickContainerContainer">
        <div class="quickContainer">
            {this.props.quickItems}

        
    </div>
    </div>

    );
    } 
}