import React from 'react';

export class TimerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timerElems: "" };
    }


    render() {
        function createTimerElems() {
            // dynamic timer engine
            // Lisätäksesi laskettavia kohteita lisää object timers muuttujaan ja käynistä funktio pushElements()

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

                {createTimerElems()}
            </div>
        </ >
        );
    }
}
