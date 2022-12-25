console.log("does this even run");

// dynamic timer engine
// Lisätäksesi laskettavia kohteita lisää object timers muuttujaan ja käynistä funktio pushElements()

var timers = [
  {
    nimi: "Aikaa kesälomaan: ",
    start: new Date("Jun 1, 2019 12:00:00"),
    end: new Date("Aug 8, 2019 10:00:00"),
  },
  {
    nimi: "Aikaa Syyslomaan:",
    start: new Date("Oct 14, 2019 00:00:00"),
    end: new Date("Oct 18, 2019 00:00:00"),
  },
  {
    nimi: "Aikaa Joululomaan",
    start: new Date("Dec 21, 2019 00:00:00"),
    end: new Date("Jan 6, 2020 00:00:00"),
  },
  {
    nimi: "Aikaa Hiihtolomaan:",
    start: new Date("Feb 17, 2019 00:00:00"),
    end: new Date("Feb 21, 2019 00:00:00"),
  },
  {
    nimi: "Aikaa Pääsiäislomaan",
    start: new Date("Apr 18 2019 16:00:00"),
    end: new Date("Apr 23 2019 8:30:00"),
  },
]; //Kaikki nykyiset lomat

var timeNames = [
  { nimi: "weeks", shortened: "wk" },
  { nimi: "days", shortened: "d" },
  { nimi: "hours", shortened: "h" },
  { nimi: "minutes", shortened: "min" },
  { nimi: "seconds", shortened: "s" },
  { nimi: "milliseconds", shortened: "ms" },
];
var btnElems = [];
var currentYear = new Date().getFullYear(); //säilytetään nykyinen vuosi muuttujassa, koska sitä käytetään monessa paikkaa
var slider = 5;

updateYear();
reArrangeTimers();
createReusableVars();
MainLoop();
var buttons = document.getElementById("checkboxes");
buttons.addEventListener("click", MainLoop);
var objectIds = [];

function updateYear() {
  var nyt = new Date().getTime();
  timers.forEach(function (element, index) {
    if (
      element.start.getTime() - nyt < 0 &&
      element.end.getTime() - nyt < 0 &&
      element.start.getFullYear() < currentYear &&
      element.start.getMonth() <= element.end.getMonth()
    ) {
      element.start.setFullYear(currentYear);
      element.end.setFullYear(currentYear);
    }
    if (
      element.start.getTime() - nyt < 0 &&
      element.end.getTime() - nyt < 0 &&
      element.start.getFullYear() === currentYear &&
      element.start.getMonth() <= element.end.getMonth()
    ) {
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
  timers.sort(function (a, b) {
    //käytetään sort funktiota joka vertailee arvoja toisiinsa ja järjestelee lomat
    return a.end.getTime() - b.end.getTime(); //lasketaan arvo on pienempi ja pienin arvo järjestyy ylemmäksi. Ei tarvitse suhteuttaa nykyiseen aikaan koska edellisessä promisessa arvojen on varmistettu olevan nykyisen päivämäärän jälkeen.
    //jos sorttaisi nykyajan mukaan pitäisi varmistaa ettei nykyaika muuttuisi sorttauksen aikana, koska muuten sorttaus menee rikki.
  });
}
function createReusableVars() {
  timers.forEach((element, index) => {
    var timersIndex = index;
    timers[timersIndex].elem = [];
    timeNames.forEach((element, index) => {
      timers[timersIndex].elem[index] = document.getElementById(
        element.nimi + timersIndex
      );
    });
  });
  for (i = 0; i < timeNames.length - 1; ++i) {
    btnElems[i] = document.getElementById(timeNames[i + 1].nimi + "Btn");
  }
}
function setSlider() {
  var toggled = false;
  var oldSlider = slider;
  for (a = 0; a < timeNames.length - 1; ++a) {
    if (btnElems[a].checked === true) {
      toggled = true;
      slider = +a;
    }
  }
  if (toggled === true) {
    slider = 1;
    for (a = 0; a < timeNames.length - 1; ++a) {
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
  var nyt = new Date().getTime();
  timers.forEach(function (element, index) {
    var start = element.start.getTime();
    var end = element.end.getTime();
    if (start - nyt > 0) {
      //jos lomaan on vielä aikaa näytä loma timeri
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
      setSlider();
      for (len = timeNames.length, i = 0; i < len; ++i) {
        //kunnolla optimoitu for-looppi prefix lisäyksellä ja kaikella
        //var object = timers[index].elem[i];// hae objekti johon asetamme arvon
        timers[index].elem[0].textContent =
          distance[0] + timeNames[0].shortened; //asetamme viikot, koska niitä ei checkboxit piilota
        for (a = 0; a < slider; a++) {
          timers[index].elem[a].textContent =
            distance[a] + timeNames[a].shortened;
          if (timers[index].elem[a].style.display === "none") {
            timers[index].elem[a].style.display = "block";
          }
        }

        for (b = slider; b < timeNames.length; ++b) {
          //jos slider arvo ei yletä tähän kohtaan niin
          btnElems[b - 1].classList.remove("check");
          timers[index].elem[b].style.display = "none";
        }
        for (a = 1; a < slider; a++) {
          btnElems[a - 1].classList.add("check");
        }
      }
    } else if (end - nyt > 0) {
      //jos loma on nyt näytä koulun alku timeri
      let distance = [
        Math.floor((end - nyt) / (1000 * 60 * 60 * 24 * 7)), //maaginen seiskalla jako(viikot) //Meme on siinä, ettei nää joskus 2019 toiminu ja mä sain vähä kettuilua siitä nökälaskurin tiimiltä
        Math.floor(
          ((end - nyt) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
        ), //päivät
        Math.floor(((end - nyt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // tunnit
        Math.floor(((end - nyt) % (1000 * 60 * 60)) / (1000 * 60)), //minuutit
        Math.floor(((end - nyt) % (1000 * 60)) / 1000), //sekunnit
        Math.floor((end - nyt) % 1000), // millisekunnit
      ];
      setSlider();
      for (len = timeNames.length, i = 0; i < len; ++i) {
        //kunnolla optimoitu for-looppi prefix lisäyksellä ja kaikella
        var object = document.getElementById(timeNames[i].nimi + index); // hae objekti johon asetamme arvon
        document.querySelector("#timer" + index + " h2").textContent =
          "Aikaa loman loppuun 😢:";
        document
          .querySelector("#timer" + index)
          .setAttribute("class", "theEnd");
        timers[index].elem[0].textContent =
          distance[0] + timeNames[0].shortened; //asetamme viikot, koska niitä ei checkboxit piilota
        for (a = 0; a < slider; a++) {
          timers[index].elem[a].textContent =
            distance[a] + timeNames[a].shortened;
          if (timers[index].elem[a].style.display === "none") {
            timers[index].elem[a].style.display = "block";
          }
        }
        for (b = slider; b < timeNames.length; ++b) {
          //jos slider arvo ei yletä tähän kohtaan niin
          btnElems[b - 1].classList.remove("check");
          timers[index].elem[b].style.display = "none";
        }
        for (a = 1; a < slider; a++) {
          btnElems[a - 1].classList.add("check");
        }
      }
    } else {
      element.start.setFullYear(currentYear + 1);
      element.end.setFullYear(currentYear + 1);
    }
  });
  if (slider < 6 && slider > 3) {
    setTimeout(MainLoop, 500);
  } else if (slider < 4) {
    setTimeout(MainLoop, 6000);
  } else {
    window.requestAnimationFrame(MainLoop);
  }
}
