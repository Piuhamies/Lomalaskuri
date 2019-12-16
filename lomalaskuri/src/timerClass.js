import React from 'react';

export class TimerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timerElems: "" };
    }
    createTimerElems () {  
    //ainoastaan luo elementit, joita CountTime() metodi päivittää. Erillisessä metodissa, koska tämä on reactin hoitamaa, mutta timerin käynistäminen on vanilla js:ää


   //luodaan elementit kaikille lomille
   var timers = [
    { nimi: "Aikaa kesälomaan: ", start: new Date("Jun 1, 2019 12:00:00"), end: new Date("Aug 8, 2019 10:00:00") },
    { nimi: "Aikaa Syyslomaan:", start: new Date("Oct 14, 2019 00:00:00"), end: new Date("Oct 18, 2019 00:00:00") },
    { nimi: "Aikaa Joululomaan", start: new Date("Dec 21, 2019 00:00:00"), end: new Date("Jan 6, 2020 00:00:00") },
    { nimi: "Aikaa Hiihtolomaan:", start: new Date("Feb 17, 2019 00:00:00"), end: new Date("Feb 21, 2019 00:00:00") },
    { nimi: "Aikaa Pääsiäislomaan", start: new Date("Apr 18 2019 16:00:00"), end: new Date("Apr 23 2019 8:30:00") }
];  //Kaikki nykyiset lomat

var timeNames = [{ nimi: "weeks", shortened: "wk" },
{ nimi: "days", shortened: "d" },
{ nimi: "hours", shortened: "h" },
{ nimi: "minutes", shortened: "min" },
{ nimi: "seconds", shortened: "s" },
{ nimi: "milliseconds", shortened: "ms" }
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
let finalJsx = [];
timers.forEach(function (element, index) {

    var oldIndex = index;
    var div = (<div key={index + "timerDivKey"} id={"timer" + index}>
        <h2 className="alaotsikot">{element.nimi}</h2>
        <div className="ajat">{timeNames.map((x, index) => (<p id={x.nimi + oldIndex} key={index + "pTimeTypeKey"} className={x.nimi}></p>))}</div>
    </div>);
    finalJsx[index] = div;
});
return finalJsx;
    }



    CountTime() { 


// Päivittää kaikki timerit olemaan tulevaisuudessa, järjestelee lomat siten että ensimmäinen on ylimpänä, lukee mitkä aika-arvot ovat näkyvisssä ja käynistää timerin.
var timers = [
    { nimi: "Aikaa kesälomaan: ", start: new Date("Jun 1, 2019 12:00:00"), end: new Date("Aug 8, 2019 10:00:00") },
    { nimi: "Aikaa Syyslomaan:", start: new Date("Oct 14, 2019 00:00:00"), end: new Date("Oct 18, 2019 00:00:00") },
    { nimi: "Aikaa Joululomaan", start: new Date("Dec 21, 2019 00:00:00"), end: new Date("Jan 6, 2020 00:00:00") },
    { nimi: "Aikaa Hiihtolomaan:", start: new Date("Feb 17, 2019 00:00:00"), end: new Date("Feb 21, 2019 00:00:00") },
    { nimi: "Aikaa Pääsiäislomaan", start: new Date("Apr 18 2019 16:00:00"), end: new Date("Apr 23 2019 8:30:00") }
];  //Kaikki nykyiset lomat

var timeNames = [{ nimi: "weeks", shortened: "wk" },
{ nimi: "days", shortened: "d" },
{ nimi: "hours", shortened: "h" },
{ nimi: "minutes", shortened: "min" },
{ nimi: "seconds", shortened: "s" },
{ nimi: "milliseconds", shortened: "ms" }
];
var btnElems = [];
var currentYear = new Date().getFullYear(); //säilytetään nykyinen vuosi muuttujassa, koska sitä käytetään monessa paikkaa
var slider = 6;

    updateYear();
    reArrangeTimers();
    createReusableVars();
    MainLoop = MainLoop.bind(this);
    MainLoop();
    var buttons = document.getElementById("checkboxes");
    buttons.addEventListener("click", MainLoop);

function updateYear() {
    var nyt = new Date().getTime();
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
}
function reArrangeTimers() {
    timers.sort(function (a, b) { //käytetään sort funktiota joka vertailee arvoja toisiinsa ja järjestelee lomat
        return a.end.getTime() - b.end.getTime();  //lasketaan arvo on pienempi ja pienin arvo järjestyy ylemmäksi. Ei tarvitse suhteuttaa nykyiseen aikaan koska edellisessä promisessa arvojen on varmistettu olevan nykyisen päivämäärän jälkeen. 
        //jos sorttaisi nykyajan mukaan pitäisi varmistaa ettei nykyaika muuttuisi sorttauksen aikana, koska muuten sorttaus menee rikki.
    });
}
function createReusableVars() {
    timers.forEach((element, index) => {
        var timersIndex = index;
        timers[timersIndex].elem = [];
        timeNames.forEach((element, index) => {
            timers[timersIndex].elem[index] = document.getElementById(element.nimi + timersIndex);
        });
    });
    for (let i = 0; i < timeNames.length - 1; ++i) {
        btnElems[i] = document.getElementById(timeNames[i + 1].nimi + "Btn");
    }
}
function setSlider() {
    var toggled = false;
    var oldSlider = slider;
    for (let a = 0; a < timeNames.length - 1; ++a) {
        if (btnElems[a].checked === true) {
            toggled = true;
            slider = + a;
        }
    }
    if (toggled === true) {
        slider = 1;
        for (let a = 0; a < timeNames.length - 1; ++a) {
            if (btnElems[a].checked === true) {
                btnElems[a].checked = false;
                slider = a + 2;
            }
        }
        if (oldSlider === slider) {
            slider = slider - 1;
        }
    }
}
function MainLoop() {
    var nyt = Date.now();
    timers.forEach(function (element, index) {
        var start = element.start.getTime();
        var end = element.end.getTime();
        if (start - nyt > 0) { //jos lomaan on vielä aikaa näytä loma timeri
            let distance = [
                Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
                Math.floor((start - nyt) / (1000 * 60 * 60 * 24) % 7), //päivät
                Math.floor((start - nyt) / (1000 * 60 * 60) % 24 ), // tunnit
                Math.floor((start - nyt) / (1000 * 60 ) % 60), //minuutit
                Math.floor((start - nyt) / 1000 % 60), //sekunnit
                `000${Math.floor((start - nyt) % 1000)}`.substring((Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))) + 1, 4 + (Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))))
            ];
            setSlider();
            for ( let i = 0; i < timeNames.length; ++i) { //kunnolla optimoitu for-looppi prefix lisäyksellä ja kaikella 
                //var object = timers[index].elem[i];// hae objekti johon asetamme arvon
                timers[index].elem[0].textContent = distance[0] + timeNames[0].shortened; //asetamme viikot, koska niitä ei checkboxit piilota
                for (let a = 0; a < slider; a++) {
                    timers[index].elem[a].textContent = distance[a] + timeNames[a].shortened;
                    if (timers[index].elem[a].style.display === "none") {
                        timers[index].elem[a].style.display = "block";
                    }
                }

                for (let b = slider; b < timeNames.length; ++b) { //jos slider arvo ei yletä tähän kohtaan niin
                    btnElems[b - 1].classList.remove("check");
                    timers[index].elem[b].style.display = "none";
                }
                for (let a = 1; a < slider; a++) {
                    btnElems[a - 1].classList.add("check");
                }
            }
        }
        else if ((end - nyt) > 0) { //jos loma on nyt näytä koulun alku timeri
            let distance = [
                Math.floor((start - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot)
                Math.floor((start - nyt) / (1000 * 60 * 60 * 24) % 7), //päivät
                Math.floor((start - nyt) / (1000 * 60 * 60) % 24 ), // tunnit
                Math.floor((start - nyt) / (1000 * 60 ) % 60), //minuutit
                Math.floor((start - nyt) / 1000 % 60), //sekunnit
                `000${Math.floor((start - nyt) % 1000)}`.substring((Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))) + 1, 4 + (Math.floor(Math.log10(Math.floor((start - nyt) % 1000)))))
            ];
            setSlider();
            for (let i = 0; i < timeNames.length; ++i) { //kunnolla optimoitu for-looppi prefix lisäyksellä ja kaikella 
                document.querySelector("#timer" + index + " h2").textContent = "Aikaa loman loppuun 😢:";
                document.querySelector("#timer" + index ).setAttribute("class", "theEnd");
                timers[index].elem[0].textContent = distance[0] + timeNames[0].shortened; //asetamme viikot, koska niitä ei checkboxit piilota
                for (let a = 0; a < slider; a++) {
                    timers[index].elem[a].textContent = distance[a] + timeNames[a].shortened;
                    if (timers[index].elem[a].style.display === "none") {
                        timers[index].elem[a].style.display = "block";
                    }
                }
                for (let b = slider; b < timeNames.length; ++b) { //jos slider arvo ei yletä tähän kohtaan niin
                    btnElems[b - 1].classList.remove("check");
                    timers[index].elem[b].style.display = "none";
                }
                for (let a = 1; a < slider; a++) {
                    btnElems[a - 1].classList.add("check");
                }
            }
        }
        else {
            element.start.setFullYear(currentYear + 1);
            element.end.setFullYear(currentYear + 1);
        }
    });
    if(this.TimerActive) {
    if (slider < 6 && slider > 3) {
        setTimeout(MainLoop, 500);
    }
    else if (slider < 4) {
        setTimeout(MainLoop, 6000);
    }
    else {
        window.requestAnimationFrame(MainLoop);
    }
}
}	


    }
    componentDidMount() {
        this.TimerActive = true;
        this.CountTime();
    }
    componentWillUnmount () {
        this.TimerActive = false;
    }
    render() {
        return (<><div id="show">
            <p>Näytä:</p>
            <div id="checkboxes">
                <div className="checkbox">
                    <input type="checkbox" id="daysBtn" defaultChecked="checked" />
                    <label htmlFor="daysBtn">Päivät</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="hoursBtn" defaultChecked="checked" />
                    <label htmlFor="hoursBtn">Tunnit</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="minutesBtn" defaultChecked="checked" />
                    <label htmlFor="minutesBtn">Minuutit</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="secondsBtn" defaultChecked="checked" />
                    <label htmlFor="secondsBtn">Sekunnit</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="millisecondsBtn" />
                    <label htmlFor="millisecondsBtn">Millisekunnit</label>
                </div>
            </div>
        </div>
            <div id="timerArea">

                {this.createTimerElems()}
            </div>
        </ >
        );
    }
}
